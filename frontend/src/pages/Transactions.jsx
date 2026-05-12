import { useEffect, useState } from "react";
import api, { CURRENCIES, fmtCurrency, fmtDate } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_FORM = () => ({
  date: new Date().toISOString().slice(0, 10),
  description: "",
  amount: "",
  currency: "USD",
  type: "credit",
  account_id: "",
  category: "",
});

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM());
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({ source: "", account_id: "" });

  const load = async () => {
    const params = {};
    if (filter.source) params.source = filter.source;
    if (filter.account_id) params.account_id = filter.account_id;
    const [t, a] = await Promise.all([api.get("/transactions", { params }), api.get("/accounts")]);
    setItems(t.data);
    setAccounts(a.data);
  };
  // eslint-disable-next-line

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filter.source, filter.account_id]);

  const submit = async () => {
    try {
      const payload = { ...form, amount: parseFloat(form.amount) };
      if (editing) {
        await api.patch(`/transactions/${editing}`, payload);
        toast.success("Transaction updated");
      } else {
        await api.post("/transactions", payload);
        toast.success("Transaction added");
      }
      setOpen(false);
      setEditing(null);
      setForm(DEFAULT_FORM());
      load();
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Failed");
    }
  };

  const startEdit = (t) => {
    setEditing(t.txn_id);
    setForm({
      date: t.date,
      description: t.description,
      amount: String(t.amount),
      currency: t.currency,
      type: t.type,
      account_id: t.account_id,
      category: t.category || "",
    });
    setOpen(true);
  };

  const remove = async (id) => {
    await api.delete(`/transactions/${id}`);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="p-6 md:p-8" data-testid="transactions-page">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="label-eyebrow">Ledger</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: "Outfit" }}>Transactions</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={filter.source || "all"} onValueChange={(v) => setFilter((f) => ({ ...f, source: v === "all" ? "" : v }))}>
            <SelectTrigger className="w-40 h-10" data-testid="filter-source"><SelectValue placeholder="All sources" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="stripe">Stripe</SelectItem>
              <SelectItem value="skrill">Skrill</SelectItem>
              <SelectItem value="paysafe">Paysafe</SelectItem>
              <SelectItem value="google-sheets">Google Sheets</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setForm(DEFAULT_FORM()); } }}>
            <DialogTrigger asChild>
              <Button className="bg-moss hover:bg-[#3D5247] text-white" data-testid="add-transaction-btn"><Plus className="w-4 h-4 mr-1" /> New transaction</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle style={{ fontFamily: "Outfit" }}>{editing ? "Edit transaction" : "New transaction"}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1.5" data-testid="txn-date-input" /></div>
                  <div><Label>Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger className="mt-1.5" data-testid="txn-type-select"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="credit">Credit (income)</SelectItem><SelectItem value="debit">Debit (expense)</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1.5" data-testid="txn-desc-input" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Amount</Label><Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="mt-1.5" data-testid="txn-amount-input" /></div>
                  <div><Label>Currency</Label>
                    <Select value={form.currency} onValueChange={(v) => setForm({ ...form, currency: v })}>
                      <SelectTrigger className="mt-1.5" data-testid="txn-currency-select"><SelectValue /></SelectTrigger>
                      <SelectContent>{CURRENCIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Account</Label>
                  <Select value={form.account_id} onValueChange={(v) => setForm({ ...form, account_id: v })}>
                    <SelectTrigger className="mt-1.5" data-testid="txn-account-select"><SelectValue placeholder="Select account" /></SelectTrigger>
                    <SelectContent>{accounts.map((a) => <SelectItem key={a.account_id} value={a.account_id}>{a.code} · {a.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Category (optional)</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5" data-testid="txn-category-input" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit} disabled={!form.description || !form.amount || !form.account_id} className="bg-moss hover:bg-[#3D5247] text-white" data-testid="txn-submit-btn">
                  {editing ? "Save" : "Add"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-[#F9F8F6]">
                <th className="px-6 py-3 label-eyebrow text-[10px]">Date</th>
                <th className="px-6 py-3 label-eyebrow text-[10px]">Description</th>
                <th className="px-6 py-3 label-eyebrow text-[10px]">Account</th>
                <th className="px-6 py-3 label-eyebrow text-[10px]">Source</th>
                <th className="px-6 py-3 label-eyebrow text-[10px] text-right">Amount</th>
                <th className="px-6 py-3 label-eyebrow text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-[#5C5C5C]">No transactions yet.</td></tr>
              ) : items.map((t) => {
                const acc = accounts.find((a) => a.account_id === t.account_id);
                return (
                  <tr key={t.txn_id} className="border-t border-cream hover:bg-[#F9F8F6]">
                    <td className="px-6 py-3 text-[#5C5C5C] whitespace-nowrap">{fmtDate(t.date)}</td>
                    <td className="px-6 py-3 text-[#1A1A1A]">{t.description}</td>
                    <td className="px-6 py-3 text-[#5C5C5C]">{acc ? `${acc.code} · ${acc.name}` : "—"}</td>
                    <td className="px-6 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-[#F2F0ED] text-moss">{t.source}</span></td>
                    <td className={`px-6 py-3 text-right numeric ${t.type === "credit" ? "text-moss" : "text-terracotta"}`}>{t.type === "credit" ? "+" : "-"}{fmtCurrency(t.amount, t.currency)}</td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => startEdit(t)} className="p-1.5 text-[#5C5C5C] hover:text-moss" data-testid={`edit-txn-${t.txn_id}`}><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => remove(t.txn_id)} className="p-1.5 text-[#5C5C5C] hover:text-terracotta" data-testid={`delete-txn-${t.txn_id}`}><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
