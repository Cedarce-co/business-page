import { requireUser } from "@/lib/server-auth";
import SecuritySettingsClient from "@/components/dashboard/SecuritySettingsClient";

export default async function SecurityPage() {
  const session = await requireUser();
  return <SecuritySettingsClient email={session.user.email ?? ""} />;
}
