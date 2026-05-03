"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import {
  intakeQuestionsResponseSchema,
  type IntakeQuestion,
  type IntakeQuestionVisibleWhen,
  type IntakeQuestionsResponse,
} from "@/features/intake/types";

type QuestionType = IntakeQuestion["type"];
type ChoiceOption = { value: string; label: string };

function slugifyId(input: string) {
  const s = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s_-]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return s || `q_${Date.now()}`;
}

function normalizeOrders(questions: IntakeQuestion[]) {
  return questions.map((q, i) => ({ ...q, order: i + 1 }));
}

function uniqueId(base: string, existing: Set<string>) {
  if (!existing.has(base)) return base;
  let n = 2;
  while (existing.has(`${base}_${n}`)) n += 1;
  return `${base}_${n}`;
}

function ensureOptions(type: QuestionType, options?: ChoiceOption[]): ChoiceOption[] | undefined {
  if (type === "single_choice" || type === "multi_choice") {
    const next = (options ?? []).filter((o) => o.value.trim() && o.label.trim());
    return next.length > 0 ? next : [{ value: "option_1", label: "Option 1" }];
  }
  return undefined;
}

function makeQuestion(input: {
  id: string;
  section: string;
  prompt: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  options?: ChoiceOption[];
  allowOther?: boolean;
  order: number;
  visibleWhen?: IntakeQuestionVisibleWhen;
}): IntakeQuestion {
  const vis = input.visibleWhen;
  if (input.type === "short_text") {
    return {
      id: input.id,
      section: input.section,
      order: input.order,
      prompt: input.prompt,
      type: "short_text",
      required: input.required,
      placeholder: input.placeholder?.trim() || undefined,
      ...(vis ? { visibleWhen: vis } : {}),
    };
  }
  if (input.type === "paragraph") {
    return {
      id: input.id,
      section: input.section,
      order: input.order,
      prompt: input.prompt,
      type: "paragraph",
      required: input.required,
      placeholder: input.placeholder?.trim() || undefined,
      ...(vis ? { visibleWhen: vis } : {}),
    };
  }
  if (input.type === "single_choice") {
    return {
      id: input.id,
      section: input.section,
      order: input.order,
      prompt: input.prompt,
      type: "single_choice",
      required: input.required,
      options: ensureOptions("single_choice", input.options) as ChoiceOption[],
      ...(vis ? { visibleWhen: vis } : {}),
    };
  }
  return {
    id: input.id,
    section: input.section,
    order: input.order,
    prompt: input.prompt,
    type: "multi_choice",
    required: input.required,
    options: ensureOptions("multi_choice", input.options) as ChoiceOption[],
    allowOther: input.allowOther ? true : undefined,
    ...(vis ? { visibleWhen: vis } : {}),
  };
}

