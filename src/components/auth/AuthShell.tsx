"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const showAuthWayfinding = ["/signin", "/signup", "/admin", "/forgot-password", "/reset-password"].some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  return (
    <section className="relative min-h-screen bg-white">
      <div className="absolute left-4 top-4 z-20 sm:left-8 sm:top-8">
        <Link
          href="/"
          aria-label="Back to website"
          title="Back to website"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/20 sm:h-14 sm:w-14"
        >
          <Home className="h-6 w-6 sm:h-7 sm:w-7" />
        </Link>
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          {showAuthWayfinding ? (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4">
              <WayfindingStrip zone="auth" />
            </div>
          ) : null}
          <div className="mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Account</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              {subtitle}
            </p>
          </div>
          <div className="mt-10">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
