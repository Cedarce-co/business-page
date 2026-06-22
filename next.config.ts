import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      [
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "https://*.tawk.to",
        "https://cdn.jsdelivr.net",
        "https://va.vercel-scripts.com",
      ].join(" "),
      [
        "style-src 'self' 'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://*.tawk.to",
        "https://cdn.jsdelivr.net",
      ].join(" "),
      [
        "img-src 'self' data: blob: https:",
        "https://*.tawk.to",
        "https://cdn.jsdelivr.net",
        "https://tawk.link",
        "https://s3.amazonaws.com",
      ].join(" "),
      ["font-src 'self' data:", "https://fonts.gstatic.com", "https://*.tawk.to"].join(" "),
      [
        "connect-src 'self'",
        "https://vitals.vercel-insights.com",
        "https://va.vercel-scripts.com",
        "https://*.tawk.to",
        "wss://*.tawk.to",
      ].join(" "),
      ["frame-src 'self'", "https://*.tawk.to"].join(" "),
      ["form-action 'self'", "https://*.tawk.to"].join(" "),
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
