import { defineConfig } from "prisma/config";
import fs from "node:fs";
import path from "node:path";

const LOCAL_HOST = /(?:@|\/\/)(?:localhost|127\.0\.0\.1)(?:[:/]|$)/i;
const ON_RENDER = process.env.RENDER === "true";
const ON_VERCEL = process.env.VERCEL === "1";

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

// On Render/Vercel, only use platform-injected env — never override with repo .env files.
if (!ON_RENDER && !ON_VERCEL) {
  loadDotEnv(".env", { override: false });
  loadDotEnv(".env.local", { override: true });
}

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

function pickDatabaseUrl(): string | undefined {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.DATABASE_INTERNAL_URL,
    process.env.RENDER_DATABASE_URL,
  ];

  for (const raw of candidates) {
    const url = raw?.trim();
    if (url && !LOCAL_HOST.test(url)) return url;
  }

  return process.env.DATABASE_URL?.trim();
}

function localhostRenderHelp(url: string): string {
  return [
    `DATABASE_URL points to localhost (${url}). That is a local dev URL and cannot work on Render.`,
    "",
    "Fix in the Render dashboard:",
    "1. Web Service → Environment → delete any DATABASE_URL containing localhost",
    "2. Postgres → Connect → copy the Internal Database URL (host looks like dpg-xxxxx-a, not localhost)",
    "3. Either paste that as DATABASE_URL, or use Environment → Link Resource → select your Postgres database",
    "4. Save and redeploy",
  ].join("\n");
}

function resolveDatabaseUrl(): string {
  const url = pickDatabaseUrl();

  if (!url) {
    if (isMigrateCommand()) {
      const hint = ON_RENDER
        ? " On Render: link your Postgres database to this web service or set DATABASE_URL to the Internal Database URL."
        : "";
      throw new Error(`DATABASE_URL is not set.${hint}`);
    }
    return PLACEHOLDER_DATABASE_URL;
  }

  if (isMigrateCommand() && LOCAL_HOST.test(url)) {
    throw new Error(ON_RENDER ? localhostRenderHelp(url) : "DATABASE_URL points to localhost. Use your host's production database URL.");
  }

  return normalizeForPrismaCli(url);
}

const databaseUrl = resolveDatabaseUrl();
if (pickDatabaseUrl()) {
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
