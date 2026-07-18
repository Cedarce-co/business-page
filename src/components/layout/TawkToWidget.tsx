"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { isTawkConfigured, openTawkChat, patchTawkDevConsole } from "@/lib/tawk";

const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

/** Staff admin console. Customer chat widget not shown here. */
const HIDDEN_PREFIXES = ["/admin", "/offline"];

const MOBILE_MQ = "(max-width: 1023px)";

/** Pin Tawk bubble bottom-right, above the mobile tab bar. */
function pinTawkBubble() {
  if (typeof window === "undefined") return;

  const mobile = window.matchMedia(MOBILE_MQ).matches;
  const bottom = mobile
    ? "calc(var(--site-mobile-tab-height, 3.25rem) + 1.5rem)"
    : "20px";
  const side = mobile ? "12px" : "16px";

  const reposition = (el: HTMLElement | null) => {
    if (!el) return;
    const style = el.style;
    style.setProperty("left", "auto", "important");
    style.setProperty("right", side, "important");
    style.setProperty("bottom", bottom, "important");
    style.setProperty("top", "auto", "important");
  };

  // Find the Tawk iframe(s) directly and move their fixed-positioned ancestor.
  const iframes = Array.from(document.querySelectorAll<HTMLIFrameElement>("iframe")).filter((f) => {
    const src = f.getAttribute("src") ?? "";
    const title = (f.getAttribute("title") ?? "").toLowerCase();
    return src.includes("tawk.to") || title.includes("chat");
  });

  for (const iframe of iframes) {
    // The minimized bubble iframe is small; skip the large open chat window.
    const isBubble = iframe.offsetWidth <= 160 && iframe.offsetHeight <= 160;
    if (!isBubble) continue;

    // Walk up to the outermost fixed-position ancestor and move it.
    let node: HTMLElement | null = iframe;
    let target: HTMLElement | null = iframe;
    while (node && node !== document.body) {
      if (window.getComputedStyle(node).position === "fixed") {
        target = node;
      }
      node = node.parentElement;
    }
    reposition(target);
    reposition(iframe);
  }

  // Fallback: known container ids/classes
  document
    .querySelectorAll<HTMLElement>(
      "#tawkchat-minified-container, .tawk-min-container, #tawkchat-container",
    )
    .forEach((el) => {
      if (el.offsetWidth <= 160 && el.offsetHeight <= 160) {
        reposition(el);
      }
    });
}

/**
 * Native Tawk.to widget. Always available for visitors and signed-in clients.
 * Not tied to cookie consent; the banner is informational only.
 */
export default function TawkToWidget() {
  const pathname = usePathname() ?? "/";
  const hidden = HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const configured = isTawkConfigured() && propertyId && widgetId;

  useEffect(() => {
    patchTawkDevConsole();
  }, []);

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

  useEffect(() => {
    if (hidden || !configured) return;

    if (window.matchMedia(MOBILE_MQ).matches) {
      window.Tawk_API?.hideWidget?.();
    }
    pinTawkBubble();
    const interval = window.setInterval(pinTawkBubble, 800);
    const observer = new MutationObserver(() => pinTawkBubble());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener("resize", pinTawkBubble);

    const api = window.Tawk_API;
    if (api) {
      const prev = api.onLoad;
      api.onLoad = () => {
        prev?.();
        pinTawkBubble();
      };
    }

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
      window.removeEventListener("resize", pinTawkBubble);
    };
  }, [hidden, configured, pathname]);

  if (hidden || !configured) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          window.Tawk_API?.showWidget?.();
          openTawkChat();
        }}
        aria-label="Open live chat"
        className="fixed right-3 z-[60] flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[#1f3a5f] text-white shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition active:scale-95 lg:hidden"
        style={{
          bottom: "calc(var(--site-mobile-tab-height, 3.25rem) + 1.5rem)",
        }}
      >
        <MessageCircle className="h-7 w-7 fill-white" aria-hidden />
      </button>
      <Script id="tawk-api-bootstrap" strategy="afterInteractive">
        {`(function(){if(typeof window!=="undefined"&&!window.__tawkConsolePatched){window.__tawkConsolePatched=true;var _e=console.error.bind(console);console.error=function(){if(arguments.length===1&&arguments[0]===true)return;_e.apply(console,arguments);};}window.Tawk_API=window.Tawk_API||{};var hideMobile=function(){if(window.matchMedia("(max-width: 1023px)").matches){window.Tawk_API.hideWidget&&window.Tawk_API.hideWidget();}};window.Tawk_API.onLoad=hideMobile;window.Tawk_API.onChatMinimized=hideMobile;window.Tawk_API.onChatHidden=hideMobile;window.Tawk_API.customStyle={visibility:{desktop:{position:"br",xOffset:16,yOffset:20},mobile:{position:"br",xOffset:12,yOffset:84}}};window.Tawk_LoadStart=new Date();})();`}
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
