import type { IntakeQuestion } from "@/features/intake/types";

export type IntakeAnswerSection = {
  section: string;
  items: { label: string; value: string }[];
};

function humanizeFieldKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function optionLabel(q: IntakeQuestion & { type: "single_choice" | "multi_choice" }, value: string): string {
  const opt = q.options.find((o) => o.value === value);
  return opt?.label ?? humanizeFieldKey(value);
}

function formatPrimitive(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return v.map(formatPrimitive).join(", ");
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function formatQuestionRow(q: IntakeQuestion, answers: Record<string, unknown>): string | null {
  const raw = answers[q.id];
  if (raw === undefined || raw === null) return null;
  if (typeof raw === "string" && raw.trim() === "") return null;

  if (q.type === "multi_choice") {
    if (!Array.isArray(raw) || raw.length === 0) return null;
    const arr = raw.map(String);
    const parts: string[] = [];
    for (const v of arr) {
      if (v === "other" && q.allowOther) {
        const ot = answers[`${q.id}_other`];
        if (typeof ot === "string" && ot.trim()) parts.push(`Other: ${ot.trim()}`);
        else parts.push(optionLabel(q, "other"));
      } else {
        parts.push(optionLabel(q, v));
      }
    }
    return parts.join(", ");
  }

  if (q.type === "single_choice") {
    const v = String(raw);
    let text = optionLabel(q, v);
    if (v === "other") {
      const ot = answers[`${q.id}_other`];
      if (typeof ot === "string" && ot.trim()) text = `${text}: ${ot.trim()}`;
    }
    return text;
  }

  const s = String(raw).trim();
  return s || null;
}

/**
 * Group intake answers by section with human-readable labels (uses question definitions).
 */
export function formatIntakeAnswersToSections(
  questions: IntakeQuestion[],
  answers: Record<string, unknown> | null | undefined,
): IntakeAnswerSection[] {
  const a = answers && typeof answers === "object" && !Array.isArray(answers) ? answers : {};
  const sorted = [...questions].sort((x, y) => x.order - y.order);
  const sectionOrder: string[] = [];
  const map = new Map<string, { label: string; value: string }[]>();

  function push(section: string, label: string, value: string) {
    if (!map.has(section)) {
      map.set(section, []);
      sectionOrder.push(section);
    }
    map.get(section)!.push({ label, value });
  }

  for (const q of sorted) {
    const value = formatQuestionRow(q, a);
    if (!value) continue;
    const section = q.section?.trim() || "Other";
    push(section, q.prompt, value);
  }

  const knownIds = new Set(sorted.map((q) => q.id));
  const orphanItems: { label: string; value: string }[] = [];
  for (const key of Object.keys(a)) {
    if (key.endsWith("_other")) continue;
    if (knownIds.has(key)) continue;
    const v = a[key];
    if (v === undefined || v === null || v === "") continue;
    orphanItems.push({ label: humanizeFieldKey(key), value: formatPrimitive(v) });
  }
  if (orphanItems.length) {
    sectionOrder.push("Additional responses");
    map.set("Additional responses", orphanItems);
  }

  return sectionOrder.map((section) => ({ section, items: map.get(section)! }));
}

/**
 * Map a stored choice value (e.g. from ServiceRequest.budget) to the survey option label.
 */
export function formatChoiceByQuestionId(
  questions: IntakeQuestion[],
  questionId: string,
  raw: string | null | undefined,
): string {
  if (raw == null || raw === "") return "-";
  const q = questions.find((x) => x.id === questionId);
  if (q && (q.type === "single_choice" || q.type === "multi_choice")) {
    return optionLabel(q, raw);
  }
  return humanizeFieldKey(raw);
}
