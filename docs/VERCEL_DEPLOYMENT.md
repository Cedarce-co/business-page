# Vercel Deployment Guide

This app uses:
- Next.js (frontend + backend route handlers)
- NextAuth credentials auth
- Prisma + Postgres
- Optional Vercel Blob for KYC ID uploads

Architecture and folder terminology:
- See `docs/BACKEND_GUIDE.md`

## 1) Create production services

### Database (choose one)
- **Neon Postgres** (recommended)
- **Supabase Postgres**
- **Render Postgres** — use the **External Database URL** from Render → Connect

Copy your production connection string as `DATABASE_URL`. For Render, append SSL if missing:

`postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require`

(Use the **External** Database URL, not an internal hostname. The app normalizes SSL at runtime.)

(After rotating credentials, never paste the live URL in chat or tickets.)

### Blob storage (required on Vercel)
- Enable **Vercel Blob** and connect the store to this project (Storage → Blob)
- Vercel auto-adds **`BLOB_STORE_ID`** (and OIDC via `@vercel/oidc` on deploy)
- If uploads still fail, add **`BLOB_READ_WRITE_TOKEN`** from the Blob store → **Connect** / **Tokens** tab to **Production** env vars
- **`BLOB_WEBHOOK_PUBLIC_KEY`** is only for client presigned uploads; server uploads do not need it

Requires `@vercel/blob` **>= 2.4** for OIDC auth. Local dev: `vercel env pull` or set `BLOB_READ_WRITE_TOKEN`.

## 2) Add env vars in Vercel project

Set these in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL`
- `NEXTAUTH_SECRET` (long random string)
- `NEXTAUTH_URL` (your production domain, e.g. `https://your-domain.com`)
- `ADMIN_EMAILS` (comma-separated admin emails allowed into `/admin`)

Blob (auto-injected when the store is connected to the project):

- `BLOB_STORE_ID`
- `VERCEL_OIDC_TOKEN` (rotated automatically on each deployment)
- `BLOB_WEBHOOK_PUBLIC_KEY` (optional; not used by this app’s server uploads)
- `BLOB_READ_WRITE_TOKEN` (optional; legacy token if not using OIDC)

## 3) Prisma migrate for production

**Vercel:** `npm run build` only runs `next build`. Apply migrations before or after deploy:

```bash
npx prisma migrate deploy
```

Run that locally against production `DATABASE_URL`, or set Vercel **Build Command** to:

```bash
npx prisma migrate deploy && npm run build
```

only if your database accepts connections from Vercel's build network.

**Render:** migrations run automatically on `npm start` (`prisma migrate deploy && next start`).

If you need to create the initial migration locally:

```bash
npx prisma migrate dev --name init_auth_kyc
```

Commit the generated `prisma/migrations` folder.

## 4) Deploy to Vercel

1. Push branch to Git provider.
2. Import repo in Vercel.
3. Confirm env vars are set.
4. Deploy.

## 5) Post-deploy smoke test

1. Sign up a new user.
2. Sign in and confirm dashboard appears.
3. Confirm KYC banner appears on dashboard home.
4. Try Request a Service (should be blocked until KYC approved).
5. Submit KYC flow and verify upload path works.
6. Update profile and confirm data persists.

## 6) Operational note on KYC approval

Current flow sets KYC to `SUBMITTED`. Service requests require `APPROVED`.
You should add an internal admin review flow (or temporary DB admin process)
to mark KYC as `APPROVED` for real users.
