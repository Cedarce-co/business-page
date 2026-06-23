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
      ? "Manage authenticator access for the admin portal. MFA is required to use admin tools after sign-in."
      : "Protect your account with two-factor authentication (optional). Support can help you set this up if needed.";

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
        toast.error(data?.error ?? "Could not disable MFA.");
        return;
      }
      toast.success("Two-factor authentication disabled.");
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
        toast.error(data?.error ?? "Could not regenerate recovery codes.");
        return;
      }
      setRecoveryCodes(data.recoveryCodes ?? []);
      setRecoveryRemaining((data.recoveryCodes as string[] | undefined)?.length ?? recoveryRemaining);
      setPassword("");
      setCode("");
      toast.success("New recovery codes generated.");
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
            <p className="text-sm font-semibold text-emerald-800">Two-factor authentication is enabled</p>
            {enabledAt ? (
              <p className="mt-1 text-xs text-slate-500">Enabled {new Date(enabledAt).toLocaleString()}</p>
            ) : null}
            <p className="mt-3 text-sm text-slate-600">
              You will be asked for an authenticator code when you sign in.
              {recoveryRemaining > 0
                ? ` ${recoveryRemaining} recovery code${recoveryRemaining === 1 ? "" : "s"} remaining.`
                : " No recovery codes left. Generate a new set below."}
            </p>
          </Card>

          <Card className="space-y-3 p-5">
            <p className="text-sm font-semibold text-slate-900">Recovery codes</p>
            <p className="text-sm text-slate-600">
              Generate a fresh set of one-time recovery codes. This invalidates any codes you downloaded earlier.
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
              placeholder="Authenticator code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button
              type="button"
              disabled={regenerating || password.length < 8 || code.length < 6}
              onClick={regenerateCodes}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 disabled:opacity-60"
            >
              {regenerating ? "Generating…" : "Generate new recovery codes"}
            </button>
          </Card>

          <Card className="space-y-3 p-5">
            <p className="text-sm font-semibold text-slate-900">Disable two-factor authentication</p>
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-relaxed text-rose-950">
              Turning off MFA makes your account easier to access if you lose your phone, but it is less secure.
              {portal === "admin"
                ? " You will need to set up authenticator again before using the admin portal."
                : " Anyone with your password could sign in without a second step."}
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
              placeholder="Authenticator code"
              value={disableCode}
              onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button
              type="button"
              disabled={disabling || disablePassword.length < 8 || disableCode.length < 6}
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
