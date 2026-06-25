import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/server/database/prisma";
import StatusBadge from "@/components/admin/StatusBadge";
import { kycLabel, kycTone } from "@/components/admin/status";
import { loadAdminEmailsFromDb } from "@/server/services/mfa";
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
import TableFilterBar from "@/components/ui/TableFilterBar";
import TablePagination from "@/components/ui/TablePagination";
import CopyableId from "@/components/ui/CopyableId";

type AdminUsersRow = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  profile: { country: string | null; city: string | null } | null;
  kyc: { status: string } | null;
  serviceRequest: { serviceType: string }[];
};

function adminEmails() {
  return loadAdminEmailsFromDb();
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const qRaw = params.q;
  const q = (Array.isArray(qRaw) ? qRaw[0] : qRaw)?.trim() ?? "";
  const { page, perPage, skip, take } = parseTablePagination(params);
  const exclude = await adminEmails();

  const where = {
    AND: [
      exclude.length ? { email: { notIn: exclude } } : {},
      q
        ? {
            OR: [
              { id: { contains: q, mode: "insensitive" as const } },
              { name: { contains: q, mode: "insensitive" as const } },
              { email: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {},
    ],
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { kyc: true, profile: true, serviceRequest: { take: 1, orderBy: { createdAt: "desc" } } },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.user.count({ where }),
  ]);

  const { safePage } = resolveTablePage(page, total, perPage);

  return (
    <Page title="Users" subtitle="Search by user ID, name, or email. Open a row for full details.">
      <DataTablePanel
        filter={
          <Suspense fallback={<div className="h-11 animate-pulse rounded-xl bg-slate-200/60" />}>
            <TableFilterBar searchPlaceholder="Search user ID, name, or email…" showStatus={false} />
          </Suspense>
        }
        pagination={
          <Suspense fallback={null}>
            <TablePagination total={total} page={safePage} perPage={perPage} />
          </Suspense>
        }
      >
        <DataTable embedded minWidth="920px">
          <DataTableHead>
            <DataTableTh>User ID</DataTableTh>
            <DataTableTh>Client</DataTableTh>
            <DataTableTh>Joined</DataTableTh>
            <DataTableTh>Location</DataTableTh>
            <DataTableTh>Latest request</DataTableTh>
            <DataTableTh align="right">Verification</DataTableTh>
          </DataTableHead>
          <DataTableBody>
            {users.length === 0 ? (
              <DataTableEmpty colSpan={6} message="No users match your search." />
            ) : (
              users.map((u: AdminUsersRow) => (
                <tr key={u.id}>
                  <DataTableTd>
                    <CopyableId value={u.id} href={`/admin/users/${u.id}`} label="User ID" />
                  </DataTableTd>
                  <DataTableTd>
                    <Link href={`/admin/users/${u.id}`} className="block">
                      <p className="font-semibold text-slate-900">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </Link>
                  </DataTableTd>
                  <DataTableTd>{new Date(u.createdAt).toLocaleDateString()}</DataTableTd>
                  <DataTableTd>
                    {u.profile?.country || u.profile?.city ? (
                      <>
                        {u.profile?.country ?? ""}
                        {u.profile?.city ? `, ${u.profile.city}` : ""}
                      </>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </DataTableTd>
                  <DataTableTd>{u.serviceRequest[0]?.serviceType ?? <span className="text-slate-400">N/A</span>}</DataTableTd>
                  <DataTableTd align="right">
                    <StatusBadge tone={kycTone(u.kyc?.status)}>{kycLabel(u.kyc?.status)}</StatusBadge>
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
