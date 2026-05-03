import { prisma } from "@/lib/prisma";
import {
  serviceRequestStatusLabel,
  type ServiceRequestStatus,
} from "@/lib/service-request-status";
import { sendEmail } from "@/server/emails/sender";
import { verificationApprovedEmail } from "@/server/emails/templates/verification-approved";
import { createNotification } from "@/server/services/notifications";

function adminEmails() {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  const login = (process.env.ADMIN_LOGIN_EMAIL ?? "").trim().toLowerCase();
  if (login) list.push(login);
  return Array.from(new Set(list));
}

export async function getAdminOverview() {
  const exclude = adminEmails();
  const [users, requests, categories] = await Promise.all([
    prisma.user.findMany({
      where: exclude.length ? { email: { notIn: exclude } } : undefined,
      include: {
        profile: true,
        kyc: true,
        serviceRequest: { orderBy: { createdAt: "desc" }, take: 3 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.serviceRequest.findMany({
      where: exclude.length ? { user: { email: { notIn: exclude } } } : undefined,
    }),
    prisma.serviceRequest.groupBy({
      by: ["serviceType"],
      _count: { serviceType: true },
    }),
  ]);

  return { users, requests, categories };
}

export async function getAdminUserDetail(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      kyc: true,
      serviceRequest: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function approveUser(userId: string) {
  const kyc = await prisma.kyc.findUnique({ where: { userId } });
  if (!kyc || kyc.status !== "SUBMITTED") {
    return { ok: false as const, error: "User has not submitted verification yet." };
  }

  await prisma.kyc.update({
    where: { userId },
    data: { status: "APPROVED" },
  });

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (user?.email) {
    const tpl = verificationApprovedEmail();
    await sendEmail({ to: user.email, subject: tpl.subject, html: tpl.html });
  }

  return { ok: true as const };
}

export async function setVerificationStatus(userId: string, status: "APPROVED" | "REJECTED") {
  const kyc = await prisma.kyc.findUnique({ where: { userId } });
  if (!kyc || kyc.status !== "SUBMITTED") {
    return { ok: false as const, error: "User has not submitted verification yet." };
  }

  await prisma.kyc.update({ where: { userId }, data: { status } });

  if (status === "APPROVED") {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (user?.email) {
      const tpl = verificationApprovedEmail();
      await sendEmail({ to: user.email, subject: tpl.subject, html: tpl.html });
    }

    await createNotification({
      userId,
      title: "Account verified",
      message: "Your account has been verified. You can now request a service.",
      href: "/dashboard/request-service?fresh=1",
    });
  } else {
    await createNotification({
      userId,
      title: "Verification needs updates",
      message: "Your verification was declined. Please review your details and resubmit.",
      href: "/dashboard/kyc",
    });
  }

  return { ok: true as const };
}

export async function setVerificationReview(
  userId: string,
  status: "APPROVED" | "REJECTED" | "INVALID_INFO",
  note: string | null,
) {
  const kyc = await prisma.kyc.findUnique({ where: { userId } });
  if (!kyc || (kyc.status !== "SUBMITTED" && kyc.status !== "INVALID_INFO")) {
    return { ok: false as const, error: "User has not submitted verification yet." };
  }

  await prisma.kyc.update({
    where: { userId },
    data: {
      status,
      reviewNote: note,
      reviewedAt: new Date(),
    },
  });

  if (status === "APPROVED") {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (user?.email) {
      const tpl = verificationApprovedEmail();
      await sendEmail({ to: user.email, subject: tpl.subject, html: tpl.html });
    }

    await createNotification({
      userId,
      title: "Account verified",
      message: note?.trim() ? note.trim() : "Your account has been verified. You can now request a service.",
      href: "/dashboard/request-service?fresh=1",
    });
  } else if (status === "REJECTED") {
    await createNotification({
      userId,
      title: "Verification declined",
      message: note?.trim() ? note.trim() : "Your verification was declined.",
      href: "/dashboard",
    });
  } else {
    await createNotification({
      userId,
      title: "Invalid business information",
      message: note?.trim() ? note.trim() : "Some business details need corrections. Please update and resubmit.",
      href: "/dashboard/kyc",
    });
  }

  return { ok: true as const };
}

export async function removeUser(userId: string) {
  await prisma.user.delete({ where: { id: userId } });
}

export async function updateWorkStatus(requestId: string, status: ServiceRequestStatus) {
  return prisma.serviceRequest.update({ where: { id: requestId }, data: { status } });
}

export async function reviewServiceRequest(input: {
  requestId: string;
  status: ServiceRequestStatus;
  note: string | null;
}) {
  const row = await prisma.serviceRequest.update({
    where: { id: input.requestId },
    data: {
      status: input.status,
      reviewNote: input.note,
      reviewedAt: new Date(),
    },
  });

  await createNotification({
    userId: row.userId,
    title: "Service request updated",
    message: `Status is now: ${serviceRequestStatusLabel(input.status)}.`,
    href: `/dashboard/service-requests/${row.id}`,
  });

  return row;
}
