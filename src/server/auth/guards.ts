import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { prisma } from "@/server/database/prisma";
import { getAdminJwt, getUserJwt } from "@/server/auth/session-token";

async function sessionFromUserToken(): Promise<Session | null> {
  const token = await getUserJwt();
  const userId = token?.uid as string | undefined;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { kyc: { select: { status: true } } },
  });
  if (!user) return null;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      kycComplete: user.kyc?.status === "APPROVED",
      isAdmin: false,
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

async function sessionFromAdminToken(): Promise<Session | null> {
  const token = await getAdminJwt();
  const userId = token?.uid as string | undefined;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, image: true },
  });
  if (!user) return null;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      kycComplete: true,
      isAdmin: true,
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

export async function requireUser() {
  const session = await sessionFromUserToken();
  if (!session?.user?.id) {
    redirect("/signin");
  }
  return session;
}

export async function getApiUserId() {
  const token = await getUserJwt();
  return (token?.uid as string | undefined) ?? null;
}

export async function requireAdminUser() {
  const session = await sessionFromAdminToken();
  if (!session?.user?.id) {
    redirect("/admin");
  }
  return session;
}

export async function getApiAdminUser() {
  const session = await sessionFromAdminToken();
  return session?.user ?? null;
}
