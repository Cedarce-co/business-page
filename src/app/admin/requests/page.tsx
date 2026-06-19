import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { requestLabel, requestTone } from "@/components/admin/status";
import { listAdminServiceRequests } from "@/server/services/admin";
import { SERVICE_REQUEST_STATUS_ORDER } from "@/lib/service-request-status";

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const statusRaw = params.status;
  const status = (Array.isArray(statusRaw) ? statusRaw[0] : statusRaw)?.trim() ?? "all";
  const requests = await listAdminServiceRequests(status);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Service requests</h1>
        <p className="text-sm text-slate-600">All client service requests. Filter by status or open one to review.</p>
      </div>

      <form className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4">
        <select
          name="status"
          defaultValue={status}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
        >
          <option value="all">All statuses</option>
          {SERVICE_REQUEST_STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {requestLabel(s)}
            </option>
          ))}
        </select>
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white" type="submit">
          Apply filter
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">{requests.length} requests</p>
          <p className="text-xs text-slate-500">Showing up to 100, newest first</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="border-b border-slate-200 pb-3 pr-4">Request</th>
                <th className="border-b border-slate-200 pb-3 pr-4">Client</th>
                <th className="border-b border-slate-200 pb-3 pr-4">Submitted</th>
                <th className="border-b border-slate-200 pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="group">
                  <td className="border-b border-slate-100 py-3 pr-4 align-top">
                    <Link href={`/admin/requests/${r.id}`} className="block">
                      <p className="truncate font-semibold text-slate-900 group-hover:underline">{r.serviceType}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">{r.summary}</p>
                    </Link>
                  </td>
                  <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                    <p className="font-medium text-slate-900">{r.user.name}</p>
                    <p className="text-xs text-slate-500">{r.user.email}</p>
                  </td>
                  <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="border-b border-slate-100 py-3 text-right align-top">
                    <StatusBadge tone={requestTone(r.status)}>{requestLabel(r.status)}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 ? <p className="py-6 text-sm text-slate-500">No requests match this filter.</p> : null}
        </div>
      </div>
    </div>
  );
}
