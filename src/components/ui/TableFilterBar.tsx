"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type FilterOption = { value: string; label: string };

type Props = {
  searchPlaceholder?: string;
  searchParam?: string;
  statusParam?: string;
  statusOptions?: FilterOption[];
  statusLabel?: string;
  showStatus?: boolean;
};

export default function TableFilterBar({
  searchPlaceholder = "Search…",
  searchParam = "q",
  statusParam = "status",
  statusOptions = [],
  statusLabel = "Status",
  showStatus = true,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const currentQ = searchParams.get(searchParam) ?? "";
  const currentStatus = searchParams.get(statusParam) ?? "all";

  function apply(form: FormData) {
    const params = new URLSearchParams();
    const q = String(form.get(searchParam) ?? "").trim();
    const status = String(form.get(statusParam) ?? "all").trim();
    if (q) params.set(searchParam, q);
    if (showStatus && status && status !== "all") params.set(statusParam, status);
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `?${qs}` : "?");
    });
  }

  function reset() {
    startTransition(() => {
      router.push("?");
    });
  }

  return (
    <form
      className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_auto_auto_auto]"
      onSubmit={(e) => {
        e.preventDefault();
        apply(new FormData(e.currentTarget));
      }}
    >
      <input
        name={searchParam}
        defaultValue={currentQ}
        placeholder={searchPlaceholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
      />
      {showStatus ? (
        <select
          name={statusParam}
          defaultValue={currentStatus}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"
        >
          <option value="all">All {statusLabel.toLowerCase()}es</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Filtering…" : "Apply"}
      </button>
      <button
        type="button"
        onClick={reset}
        disabled={pending}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60"
      >
        Reset
      </button>
    </form>
  );
}
