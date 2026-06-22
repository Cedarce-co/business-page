"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";

type Props = {
  apiPath: "/api/mfa" | "/api/admin/mfa";
  email: string;
  required?: boolean;
  onEnabled?: () => void;
  /** When true, parent supplies title/description (e.g. admin modal). */
  hideIntro?: boolean;
  /** `plain` drops the inner card chrome when embedded in a modal. */
  variant?: "card" | "plain";
};

export default function MfaSetupPanel({
  apiPath,
  email,
  required = false,
  onEnabled,
  hideIntro = false,
  variant = "card",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [manualKey, setManualKey] = useState<string | null>(null);
  const [code, setCode] = useState("");

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
        toast.error(data?.error ?? "Could not start MFA setup.");
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
        toast.error(data?.error ?? "Invalid code.");
        return;
      }
      toast.success(required ? "Authenticator configured. You can now access the admin portal." : "Two-factor authentication enabled.");
      onEnabled?.();
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={
        variant === "card"
          ? "space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
          : "space-y-4"
      }
    >
      {!hideIntro ? (
        <div>
          <h2 className="text-lg font-bold text-slate-900">Google Authenticator setup</h2>
          <p className="mt-1 text-sm text-slate-600">
            {required
              ? "Admin access requires an authenticator app. Scan the QR code, then enter a code to finish setup."
              : "Add an extra layer of security. On your next sign-in you will enter a code from your authenticator app."}
          </p>
        </div>
      ) : null}

      {!qrDataUrl ? (
        <div className={variant === "plain" ? "flex justify-center" : undefined}>
          <button
            type="button"
            onClick={startSetup}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Preparing…" : "Generate QR code"}
          </button>
        </div>
      ) : (
        <div
          className={
            variant === "plain"
              ? "flex flex-col items-center space-y-4 text-center"
              : "flex flex-col items-center space-y-4 text-center sm:items-stretch sm:text-left"
          }
        >
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="Authenticator QR code"
              className="mx-auto h-48 w-48 rounded-xl border border-slate-200 bg-white p-2"
            />
          ) : null}
          {manualKey ? (
            <p className="text-xs text-slate-600">
              Manual key: <span className="font-mono font-semibold text-slate-900">{manualKey}</span>
            </p>
          ) : null}
          <input
            className={`w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm ${variant === "plain" ? "max-w-xs" : "sm:max-w-xs"}`}
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
            Confirm and enable
          </button>
        </div>
      )}
    </div>
  );
}
