"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  widthClassName = "max-w-2xl",
  eyebrow,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  widthClassName?: string;
  eyebrow?: string | null;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-brand-950/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${widthClassName} rounded-[1.75rem] border border-line bg-white p-6 shadow-lift`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {eyebrow !== null ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                {eyebrow ?? "Details"}
              </p>
            ) : null}
            <h2 className={`${eyebrow !== null ? "mt-1" : ""} text-xl font-semibold tracking-tight text-brand-950`}>{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line bg-white px-3 py-2 text-sm font-semibold text-brand-800 transition hover:border-brand-200 hover:bg-brand-50"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
