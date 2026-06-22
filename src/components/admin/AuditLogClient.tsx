"use client";

import { useCallback, useEffect, useState } from "react";
import CircleLoader from "@/components/ui/CircleLoader";

type AuditRow = {
  id: string;
  createdAt: string;
  actorType: string;
  eventType: string;
  email: string | null;
  name: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  ipAddress: string | null;
  durationSeconds: number | null;
};

type CountryRow = {
  countryCode: string | null;
  country: string | null;
  signIns: number;
};

const EVENT_LABELS: Record<string, string> = {
  SIGNUP: "Sign up",
  SIGN_IN: "Sign in",
  SIGN_OUT: "Sign out",
  IDLE_SIGN_OUT: "Idle sign out",
  ADMIN_SIGN_IN: "Admin sign in",
  ADMIN_SIGN_OUT: "Admin sign out",
  ADMIN_IDLE_SIGN_OUT: "Admin idle sign out",
};

function formatDuration(seconds: number | null) {
  if (seconds == null) return "N/A";
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return rem ? `${mins}m ${rem}s` : `${mins}m`;
}

export default function AuditLogClient() {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async (cursor?: string) => {
    const params = new URLSearchParams();
    params.set("limit", "40");
    if (countryFilter) params.set("country", countryFilter);
    if (cursor) params.set("cursor", cursor);

    const res = await fetch(`/api/admin/audit-log?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error ?? "Could not load audit log.");

    const items = (data.items ?? []) as AuditRow[];
    setRows((prev) => (cursor ? [...prev, ...items] : items));
    setNextCursor(data.nextCursor ?? null);
  }, [countryFilter]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const [logRes, summaryRes] = await Promise.all([
          fetch(countryFilter ? `/api/admin/audit-log?limit=40&country=${encodeURIComponent(countryFilter)}` : "/api/admin/audit-log?limit=40"),
          fetch("/api/admin/audit-log?summary=1"),
        ]);
        const logData = await logRes.json();
        const summaryData = await summaryRes.json();
        if (!cancelled) {
          if (!logRes.ok) throw new Error(logData?.error ?? "Could not load audit log.");
          setRows(logData.items ?? []);
          setNextCursor(logData.nextCursor ?? null);
          setCountries(summaryData.countries ?? []);
        }
      } catch {
        if (!cancelled) {
          setRows([]);
          setCountries([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [countryFilter]);

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      await load(nextCursor);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold text-slate-900">Traffic by country</p>
        <p className="mt-1 text-sm text-slate-600">Sign-ups and sign-ins with a detected country (from IP headers).</p>
        {countries.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No country data yet.</p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCountryFilter("")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                !countryFilter ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            {countries.map((c) => (
              <button
                key={`${c.countryCode}-${c.country}`}
                type="button"
                onClick={() => setCountryFilter(c.countryCode ?? "")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  countryFilter === c.countryCode
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c.country ?? c.countryCode} ({c.signIns})
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-sm font-bold text-slate-900">Auth activity log</p>
          <p className="mt-1 text-sm text-slate-600">Sign up, sign in, sign out, idle timeouts, and admin access.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-slate-600">
            <CircleLoader size={18} />
            Loading…
          </div>
        ) : rows.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-slate-500">No audit events recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">When</th>
                  <th className="px-5 py-3">Event</th>
                  <th className="px-5 py-3">Actor</th>
                  <th className="px-5 py-3">Country</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Time spent</th>
                  <th className="px-5 py-3">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.id} className="text-slate-800">
                    <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-600">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-3 font-medium">{EVENT_LABELS[row.eventType] ?? row.eventType}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium">{row.name ?? "N/A"}</div>
                      <div className="text-xs text-slate-500">{row.email ?? row.actorType}</div>
                    </td>
                    <td className="px-5 py-3">{row.country ?? row.countryCode ?? "N/A"}</td>
                    <td className="px-5 py-3 text-xs text-slate-600">
                      {[row.city, row.region].filter(Boolean).join(", ") || "N/A"}
                    </td>
                    <td className="px-5 py-3">{formatDuration(row.durationSeconds)}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">{row.ipAddress ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {nextCursor ? (
          <div className="border-t border-slate-100 px-5 py-4">
            <button
              type="button"
              disabled={loadingMore}
              onClick={loadMore}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
