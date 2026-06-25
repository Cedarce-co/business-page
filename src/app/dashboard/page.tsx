import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import {
  ActionLink,
  Badge,
  ChecklistRow,
  ListRow,
  Page,
  PageSection,
  Stat,
  StatRow,
  TwoColumn,
} from "@/components/dashboard/ui";
import ContactInfoList from "@/components/ui/ContactInfoList";
import { requestLabel, requestTone } from "@/components/admin/status";

export default async function DashboardHomePage() {
  const session = await requireUser();
  const [kyc, requests, totalRequests] = await Promise.all([
    prisma.kyc.findUnique({ where: { userId: session.user.id } }),
    prisma.serviceRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.serviceRequest.count({ where: { userId: session.user.id } }),
  ]);

  const kycStatus = kyc?.status ?? "PENDING";
  const kycDone = kycStatus === "APPROVED";
  const kycSubmitted = kycStatus === "SUBMITTED";
  const kycInvalid = kycStatus === "INVALID_INFO";
  const kycRejected = kycStatus === "REJECTED";

  const verificationLabel =
    kycDone ? "Verified" : kycSubmitted ? "Under review" : kycInvalid ? "Invalid info" : kycRejected ? "Rejected" : "Not submitted";

  return (
    <Page
      title="Dashboard"
      subtitle="Track onboarding, verification, and active work."
      right={
        kycDone ? (
          <div className="flex flex-wrap items-center gap-2">
            <ActionLink href="/dashboard/service-requests" variant="secondary">
              My requests
            </ActionLink>
            <ActionLink href="/dashboard/request-service?fresh=1" variant="primary">
              New request
            </ActionLink>
          </div>
        ) : (
          <ActionLink href="/dashboard/kyc" variant={kycSubmitted ? "secondary" : "amber"}>
            {kycSubmitted ? "View verification" : kycInvalid ? "Update verification" : kycRejected ? "Resubmit verification" : "Start verification"}
          </ActionLink>
        )
      }
    >
      <PageSection tone="muted" bleed>
        <StatRow>
          <Stat
            label="Verification"
            value={
              <Badge tone={kycDone ? "emerald" : kycSubmitted ? "amber" : kycInvalid ? "amber" : kycRejected ? "rose" : "slate"}>
                {verificationLabel}
              </Badge>
            }
            hint={
              kycDone
                ? "You can request any service."
                : kycSubmitted
                  ? "Awaiting approval."
                  : kycInvalid
                    ? "Update your business information and resubmit."
                    : kycRejected
                      ? "Update details and resubmit."
                      : "Required before requesting services."
            }
          />
          <Stat label="Requests" value={totalRequests} hint="Service requests created so far." />
          <Stat label="Account" value={<Badge tone="emerald">Active</Badge>} hint="Your portal is ready." />
        </StatRow>
      </PageSection>

      {!kycDone ? (
        <PageSection tone="warning">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={kycSubmitted ? "slate" : kycInvalid ? "amber" : kycRejected ? "rose" : "amber"}>
                  {kycSubmitted ? "Under review" : kycInvalid ? "Update needed" : kycRejected ? "Action required" : "Action required"}
                </Badge>
                <p className="text-sm font-semibold text-slate-900">
                  {kycSubmitted
                    ? "Verification submitted. Awaiting approval."
                    : kycInvalid
                      ? "Some business information is invalid. Please update and resubmit."
                      : kycRejected
                        ? "Verification was rejected. Please update and resubmit."
                        : "Complete account verification to unlock service requests"}
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {kycSubmitted
                  ? "Our team is reviewing your business details and documents. You will get an email once approved."
                  : kycInvalid
                    ? "Open your verification page, correct the details, and submit again."
                    : "Your account is active. Verification is required before requesting services."}
              </p>
            </div>
            <ActionLink href="/dashboard/kyc" variant={kycSubmitted ? "secondary" : kycInvalid ? "amber" : kycRejected ? "danger" : "amber"}>
              {kycSubmitted ? "View details" : kycInvalid ? "Update verification" : kycRejected ? "Resubmit verification" : "Start verification"}
            </ActionLink>
          </div>
        </PageSection>
      ) : null}

      <PageSection>
        <TwoColumn
          left={
            <>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Next steps</h2>
                  <p className="mt-1 text-sm text-slate-600">A simple checklist to get you from setup to delivery.</p>
                </div>
                <Badge tone={kycDone ? "emerald" : "amber"}>{kycDone ? "Verified" : "Not verified"}</Badge>
              </div>
              <div className="divide-y divide-slate-200">
              <ChecklistRow
                title="Account verification"
                description="Confirm your identity to unlock requests."
                action={
                  kycDone ? (
                    <Badge tone="emerald">Done</Badge>
                  ) : kycSubmitted ? (
                    <Badge tone="amber">Under review</Badge>
                  ) : kycInvalid ? (
                    <ActionLink href="/dashboard/kyc" variant="amber">
                      Update now
                    </ActionLink>
                  ) : (
                    <ActionLink href="/dashboard/kyc" variant={kycRejected ? "danger" : "amber"}>
                      {kycRejected ? "Resubmit" : "Verify now"}
                    </ActionLink>
                  )
                }
              />
              <ChecklistRow
                title="Create a service request"
                description="Describe what you need and your timeline."
                action={
                  kycDone ? (
                    <ActionLink href="/dashboard/request-service?fresh=1" variant="primary">
                      New request
                    </ActionLink>
                  ) : (
                    <Badge tone="amber">Locked</Badge>
                  )
                }
              />
              <ChecklistRow
                title="Update profile settings"
                description="Keep contact and address details accurate."
                action={
                  <ActionLink href="/dashboard/profile" variant="secondary">
                    Open profile
                  </ActionLink>
                }
              />
              </div>
            </>
          }
          right={
            <>
              <h2 className="text-lg font-black text-slate-900">Support</h2>
              <p className="mt-1 text-sm text-slate-600">Need help scoping your request or completing verification?</p>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <ContactInfoList variant="dashboard" showHours hours="short" />
              </div>
              <div className="mt-6">
                <ActionLink href="/contact" variant="secondary" className="w-full sm:w-auto">
                  Book a consultation
                </ActionLink>
              </div>
            </>
          }
        />
      </PageSection>

      <PageSection
        title="Recent requests"
        description="Each submission is tracked separately with its own status."
      >
        {totalRequests > 0 ? (
          <p className="-mt-4 mb-4 text-right text-sm">
            <Link href="/dashboard/service-requests" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
              View all ({totalRequests})
            </Link>
          </p>
        ) : null}

        {requests.length === 0 ? (
          <div className="border-t border-dashed border-slate-200 py-8 text-center">
            <p className="text-sm font-semibold text-slate-800">No requests yet</p>
            <p className="mt-1 text-sm text-slate-600">Create a request to start your delivery workflow.</p>
            <div className="mt-4">
              {kycDone ? (
                <ActionLink href="/dashboard/request-service?fresh=1" variant="primary">
                  Create a request
                </ActionLink>
              ) : (
                <ActionLink href="/dashboard/kyc" variant="amber">
                  Verify to unlock requests
                </ActionLink>
              )}
            </div>
          </div>
        ) : (
          <div className="border-t border-slate-200">
            {requests.map((req: (typeof requests)[number]) => (
              <ListRow key={req.id} href={`/dashboard/service-requests/${req.id}`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-cliq-purple">{req.serviceType}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-700">{req.summary}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Badge tone={requestTone(req.status)}>{requestLabel(req.status)}</Badge>
                    <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-900">View →</span>
                  </div>
                </div>
              </ListRow>
            ))}
          </div>
        )}
      </PageSection>
    </Page>
  );
}
