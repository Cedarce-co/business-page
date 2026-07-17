"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import { requestPasswordReset } from "@/features/password-reset/client";

const baseInput =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-cedar-ivory outline-none placeholder:text-white/35 focus:border-cedar-accent/50 focus:ring-2 focus:ring-cedar-accent/20";

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

export default function ForgotPasswordFlow() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const canSubmit = useMemo(() => emailLooksValid(email) && !loading, [email, loading]);

  async function submit() {
    setLoading(true);
    try {
      await requestPasswordReset({ email });
      setSent(true);
      toast.success("If that email exists, we sent a reset link.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {sent ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <p className="text-sm font-semibold text-cedar-ivory">Check your inbox</p>
          <p className="mt-1 text-sm">
            Kindly check your inbox for a reset link sent to <span className="font-semibold text-cedar-ivory">{email}</span>.
          </p>
        </div>
      ) : (
        <>
          <input
            className={baseInput}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <button
            className="mx-auto w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-semibold text-white hover:brightness-110 disabled:opacity-50 sm:w-1/2"
            onClick={submit}
            disabled={!canSubmit}
            type="button"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <CircleLoader size={18} className="text-white" />
                Sending...
              </span>
            ) : (
              "Send reset link"
            )}
          </button>
        </>
      )}

      <p className="text-sm text-cedar-mist">
        Remembered it?{" "}
        <Link href="/signin" className="font-semibold text-cedar-accent hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

