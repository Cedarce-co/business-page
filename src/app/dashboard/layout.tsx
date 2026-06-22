import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server-auth";
import DashboardFrame from "@/components/dashboard/DashboardFrame";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireUser();

  return (
    <DashboardFrame
      name={session.user.name || "User"}
      email={session.user.email ?? ""}
    >
      {children}
    </DashboardFrame>
  );
}
