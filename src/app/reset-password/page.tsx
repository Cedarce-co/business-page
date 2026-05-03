import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordFlow from "@/components/auth/ResetPasswordFlow";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.token;
  const token = Array.isArray(raw) ? raw[0] : raw;

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a strong password. This link expires for security."
    >
      {token ? (
        <ResetPasswordFlow token={token} />
      ) : (
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-slate-200">
          <p className="text-sm font-semibold">Missing reset token</p>
          <p className="mt-1 text-sm text-slate-300">Please request a new password reset link.</p>
        </div>
      )}
    </AuthShell>
  );
}

