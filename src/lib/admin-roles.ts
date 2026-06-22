import type { UserAdminRole } from "@prisma/client";
import { SUPPORT_EMAIL } from "@/lib/contact";

export const SUPER_ADMIN_EMAIL = SUPPORT_EMAIL;

export function isAdminRole(role: UserAdminRole | null | undefined) {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}

export function isSuperAdminRole(role: UserAdminRole | null | undefined) {
  return role === "SUPER_ADMIN";
}

export function adminRoleLabel(role: UserAdminRole) {
  return role === "SUPER_ADMIN" ? "Super admin" : "Admin";
}
