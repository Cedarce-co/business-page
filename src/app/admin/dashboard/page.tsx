import Link from "next/link";
import { getAdminOverview } from "@/server/services/admin";

type VerificationAcc = { approved: number; underReview: number; rejected: number; notSubmitted: number };
type WorkAcc = { completed: number; inProgress: number; rejected: number; pending: number };

export default async function AdminDashboardPage() {
  const { users, requests, categories } = await getAdminOverview();

  const verification = users.reduce(
    (acc: VerificationAcc, u: { kyc: { status: string } | null }) => {
      const s = u.kyc?.status ?? "PENDING";
      if (s === "APPROVED") acc.approved += 1;
      else if (s === "SUBMITTED") acc.underReview += 1;
      else if (s === "REJECTED") acc.rejected += 1;
      else acc.notSubmitted += 1;
      return acc;
    },
    { approved: 0, underReview: 0, rejected: 0, notSubmitted: 0 },
  );

  const work = requests.reduce(
    (acc: WorkAcc, r: { status: string }) => {
      const s = r.status;
      if (s === "COMPLETED") acc.completed += 1;
      else if (s === "IN_PROGRESS") acc.inProgress += 1;
      else if (s === "REJECTED") acc.rejected += 1;
      else acc.pending += 1;
      return acc;
    },
    { completed: 0, inProgress: 0, rejected: 0, pending: 0 },
  );

  const verTotal = Math.max(1, users.length);
  const workTotal = Math.max(1, requests.length);
  const verPie = `conic-gradient(#16a34a 0 ${(verification.approved / verTotal) * 360}deg,#f59e0b ${(verification.approved / verTotal) * 360}deg ${((verification.approved + verification.underReview) / verTotal) * 360}deg,#ef4444 ${((verification.approved + verification.underReview) / verTotal) * 360}deg ${((verification.approved + verification.underReview + verification.rejected) / verTotal) * 360}deg,#94a3b8 ${((verification.approved + verification.underReview + verification.rejected) / verTotal) * 360}deg 360deg)`;
  const workPie = `conic-gradient(#0f172a 0 ${(work.completed / workTotal) * 360}deg,#2563eb ${(work.completed / workTotal) * 360}deg ${((work.completed + work.inProgress) / workTotal) * 360}deg,#e11d48 ${((work.completed + work.inProgress) / workTotal) * 360}deg ${((work.completed + work.inProgress + work.rejected) / workTotal) * 360}deg,#94a3b8 ${((work.completed + work.inProgress + work.rejected) / workTotal) * 360}deg 360deg)`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Admin dashboard</h1>
        <p className="text-sm text-slate-600">Manage users, approvals, categories, and work status.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Total users</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{users.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Work items</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{requests.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Categories</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{categories.length}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-bold text-slate-900">Categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c: { serviceType: string; _count: { serviceType: number } }) => (
              <span key={c.serviceType} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                {c.serviceType} ({c._count.serviceType})
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-bold text-slate-900">Quick links</h2>
          <div className="mt-3 space-y-2">
            <Link href="/admin/users" className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
              View users (with filters)
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Verification analytics</h2>
              <p className="mt-1 text-sm text-slate-600">Approved vs under review vs declined vs not submitted.</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    Approved
                  </span>
                  <span className="font-semibold">{verification.approved}</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    Under review
                  </span>
                  <span className="font-semibold">{verification.underReview}</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    Rejected
                  </span>
                  <span className="font-semibold">{verification.rejected}</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                    Not submitted
                  </span>
                  <span className="font-semibold">{verification.notSubmitted}</span>
                </p>
              </div>
            </div>
            <div
              className="h-28 w-28 shrink-0 rounded-full ring-1 ring-slate-200"
              style={{ background: verPie }}
              aria-label="Verification pie chart"
              title="Verification breakdown"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Work analytics</h2>
              <p className="mt-1 text-sm text-slate-600">Service request status overview.</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
                    Completed
                  </span>
                  <span className="font-semibold">{work.completed}</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    In progress
                  </span>
                  <span className="font-semibold">{work.inProgress}</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-600" />
                    Rejected
                  </span>
                  <span className="font-semibold">{work.rejected}</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                    Pending review
                  </span>
                  <span className="font-semibold">{work.pending}</span>
                </p>
              </div>
            </div>
            <div
              className="h-28 w-28 shrink-0 rounded-full ring-1 ring-slate-200"
              style={{ background: workPie }}
              aria-label="Work pie chart"
              title="Work status breakdown"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

