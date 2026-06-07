import { defineConfig } from "prisma/config";
import fs from "node:fs";
import path from "node:path";

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
// Prefer .env.local if present
loadDotEnv(".env.local", { override: true });

const PLACEHOLDER_DATABASE_URL =
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

function isMigrateCommand(): boolean {
  const args = process.argv.join(" ");
  return args.includes("migrate");
}

function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL?.trim();

  if (!url) {
    if (isMigrateCommand()) {
      throw new Error(
        "DATABASE_URL is not set. For Render: link your Postgres database to the web service (Environment → Link database), or set DATABASE_URL to the External Database URL — not localhost.",
      );
    }
    return PLACEHOLDER_DATABASE_URL;
  }

  if (isMigrateCommand() && /(?:@|\/\/)(?:localhost|127\.0\.0\.1)(?:[:/]|$)/i.test(url)) {
    throw new Error(
      `DATABASE_URL points to localhost (${url}). On Render production, use the External Database URL from your Render Postgres dashboard (Host must not be localhost).`,
    );
  }

  return url;
}

// `prisma generate` doesn't need a real DB connection, but Prisma's strict
// `env()` helper throws at config-load time if the variable is missing
// (which happens on CI like Netlify where .env files aren't checked in).
// Fall back to a placeholder so `generate` can run; migrate/start require a real URL.
const databaseUrl = resolveDatabaseUrl();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
