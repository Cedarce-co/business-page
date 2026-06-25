import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

export function DataTable({
  children,
  minWidth = "720px",
  embedded = false,
}: {
  children: ReactNode;
  minWidth?: string;
  embedded?: boolean;
}) {
  return (
    <div className={cn("overflow-x-auto", !embedded && "border-t border-slate-200")}>
      <table className="w-full border-collapse" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export function DataTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50/80">
      <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</tr>
    </thead>
  );
}

export function DataTableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-slate-200 [&_tr:nth-child(odd)]:bg-white [&_tr:nth-child(even)]:bg-slate-50/80 [&_tr]:transition [&_tr:hover]:bg-slate-50/70">
      {children}
    </tbody>
  );
}

export function DataTableRow({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={className}>{children}</tr>;
}

export function DataTableTh({
  children,
  className = "",
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
  return (
    <th scope="col" className={cn("px-4 py-3.5", alignClass, className)}>
      {children}
    </th>
  );
}

export function DataTableTd({
  children,
  className = "",
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
  return <td className={cn("px-4 py-4 align-top text-sm text-slate-700", alignClass, className)}>{children}</td>;
}

export function DataTableEmpty({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr className="!bg-white hover:!bg-white">
      <td colSpan={colSpan} className="px-4 py-12 text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center px-6 py-8">
          <SearchX className="h-8 w-8 text-slate-300" aria-hidden />
          <p className="mt-3 text-sm font-semibold text-slate-800">Nothing to show yet</p>
          <p className="mt-1 text-sm text-slate-500">{message}</p>
        </div>
      </td>
    </tr>
  );
}
