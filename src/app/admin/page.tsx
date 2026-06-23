import AuthShell from "@/components/auth/AuthShell";
import AdminLogin from "@/components/admin/AdminLogin";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const notice = typeof params.notice === "string" ? params.notice : undefined;

  return (
    <AuthShell
      title="Service operations"
      subtitle="Admin sign-in for user reviews, verification approvals, and delivery operations."
    >
      <AdminLogin notice={notice} />
    </AuthShell>
  );
}
