"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  dismissCookieBannerForSession,
  shouldShowCookieBanner,
  writeCookieConsent,
} from "@/lib/cookie-consent";

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

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-bold text-slate-900">Cookies on Cedarce</p>
          <p className="text-sm leading-relaxed text-slate-600">
            We use essential cookies to keep you signed in and run the client portal. With your permission we also use
            optional cookies for live chat and to understand how the site is used. See our{" "}
            <Link href="/privacy#cookies" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              writeCookieConsent("declined");
              setVisible(false);
            }}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Decline optional
          </button>
          <button
            type="button"
            onClick={() => {
              dismissCookieBannerForSession();
              setVisible(false);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              writeCookieConsent("accepted");
              setVisible(false);
            }}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
