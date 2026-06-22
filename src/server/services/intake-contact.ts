import { prisma } from "@/server/database/prisma";
import { buildIntakeAnswerDefaults } from "@/features/intake/account-defaults";

export async function getIntakeAccountDefaults(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      phone: true,
      profile: { select: { city: true, country: true } },
      kyc: { select: { businessName: true, businessCity: true, businessState: true } },
    },
  });

  if (!user) return {};

  return buildIntakeAnswerDefaults({
    phone: user.phone,
    email: user.email,
    city: user.profile?.city ?? user.kyc?.businessCity,
    state: user.kyc?.businessState,
    country: user.profile?.country,
    businessName: user.kyc?.businessName,
    accountName: user.name,
  });
}
