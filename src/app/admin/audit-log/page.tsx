import AuditLogClient from "@/components/admin/AuditLogClient";

export default function AdminAuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Audit log</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Track where users and admins sign in from, session duration, and sign-outs (including idle timeouts).
        </p>
      </div>
      <AuditLogClient />
    </div>
  );
}
