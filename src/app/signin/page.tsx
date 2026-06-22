import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import SigninFlow from "@/components/auth/SigninFlow";
import { getUserSession } from "@/server/auth/session";

export default async function SignInPage() {
  const session = await getUserSession();
  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title="Hello there"
      subtitle="Sign in to continue your business setup, account verification, and service request workflow."
    >
      <SigninFlow />
    </AuthShell>
  );
}
