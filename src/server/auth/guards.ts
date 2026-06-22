import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { getUserSession } from "@/server/auth/session";
import { getServerSession } from "next-auth/next";
import { adminAuthOptions } from "@/server/auth/admin-options";
import { isSuperAdminRole } from "@/lib/admin-roles";
import type { UserAdminRole } from "@prisma/client";

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

function adminSessionValid(session: Session | null) {
  if (!session?.user?.id) return false;
  if (session.user.mfaSetupRequired) return false;
  if (session.user.mfaVerified === false) return false;
  return Boolean(session.user.adminRole);
}

export async function requireAdminUser() {
  const session = await getServerSession(adminAuthOptions);
  if (!adminSessionValid(session)) {
    redirect("/admin");
  }
  return session as Session;
}

export async function requireSuperAdminUser() {
  const session = await requireAdminUser();
  const role = session.user.adminRole as UserAdminRole | undefined;
  if (!isSuperAdminRole(role)) {
    redirect("/admin/dashboard");
  }
  return session;
}

export async function getApiAdminUser() {
  const session = await getServerSession(adminAuthOptions);
  if (!adminSessionValid(session)) return null;
  return session?.user ?? null;
}

export async function getApiSuperAdminUser() {
  const admin = await getApiAdminUser();
  if (!admin?.adminRole || !isSuperAdminRole(admin.adminRole as UserAdminRole)) return null;
  return admin;
}
