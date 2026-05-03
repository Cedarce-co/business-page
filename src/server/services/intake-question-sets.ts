import "server-only";

import type { IntakeQuestionSet, Prisma } from "@prisma/client";
import { prisma } from "@/server/database/prisma";
import { intakeQuestionsResponseSchema } from "@/features/intake/types";
import { INTAKE_QUESTIONS, INTAKE_QUESTIONS_VERSION } from "@/server/intake/questions";

export type IntakeQuestionSetRecord = {
  id: string;
  version: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  title: string;
  questions: unknown;
  createdAt: Date;
  updatedAt: Date;
};

function normalizeTitleFromVersion(version: string) {
  return `Intake questions (${version})`;
}

export async function ensurePublishedQuestionSet() {
  const existing = await prisma.intakeQuestionSet.findFirst({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  if (existing?.version === INTAKE_QUESTIONS_VERSION) {
    return existing;
  }

  if (existing && existing.version !== INTAKE_QUESTIONS_VERSION) {
    // Official questionnaire version changed: archive old published set and install the new default.
    await prisma.$transaction(async (tx) => {
      await tx.intakeQuestionSet.updateMany({
        where: { status: "PUBLISHED" },
        data: { status: "ARCHIVED" },
      });
      await tx.intakeQuestionSet.create({
        data: {
          version: INTAKE_QUESTIONS_VERSION,
          status: "PUBLISHED",
          title: normalizeTitleFromVersion(INTAKE_QUESTIONS_VERSION),
          questions: {
            version: INTAKE_QUESTIONS_VERSION,
            questions: INTAKE_QUESTIONS,
          },
        },
      });
    });
    return (await prisma.intakeQuestionSet.findFirst({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    }))!;
  }

  return prisma.intakeQuestionSet.create({
    data: {
      version: INTAKE_QUESTIONS_VERSION,
      status: "PUBLISHED",
      title: normalizeTitleFromVersion(INTAKE_QUESTIONS_VERSION),
      questions: {
        version: INTAKE_QUESTIONS_VERSION,
        questions: INTAKE_QUESTIONS,
      },
    },
  });
}

export async function getPublishedQuestionSet() {
  const set = await ensurePublishedQuestionSet();
  const parsed = intakeQuestionsResponseSchema.safeParse(set.questions);
  if (!parsed.success) {
    // If DB got corrupted, fall back to code so the product still works.
    return {
      version: INTAKE_QUESTIONS_VERSION,
      questions: INTAKE_QUESTIONS,
    };
  }
  return parsed.data;
}

/** Load the questionnaire used for an intake snapshot (by version). Falls back to published if archived/missing. */
export async function getQuestionSetForVersion(version: string) {
  const row = await prisma.intakeQuestionSet.findFirst({
    where: { version },
    orderBy: { createdAt: "desc" },
  });
  if (row) {
    const parsed = intakeQuestionsResponseSchema.safeParse(row.questions);
    if (parsed.success) return parsed.data;
  }
  return getPublishedQuestionSet();
}

export async function listQuestionSets(): Promise<IntakeQuestionSet[]> {
  return prisma.intakeQuestionSet.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getQuestionSetById(id: string) {
  return prisma.intakeQuestionSet.findUnique({ where: { id } });
}

export async function createDraftFromPublished(input?: { version?: string; title?: string }) {
  const base = await ensurePublishedQuestionSet();
  const version = input?.version ?? `draft-${Date.now()}`;
  const title = input?.title ?? normalizeTitleFromVersion(version);

  return prisma.intakeQuestionSet.create({
    data: {
      version,
      status: "DRAFT",
      title,
      questions: base.questions as Prisma.InputJsonValue,
    },
  });
}

export async function updateDraftQuestions(id: string, questions: unknown) {
  return prisma.intakeQuestionSet.update({
    where: { id },
    data: { questions: questions as Prisma.InputJsonValue },
  });
}

export async function publishQuestionSet(id: string) {
  // Archive existing published sets (keep history).
  await prisma.intakeQuestionSet.updateMany({
    where: { status: "PUBLISHED" },
    data: { status: "ARCHIVED" },
  });
  return prisma.intakeQuestionSet.update({
    where: { id },
    data: { status: "PUBLISHED" },
  });
}

