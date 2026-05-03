"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import CircleLoader from "@/components/ui/CircleLoader";

const baseInput =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-300 focus:border-cyan-300";

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => emailLooksValid(email) && password.length > 0 && !loading, [email, password, loading]);

  async function submit() {
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
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
      <input
        className={baseInput}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-6 mb-10 flex items-center justify-center gap-3"> 
      <button
        className="mx-auto w-full rounded-xl bg-cyan-300 px-4 py-3 text-base font-semibold text-slate-950 disabled:opacity-50 sm:w-1/2"
        onClick={submit}
        disabled={!canSubmit}
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
    </div>
  );
}

