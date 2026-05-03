"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import { requestPasswordReset } from "@/features/password-reset/client";

const baseInput =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-300 focus:border-cyan-300";

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
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-slate-200">
          <p className="text-sm font-semibold">Check your inbox</p>
          <p className="mt-1 text-sm text-slate-300">
            Kindly check your inbox for a reset link sent to <span className="font-semibold text-white">{email}</span>.
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
            className="mx-auto w-full rounded-xl bg-cyan-300 px-4 py-3 text-base font-semibold text-slate-950 disabled:opacity-50 sm:w-1/2"
            onClick={submit}
            disabled={!canSubmit}
            type="button"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <CircleLoader size={18} className="text-slate-950" />
                Sending...
              </span>
            ) : (
              "Send reset link"
            )}
          </button>
        </>
      )}

      <p className="text-sm text-slate-300">
        Remembered it?{" "}
        <Link href="/signin" className="font-semibold text-cyan-300 hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

