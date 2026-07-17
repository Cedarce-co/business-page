/** Public Calendly scheduling page — set `NEXT_PUBLIC_CALENDLY_URL` in env. */
export function getCalendlyUrl(): string {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  return url ?? "";
}

export function isCalendlyConfigured(): boolean {
  return getCalendlyUrl().length > 0;
}

export type ConsultationSnippetKind = "book_self" | "book_for_them" | "full";

export function buildConsultationMessage(kind: ConsultationSnippetKind = "full"): string {
  const link = getCalendlyUrl() || "https://calendly.com/";

  if (kind === "book_self") {
    return `We'd love to walk through your request on a short call.

Pick a time that works for you: ${link}

See you soon.`;
  }

  if (kind === "book_for_them") {
    return `We'd love to walk through your request on a short call.

If you'd prefer, reply with 2–3 times that suit you (include your timezone) and we'll book the slot for you and confirm by email.`;
  }

  return `We'd love to walk through your request on a short call.

Book a time that works for you: ${link}

Prefer we schedule for you? Reply with 2–3 times that suit you (include your timezone) and we'll confirm by email.`;
}
