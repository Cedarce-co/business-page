import { getAppUrl } from "@/server/emails/sender";
import { escapeHtml } from "@/server/emails/helpers";

export function signupAdminEmail(input: {
  name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
}) {
  const adminUrl = `${getAppUrl()}/admin/users`;
  return {
    subject: `New signup: ${input.name}`,
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">New account created</h2>
        <p style="margin:0 0 10px;color:#334155"><b>${escapeHtml(input.name)}</b> just signed up on Cedarce.</p>
        <ul style="margin:0 0 16px;padding-left:18px;color:#334155">
          <li>Email: ${escapeHtml(input.email)}</li>
          <li>Phone: ${escapeHtml(input.phone?.trim() || "Not provided")}</li>
          <li>City: ${escapeHtml(input.city?.trim() || "Not provided")}</li>
        </ul>
        <p style="margin:0">
          <a href="${adminUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            View in admin
          </a>
        </p>
      </div>
    `,
  };
}
