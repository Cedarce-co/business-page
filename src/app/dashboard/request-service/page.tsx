import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import { ActionLink, Badge, Card, Page } from "@/components/dashboard/ui";
import { requestLabel, requestTone } from "@/components/admin/status";
import RequestWizard from "@/components/dashboard/RequestWizard";

export default async function RequestServicePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireUser();
  const params = await searchParams;
  const pkgRaw = params.package;
  const resumeRaw = params.resume;
  const packageTier = (Array.isArray(pkgRaw) ? pkgRaw[0] : pkgRaw) ?? "Business";
  /** Default = start a clean form. Only `?resume=1` re-opens an in-progress draft (e.g. from sidebar). */
  const resume =
    resumeRaw === "1" ||
    resumeRaw === "true" ||
    (Array.isArray(resumeRaw) && (resumeRaw[0] === "1" || resumeRaw[0] === "true"));
  const startFresh = !resume;

  const kyc = await prisma.kyc.findUnique({ where: { userId: session.user.id } });
  const kycDone = kyc?.status === "APPROVED";

  const existingRequests = kycDone
    ? await prisma.serviceRequest.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 6,
      })
    : [];

  return (
    <Page
      title="Request a service"
      subtitle="Submit a new intake for another package or scope. Each submission creates its own request with its own timeline."
      right={kycDone ? <Badge tone="emerald">Verified</Badge> : <Badge tone="rose">Verification required</Badge>}
    >
      {!kycDone ? (
        <Card className="border-rose-200 bg-[linear-gradient(135deg,rgba(255,241,242,1)_0%,rgba(255,255,255,1)_60%)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-slate-900">Verification required</p>
              <p className="mt-1 text-sm text-slate-700">
                Complete account verification first, then return here to submit your request.
              </p>
            </div>
            <ActionLink href="/dashboard/kyc" variant="danger">
              Verify now
            </ActionLink>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {existingRequests.length > 0 ? (
            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Your requests</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Submissions are read-only so work can progress without conflicting edits. Track status on each request.
                  </p>
                </div>
                <Link
                  href="/dashboard/service-requests"
                  className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                >
                  View all
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {existingRequests.map((r) => (
                  <li
                    key={r.id}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{r.serviceType}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{r.summary}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Badge tone={requestTone(r.status)}>{requestLabel(r.status)}</Badge>
                      <Link
                        href={`/dashboard/service-requests/${r.id}`}
                        className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          <RequestWizard packageTier={packageTier} startFresh={startFresh} />
        </div>
      )}
    </Page>
  );
}
