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
    emailParagraph("A new client has joined Cedarce and may need a warm welcome and timely follow-up."),
    emailKeyValue([
      { label: "Name", value: escapeHtml(input.name) },
      { label: "Email", value: escapeHtml(input.email) },
      { label: "Phone", value: escapeHtml(input.phone?.trim() || "Not provided") },
      { label: "City", value: escapeHtml(input.city?.trim() || "Not provided") },
    ]),
    emailParagraph("Review their profile in the admin portal when you have a moment."),
    emailButton(adminUrl, "View client profile"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SIGNUP_ADMIN,
    subject: `New Cedarce client: ${input.name}`,
    html: renderEmailLayout({
      title: "New client signup",
      preheader: `${input.name} created an account on Cedarce.`,
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
