"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import { AUTH_PANEL_IMAGE } from "@/lib/marketing-images";

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
    <section className="relative min-h-screen bg-black pb-[calc(var(--site-mobile-tab-height)+0.75rem)] lg:pb-0">
      <div className="absolute left-4 top-4 z-20 sm:left-8 sm:top-8">
        <Link
          href="/"
          aria-label="Back to website"
          title="Back to website"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-cedar-ivory backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cedar-accent/40 sm:h-14 sm:w-14"
        >
          <Home className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl lg:grid-cols-2">
        <div className="relative hidden overflow-hidden border-r border-white/10 lg:block">
          <Image
            src={AUTH_PANEL_IMAGE.src}
            alt={AUTH_PANEL_IMAGE.alt}
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
          <div className="relative flex h-full flex-col justify-end px-12 pb-16 pt-28">
            <p className="font-display text-6xl leading-none text-cedar-ivory">Cedarce</p>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/75">
              A premium workspace for business setup, delivery tracking, and verified service requests.
            </p>
            <ul className="mt-10 space-y-3 text-sm text-white/70">
              <li className="flex gap-2">
                <span className="text-cedar-accent">✓</span> Website, payments, email & automation
              </li>
              <li className="flex gap-2">
                <span className="text-cedar-accent">✓</span> Track delivery in one portal
              </li>
              <li className="flex gap-2">
                <span className="text-cedar-accent">✓</span> Human-led setup, not DIY guesswork
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center px-4 py-16 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg"
          >
            {showAuthWayfinding ? (
              <div className="mb-8 border border-white/10 bg-white/[0.03] px-3 py-3 sm:px-4">
                <WayfindingStrip zone="auth" tone="onDark" />
              </div>
            ) : null}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">Account</p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-cedar-ivory md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-cedar-mist md:text-base">{subtitle}</p>
            </div>
            <div className="mt-10">{children}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
