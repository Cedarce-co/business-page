import { EMAIL_TEMPLATE_KEYS, type EmailTemplateKey } from "@/server/emails/types";

export type EmailCatalogEntry = {
  key: EmailTemplateKey;
  name: string;
  audience: "user" | "admin";
  trigger: string;
  resendEnv: string;
  resendVariables: string[];
};

export const EMAIL_CATALOG: EmailCatalogEntry[] = [
  {
    key: EMAIL_TEMPLATE_KEYS.WELCOME,
    name: "Welcome",
    audience: "user",
    trigger: "User completes signup",
    resendEnv: "RESEND_TEMPLATE_WELCOME",
    resendVariables: ["NAME", "VERIFY_URL", "SERVICES_LIST"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.PASSWORD_RESET,
    name: "Password reset",
    audience: "user",
    trigger: "User requests forgot password",
    resendEnv: "RESEND_TEMPLATE_PASSWORD_RESET",
    resendVariables: ["RESET_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.MFA_ENABLED,
    name: "Two-factor enabled",
    audience: "user",
    trigger: "User or admin enables MFA",
    resendEnv: "RESEND_TEMPLATE_MFA_ENABLED",
    resendVariables: ["NAME", "PORTAL_LABEL", "SECURITY_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.SIGNUP_ADMIN,
    name: "New signup (admin alert)",
    audience: "admin",
    trigger: "New user signs up",
    resendEnv: "RESEND_TEMPLATE_SIGNUP_ADMIN",
    resendVariables: ["NAME", "EMAIL", "PHONE", "CITY", "ADMIN_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.ADMIN_INVITE,
    name: "Admin invite",
    audience: "admin",
    trigger: "Super admin invites a team member",
    resendEnv: "RESEND_TEMPLATE_ADMIN_INVITE",
    resendVariables: ["NAME", "JOIN_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.VERIFICATION_SUBMITTED_USER,
    name: "Verification submitted",
    audience: "user",
    trigger: "User submits KYC / business verification",
    resendEnv: "RESEND_TEMPLATE_VERIFICATION_SUBMITTED_USER",
    resendVariables: ["DASHBOARD_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.VERIFICATION_SUBMITTED_ADMIN,
    name: "Verification submitted (admin alert)",
    audience: "admin",
    trigger: "User submits verification",
    resendEnv: "RESEND_TEMPLATE_VERIFICATION_SUBMITTED_ADMIN",
    resendVariables: ["NAME", "EMAIL", "BUSINESS_NAME", "COUNTRY", "ADDRESS", "ID_TYPE", "REVIEW_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.VERIFICATION_APPROVED,
    name: "Verification approved",
    audience: "user",
    trigger: "Admin approves verification",
    resendEnv: "RESEND_TEMPLATE_VERIFICATION_APPROVED",
    resendVariables: ["REQUEST_URL", "SERVICES_LIST"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.VERIFICATION_REJECTED,
    name: "Verification declined",
    audience: "user",
    trigger: "Admin rejects verification",
    resendEnv: "RESEND_TEMPLATE_VERIFICATION_REJECTED",
    resendVariables: ["NOTE", "KYC_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.VERIFICATION_INVALID_INFO,
    name: "Verification needs correction",
    audience: "user",
    trigger: "Admin marks verification as invalid info",
    resendEnv: "RESEND_TEMPLATE_VERIFICATION_INVALID_INFO",
    resendVariables: ["NOTE", "KYC_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_SUBMITTED_USER,
    name: "Service request received",
    audience: "user",
    trigger: "User submits a service request",
    resendEnv: "RESEND_TEMPLATE_SERVICE_REQUEST_SUBMITTED_USER",
    resendVariables: ["SERVICE_TYPE", "TRACK_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_SUBMITTED_ADMIN,
    name: "New service request (admin alert)",
    audience: "admin",
    trigger: "User submits a service request",
    resendEnv: "RESEND_TEMPLATE_SERVICE_REQUEST_SUBMITTED_ADMIN",
    resendVariables: ["NAME", "EMAIL", "SERVICE_TYPE", "SUMMARY", "REVIEW_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_UPDATED_USER,
    name: "Service request updated",
    audience: "user",
    trigger: "Admin updates request status or user resubmits info",
    resendEnv: "RESEND_TEMPLATE_SERVICE_REQUEST_UPDATED_USER",
    resendVariables: ["SERVICE_TYPE", "STATUS_LABEL", "NOTE", "TRACK_URL"],
  },
  {
    key: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_UPDATED_ADMIN,
    name: "Service request updated (admin alert)",
    audience: "admin",
    trigger: "Client updates request after needs-info review",
    resendEnv: "RESEND_TEMPLATE_SERVICE_REQUEST_UPDATED_ADMIN",
    resendVariables: ["NAME", "REVIEW_URL"],
  },
];
