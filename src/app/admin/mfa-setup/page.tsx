import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { adminAuthOptions } from "@/server/auth/admin-options";
import AdminMfaSetupClient from "@/components/admin/AdminMfaSetupClient";
import { getUserMfaState } from "@/server/services/mfa";

export default async function AdminMfaSetupPage() {
  const session = await getServerSession(adminAuthOptions);
  if (!session?.user?.id) redirect("/admin");

  const state = await getUserMfaState(session.user.id);
  if (state?.mfaEnabled) {
    redirect("/admin?notice=admin-mfa-exists");
  }

  if (!session.user.mfaSetupRequired && session.user.mfaVerified) redirect("/admin/dashboard");

  return <AdminMfaSetupClient email={session.user.email ?? ""} />;
}
