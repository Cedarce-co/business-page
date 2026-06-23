"use client";

import { Download } from "lucide-react";
import { downloadRecoveryCodesFile } from "@/lib/mfa-recovery-download";

type Props = {
  codes: string[];
  email: string;
  portal: "user" | "admin";
  onDone: () => void;
  title?: string;
};

export default function MfaRecoveryCodesPanel({
  codes,
  email,
  portal,
  onDone,
  title = "Save your recovery codes",
}: Props) {
  return (
    <div className="space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <div>
        <p className="text-sm font-semibold text-amber-950">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-amber-900">
          Download and store these one-time codes somewhere safe. If you lose your phone or authenticator app, each
          code can sign you in once. They will not be shown again.
        </p>
      </div>

      <ul className="grid gap-2 rounded-xl border border-amber-200 bg-white p-4 font-mono text-sm text-slate-900 sm:grid-cols-2">
        {codes.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => downloadRecoveryCodesFile({ codes, email, portal })}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-950 hover:bg-amber-100"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download recovery codes
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          I have saved these codes
        </button>
      </div>
    </div>
  );
}
