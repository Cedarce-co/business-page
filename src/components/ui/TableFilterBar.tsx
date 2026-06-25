"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ActionButton } from "@/components/dashboard/ui";
import { cn } from "@/lib/utils";

type FilterOption = { value: string; label: string };

type Props = {
  searchPlaceholder?: string;
  searchParam?: string;
  statusParam?: string;
  statusOptions?: FilterOption[];
  statusLabel?: string;
  showStatus?: boolean;
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] transition focus:border-cliq-purple/40 focus:outline-none focus:ring-2 focus:ring-cliq-purple/15";

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
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    const q = String(form.get(searchParam) ?? "").trim();
    const status = String(form.get(statusParam) ?? "all").trim();

    if (q) params.set(searchParam, q);
    else params.delete(searchParam);

    if (showStatus && status && status !== "all") params.set(statusParam, status);
    else params.delete(statusParam);

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
      className="grid gap-2 md:grid-cols-[1fr_auto_auto_auto]"
      onSubmit={(e) => {
        e.preventDefault();
        apply(new FormData(e.currentTarget));
      }}
    >
      <input
        name={searchParam}
        defaultValue={currentQ}
        placeholder={searchPlaceholder}
        className={fieldClass}
      />
      {showStatus ? (
        <select name={statusParam} defaultValue={currentStatus} className={cn(fieldClass, "md:min-w-[10rem]")}>
          <option value="all">All {statusLabel.toLowerCase()}es</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : null}
      <ActionButton type="submit" disabled={pending} loading={pending} className="min-w-[6.5rem]">
        {pending ? "Filtering…" : "Apply"}
      </ActionButton>
      <ActionButton type="button" variant="secondary" disabled={pending} onClick={reset}>
        Reset
      </ActionButton>
    </form>
  );
}
