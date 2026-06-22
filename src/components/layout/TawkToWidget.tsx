"use client";

import { useEffect } from "react";
import { initTawkEmbed } from "@/lib/tawk";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";

export default function TawkToWidget() {
  useEffect(() => {
    if (!hasAnalyticsConsent()) return;

    initTawkEmbed();

    const onConsent = () => {
      if (hasAnalyticsConsent()) initTawkEmbed();
    };
    window.addEventListener("cedarce:cookie-consent", onConsent);
    return () => window.removeEventListener("cedarce:cookie-consent", onConsent);
  }, []);

  return null;
}
