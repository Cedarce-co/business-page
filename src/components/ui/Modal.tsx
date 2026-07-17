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
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${widthClassName} rounded-2xl border border-white/10 bg-[#0c0c0c] p-5 shadow-elegant`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {eyebrow !== null ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cedar-accent">
                {eyebrow ?? "Details"}
              </p>
            ) : null}
            <h2 className={`${eyebrow !== null ? "mt-1" : ""} text-lg font-black text-cedar-ivory`}>{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-cedar-ivory hover:bg-white/[0.08]"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
