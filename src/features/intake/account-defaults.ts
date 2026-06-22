import type { IntakeQuestion } from "@/features/intake/types";
import { filterVisibleIntakeQuestions } from "@/features/intake/visibility";

export type IntakeAccountContact = {
  phone?: string | null;
  email?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  businessName?: string | null;
  accountName?: string | null;
};

/** Map profile / KYC fields to intake answer keys. */
export function buildIntakeAnswerDefaults(contact: IntakeAccountContact): Record<string, string> {
  const defaults: Record<string, string> = {};

  const phone = contact.phone?.trim();
  const email = contact.email?.trim();
  const city = contact.city?.trim();
  const state = contact.state?.trim();
  const country = contact.country?.trim();
  const businessName = contact.businessName?.trim();
  const accountName = contact.accountName?.trim();

  if (phone) defaults.whatsapp = phone;
  if (email) defaults.email = email;

  if (city) {
    defaults.city_state = state ? `${city}, ${state}` : country ? `${city}, ${country}` : city;
  }

  if (businessName) defaults.business_name = businessName;
  else if (accountName) defaults.business_name = accountName;

  if (phone || email) {
    defaults.contact_details_followup = [phone, email].filter(Boolean).join(" · ");
  }

  return defaults;
}

const SKIP_WHEN_PREFILLED = new Set(["whatsapp", "email", "city_state", "business_name"]);

export function shouldSkipPrefilledIntakeQuestion(
  q: IntakeQuestion,
  accountDefaults: Record<string, unknown> | null | undefined,
): boolean {
  if (!accountDefaults || !SKIP_WHEN_PREFILLED.has(q.id)) return false;
  const value = accountDefaults[q.id];
  return typeof value === "string" && value.trim().length > 0;
}

export function mergeIntakeAnswers(
  accountDefaults: Record<string, unknown>,
  draftAnswers: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...accountDefaults };
  for (const [key, value] of Object.entries(draftAnswers)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    merged[key] = value;
  }
  return merged;
}

export function filterWizardIntakeQuestions(
  questions: IntakeQuestion[],
  answers: Record<string, unknown>,
  accountDefaults: Record<string, unknown> | null | undefined,
): IntakeQuestion[] {
  return filterVisibleIntakeQuestions(questions, answers).filter(
    (q) => !shouldSkipPrefilledIntakeQuestion(q, accountDefaults),
  );
}
