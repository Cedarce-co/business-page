import { requireAdminUser } from "@/lib/server-auth";
import AdminSecurityClient from "@/components/admin/AdminSecurityClient";

export default async function AdminSecurityPage() {
  const session = await requireAdminUser();
  return <AdminSecurityClient email={session.user.email ?? ""} />;
}
