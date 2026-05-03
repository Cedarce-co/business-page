import type { ProfileInput } from "@/features/profile/types";
import { prisma } from "@/lib/prisma";

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, kyc: true },
  });
}

export async function updateUserProfile(userId: string, data: ProfileInput) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name.trim(),
      image: data.image?.trim() || null,
      phone: data.phone?.trim() || null,
      profile: {
        upsert: {
          create: {
            address: data.address?.trim() || null,
            city: data.city?.trim() || null,
            country: data.country?.trim() || null,
          },
          update: {
            address: data.address?.trim() || null,
            city: data.city?.trim() || null,
            country: data.country?.trim() || null,
          },
        },
      },
    },
  });
}
