import { requireAdminUser } from "@/lib/server-auth";
import AdminFrame from "@/components/admin/AdminFrame";

export default async function AdminQuestionsLayout({ children }: { children: React.ReactNode }) {
  await requireAdminUser();
  return <AdminFrame>{children}</AdminFrame>;
}

