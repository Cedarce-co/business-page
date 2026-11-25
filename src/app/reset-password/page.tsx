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
      subtitle="Choose a strong password. For your safety, this link only works for a short time."
    >
      {token ? (
        <ResetPasswordFlow token={token} />
      ) : (
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-brand-900">
          <p className="text-sm font-semibold">Missing reset token</p>
          <p className="mt-1 text-sm text-slate-600">Please request a new password reset link.</p>
        </div>
      )}
    </AuthShell>
  );
}

