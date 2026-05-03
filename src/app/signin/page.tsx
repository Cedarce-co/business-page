import AuthShell from "@/components/auth/AuthShell";
import SigninFlow from "@/components/auth/SigninFlow";

export default function SignInPage() {
  return (
    <AuthShell
      title="Hello there"
      subtitle="Sign in to continue your business setup, account verification, and service request workflow."
    >
      <SigninFlow />
    </AuthShell>
  );
}
