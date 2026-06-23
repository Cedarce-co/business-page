import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailKeyValue, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function signupAdminEmail(input: {
  name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
}): EmailContent {
  const adminUrl = `${getAppUrl()}/admin/users`;

  const bodyHtml = [
    emailParagraph("A new client account was created on Cedarce."),
    emailKeyValue([
      { label: "Name", value: escapeHtml(input.name) },
      { label: "Email", value: escapeHtml(input.email) },
      { label: "Phone", value: escapeHtml(input.phone?.trim() || "Not provided") },
      { label: "City", value: escapeHtml(input.city?.trim() || "Not provided") },
    ]),
    emailButton(adminUrl, "View in admin"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SIGNUP_ADMIN,
    subject: `New signup: ${input.name}`,
    html: renderEmailLayout({
      title: "New account created",
      preheader: `${input.name} just signed up on Cedarce.`,
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      EMAIL: input.email,
      PHONE: input.phone?.trim() || "Not provided",
      CITY: input.city?.trim() || "Not provided",
      ADMIN_URL: adminUrl,
    },
  };
}
