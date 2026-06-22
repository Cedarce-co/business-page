import { requireSuperAdminUser } from "@/lib/server-auth";
import AdminsClient from "@/components/admin/AdminsClient";

export default async function AdminsPage() {
  const session = await requireSuperAdminUser();
  return <AdminsClient currentUserId={session.user.id} />;
}
