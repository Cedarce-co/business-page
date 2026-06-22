"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Page, Card } from "@/components/dashboard/ui";
import MfaSetupPanel from "@/components/security/MfaSetupPanel";
import PasswordInput from "@/components/ui/PasswordInput";

export default function SecuritySettingsClient({ email }: { email: string }) {
  const [enabled, setEnabled] = useState(false);
  const [enabledAt, setEnabledAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [disabling, setDisabling] = useState(false);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/mfa");
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setEnabled(Boolean(data.enabled));
        setEnabledAt(data.enabledAt ?? null);
      }
      setLoading(false);
    })();
  }, []);

  async function disableMfa() {
    setDisabling(true);
    try {
      const res = await fetch("/api/mfa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "disable", password, code }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not disable MFA.");
        return;
      }
      toast.success("Two-factor authentication disabled.");
      setEnabled(false);
      setEnabledAt(null);
      setPassword("");
      setCode("");
    } finally {
      setDisabling(false);
    }
  }

  return (
    <Page
      title="Security"
      subtitle="Protect your account with two-factor authentication (optional). Support can help you set this up if needed."
    >
      {loading ? (
        <Card className="p-6 text-sm text-slate-600">Loading security settings…</Card>
      ) : enabled ? (
        <div className="mx-auto w-full max-w-lg space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold text-emerald-800">Two-factor authentication is enabled</p>
            {enabledAt ? (
              <p className="mt-1 text-xs text-slate-500">Enabled {new Date(enabledAt).toLocaleString()}</p>
            ) : null}
            <p className="mt-3 text-sm text-slate-600">
              You will be asked for an authenticator code when you sign in.
            </p>
          </Card>
          <Card className="space-y-3 p-5">
            <p className="text-sm font-semibold text-slate-900">Disable two-factor authentication</p>
            <PasswordInput
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              placeholder="Current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              inputMode="numeric"
              placeholder="Authenticator code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button
              type="button"
              disabled={disabling || password.length < 8 || code.length < 6}
              onClick={disableMfa}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-800 disabled:opacity-60"
            >
              Disable MFA
            </button>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center">
          <MfaSetupPanel
            apiPath="/api/mfa"
            email={email}
            onEnabled={() => {
              setEnabled(true);
              setEnabledAt(new Date().toISOString());
            }}
          />
        </div>
      )}
    </Page>
  );
}
