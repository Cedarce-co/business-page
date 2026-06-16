import { defineConfig } from "prisma/config";
import fs from "node:fs";
import path from "node:path";

const LOCAL_HOST = /(?:@|\/\/)(?:localhost|127\.0\.0\.1)(?:[:/]|$)/i;

function loadDotEnv(filename: string, { override }: { override: boolean }) {
  try {
    const fullPath = path.join(process.cwd(), filename);
    if (!fs.existsSync(fullPath)) return;
    const raw = fs.readFileSync(fullPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (override || !process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore
  }
}

loadDotEnv(".env", { override: false });
loadDotEnv(".env.local", { override: true });

const PLACEHOLDER_DATABASE_URL =
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

function isMigrateCommand(): boolean {
  return process.argv.join(" ").includes("migrate");
}

/** Prisma CLI (migrate) — use sslmode=require for Render/Neon; verify-full often fails in CI. */
function normalizeForPrismaCli(connectionString: string): string {
  const trimmed = connectionString.trim();
  if (LOCAL_HOST.test(trimmed) || /sslmode=disable/i.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const mode = url.searchParams.get("sslmode");
    if (!mode || mode === "verify-full" || mode === "verify-ca" || mode === "prefer") {
      url.searchParams.set("sslmode", "require");
    }
    return url.toString();
  } catch {
    if (/sslmode=(verify-full|verify-ca|prefer)/i.test(trimmed)) {
      return trimmed.replace(/sslmode=(verify-full|verify-ca|prefer)/i, "sslmode=require");
    }
    const sep = trimmed.includes("?") ? "&" : "?";
    return `${trimmed}${sep}sslmode=require`;
  }
}

function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL?.trim();

  if (!url) {
    if (isMigrateCommand()) {
      throw new Error(
        "DATABASE_URL is not set. Link your Postgres database or set DATABASE_URL to the External Database URL — not localhost.",
      );
    }
    return PLACEHOLDER_DATABASE_URL;
  }

  if (isMigrateCommand() && LOCAL_HOST.test(url)) {
    throw new Error(
      "DATABASE_URL points to localhost. Use your host's External Database URL (Render, Neon, Supabase, etc.).",
    );
  }

  return normalizeForPrismaCli(url);
}

const databaseUrl = resolveDatabaseUrl();
if (process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = databaseUrl;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
