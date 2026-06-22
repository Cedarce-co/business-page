import { prisma } from "@/lib/prisma";
import type { ServiceRequestInput } from "@/features/service-requests/types";
import { notifyAdmins } from "@/server/services/notifications";
import { sendEmailSafe, emailAdminsSafe } from "@/server/emails/sender";
import {
  serviceRequestSubmittedAdminEmail,
  serviceRequestSubmittedUserEmail,
} from "@/server/emails/templates/service-request";

export async function getServiceRequests(userId: string) {
  return prisma.serviceRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createServiceRequest(userId: string, payload: ServiceRequestInput) {
  const kyc = await prisma.kyc.findUnique({ where: { userId } });
  if (kyc?.status !== "APPROVED") {
    return { ok: false as const, error: "Complete account verification before requesting a service." };
  }

  const request = await prisma.serviceRequest.create({
    data: {
      userId,
      serviceType: payload.serviceType,
      summary: payload.summary,
      budget: payload.budget,
      timeline: payload.timeline,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });

  if (user?.email) {
    const userTpl = serviceRequestSubmittedUserEmail({ serviceType: payload.serviceType });
    await sendEmailSafe({ to: user.email, subject: userTpl.subject, html: userTpl.html });
  }

  if (user) {
    const adminTpl = serviceRequestSubmittedAdminEmail({
      name: user.name,
      email: user.email,
      serviceType: payload.serviceType,
      summary: payload.summary,
      requestId: request.id,
    });
    await emailAdminsSafe(adminTpl.subject, adminTpl.html);
  }

  await notifyAdmins({
    title: "New service request",
    message: `${user?.name ?? "A client"} submitted a ${payload.serviceType} request.`,
    href: `/admin/requests/${request.id}`,
  });

  return { ok: true as const, request };
}
