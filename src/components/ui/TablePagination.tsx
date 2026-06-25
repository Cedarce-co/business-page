"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  TABLE_PER_PAGE_OPTIONS,
  buildPageList,
  resolveTablePage,
  tableRangeLabel,
  type TablePerPage,
} from "@/lib/table-pagination";
import { cn } from "@/lib/utils";

type Props = {
  total: number;
  page: number;
  perPage: number;
};

const pageBtnClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-semibold transition";

export default function TablePagination({ total, page, perPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const { totalPages, safePage } = resolveTablePage(page, total, perPage);
  const pages = buildPageList(safePage, totalPages);

  function navigate(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `?${qs}` : "?");
    });
  }

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === safePage) return;
    navigate({ page: nextPage === 1 ? undefined : String(nextPage) });
  }

  function changePerPage(value: string) {
    const next = Number.parseInt(value, 10) as TablePerPage;
    if (!TABLE_PER_PAGE_OPTIONS.includes(next)) return;
    navigate({
      perPage: next === 10 ? undefined : String(next),
      page: undefined,
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        pending && "opacity-70",
      )}
    >
      <p className="text-sm text-slate-600">{tableRangeLabel(total, safePage, perPage)}</p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium text-slate-700">Rows</span>
          <select
            value={perPage}
            onChange={(e) => changePerPage(e.target.value)}
            disabled={pending}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 focus:border-cliq-purple/40 focus:outline-none focus:ring-2 focus:ring-cliq-purple/15"
            aria-label="Rows per page"
          >
            {TABLE_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <nav className="flex items-center gap-1" aria-label="Table pagination">
          <button
            type="button"
            onClick={() => goToPage(safePage - 1)}
            disabled={pending || safePage <= 1}
            className={cn(
              pageBtnClass,
              "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40",
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span className="sr-only sm:not-sr-only sm:ml-0.5">Prev</span>
          </button>

          {pages.map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="px-1 text-sm text-slate-400" aria-hidden>
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => goToPage(item)}
                disabled={pending || item === safePage}
                aria-current={item === safePage ? "page" : undefined}
                className={cn(
                  pageBtnClass,
                  item === safePage
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                )}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => goToPage(safePage + 1)}
            disabled={pending || safePage >= totalPages}
            className={cn(
              pageBtnClass,
              "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40",
            )}
            aria-label="Next page"
          >
            <span className="sr-only sm:not-sr-only sm:mr-0.5">Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </nav>
      </div>
    </div>
  );
}
