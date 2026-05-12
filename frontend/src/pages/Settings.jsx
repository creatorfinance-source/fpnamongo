import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api, { CURRENCIES } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Settings() {
  const { user, refresh } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [organization, setOrganization] = useState(user?.organization || "");
  const [defaultCurrency, setDefaultCurrency] = useState(user?.default_currency || "USD");
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    try {
      await api.patch("/settings", { name, organization, default_currency: defaultCurrency });
      await refresh();
      toast.success("Settings saved");
    } catch (e) { toast.error("Failed"); } finally { setBusy(false); }
  };

  return (
    <div className="p-6 md:p-8" data-testid="settings-page">
      <div className="mb-8">
        <div className="label-eyebrow">Workspace</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: "Outfit" }}>Settings</h1>
      </div>

      <Card className="surface-card p-6 max-w-2xl">
        <div className="space-y-5">
          <div>
            <Label>Your name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" data-testid="settings-name-input" />
          </div>
          <div>
            <Label>Organization</Label>
            <Input value={organization} onChange={(e) => setOrganization(e.target.value)} className="mt-1.5" data-testid="settings-org-input" />
          </div>
          <div>
            <Label>Default currency</Label>
            <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
              <SelectTrigger className="mt-1.5 w-48" data-testid="settings-currency-select"><SelectValue /></SelectTrigger>
              <SelectContent>{CURRENCIES.map((c) => <SelectItem key={c.code} value={c.code}>{c.code} · {c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user?.email || ""} disabled className="mt-1.5" />
          </div>
          <div className="pt-2">
            <Button onClick={save} disabled={busy} className="bg-moss hover:bg-[#3D5247] text-white" data-testid="settings-save-btn">
              {busy ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
