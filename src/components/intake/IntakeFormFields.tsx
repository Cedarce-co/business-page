"use client";

import type { IntakeQuestion } from "@/features/intake/types";
import { filterVisibleIntakeQuestions } from "@/features/intake/visibility";
import { filterWizardIntakeQuestions } from "@/features/intake/account-defaults";

type Answers = Record<string, unknown>;

import { Input, Textarea } from "@/components/ui/FormField";

const choiceClass =
  "flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200/90 bg-white/95 px-4 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition duration-200 hover:border-cliq-purple/30 hover:bg-cliq-purple-soft/30 has-[:checked]:border-cliq-purple has-[:checked]:bg-cliq-purple-soft/50";

function byOrder(a: IntakeQuestion, b: IntakeQuestion) {
  return a.order - b.order;
}

function requiredSatisfied(q: IntakeQuestion, answers: Answers) {
  if (!q.required) return true;
  const v = answers[q.id];
  if (q.type === "multi_choice") return Array.isArray(v) && v.length > 0;
  return typeof v === "string" ? v.trim().length > 0 : Boolean(v);
}

export function intakeFormIsValid(
  questions: IntakeQuestion[],
  answers: Answers,
  showAllFields: boolean,
  accountDefaults?: Record<string, unknown> | null,
) {
  const list = showAllFields
    ? filterWizardIntakeQuestions(questions, answers, accountDefaults)
    : filterVisibleIntakeQuestions(questions, answers);
  return list.every((q) => requiredSatisfied(q, answers));
}

export default function IntakeFormFields({
  questions,
  answers,
  onChange,
  showAllFields = false,
  highlightQuestionIds = [],
  accountDefaults = null,
}: {
  questions: IntakeQuestion[];
  answers: Answers;
  onChange: (next: Answers) => void;
  showAllFields?: boolean;
  highlightQuestionIds?: string[];
  accountDefaults?: Record<string, unknown> | null;
}) {
  const sorted = questions.slice().sort(byOrder);
  const visible = showAllFields
    ? filterWizardIntakeQuestions(sorted, answers, accountDefaults)
    : filterVisibleIntakeQuestions(sorted, answers);

  const sections = visible.reduce<Record<string, IntakeQuestion[]>>((acc, q) => {
    const key = q.section || "Details";
    acc[key] = acc[key] ?? [];
    acc[key].push(q);
    return acc;
  }, {});

  function setValue(id: string, value: unknown) {
    onChange({ ...answers, [id]: value });
  }

  function toggleMulti(id: string, value: string) {
    const current = Array.isArray(answers[id]) ? (answers[id] as string[]) : [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setValue(id, next);
  }

  return (
    <div className="space-y-8">
      {Object.entries(sections).map(([section, sectionQuestions]) => (
        <div key={section} className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{section}</p>
          </div>
          {sectionQuestions.map((q) => {
            const highlighted = highlightQuestionIds.includes(q.id);
            return (
              <div
                key={q.id}
                className={`space-y-2 rounded-2xl border p-4 transition duration-200 ${
                  highlighted ? "border-amber-300 bg-amber-50/60" : "border-slate-200/90 bg-white/95 shadow-[0_4px_16px_rgba(15,23,42,0.03)]"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">
                  {q.prompt} {q.required ? <span className="text-rose-600">*</span> : null}
                </p>

                {q.type === "short_text" ? (
                  <Input
                    value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : ""}
                    onChange={(e) => setValue(q.id, e.target.value)}
                    placeholder={q.placeholder ?? ""}
                  />
                ) : null}

                {q.type === "paragraph" ? (
                  <Textarea
                    value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : ""}
                    onChange={(e) => setValue(q.id, e.target.value)}
                    placeholder={q.placeholder ?? ""}
                  />
                ) : null}

                {q.type === "single_choice" ? (
                  <div className="space-y-2">
                    {q.options.map((o) => (
                      <label
                        key={o.value}
                        className={choiceClass}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={answers[q.id] === o.value}
                          onChange={() => setValue(q.id, o.value)}
                        />
                        <span className="text-sm text-slate-800">{o.label}</span>
                      </label>
                    ))}
                  </div>
                ) : null}

                {q.type === "multi_choice" ? (
                  <div className="space-y-2">
                    {q.options.map((o) => {
                      const picked = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
                      const checked = picked.includes(o.value);
                      return (
                        <label
                          key={o.value}
                          className={choiceClass}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleMulti(q.id, o.value)}
                          />
                          <span className="text-sm text-slate-800">{o.label}</span>
                        </label>
                      );
                    })}
                    {q.allowOther ? (
                      <Input
                        placeholder="If other, specify…"
                        value={
                          typeof answers[`${q.id}_other`] === "string"
                            ? (answers[`${q.id}_other`] as string)
                            : ""
                        }
                        onChange={(e) => setValue(`${q.id}_other`, e.target.value)}
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
