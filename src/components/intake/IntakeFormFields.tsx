"use client";

import type { IntakeQuestion } from "@/features/intake/types";
import { filterVisibleIntakeQuestions } from "@/features/intake/visibility";
import { filterWizardIntakeQuestions } from "@/features/intake/account-defaults";

type Answers = Record<string, unknown>;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

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
                className={`space-y-2 rounded-2xl border p-4 ${
                  highlighted ? "border-amber-300 bg-amber-50/60" : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">
                  {q.prompt} {q.required ? <span className="text-rose-600">*</span> : null}
                </p>

                {q.type === "short_text" ? (
                  <input
                    className={inputClass}
                    value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : ""}
                    onChange={(e) => setValue(q.id, e.target.value)}
                    placeholder={q.placeholder ?? ""}
                  />
                ) : null}

                {q.type === "paragraph" ? (
                  <textarea
                    className={`${inputClass} min-h-28`}
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
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
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
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
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
                      <input
                        className={inputClass}
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
