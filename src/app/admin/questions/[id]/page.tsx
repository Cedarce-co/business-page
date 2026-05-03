"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import IntakeQuestionBuilder from "@/components/admin/IntakeQuestionBuilder";
import { intakeQuestionsResponseSchema, type IntakeQuestionsResponse } from "@/features/intake/types";

type QuestionSet = {
  id: string;
  version: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  title: string;
  questions: unknown;
  updatedAt: string;
};

export default function AdminEditQuestionSetPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [set, setSet] = useState<QuestionSet | null>(null);
  const [current, setCurrent] = useState<IntakeQuestionsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/intake-question-sets/${encodeURIComponent(id)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? "Could not load question set.");
        if (cancelled) return;
        setSet(json.set);
        const parsed = intakeQuestionsResponseSchema.safeParse(json.set.questions);
        if (!parsed.success) throw new Error("Stored question set is invalid. Create a new draft.");
        setCurrent(parsed.data);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not load question set.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function publish() {
    if (set?.status !== "DRAFT") return;
    setPublishing(true);
    try {
      const res = await fetch(`/api/admin/intake-question-sets/${encodeURIComponent(id)}/publish`, {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Could not publish.");
      toast.success("Published");
      router.refresh();
      setSet(json.set);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not publish.");
    } finally {
      setPublishing(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">Loading…</p>
      </div>
    );
  }

  if (!set || !current) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">Not found.</p>
      </div>
    );
  }

  const canEdit = set.status === "DRAFT";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <WayfindingStrip zone="admin" backLabel="Back to previous page" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {set.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Version: <span className="font-semibold text-slate-900">{set.version}</span> · Status:{" "}
            <span className="font-semibold text-slate-900">{set.status}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!canEdit || publishing}
            onClick={publish}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {publishing ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <IntakeQuestionBuilder
          setId={set.id}
          setVersion={set.version}
          canEdit={canEdit}
          initialQuestions={current.questions}
          onSaved={(next) => setCurrent(next)}
        />
        {!canEdit ? (
          <p className="mt-3 text-sm text-slate-600">
            This set is not a draft. Create a new draft to make changes.
          </p>
        ) : null}
      </div>
    </div>
  );
}

