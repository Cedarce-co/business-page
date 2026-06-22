"use client";

import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import MfaSetupPanel from "@/components/security/MfaSetupPanel";

export default function AdminMfaSetupClient({ email }: { email: string }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-labelledby="admin-mfa-setup-title"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:max-w-lg sm:p-8"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
            <Shield className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin security</p>
          <h1 id="admin-mfa-setup-title" className="mt-2 text-2xl font-black text-slate-900">
            Set up authenticator
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Admin access requires Google Authenticator or any TOTP app. Scan the QR code, then enter a code to finish
            setup.
          </p>
        </div>

        <div className="mt-8">
          <MfaSetupPanel
            apiPath="/api/admin/mfa"
            email={email}
            required
            hideIntro
            variant="plain"
            onEnabled={() => {
              router.push("/admin/dashboard");
              router.refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
}
