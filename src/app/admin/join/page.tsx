import { Suspense } from "react";
import AdminJoinClient from "@/components/admin/AdminJoinClient";

export default function AdminJoinPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Cedarce admin</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Join the team</h1>
        <p className="mt-2 text-sm text-slate-600">Create your password, then set up Google Authenticator on sign-in.</p>
      </div>
      <Suspense fallback={<p className="text-sm text-slate-600">Loading invite…</p>}>
        <AdminJoinClient />
      </Suspense>
    </div>
  );
}
