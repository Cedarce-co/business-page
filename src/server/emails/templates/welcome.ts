import { SERVICES } from "@/lib/constants";
import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailLink, emailList, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function welcomeEmail(input: { name: string }): EmailContent {
  const verifyUrl = `${getAppUrl()}/dashboard/kyc`;
  const serviceNames = SERVICES.slice(0, 6).map((s) => escapeHtml(s.name));
  const name = escapeHtml(input.name);

  const bodyHtml = [
    emailParagraph(`Hi ${name}, your Cedarce account is ready.`),
    emailParagraph(
      "Complete business verification to unlock service requests: websites, payments, business email, and more.",
    ),
    emailButton(verifyUrl, "Verify your account"),
    emailParagraph("<strong style=\"color:#0f172a;\">Popular services</strong>"),
    emailList(serviceNames),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.WELCOME,
    subject: "Welcome to Cedarce",
    html: renderEmailLayout({
      title: "Welcome to Cedarce",
      preheader: "Your account is confirmed. Verify to request services.",
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      VERIFY_URL: verifyUrl,
      SERVICES_LIST: SERVICES.slice(0, 6).map((s) => s.name).join(", "),
    },
  };
}
