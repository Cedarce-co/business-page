"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Resets window scroll on route change (App Router does not always restore top). */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView();
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
