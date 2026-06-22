"use client";

import Modal from "@/components/ui/Modal";
import { kycFileKind } from "@/lib/kyc-upload";

export default function DocumentPreviewModal({
  open,
  title,
  url,
  onClose,
}: {
  open: boolean;
  title: string;
  url: string;
  onClose: () => void;
}) {
  const kind = kycFileKind(url);

  return (
    <Modal open={open} title={title} onClose={onClose} widthClassName="max-w-4xl">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Preview uploaded document</p>
          <div className="flex items-center gap-3">
            <a className="text-sm font-semibold text-slate-900 underline" href={url} target="_blank" rel="noreferrer">
              Open in new tab
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
        {kind === "image" ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="max-h-[70vh] w-full object-contain" />
          </div>
        ) : kind === "pdf" ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <iframe title="Document preview" src={url} className="h-[70vh] w-full" />
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            Preview not available for this file type. Use “Open in new tab”.
          </div>
        )}
      </div>
    </Modal>
  );
}
