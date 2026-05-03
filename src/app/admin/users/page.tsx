import Link from "next/link";
import { prisma } from "@/server/database/prisma";
import StatusBadge from "@/components/admin/StatusBadge";
import { kycLabel, kycTone } from "@/components/admin/status";

function toDate(value: string | undefined) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function adminEmails() {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  const login = (process.env.ADMIN_LOGIN_EMAIL ?? "").trim().toLowerCase();
  if (login) list.push(login);
  return Array.from(new Set(list));
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const qRaw = params.q;
  const q = (Array.isArray(qRaw) ? qRaw[0] : qRaw)?.trim() ?? "";
  const from = toDate(Array.isArray(params.from) ? params.from[0] : params.from);
  const to = toDate(Array.isArray(params.to) ? params.to[0] : params.to);
  const exclude = adminEmails();

  const where = {
    AND: [
      exclude.length ? { email: { notIn: exclude } } : {},
      q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { email: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {},
      from ? { createdAt: { gte: from } } : {},
      to ? { createdAt: { lte: to } } : {},
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
        <p className="text-sm text-slate-600">Search and filter clients, then open for full details and actions.</p>
      </div>

      <form className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name or email"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
        />
        <input
          name="from"
          type="date"
          defaultValue={from ? from.toISOString().slice(0, 10) : ""}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
        />
        <input
          name="to"
          type="date"
          defaultValue={to ? to.toISOString().slice(0, 10) : ""}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
        />
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
          Apply
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">{users.length} users</p>
          <p className="text-xs text-slate-500">Showing up to 100</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="border-b border-slate-200 pb-3 pr-4">Client</th>
                <th className="border-b border-slate-200 pb-3 pr-4">Joined</th>
                <th className="border-b border-slate-200 pb-3 pr-4">Location</th>
                <th className="border-b border-slate-200 pb-3 pr-4">Latest request</th>
                <th className="border-b border-slate-200 pb-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="group">
                  <td className="border-b border-slate-100 py-3 pr-4 align-top">
                    <Link href={`/admin/users/${u.id}`} className="block">
                      <p className="truncate font-semibold text-slate-900 group-hover:underline">{u.name}</p>
                      <p className="truncate text-xs text-slate-500">{u.email}</p>
                    </Link>
                  </td>
                  <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                    {u.profile?.country || u.profile?.city ? (
                      <>
                        {u.profile?.country ?? ""}
                        {u.profile?.city ? `, ${u.profile.city}` : ""}
                      </>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                    {u.serviceRequest[0]?.serviceType ?? <span className="text-slate-400">N/A</span>}
                  </td>
                  <td className="border-b border-slate-100 py-3 text-right align-top text-sm font-semibold text-slate-700">
                    <StatusBadge tone={kycTone(u.kyc?.status)}>
                      {kycLabel(u.kyc?.status)}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 ? <p className="py-6 text-sm text-slate-500">No results.</p> : null}
        </div>
      </div>
    </div>
  );
}

