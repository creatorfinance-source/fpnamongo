# Statements computation: P&L, Balance Sheet, Cash Flow, Trial Balance, Ledger, Tax.
from __future__ import annotations

from collections import defaultdict
from typing import List, Optional

# Simple FX rates to USD base (illustrative). In production, fetch live rates.
FX_TO_USD = {
    "USD": 1.0,
    "EUR": 1.08,
    "BDT": 0.0091,
    "LKR": 0.0033,
    "MYR": 0.21,
}


def to_base(amount: float, currency: str, base: str = "USD") -> float:
    usd = amount * FX_TO_USD.get(currency, 1.0)
    return usd / FX_TO_USD.get(base, 1.0)


def filter_by_date(txns: List[dict], date_from: Optional[str], date_to: Optional[str]) -> List[dict]:
    out = []
    for t in txns:
        d = t.get("date", "")
        if date_from and d < date_from:
            continue
        if date_to and d > date_to:
            continue
        out.append(t)
    return out


def signed_amount(t: dict, account: dict, base: str = "USD") -> float:
    """Return signed amount in base currency relative to the account.
    Convention:
      - For income/credit accounts: credit increases (positive), debit decreases (negative)
      - For expense/asset/debit accounts: debit increases (positive), credit decreases (negative)
    """
    amt = to_base(float(t.get("amount", 0) or 0), t.get("currency", "USD"), base)
    a_type = account.get("type", "asset")
    is_debit_natural = a_type in ("asset", "expense")
    if t.get("type") == "debit":
        return amt if is_debit_natural else -amt
    return -amt if is_debit_natural else amt


def profit_and_loss(txns: List[dict], accounts: List[dict], date_from: str, date_to: str, base: str = "USD") -> dict:
    by_id = {a["account_id"]: a for a in accounts}
    txns = filter_by_date(txns, date_from, date_to)
    income_total = 0.0
    expense_total = 0.0
    income_lines = defaultdict(float)
    expense_lines = defaultdict(float)
    for t in txns:
        acc = by_id.get(t.get("account_id"))
        if not acc:
            continue
        if acc["type"] == "income":
            v = signed_amount(t, acc, base)
            income_total += v
            income_lines[acc["name"]] += v
        elif acc["type"] == "expense":
            v = signed_amount(t, acc, base)
            expense_total += v
            expense_lines[acc["name"]] += v
    return {
        "from": date_from,
        "to": date_to,
        "currency": base,
        "income": [{"account": k, "amount": round(v, 2)} for k, v in income_lines.items()],
        "expenses": [{"account": k, "amount": round(v, 2)} for k, v in expense_lines.items()],
        "total_income": round(income_total, 2),
        "total_expenses": round(expense_total, 2),
        "net_profit": round(income_total - expense_total, 2),
    }


def balance_sheet(txns: List[dict], accounts: List[dict], as_of: str, base: str = "USD") -> dict:
    by_id = {a["account_id"]: a for a in accounts}
    txns = filter_by_date(txns, None, as_of)
    sums = defaultdict(float)
    by_type = defaultdict(list)
    for t in txns:
        acc = by_id.get(t.get("account_id"))
        if not acc:
            continue
        v = signed_amount(t, acc, base)
        sums[acc["account_id"]] += v
    for acc in accounts:
        bal = round(sums.get(acc["account_id"], 0.0), 2)
        if acc["type"] in ("asset", "liability", "equity"):
            by_type[acc["type"]].append({"account": acc["name"], "balance": bal})
    # Retained earnings = income - expenses up to as_of
    pl = profit_and_loss(txns, accounts, "0000-01-01", as_of, base)
    retained = pl["net_profit"]
    by_type["equity"].append({"account": "Retained Earnings", "balance": round(retained, 2)})
    total_assets = round(sum(x["balance"] for x in by_type["asset"]), 2)
    total_liab = round(sum(x["balance"] for x in by_type["liability"]), 2)
    total_equity = round(sum(x["balance"] for x in by_type["equity"]), 2)
    return {
        "as_of": as_of,
        "currency": base,
        "assets": by_type["asset"],
        "liabilities": by_type["liability"],
        "equity": by_type["equity"],
        "total_assets": total_assets,
        "total_liabilities": total_liab,
        "total_equity": total_equity,
    }


