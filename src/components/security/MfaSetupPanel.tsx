"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import MfaRecoveryCodesPanel from "@/components/security/MfaRecoveryCodesPanel";

type Props = {
  apiPath: "/api/mfa" | "/api/admin/mfa";
  email: string;
  required?: boolean;
  portal?: "user" | "admin";
  onEnabled?: (recoveryCodes?: string[]) => void;
  /** When true, parent supplies title/description (e.g. admin modal). */
  hideIntro?: boolean;
  /** `plain` drops the inner card chrome when embedded in a modal. */
  variant?: "card" | "plain";
};

export default function MfaSetupPanel({
  apiPath,
  email,
  required = false,
  portal = "user",
  onEnabled,
  hideIntro = false,
  variant = "card",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [manualKey, setManualKey] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);

  async function startSetup() {
    setLoading(true);
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "setup", email }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not start setting up your login code.");
        return;
      }
      setQrDataUrl(data.qrDataUrl ?? null);
      setManualKey(data.manualKey ?? null);
    } finally {
      setLoading(false);
    }
  }

  async function confirmEnable() {
    setLoading(true);
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enable", code }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "That code is not correct. Please try again.");
        return;
      }
      const codes = Array.isArray(data.recoveryCodes) ? (data.recoveryCodes as string[]) : [];
      toast.success(
        required ? "Login code is set up. Now save your backup codes." : "Login code is on.",
      );
      if (codes.length > 0) {
        setRecoveryCodes(codes);
      } else {
        onEnabled?.();
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  const isCompact = variant === "plain" || variant === "card";

  if (recoveryCodes) {
    return (
      <MfaRecoveryCodesPanel
        codes={recoveryCodes}
        email={email}
        portal={portal}
        onDone={() => {
          onEnabled?.(recoveryCodes);
          setRecoveryCodes(null);
          router.refresh();
        }}
      />
    );
  }

  return (
    <div
      className={
        variant === "card"
          ? "mx-auto w-full max-w-lg space-y-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
          : "space-y-4"
      }
    >
      {!hideIntro ? (
        <div>
          <h2 className="text-xl font-bold text-slate-900">Google Authenticator setup</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {required
              ? "Admins must use a login code. Scan the square code with Google Authenticator, then type the 6-digit code to finish."
              : "Keep your account extra safe. Install Google Authenticator on your phone, scan the square code, then type the 6-digit code it shows."}
          </p>
        </div>
      ) : null}

      {!qrDataUrl ? (
        <div className={isCompact ? "flex justify-center" : undefined}>
          <button
            type="button"
            onClick={startSetup}
            disabled={loading}
            className="rounded-xl bg-g-button px-8 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Preparing…" : "Show my code to scan"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 text-center">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="Square code to scan with Google Authenticator"
              className="h-48 w-48 rounded-xl border border-slate-200 bg-white p-2"
            />
          ) : null}
          {manualKey ? (
            <p className="max-w-full break-all text-xs text-slate-600">
              Manual key: <span className="font-mono font-semibold text-slate-900">{manualKey}</span>
            </p>
          ) : null}
          <input
            className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            inputMode="numeric"
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
          <button
            type="button"
            onClick={confirmEnable}
            disabled={loading || code.length < 6}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? <CircleLoader size={16} className="text-white" /> : null}
            Confirm and turn on
          </button>
        </div>
      )}
    </div>
  );
}
