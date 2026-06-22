"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isTawkConfigured, openTawkChat } from "@/lib/tawk";

const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

/** Staff admin console — customer chat widget not shown here. */
const HIDDEN_PREFIXES = ["/admin", "/offline"];

/**
 * Native Tawk.to widget — always available for visitors and signed-in clients.
 * Not tied to cookie consent; the banner is informational only.
 */
export default function TawkToWidget() {
  const pathname = usePathname() ?? "/";
  const hidden = HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const configured = isTawkConfigured() && propertyId && widgetId;

  useEffect(() => {
    const openChat = () => {
      if (isTawkConfigured()) {
        openTawkChat();
        return;
      }
      window.location.href = "/contact";
    };
    window.addEventListener("open-live-chat", openChat);
    return () => window.removeEventListener("open-live-chat", openChat);
  }, []);

  if (hidden || !configured) return null;

  return (
    <>
      <Script id="tawk-api-bootstrap" strategy="afterInteractive">
        {`window.Tawk_API=window.Tawk_API||{};window.Tawk_LoadStart=new Date();`}
      </Script>
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
        charSet="UTF-8"
        crossOrigin="anonymous"
      />
    </>
  );
}
