import { requireUser } from "@/lib/server-auth";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getUserMfaState } from "@/server/services/mfa";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireUser();
  const mfaState = await getUserMfaState(session.user.id);

  return (
    <DashboardFrame
      name={session.user.name || "User"}
      email={session.user.email ?? ""}
      mfaEnabled={Boolean(mfaState?.mfaEnabled)}
    >
      {children}
    </DashboardFrame>
  );
}
