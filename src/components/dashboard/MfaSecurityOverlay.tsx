"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, X } from "lucide-react";

const DISMISS_KEY = "cedarce.mfa-prompt.dismissed";

type Props = {
  mfaEnabled: boolean;
};

export default function MfaSecurityOverlay({ mfaEnabled }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mfaEnabled) {
      setVisible(false);
      return;
    }
    const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    setVisible(!dismissed);
  }, [mfaEnabled]);

  if (!visible || mfaEnabled) return null;

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
        aria-label="Dismiss security reminder"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-labelledby="mfa-overlay-title"
        className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 pt-8 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 sm:h-20 sm:w-20">
            <Shield className="h-9 w-9 sm:h-11 sm:w-11" aria-hidden />
          </div>
          <h2 id="mfa-overlay-title" className="mt-5 text-xl font-black text-slate-900 sm:text-2xl">
            Help us protect your account
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Add another layer by turning on two-factor authentication (Google Authenticator).
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            It only takes a minute, and it helps keep your business data, verification documents, and service
            requests safer.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={dismiss}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
          >
            Remind me later
          </button>
          <Link
            href="/dashboard/security"
            onClick={dismiss}
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto"
          >
            Enable two-factor authentication
          </Link>
        </div>
      </div>
    </div>
  );
}
