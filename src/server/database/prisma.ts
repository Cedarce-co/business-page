import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Lazy singleton so importing this module never throws (e.g. during
// `next build` page-data collection where DATABASE_URL may be absent).
// The real client is only constructed on first actual use, at which point
// a missing DATABASE_URL surfaces a clear runtime error.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const LOCAL_HOST = /(?:@|\/\/)(?:localhost|127\.0\.0\.1)(?:[:/]|$)/i;

/**
 * pg-connection-string warns when sslmode is require/prefer/verify-ca because
 * those modes currently map to verify-full. Set verify-full explicitly.
 */
export function normalizeDatabaseUrl(connectionString: string): string {
  const trimmed = connectionString.trim();
  if (LOCAL_HOST.test(trimmed) || /sslmode=disable/i.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const mode = url.searchParams.get("sslmode");
    if (!mode || mode === "require" || mode === "prefer" || mode === "verify-ca") {
      url.searchParams.set("sslmode", "verify-full");
    }
    return url.toString();
  } catch {
    if (/sslmode=(require|prefer|verify-ca)/i.test(trimmed)) {
      return trimmed.replace(/sslmode=(require|prefer|verify-ca)/i, "sslmode=verify-full");
    }
    const sep = trimmed.includes("?") ? "&" : "?";
    return `${trimmed}${sep}sslmode=verify-full`;
  }
}

/** Remote hosts (Render, Neon, Supabase, etc.) require TLS from Vercel/serverless. */
function poolSsl(connectionString: string): false | { rejectUnauthorized: boolean } {
  if (LOCAL_HOST.test(connectionString)) return false;
  if (/sslmode=disable/i.test(connectionString)) return false;
  // Render and some managed Postgres providers use certs that fail strict CA checks.
  return { rejectUnauthorized: false };
}

function createPrismaClient(): PrismaClient {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) {
    throw new Error("Missing DATABASE_URL. Set it in your environment.");
  }

  const connectionString = normalizeDatabaseUrl(raw);
  const pool = new Pool({
    connectionString,
    ssl: poolSsl(connectionString),
    max: 5,
  });

  return new PrismaClient({
    adapter: new PrismaPg(pool),
  });
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
