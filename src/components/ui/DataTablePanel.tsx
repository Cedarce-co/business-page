import type { ReactNode } from "react";

export default function DataTablePanel({
  filter,
  children,
  pagination,
}: {
  filter?: ReactNode;
  children: ReactNode;
  pagination?: ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-slate-200 bg-white">
      {filter ? <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-3">{filter}</div> : null}
      {children}
      {pagination ? <div className="border-t border-slate-200 bg-slate-50/50">{pagination}</div> : null}
    </div>
  );
}
