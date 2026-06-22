"use client";

import { useRouter } from "next/navigation";
import MfaSetupPanel from "@/components/security/MfaSetupPanel";

export default function AdminMfaSetupClient({ email }: { email: string }) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-lg space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Set up authenticator</h1>
        <p className="mt-2 text-sm text-slate-600">
          For your security, admin access requires Google Authenticator (or any TOTP app). Complete setup to
          continue.
        </p>
      </div>
      <MfaSetupPanel
        apiPath="/api/admin/mfa"
        email={email}
        required
        onEnabled={() => {
          router.push("/admin/dashboard");
          router.refresh();
        }}
      />
    </div>
  );
}
