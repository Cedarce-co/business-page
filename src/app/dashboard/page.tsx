import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import { ActionLink, Badge, Card, Page, Stat } from "@/components/dashboard/ui";
import { requestLabel, requestTone } from "@/components/admin/status";
import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from "@/lib/contact";

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
      subtitle="Track onboarding, verification, and active work - delivered with premium execution."
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
          <ActionLink href="/dashboard/kyc" variant={kycSubmitted ? "secondary" : kycInvalid ? "amber" : "amber"}>
            {kycSubmitted ? "View verification" : kycInvalid ? "Update verification" : kycRejected ? "Resubmit verification" : "Start verification"}
          </ActionLink>
        )
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat
          label="Verification"
          value={
            <span className="inline-flex items-center gap-2">
              <Badge tone={kycDone ? "emerald" : kycSubmitted ? "amber" : kycInvalid ? "amber" : kycRejected ? "rose" : "slate"}>
                {verificationLabel}
              </Badge>
            </span>
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
      </div>

      {!kycDone ? (
        <Card className={kycSubmitted ? "border-slate-200 bg-white/80" : "border-amber-200 bg-[linear-gradient(135deg,rgba(255,251,235,1)_0%,rgba(255,255,255,1)_55%)]"}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
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
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Next steps</h2>
              <p className="mt-1 text-sm text-slate-600">A simple checklist to get you from setup to delivery.</p>
            </div>
            <Badge tone={kycDone ? "emerald" : "amber"}>{kycDone ? "Verified" : "Not verified"}</Badge>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Account verification</p>
                <p className="mt-1 text-sm text-slate-600">Confirm your identity to unlock requests.</p>
              </div>
              {kycDone ? (
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
              )}
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Create a service request</p>
                <p className="mt-1 text-sm text-slate-600">Describe what you need and your timeline.</p>
              </div>
              {kycDone ? (
                <ActionLink href="/dashboard/request-service?fresh=1" variant="primary">
                  New request
                </ActionLink>
              ) : (
                <Badge tone="amber">Locked</Badge>
              )}
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Update profile settings</p>
                <p className="mt-1 text-sm text-slate-600">Keep contact and address details accurate.</p>
              </div>
              <ActionLink href="/dashboard/profile" variant="secondary">
                Open profile
              </ActionLink>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-black text-slate-900">Support</h2>
          <p className="mt-1 text-sm text-slate-600">Need help scoping your request or completing verification?</p>
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <a className="mt-1 block text-sm font-semibold text-slate-900 underline-offset-4 hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
              <a className="mt-1 block text-sm font-semibold text-slate-900 underline-offset-4 hover:underline" href={`tel:${SUPPORT_PHONE_TEL}`}>
                {SUPPORT_PHONE_DISPLAY}
              </a>
            </div>
            <ActionLink href="/contact" variant="secondary" className="w-full">
              Book a consultation
            </ActionLink>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900">Recent requests</h2>
            <p className="text-sm text-slate-600">Each submission is tracked separately with its own status.</p>
          </div>
          {totalRequests > 0 ? (
            <Link
              href="/dashboard/service-requests"
              className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              View all ({totalRequests})
            </Link>
          ) : null}
        </div>

        {requests.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
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
          <div className="space-y-3">
            {requests.map((req: (typeof requests)[number]) => (
              <div key={req.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{req.serviceType}</p>
                    <p className="mt-1 text-sm text-slate-700">{req.summary}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Badge tone={requestTone(req.status)}>{requestLabel(req.status)}</Badge>
                    <Link
                      href={`/dashboard/service-requests/${req.id}`}
                      className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Page>
  );
}
