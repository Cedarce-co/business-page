import AuthShell from "@/components/auth/AuthShell";
import AdminLogin from "@/components/admin/AdminLogin";

export default function AdminLoginPage() {
  return (
    <AuthShell
      title="Service operations"
      subtitle="Admin sign-in for user reviews, verification approvals, and delivery operations."
    >
      <AdminLogin />
    </AuthShell>
  );
}
