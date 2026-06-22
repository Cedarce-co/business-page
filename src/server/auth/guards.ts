import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { getUserSession } from "@/server/auth/session";
import { getServerSession } from "next-auth/next";
import { adminAuthOptions } from "@/server/auth/admin-options";

export async function requireUser() {
  const session = await getUserSession();
  if (!session?.user?.id) {
    redirect("/signin");
  }
  return session;
}

export async function getApiUserId() {
  const session = await getUserSession();
  return session?.user?.id ?? null;
}

export async function requireAdminUser() {
  const session = await getServerSession(adminAuthOptions);
  if (!session?.user?.id) {
    redirect("/admin");
  }
  return session as Session;
}

export async function getApiAdminUser() {
  const session = await getServerSession(adminAuthOptions);
  return session?.user ?? null;
}
