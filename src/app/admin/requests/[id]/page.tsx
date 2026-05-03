import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminUser } from "@/lib/server-auth";
import { prisma } from "@/server/database/prisma";
import ServiceRequestReviewClient from "@/components/admin/ServiceRequestReviewClient";
import { getQuestionSetForVersion } from "@/server/services/intake-question-sets";
import {
  formatChoiceByQuestionId,
  formatIntakeAnswersToSections,
} from "@/features/intake/format-answers";

export default async function AdminServiceRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminUser();
  const { id } = await params;

  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Service request</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{request.serviceType}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {request.user.name} · {request.user.email}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href={`/admin/users/${request.user.id}`}
              className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              View client profile
            </Link>
            <Link href="/admin/dashboard" className="text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline">
              Admin home
            </Link>
          </div>
        </div>
      </div>

      <ServiceRequestReviewClient
        request={{
          id: request.id,
          createdAt: request.createdAt.toISOString(),
          status: request.status,
          serviceType: request.serviceType,
          summary: request.summary,
          budget: request.budget,
          timeline: request.timeline,
          reviewNote: request.reviewNote,
          intake: request.intake
            ? {
                id: request.intake.id,
                packageTier: request.intake.packageTier,
                status: request.intake.status,
                questionsVer: request.intake.questionsVer,
                submittedAt: request.intake.submittedAt ? request.intake.submittedAt.toISOString() : null,
              }
            : null,
        }}
        answerSections={answerSections}
        budgetDisplay={budgetDisplay}
        timelineDisplay={timelineDisplay}
        intakeMeta={
          request.intake
            ? {
                packageTier: request.intake.packageTier,
                questionsVer: request.intake.questionsVer,
                submittedAt: request.intake.submittedAt ? request.intake.submittedAt.toISOString() : null,
              }
            : undefined
        }
      />
    </div>
  );
}
