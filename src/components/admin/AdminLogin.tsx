"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import PasswordInput from "@/components/ui/PasswordInput";
import { formatRecoveryCodeInput } from "@/lib/mfa-recovery-download";
import { markSessionStarted } from "@/lib/auth/session-tracking";

const baseInput =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

type Step = "credentials" | "totp";

export default function AdminLogin({ notice }: { notice?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [step, setStep] = useState<Step>("credentials");
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmitCredentials = useMemo(
    () => emailLooksValid(email) && password.length > 0 && !loading,
    [email, password, loading],
  );
  const canSubmitTotp = useMemo(() => {
    if (loading) return false;
    if (useRecoveryCode) return totpCode.replace(/[\s-]/g, "").length >= 8;
    return totpCode.trim().length >= 6;
  }, [totpCode, loading, useRecoveryCode]);

  async function submitCredentials() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login-precheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => null)) as { step?: string } | null;

      if (!res.ok || data?.step === "complete") {
        toast.error("Invalid admin credentials.");
        return;
      }

      if (data?.step === "mfa_setup") {
        const result = await signIn("admin-credentials", {
          email,
          password,
          setupOnly: "1",
          redirect: false,
        });
        if (result?.error) {
          toast.error("Could not start admin session.");
          return;
        }
        toast("Set up Google Authenticator to continue.");
        router.push("/admin/mfa-setup");
        router.refresh();
        return;
      }

      if (data?.step === "totp") {
        setStep("totp");
        setUseRecoveryCode(false);
        toast("Enter your authenticator code.");
        return;
      }

      toast.error("Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  }

  async function submitTotp() {
    setLoading(true);
    const result = await signIn("admin-credentials", {
      email,
      password,
      totpCode: useRecoveryCode ? undefined : totpCode.trim(),
      recoveryCode: useRecoveryCode ? totpCode.trim() : undefined,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      toast.error(useRecoveryCode ? "Invalid recovery code." : "Invalid authentication code.");
      return;
    }

    toast.success("Welcome, admin.");
    markSessionStarted("admin");
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {notice === "admin-mfa-exists" ? (
        <p className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
          Authenticator is already set up for this admin account. Use the same Google Authenticator entry on any
          device and enter the sign-in code below.
        </p>
      ) : null}
      {step === "credentials" ? (
        <>
          <input
            className={baseInput}
            type="email"
            placeholder="Admin email"
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
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {useRecoveryCode
              ? "Enter one of your saved recovery codes. Each code works once."
              : "Admin accounts require an authenticator code on every sign-in."}
          </p>
          <input
            className={baseInput}
            inputMode={useRecoveryCode ? "text" : "numeric"}
            autoComplete="one-time-code"
            placeholder={useRecoveryCode ? "Recovery code (XXXX-XXXX)" : "Authentication code"}
            value={totpCode}
            onChange={(e) =>
              setTotpCode(
                useRecoveryCode
                  ? formatRecoveryCodeInput(e.target.value)
                  : e.target.value.replace(/\D/g, "").slice(0, 6),
              )
            }
          />
          <button
            type="button"
            className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
            onClick={() => {
              setUseRecoveryCode((current) => !current);
              setTotpCode("");
            }}
          >
            {useRecoveryCode ? "Use authenticator code instead" : "Use a recovery code instead"}
          </button>
          <button
            type="button"
            className="block text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
            onClick={() => {
              setStep("credentials");
              setTotpCode("");
              setUseRecoveryCode(false);
            }}
          >
            Back
          </button>
        </>
      )}

      <div className="mt-6 mb-10 flex items-center justify-center gap-3">
        <button
          className="mx-auto w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-semibold text-white hover:bg-slate-800 disabled:opacity-50 sm:w-1/2"
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
    </div>
  );
}
