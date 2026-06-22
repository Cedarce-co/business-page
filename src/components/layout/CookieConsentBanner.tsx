"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  dismissCookieBannerForSession,
  shouldShowCookieBanner,
  writeCookieConsent,
} from "@/lib/cookie-consent";
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
          className="pointer-events-none fixed bottom-5 left-[58%] z-[70] w-[min(96vw,36rem)] -translate-x-1/2 sm:left-[60%] sm:w-[min(88vw,40rem)] lg:left-[64%] lg:w-[min(48vw,42rem)]"
          initial={cookieBannerMotion.initial}
          animate={cookieBannerMotion.animate}
          exit={cookieBannerMotion.exit}
          transition={cookieBannerMotion.transition}
        >
          <div className="pointer-events-auto relative rounded-xl bg-white/95 px-3 py-2.5 pr-9 shadow-[0_12px_40px_rgba(15,23,42,0.14)] backdrop-blur-sm sm:px-4 sm:py-3 sm:pr-10">
            <button
              type="button"
              onClick={() => {
                dismissCookieBannerForSession();
                setVisible(false);
              }}
              className="absolute right-2 top-2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close cookie notice"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <h2 className="pr-6 text-xs font-bold text-slate-900 sm:text-sm">Cookies policy</h2>

            <div className="mt-1.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="min-w-0 flex-1 text-[11px] leading-snug text-slate-600 sm:text-xs">
                Essential cookies run sign-in and the portal. Live chat is always available. Optional cookies help us
                understand site use.{" "}
                <Link href="/privacy#cookies" className="font-semibold text-slate-900 underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </p>
              <div className="flex shrink-0 items-center justify-end gap-1.5 sm:justify-start">
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
