import { requireAdminUser } from "@/lib/server-auth";
import AdminFrame from "@/components/admin/AdminFrame";

export default async function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  await requireAdminUser();
  return <AdminFrame>{children}</AdminFrame>;
}

