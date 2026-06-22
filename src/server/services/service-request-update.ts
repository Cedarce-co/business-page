import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/database/prisma";
import { canUserEditServiceRequest } from "@/lib/service-request-edit";
import {
  intakeBudgetFromAnswers,
  intakeSummaryFromAnswers,
  intakeTimelineFromAnswers,
} from "@/features/intake/summary-from-answers";
import { getQuestionSetForVersion } from "@/server/services/intake-question-sets";
import { getIntakeAccountDefaults } from "@/server/services/intake-contact";
import { mergeIntakeAnswers } from "@/features/intake/account-defaults";
import { createNotification, notifyAdmins } from "@/server/services/notifications";
import { emailAdminsSafe, sendEmailSafe } from "@/server/emails/sender";
import { serviceRequestUpdatedUserEmail } from "@/server/emails/templates/service-request";
import { escapeHtml } from "@/server/emails/helpers";
import { getAppUrl } from "@/server/emails/sender";

type Answers = Record<string, unknown>;

export async function updateServiceRequestIntake(input: {
  userId: string;
  requestId: string;
  answers: Answers;
}) {
  const request = await prisma.serviceRequest.findFirst({
    where: { id: input.requestId, userId: input.userId },
    include: { intake: true, user: { select: { name: true, email: true } } },
  });

  if (!request) {
    return { ok: false as const, error: "Request not found." };
  }

  if (!request.intake) {
    return { ok: false as const, error: "This request has no intake form to update." };
  }

  if (!canUserEditServiceRequest({ status: request.status, createdAt: request.createdAt })) {
    return { ok: false as const, error: "This request can no longer be edited." };
  }

  const packageTier = request.intake.packageTier;
  const accountDefaults = await getIntakeAccountDefaults(input.userId);
  const answers = mergeIntakeAnswers(accountDefaults, input.answers);
  const summary = intakeSummaryFromAnswers(answers, packageTier);
  const budget = intakeBudgetFromAnswers(answers);
  const timeline = intakeTimelineFromAnswers(answers);
  const wasNeedsInfo = request.status === "NEEDS_INFO";

  const updated = await prisma.$transaction(async (tx) => {
    await tx.serviceIntake.update({
      where: { id: request.intake!.id },
      data: {
        answers: answers as Prisma.InputJsonValue,
        submittedAt: new Date(),
      },
    });

    return tx.serviceRequest.update({
      where: { id: request.id },
      data: {
        summary,
        budget: budget ?? null,
        timeline: timeline ?? null,
        status: wasNeedsInfo ? "PENDING_REVIEW" : request.status,
        updatedAt: new Date(),
      },
    });
  });

  await createNotification({
    userId: input.userId,
    title: wasNeedsInfo ? "Request updated" : "Request saved",
    message: wasNeedsInfo
      ? "Thanks — we received your updates and will review them shortly."
      : "Your service request was updated.",
    href: `/dashboard/service-requests/${request.id}`,
  });

  if (request.user.email) {
    const tpl = serviceRequestUpdatedUserEmail({
      serviceType: updated.serviceType,
      statusLabel: wasNeedsInfo ? "Back under review" : "Updated",
      note: wasNeedsInfo ? "We received your additional information." : null,
    });
    await sendEmailSafe({ to: request.user.email, subject: tpl.subject, html: tpl.html });
  }

  if (wasNeedsInfo) {
    const adminUrl = `${getAppUrl()}/admin/requests/${request.id}`;
    await emailAdminsSafe(
      `Request updated: ${request.user.name}`,
      `
        <div style="font-family:Inter,system-ui,sans-serif;line-height:1.55">
          <h2 style="margin:0 0 10px;color:#0f172a">Client provided more information</h2>
          <p style="margin:0 0 14px;color:#334155">
            <b>${escapeHtml(request.user.name)}</b> updated their service request after your review note.
          </p>
          <p style="margin:0">
            <a href="${adminUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
              Review request
            </a>
          </p>
        </div>
      `,
    );

    await notifyAdmins({
      title: "Request updated by client",
      message: `${request.user.name} submitted additional information.`,
      href: `/admin/requests/${request.id}`,
    });
  }

  return { ok: true as const, request: updated };
}

export async function getServiceRequestForEdit(userId: string, requestId: string) {
  const request = await prisma.serviceRequest.findFirst({
    where: { id: requestId, userId },
    include: { intake: true },
  });
  if (!request?.intake) return null;

  const qset = await getQuestionSetForVersion(request.intake.questionsVer);
  const answersRaw = request.intake.answers;
  const answers =
    answersRaw && typeof answersRaw === "object" && !Array.isArray(answersRaw)
      ? (answersRaw as Answers)
      : {};

  return {
    request,
    questions: qset.questions,
    answers,
    canEdit: canUserEditServiceRequest({ status: request.status, createdAt: request.createdAt }),
  };
}
