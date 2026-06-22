import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/server/database/prisma";
import StatusBadge from "@/components/admin/StatusBadge";
import { kycLabel, kycTone } from "@/components/admin/status";
import { loadAdminEmailsFromDb } from "@/server/services/mfa";
import {
  DataTable,
  DataTableBody,
  DataTableEmpty,
  DataTableHead,
  DataTableTd,
  DataTableTh,
} from "@/components/ui/DataTable";
import TableFilterBar from "@/components/ui/TableFilterBar";
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

  const users = await prisma.user.findMany({
    where,
    include: { kyc: true, profile: true, serviceRequest: { take: 1, orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Users</h1>
        <p className="text-sm text-slate-600">Search by user ID, name, or email. Open a row for full details.</p>
      </div>

      <Suspense fallback={<div className="h-20 rounded-2xl border border-slate-200 bg-white" />}>
        <TableFilterBar searchPlaceholder="Search user ID, name, or email…" showStatus={false} />
      </Suspense>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-semibold text-slate-900">{users.length} users</p>
          <p className="text-xs text-slate-500">Showing up to 100</p>
        </div>

        <DataTable minWidth="920px">
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
                <tr key={u.id} className="hover:bg-slate-50/80">
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
      </div>
    </div>
  );
}
