import { ArrowRight } from "lucide-react";
import { ActionLink, Badge, Page, PageSection, Stat, StatRow, TwoColumn } from "@/components/dashboard/ui";
import { getAdminOverview } from "@/server/services/admin";

type VerificationAcc = { approved: number; underReview: number; rejected: number; notSubmitted: number };
type WorkAcc = { completed: number; active: number; rejected: number; pending: number; closed: number };

function LegendRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <p className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} aria-hidden />
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </p>
  );
}

function AnalyticsPanel({
  title,
  description,
  pie,
  children,
}: {
  title: string;
  description: string;
  pie: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
        <div className="mt-5 grid gap-2 text-sm text-slate-700">{children}</div>
      </div>
      <div
        className="relative h-32 w-32 shrink-0 rounded-full p-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.35)]"
        style={{ background: pie }}
        aria-label={`${title} pie chart`}
        title={title}
      >
        <div className="h-full w-full rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(226,232,240,0.9)]" />
      </div>
    </div>
  );
}

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
      if (s === "COMPLETED" || s === "PROJECT_COMPLETED") acc.completed += 1;
      else if (["CONSULTATION", "PRICING", "PROJECT_STARTED", "PROJECT_UNDER_REVIEW", "IN_PROGRESS"].includes(s)) {
        acc.active += 1;
      } else if (s === "REJECTED") acc.rejected += 1;
      else if (s === "CLOSED") acc.closed += 1;
      else acc.pending += 1;
      return acc;
    },
    { completed: 0, active: 0, rejected: 0, pending: 0, closed: 0 },
  );

  const verTotal = Math.max(1, users.length);
  const workTotal = Math.max(1, requests.length);
  const verPie = `conic-gradient(#16a34a 0 ${(verification.approved / verTotal) * 360}deg,#f59e0b ${(verification.approved / verTotal) * 360}deg ${((verification.approved + verification.underReview) / verTotal) * 360}deg,#ef4444 ${((verification.approved + verification.underReview) / verTotal) * 360}deg ${((verification.approved + verification.underReview + verification.rejected) / verTotal) * 360}deg,#94a3b8 ${((verification.approved + verification.underReview + verification.rejected) / verTotal) * 360}deg 360deg)`;
  const workPie = `conic-gradient(#0f172a 0 ${(work.completed / workTotal) * 360}deg,#2563eb ${(work.completed / workTotal) * 360}deg ${((work.completed + work.active) / workTotal) * 360}deg,#f59e0b ${((work.completed + work.active) / workTotal) * 360}deg ${((work.completed + work.active + work.pending) / workTotal) * 360}deg,#e11d48 ${((work.completed + work.active + work.pending) / workTotal) * 360}deg ${((work.completed + work.active + work.pending + work.rejected) / workTotal) * 360}deg,#64748b ${((work.completed + work.active + work.pending + work.rejected) / workTotal) * 360}deg 360deg)`;

  return (
    <Page
      title="Admin dashboard"
      subtitle="Manage users, approvals, categories, and work status from one polished command center."
      right={<ActionLink href="/admin/requests">Review requests</ActionLink>}
    >
      <PageSection tone="muted" bleed>
        <StatRow>
          <Stat label="Total users" value={users.length} hint="Registered client accounts" />
          <Stat label="Work items" value={requests.length} hint="All service requests" />
          <Stat label="Categories" value={categories.length} hint="Active request types" />
        </StatRow>
      </PageSection>

      <PageSection>
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-slate-200">
          <div className="px-6 py-8 lg:px-9 lg:py-9">
            <AnalyticsPanel title="Verification analytics" description="Approved vs under review vs declined vs not submitted." pie={verPie}>
              <LegendRow color="bg-emerald-600" label="Approved" value={verification.approved} />
              <LegendRow color="bg-amber-500" label="Under review" value={verification.underReview} />
              <LegendRow color="bg-rose-500" label="Rejected" value={verification.rejected} />
              <LegendRow color="bg-slate-400" label="Not submitted" value={verification.notSubmitted} />
            </AnalyticsPanel>
          </div>
          <div className="border-t border-slate-200 px-6 py-8 lg:border-t-0 lg:px-9 lg:py-9">
            <AnalyticsPanel title="Work analytics" description="Grouped by request lifecycle stage, including newer project statuses." pie={workPie}>
              <LegendRow color="bg-slate-900" label="Completed" value={work.completed} />
              <LegendRow color="bg-blue-600" label="Active project" value={work.active} />
              <LegendRow color="bg-amber-500" label="Pending review" value={work.pending} />
              <LegendRow color="bg-rose-600" label="Rejected" value={work.rejected} />
              <LegendRow color="bg-slate-500" label="Closed" value={work.closed} />
            </AnalyticsPanel>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <TwoColumn
          left={
            <>
              <h2 className="text-lg font-bold text-slate-900">Categories</h2>
              <p className="mt-1 text-sm text-slate-600">Most requested service types across client submissions.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.length === 0 ? (
                  <p className="text-sm text-slate-500">No request categories yet.</p>
                ) : (
                  categories.map((c: { serviceType: string; _count: { serviceType: number } }) => (
                    <Badge key={c.serviceType} tone="slate">
                      {c.serviceType} ({c._count.serviceType})
                    </Badge>
                  ))
                )}
              </div>
            </>
          }
          right={
            <>
              <h2 className="text-lg font-bold text-slate-900">Quick links</h2>
              <p className="mt-1 text-sm text-slate-600">Jump into the most common admin tasks.</p>
              <div className="mt-4 grid gap-2">
                <ActionLink href="/admin/verifications" variant="secondary" className="w-full justify-between">
                  Pending verifications
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ActionLink>
                <ActionLink href="/admin/requests" variant="secondary" className="w-full justify-between">
                  All service requests
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ActionLink>
                <ActionLink href="/admin/users" variant="secondary" className="w-full justify-between">
                  View users (with filters)
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ActionLink>
              </div>
            </>
          }
        />
      </PageSection>
    </Page>
  );
}
