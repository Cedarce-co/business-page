import { getServerSession } from "next-auth/next";
import { adminAuthOptions } from "@/server/auth/admin-options";
import { isSuperAdminRole } from "@/lib/admin-roles";
import AdminFrame from "@/components/admin/AdminFrame";
import type { UserAdminRole } from "@prisma/client";

export default async function AdminFrameShell({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(adminAuthOptions);
  const isSuperAdmin = isSuperAdminRole(session?.user?.adminRole as UserAdminRole | undefined);
  return <AdminFrame isSuperAdmin={isSuperAdmin}>{children}</AdminFrame>;
}
