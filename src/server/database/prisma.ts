import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Lazy singleton so importing this module never throws (e.g. during
// `next build` page-data collection where DATABASE_URL may be absent).
// The real client is only constructed on first actual use, at which point
// a missing DATABASE_URL surfaces a clear runtime error.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Remote hosts (Render, Neon, Supabase, etc.) require TLS from Vercel/serverless. */
function poolSsl(connectionString: string): false | { rejectUnauthorized: boolean } {
  if (/localhost|127\.0\.0\.1/.test(connectionString)) return false;
  if (/sslmode=disable/i.test(connectionString)) return false;
  return { rejectUnauthorized: false };
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL. Set it in your environment.");
  }

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
