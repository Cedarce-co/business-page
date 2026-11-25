"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import BrandLogo from "@/components/ui/BrandLogo";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";

const EASE = [0.22, 1, 0.36, 1] as const;

const perks = [
  "Website, payments, email & automation",
  "Track delivery in one portal",
  "Human-led setup, not DIY guesswork",
];

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const pathname = usePathname() ?? "";
  const showAuthWayfinding = ["/signin", "/signup", "/admin", "/forgot-password", "/reset-password"].some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  return (
    <section className="relative min-h-screen bg-white pb-[calc(var(--site-mobile-tab-height)+0.75rem)] lg:pb-0">
      <div className="mx-auto grid min-h-screen w-full max-w-[1400px] gap-6 p-2 sm:p-3 lg:grid-cols-[1fr_1fr]">
        {/* Form column */}
        <div className="flex flex-col px-3 pb-10 pt-4 sm:px-8 lg:px-12 lg:py-8">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Back to website" className="inline-flex">
              <BrandLogo height={30} />
            </Link>
          </div>

          <div className="flex flex-1 items-center py-10">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mx-auto w-full max-w-md"
            >
              {showAuthWayfinding ? (
                <div className="mb-8">
                  <WayfindingStrip zone="auth" />
                </div>
              ) : null}
              <AnimatedHeadline
                as="h1"
                immediate
                text={title}
                className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-brand-950 md:text-5xl"
              />
              <p className="mt-4 text-[15px] leading-relaxed text-slate-500 md:text-base">{subtitle}</p>
              <div className="mt-10">{children}</div>
            </motion.div>
          </div>
        </div>

        {/* Brand panel */}
        <div className="relative hidden lg:block">
          <div className="sticky top-3 h-[calc(100vh-1.5rem)] overflow-hidden rounded-[2.5rem] bg-hero-blue">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-line-grid-light [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_25%,transparent_80%)]" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-3xl"
              animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex h-full flex-col justify-between p-12">
              <BrandLogo height={36} tone="white" />

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                className="mx-auto w-full max-w-sm rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-lift"
              >
                <div className="flex items-center gap-3">
                  <span className="btn-sheen flex h-11 w-11 items-center justify-center rounded-2xl bg-g-button text-white shadow-glow-sm">
                    <ShieldCheck className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-950">Verified workspace</p>
                    <p className="text-xs text-slate-500">Secure sign-in with MFA</p>
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  {[78, 56, 64].map((w, i) => (
                    <motion.span
                      key={i}
                      className="block h-2 rounded-full bg-brand-100"
                      initial={{ width: 0 }}
                      animate={{ width: `${w}%` }}
                      transition={{ delay: 0.8 + i * 0.12, duration: 0.8, ease: EASE }}
                    />
                  ))}
                </div>
              </motion.div>

              <div>
                <p className="max-w-md font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white xl:text-5xl">
                  Your business setup, <span className="text-gradient-light">in one place.</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {perks.map((perk, i) => (
                    <motion.li
                      key={perk}
                      initial={reduced ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: EASE }}
                      className="flex items-center gap-3 text-[15px] text-brand-50"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full glass-blue">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {perk}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
