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

  const href =
    input.href && input.href.startsWith("/admin") ? input.href : input.href ? `/admin${input.href}` : null;

  await Promise.all(
    userIds.map((userId) =>
      createNotification({
        userId,
        title: input.title,
        message: input.message,
        href,
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

/** Admin console: only operational links under /admin (avoids /dashboard redirects). */
export async function listAdminNotifications(userId: string) {
  const items = await prisma.notification.findMany({
    where: {
      userId,
      dismissedAt: null,
      OR: [{ href: null }, { href: { startsWith: "/admin" } }],
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  const unreadCount = await prisma.notification.count({
    where: {
      userId,
      dismissedAt: null,
      readAt: null,
      OR: [{ href: null }, { href: { startsWith: "/admin" } }],
    },
  });
  return { items, unreadCount };
}

/** User portal: hide admin-only notification links. */
export async function listUserNotifications(userId: string) {
  const items = await prisma.notification.findMany({
    where: {
      userId,
      dismissedAt: null,
      NOT: { href: { startsWith: "/admin" } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  const unreadCount = await prisma.notification.count({
    where: {
      userId,
      dismissedAt: null,
      readAt: null,
      NOT: { href: { startsWith: "/admin" } },
    },
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

