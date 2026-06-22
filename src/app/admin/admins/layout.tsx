import { requireSuperAdminUser } from "@/lib/server-auth";
import AdminFrame from "@/components/admin/AdminFrame";

export default async function AdminsLayout({ children }: { children: React.ReactNode }) {
  await requireSuperAdminUser();
  return <AdminFrame>{children}</AdminFrame>;
}
