import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import { ActionLink, Badge, Page, PageSection } from "@/components/dashboard/ui";
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

  return (
    <Page
      title="Request a service"
      subtitle="Submit a new intake for another package or scope. Each submission creates its own request with its own timeline."
      right={kycDone ? <Badge tone="emerald">Verified</Badge> : <Badge tone="rose">Verification required</Badge>}
    >
      {!kycDone ? (
        <PageSection tone="warning">
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
        </PageSection>
      ) : (
        <RequestWizard packageTier={packageTier} startFresh={startFresh} />
      )}
    </Page>
  );
}
