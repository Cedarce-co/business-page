import { getAppUrl } from "@/server/emails/sender";

export function passwordResetEmail(input: { resetToken: string }) {
  const resetLink = `${getAppUrl()}/reset-password?token=${encodeURIComponent(input.resetToken)}`;
  return {
    subject: "Reset your password",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 12px;color:#0f172a">Reset your password</h2>
        <p style="margin:0 0 16px;color:#334155">We received a request to reset your account password. This link expires in 45 minutes.</p>
        <p style="margin:0 0 20px">
          <a href="${resetLink}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Reset password
          </a>
        </p>
        <p style="margin:0;color:#64748b;font-size:13px">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  };
}

