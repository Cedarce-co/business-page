import { prisma } from "@/lib/prisma";
import {
  serviceRequestStatusLabel,
  type ServiceRequestStatus,
} from "@/lib/service-request-status";
import { sendEmailSafe } from "@/server/emails/sender";
import { verificationApprovedEmail } from "@/server/emails/templates/verification-approved";
import {
  verificationInvalidInfoEmail,
  verificationRejectedEmail,
} from "@/server/emails/templates/verification-review";
import {
  serviceRequestUpdatedUserEmail,
} from "@/server/emails/templates/service-request";
import { createNotification } from "@/server/services/notifications";
import { loadAdminEmailsFromDb } from "@/server/services/mfa";

async function adminEmails() {
  return loadAdminEmailsFromDb();
}

export async function getAdminOverview() {
  const exclude = await adminEmails();
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
    await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });
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
      await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });
    }

    await createNotification({
      userId,
      title: "Account verified",
      message: "Your account has been verified. You can now request a service.",
      href: "/dashboard/request-service?fresh=1",
    });
  } else {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (user?.email) {
      const tpl = verificationRejectedEmail(null);
      await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });
    }

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
      await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });
    }

    await createNotification({
      userId,
      title: "Account verified",
      message: note?.trim() ? note.trim() : "Your account has been verified. You can now request a service.",
      href: "/dashboard/request-service?fresh=1",
    });
  } else if (status === "REJECTED") {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (user?.email) {
      const tpl = verificationRejectedEmail(note);
      await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });
    }

    await createNotification({
      userId,
      title: "Verification declined",
      message: note?.trim() ? note.trim() : "Your verification was declined.",
      href: "/dashboard",
    });
  } else {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (user?.email) {
      const tpl = verificationInvalidInfoEmail(note);
      await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });
    }

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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { adminRole: true },
  });
  if (user?.adminRole) {
    throw new Error("Admin accounts cannot be removed from the users page.");
  }
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
    include: {
      user: { select: { email: true, name: true } },
    },
  });

  if (row.user.email) {
    const tpl = serviceRequestUpdatedUserEmail({
      serviceType: row.serviceType,
      statusLabel: serviceRequestStatusLabel(input.status),
      note: input.note,
    });
    await sendEmailSafe({ to: row.user.email, subject: tpl.subject, html: tpl.html });
  }

  await createNotification({
    userId: row.userId,
    title: "Service request updated",
    message: `Status is now: ${serviceRequestStatusLabel(input.status)}.`,
    href: `/dashboard/service-requests/${row.id}`,
  });

  return row;
}

export async function listPendingVerifications() {
  const exclude = await adminEmails();
  return prisma.user.findMany({
    where: {
      ...(exclude.length ? { email: { notIn: exclude } } : {}),
      kyc: { status: { in: ["SUBMITTED", "INVALID_INFO"] } },
    },
    include: {
      kyc: true,
      profile: true,
    },
    orderBy: { kyc: { submittedAt: "desc" } },
    take: 100,
  });
}

export async function listAdminServiceRequests(options?: { status?: string | null; q?: string | null }) {
  const exclude = await adminEmails();
  const normalized =
    options?.status && options.status !== "all" ? options.status : null;
  const q = options?.q?.trim() ?? "";

  return prisma.serviceRequest.findMany({
    where: {
      ...(exclude.length ? { user: { email: { notIn: exclude } } } : {}),
      ...(normalized ? { status: normalized as ServiceRequestStatus } : {}),
      ...(q
        ? {
            OR: [
              { id: { contains: q, mode: "insensitive" } },
              { serviceType: { contains: q, mode: "insensitive" } },
              { summary: { contains: q, mode: "insensitive" } },
              { user: { name: { contains: q, mode: "insensitive" } } },
              { user: { email: { contains: q, mode: "insensitive" } } },
              { user: { id: { contains: q, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}
