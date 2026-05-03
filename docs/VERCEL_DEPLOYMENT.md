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

Copy your production connection string as `DATABASE_URL`.

### Blob storage (optional but recommended)
- Enable **Vercel Blob**
- Create a read/write token and use it as `BLOB_READ_WRITE_TOKEN`

## 2) Add env vars in Vercel project

Set these in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL`
- `NEXTAUTH_SECRET` (long random string)
- `NEXTAUTH_URL` (your production domain, e.g. `https://your-domain.com`)
- `ADMIN_EMAILS` (comma-separated admin emails allowed into `/admin`)
- `BLOB_READ_WRITE_TOKEN` (if using KYC file uploads)

## 3) Prisma migrate for production

Run migrations against production database before/with first deploy:

```bash
npx prisma migrate deploy
```

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
