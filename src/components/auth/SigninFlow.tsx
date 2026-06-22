"use client";

import { useMemo, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import PasswordInput from "@/components/ui/PasswordInput";

const baseInput =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

export default function SigninFlow() {
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
    try {
      const result = await signIn("credentials", { email, password, redirect: false });

      if (!result?.ok) {
        const msg = "Invalid email or password.";
        setError(msg);
        toast.error(msg);
        return;
      }

      await getSession();
      toast.success("Signed in successfully.");
      window.location.assign("/dashboard");
    } catch {
      const msg = "Could not sign in. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
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
      <PasswordInput
        className={baseInput}
        toggleClassName="text-slate-400 hover:text-slate-700"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="-mt-1 flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="inline-flex items-center rounded-lg px-2 py-1 text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <div className="mt-6 mb-10 flex items-center justify-center gap-3">
      <button className="w-full rounded-xl bg-slate-900 px-5 py-2.5 text-base font-semibold text-white disabled:opacity-50 sm:w-1/2 hover:bg-slate-800"
        onClick={submit}
        disabled={!canSubmit || loading}
        type="button"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <CircleLoader size={18} className="text-white" />
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </button>

      </div>
      <p className="text-sm text-slate-600">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-slate-900 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
