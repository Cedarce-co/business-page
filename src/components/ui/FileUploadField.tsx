"use client";

import { useId, useState } from "react";
import { Check, Loader2, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadState = "idle" | "uploading" | "success" | "error";

export default function FileUploadField({
  label,
  optional,
  disabled,
  accept,
  hint,
  initialFilename,
  onUpload,
  onRemove,
}: {
  label: string;
  optional?: boolean;
  disabled?: boolean;
  accept: string;
  hint?: string;
  initialFilename?: string | null;
  onUpload: (file: File) => Promise<{ filename: string }>;
  onRemove?: () => Promise<void>;
}) {
  const inputId = useId();
  const [state, setState] = useState<UploadState>(initialFilename ? "success" : "idle");
  const [filename, setFilename] = useState(initialFilename ?? "");
  const [error, setError] = useState("");

  async function handleFile(file: File | null) {
    if (!file || disabled) return;
    setError("");
    setState("uploading");
    try {
      const result = await onUpload(file);
      setFilename(result.filename);
      setState("success");
    } catch (e) {
      setState("error");
      setError(e instanceof Error ? e.message : "Upload failed.");
    }
  }

  async function handleRemove() {
    if (disabled || state === "uploading") return;
    if (onRemove) {
      setState("uploading");
      try {
        await onRemove();
        setFilename("");
        setState("idle");
        setError("");
      } catch (e) {
        setState("success");
        setError(e instanceof Error ? e.message : "Could not remove file.");
      }
      return;
    }
    setFilename("");
    setState("idle");
    setError("");
  }

  const barClass =
    state === "success"
      ? "border-emerald-300 bg-emerald-50/80"
      : state === "uploading"
        ? "border-amber-300 bg-amber-50/70"
        : state === "error"
          ? "border-rose-300 bg-rose-50/70"
          : "border-slate-300 bg-slate-50";

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
        {optional ? " (optional)" : " *"}
      </label>

      <div className="flex items-stretch gap-2">
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2.5 transition",
            barClass,
          )}
        >
          {state === "uploading" ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-amber-700" aria-hidden />
          ) : (
            <Upload
              className={cn(
                "h-4 w-4 shrink-0",
                state === "success" ? "text-emerald-700" : "text-slate-500",
              )}
              aria-hidden
            />
          )}

          <span
            className={cn(
              "min-w-0 flex-1 truncate text-sm font-semibold",
              state === "success"
                ? "text-emerald-800"
                : state === "uploading"
                  ? "text-amber-900"
                  : "font-normal text-slate-500",
            )}
            title={filename || undefined}
          >
            {state === "uploading"
              ? "Uploading, please wait…"
              : state === "success"
                ? filename
                : "No file uploaded yet"}
          </span>

          {state === "success" ? (
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
              aria-label="Uploaded"
            >
              <Check className="h-3.5 w-3.5" aria-hidden />
            </span>
          ) : null}
        </div>

        {state === "success" ? (
          <button
            type="button"
            onClick={() => void handleRemove()}
            disabled={disabled}
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-white px-3 py-2.5 text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
            aria-label="Remove file"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <label
            htmlFor={inputId}
            className={cn(
              "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800",
              (disabled || state === "uploading") && "pointer-events-none opacity-50",
            )}
          >
            Upload
          </label>
        )}

        <input
          id={inputId}
          type="file"
          className="sr-only"
          disabled={disabled || state === "uploading"}
          accept={accept}
          onChange={(e) => {
            const next = e.target.files?.[0] ?? null;
            e.target.value = "";
            void handleFile(next);
          }}
        />
      </div>

      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
