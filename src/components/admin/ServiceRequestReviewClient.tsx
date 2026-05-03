"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import StatusBadge from "@/components/admin/StatusBadge";
import { requestLabel, requestTone } from "@/components/admin/status";
import CircleLoader from "@/components/ui/CircleLoader";
import {
  serviceRequestStatusDropdownOptions,
  type ServiceRequestStatusKey,
} from "@/lib/service-request-status";
import IntakeAnswersReadout from "@/components/intake/IntakeAnswersReadout";
import type { IntakeAnswerSection } from "@/features/intake/format-answers";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

export default function ServiceRequestReviewClient({
  request,
  answerSections,
  budgetDisplay,
  timelineDisplay,
  intakeMeta,
}: {
  request: {
    id: string;
    createdAt: string;
    status: string;
    serviceType: string;
    summary: string;
    budget: string | null;
    timeline: string | null;
    reviewNote: string | null;
    intake: null | {
      id: string;
      packageTier: string;
      status: string;
      questionsVer: string;
      submittedAt: string | null;
    };
  };
  answerSections: IntakeAnswerSection[];
  budgetDisplay: string;
  timelineDisplay: string;
  intakeMeta?: { packageTier?: string; questionsVer?: string; submittedAt?: string | null };
}) {
  const [saving, setSaving] = useState(false);
  const [nextStatus, setNextStatus] = useState<ServiceRequestStatusKey | null>(null);
  const [note, setNote] = useState(request.reviewNote ?? "");

  async function update() {
    if (!nextStatus) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/service-requests/${request.id}/status`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: nextStatus, note: note.trim() ? note.trim() : undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Could not update request.");
      toast.success("Request updated.");
      window.location.reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update request.");
    } finally {
      setSaving(false);
      setNextStatus(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Summary</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-800">{request.summary}</p>
            <p className="mt-2 text-xs text-slate-500">Created {new Date(request.createdAt).toLocaleString()}</p>
          </div>
          <StatusBadge tone={requestTone(request.status)}>{requestLabel(request.status)}</StatusBadge>
        </div>

        <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
          <div className="bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Budget range</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{budgetDisplay}</p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Timeline</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{timelineDisplay}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <p className="text-sm font-bold text-slate-900">Message to the client</p>
        <p className="mt-1 text-xs text-slate-600">
          Shown on their dashboard with this request. Use it for next steps, clarifications, or rejections.
        </p>
        <textarea
          className={`${inputClass} mt-4 min-h-28`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Reason / feedback…"
        />
        <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="admin-status" className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Project status
            </label>
            <select
              id="admin-status"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900"
              value={nextStatus ?? ""}
              onChange={(e) => setNextStatus(e.target.value as ServiceRequestStatusKey)}
            >
              <option value="" disabled>
                Choose next status…
              </option>
              {serviceRequestStatusDropdownOptions().map((s) => (
                <option key={s} value={s}>
                  {requestLabel(s)}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            disabled={saving || !nextStatus}
            onClick={update}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <CircleLoader size={16} className="opacity-90" />
                Saving…
              </span>
            ) : (
              "Save update"
            )}
          </button>
        </div>
      </div>

      {request.intake ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-base font-bold text-slate-900">Submitted intake answers</p>
            <p className="mt-1 text-sm text-slate-600">
              Same questions the client saw when submitting. Use this to decide status and follow-ups.
            </p>
          </div>
          <div className="mt-6 min-h-0">
            <IntakeAnswersReadout sections={answerSections} meta={intakeMeta} />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-6 text-center">
          <p className="text-sm font-semibold text-slate-900">No intake form linked</p>
          <p className="mt-1 text-sm text-slate-600">
            This request may pre-date the intake flow. Use the summary and client profile for context.
          </p>
        </div>
      )}
    </div>
  );
}
