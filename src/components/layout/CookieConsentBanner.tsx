"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { shouldShowCookieBanner, writeCookieConsent } from "@/lib/cookie-consent";
import { cookieBannerMotion } from "@/lib/animations";

const HIDDEN_PREFIXES = ["/signin", "/signup", "/dashboard", "/admin", "/offline"];

export default function CookieConsentBanner() {
  const pathname = usePathname() ?? "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
    if (hidden) {
      setVisible(false);
      return;
    }
    setVisible(shouldShowCookieBanner());
  }, [pathname]);

  useEffect(() => {
    const refresh = () => setVisible(shouldShowCookieBanner());
    window.addEventListener("cedarce:cookie-consent", refresh);
    return () => window.removeEventListener("cedarce:cookie-consent", refresh);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="cookie-banner"
          role="dialog"
          aria-label="Cookie consent"
          className="pointer-events-none fixed bottom-[calc(var(--site-mobile-tab-height)+0.75rem)] left-1/2 lg:bottom-5 z-[70] w-[min(92vw,30rem)] -translate-x-1/2 sm:w-[min(88vw,32rem)] lg:w-[min(34rem,90vw)]"
          initial={cookieBannerMotion.initial}
          animate={cookieBannerMotion.animate}
          exit={cookieBannerMotion.exit}
          transition={cookieBannerMotion.transition}
        >
          <div className="pointer-events-auto relative rounded-3xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur-xl sm:px-5 sm:py-4">
            <h2 className="text-xs font-bold text-brand-950 sm:text-sm">We use cookies</h2>

            <div className="mt-1.5 flex flex-col gap-2">
              <p className="text-[11px] leading-snug text-slate-500 sm:text-xs">
                Cookies are small files that keep you signed in. If you agree, we also use them to see how people use
                our site.{" "}
                <Link href="/privacy#cookies" className="font-semibold text-brand-950 underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </p>
              <div className="flex shrink-0 items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    writeCookieConsent("declined");
                    setVisible(false);
                  }}
                  className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-brand-50 sm:px-3.5 sm:text-xs"
                >
                  No, thanks
                </button>
                <button
                  type="button"
                  onClick={() => {
                    writeCookieConsent("accepted");
                    setVisible(false);
                  }}
                  className="rounded-full bg-g-button px-3 py-1.5 text-[11px] font-semibold text-white shadow-glow-sm hover:brightness-110 sm:px-3.5 sm:text-xs"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
