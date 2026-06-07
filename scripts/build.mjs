import { execSync } from "node:child_process";

const url = process.env.DATABASE_URL?.trim() ?? "";
const isLocalDb = /(?:@|\/\/)(?:localhost|127\.0\.0\.1)(?:[:/]|$)/i.test(url);
const canMigrate = url.length > 0 && !isLocalDb;

if (canMigrate) {
  console.log("Running prisma migrate deploy (DATABASE_URL is set)...");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
} else {
  console.log(
    "Skipping prisma migrate deploy during build (DATABASE_URL missing or localhost). Migrations run at `npm start` on Render.",
  );
}

console.log("Running next build...");
execSync("npx next build", { stdio: "inherit" });
