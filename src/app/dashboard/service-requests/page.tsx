import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import { ActionLink, Badge, Card, Page } from "@/components/dashboard/ui";
import { requestLabel, requestTone } from "@/components/admin/status";

export default async function MyServiceRequestsPage() {
  const session = await requireUser();
  const requests = await prisma.serviceRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Page
      title="My service requests"
      subtitle="Track each request separately. Status updates appear here as your project moves forward."
      right={<ActionLink href="/dashboard/request-service?fresh=1">New request</ActionLink>}
    >
      {requests.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-slate-700">You have not submitted a service request yet.</p>
          <ActionLink href="/dashboard/request-service?fresh=1" variant="primary" className="mt-4 inline-flex">
            Request a service
          </ActionLink>
        </Card>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{r.serviceType}</p>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">{r.summary}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Submitted {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Badge tone={requestTone(r.status)}>{requestLabel(r.status)}</Badge>
                  <Link
                    href={`/dashboard/service-requests/${r.id}`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    View request
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Page>
  );
}
