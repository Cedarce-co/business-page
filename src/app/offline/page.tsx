"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-cliq-white px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(15,23,42,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#111122_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center text-center">
        <Link href="/" aria-label="Home" className="mb-8 inline-flex items-center">
          <Image
            src="/logo%20trans.png"
            alt="Cedarce"
            width={320}
            height={96}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <span className="inline-flex items-center gap-2 rounded-full border border-cliq-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-cliq-text-body shadow-card">
          <span
            className={
              "inline-block h-2 w-2 rounded-full " +
              (online ? "bg-emerald-500" : "bg-red-500")
            }
            aria-hidden
          />
          {online ? "Connection restored" : "You are offline"}
        </span>

        <h1 className="mt-5 text-3xl font-black leading-tight text-cliq-text-heading sm:text-4xl">
          {online ? "Back online." : "No internet connection."}
        </h1>

        <p className="mt-3 text-base text-cliq-text-body">
          {online
            ? "Reload the page to continue where you left off."
            : "Check your Wi-Fi or mobile data, then try again. Anything you've already opened in the app is still available."}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center justify-center rounded-xl bg-cliq-navy-800 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-cliq-navy-900"
          >
            {online ? "Reload page" : "Try again"}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border-2 border-cliq-gray-300 bg-white px-6 py-3 text-base font-bold text-cliq-navy-900 transition hover:bg-cliq-gray-100"
          >
            Go home
          </Link>
        </div>

        <p className="mt-8 text-xs text-cliq-text-muted">
          Cedarce — Business websites, payments &amp; automation
        </p>
      </div>
    </section>
  );
}
