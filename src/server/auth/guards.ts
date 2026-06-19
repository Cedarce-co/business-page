import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth/session";
import { getAdminAuthSession } from "@/server/auth/admin-session";

export async function requireUser() {
  const session = await getServerAuthSession();
  if (!session?.user?.id) {
    redirect("/signin");
  }
  return session;
}

export async function getApiUserId() {
  const session = await getServerAuthSession();
  return session?.user?.id ?? null;
}

export async function requireAdminUser() {
  const session = await getAdminAuthSession();
  if (!session?.user?.id) {
    redirect("/admin");
  }
  return session;
}

export async function getApiAdminUser() {
  const session = await getAdminAuthSession();
  if (!session?.user?.id) return null;
  return session.user;
}
