import { requireUser } from "@/lib/server-auth";
import MfaSecuritySettings from "@/components/security/MfaSecuritySettings";
import { Card, Page } from "@/components/dashboard/ui";

export default async function SecurityPage() {
  const session = await requireUser();
  return (
    <MfaSecuritySettings
      apiPath="/api/mfa"
      email={session.user.email ?? ""}
      portal="user"
      PageShell={Page}
      Card={Card}
    />
  );
}
