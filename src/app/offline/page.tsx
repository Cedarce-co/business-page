"use client";

import Image from "next/image";
import Link from "next/link";
import { LOGO_DARK_BG } from "@/lib/brand-logos";
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
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 80% 20%, rgba(201,168,106,0.12), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 80%, rgba(255,255,255,0.04), transparent 50%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center text-center">
        <Link href="/" aria-label="Home" className="mb-8 inline-flex items-center">
          <Image
            src={LOGO_DARK_BG.desktop}
            alt="Cedarce"
            width={1011}
            height={247}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
            online
              ? "border-cedar-accent/40 bg-cedar-accentSoft text-cedar-accent"
              : "border-white/15 bg-zinc-950 text-cedar-mist"
          }`}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-red-500"}`}
            aria-hidden
          />
          {online ? "Connection restored" : "You are offline"}
        </span>

        <h1 className="mt-6 font-display text-3xl leading-tight tracking-tight text-cedar-ivory sm:text-4xl">
          {online ? "Welcome back online." : "No internet right now."}
        </h1>

        <p className="mt-4 max-w-sm text-base leading-relaxed text-cedar-mist">
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
