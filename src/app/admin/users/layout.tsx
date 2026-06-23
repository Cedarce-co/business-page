import { requireAdminUser } from "@/lib/server-auth";
import AdminFrameShell from "@/components/admin/AdminFrameShell";

export default async function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  await requireAdminUser();
  return <AdminFrameShell>{children}</AdminFrameShell>;
}

