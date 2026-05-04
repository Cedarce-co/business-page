/* Cedarce PWA service worker.
 * Strategies:
 *   - Precache the offline shell on install (offline page + key static assets).
 *   - Network-first for navigations, with timeout fallback to /offline.
 *   - Cache-first for immutable Next static chunks (/_next/static/*).
 *   - Stale-while-revalidate for other same-origin GET requests (logos, icons, manifest).
 *   - Bypass non-GET, cross-origin, /api/*, /uploads/*, /dashboard/*, /admin/* requests.
 */
const VERSION = "v3";
const SHELL_CACHE = `cedarce-shell-${VERSION}`;
const RUNTIME_CACHE = `cedarce-runtime-${VERSION}`;
const NAVIGATION_TIMEOUT_MS = 3000;

const SHELL_ASSETS = [
  "/offline",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-icon.png",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
  "/pwa-icon-maskable-512.png",
  "/og-image.png",
  "/logo%20trans.png",
  "/logo%20mobile.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.all(
        SHELL_ASSETS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "reload" });
            if (res && res.ok) await cache.put(url, res.clone());
          } catch {
            /* ignore individual asset failures so install still completes */
          }
        })
      );
    })()
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

const isBypass = (url) =>
  url.pathname.startsWith("/api/") ||
  url.pathname.startsWith("/uploads/") ||
  url.pathname.startsWith("/dashboard") ||
  url.pathname.startsWith("/admin") ||
  url.pathname.startsWith("/signin") ||
  url.pathname.startsWith("/signup");

const networkWithTimeout = (request, timeoutMs) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), timeoutMs);
    fetch(request).then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });

const handleNavigation = async (event) => {
  try {
    const fresh = await networkWithTimeout(event.request, NAVIGATION_TIMEOUT_MS);
    return fresh;
  } catch {
    const cache = await caches.open(SHELL_CACHE);
    const offline = await cache.match("/offline");
    if (offline) return offline;
    return new Response("You are offline.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
};

const handleStaticAsset = async (event) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(event.request);
  if (cached) return cached;
  try {
    const fresh = await fetch(event.request);
    if (fresh && fresh.ok) cache.put(event.request, fresh.clone());
    return fresh;
  } catch {
    return cached || Response.error();
  }
};

const handleRuntime = async (event) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(event.request);
  const networkPromise = fetch(event.request)
    .then((res) => {
      if (res && res.ok && res.type === "basic") {
        cache.put(event.request, res.clone());
      }
      return res;
    })
    .catch(() => cached);
  return cached || networkPromise;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (isBypass(url)) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(event));
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(handleStaticAsset(event));
    return;
  }

  event.respondWith(handleRuntime(event));
});
