"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";

type FeedbackRow = {
  id: string;
  name: string | null;
  email: string | null;
  topic: string | null;
  message: string;
  page: string | null;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt: string;
  readAt: string | null;
};

const STATUS_LABELS = {
  NEW: "New",
  READ: "Read",
  ARCHIVED: "Archived",
} as const;

export default function FeedbacksClient() {
  const [items, setItems] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"" | "NEW" | "READ" | "ARCHIVED">("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = filter ? `/api/admin/feedbacks?status=${filter}` : "/api/admin/feedbacks";
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not load feedback.");
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(id: string, status: FeedbackRow["status"]) {
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/feedbacks", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not update.");
      setItems((prev) => prev.map((row) => (row.id === id ? { ...row, ...data.item } : row)));
      toast.success(`Marked as ${STATUS_LABELS[status].toLowerCase()}.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["", "NEW", "READ", "ARCHIVED"] as const).map((value) => (
          <button
            key={value || "all"}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === value ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {value ? STATUS_LABELS[value] : "All"}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-slate-600">
            <CircleLoader size={18} />
            Loading…
          </div>
        ) : items.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-slate-500">No feedback yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3">From</th>
                  <th className="px-5 py-3">Topic</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Page</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((row) => (
                  <tr key={row.id} className="align-top text-slate-800">
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium">{row.name ?? "Anonymous"}</div>
                      {row.email ? <div className="text-xs text-slate-500">{row.email}</div> : null}
                    </td>
                    <td className="px-5 py-4 text-sm">{row.topic ?? "—"}</td>
                    <td className="max-w-md px-5 py-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{row.message}</p>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">{row.page ?? "—"}</td>
                    <td className="px-5 py-4">
                      <select
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium"
                        value={row.status}
                        disabled={savingId === row.id}
                        onChange={(e) => void setStatus(row.id, e.target.value as FeedbackRow["status"])}
                      >
                        <option value="NEW">New</option>
                        <option value="READ">Read</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
