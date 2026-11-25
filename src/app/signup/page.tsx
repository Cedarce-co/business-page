import AuthShell from "@/components/auth/AuthShell";
import SignupFlow from "@/components/auth/SignupFlow";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create an account"
      subtitle="One account to request services, follow the progress of your work, and talk to our team."
    >
      <SignupFlow />
    </AuthShell>
  );
}
