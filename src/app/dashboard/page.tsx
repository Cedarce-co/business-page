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
      subtitle="See your verification, your requests and the progress of your work."
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
            {kycSubmitted ? "View verification" : kycInvalid ? "Update verification" : kycRejected ? "Send verification again" : "Start verification"}
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
                    ? "Update your business details and send again."
                    : kycRejected
                      ? "Update your details and send again."
                      : "Needed before you can request a service."
            }
          />
          <Stat label="Requests" value={totalRequests} hint="Requests you have sent so far." />
          <Stat label="Account" value={<Badge tone="emerald">Active</Badge>} hint="Your account is ready." />
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
                      ? "Some of your business details need fixing. Please update them and send again."
                      : kycRejected
                        ? "We could not verify your business. Please update your details and send again."
                        : "Verify your business to start requesting services"}
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {kycSubmitted
                  ? "Our team is checking your business details and documents. We will email you once you are approved."
                  : kycInvalid
                    ? "Open your verification page, fix the details, and send again."
                    : "Your account is ready. Please verify your business before requesting a service."}
              </p>
            </div>
            <ActionLink href="/dashboard/kyc" variant={kycSubmitted ? "secondary" : kycInvalid ? "amber" : kycRejected ? "danger" : "amber"}>
              {kycSubmitted ? "View details" : kycInvalid ? "Update verification" : kycRejected ? "Send verification again" : "Start verification"}
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
                title="Verify your business"
                description="Confirm who you are so we can start work."
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
                      {kycRejected ? "Send again" : "Verify now"}
                    </ActionLink>
                  )
                }
              />
              <ChecklistRow
                title="Request a service"
                description="Tell us what you need and when you need it."
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
                title="Update your profile"
                description="Keep your contact details and address up to date."
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
              <p className="mt-1 text-sm text-slate-600">Need help with your request or with verification?</p>
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
        description="Each request has its own progress."
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
            <p className="mt-1 text-sm text-slate-600">Send your first request and we will get started.</p>
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