export default function IntakeQuestionBuilder({
  setId,
  setVersion,
  canEdit,
  initialQuestions,
  onSaved,
}: {
  setId: string;
  setVersion: string;
  canEdit: boolean;
  initialQuestions: IntakeQuestion[];
  onSaved: (next: IntakeQuestionsResponse) => void;
}) {
  const [questions, setQuestions] = useState<IntakeQuestion[]>(
    normalizeOrders(initialQuestions.slice().sort((a, b) => a.order - b.order))
  );

  const [tab, setTab] = useState<"builder" | "json">("builder");
  const [jsonText, setJsonText] = useState<string>(() =>
    JSON.stringify({ version: setVersion, questions }, null, 2)
  );

  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState<{
    section: string;
    prompt: string;
    type: QuestionType;
    required: boolean;
    placeholder: string;
    allowOther: boolean;
    options: ChoiceOption[];
    id: string;
  }>({
    section: "General",
    prompt: "",
    type: "short_text",
    required: true,
    placeholder: "",
    allowOther: false,
    options: [{ value: "option_1", label: "Option 1" }],
    id: "",
  });

  const payload: IntakeQuestionsResponse = useMemo(
    () => ({ version: setVersion, questions }),
    [setVersion, questions]
  );

  const parsedJson = useMemo(() => {
    try {
      const value = JSON.parse(jsonText) as unknown;
      const parsed = intakeQuestionsResponseSchema.safeParse(value);
      if (!parsed.success) return { ok: false as const, error: "JSON does not match required schema." };
      return { ok: true as const, value: parsed.data };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Invalid JSON" };
    }
  }, [jsonText]);

  function syncJsonFromBuilder(nextQuestions: IntakeQuestion[]) {
    setJsonText(JSON.stringify({ version: setVersion, questions: nextQuestions }, null, 2));
  }

  function move(idx: number, dir: -1 | 1) {
    setQuestions((prev) => {
      const next = prev.slice();
      const j = idx + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[idx], next[j]] = [next[j], next[idx]];
      const normalized = normalizeOrders(next);
      syncJsonFromBuilder(normalized);
      return normalized;
    });
  }

  function remove(idx: number) {
    setQuestions((prev) => {
      const next = prev.slice();
      next.splice(idx, 1);
      const normalized = normalizeOrders(next);
      syncJsonFromBuilder(normalized);
      return normalized;
    });
  }

  function update(idx: number, patch: Partial<IntakeQuestion>) {
    setQuestions((prev) => {
      const next = prev.slice();
      next[idx] = { ...next[idx], ...patch } as IntakeQuestion;
      const normalized = normalizeOrders(next);
      syncJsonFromBuilder(normalized);
      return normalized;
    });
  }

  function updateType(idx: number, type: QuestionType) {
    setQuestions((prev) => {
      const next = prev.slice();
      const q = next[idx];
      const vis = "visibleWhen" in q && q.visibleWhen ? q.visibleWhen : undefined;
      const base = {
        id: q.id,
        section: q.section,
        prompt: q.prompt,
        required: q.required ?? false,
        order: q.order,
        placeholder: (q.type === "short_text" || q.type === "paragraph") ? (q.placeholder ?? "") : "",
        allowOther: q.type === "multi_choice" ? Boolean(q.allowOther) : false,
        options: (q.type === "single_choice" || q.type === "multi_choice") ? q.options : [],
        visibleWhen: vis,
      };
      next[idx] = makeQuestion({ ...base, type }) as IntakeQuestion;
      const normalized = normalizeOrders(next);
      syncJsonFromBuilder(normalized);
      return normalized;
    });
  }

  async function saveToServer(next: IntakeQuestionsResponse) {
    const validated = intakeQuestionsResponseSchema.safeParse(next);
    if (!validated.success) {
      toast.error("Some questions are invalid. Please check required fields and options.");
      return;
    }
    try {
      const res = await fetch(`/api/admin/intake-question-sets/${encodeURIComponent(setId)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ questions: validated.data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Could not save.");
      onSaved(validated.data);
      toast.success("Saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    }
  }

  function openAdd() {
    setDraft((d) => ({ ...d, prompt: "", id: "" }));
    setAddOpen(true);
  }

  function addQuestion() {
    const prompt = draft.prompt.trim();
    const section = draft.section.trim() || "General";
    if (!prompt) {
      toast.error("Enter a question prompt.");
      return;
    }

    const existingIds = new Set(questions.map((q) => q.id));
    const baseId = (draft.id.trim() || slugifyId(prompt)).trim();
    const id = uniqueId(baseId, existingIds);

    const order = questions.length + 1;
    const q = makeQuestion({
      id,
      section,
      prompt,
      type: draft.type,
      required: draft.required,
      placeholder: draft.placeholder,
      options: draft.options,
      allowOther: draft.allowOther,
      order,
    });

    const next = normalizeOrders([...questions, q]);
    setQuestions(next);
    syncJsonFromBuilder(next);
    setAddOpen(false);
  }

  const grouped = useMemo(() => {
    const map = new Map<string, IntakeQuestion[]>();
    for (const q of questions) {
      const list = map.get(q.section) ?? [];
      list.push(q);
      map.set(q.section, list);
    }
    return Array.from(map.entries()).map(([section, qs]) => ({
      section,
      questions: qs.slice().sort((a, b) => a.order - b.order),
    }));
  }, [questions]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setTab("builder")}
          className={cn(
            "rounded-xl border px-3 py-2 text-sm font-semibold",
            tab === "builder" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"
          )}
        >
          Builder
        </button>
        <button
          type="button"
          onClick={() => setTab("json")}
          className={cn(
            "rounded-xl border px-3 py-2 text-sm font-semibold",
            tab === "json" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"
          )}
        >
          JSON
        </button>

        <div className="ml-auto flex flex-wrap gap-2">
          {tab === "builder" ? (
            <button
              type="button"
              onClick={openAdd}
              disabled={!canEdit}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 disabled:opacity-50"
            >
              Add question
            </button>
          ) : null}
          <button
            type="button"
            disabled={!canEdit || (tab === "json" ? !parsedJson.ok : false)}
            onClick={() => saveToServer(tab === "json" && parsedJson.ok ? parsedJson.value : payload)}
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Save changes
          </button>
        </div>
      </div>

      {tab === "json" ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Questions JSON</p>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            readOnly={!canEdit}
            spellCheck={false}
            className="mt-3 h-[520px] w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-900 outline-none focus:border-slate-900"
          />
          {!parsedJson.ok ? (
            <p className="mt-2 text-sm font-semibold text-rose-700">Invalid JSON: {parsedJson.error}</p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map((group) => (
            <div key={group.section} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-slate-900">{group.section}</p>
                <p className="text-xs font-semibold text-slate-500">{group.questions.length} questions</p>
              </div>

              <div className="mt-4 space-y-3">
                {group.questions.map((q) => {
                  const idx = questions.findIndex((x) => x.id === q.id);
                  return (
                    <div key={q.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <label className="space-y-1.5">
                              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prompt</span>
                              <input
                                value={q.prompt}
                                onChange={(e) => update(idx, { prompt: e.target.value } as Partial<IntakeQuestion>)}
                                readOnly={!canEdit}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900"
                              />
                            </label>
                            <label className="space-y-1.5">
                              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Section</span>
                              <input
                                value={q.section}
                                onChange={(e) => update(idx, { section: e.target.value } as Partial<IntakeQuestion>)}
                                readOnly={!canEdit}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900"
                              />
                            </label>
                            <label className="space-y-1.5">
                              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Type</span>
                              <select
                                value={q.type}
                                onChange={(e) => updateType(idx, e.target.value as QuestionType)}
                                disabled={!canEdit}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900 disabled:opacity-50"
                              >
                                <option value="short_text">Short answer</option>
                                <option value="paragraph">Paragraph</option>
                                <option value="single_choice">Single choice</option>
                                <option value="multi_choice">Multi choice</option>
                              </select>
                            </label>
                            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
                              <input
                                type="checkbox"
                                checked={Boolean(q.required)}
                                onChange={(e) => update(idx, { required: e.target.checked } as Partial<IntakeQuestion>)}
                                disabled={!canEdit}
                              />
                              <span className="font-semibold text-slate-900">Required</span>
                            </label>
                          </div>

                          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conditional visibility (optional)</p>
                            <p className="mt-1 text-xs text-slate-600">
                              Show this question only when a multi-select answer includes one of the chosen values (for example, after “Which services?”).
                            </p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <label className="space-y-1.5">
                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Controller question</span>
                                <select
                                  value={q.visibleWhen?.questionId ?? ""}
                                  onChange={(e) => {
                                    const id = e.target.value;
                                    if (!id) {
                                      update(idx, { visibleWhen: undefined } as Partial<IntakeQuestion>);
                                      return;
                                    }
                                    const controller = questions.find((x) => x.id === id && x.type === "multi_choice");
                                    const first = controller && controller.type === "multi_choice" ? controller.options[0]?.value : "";
                                    update(idx, {
                                      visibleWhen: { questionId: id, anyOf: first ? [first] : [] },
                                    } as Partial<IntakeQuestion>);
                                  }}
                                  disabled={!canEdit}
                                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900 disabled:opacity-50"
                                >
                                  <option value="">Always show</option>
                                  {questions
                                    .filter((x) => x.type === "multi_choice" && x.id !== q.id)
                                    .map((x) => (
                                      <option key={x.id} value={x.id}>
                                        {x.prompt.slice(0, 72)}
                                        {x.prompt.length > 72 ? "…" : ""}
                                      </option>
                                    ))}
                                </select>
                              </label>
                              {q.visibleWhen?.questionId ? (
                                <div className="space-y-2">
                                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Show if any of</span>
                                  <div className="max-h-40 space-y-2 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    {(questions.find((x) => x.id === q.visibleWhen?.questionId && x.type === "multi_choice") as
                                      | Extract<IntakeQuestion, { type: "multi_choice" }>
                                      | undefined)?.options.map((opt) => {
                                      const picked = q.visibleWhen?.anyOf?.includes(opt.value) ?? false;
                                      return (
                                        <label key={opt.value} className="flex items-center gap-2 text-sm text-slate-800">
                                          <input
                                            type="checkbox"
                                            checked={picked}
                                            disabled={!canEdit}
                                            onChange={(e) => {
                                              const cur = new Set(q.visibleWhen?.anyOf ?? []);
                                              if (e.target.checked) cur.add(opt.value);
                                              else cur.delete(opt.value);
                                              const anyOf = Array.from(cur);
                                              if (anyOf.length === 0) {
                                                update(idx, { visibleWhen: undefined } as Partial<IntakeQuestion>);
                                              } else {
                                                update(idx, {
                                                  visibleWhen: { questionId: q.visibleWhen!.questionId, anyOf },
                                                } as Partial<IntakeQuestion>);
                                              }
                                            }}
                                          />
                                          <span>{opt.label}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {(q.type === "short_text" || q.type === "paragraph") ? (
                            <label className="mt-3 block space-y-1.5">
                              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Placeholder (optional)</span>
                              <input
                                value={q.placeholder ?? ""}
                                onChange={(e) => update(idx, { placeholder: e.target.value } as Partial<IntakeQuestion>)}
                                readOnly={!canEdit}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900"
                              />
                            </label>
                          ) : null}

                          {(q.type === "single_choice" || q.type === "multi_choice") ? (
                            <div className="mt-4">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Options</p>
                                {q.type === "multi_choice" ? (
                                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(q.allowOther)}
                                      onChange={(e) => update(idx, { allowOther: e.target.checked } as Partial<IntakeQuestion>)}
                                      disabled={!canEdit}
                                    />
                                    Allow “Other”
                                  </label>
                                ) : null}
                              </div>
                              <div className="mt-2 space-y-2">
                                {q.options.map((opt, oi) => (
                                  <div key={`${q.id}-opt-${oi}`} className="grid gap-2 sm:grid-cols-2">
                                    <input
                                      value={opt.label}
                                      onChange={(e) => {
                                        const next = q.options.slice();
                                        next[oi] = { ...next[oi], label: e.target.value, value: slugifyId(e.target.value) };
                                        update(idx, { options: next } as Partial<IntakeQuestion>);
                                      }}
                                      readOnly={!canEdit}
                                      placeholder="Option label"
                                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900"
                                    />
                                    <div className="flex items-center gap-2">
                                      <input
                                        value={opt.value}
                                        onChange={(e) => {
                                          const next = q.options.slice();
                                          next[oi] = { ...next[oi], value: e.target.value };
                                          update(idx, { options: next } as Partial<IntakeQuestion>);
                                        }}
                                        readOnly={!canEdit}
                                        placeholder="Option value"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const next = q.options.slice();
                                          next.splice(oi, 1);
                                          update(idx, { options: ensureOptions(q.type, next) } as Partial<IntakeQuestion>);
                                        }}
                                        disabled={!canEdit}
                                        className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-900 disabled:opacity-50"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const next = q.options.concat({ value: `option_${q.options.length + 1}`, label: `Option ${q.options.length + 1}` });
                                  update(idx, { options: next } as Partial<IntakeQuestion>);
                                }}
                                disabled={!canEdit}
                                className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 disabled:opacity-50"
                              >
                                Add option
                              </button>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                          <button
                            type="button"
                            onClick={() => move(idx, -1)}
                            disabled={!canEdit || idx === 0}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 disabled:opacity-50"
                          >
                            Up
                          </button>
                          <button
                            type="button"
                            onClick={() => move(idx, 1)}
                            disabled={!canEdit || idx === questions.length - 1}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 disabled:opacity-50"
                          >
                            Down
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(idx)}
                            disabled={!canEdit}
                            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1.5">
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question ID</span>
                          <input
                            value={q.id}
                            onChange={(e) => update(idx, { id: e.target.value } as Partial<IntakeQuestion>)}
                            readOnly={!canEdit}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-mono text-xs text-slate-900 outline-none focus:border-slate-900"
                          />
                        </label>
                        <div className="flex items-end">
                          <p className="text-xs text-slate-600">
                            Keep IDs stable to avoid breaking draft resume and admin review mappings.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={addOpen} title="Add question" onClose={() => setAddOpen(false)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prompt</span>
            <input
              value={draft.prompt}
              onChange={(e) => setDraft((d) => ({ ...d, prompt: e.target.value, id: d.id || slugifyId(e.target.value) }))}
              placeholder="e.g. What is your business name?"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Section</span>
            <input
              value={draft.section}
              onChange={(e) => setDraft((d) => ({ ...d, section: e.target.value }))}
              placeholder="e.g. About you & your business"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Type</span>
            <select
              value={draft.type}
              onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as QuestionType }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
            >
              <option value="short_text">Short answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="single_choice">Single choice</option>
              <option value="multi_choice">Multi choice</option>
            </select>
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={draft.required}
              onChange={(e) => setDraft((d) => ({ ...d, required: e.target.checked }))}
            />
            <span className="font-semibold text-slate-900">Required</span>
          </label>

          {(draft.type === "short_text" || draft.type === "paragraph") ? (
            <label className="space-y-2 sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Placeholder (optional)</span>
              <input
                value={draft.placeholder}
                onChange={(e) => setDraft((d) => ({ ...d, placeholder: e.target.value }))}
                placeholder="e.g. Enter your answer…"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
              />
            </label>
          ) : null}

          {(draft.type === "single_choice" || draft.type === "multi_choice") ? (
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Options</p>
                {draft.type === "multi_choice" ? (
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={draft.allowOther}
                      onChange={(e) => setDraft((d) => ({ ...d, allowOther: e.target.checked }))}
                    />
                    Allow “Other”
                  </label>
                ) : null}
              </div>
              <div className="mt-3 space-y-2">
                {draft.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={opt.label}
                      onChange={(e) => {
                        const next = draft.options.slice();
                        next[i] = { ...next[i], label: e.target.value, value: slugifyId(e.target.value) };
                        setDraft((d) => ({ ...d, options: next }));
                      }}
                      placeholder={`Option ${i + 1}`}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, options: d.options.filter((_, x) => x !== i) }))}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    options: d.options.concat({ value: `option_${d.options.length + 1}`, label: `Option ${d.options.length + 1}` }),
                  }))
                }
                className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900"
              >
                Add option
              </button>
            </div>
          ) : null}

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question ID (optional)</span>
            <input
              value={draft.id}
              onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))}
              placeholder="auto-generated from prompt if empty"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-xs text-slate-900 outline-none focus:border-slate-900"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => setAddOpen(false)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={addQuestion}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Add question
          </button>
        </div>
      </Modal>
    </div>
  );
}

