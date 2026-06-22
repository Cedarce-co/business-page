import type { FeedbackStatus } from "@prisma/client";
import { prisma } from "@/server/database/prisma";
import { notifyAdmins } from "@/server/services/notifications";

export async function createSiteFeedback(input: {
  name?: string | null;
  email?: string | null;
  topic?: string | null;
  message: string;
  page?: string | null;
  userId?: string | null;
}) {
  const row = await prisma.siteFeedback.create({
    data: {
      name: input.name?.trim() || null,
      email: input.email?.trim().toLowerCase() || null,
      topic: input.topic?.trim() || null,
      message: input.message.trim(),
      page: input.page?.trim() || null,
      userId: input.userId ?? null,
    },
  });

  await notifyAdmins({
    title: "New site feedback",
    message: input.topic
      ? `${input.topic}: ${input.message.slice(0, 120)}${input.message.length > 120 ? "…" : ""}`
      : input.message.slice(0, 140),
    href: "/admin/feedbacks",
  });

  return row;
}

export async function listSiteFeedback(options?: { status?: FeedbackStatus; limit?: number }) {
  const limit = Math.min(Math.max(options?.limit ?? 100, 1), 200);
  return prisma.siteFeedback.findMany({
    where: options?.status ? { status: options.status } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function updateSiteFeedbackStatus(id: string, status: FeedbackStatus) {
  return prisma.siteFeedback.update({
    where: { id },
    data: {
      status,
      readAt: status === "READ" || status === "ARCHIVED" ? new Date() : null,
    },
  });
}
