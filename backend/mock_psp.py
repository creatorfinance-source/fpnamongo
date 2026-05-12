# Mock PSP transaction generator for sample data on Sync.
from __future__ import annotations

import random
import uuid
from datetime import datetime, timedelta, timezone
from typing import List

PSP_SAMPLES = {
    "paypal": [
        ("PayPal Customer Payment", 75.00, "USD", "credit", "Sales"),
        ("PayPal Subscription Renewal", 29.99, "USD", "credit", "Subscriptions"),
        ("PayPal Refund Issued", 15.00, "USD", "debit", "Refunds"),
        ("PayPal Withdrawal Fee", 1.20, "USD", "debit", "Bank Fees"),
        ("PayPal Donation Received", 50.00, "EUR", "credit", "Donations"),
    ],
    "stripe": [
        ("Stripe Charge - Pro Plan", 99.00, "USD", "credit", "Subscriptions"),
        ("Stripe Charge - One-time Sale", 240.00, "USD", "credit", "Sales"),
        ("Stripe Payout to Bank", 320.50, "USD", "debit", "Bank Transfer"),
        ("Stripe Processing Fee", 2.95, "USD", "debit", "Bank Fees"),
        ("Stripe Refund", 49.00, "USD", "debit", "Refunds"),
    ],
    "skrill": [
        ("Skrill Inbound Transfer", 180.00, "EUR", "credit", "Sales"),
        ("Skrill Customer Payment", 65.00, "EUR", "credit", "Sales"),
        ("Skrill Withdrawal", 200.00, "EUR", "debit", "Bank Transfer"),
        ("Skrill Fee", 1.45, "EUR", "debit", "Bank Fees"),
    ],
    "paysafe": [
        ("Paysafe Cash Voucher Redeemed", 50.00, "USD", "credit", "Sales"),
        ("Paysafe Customer Top-up", 100.00, "USD", "credit", "Sales"),
        ("Paysafe Settlement Fee", 3.50, "USD", "debit", "Bank Fees"),
        ("Paysafe Chargeback", 75.00, "USD", "debit", "Refunds"),
    ],
}


def generate_mock_transactions(provider: str, account_id: str, contra_account_id: str | None) -> List[dict]:
    samples = PSP_SAMPLES.get(provider, [])
    out = []
    today = datetime.now(timezone.utc).date()
    for i, (desc, amount, ccy, ttype, category) in enumerate(samples):
        d = today - timedelta(days=random.randint(0, 21))
        out.append({
            "txn_id": f"txn_{uuid.uuid4().hex[:12]}",
            "date": d.isoformat(),
            "description": desc,
            "amount": amount,
            "currency": ccy,
            "type": ttype,
            "account_id": account_id,
            "contra_account_id": contra_account_id,
            "category": category,
            "source": provider,
            "external_ref": f"{provider}-{uuid.uuid4().hex[:8]}",
            "reconciled": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    return out