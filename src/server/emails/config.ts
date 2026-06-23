import "server-only";

import { SUPPORT_EMAIL } from "@/lib/contact";
import type { EmailTemplateKey } from "@/server/emails/types";

/** Maps each app template to its Resend template ID env var (optional). */
export const RESEND_TEMPLATE_ENV: Record<EmailTemplateKey, string> = {
  welcome: "RESEND_TEMPLATE_WELCOME",
  "password-reset": "RESEND_TEMPLATE_PASSWORD_RESET",
  "mfa-enabled": "RESEND_TEMPLATE_MFA_ENABLED",
  "signup-admin": "RESEND_TEMPLATE_SIGNUP_ADMIN",
  "admin-invite": "RESEND_TEMPLATE_ADMIN_INVITE",
  "verification-submitted-user": "RESEND_TEMPLATE_VERIFICATION_SUBMITTED_USER",
  "verification-submitted-admin": "RESEND_TEMPLATE_VERIFICATION_SUBMITTED_ADMIN",
  "verification-approved": "RESEND_TEMPLATE_VERIFICATION_APPROVED",
  "verification-rejected": "RESEND_TEMPLATE_VERIFICATION_REJECTED",
  "verification-invalid-info": "RESEND_TEMPLATE_VERIFICATION_INVALID_INFO",
  "service-request-submitted-user": "RESEND_TEMPLATE_SERVICE_REQUEST_SUBMITTED_USER",
  "service-request-submitted-admin": "RESEND_TEMPLATE_SERVICE_REQUEST_SUBMITTED_ADMIN",
  "service-request-updated-user": "RESEND_TEMPLATE_SERVICE_REQUEST_UPDATED_USER",
  "service-request-updated-admin": "RESEND_TEMPLATE_SERVICE_REQUEST_UPDATED_ADMIN",
};

export function getAppUrl() {
  return (process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/+$/, "");
}

export function getEmailLogoUrl() {
  if (process.env.RESEND_EMAIL_LOGO_URL?.trim()) {
    return process.env.RESEND_EMAIL_LOGO_URL.trim();
  }
  return `${getAppUrl()}/assets/logo/logoblacktext-transparent.png`;
}

export function getResendApiKey() {
  return process.env.RESEND_API_KEY?.trim() ?? "";
}

export function getResendFromAddress() {
  return process.env.RESEND_FROM?.trim() || `Cedarce <${SUPPORT_EMAIL}>`;
}

export function getResendTemplateId(key: EmailTemplateKey) {
  const envName = RESEND_TEMPLATE_ENV[key];
  return process.env[envName]?.trim() || null;
}

function getAdminList() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function getAdminRecipients() {
  const admins = getAdminList();
  if (admins.length > 0) return admins;
  return [SUPPORT_EMAIL];
}
