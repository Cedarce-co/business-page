"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";
import PasswordInput from "@/components/ui/PasswordInput";

const baseInput =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => emailLooksValid(email) && password.length > 0 && !loading, [email, password, loading]);

  async function submit() {
    setLoading(true);
    const result = await signIn("admin-credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      toast.error("Invalid admin credentials.");
      return;
    }

    toast.success("Welcome, admin.");
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="space-y-4">
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
      <div className="mt-6 mb-10 flex items-center justify-center gap-3"> 
      <button
        className="mx-auto w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-semibold text-white hover:bg-slate-800 disabled:opacity-50 sm:w-1/2"
        onClick={submit}
        disabled={!canSubmit}
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
    </div>
  );
}

