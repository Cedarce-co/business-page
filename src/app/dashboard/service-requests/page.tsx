import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import { ActionLink, Page } from "@/components/dashboard/ui";
import StatusBadge from "@/components/admin/StatusBadge";
import { requestLabel, requestTone } from "@/components/admin/status";
import { canUserEditServiceRequest } from "@/lib/service-request-edit";
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
import type { ServiceRequestStatus } from "@prisma/client";

export default async function MyServiceRequestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireUser();
  const params = await searchParams;
  const statusRaw = params.status;
  const qRaw = params.q;
  const status = (Array.isArray(statusRaw) ? statusRaw[0] : statusRaw)?.trim() ?? "all";
  const q = (Array.isArray(qRaw) ? qRaw[0] : qRaw)?.trim() ?? "";
  const { page, perPage, skip, take } = parseTablePagination(params);

  const where = {
    userId: session.user.id,
    ...(status !== "all" ? { status: status as ServiceRequestStatus } : {}),
    ...(q ? { id: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [requests, total] = await Promise.all([
    prisma.serviceRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.serviceRequest.count({ where }),
  ]);

  const { safePage } = resolveTablePage(page, total, perPage);

  const statusOptions = SERVICE_REQUEST_STATUS_ORDER.map((s) => ({
    value: s,
    label: requestLabel(s),
  }));

  return (
    <Page
      title="My service requests"
      subtitle="Search by request ID or filter by status. You can edit within 48 hours of submitting, or anytime we ask for more information."
      right={<ActionLink href="/dashboard/request-service?fresh=1">New request</ActionLink>}
    >
      <DataTablePanel
        filter={
          <Suspense fallback={<div className="h-11 animate-pulse rounded-xl bg-slate-200/60" />}>
            <TableFilterBar
              searchPlaceholder="Search request ID…"
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
        <DataTable embedded minWidth="880px">
          <DataTableHead>
            <DataTableTh>Request ID</DataTableTh>
            <DataTableTh>Service</DataTableTh>
            <DataTableTh>Submitted</DataTableTh>
            <DataTableTh align="right">Status</DataTableTh>
            <DataTableTh align="right">Actions</DataTableTh>
          </DataTableHead>
          <DataTableBody>
            {requests.length === 0 ? (
              <DataTableEmpty colSpan={5} message="No requests match your filters." />
            ) : (
              requests.map((r) => {
                const editable = canUserEditServiceRequest({ status: r.status, createdAt: r.createdAt });
                return (
                  <tr key={r.id}>
                    <DataTableTd>
                      <CopyableId value={r.id} label="Request ID" />
                    </DataTableTd>
                    <DataTableTd>
                      <p className="font-semibold text-slate-900">{r.serviceType}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">{r.summary}</p>
                    </DataTableTd>
                    <DataTableTd>{new Date(r.createdAt).toLocaleString()}</DataTableTd>
                    <DataTableTd align="right">
                      <StatusBadge tone={requestTone(r.status)}>{requestLabel(r.status)}</StatusBadge>
                    </DataTableTd>
                    <DataTableTd align="right">
                      <div className="flex flex-wrap justify-end gap-2">
                        {editable ? (
                          <Link
                            href={`/dashboard/service-requests/${r.id}`}
                            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                          >
                            {r.status === "NEEDS_INFO" ? "Update" : "Edit"}
                          </Link>
                        ) : null}
                        <Link
                          href={`/dashboard/service-requests/${r.id}`}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                        >
                          View
                        </Link>
                      </div>
                    </DataTableTd>
                  </tr>
                );
              })
            )}
          </DataTableBody>
        </DataTable>
      </DataTablePanel>
    </Page>
  );
}
