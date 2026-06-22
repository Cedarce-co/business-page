"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ScrollableStepShell from "@/components/ui/ScrollableStepShell";
import { ActionButton } from "@/components/dashboard/ui";
import IntakeFormFields, { intakeFormIsValid } from "@/components/intake/IntakeFormFields";
import type { IntakeQuestion } from "@/features/intake/types";
import { serviceRequestEditReason } from "@/lib/service-request-edit";

type Answers = Record<string, unknown>;

export default function RequestEditForm({
  requestId,
  status,
  createdAt,
  reviewNote,
  packageTier,
  initialAnswers,
  questions,
  accountDefaults = {},
}: {
  requestId: string;
  status: string;
  createdAt: string;
  reviewNote?: string | null;
  packageTier: string;
  initialAnswers: Answers;
  questions: IntakeQuestion[];
  accountDefaults?: Record<string, unknown>;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  const editHint = serviceRequestEditReason({ status, createdAt });
  const highlightIds = status === "NEEDS_INFO" ? ["anything_else"] : [];

  const canSubmit = useMemo(
    () => intakeFormIsValid(questions, answers, true, accountDefaults),
    [questions, answers, accountDefaults],
  );

  async function save() {
    if (!canSubmit) {
      toast.error("Please complete all required fields.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/service-requests/${requestId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Could not save changes.");
      toast.success(status === "NEEDS_INFO" ? "Updates submitted. We'll review shortly." : "Request updated.");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollableStepShell
      variant="form"
      header={
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-900">Edit your request</p>
          <p className="text-sm text-slate-600">
            Update project details below. Phone, email, and location from your account are filled in automatically.
          </p>
          {editHint ? <p className="text-xs font-medium text-slate-500">{editHint}</p> : null}
          {reviewNote ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">What we need from you</p>
              <p className="mt-1 whitespace-pre-wrap">{reviewNote}</p>
            </div>
          ) : null}
        </div>
      }
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <ActionButton variant="primary" loading={saving} disabled={!canSubmit} onClick={save}>
            {status === "NEEDS_INFO" ? "Submit updates" : "Save changes"}
          </ActionButton>
        </div>
      }
    >
      <div className="pb-1 pt-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Package: {packageTier}</p>

        <IntakeFormFields
          questions={questions}
          answers={answers}
          onChange={setAnswers}
          showAllFields
          highlightQuestionIds={highlightIds}
          accountDefaults={accountDefaults}
        />
      </div>
    </ScrollableStepShell>
  );
}
