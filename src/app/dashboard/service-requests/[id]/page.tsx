import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import { ActionLink, Badge, Card, Page } from "@/components/dashboard/ui";
import { requestLabel, requestTone } from "@/components/admin/status";
import IntakeAnswersReadout from "@/components/intake/IntakeAnswersReadout";
import { getQuestionSetForVersion } from "@/server/services/intake-question-sets";
import {
  formatChoiceByQuestionId,
  formatIntakeAnswersToSections,
} from "@/features/intake/format-answers";

export default async function ServiceRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireUser();
  const { id } = await params;

  const request = await prisma.serviceRequest.findFirst({
    where: { id, userId: session.user.id },
    include: {
      intake: true,
    },
  });

  if (!request) notFound();

  const qset = await getQuestionSetForVersion(request.intake?.questionsVer ?? "");
  const answersRaw = request.intake?.answers;
  const answersObj =
    answersRaw && typeof answersRaw === "object" && !Array.isArray(answersRaw)
      ? (answersRaw as Record<string, unknown>)
      : {};
  const answerSections = formatIntakeAnswersToSections(qset.questions, answersObj);
  const budgetDisplay = formatChoiceByQuestionId(qset.questions, "budget_mind", request.budget);
  const timelineDisplay = formatChoiceByQuestionId(qset.questions, "timeline_ready", request.timeline);

  return (
    <Page
      title="Service request"
      subtitle="Read-only summary. We may reach out directly as work progresses."
      right={<Badge tone={requestTone(request.status)}>{requestLabel(request.status)}</Badge>}
    >
      <div className="mb-6">
        <Link
          href="/dashboard/service-requests"
          className="text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
        >
          ← All requests
        </Link>
      </div>

      <div className="space-y-4">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Package & summary</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{request.serviceType}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{request.summary}</p>
          </div>
          <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
            <div className="bg-white px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Budget</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{budgetDisplay}</p>
            </div>
            <div className="bg-white px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Timeline</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{timelineDisplay}</p>
            </div>
          </div>
          <p className="px-5 py-3 text-xs text-slate-500">
            Submitted {new Date(request.createdAt).toLocaleString()}
            {request.updatedAt.getTime() !== request.createdAt.getTime()
              ? ` · Updated ${new Date(request.updatedAt).toLocaleString()}`
              : ""}
          </p>
        </Card>

        {request.reviewNote ? (
          <Card className="border-amber-200 bg-amber-50/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">Note from us</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-900">{request.reviewNote}</p>
          </Card>
        ) : null}

        {request.intake ? (
          <Card className="p-5">
            <p className="text-sm font-bold text-slate-900">Your submitted answers</p>
            <p className="mt-1 text-sm text-slate-600">
              What you told us when you completed the intake. Contact us if anything needs to change.
            </p>
            <div className="mt-6 min-h-0">
              <IntakeAnswersReadout
                sections={answerSections}
                meta={{
                  packageTier: request.intake.packageTier,
                  questionsVer: request.intake.questionsVer,
                  submittedAt: request.intake.submittedAt ? request.intake.submittedAt.toISOString() : null,
                }}
              />
            </div>
          </Card>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <ActionLink href="/dashboard/service-requests" variant="secondary">
            Back to list
          </ActionLink>
          <ActionLink href="/dashboard/request-service" variant="primary">
            New request
          </ActionLink>
        </div>
      </div>
    </Page>
  );
}
