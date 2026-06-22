import { prisma } from "@/lib/prisma";
import type { KycInput } from "@/features/kyc/types";
import { sendEmailSafe, emailAdminsSafe } from "@/server/emails/sender";
import {
  verificationSubmittedAdminEmail,
  verificationSubmittedUserEmail,
} from "@/server/emails/templates/verification-submitted";
import { createNotification, notifyAdmins } from "@/server/services/notifications";
import { storeUpload } from "@/server/uploads/store";

function trimOrNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

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
  let addressProofUrl: string | null = existing?.addressProofUrl ?? null;

  if (payload.govIdFile) {
    govIdUrl = await storeUpload({
      folder: "kyc",
      userId,
      file: payload.govIdFile,
      access: "private",
    });
  }

  if (payload.addressProofFile) {
    addressProofUrl = await storeUpload({
      folder: "kyc",
      userId,
      file: payload.addressProofFile,
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
        phone: trimOrNull(payload.phone),
        profile: {
          upsert: {
            create: {
              address: trimOrNull(payload.personalAddress),
              city: trimOrNull(payload.personalCity),
              country: trimOrNull(payload.personalCountry),
            },
            update: {
              address: trimOrNull(payload.personalAddress),
              city: trimOrNull(payload.personalCity),
              country: trimOrNull(payload.personalCountry),
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
        address: trimOrNull(payload.personalAddress),
        businessName: trimOrNull(payload.businessName),
        businessAddress: trimOrNull(payload.businessAddress),
        businessCity: trimOrNull(payload.businessCity),
        businessState: trimOrNull(payload.businessState),
        businessWebsite: trimOrNull(payload.businessWebsite),
        businessEmail: trimOrNull(payload.businessEmail),
        socialHandle: trimOrNull(payload.socialHandle),
        cacNumber: trimOrNull(payload.cacNumber),
        cacUrl,
        addressProofUrl,
        govIdType: trimOrNull(payload.govIdType),
        govIdUrl,
        submittedAt: new Date(),
      },
      update: {
        status: "SUBMITTED",
        address: trimOrNull(payload.personalAddress),
        businessName: trimOrNull(payload.businessName),
        businessAddress: trimOrNull(payload.businessAddress),
        businessCity: trimOrNull(payload.businessCity),
        businessState: trimOrNull(payload.businessState),
        businessWebsite: trimOrNull(payload.businessWebsite),
        businessEmail: trimOrNull(payload.businessEmail),
        socialHandle: trimOrNull(payload.socialHandle),
        cacNumber: trimOrNull(payload.cacNumber),
        cacUrl,
        addressProofUrl,
        govIdType: trimOrNull(payload.govIdType),
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
    await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });

    const adminTpl = verificationSubmittedAdminEmail({
      name: user.name,
      email: user.email,
      nationality: user.profile?.country ?? null,
      address: payload.personalAddress ?? null,
      govIdType: kyc.govIdType,
    });
    await emailAdminsSafe(adminTpl.subject, adminTpl.html);

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
