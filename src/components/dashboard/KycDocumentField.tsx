"use client";

import { useId } from "react";
import { KYC_ACCEPT, validateKycUpload } from "@/lib/kyc-upload";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_MB } from "@/lib/upload-limits";

type Props = {
  label: string;
  optional?: boolean;
  disabled?: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingUrl?: string | null;
  onViewExisting?: (url: string) => void;
  hint?: string;
  onError?: (message: string) => void;
};

export default function KycDocumentField({
  label,
  optional,
  disabled,
  file,
  onFileChange,
  existingUrl,
  onViewExisting,
  hint,
  onError,
}: Props) {
  const inputId = useId();
  const displayName = file?.name ?? (existingUrl ? "File on record — upload to replace" : "No file chosen");

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
          {optional ? " (optional)" : " *"}
        </label>
        {existingUrl && onViewExisting ? (
          <button
            type="button"
            onClick={() => onViewExisting(existingUrl)}
            className="text-xs font-semibold text-slate-900 underline"
          >
            View uploaded
          </button>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <div
          className="min-w-0 flex-1 truncate rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
          title={displayName}
        >
          {displayName}
        </div>
        <label
          htmlFor={inputId}
          className={`shrink-0 cursor-pointer rounded-lg bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 ${
            disabled ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Upload
        </label>
        <input
          id={inputId}
          type="file"
          className="sr-only"
          disabled={disabled}
          accept={KYC_ACCEPT}
          onChange={(e) => {
            const next = e.target.files?.[0] ?? null;
            if (!next) {
              onFileChange(null);
              return;
            }
            const typeError = validateKycUpload(next);
            if (typeError) {
              e.target.value = "";
              onFileChange(null);
              onError?.(typeError);
              return;
            }
            if (next.size > MAX_UPLOAD_BYTES) {
              e.target.value = "";
              onFileChange(null);
              onError?.(`File must be ${MAX_UPLOAD_MB}MB or less.`);
              return;
            }
            onFileChange(next);
          }}
        />
      </div>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
