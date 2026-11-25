"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { getCalendlyUrl, isCalendlyConfigured } from "@/lib/calendly";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (document.querySelector('script[data-calendly="true"]')) {
    return new Promise((resolve) => {
      const check = () => {
        if (window.Calendly) resolve();
        else setTimeout(check, 40);
      };
      check();
    });
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.dataset.calendly = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Calendly."));
    document.head.appendChild(script);
  });
}

export default function CalendlyBookButton({
  label = "Book a consultation",
  className,
  variant = "primary",
}: {
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "teal" | "onBlue";
}) {
  const [ready, setReady] = useState(false);
  const url = getCalendlyUrl();

  useEffect(() => {
    if (!isCalendlyConfigured()) return;
    loadCalendlyScript()
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, []);

  if (!url) return null;

  const styles =
    variant === "onBlue"
      ? "glass-blue text-white hover:bg-white/20"
      : variant === "secondary"
        ? "border border-line bg-white text-brand-800 shadow-soft hover:border-brand-200 hover:bg-brand-50"
        : "btn-sheen bg-g-button text-white shadow-glow-sm hover:shadow-glow";

  function open() {
    if (ready && window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5",
        styles,
        className,
      )}
    >
      <Calendar className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
