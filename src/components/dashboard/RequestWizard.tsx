"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { ActionButton, Card } from "@/components/dashboard/ui";
import type { IntakeQuestion, IntakeQuestionsResponse } from "@/features/intake/types";
import { filterVisibleIntakeQuestions, isIntakeQuestionVisible } from "@/features/intake/visibility";

type Answers = Record<string, unknown>;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

function byOrder(a: IntakeQuestion, b: IntakeQuestion) {
  return a.order - b.order;
}

export default function RequestWizard({
  packageTier,
  startFresh = false,
}: {
  packageTier: string;
  /** When true (default on request page), discard in-progress drafts for this package and start at step 1. False when `?resume=1`. */
  startFresh?: boolean;
}) {
  const router = useRouter();
  const submittedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions] = useState<IntakeQuestion[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [intakeId, setIntakeId] = useState<string | null>(null);

  const flat = useMemo(() => questions.slice().sort(byOrder), [questions]);
  const visibleFlat = useMemo(() => filterVisibleIntakeQuestions(flat, answers), [flat, answers]);
  const totalSteps = Math.max(1, visibleFlat.length);
  const activeQ = visibleFlat[Math.min(step, Math.max(0, totalSteps - 1))];
  const sectionLabel = activeQ?.section ?? "";

  const servicesSelectionKey = JSON.stringify(answers.services_requested ?? null);

  useEffect(() => {
    setStep((s) => {
      const max = Math.max(0, totalSteps - 1);
      if (!Number.isFinite(s) || s < 0) return 0;
      return Math.min(s, max);
    });
  }, [totalSteps]);

  useEffect(() => {
    setAnswers((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const q of questions) {
        if (!isIntakeQuestionVisible(q, next)) {
          if (next[q.id] !== undefined) {
            delete next[q.id];
            changed = true;
          }
          const otherKey = `${q.id}_other`;
          if (next[otherKey] !== undefined) {
            delete next[otherKey];
            changed = true;
          }
        }
      }
      return changed ? next : prev;
    });
  }, [servicesSelectionKey, questions]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const qRes = await fetch("/api/intake/questions", { cache: "no-store" });
        const qJson = (await qRes.json()) as IntakeQuestionsResponse;
        if (!cancelled) setQuestions(qJson.questions);

        const qs = new URLSearchParams({ package: packageTier });
        if (startFresh) qs.set("fresh", "1");
        const dRes = await fetch(`/api/intake/draft?${qs.toString()}`, { cache: "no-store" });
        const dJson = await dRes.json();
        if (!cancelled && dJson?.draft?.id) {
          setIntakeId(dJson.draft.id as string);
          submittedRef.current = false;
          if (startFresh) {
            setStep(0);
            setAnswers({});
          } else {
            const rawStep = Number(dJson.draft.currentStep ?? 0);
            setStep(Number.isFinite(rawStep) && rawStep >= 0 ? rawStep : 0);
            setAnswers((dJson.draft.answers as Answers) ?? {});
          }
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not load questions.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [packageTier, startFresh]);

  async function persist(nextStep: number, nextAnswers: Answers) {
    if (submittedRef.current || !intakeId) return;
    setSaving(true);
    try {
      await fetch("/api/intake/draft", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          intakeId,
          packageTier,
          currentStep: nextStep,
          answers: nextAnswers,
        }),
      });
    } catch {
      // non-blocking
    } finally {
      setSaving(false);
    }
  }

  function setValue(id: string, value: unknown) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleMulti(id: string, value: string) {
    const current = Array.isArray(answers[id]) ? (answers[id] as string[]) : [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setValue(id, next);
  }

  function requiredSatisfied(q: IntakeQuestion) {
    if (!q.required) return true;
    const v = answers[q.id];
    if (q.type === "multi_choice") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" ? v.trim().length > 0 : Boolean(v);
  }

  const canContinue = useMemo(() => {
    if (!activeQ) return false;
    return requiredSatisfied(activeQ);
  }, [activeQ, answers]);

  async function next() {
    const nextStep = Math.min(step + 1, totalSteps - 1);
    await persist(nextStep, answers);
    setStep(nextStep);
  }

  async function back() {
    const nextStep = Math.max(step - 1, 0);
    await persist(nextStep, answers);
    setStep(nextStep);
  }

  async function submit() {
    if (!intakeId) {
      toast.error("Form is still loading. Please wait.");
      return;
    }
    submittedRef.current = true;
    setSubmitting(true);
    try {
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intakeId, packageTier, currentStep: step, answers }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        result?: { serviceRequest?: { id: string } };
      };
      if (!res.ok) throw new Error(data.error ?? "Could not submit.");
      toast.success("Request submitted.");
      const id = data.result?.serviceRequest?.id;
      if (id) router.push(`/dashboard/service-requests/${id}`);
      else router.push("/dashboard/service-requests");
    } catch (e) {
      submittedRef.current = false;
      toast.error(e instanceof Error ? e.message : "Could not submit.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <Card className="p-6 sm:p-7">
          <Skeleton className="h-6 w-56" />
          <div className="mt-6 grid gap-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Package</p>
            <p className="mt-1 text-lg font-black text-slate-900">{packageTier}</p>
            <p className="mt-1 text-sm text-slate-600">
              Answer a few quick questions. We’ll review and recommend the best-fit solution.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-500">Progress</p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              Step {step + 1}/{totalSteps}
            </p>
            {saving ? <p className="mt-1 text-xs text-slate-500">Saving…</p> : null}
          </div>
        </div>

        <div className="mt-5 mb-7 flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-slate-900" : "bg-slate-200"}`} />
          ))}
        </div>

        <div className="space-y-4">
          {sectionLabel ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Section</p>
              <p className="mt-1 text-sm font-black text-slate-900">{sectionLabel}</p>
            </div>
          ) : null}

          {activeQ ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">
                {activeQ.prompt} {activeQ.required ? <span className="text-rose-600">*</span> : null}
              </p>

              {activeQ.type === "short_text" ? (
                <input
                  className={inputClass}
                  value={typeof answers[activeQ.id] === "string" ? (answers[activeQ.id] as string) : ""}
                  onChange={(e) => setValue(activeQ.id, e.target.value)}
                  placeholder={activeQ.placeholder ?? ""}
                />
              ) : null}

              {activeQ.type === "paragraph" ? (
                <textarea
                  className={`${inputClass} min-h-28`}
                  value={typeof answers[activeQ.id] === "string" ? (answers[activeQ.id] as string) : ""}
                  onChange={(e) => setValue(activeQ.id, e.target.value)}
                  placeholder={activeQ.placeholder ?? ""}
                />
              ) : null}

              {activeQ.type === "single_choice" ? (
                <div className="max-h-[420px] space-y-2 overflow-auto pr-1">
                  {activeQ.options.map((o) => (
                    <label
                      key={o.value}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <input
                        type="radio"
                        name={activeQ.id}
                        checked={answers[activeQ.id] === o.value}
                        onChange={() => setValue(activeQ.id, o.value)}
                      />
                      <span className="text-sm text-slate-800">{o.label}</span>
                    </label>
                  ))}
                </div>
              ) : null}

              {activeQ.type === "multi_choice" ? (
                <div className="max-h-[420px] space-y-2 overflow-auto pr-1">
                  {activeQ.options.map((o) => {
                    const picked = Array.isArray(answers[activeQ.id]) ? (answers[activeQ.id] as string[]) : [];
                    const checked = picked.includes(o.value);
                    return (
                      <label
                        key={o.value}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleMulti(activeQ.id, o.value)}
                        />
                        <span className="text-sm text-slate-800">{o.label}</span>
                      </label>
                    );
                  })}
                  {activeQ.allowOther ? (
                    <input
                      className={inputClass}
                      placeholder="If other, specify…"
                      value={typeof answers[`${activeQ.id}_other`] === "string" ? (answers[`${activeQ.id}_other`] as string) : ""}
                      onChange={(e) => setValue(`${activeQ.id}_other`, e.target.value)}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Could not load the current question.
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          {step > 0 ? (
            <ActionButton variant="secondary" onClick={back} className="w-full sm:w-1/2">
              Back
            </ActionButton>
          ) : null}

          {step < totalSteps - 1 ? (
            <ActionButton variant="primary" disabled={!canContinue} onClick={next} className="w-full sm:w-1/2">
              Next
            </ActionButton>
          ) : (
            <ActionButton
              variant="primary"
              disabled={!canContinue}
              loading={submitting}
              onClick={submit}
              className="w-full sm:w-1/2"
            >
              Submit
            </ActionButton>
          )}
        </div>
      </Card>
    </div>
  );
}

