"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sticky mobile conversion bar — home + marketing (not auth/contact). */
export default function MobileStickyCta() {
  const pathname = usePathname() ?? "";
  if (["/contact", "/signup", "/signin", "/forgot-password", "/reset-password", "/request-service", "/dashboard", "/admin", "/offline"].some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href="/signup"
          className="motion-safe:animate-breathe flex min-h-12 flex-1 items-center justify-center rounded-lg bg-cedar-accent text-sm font-semibold text-black motion-safe:hover:[animation-play-state:paused]"
        >
          Get started
        </Link>
        <Link
          href="/contact"
          className="motion-safe:animate-breathe-soft flex min-h-12 flex-1 items-center justify-center rounded-lg border border-white/20 text-sm font-semibold text-cedar-ivory motion-safe:hover:[animation-play-state:paused]"
        >
          Book consult
        </Link>
      </div>
    </div>
  );
}
