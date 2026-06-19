import { getServerSession } from "next-auth/next";
import { adminAuthOptions } from "@/server/auth/admin-options";

export function getAdminAuthSession() {
  return getServerSession(adminAuthOptions);
}
