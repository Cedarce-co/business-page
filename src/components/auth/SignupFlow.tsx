"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { markSessionStarted } from "@/lib/auth/session-tracking";
import Link from "next/link";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import PasswordInput from "@/components/ui/PasswordInput";
import { signupUser, checkEmailAvailable } from "@/features/auth/client";
import type { SignupInput } from "@/features/auth/types";

const baseInput =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

const emptyForm: SignupInput = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  city: "",
  country: "",
};

export default function SignupFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<SignupInput>(emptyForm);

  const canContinue = useMemo(() => {
    if (step === 0) return form.name.trim().length >= 2;
    if (step === 1) return /\S+@\S+\.\S+/.test(form.email);
    if (step === 2) {
      const phone = form.phone?.trim() ?? "";
      return phone.length >= 7 && (form.city?.trim().length ?? 0) >= 2 && (form.address?.trim().length ?? 0) >= 3;
    }
    return form.password.length >= 8;
  }, [form, step]);

  async function goNext() {
    if (step === 1) {
      setLoading(true);
      setError("");
      try {
        const { available } = await checkEmailAvailable(form.email);
        if (!available) {
          const msg = "An account with this email already exists. Sign in instead.";
          setError(msg);
          toast.error(msg);
          return;
        }
      } catch {
        const msg = "Could not verify this email. Try again.";
        setError(msg);
        toast.error(msg);
        return;
      } finally {
        setLoading(false);
      }
    }
    setStep((s) => s + 1);
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      await signupUser(form);

      const login = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (login?.error) throw new Error("Signup worked but login failed.");
      markSessionStarted("user");
      toast.success("Account created. Welcome aboard.");
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not create account.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-7 flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-slate-900" : "bg-slate-200"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {step === 0 ? (
            <>
              <p className="text-sm text-slate-600">Step 1 of 4</p>
              <input
                className={baseInput}
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </>
          ) : null}

          {step === 1 ? (
            <>
              <p className="text-sm text-slate-600">Step 2 of 4: Email address</p>
              <input
                className={baseInput}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value.toLowerCase() }))}
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <p className="text-sm text-slate-600">Step 3 of 4: Contact details</p>
              <input
                className={baseInput}
                placeholder="Phone / WhatsApp"
                value={form.phone ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
              <input
                className={baseInput}
                placeholder="City"
                value={form.city ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              />
              <input
                className={baseInput}
                placeholder="Address"
                value={form.address ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              />
              <input
                className={baseInput}
                placeholder="Country (optional)"
                value={form.country ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
              />
            </>
          ) : null}

          {step === 3 ? (
            <>
              <p className="text-sm text-slate-600">Step 4 of 4: Create a password</p>
              <PasswordInput
                className={baseInput}
                toggleClassName="text-slate-400 hover:text-slate-700"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              />
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      <div className="mt-6 mb-10 flex items-center justify-center gap-3">
        {step > 0 ? (
          <button
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 sm:w-1/2"
            onClick={() => setStep((s) => s - 1)}
            type="button"
          >
            Back
          </button>
        ) : null}
        {step < 3 ? (
          <button
            className="w-full rounded-xl bg-slate-900 px-5 py-2.5 text-base font-semibold text-white disabled:opacity-50 hover:bg-slate-800 sm:w-1/2"
            disabled={!canContinue || loading}
            onClick={goNext}
            type="button"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <CircleLoader size={18} className="text-white" />
                Checking...
              </span>
            ) : (
              "Next"
            )}
          </button>
        ) : (
          <button
            className="w-full rounded-xl bg-slate-900 px-5 py-2.5 text-base font-semibold text-white disabled:opacity-50 hover:bg-slate-800 sm:w-1/2"
            disabled={!canContinue || loading}
            onClick={submit}
            type="button"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <CircleLoader size={18} className="text-white" />
                Creating...
              </span>
            ) : (
              "Create account"
            )}
          </button>
        )}
      </div>

      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-slate-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
