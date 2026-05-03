import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordFlow from "@/components/auth/ForgotPasswordFlow";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we will send you a secure link to set a new password."
    >
      <ForgotPasswordFlow />
    </AuthShell>
  );
}

