"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateProfile, uploadProfilePhoto } from "@/features/profile/client";
import type { ProfileState } from "@/features/profile/types";
import { ActionButton } from "@/components/dashboard/ui";
import { FormField, Input } from "@/components/ui/FormField";

function normalizeProfile(p: ProfileState): ProfileState {
  return {
    name: p.name.trim(),
    image: (p.image ?? "").trim(),
    phone: p.phone.trim(),
    address: p.address.trim(),
    city: p.city.trim(),
    country: p.country.trim(),
  };
}

function profilesEqual(a: ProfileState, b: ProfileState) {
  const x = normalizeProfile(a);
  const y = normalizeProfile(b);
  return (
    x.name === y.name &&
    x.image === y.image &&
    x.phone === y.phone &&
    x.address === y.address &&
    x.city === y.city &&
    x.country === y.country
  );
}

export default function ProfileForm({ initial }: { initial: ProfileState }) {
  const router = useRouter();
  const [form, setForm] = useState<ProfileState>(initial);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const baselineRef = useRef<ProfileState>(initial);

  const isDirty = useMemo(() => {
    return !profilesEqual(form, baselineRef.current) || photoFile !== null;
  }, [form, photoFile]);

  const canSubmit = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const phone = form.phone.trim();
    const phoneOk = phone.length === 0 || (phone.length >= 7 && phone.length <= 20);
    return isDirty && nameOk && phoneOk;
  }, [form.name, form.phone, isDirty]);

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      let imageUrl = form.image;
      if (photoFile) {
        const uploaded = await uploadProfilePhoto(photoFile);
        imageUrl = uploaded.url;
      }
      const next: ProfileState = { ...form, image: imageUrl };
      await updateProfile(next);
      setForm(next);
      setPhotoFile(null);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      baselineRef.current = next;
      setMessage("Profile updated.");
      toast.success("Profile updated.");
      router.refresh();
      window.dispatchEvent(new Event("app:profile-updated"));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not save profile.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl border-t border-slate-200 pt-8">
        <div className="mb-6 flex flex-col gap-1">
          <p className="text-sm font-semibold text-slate-900">Account details</p>
          <p className="text-sm text-slate-600">
            These settings help us contact you and personalize your workspace. Verification is handled separately.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Full name" htmlFor="profile-name" className="md:col-span-1">
            <Input
              id="profile-name"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </FormField>
          <div className="border-l border-slate-200 bg-slate-50/50 p-4 md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Profile photo</p>
            <p className="mt-1 text-xs text-slate-500">Upload a JPG or PNG. This replaces your current photo.</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="" className="h-full w-full object-cover" />
                ) : form.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-cliq-navy-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-cliq-navy-800"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setPhotoFile(file);
                  if (photoPreview) URL.revokeObjectURL(photoPreview);
                  setPhotoPreview(file ? URL.createObjectURL(file) : null);
                }}
              />
            </div>
          </div>
          <FormField label="Phone" htmlFor="profile-phone">
            <Input
              id="profile-phone"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            />
          </FormField>
          <FormField label="Country" htmlFor="profile-country">
            <Input
              id="profile-country"
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
            />
          </FormField>
          <FormField label="City" htmlFor="profile-city">
            <Input
              id="profile-city"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            />
          </FormField>
          <FormField label="Address" htmlFor="profile-address">
            <Input
              id="profile-address"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            />
          </FormField>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
        {message ? (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-emerald-700">
            {message}
          </motion.p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Save changes to update your profile across the portal.</p>
          <ActionButton variant="primary" onClick={save} loading={saving} disabled={!canSubmit}>
            Save changes
          </ActionButton>
        </div>
    </div>
  );
}
