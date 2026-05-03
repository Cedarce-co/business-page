import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import type { KycInput } from "@/features/kyc/types";
import { sendEmail, emailAdmins } from "@/server/emails/sender";
import {
  verificationSubmittedAdminEmail,
  verificationSubmittedUserEmail,
} from "@/server/emails/templates/verification-submitted";
import { createNotification } from "@/server/services/notifications";
import { savePublicUpload } from "@/server/uploads/local";

export async function getKyc(userId: string) {
  return prisma.kyc.findUnique({ where: { userId } });
}

export async function submitKyc(userId: string, payload: KycInput) {
  if (!payload.govIdFile) {
    throw new Error("Government ID file is required.");
  }

  let govIdUrl = "";
  let cacUrl: string | null = null;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`kyc/${userId}/${Date.now()}-${payload.govIdFile.name}`, payload.govIdFile, {
      access: "private",
    });
    govIdUrl = blob.url;

    if (payload.cacFile) {
      const cacBlob = await put(`kyc/${userId}/${Date.now()}-cac-${payload.cacFile.name}`, payload.cacFile, {
        access: "private",
      });
      cacUrl = cacBlob.url;
    }
  } else {
    const savedId = await savePublicUpload({ folder: "kyc", userId, file: payload.govIdFile });
    govIdUrl = savedId.url;
    if (payload.cacFile) {
      const savedCac = await savePublicUpload({ folder: "kyc", userId, file: payload.cacFile });
      cacUrl = savedCac.url;
    }
  }

  const kyc = await prisma.kyc.upsert({
    where: { userId },
    create: {
      userId,
      status: "SUBMITTED",
      businessName: payload.businessName,
      businessAddress: payload.businessAddress,
      businessCity: payload.businessCity,
      businessState: payload.businessState,
      businessWebsite: payload.businessWebsite || null,
      businessEmail: payload.businessEmail || null,
      socialHandle: payload.socialHandle || null,
      cacNumber: payload.cacNumber || null,
      cacUrl,
      govIdType: payload.govIdType,
      govIdUrl,
      submittedAt: new Date(),
    },
    update: {
      status: "SUBMITTED",
      businessName: payload.businessName,
      businessAddress: payload.businessAddress,
      businessCity: payload.businessCity,
      businessState: payload.businessState,
      businessWebsite: payload.businessWebsite || null,
      businessEmail: payload.businessEmail || null,
      socialHandle: payload.socialHandle || null,
      cacNumber: payload.cacNumber || null,
      cacUrl,
      govIdType: payload.govIdType,
      govIdUrl,
      submittedAt: new Date(),
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });
  if (user?.email) {
    const tpl = verificationSubmittedUserEmail();
    await sendEmail({ to: user.email, subject: tpl.subject, html: tpl.html });

    const adminTpl = verificationSubmittedAdminEmail({
      name: user.name,
      email: user.email,
        nationality: kyc.nationality,
        address: kyc.address,
      govIdType: kyc.govIdType,
      govIdUrl: kyc.govIdUrl,
    });
    await emailAdmins(adminTpl.subject, adminTpl.html);
  }

  await createNotification({
    userId,
    title: "Verification submitted",
    message: "Your business verification was submitted and is now under review.",
    href: "/dashboard",
  });

  return kyc;
}
