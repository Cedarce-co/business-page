"use client";

import { MAX_UPLOAD_BYTES, MAX_UPLOAD_MB } from "@/lib/upload-limits";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { submitKyc } from "@/features/kyc/client";
import type { KycInput } from "@/features/kyc/types";
import { ActionButton, Badge } from "@/components/dashboard/ui";
import ScrollableStepShell from "@/components/ui/ScrollableStepShell";
import KycDocumentField from "@/components/dashboard/KycDocumentField";
import DocumentPreviewModal from "@/components/shared/DocumentPreviewModal";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

export default function KycFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [prefilling, setPrefilling] = useState(true);
  const [error, setError] = useState("");
  const [kycStatus, setKycStatus] = useState<string>("PENDING");
  const [existingDocs, setExistingDocs] = useState<{
    govIdUrl?: string | null;
    addressProofUrl?: string | null;
    cacUrl?: string | null;
  }>({});
  const [govIdPreviewUrl, setGovIdPreviewUrl] = useState<string | null>(null);
  const [addressProofPreviewUrl, setAddressProofPreviewUrl] = useState<string | null>(null);
  const [cacPreviewUrl, setCacPreviewUrl] = useState<string | null>(null);
  const [docModal, setDocModal] = useState<null | { title: string; url: string }>(null);
  const [form, setForm] = useState<KycInput>({
    phone: "",
    personalAddress: "",
    personalCity: "",
    personalCountry: "",
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
    addressProofFile: null,
    cacFile: null,
    hasExistingGovId: false,
    hasExistingAddressProof: false,
  });

  const locked = kycStatus === "APPROVED" || kycStatus === "REJECTED";
  const canResubmit = !locked;
  const hasExistingGovId = Boolean(existingDocs.govIdUrl);

  const canContinue = useMemo(() => {
    if (step < 3) return true;
    return Boolean(form.govIdFile) || hasExistingGovId;
  }, [form.govIdFile, step, hasExistingGovId]);

  async function prefill() {
    setPrefilling(true);
    try {
      const res = await fetch("/api/kyc", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return;

      const kyc = (data as { kyc?: any }).kyc ?? null;
      const contact = (data as { contact?: any }).contact ?? null;

      setKycStatus(kyc?.status ?? "PENDING");
      if (kyc) {
        setExistingDocs({
          govIdUrl: kyc.govIdUrl ?? null,
          addressProofUrl: kyc.addressProofUrl ?? null,
          cacUrl: kyc.cacUrl ?? null,
        });
      }

      setForm((p) => ({
        ...p,
        phone: contact?.phone ?? p.phone,
        personalAddress: contact?.personalAddress ?? kyc?.address ?? p.personalAddress,
        personalCity: contact?.personalCity ?? p.personalCity,
        personalCountry: contact?.personalCountry ?? p.personalCountry,
        businessName: kyc?.businessName ?? p.businessName,
        businessAddress: kyc?.businessAddress ?? p.businessAddress,
        businessCity: kyc?.businessCity ?? p.businessCity,
        businessState: kyc?.businessState ?? p.businessState,
        businessWebsite: kyc?.businessWebsite ?? p.businessWebsite,
        businessEmail: kyc?.businessEmail ?? p.businessEmail,
        socialHandle: kyc?.socialHandle ?? p.socialHandle,
        cacNumber: kyc?.cacNumber ?? p.cacNumber,
        govIdType: kyc?.govIdType ?? p.govIdType,
        hasExistingGovId: Boolean(kyc?.govIdUrl),
        hasExistingAddressProof: Boolean(kyc?.addressProofUrl),
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
      if (addressProofPreviewUrl) URL.revokeObjectURL(addressProofPreviewUrl);
      if (cacPreviewUrl) URL.revokeObjectURL(cacPreviewUrl);
    };
  }, [govIdPreviewUrl, addressProofPreviewUrl, cacPreviewUrl]);

  async function submit() {
    if (!form.govIdFile && !hasExistingGovId) return;
    if (!canResubmit) return;
    setLoading(true);
    setError("");
    try {
      await submitKyc({ ...form, hasExistingGovId });
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

  const kycHeader = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-900">Account verification</p>
          <p className="mt-1 text-sm text-slate-600">One step per screen. Smooth, focused, and secure.</p>
        </div>
        <Badge tone={kycStatus === "APPROVED" ? "emerald" : kycStatus === "SUBMITTED" ? "amber" : kycStatus === "INVALID_INFO" ? "amber" : kycStatus === "REJECTED" ? "rose" : "slate"}>
          {prefilling ? "Loading…" : kycStatus === "SUBMITTED" ? "Under review" : kycStatus === "INVALID_INFO" ? "Update needed" : kycStatus === "APPROVED" ? "Approved" : kycStatus === "REJECTED" ? "Declined" : `Step ${step + 1}/4`}
        </Badge>
      </div>

      <div className="mt-5 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-slate-900" : "bg-slate-200"}`} />
        ))}
      </div>
    </>
  );

  const kycFooter = (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
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
  );

  return (
    <>
      <div className="mx-auto w-full max-w-3xl">
        <ScrollableStepShell scrollResetKey={step} header={kycHeader} footer={kycFooter}>
          <div className="pb-1 pt-5">
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
              <h2 className="text-xl font-bold text-slate-900">Contact & business</h2>
              <p className="text-sm text-slate-600">Optional details help us verify faster. Only your government ID is required to submit.</p>
              <input
                className={inputClass}
                placeholder="Phone / WhatsApp (optional)"
                value={form.phone}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="Residential address (optional)"
                value={form.personalAddress}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, personalAddress: e.target.value }))}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="City (optional)"
                  value={form.personalCity}
                  disabled={locked}
                  onChange={(e) => setForm((p) => ({ ...p, personalCity: e.target.value }))}
                />
                <input
                  className={inputClass}
                  placeholder="Country (optional)"
                  value={form.personalCountry ?? ""}
                  disabled={locked}
                  onChange={(e) => setForm((p) => ({ ...p, personalCountry: e.target.value }))}
                />
              </div>
              <input
                className={inputClass}
                placeholder="Business name (optional)"
                value={form.businessName}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="Business city (optional)"
                  value={form.businessCity}
                  disabled={locked}
                  onChange={(e) => setForm((p) => ({ ...p, businessCity: e.target.value }))}
                />
                <input
                  className={inputClass}
                  placeholder="Business state (optional)"
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
              <p className="text-sm text-slate-600">Optional — add if you have a registered business location.</p>
              <textarea
                className={`${inputClass} min-h-28`}
                placeholder="Street address, landmark, area (optional)"
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
                Upload a valid government ID (required). Proof of address and CAC are optional. PNG, JPEG, or PDF only.
              </p>
              <p className="text-xs text-slate-500">Max size: {MAX_UPLOAD_MB}MB per file. Uploads are private.</p>

              <input
                className={inputClass}
                placeholder="ID type (optional) — NIN, driver's license, passport…"
                value={form.govIdType ?? ""}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, govIdType: e.target.value }))}
              />

              <KycDocumentField
                label="Government ID"
                disabled={locked}
                file={form.govIdFile}
                existingUrl={existingDocs.govIdUrl}
                onViewExisting={(url) => setDocModal({ title: "Government ID", url })}
                onError={(msg) => toast.error(msg)}
                hint="Required — PNG, JPEG, or PDF"
                onFileChange={(file) => {
                  if (govIdPreviewUrl) URL.revokeObjectURL(govIdPreviewUrl);
                  const nextPreview =
                    file && (file.type.startsWith("image/") || file.type === "application/pdf")
                      ? URL.createObjectURL(file)
                      : null;
                  setGovIdPreviewUrl(nextPreview);
                  setForm((p) => ({ ...p, govIdFile: file }));
                }}
              />
              {govIdPreviewUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {form.govIdFile?.type === "application/pdf" ? (
                    <iframe title="Selected ID preview" src={govIdPreviewUrl} className="h-64 w-full" />
                  ) : (
                    <img src={govIdPreviewUrl} alt="Selected ID preview" className="max-h-64 w-full object-contain" />
                  )}
                </div>
              ) : null}

              <KycDocumentField
                label="Proof of address"
                optional
                disabled={locked}
                file={form.addressProofFile ?? null}
                existingUrl={existingDocs.addressProofUrl}
                onViewExisting={(url) => setDocModal({ title: "Proof of address", url })}
                onError={(msg) => toast.error(msg)}
                hint="Utility bill, bank statement, etc."
                onFileChange={(file) => {
                  if (addressProofPreviewUrl) URL.revokeObjectURL(addressProofPreviewUrl);
                  const nextPreview =
                    file && (file.type.startsWith("image/") || file.type === "application/pdf")
                      ? URL.createObjectURL(file)
                      : null;
                  setAddressProofPreviewUrl(nextPreview);
                  setForm((p) => ({ ...p, addressProofFile: file }));
                }}
              />
              {addressProofPreviewUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {form.addressProofFile?.type === "application/pdf" ? (
                    <iframe title="Address proof preview" src={addressProofPreviewUrl} className="h-64 w-full" />
                  ) : (
                    <img src={addressProofPreviewUrl} alt="Address proof preview" className="max-h-64 w-full object-contain" />
                  )}
                </div>
              ) : null}

              <input
                className={inputClass}
                placeholder="CAC number (optional)"
                value={form.cacNumber ?? ""}
                disabled={locked}
                onChange={(e) => setForm((p) => ({ ...p, cacNumber: e.target.value }))}
              />

              <KycDocumentField
                label="CAC document"
                optional
                disabled={locked}
                file={form.cacFile ?? null}
                existingUrl={existingDocs.cacUrl}
                onViewExisting={(url) => setDocModal({ title: "CAC document", url })}
                onError={(msg) => toast.error(msg)}
                onFileChange={(file) => {
                  if (cacPreviewUrl) URL.revokeObjectURL(cacPreviewUrl);
                  const nextPreview =
                    file && (file.type.startsWith("image/") || file.type === "application/pdf")
                      ? URL.createObjectURL(file)
                      : null;
                  setCacPreviewUrl(nextPreview);
                  setForm((p) => ({ ...p, cacFile: file }));
                }}
              />
              {cacPreviewUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {form.cacFile?.type === "application/pdf" ? (
                    <iframe title="Selected CAC preview" src={cacPreviewUrl} className="h-64 w-full" />
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
          </div>
        </ScrollableStepShell>
      </div>

      <DocumentPreviewModal
        open={docModal !== null}
        title={docModal?.title ?? "Document"}
        url={docModal?.url ?? ""}
        onClose={() => setDocModal(null)}
      />
    </>
  );
}
