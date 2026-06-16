#!/usr/bin/env node
/**
 * Render / production start: validate DATABASE_URL, run migrations, then Next.js.
 */
import { execSync } from "node:child_process";

const LOCAL_HOST = /(?:@|\/\/)(?:localhost|127\.0\.0\.1)(?:[:/]|$)/i;
const onRender = process.env.RENDER === "true";

function pickDatabaseUrl() {
  for (const key of ["DATABASE_URL", "DATABASE_INTERNAL_URL"]) {
    const url = process.env[key]?.trim();
    if (url && !LOCAL_HOST.test(url)) return url;
  }
  return process.env.DATABASE_URL?.trim() ?? "";
}

const databaseUrl = pickDatabaseUrl();

if (onRender && (!databaseUrl || LOCAL_HOST.test(databaseUrl))) {
  const current = process.env.DATABASE_URL?.trim() || "(not set)";
  console.error(`
╔══════════════════════════════════════════════════════════════════╗
║  Render: DATABASE_URL is wrong — app cannot start                ║
╚══════════════════════════════════════════════════════════════════╝

Current DATABASE_URL on this service:
  ${current}

That is a LOCAL development URL. Render servers cannot connect to localhost.

── Fix (takes ~2 minutes) ──────────────────────────────────────────

1. Open https://dashboard.render.com
2. Click your WEB SERVICE (not the database)
3. Go to "Environment" in the left sidebar
4. Find DATABASE_URL — if the value contains "localhost", click the trash
   icon to DELETE it completely
5. Click "Add Environment Variable" → "Add from database"
   → select your Postgres database
   OR open your Postgres service → Connect → copy "Internal Database URL"
   and paste it as DATABASE_URL (host must be dpg-....render.com)
6. Click "Save Changes" — Render will redeploy automatically

Do NOT paste postgresql://postgres:postgres@localhost:5432/cedarce on Render.

If you host the website on Vercel, you only need Render for Postgres:
set DATABASE_URL on Vercel to the Postgres EXTERNAL URL instead.
`);
  process.exit(1);
}

if (databaseUrl && !LOCAL_HOST.test(databaseUrl)) {
  process.env.DATABASE_URL = databaseUrl;
  console.log("Running prisma migrate deploy...");
  execSync("npx prisma migrate deploy", { stdio: "inherit", env: process.env });
} else if (!onRender) {
  console.log("Skipping prisma migrate deploy (no remote DATABASE_URL).");
}

console.log("Starting Next.js...");
execSync("npx next start", { stdio: "inherit" });
