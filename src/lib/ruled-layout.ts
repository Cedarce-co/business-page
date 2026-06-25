import { cn } from "@/lib/utils";

/** Flat section bands — no card boxes. */
export const sectionBand = {
  white: "bg-white",
  muted: "bg-cliq-gray-50",
} as const;

export function sectionBandBg(index: number) {
  return index % 2 === 1 ? sectionBand.muted : sectionBand.white;
}

const divide = "divide-cliq-gray-200";
const ruleTop = "border-t border-cliq-gray-200";

/** Multi-column grid: top rule + internal divides only (no outer box). */
export function bandGridCols(cols: 2 | 3) {
  const colClass = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return cn("grid", ruleTop, divide, colClass, "sm:divide-x sm:divide-y-0");
}

export function bandGridColsLg(cols: 2 | 3) {
  const colClass = cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return cn("grid", ruleTop, divide, colClass, "lg:divide-x lg:divide-y-0");
}

export const bandCell = "px-0 py-8 sm:px-8 first:sm:pl-0 last:sm:pr-0";

/** Two-column split under a heading */
export const bandSplit =
  "grid divide-y divide-cliq-gray-200 border-t border-cliq-gray-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0";

export const bandSplitCell = "px-0 py-8 lg:pr-10 first:lg:pl-0 last:lg:pl-10";

export const bandSplitTone = {
  rose: "bg-rose-50/70",
  emerald: "bg-emerald-50/70",
} as const;

export const bandList = "divide-y divide-cliq-gray-200 border-t border-cliq-gray-200";

export const bandListItem = "px-0 py-4 sm:px-6 first:sm:pl-0";

export const bandBlockTop = "border-t border-cliq-gray-200 pt-8";

/* Legacy aliases — same flat system, no heavy ruled frames */
export const ruledSection = sectionBand;
export const ruledSectionBg = sectionBandBg;
export const ruledGridCols = bandGridCols;
export const ruledGridColsLg = bandGridColsLg;
export const ruledCell = bandCell;
export const ruledSplit = bandSplit;
export const ruledSplitCell = bandSplitCell;
export const ruledSplitTone = bandSplitTone;
export const ruledList = bandList;
export const ruledListItem = bandListItem;
export const ruledBlockTop = bandBlockTop;
