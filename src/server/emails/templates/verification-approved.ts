import { SERVICES } from "@/lib/constants";
import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailList, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function verificationApprovedEmail(): EmailContent {
  const requestUrl = `${getAppUrl()}/dashboard/request-service?fresh=1`;
  const serviceNames = SERVICES.slice(0, 5).map((s) => escapeHtml(s.name));

  const bodyHtml = [
    emailParagraph("Great news. Your Cedarce account verification is <strong>approved</strong>."),
    emailParagraph("You can now submit service requests from your dashboard."),
    emailButton(requestUrl, "Request a service"),
    emailParagraph("<strong style=\"color:#0f172a;\">What we can help with</strong>"),
    emailList(serviceNames),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_APPROVED,
    subject: "Verification approved",
    html: renderEmailLayout({
      title: "You're verified",
      preheader: "Your account is approved. Request services anytime.",
      bodyHtml,
    }),
    variables: {
      REQUEST_URL: requestUrl,
      SERVICES_LIST: SERVICES.slice(0, 5).map((s) => s.name).join(", "),
    },
  };
}
