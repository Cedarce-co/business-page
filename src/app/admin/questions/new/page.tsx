"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminCreateQuestionDraftPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");

  async function create() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/intake-question-sets", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          version: version.trim() || undefined,
          title: title.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Could not create draft.");
      toast.success("Draft created");
      router.push(`/admin/questions/${json.id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not create draft.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        Create intake questions draft
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Leave fields empty to auto-generate. You can edit questions after creating the draft.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Version</span>
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="e.g. v2-2026-05-01"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Intake questions (v2)"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
          />
        </label>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={create}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create draft"}
      </button>
    </div>
  );
}

