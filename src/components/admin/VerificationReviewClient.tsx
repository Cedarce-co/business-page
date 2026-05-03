"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/admin/StatusBadge";
import { kycLabel, kycTone } from "@/components/admin/status";
import CircleLoader from "@/components/ui/CircleLoader";

function fileKind(url: string) {
  const clean = url.split("?")[0]?.toLowerCase() ?? "";
  if (/\.(png|jpe?g|webp|gif)$/i.test(clean)) return "image";
  if (/\.pdf$/i.test(clean)) return "pdf";
  return "other";
}

function PreviewModal({
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
  const kind = fileKind(url);
  return (
    <Modal open={open} title={title} onClose={onClose} widthClassName="max-w-4xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Preview</p>
          <a className="text-sm font-semibold text-slate-900 underline" href={url} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
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

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

export default function VerificationReviewClient({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    kyc: null | {
      status: string;
      businessName?: string | null;
      businessAddress?: string | null;
      businessCity?: string | null;
      businessState?: string | null;
      businessWebsite?: string | null;
      businessEmail?: string | null;
      socialHandle?: string | null;
      cacNumber?: string | null;
      cacUrl?: string | null;
      govIdType?: string | null;
      govIdUrl?: string | null;
    };
  };
}) {
  const [saving, setSaving] = useState(false);
  const [action, setAction] = useState<null | "APPROVED" | "REJECTED" | "INVALID_INFO">(null);
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState<null | { title: string; url: string }>(null);

  const kycStatus = user.kyc?.status ?? "PENDING";
  const canReview = kycStatus === "SUBMITTED";

  const mapUrl = useMemo(() => {
    const addr = user.kyc?.businessAddress?.trim();
    if (!addr) return null;
    const q = encodeURIComponent(`${addr} ${user.kyc?.businessCity ?? ""} ${user.kyc?.businessState ?? ""}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }, [user.kyc?.businessAddress, user.kyc?.businessCity, user.kyc?.businessState]);

  async function submitAction(next: "APPROVED" | "REJECTED" | "INVALID_INFO") {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}/verification`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: next, note: note.trim() ? note.trim() : undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Could not update verification.");
      toast.success("Verification updated.");
      window.location.reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update verification.");
    } finally {
      setSaving(false);
      setAction(null);
      setNote("");
    }
  }

  if (!user.kyc) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-900">No verification submitted</p>
        <p className="mt-1 text-sm text-slate-600">This user has not submitted verification yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Submitted verification</p>
            <p className="mt-1 text-sm text-slate-600">Review details and documents, then take an action.</p>
          </div>
          <StatusBadge tone={kycTone(kycStatus)}>{kycLabel(kycStatus)}</StatusBadge>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-slate-700">
          <p>Business name: {user.kyc.businessName || "N/A"}</p>
          <p>Business address: {user.kyc.businessAddress || "N/A"}</p>
          <p>City / State: {(user.kyc.businessCity || "N/A") + " / " + (user.kyc.businessState || "N/A")}</p>
          <p>
            Map:{" "}
            {mapUrl ? (
              <a className="font-semibold text-slate-900 underline" href={mapUrl} target="_blank" rel="noreferrer">
                Open
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <p>Website: {user.kyc.businessWebsite || "N/A"}</p>
          <p>Business email: {user.kyc.businessEmail || "N/A"}</p>
          <p>Social handle: {user.kyc.socialHandle || "N/A"}</p>
          <p>CAC number: {user.kyc.cacNumber || "N/A"}</p>
          <p>ID type: {user.kyc.govIdType || "N/A"}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-bold text-slate-900">Government ID</p>
          <p className="mt-1 text-sm text-slate-600">Click to preview.</p>
          <div className="mt-3">
            {user.kyc.govIdUrl ? (
              <button
                type="button"
                onClick={() => setPreview({ title: "Government ID", url: user.kyc!.govIdUrl! })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Preview document
              </button>
            ) : (
              <p className="text-sm text-slate-500">N/A</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-bold text-slate-900">CAC document</p>
          <p className="mt-1 text-sm text-slate-600">Optional. Click to preview.</p>
          <div className="mt-3">
            {user.kyc.cacUrl ? (
              <button
                type="button"
                onClick={() => setPreview({ title: "CAC document", url: user.kyc!.cacUrl! })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Preview document
              </button>
            ) : (
              <p className="text-sm text-slate-500">N/A</p>
            )}
          </div>
        </div>
      </div>

      {canReview ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-bold text-slate-900">Admin action</p>
          <p className="mt-1 text-sm text-slate-600">Add a note (optional) and take an action.</p>
          <textarea
            className={`${inputClass} mt-3 min-h-28`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason / feedback to user…"
          />
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={saving}
              onClick={() => setAction("REJECTED")}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
            >
              {saving && action === "REJECTED" ? (
                <span className="inline-flex items-center gap-2">
                  <CircleLoader size={16} />
                  Decline
                </span>
              ) : (
                "Decline"
              )}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => setAction("INVALID_INFO")}
              className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-50"
            >
              {saving && action === "INVALID_INFO" ? (
                <span className="inline-flex items-center gap-2">
                  <CircleLoader size={16} />
                  Invalid info
                </span>
              ) : (
                "Invalid info"
              )}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => setAction("APPROVED")}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving && action === "APPROVED" ? (
                <span className="inline-flex items-center gap-2">
                  <CircleLoader size={16} className="opacity-90" />
                  Approve
                </span>
              ) : (
                "Approve"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">No action available (verification not in “Under review”).</p>
        </div>
      )}

      <PreviewModal
        open={preview !== null}
        title={preview?.title ?? "Preview"}
        url={preview?.url ?? ""}
        onClose={() => setPreview(null)}
      />

      <Modal
        open={action !== null}
        title={action === "APPROVED" ? "Approve verification" : action === "INVALID_INFO" ? "Mark as invalid info" : "Decline verification"}
        onClose={() => setAction(null)}
        widthClassName="max-w-xl"
      >
        <div className="space-y-3">
          <p className="text-sm text-slate-700">Confirm this action.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setAction(null)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => (action ? submitAction(action) : undefined)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50 ${
                action === "APPROVED"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : action === "INVALID_INFO"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <CircleLoader size={16} className="opacity-90" />
                  Confirm
                </span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

