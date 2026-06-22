"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import PasswordInput from "@/components/ui/PasswordInput";
import CircleLoader from "@/components/ui/CircleLoader";

const baseInput =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

export default function AdminJoinClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState("");

  const canSubmit = useMemo(
    () => password.length >= 8 && password === confirm && !loading && Boolean(token),
    [password, confirm, loading, token],
  );

  useEffect(() => {
    if (!token) {
      setError("Missing invite link. Ask your super admin to resend the invitation.");
      setValidating(false);
      return;
    }

    void (async () => {
      const res = await fetch(`/api/admin/invites/validate?token=${encodeURIComponent(token)}`);
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "This invite link is invalid or has expired.");
        setValidating(false);
        return;
      }
      setName(data.name ?? "");
      setEmail(data.email ?? "");
      setValidating(false);
    })();
  }, [token]);

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/invites/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Could not create your admin account.");
        return;
      }

      const signInResult = await signIn("admin-credentials", {
        email,
        password,
        setupOnly: "1",
        redirect: false,
      });

      if (signInResult?.error) {
        toast.success("Account created. Sign in at the admin login page.");
        router.push("/admin");
        return;
      }

      toast.success("Welcome! Set up Google Authenticator to continue.");
      router.push("/admin/mfa-setup");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (validating) {
    return <p className="text-sm text-slate-600">Checking your invite…</p>;
  }

  if (error && !email) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">{name}</p>
        <p>{email}</p>
      </div>

      <PasswordInput
        className={baseInput}
        placeholder="Create password (min. 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordInput
        className={baseInput}
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <button
        type="button"
        disabled={!canSubmit}
        onClick={submit}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <CircleLoader size={18} className="text-white" />
            Creating account…
          </span>
        ) : (
          "Create password & continue"
        )}
      </button>
    </div>
  );
}
