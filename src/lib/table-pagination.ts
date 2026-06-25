export const TABLE_PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;
export type TablePerPage = (typeof TABLE_PER_PAGE_OPTIONS)[number];

export const DEFAULT_TABLE_PER_PAGE: TablePerPage = 10;

function readParam(params: Record<string, string | string[] | undefined>, key: string) {
  const raw = params[key];
  return (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
}

export function parseTablePagination(params: Record<string, string | string[] | undefined>) {
  const pageRaw = readParam(params, "page");
  const perPageRaw = readParam(params, "perPage");

  const parsedPage = Number.parseInt(pageRaw, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsedPerPage = Number.parseInt(perPageRaw, 10);
  const perPage = TABLE_PER_PAGE_OPTIONS.includes(parsedPerPage as TablePerPage)
    ? (parsedPerPage as TablePerPage)
    : DEFAULT_TABLE_PER_PAGE;

  const skip = (page - 1) * perPage;

  return { page, perPage, skip, take: perPage };
}

export function resolveTablePage(page: number, total: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  return { totalPages, safePage, skip: (safePage - 1) * perPage };
}

export function tableRangeLabel(total: number, page: number, perPage: number) {
  if (total === 0) return "No results";
  const { safePage } = resolveTablePage(page, total, perPage);
  const from = (safePage - 1) * perPage + 1;
  const to = Math.min(safePage * perPage, total);
  return `Showing ${from}–${to} of ${total}`;
}

export function buildPageList(current: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);
  for (let i = start; i <= end; i += 1) pages.push(i);

  if (current < totalPages - 2) pages.push("ellipsis");

  if (totalPages > 1) pages.push(totalPages);

  return pages;
}
