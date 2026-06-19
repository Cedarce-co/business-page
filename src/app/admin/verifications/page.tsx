import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { kycLabel, kycTone } from "@/components/admin/status";
import { listPendingVerifications } from "@/server/services/admin";

export default async function AdminVerificationsPage() {
  const users = await listPendingVerifications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Pending verifications</h1>
        <p className="text-sm text-slate-600">
          Review submitted KYC applications. Open a client to approve, reject, or request corrections.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">{users.length} in queue</p>
          <p className="text-xs text-slate-500">Submitted and invalid-info resubmissions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="border-b border-slate-200 pb-3 pr-4">Client</th>
                <th className="border-b border-slate-200 pb-3 pr-4">Business</th>
                <th className="border-b border-slate-200 pb-3 pr-4">Submitted</th>
                <th className="border-b border-slate-200 pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="group">
                  <td className="border-b border-slate-100 py-3 pr-4 align-top">
                    <Link href={`/admin/users/${u.id}/verification`} className="block">
                      <p className="truncate font-semibold text-slate-900 group-hover:underline">{u.name}</p>
                      <p className="truncate text-xs text-slate-500">{u.email}</p>
                    </Link>
                  </td>
                  <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                    {u.kyc?.businessName ?? <span className="text-slate-400">N/A</span>}
                  </td>
                  <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                    {u.kyc?.submittedAt
                      ? new Date(u.kyc.submittedAt).toLocaleString()
                      : <span className="text-slate-400">N/A</span>}
                  </td>
                  <td className="border-b border-slate-100 py-3 text-right align-top">
                    <StatusBadge tone={kycTone(u.kyc?.status)}>
                      {kycLabel(u.kyc?.status)}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 ? (
            <p className="py-6 text-sm text-slate-500">No pending verifications right now.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
