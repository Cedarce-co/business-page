"use client";

import { useMemo, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import PasswordInput from "@/components/ui/PasswordInput";
import { markSessionStarted } from "@/lib/auth/session-tracking";

const baseInput =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

type Step = "credentials" | "totp";

export default function SigninFlow() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [step, setStep] = useState<Step>("credentials");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmitCredentials = useMemo(
    () => emailLooksValid(email) && password.length > 0 && !loading,
    [email, password, loading],
  );

  const canSubmitTotp = useMemo(() => totpCode.trim().length >= 6 && !loading, [totpCode, loading]);

  async function completeSignIn(includeTotp: boolean) {
    const result = await signIn("credentials", {
      email,
      password,
      totpCode: includeTotp ? totpCode.trim() : undefined,
      redirect: false,
    });

    if (!result?.ok) {
      const msg = includeTotp ? "Invalid authentication code." : "Invalid email or password.";
      setError(msg);
      toast.error(msg);
      return false;
    }

    await getSession();
    markSessionStarted("user");
    toast.success("Signed in successfully.");
    window.location.assign("/dashboard");
    return true;
  }

  async function submitCredentials() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login-precheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => null)) as { step?: string; error?: string } | null;

      if (!res.ok) {
        const msg = data?.error ?? "Invalid email or password.";
        setError(msg);
        toast.error(msg);
        return;
      }

      if (data?.step === "totp") {
        setStep("totp");
        toast("Enter the 6-digit code from your authenticator app.");
        return;
      }

      await completeSignIn(false);
    } catch {
      const msg = "Could not sign in. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function submitTotp() {
    setLoading(true);
    setError("");
    try {
      await completeSignIn(true);
    } catch {
      const msg = "Could not verify code. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {step === "credentials" ? (
        <>
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
        </>
      ) : (
        <>
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Two-factor authentication is enabled. Enter the 6-digit code from Google Authenticator (or similar).
          </p>
          <input
            className={baseInput}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Authentication code"
            value={totpCode}
            onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
          <button
            type="button"
            className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
            onClick={() => {
              setStep("credentials");
              setTotpCode("");
              setError("");
            }}
          >
            Back to email and password
          </button>
        </>
      )}

      {step === "credentials" ? (
        <div className="-mt-1 flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="inline-flex items-center rounded-lg px-2 py-1 text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      ) : null}

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <div className="mt-6 mb-10 flex items-center justify-center gap-3">
        <button
          className="w-full rounded-xl bg-slate-900 px-5 py-2.5 text-base font-semibold text-white disabled:opacity-50 sm:w-1/2 hover:bg-slate-800"
          onClick={step === "credentials" ? submitCredentials : submitTotp}
          disabled={step === "credentials" ? !canSubmitCredentials : !canSubmitTotp}
          type="button"
        >
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <CircleLoader size={18} className="text-white" />
              {step === "credentials" ? "Signing in..." : "Verifying..."}
            </span>
          ) : step === "credentials" ? (
            "Sign in"
          ) : (
            "Verify and sign in"
          )}
        </button>
      </div>

      {step === "credentials" ? (
        <p className="text-sm text-slate-600">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-slate-900 hover:underline">
            Create an account
          </Link>
        </p>
      ) : null}
    </div>
  );
}
