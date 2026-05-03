import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth/session";
import { isAdminEmail } from "@/lib/admin";

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
  const session = await requireUser();
  if (!isAdminEmail(session.user.email)) {
    redirect("/dashboard");
  }
  return session;
}

export async function getApiAdminUser() {
  const session = await getServerAuthSession();
  if (!session?.user?.id || !isAdminEmail(session.user.email)) return null;
  return session.user;
}
