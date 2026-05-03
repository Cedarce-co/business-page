"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { submitKyc } from "@/features/kyc/client";
import type { KycInput } from "@/features/kyc/types";
import { ActionButton, Badge, Card } from "@/components/dashboard/ui";
import Modal from "@/components/ui/Modal";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

function fileKind(url: string) {
  const clean = url.split("?")[0]?.toLowerCase() ?? "";
  if (/\.(png|jpe?g|webp|gif)$/i.test(clean)) return "image";
  if (/\.pdf$/i.test(clean)) return "pdf";
  return "other";
}

export default function KycFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [prefilling, setPrefilling] = useState(true);
  const [error, setError] = useState("");
  const [kycStatus, setKycStatus] = useState<string>("PENDING");
  const [existingDocs, setExistingDocs] = useState<{ govIdUrl?: string | null; cacUrl?: string | null }>({});
  const [govIdPreviewUrl, setGovIdPreviewUrl] = useState<string | null>(null);
  const [cacPreviewUrl, setCacPreviewUrl] = useState<string | null>(null);
  const [docModal, setDocModal] = useState<null | { title: string; url: string }>(null);
  const [form, setForm] = useState<KycInput>({
    businessName: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessWebsite: "",
    businessEmail: "",
    socialHandle: "",
    cacNumber: "",
    govIdType: "",
    govIdFile: null,
    cacFile: null,
  });

  const locked = kycStatus === "APPROVED" || kycStatus === "REJECTED";
  const canResubmit = !locked; // editable for SUBMITTED + INVALID_INFO + PENDING

  const canContinue = useMemo(() => {
    if (step === 0) return form.businessName.trim().length > 1;
    if (step === 1) return form.businessAddress.trim().length > 5;
    if (step === 2) return true;
    return form.govIdType.trim().length > 1 && Boolean(form.govIdFile);
  }, [form, step]);

  async function prefill() {
    setPrefilling(true);
    try {
      const res = await fetch("/api/kyc", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      const kyc = (data as { kyc?: any }).kyc ?? null;
      if (!kyc) return;

      setKycStatus(kyc.status ?? "PENDING");
      setExistingDocs({ govIdUrl: kyc.govIdUrl ?? null, cacUrl: kyc.cacUrl ?? null });

      // Prefill only when user has a record (under review / invalid / etc.)
      setForm((p) => ({
        ...p,
        businessName: kyc.businessName ?? p.businessName,
        businessAddress: kyc.businessAddress ?? p.businessAddress,
        businessCity: kyc.businessCity ?? p.businessCity,
        businessState: kyc.businessState ?? p.businessState,
        businessWebsite: kyc.businessWebsite ?? p.businessWebsite,
        businessEmail: kyc.businessEmail ?? p.businessEmail,
        socialHandle: kyc.socialHandle ?? p.socialHandle,
        cacNumber: kyc.cacNumber ?? p.cacNumber,
        govIdType: kyc.govIdType ?? p.govIdType,
        // Files can't be prefilled in browsers; user can re-upload if changing
      }));
    } finally {
      setPrefilling(false);
    }
  }

  useEffect(() => {
    void prefill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (govIdPreviewUrl) URL.revokeObjectURL(govIdPreviewUrl);
      if (cacPreviewUrl) URL.revokeObjectURL(cacPreviewUrl);
    };
  }, [govIdPreviewUrl, cacPreviewUrl]);

  async function submit() {
    if (!form.govIdFile) return;
    if (!canResubmit) return;
    setLoading(true);
    setError("");
    try {
      await submitKyc(form);
      toast.success("Verification submitted.");
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not submit verification.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-3xl">
        <Card className="p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-900">Account verification</p>
          <p className="mt-1 text-sm text-slate-600">One step per screen. Smooth, focused, and secure.</p>
        </div>
        <Badge tone={kycStatus === "APPROVED" ? "emerald" : kycStatus === "SUBMITTED" ? "amber" : kycStatus === "INVALID_INFO" ? "amber" : kycStatus === "REJECTED" ? "rose" : "slate"}>
          {prefilling ? "Loading…" : kycStatus === "SUBMITTED" ? "Under review" : kycStatus === "INVALID_INFO" ? "Update needed" : kycStatus === "APPROVED" ? "Approved" : kycStatus === "REJECTED" ? "Declined" : `Step ${step + 1}/4`}
        </Badge>
      </div>

      <div className="mt-5 mb-7 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-slate-900" : "bg-slate-200"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
          className="space-y-4"
        >
          {step === 0 ? (
            <>
              <h2 className="text-xl font-bold text-slate-900">Business details</h2>
              <input
                className={inputClass}
                placeholder="Business name"
                value={form.businessName}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="City"
                  value={form.businessCity}
                  disabled={locked}
                  onChange={(e) => setForm((p) => ({ ...p, businessCity: e.target.value }))}
                />
                <input
                  className={inputClass}
                  placeholder="State"
                  value={form.businessState}
                  disabled={locked}
                  onChange={(e) => setForm((p) => ({ ...p, businessState: e.target.value }))}
                />
              </div>
            </>
          ) : null}
          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold text-slate-900">Business address</h2>
              <textarea
                className={`${inputClass} min-h-28`}
                placeholder="Street address, landmark, area"
                value={form.businessAddress}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, businessAddress: e.target.value }))}
              />
            </>
          ) : null}
          {step === 2 ? (
            <>
              <h2 className="text-xl font-bold text-slate-900">Online presence (optional)</h2>
              <p className="text-sm text-slate-600">
                Many businesses do not have these yet. Add what you have and we will help you set up the rest.
              </p>
              <input
                className={inputClass}
                placeholder="Business email (optional)"
                value={form.businessEmail ?? ""}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, businessEmail: e.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="Website link (optional)"
                value={form.businessWebsite ?? ""}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, businessWebsite: e.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="Social handle (optional) e.g. @yourbusiness"
                value={form.socialHandle ?? ""}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, socialHandle: e.target.value }))}
              />
            </>
          ) : null}
          {step === 3 ? (
            <>
              <h2 className="text-xl font-bold text-slate-900">Proof & documents</h2>
              <p className="text-sm text-slate-600">
                Any valid ID is fine. CAC is optional. Uploads are private.
              </p>
              <p className="text-xs text-slate-500">Max size: 5MB per upload. Supported: images, PDF, DOC/DOCX.</p>

              {(existingDocs.govIdUrl || existingDocs.cacUrl) ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {existingDocs.govIdUrl ? (
                    <button
                      type="button"
                      onClick={() => setDocModal({ title: "Government ID", url: existingDocs.govIdUrl! })}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left hover:bg-slate-100"
                    >
                      <p className="text-sm font-bold text-slate-900">Government ID</p>
                      <p className="mt-1 text-sm text-slate-700">View uploaded file</p>
                    </button>
                  ) : null}
                  {existingDocs.cacUrl ? (
                    <button
                      type="button"
                      onClick={() => setDocModal({ title: "CAC document", url: existingDocs.cacUrl! })}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left hover:bg-slate-100"
                    >
                      <p className="text-sm font-bold text-slate-900">CAC document</p>
                      <p className="mt-1 text-sm text-slate-700">View uploaded file</p>
                    </button>
                  ) : null}
                </div>
              ) : null}

              <input
                className={inputClass}
                placeholder="ID type (NIN, driver's license, passport, etc.)"
                value={form.govIdType}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, govIdType: e.target.value }))}
              />
              {existingDocs.govIdUrl ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  Current ID file:{" "}
                  <a className="font-semibold text-slate-900 underline" href={existingDocs.govIdUrl} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </div>
              ) : null}
              <input
                type="file"
                className={inputClass}
                disabled={locked}
                accept="image/*,application/pdf,.pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  if (!file) return setForm((p) => ({ ...p, govIdFile: null }));
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("ID file must be 5MB or less.");
                    e.target.value = "";
                    return setForm((p) => ({ ...p, govIdFile: null }));
                  }
                  if (govIdPreviewUrl) URL.revokeObjectURL(govIdPreviewUrl);
                  const nextPreview = file.type.startsWith("image/") || file.type === "application/pdf" ? URL.createObjectURL(file) : null;
                  setGovIdPreviewUrl(nextPreview);
                  setForm((p) => ({ ...p, govIdFile: file }));
                }}
              />
              {govIdPreviewUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {form.govIdFile?.type === "application/pdf" ? (
                    <iframe title="Selected ID preview" src={govIdPreviewUrl} className="h-[420px] w-full" />
                  ) : (
                    <img src={govIdPreviewUrl} alt="Selected ID preview" className="max-h-64 w-full object-contain" />
                  )}
                </div>
              ) : null}
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="CAC number (optional)"
                  value={form.cacNumber ?? ""}
                  disabled={locked}
                  onChange={(e) => setForm((p) => ({ ...p, cacNumber: e.target.value }))}
                />
                {existingDocs.cacUrl ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 sm:col-span-2">
                    Current CAC file:{" "}
                    <a className="font-semibold text-slate-900 underline" href={existingDocs.cacUrl} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </div>
                ) : null}
                <input
                  type="file"
                  className={inputClass}
                  disabled={locked}
                  accept="image/*,application/pdf,.pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (!file) return setForm((p) => ({ ...p, cacFile: null }));
                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("CAC file must be 5MB or less.");
                      e.target.value = "";
                      return setForm((p) => ({ ...p, cacFile: null }));
                    }
                    if (cacPreviewUrl) URL.revokeObjectURL(cacPreviewUrl);
                    const nextPreview = file.type.startsWith("image/") || file.type === "application/pdf" ? URL.createObjectURL(file) : null;
                    setCacPreviewUrl(nextPreview);
                    setForm((p) => ({ ...p, cacFile: file }));
                  }}
                />
              </div>
              {cacPreviewUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {form.cacFile?.type === "application/pdf" ? (
                    <iframe title="Selected CAC preview" src={cacPreviewUrl} className="h-[420px] w-full" />
                  ) : (
                    <img src={cacPreviewUrl} alt="Selected CAC preview" className="max-h-64 w-full object-contain" />
                  )}
                </div>
              ) : null}
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        {step > 0 ? (
          <ActionButton
            variant="secondary"
            onClick={() => setStep((s) => s - 1)}
            className="w-full sm:w-1/2"
          >
            Back
          </ActionButton>
        ) : null}
        {step < 3 ? (
          <ActionButton
            variant="primary"
            disabled={!canContinue || locked}
            onClick={() => setStep((s) => s + 1)}
            className={`w-full ${step > 0 ? "sm:w-1/2" : "sm:w-[60%]"}`}
          >
            Next
          </ActionButton>
        ) : (
          <ActionButton
            variant="primary"
            disabled={!canContinue || locked}
            loading={loading}
            onClick={submit}
            className={`w-full ${step > 0 ? "sm:w-1/2" : "sm:w-[60%]"}`}
          >
            {kycStatus === "SUBMITTED" ? "Resubmit verification" : "Submit verification"}
          </ActionButton>
        )}
      </div>
        </Card>
      </div>

      <Modal
        open={docModal !== null}
        title={docModal?.title ?? "Document"}
        onClose={() => setDocModal(null)}
        widthClassName="max-w-3xl"
      >
        {docModal ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600">Preview</p>
              <a className="text-sm font-semibold text-slate-900 underline" href={docModal.url} target="_blank" rel="noreferrer">
                Open in new tab
              </a>
            </div>
            {fileKind(docModal.url) === "image" ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={docModal.url} alt="" className="max-h-[70vh] w-full object-contain" />
              </div>
            ) : fileKind(docModal.url) === "pdf" ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <iframe title="Document preview" src={docModal.url} className="h-[70vh] w-full" />
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Preview not available for this file type. Use “Open in new tab”.
              </div>
            )}
          </div>
        ) : (
          <div />
        )}
      </Modal>
    </>
  );
}
