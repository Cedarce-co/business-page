import { prisma } from "@/lib/prisma";
import { adminRecipientEmails } from "@/lib/admin";

export async function createNotification(input: {
  userId: string;
  title: string;
  message?: string | null;
  href?: string | null;
}) {
  return prisma.notification.create({
    data: {
      userId: input.userId,
      title: input.title,
      message: input.message ?? null,
      href: input.href ?? null,
    },
  });
}

export async function getAdminRecipientUserIds() {
  const emails = adminRecipientEmails();
  if (emails.length === 0) return [];
  const users = await prisma.user.findMany({
    where: { email: { in: emails } },
    select: { id: true },
  });
  return users.map((u) => u.id);
}

export async function notifyAdmins(input: {
  title: string;
  message?: string | null;
  href?: string | null;
}) {
  const userIds = await getAdminRecipientUserIds();
  if (userIds.length === 0) return;
  await Promise.all(
    userIds.map((userId) =>
      createNotification({
        userId,
        title: input.title,
        message: input.message,
        href: input.href,
      }),
    ),
  );
}

export async function listNotifications(userId: string) {
  const items = await prisma.notification.findMany({
    where: { userId, dismissedAt: null },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  const unreadCount = await prisma.notification.count({
    where: { userId, dismissedAt: null, readAt: null },
  });
  return { items, unreadCount };
}

export async function markNotificationRead(userId: string, id: string) {
  await prisma.notification.updateMany({
    where: { id, userId, dismissedAt: null, readAt: null },
    data: { readAt: new Date() },
  });
}

export async function dismissNotification(userId: string, id: string) {
  await prisma.notification.updateMany({
    where: { id, userId, dismissedAt: null },
    data: { dismissedAt: new Date(), readAt: new Date() },
  });
}

