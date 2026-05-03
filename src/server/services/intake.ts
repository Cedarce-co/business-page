import type { ServiceRequest } from "@prisma/client";
import { prisma } from "@/server/database/prisma";
import { createServiceRequest } from "@/server/services/service-requests";
import { getPublishedQuestionSet } from "@/server/services/intake-question-sets";
import { createNotification } from "@/server/services/notifications";
import type { Prisma } from "@prisma/client";

type Answers = Record<string, unknown>;

export async function getOrCreateDraft(
  userId: string,
  packageTier: string,
  opts?: { fresh?: boolean },
) {
  return prisma.$transaction(async (tx) => {
    if (opts?.fresh) {
      await tx.serviceIntake.deleteMany({
        where: { userId, packageTier, status: "DRAFT" },
      });
    }

    const existing = await tx.serviceIntake.findFirst({
      where: { userId, packageTier, status: "DRAFT" },
      orderBy: { updatedAt: "desc" },
    });
    if (existing) return existing;

    const published = await getPublishedQuestionSet();
    return tx.serviceIntake.create({
      data: {
        userId,
        packageTier,
        status: "DRAFT",
        questionsVer: published.version,
        currentStep: 0,
        answers: {},
      },
    });
  });
}

export async function saveDraft(input: {
  userId: string;
  intakeId: string;
  packageTier: string;
  currentStep: number;
  answers: Answers;
}) {
  const row = await prisma.serviceIntake.findFirst({
    where: {
      id: input.intakeId,
      userId: input.userId,
      status: "DRAFT",
      packageTier: input.packageTier,
    },
  });
  if (!row) return null;

  const published = await getPublishedQuestionSet();
  return prisma.serviceIntake.update({
    where: { id: row.id },
    data: {
      currentStep: input.currentStep,
      answers: input.answers as Prisma.InputJsonValue,
      questionsVer: row.questionsVer || published.version,
    },
  });
}

export async function submitIntake(input: {
  userId: string;
  intakeId: string;
  packageTier: string;
  currentStep: number;
  answers: Answers;
}): Promise<
  | { ok: true; intake: { id: string }; serviceRequest: ServiceRequest }
  | { ok: false; error: string }
> {
  const draft = await prisma.serviceIntake.findFirst({
    where: {
      id: input.intakeId,
      userId: input.userId,
      status: "DRAFT",
      packageTier: input.packageTier,
    },
  });

  if (!draft) {
    return {
      ok: false,
      error: "This draft is no longer available. Refresh the page to continue.",
    };
  }

  const updated = await prisma.serviceIntake.update({
    where: { id: draft.id },
    data: {
      currentStep: input.currentStep,
      answers: input.answers as Prisma.InputJsonValue,
      status: "SUBMITTED",
      submittedAt: new Date(),
      questionsVer: draft.questionsVer,
    },
  });

  const summary =
    (typeof input.answers.business_one_sentence === "string" && input.answers.business_one_sentence.trim()) ||
    (typeof input.answers.business_one_liner === "string" && input.answers.business_one_liner.trim()) ||
    (typeof input.answers.vision_notes === "string" && input.answers.vision_notes.trim()) ||
    (typeof input.answers.anything_else === "string" && input.answers.anything_else.trim()) ||
    `Service intake submitted for ${input.packageTier}`;

  const serviceType = `${input.packageTier} package`;
  const payload = {
    serviceType,
    summary,
    budget:
      (typeof input.answers.budget_mind === "string" && input.answers.budget_mind) ||
      (typeof input.answers.budget_range === "string" && input.answers.budget_range) ||
      undefined,
    timeline:
      (typeof input.answers.timeline_ready === "string" && input.answers.timeline_ready) ||
      (typeof input.answers.timeline === "string" && input.answers.timeline) ||
      undefined,
  };

  const result = await createServiceRequest(input.userId, payload);

  if (!result.ok) {
    await prisma.serviceIntake.update({
      where: { id: updated.id },
      data: { status: "DRAFT", submittedAt: null },
    });
    return { ok: false, error: result.error };
  }

  await prisma.serviceIntake.update({
    where: { id: updated.id },
    data: { serviceRequestId: result.request.id },
  });

  await createNotification({
    userId: input.userId,
    title: "Request received",
    message: "We received your service request. Track its status under My requests.",
    href: `/dashboard/service-requests/${result.request.id}`,
  });

  return { ok: true, intake: updated, serviceRequest: result.request };
}
