"use client";

import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function OfflinePage() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  const retry = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-white px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 80% 20%, rgba(52,122,213,0.12), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 80%, rgba(255,255,255,0.04), transparent 50%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center text-center">
        <Link href="/" aria-label="Home" className="mb-8 inline-flex items-center">
          <BrandLogo height={48} />
        </Link>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
            online
              ? "border-brand-200 bg-brand-50 text-brand-600"
              : "border-line bg-brand-50/60 text-slate-500"
          }`}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${online ? "bg-brand-500" : "bg-rose-500"}`}
            aria-hidden
          />
          {online ? "Connection restored" : "You are offline"}
        </span>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-brand-950 sm:text-5xl">
          {online ? "Welcome back online." : "No internet right now."}
        </h1>

        <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-500">
          {online
            ? "Reload the page to continue where you left off."
            : "Check your Wi‑Fi or mobile data, then try again."}
        </p>

        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button type="button" variant="accent" onClick={retry} className="min-h-12 w-full px-7 sm:w-auto">
            {online ? "Reload page" : "Try again"}
          </Button>
          <Button href="/" variant="outlineLight" className="min-h-12 w-full px-7 sm:w-auto">
            Go home
          </Button>
        </div>
      </div>
    </section>
  );
}
