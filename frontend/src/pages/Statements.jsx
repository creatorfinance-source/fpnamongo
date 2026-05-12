import { useEffect, useState } from "react";
import api, { fmtCurrency } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet as SheetIcon, Download } from "lucide-react";
import { toast } from "sonner";

const TABS = [
  { value: "profit-loss", label: "Profit & Loss" },
  { value: "balance-sheet", label: "Balance Sheet" },
  { value: "cash-flow", label: "Cash Flow" },
  { value: "trial-balance", label: "Trial Balance" },
  { value: "general-ledger", label: "General Ledger" },
  { value: "tax-summary", label: "Tax Summary" },
];

const today = () => new Date().toISOString().slice(0, 10);
const startOfYear = () => new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 10);

export default function Statements() {
  const [tab, setTab] = useState("profit-loss");
  const [from, setFrom] = useState(startOfYear());
  const [to, setTo] = useState(today());
  const [base, setBase] = useState("USD");
  const [data, setData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { api.get("/accounts").then((r) => { setAccounts(r.data); setAccountId(r.data[0]?.account_id || ""); }); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = { base };
      if (["profit-loss", "cash-flow", "tax-summary"].includes(tab)) { params.date_from = from; params.date_to = to; }
      if (["balance-sheet", "trial-balance"].includes(tab)) { params.as_of = to; }
      if (tab === "general-ledger") { params.account_id = accountId; params.date_from = from; params.date_to = to; }
      const path = tab;
      const { data } = await api.get(`/statements/${path}`, { params });
      setData(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, [tab, base, accountId]);

  const exportToSheets = async () => {
    if (!["profit-loss", "balance-sheet", "trial-balance"].includes(tab)) {
      toast.info("Currently exportable: P&L, Balance Sheet, Trial Balance");
      return;
    }
    try {
      const { data } = await api.post("/sheets/export", { kind: tab });
      toast.success("Exported to Google Sheets");
      window.open(data.url, "_blank");
    } catch (e) { toast.error(e?.response?.data?.detail || "Connect Google Sheets first"); }
  };

  return (
    <div className="p-6 md:p-8" data-testid="statements-page">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="label-eyebrow">Reports</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: "Outfit" }}>Statements</h1>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div><Label className="text-[10px] uppercase tracking-wider">From</Label><Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="h-9 mt-1" data-testid="stmt-from" /></div>
          <div><Label className="text-[10px] uppercase tracking-wider">To</Label><Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="h-9 mt-1" data-testid="stmt-to" /></div>
          <div><Label className="text-[10px] uppercase tracking-wider">Currency</Label>
            <Select value={base} onValueChange={setBase}>
              <SelectTrigger className="w-24 mt-1 h-9" data-testid="stmt-currency"><SelectValue /></SelectTrigger>
              <SelectContent>{["USD", "EUR", "BDT", "LKR", "MYR"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Button onClick={fetchData} variant="outline" data-testid="stmt-refresh">Refresh</Button>
          <Button onClick={exportToSheets} className="bg-moss hover:bg-[#3D5247] text-white" data-testid="stmt-export-sheets"><SheetIcon className="w-4 h-4 mr-1" />Export to Sheets</Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-[#F2F0ED] p-1 mb-6 flex flex-wrap h-auto">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="data-[state=active]:bg-white data-[state=active]:text-moss data-[state=active]:shadow-sm" data-testid={`tab-${t.value}`}>{t.label}</TabsTrigger>
          ))}
        </TabsList>

        {tab === "general-ledger" && (
          <div className="mb-4">
            <Label>Account</Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger className="w-80 mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>{accounts.map((a) => <SelectItem key={a.account_id} value={a.account_id}>{a.code} · {a.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        )}

        <Card className="surface-card p-6 md:p-8" data-testid={`stmt-${tab}-card`}>
          {loading ? <div className="text-sm text-[#5C5C5C]">Loading…</div> : <StatementView tab={tab} data={data} base={base} />}
        </Card>
      </Tabs>
    </div>
  );
}

function Section({ title, rows, total, currency }) {
  return (
    <div>
      <div className="label-eyebrow mt-4">{title}</div>
      <table className="w-full text-sm mt-2">
        <tbody>
          {rows && rows.length === 0 && <tr><td className="py-2 text-[#5C5C5C]">—</td></tr>}
          {rows && rows.map((r, i) => (
            <tr key={i} className="border-b border-cream"><td className="py-2 text-[#1A1A1A]">{r.account}</td><td className="py-2 text-right numeric">{fmtCurrency(r.amount ?? r.balance, currency)}</td></tr>
          ))}
          {total !== undefined && (<tr className="border-t border-[#1A1A1A]"><td className="py-2 font-medium">Total</td><td className="py-2 text-right numeric font-medium">{fmtCurrency(total, currency)}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

function StatementView({ tab, data, base }) {
  if (!data) return <div className="text-sm text-[#5C5C5C]">No data.</div>;
  const cur = data.currency || base;
  if (tab === "profit-loss") {
    return (
      <div>
        <h2 className="text-2xl font-light" style={{ fontFamily: "Outfit" }}>Profit & Loss</h2>
        <div className="text-sm text-[#5C5C5C]">{data.from} → {data.to} · {cur}</div>
        <Section title="Income" rows={data.income} total={data.total_income} currency={cur} />
        <Section title="Expenses" rows={data.expenses} total={data.total_expenses} currency={cur} />
        <div className="mt-6 p-4 bg-[#F2F0ED] rounded-md flex items-center justify-between">
          <div className="label-eyebrow">Net Profit</div>
          <div className="text-2xl numeric text-moss" style={{ fontFamily: "Outfit" }}>{fmtCurrency(data.net_profit, cur)}</div>
        </div>
      </div>
    );
  }
  if (tab === "balance-sheet") {
    return (
      <div>
        <h2 className="text-2xl font-light" style={{ fontFamily: "Outfit" }}>Balance Sheet</h2>
        <div className="text-sm text-[#5C5C5C]">As of {data.as_of} · {cur}</div>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div><Section title="Assets" rows={data.assets} total={data.total_assets} currency={cur} /></div>
          <div>
            <Section title="Liabilities" rows={data.liabilities} total={data.total_liabilities} currency={cur} />
            <Section title="Equity" rows={data.equity} total={data.total_equity} currency={cur} />
          </div>
        </div>
      </div>
    );
  }
  if (tab === "cash-flow") {
    return (
      <div>
        <h2 className="text-2xl font-light" style={{ fontFamily: "Outfit" }}>Cash Flow</h2>
        <div className="text-sm text-[#5C5C5C]">{data.from} → {data.to} · {cur}</div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[["Operating", data.operating], ["Investing", data.investing], ["Financing", data.financing]].map(([n, v]) => (
            <div key={n} className="p-4 surface-card"><div className="label-eyebrow">{n}</div><div className="numeric text-2xl mt-1" style={{ fontFamily: "Outfit", fontWeight: 300 }}>{fmtCurrency(v, cur)}</div></div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-[#F2F0ED] rounded-md flex items-center justify-between"><div className="label-eyebrow">Net change in cash</div><div className="text-2xl numeric text-moss" style={{ fontFamily: "Outfit" }}>{fmtCurrency(data.net_change, cur)}</div></div>
      </div>
    );
  }
  if (tab === "trial-balance") {
    return (
      <div>
        <h2 className="text-2xl font-light" style={{ fontFamily: "Outfit" }}>Trial Balance</h2>
        <div className="text-sm text-[#5C5C5C]">As of {data.as_of} · {cur}</div>
        <table className="w-full text-sm mt-6">
          <thead><tr className="text-left text-[#5C5C5C] border-b border-cream"><th className="py-2">Code</th><th className="py-2">Account</th><th className="py-2">Type</th><th className="py-2 text-right">Debit</th><th className="py-2 text-right">Credit</th></tr></thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr key={i} className="border-b border-cream"><td className="py-2 numeric">{r.code}</td><td className="py-2">{r.account}</td><td className="py-2 text-[#5C5C5C] capitalize">{r.type}</td><td className="py-2 text-right numeric">{fmtCurrency(r.debit, cur)}</td><td className="py-2 text-right numeric">{fmtCurrency(r.credit, cur)}</td></tr>
            ))}
            <tr className="border-t border-[#1A1A1A]"><td colSpan="3" className="py-2 font-medium">Total</td><td className="py-2 text-right numeric font-medium">{fmtCurrency(data.total_debit, cur)}</td><td className="py-2 text-right numeric font-medium">{fmtCurrency(data.total_credit, cur)}</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
  if (tab === "general-ledger") {
    return (
      <div>
        <h2 className="text-2xl font-light" style={{ fontFamily: "Outfit" }}>General Ledger</h2>
        <div className="text-sm text-[#5C5C5C]">{data.account?.name} · {data.from} → {data.to} · {cur}</div>
        <table className="w-full text-sm mt-6">
          <thead><tr className="text-left text-[#5C5C5C] border-b border-cream"><th className="py-2">Date</th><th className="py-2">Description</th><th className="py-2 text-right">Debit</th><th className="py-2 text-right">Credit</th><th className="py-2 text-right">Balance</th></tr></thead>
          <tbody>
            {data.rows && data.rows.length > 0 ? data.rows.map((r, i) => (
              <tr key={i} className="border-b border-cream"><td className="py-2">{r.date}</td><td className="py-2">{r.description}</td><td className="py-2 text-right numeric">{fmtCurrency(r.debit, cur)}</td><td className="py-2 text-right numeric">{fmtCurrency(r.credit, cur)}</td><td className="py-2 text-right numeric">{fmtCurrency(r.balance, cur)}</td></tr>
            )) : <tr><td colSpan="5" className="py-6 text-center text-[#5C5C5C]">No entries.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  }
  if (tab === "tax-summary") {
    return (
      <div>
        <h2 className="text-2xl font-light" style={{ fontFamily: "Outfit" }}>Tax Summary</h2>
        <div className="text-sm text-[#5C5C5C]">{data.from} → {data.to} · {cur}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 surface-card"><div className="label-eyebrow">Taxable sales</div><div className="numeric text-2xl mt-1" style={{ fontFamily: "Outfit", fontWeight: 300 }}>{fmtCurrency(data.taxable_sales, cur)}</div></div>
          <div className="p-4 surface-card"><div className="label-eyebrow">Tax collected</div><div className="numeric text-2xl mt-1 text-moss" style={{ fontFamily: "Outfit", fontWeight: 300 }}>{fmtCurrency(data.tax_collected, cur)}</div></div>
          <div className="p-4 surface-card"><div className="label-eyebrow">Paid invoice total</div><div className="numeric text-2xl mt-1" style={{ fontFamily: "Outfit", fontWeight: 300 }}>{fmtCurrency(data.paid_invoice_total, cur)}</div></div>
          <div className="p-4 surface-card"><div className="label-eyebrow">Invoices</div><div className="numeric text-2xl mt-1" style={{ fontFamily: "Outfit", fontWeight: 300 }}>{data.invoices_count}</div></div>
        </div>
      </div>
    );
  }
  return null;
}
