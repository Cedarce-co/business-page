import AuthShell from "@/components/auth/AuthShell";
import SignupFlow from "@/components/auth/SignupFlow";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create an account"
      subtitle="A premium workspace for business setup, delivery tracking, and verified service requests."
    >
      <SignupFlow />
    </AuthShell>
  );
}
