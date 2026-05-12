import { useEffect, useState } from "react";
import api, { CURRENCIES } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const TYPES = [
  { value: "asset", label: "Asset" },
  { value: "liability", label: "Liability" },
  { value: "equity", label: "Equity" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const TYPE_COLOR = {
  asset: "bg-[#F2F0ED] text-moss",
  liability: "bg-[#FEEAE6] text-terracotta",
  equity: "bg-[#EFF1ED] text-[#3D5247]",
  income: "bg-[#EAF1EC] text-[#4A6B53]",
  expense: "bg-[#FBEDE9] text-terracotta",
};

const DEFAULT = () => ({ name: "", code: "", type: "asset", currency: "USD", description: "" });

export default function Accounts() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(DEFAULT());

  const load = async () => {
    const { data } = await api.get("/accounts");
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    try {
      await api.post("/accounts", form);
      toast.success("Account added");
      setOpen(false);
      setForm(DEFAULT());
      load();
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Failed");
    }
  };

  const remove = async (id) => {
    await api.delete(`/accounts/${id}`);
    toast.success("Deleted");
    load();
  };

  const grouped = TYPES.map(({ value, label }) => ({
    label,
    type: value,
    rows: items.filter((a) => a.type === value),
  }));

  return (
    <div className="p-6 md:p-8" data-testid="accounts-page">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="label-eyebrow">Bookkeeping</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: "Outfit" }}>Chart of accounts</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-moss hover:bg-[#3D5247] text-white" data-testid="add-account-btn"><Plus className="w-4 h-4 mr-1" /> New account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle style={{ fontFamily: "Outfit" }}>New account</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Code</Label><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="mt-1.5" data-testid="acc-code-input" /></div>
                <div><Label>Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger className="mt-1.5" data-testid="acc-type-select"><SelectValue /></SelectTrigger>
                    <SelectContent>{TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" data-testid="acc-name-input" /></div>
              <div><Label>Currency</Label>
                <Select value={form.currency} onValueChange={(v) => setForm({ ...form, currency: v })}>
                  <SelectTrigger className="mt-1.5" data-testid="acc-currency-select"><SelectValue /></SelectTrigger>
                  <SelectContent>{CURRENCIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1.5" data-testid="acc-desc-input" /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-moss hover:bg-[#3D5247] text-white" onClick={submit} disabled={!form.name || !form.code} data-testid="acc-submit-btn">Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {grouped.map((g) => (
          <Card key={g.type} className="surface-card overflow-hidden" data-testid={`acc-group-${g.type}`}>
            <div className="px-6 py-4 border-b border-cream flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${TYPE_COLOR[g.type]}`}>{g.label}</span>
              <span className="label-eyebrow text-[10px]">{g.rows.length} accounts</span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {g.rows.length === 0 ? (
                  <tr><td className="px-6 py-6 text-center text-[#5C5C5C]">No {g.label.toLowerCase()} accounts</td></tr>
                ) : g.rows.map((a) => (
                  <tr key={a.account_id} className="border-t border-cream hover:bg-[#F9F8F6]">
                    <td className="px-6 py-3 numeric text-[#5C5C5C] w-20">{a.code}</td>
                    <td className="px-6 py-3 text-[#1A1A1A]">{a.name}</td>
                    <td className="px-6 py-3 numeric text-[#5C5C5C]">{a.currency}</td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => remove(a.account_id)} className="p-1.5 text-[#5C5C5C] hover:text-terracotta" data-testid={`delete-acc-${a.account_id}`}><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))}
      </div>
    </div>
  );
}
