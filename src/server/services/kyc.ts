import { prisma } from "@/lib/prisma";
import type { KycInput } from "@/features/kyc/types";
import { sendEmail, emailAdmins } from "@/server/emails/sender";
import {
  verificationSubmittedAdminEmail,
  verificationSubmittedUserEmail,
} from "@/server/emails/templates/verification-submitted";
import { createNotification, notifyAdmins } from "@/server/services/notifications";
import { storeUpload } from "@/server/uploads/store";

export async function getKyc(userId: string) {
  return prisma.kyc.findUnique({ where: { userId } });
}

export async function getKycWithContact(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      phone: true,
      profile: { select: { address: true, city: true, country: true } },
      kyc: true,
    },
  });
}

export async function submitKyc(userId: string, payload: KycInput) {
  const existing = await prisma.kyc.findUnique({ where: { userId } });

  if (!payload.govIdFile && !existing?.govIdUrl && !payload.hasExistingGovId) {
    throw new Error("Government ID file is required.");
  }

  let govIdUrl = existing?.govIdUrl ?? "";
  let cacUrl: string | null = existing?.cacUrl ?? null;

  if (payload.govIdFile) {
    govIdUrl = await storeUpload({
      folder: "kyc",
      userId,
      file: payload.govIdFile,
      access: "private",
    });
  }

  if (payload.cacFile) {
    cacUrl = await storeUpload({
      folder: "kyc",
      userId,
      file: payload.cacFile,
      access: "private",
    });
  }

  if (!govIdUrl) {
    throw new Error("Government ID file is required.");
  }

  const kyc = await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        phone: payload.phone.trim(),
        profile: {
          upsert: {
            create: {
              address: payload.personalAddress.trim(),
              city: payload.personalCity.trim(),
              country: payload.personalCountry?.trim() || null,
            },
            update: {
              address: payload.personalAddress.trim(),
              city: payload.personalCity.trim(),
              country: payload.personalCountry?.trim() || null,
            },
          },
        },
      },
    });

    return tx.kyc.upsert({
      where: { userId },
      create: {
        userId,
        status: "SUBMITTED",
        address: payload.personalAddress.trim(),
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
        address: payload.personalAddress.trim(),
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
        reviewNote: null,
        reviewedAt: null,
      },
    });
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, phone: true, profile: true },
  });
  if (user?.email) {
    const tpl = verificationSubmittedUserEmail();
    await sendEmail({ to: user.email, subject: tpl.subject, html: tpl.html });

    const adminTpl = verificationSubmittedAdminEmail({
      name: user.name,
      email: user.email,
      nationality: user.profile?.country ?? null,
      address: payload.personalAddress,
      govIdType: kyc.govIdType,
      govIdUrl: kyc.govIdUrl,
    });
    await emailAdmins(adminTpl.subject, adminTpl.html);

    await notifyAdmins({
      title: "New verification submitted",
      message: `${user.name} submitted business verification for review.`,
      href: `/admin/users/${userId}/verification`,
    });
  }

  await createNotification({
    userId,
    title: "Verification submitted",
    message: "Your business verification was submitted and is now under review.",
    href: "/dashboard/kyc",
  });

  return kyc;
}
