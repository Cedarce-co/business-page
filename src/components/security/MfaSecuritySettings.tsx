"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MfaSetupPanel from "@/components/security/MfaSetupPanel";
import MfaRecoveryCodesPanel from "@/components/security/MfaRecoveryCodesPanel";
import PasswordInput from "@/components/ui/PasswordInput";

type ApiPath = "/api/mfa" | "/api/admin/mfa";

type Props = {
  apiPath: ApiPath;
  email: string;
  portal: "user" | "admin";
  title?: string;
  subtitle?: string;
  PageShell: React.ComponentType<{ title: string; subtitle: string; children: React.ReactNode }>;
  Card: React.ComponentType<{ className?: string; children: React.ReactNode }>;
};

export default function MfaSecuritySettings({
  apiPath,
  email,
  portal,
  title = "Security",
  subtitle,
  PageShell,
  Card,
}: Props) {
  const defaultSubtitle =
    portal === "admin"
      ? "Manage the login code for the admin area. Admins must use a login code after their password."
      : "Make your account safer with a login code: a 6-digit code from your phone that you enter after your password. It's optional, and our team can help you set it up.";

  const [enabled, setEnabled] = useState(false);
  const [enabledAt, setEnabledAt] = useState<string | null>(null);
  const [recoveryRemaining, setRecoveryRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [disableCode, setDisableCode] = useState("");
  const [disabling, setDisabling] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);

  async function refreshState() {
    const res = await fetch(apiPath);
    const data = await res.json().catch(() => null);
    if (res.ok) {
      setEnabled(Boolean(data.enabled));
      setEnabledAt(data.enabledAt ?? null);
      setRecoveryRemaining(Number(data.recoveryCodesRemaining ?? 0));
    }
    setLoading(false);
  }

  useEffect(() => {
    void refreshState();
  }, [apiPath]);

  async function disableMfa() {
    setDisabling(true);
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "disable", password: disablePassword, code: disableCode }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not turn off the login code.");
        return;
      }
      toast.success("Login code turned off.");
      setEnabled(false);
      setEnabledAt(null);
      setRecoveryRemaining(0);
      setDisablePassword("");
      setDisableCode("");
    } finally {
      setDisabling(false);
    }
  }

  async function regenerateCodes() {
    setRegenerating(true);
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "regenerate-recovery", password, code }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not create new backup codes.");
        return;
      }
      setRecoveryCodes(data.recoveryCodes ?? []);
      setRecoveryRemaining((data.recoveryCodes as string[] | undefined)?.length ?? recoveryRemaining);
      setPassword("");
      setCode("");
      toast.success("New backup codes created.");
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <PageShell title={title} subtitle={subtitle ?? defaultSubtitle}>
      {loading ? (
        <Card className="p-6 text-sm text-slate-600">Loading security settings…</Card>
      ) : recoveryCodes ? (
        <div className="mx-auto w-full max-w-lg">
          <MfaRecoveryCodesPanel
            codes={recoveryCodes}
            email={email}
            portal={portal}
            onDone={() => {
              setRecoveryCodes(null);
              void refreshState();
            }}
          />
        </div>
      ) : enabled ? (
        <div className="mx-auto w-full max-w-lg space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold text-emerald-800">Login code is on</p>
            {enabledAt ? (
              <p className="mt-1 text-xs text-slate-500">Turned on {new Date(enabledAt).toLocaleString()}</p>
            ) : null}
            <p className="mt-3 text-sm text-slate-600">
              When you sign in, you will enter the 6-digit code from your Google Authenticator app.
              {recoveryRemaining > 0
                ? ` ${recoveryRemaining} backup code${recoveryRemaining === 1 ? "" : "s"} left.`
                : " No backup codes left. Create new ones below."}
            </p>
          </Card>

          <Card className="space-y-3 p-5">
            <p className="text-sm font-semibold text-slate-900">Backup codes</p>
            <p className="text-sm text-slate-600">
              Backup codes let you sign in if you lose your phone. Creating new ones stops your old codes from working.
            </p>
            <PasswordInput
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              placeholder="Current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              inputMode="numeric"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button
              type="button"
              disabled={regenerating || password.length < 8 || code.length < 6}
              onClick={regenerateCodes}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 disabled:opacity-60"
            >
              {regenerating ? "Creating…" : "Create new backup codes"}
            </button>
          </Card>

          <Card className="space-y-3 p-5">
            <p className="text-sm font-semibold text-slate-900">Turn off login code</p>
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-relaxed text-rose-950">
              Without a login code, your account is easier to get into if you lose your phone, but it is less safe.
              {portal === "admin"
                ? " You will need to set it up again before using the admin area."
                : " Anyone who knows your password could sign in."}
            </p>
            <PasswordInput
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              placeholder="Current password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
            />
            <input
              className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              inputMode="numeric"
              placeholder="6-digit code"
              value={disableCode}
              onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button
              type="button"
              disabled={disabling || disablePassword.length < 8 || disableCode.length < 6}
              onClick={disableMfa}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-800 disabled:opacity-60"
            >
              Turn off login code
            </button>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center">
          <MfaSetupPanel
            apiPath={apiPath}
            email={email}
            required={portal === "admin"}
            portal={portal}
            onEnabled={(recoveryCodesFromSetup) => {
              setEnabled(true);
              setEnabledAt(new Date().toISOString());
              if (recoveryCodesFromSetup?.length) {
                setRecoveryCodes(recoveryCodesFromSetup);
              }
            }}
          />
        </div>
      )}
    </PageShell>
  );
}