def cash_flow(txns: List[dict], accounts: List[dict], date_from: str, date_to: str, base: str = "USD") -> dict:
    by_id = {a["account_id"]: a for a in accounts}
    txns = filter_by_date(txns, date_from, date_to)
    operating = 0.0
    investing = 0.0
    financing = 0.0
    lines = []
    for t in txns:
        acc = by_id.get(t.get("account_id"))
        if not acc:
            continue
        v = signed_amount(t, acc, base)
        # Heuristic mapping
        a_type = acc["type"]
        if a_type in ("income", "expense"):
            operating += v if a_type == "income" else -v
            section = "operating"
        elif a_type == "asset":
            # capital purchases -> investing
            investing -= v
            section = "investing"
        else:
            financing += v
            section = "financing"
        lines.append({"date": t["date"], "description": t.get("description", ""), "amount": round(v, 2), "section": section})
    net = round(operating + investing + financing, 2)
    return {
        "from": date_from,
        "to": date_to,
        "currency": base,
        "operating": round(operating, 2),
        "investing": round(investing, 2),
        "financing": round(financing, 2),
        "net_change": net,
        "lines": lines,
    }


def trial_balance(txns: List[dict], accounts: List[dict], as_of: str, base: str = "USD") -> dict:
    txns = filter_by_date(txns, None, as_of)
    debits = defaultdict(float)
    credits = defaultdict(float)
    for t in txns:
        amt = to_base(float(t.get("amount", 0) or 0), t.get("currency", "USD"), base)
        if t.get("type") == "debit":
            debits[t["account_id"]] += amt
        else:
            credits[t["account_id"]] += amt
    rows = []
    total_d = 0.0
    total_c = 0.0
    for acc in accounts:
        d = round(debits.get(acc["account_id"], 0.0), 2)
        c = round(credits.get(acc["account_id"], 0.0), 2)
        if d == 0 and c == 0:
            continue
        rows.append({"code": acc.get("code", ""), "account": acc["name"], "type": acc["type"], "debit": d, "credit": c})
        total_d += d
        total_c += c
    return {
        "as_of": as_of,
        "currency": base,
        "rows": rows,
        "total_debit": round(total_d, 2),
        "total_credit": round(total_c, 2),
    }


def general_ledger(txns: List[dict], accounts: List[dict], account_id: str, date_from: str, date_to: str, base: str = "USD") -> dict:
    by_id = {a["account_id"]: a for a in accounts}
    acc = by_id.get(account_id)
    if not acc:
        return {"error": "account not found"}
    txns = [t for t in txns if t.get("account_id") == account_id]
    txns = filter_by_date(txns, date_from, date_to)
    txns.sort(key=lambda x: x.get("date", ""))
    rows = []
    running = 0.0
    for t in txns:
        v = signed_amount(t, acc, base)
        running += v
        rows.append({
            "date": t["date"],
            "description": t.get("description", ""),
            "debit": round(to_base(t["amount"], t.get("currency", "USD"), base), 2) if t["type"] == "debit" else 0,
            "credit": round(to_base(t["amount"], t.get("currency", "USD"), base), 2) if t["type"] == "credit" else 0,
            "balance": round(running, 2),
        })
    return {"account": acc, "from": date_from, "to": date_to, "currency": base, "rows": rows, "ending_balance": round(running, 2)}


def tax_summary(txns: List[dict], accounts: List[dict], invoices: List[dict], date_from: str, date_to: str, base: str = "USD") -> dict:
    invs = [i for i in invoices if i.get("issue_date", "") >= (date_from or "") and i.get("issue_date", "") <= (date_to or "9999")]
    total_taxable = sum(to_base(i.get("subtotal", 0), i.get("currency", "USD"), base) for i in invs)
    total_tax = sum(to_base(i.get("tax_amount", 0), i.get("currency", "USD"), base) for i in invs)
    total_collected = sum(to_base(i.get("total", 0), i.get("currency", "USD"), base) for i in invs if i.get("status") == "paid")
    return {
        "from": date_from,
        "to": date_to,
        "currency": base,
        "taxable_sales": round(total_taxable, 2),
        "tax_collected": round(total_tax, 2),
        "paid_invoice_total": round(total_collected, 2),
        "invoices_count": len(invs),
    }