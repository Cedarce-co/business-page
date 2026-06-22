import { headers } from "next/headers";

export type RequestMeta = {
  ipAddress: string | null;
  userAgent: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
};

function firstHeader(value: string | null) {
  if (!value) return null;
  const trimmed = value.split(",")[0]?.trim();
  return trimmed || null;
}

/** Best-effort geo + client metadata from reverse-proxy headers (Vercel, Cloudflare, etc.). */
export async function getRequestMeta(): Promise<RequestMeta> {
  const h = await headers();

  const ipAddress =
    firstHeader(h.get("x-forwarded-for")) ??
    firstHeader(h.get("x-real-ip")) ??
    firstHeader(h.get("cf-connecting-ip")) ??
    null;

  const userAgent = h.get("user-agent");

  const countryCode =
    h.get("x-vercel-ip-country") ??
    h.get("cf-ipcountry") ??
    h.get("x-country-code") ??
    null;

  const country =
    h.get("x-vercel-ip-country-name") ??
    h.get("x-country-name") ??
    countryCode;

  const city = h.get("x-vercel-ip-city") ?? h.get("x-city") ?? null;
  const region = h.get("x-vercel-ip-country-region") ?? h.get("x-region") ?? null;

  return {
    ipAddress,
    userAgent,
    country,
    countryCode,
    city,
    region,
  };
}

export function getRequestMetaFromRequest(request: Request): RequestMeta {
  const ipAddress =
    firstHeader(request.headers.get("x-forwarded-for")) ??
    firstHeader(request.headers.get("x-real-ip")) ??
    firstHeader(request.headers.get("cf-connecting-ip")) ??
    null;

  const userAgent = request.headers.get("user-agent");
  const countryCode =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code");
  const country =
    request.headers.get("x-vercel-ip-country-name") ??
    request.headers.get("x-country-name") ??
    countryCode;
  const city = request.headers.get("x-vercel-ip-city") ?? request.headers.get("x-city");
  const region =
    request.headers.get("x-vercel-ip-country-region") ?? request.headers.get("x-region");

  return {
    ipAddress,
    userAgent,
    country,
    countryCode,
    city,
    region,
  };
}
