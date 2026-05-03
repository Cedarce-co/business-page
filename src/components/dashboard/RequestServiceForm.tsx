"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { createServiceRequest } from "@/features/service-requests/client";
import type { ServiceRequestInput } from "@/features/service-requests/types";
import { ActionButton, Card } from "@/components/dashboard/ui";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

export default function RequestServiceForm() {
  const [form, setForm] = useState<ServiceRequestInput>({
    serviceType: "",
    summary: "",
    budget: "",
    timeline: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(
    () => form.serviceType.trim().length >= 2 && form.summary.trim().length >= 10,
    [form.serviceType, form.summary],
  );

  async function submit() {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await createServiceRequest(form);
      setMessage("Request submitted successfully.");
      toast.success("Request submitted.");
      setForm({ serviceType: "", summary: "", budget: "", timeline: "" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not create request.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="p-6 sm:p-7">
      <div className="mb-6">
        <p className="text-sm font-black text-slate-900">Service request</p>
        <p className="mt-1 text-sm text-slate-600">
          The more context you share, the faster we can scope and deliver.
        </p>
      </div>

      <div className="grid gap-4">
        <input
          className={inputClass}
          placeholder="Service type (e.g. Website + Payments)"
          value={form.serviceType}
          onChange={(e) => setForm((p) => ({ ...p, serviceType: e.target.value }))}
        />
        <textarea
          className={`${inputClass} min-h-28`}
          placeholder="Describe what you want us to build..."
          value={form.summary}
          onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Budget range (optional)"
            value={form.budget}
            onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Expected timeline (optional)"
            value={form.timeline}
            onChange={(e) => setForm((p) => ({ ...p, timeline: e.target.value }))}
          />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
      {message ? (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-emerald-700">
          {message}
        </motion.p>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">We respond with next steps after review.</p>
        <ActionButton
          variant="primary"
          onClick={submit}
          loading={saving}
          disabled={!canSubmit}
        >
          Submit request
        </ActionButton>
      </div>
      </Card>
    </div>
  );
}
