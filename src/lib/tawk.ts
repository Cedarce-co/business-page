declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
      onLoad?: () => void;
    };
    Tawk_LoadStart?: Date;
    __tawkConsolePatched?: boolean;
  }
}

let lastOpenAttempt = 0;

const OPEN_DEBOUNCE_MS = 500;

export function isTawkConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID && process.env.NEXT_PUBLIC_TAWK_WIDGET_ID
  );
}

function suppressTawkDevConsoleNoise() {
  if (process.env.NODE_ENV !== "development") return;
  if (window.__tawkConsolePatched) return;
  window.__tawkConsolePatched = true;

  const original = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    if (args.length === 1 && args[0] === true) return;
    original(...args);
  };
}

/** Legacy helper — prefer <TawkToWidget /> Script tags. Kept for programmatic open. */
export function initTawkEmbed() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
  if (!isTawkConfigured() || !propertyId || !widgetId) return;
  if (document.getElementById("tawk-to-script")) return;

  suppressTawkDevConsoleNoise();

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const script = document.createElement("script");
  script.id = "tawk-to-script";
  script.async = true;
  script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "anonymous");

  document.body.appendChild(script);
}

export function openTawkChat() {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  if (now - lastOpenAttempt < OPEN_DEBOUNCE_MS) return true;
  lastOpenAttempt = now;

  if (!document.getElementById("tawk-to-script") && isTawkConfigured()) {
    initTawkEmbed();
  }

  const api = window.Tawk_API;
  if (!api?.maximize) {
    if (api) {
      const previous = api.onLoad;
      api.onLoad = () => {
        previous?.();
        try {
          window.Tawk_API?.maximize?.();
        } catch {
          // ignore
        }
      };
    }
    return false;
  }

  try {
    api.maximize();
    return true;
  } catch {
    return false;
  }
}
