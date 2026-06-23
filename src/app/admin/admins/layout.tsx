import { requireSuperAdminUser } from "@/lib/server-auth";
import AdminFrameShell from "@/components/admin/AdminFrameShell";

export default async function AdminsLayout({ children }: { children: React.ReactNode }) {
  await requireSuperAdminUser();
  return <AdminFrameShell>{children}</AdminFrameShell>;
}
