import Link from "next/link";
import { Suspense } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import { kycLabel, kycTone } from "@/components/admin/status";
import { Page } from "@/components/dashboard/ui";
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
import TablePagination from "@/components/ui/TablePagination";
import { listPendingVerifications } from "@/server/services/admin";

export default async function AdminVerificationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { page, perPage } = parseTablePagination(params);
  const { items: users, total } = await listPendingVerifications({ page, perPage });
  const { safePage } = resolveTablePage(page, total, perPage);

  return (
    <Page
      title="Pending verifications"
      subtitle="Review submitted KYC applications. Open a client to approve, reject, or request corrections."
      right={
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">In queue</p>
          <p className="text-lg font-black text-slate-900">{total}</p>
        </div>
      }
    >
      <DataTablePanel
        pagination={
          <Suspense fallback={null}>
            <TablePagination total={total} page={safePage} perPage={perPage} />
          </Suspense>
        }
      >
        <DataTable embedded minWidth="860px">
          <DataTableHead>
            <DataTableTh>Client</DataTableTh>
            <DataTableTh>Business</DataTableTh>
            <DataTableTh>Submitted</DataTableTh>
            <DataTableTh align="right">Status</DataTableTh>
          </DataTableHead>
          <DataTableBody>
            {users.length === 0 ? (
              <DataTableEmpty colSpan={4} message="No pending verifications right now." />
            ) : (
              users.map((u) => (
                <tr key={u.id} className="group">
                  <DataTableTd>
                    <Link href={`/admin/users/${u.id}/verification`} className="block">
                      <p className="truncate font-semibold text-slate-900 group-hover:text-cliq-purple">{u.name}</p>
                      <p className="truncate text-xs text-slate-500">{u.email}</p>
                    </Link>
                  </DataTableTd>
                  <DataTableTd>
                    {u.kyc?.businessName ?? <span className="text-slate-400">N/A</span>}
                  </DataTableTd>
                  <DataTableTd>
                    {u.kyc?.submittedAt
                      ? new Date(u.kyc.submittedAt).toLocaleString()
                      : <span className="text-slate-400">N/A</span>}
                  </DataTableTd>
                  <DataTableTd align="right">
                    <StatusBadge tone={kycTone(u.kyc?.status)}>
                      {kycLabel(u.kyc?.status)}
                    </StatusBadge>
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
