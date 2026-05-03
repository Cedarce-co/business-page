import type { IntakeQuestion } from "@/features/intake/types";

type Answers = Record<string, unknown>;

export function isIntakeQuestionVisible(q: IntakeQuestion, answers: Answers): boolean {
  const rule = q.visibleWhen;
  if (!rule) return true;
  const raw = answers[rule.questionId];
  if (!Array.isArray(raw)) return false;
  const selected = raw.filter((x): x is string => typeof x === "string");
  return rule.anyOf.some((v) => selected.includes(v));
}

export function filterVisibleIntakeQuestions(questions: IntakeQuestion[], answers: Answers): IntakeQuestion[] {
  return questions.filter((q) => isIntakeQuestionVisible(q, answers));
}
