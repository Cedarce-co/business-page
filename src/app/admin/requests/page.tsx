import Link from "next/link";
import { Suspense } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import { requestLabel, requestTone } from "@/components/admin/status";
import { Page } from "@/components/dashboard/ui";
import { listAdminServiceRequests } from "@/server/services/admin";
import { SERVICE_REQUEST_STATUS_ORDER } from "@/lib/service-request-status";
import { parseTablePagination, resolveTablePage } from "@/lib/table-pagination";
import {
  DataTable,
  DataTableBody,
  DataTableEmpty,
  DataTableHead,
  DataTableTd,
  DataTableTh,
} from "@/components/ui/DataTable";
import DataTablePanel from "@/components/ui/DataTablePanel";
import TableFilterBar from "@/components/ui/TableFilterBar";
import TablePagination from "@/components/ui/TablePagination";
import CopyableId from "@/components/ui/CopyableId";

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const statusRaw = params.status;
  const qRaw = params.q;
  const status = (Array.isArray(statusRaw) ? statusRaw[0] : statusRaw)?.trim() ?? "all";
  const q = (Array.isArray(qRaw) ? qRaw[0] : qRaw)?.trim() ?? "";
  const { page, perPage } = parseTablePagination(params);
  const { items: requests, total } = await listAdminServiceRequests({ status, q, page, perPage });
  const { safePage } = resolveTablePage(page, total, perPage);

  const statusOptions = SERVICE_REQUEST_STATUS_ORDER.map((s) => ({
    value: s,
    label: requestLabel(s),
  }));

  return (
    <Page
      title="Service requests"
      subtitle="Filter by status or search by request ID, client name, email, or user ID."
    >
      <DataTablePanel
        filter={
          <Suspense fallback={<div className="h-11 animate-pulse rounded-xl bg-slate-200/60" />}>
            <TableFilterBar
              searchPlaceholder="Search ID, client, email, service…"
              statusOptions={statusOptions}
              statusLabel="Status"
            />
          </Suspense>
        }
        pagination={
          <Suspense fallback={null}>
            <TablePagination total={total} page={safePage} perPage={perPage} />
          </Suspense>
        }
      >
        <DataTable embedded minWidth="1040px">
          <DataTableHead>
            <DataTableTh>Request ID</DataTableTh>
            <DataTableTh>Service</DataTableTh>
            <DataTableTh>Client</DataTableTh>
            <DataTableTh>Submitted</DataTableTh>
            <DataTableTh align="right">Status</DataTableTh>
          </DataTableHead>
          <DataTableBody>
            {requests.length === 0 ? (
              <DataTableEmpty colSpan={5} message="No requests match your filters." />
            ) : (
              requests.map((r) => (
                <tr key={r.id}>
                  <DataTableTd>
                    <CopyableId
                      value={r.id}
                      href={`/admin/requests/${r.id}`}
                      label="Request ID"
                    />
                  </DataTableTd>
                  <DataTableTd>
                    <Link href={`/admin/requests/${r.id}`} className="block">
                      <p className="font-semibold text-slate-900">{r.serviceType}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">{r.summary}</p>
                    </Link>
                  </DataTableTd>
                  <DataTableTd>
                    <p className="font-medium text-slate-900">{r.user.name}</p>
                    <p className="text-xs text-slate-500">{r.user.email}</p>
                    <div className="mt-1">
                      <CopyableId value={r.user.id} href={`/admin/users/${r.user.id}`} label="User ID" />
                    </div>
                  </DataTableTd>
                  <DataTableTd>{new Date(r.createdAt).toLocaleString()}</DataTableTd>
                  <DataTableTd align="right">
                    <StatusBadge tone={requestTone(r.status)}>{requestLabel(r.status)}</StatusBadge>
                  </DataTableTd>
                </tr>
              ))
            )}
          </DataTableBody>
        </DataTable>
      </DataTablePanel>
    </Page>
  );
}
