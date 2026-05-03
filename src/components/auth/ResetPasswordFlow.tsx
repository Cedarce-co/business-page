"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import { resetPassword } from "@/features/password-reset/client";

const baseInput =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-300 focus:border-cyan-300";

export default function ResetPasswordFlow({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return password.length >= 8 && confirm === password && !loading;
  }, [password, confirm, loading]);

  async function submit() {
    setLoading(true);
    try {
      await resetPassword({ token, password });
      toast.success("Password reset successful. Please sign in.");
      router.push("/signin");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not reset password.");
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
      <input
        className={baseInput}
        type="password"
        placeholder="New password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className={baseInput}
        type="password"
        placeholder="Confirm new password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
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
            Resetting...
          </span>
        ) : (
          "Reset password"
        )}
      </button>

      <p className="text-sm text-slate-300">
        Back to{" "}
        <Link href="/signin" className="font-semibold text-cyan-300 hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

