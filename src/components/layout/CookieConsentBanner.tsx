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
          className="pointer-events-none fixed bottom-5 left-1/2 z-50 w-[min(92vw,30rem)] -translate-x-1/2 sm:w-[min(88vw,32rem)] lg:w-[min(34rem,90vw)]"
          initial={cookieBannerMotion.initial}
          animate={cookieBannerMotion.animate}
          exit={cookieBannerMotion.exit}
          transition={cookieBannerMotion.transition}
        >
          <div className="pointer-events-auto relative rounded-xl bg-white/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(15,23,42,0.14)] backdrop-blur-sm sm:px-4 sm:py-3">
            <h2 className="text-xs font-bold text-slate-900 sm:text-sm">Cookies policy</h2>

            <div className="mt-1.5 flex flex-col gap-2">
              <p className="text-[11px] leading-snug text-slate-600 sm:text-xs">
                Essential cookies run sign-in and the portal. Live chat is always available. Optional cookies help us
                understand site use.{" "}
                <Link href="/privacy#cookies" className="font-semibold text-slate-900 underline-offset-2 hover:underline">
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
                  className="rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 sm:px-3 sm:text-xs"
                >
                  Decline cookies
                </button>
                <button
                  type="button"
                  onClick={() => {
                    writeCookieConsent("accepted");
                    setVisible(false);
                  }}
                  className="rounded-md bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-700 sm:px-3 sm:text-xs"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
