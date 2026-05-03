import { defineConfig, env } from "prisma/config";
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

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
