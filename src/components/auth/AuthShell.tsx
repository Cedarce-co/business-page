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
  const showAuthWayfinding = ["/signin", "/signup", "/admin"].includes(pathname);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.18),transparent_35%),linear-gradient(180deg,#050816_0%,#090b1a_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#8da2f8_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute left-4 top-4 z-20 sm:left-8 sm:top-8">
        <Link
          href="/"
          aria-label="Back to website"
          title="Back to website"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 focus:ring-offset-2 focus:ring-offset-[#050816] sm:h-14 sm:w-14"
        >
          <Home className="h-6 w-6 sm:h-7 sm:w-7" />
        </Link>
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10"
        >
          {showAuthWayfinding ? (
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
              <WayfindingStrip zone="auth" />
            </div>
          ) : null}
          <div className="mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Account</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              {subtitle}
            </p>
          </div>
          <div className="mt-10">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
