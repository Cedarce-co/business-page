"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";

const baseInput =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-300 focus:border-cyan-300";

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

export default function SigninFlow() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(
    () => emailLooksValid(email) && password.length > 0 && !loading,
    [email, password, loading],
  );

  async function submit() {
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      const msg = "Invalid email or password.";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("Signed in successfully.");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div  className="space-y-4">
      <input
        className={baseInput}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />
      <input
        className={baseInput}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="-mt-1 flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="inline-flex items-center rounded-lg bg-white/5 px-2 py-1 text-sm font-semibold !text-cyan-200 ring-1 ring-white/10 transition hover:bg-white/10 hover:!text-white"
        >
          Forgot password?
        </Link>
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <div className="mt-6 mb-10 flex items-center justify-center gap-3">
      <button className="w-full rounded-xl bg-white px-5 py-2.5 text-base font-semibold text-slate-900 disabled:opacity-50 sm:w-1/2"
        onClick={submit}
        disabled={!canSubmit || loading}
        type="button"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <CircleLoader size={18} className="text-slate-950" />
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </button>

      </div>
      <p className="text-sm text-slate-300">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-cyan-300 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
