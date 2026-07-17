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
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-70" />
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center text-center">
        <Link href="/" aria-label="Home" className="mb-8 inline-flex items-center">
          <Image
            src={LOGO_DARK_BG.desktop}
            alt="Cedarce"
            width={1011}
            height={247}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <span className="inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 text-xs font-semibold text-cedar-mist">
          <span
            className={`inline-block h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-red-500"}`}
            aria-hidden
          />
          {online ? "Connection restored" : "You are offline"}
        </span>

        <h1 className="mt-5 font-display text-3xl leading-tight text-cedar-ivory sm:text-4xl">
          {online ? "Back online." : "No internet connection."}
        </h1>

        <p className="mt-3 text-base text-cedar-mist">
          {online
            ? "Reload the page to continue where you left off."
            : "Check your Wi-Fi or mobile data, then try again."}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button type="button" variant="accent" onClick={retry} full>
            {online ? "Reload page" : "Try again"}
          </Button>
          <Button href="/" variant="outlineLight" full>
            Go home
          </Button>
        </div>
      </div>
    </section>
  );
}
