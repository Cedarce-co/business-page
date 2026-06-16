# Render Deployment Guide

## Why the build failed

The build log showed Prisma connecting to `localhost:5432`. That means **`DATABASE_URL` was missing or pointed at localhost** during `prisma migrate deploy`.

On Render, the web service must use the **External Database URL** from your Render Postgres instance — not `localhost`.

## Fix in Render dashboard

1. Open your **Render Postgres** service → **Connect** → copy the **External Database URL**
2. Open your **Web Service** → **Environment**
3. Set **`DATABASE_URL`** to that External URL (append `?sslmode=verify-full` if there is no query string)
4. Or use **Environment → Link database** so Render injects `DATABASE_URL` automatically
5. **Redeploy**

If you linked a database but still see localhost, delete any manual `DATABASE_URL` override that uses `localhost`.

## Build vs migrate

| Platform | Build | Migrations |
|----------|-------|------------|
| **Vercel** | `npm run build` → `next build` | Run `npm run db:migrate` manually, or add to Vercel Build Command |
| **Render** | `npm run build` → `next build` | `npm start` → `prisma migrate deploy && next start` |

Render **Build Command** should be:

```bash
npm install && npm run build
```

**Start Command**:

```bash
npm start
```

## Required environment variables

- `DATABASE_URL` — Render Postgres External URL (linked or pasted)
- `NEXTAUTH_SECRET` — long random string
- `NEXTAUTH_URL` — your Render URL, e.g. `https://your-app.onrender.com`
- `ADMIN_EMAILS` — comma-separated admin emails

Optional (file uploads on Vercel use Blob; on Render use the same if you deploy the API there):

- `BLOB_READ_WRITE_TOKEN` or Vercel Blob OIDC vars if using `@vercel/blob`

## Blueprint (optional)

A starter [`render.yaml`](../render.yaml) is included. Adjust service/database names and env vars before using **New → Blueprint**.

## SSL note

The app normalizes `sslmode=require` to `verify-full` at runtime. Render Postgres works with SSL enabled on the connection string.
