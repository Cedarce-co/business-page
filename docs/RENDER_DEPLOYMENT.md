# Render Deployment Guide

## Error: `DATABASE_URL points to localhost`

If you see:

```text
DATABASE_URL points to localhost (postgresql://postgres:postgres@localhost:5432/cedarce)
```

Your **web service** has a **local development** database URL in its environment. Render cannot reach `localhost` — that only works on your machine.

### Fix (Render dashboard)

1. Open your **Web Service** (not Postgres) → **Environment**
2. **Delete** any `DATABASE_URL` that contains `localhost` or `127.0.0.1`
3. Open your **Postgres** service → **Connect** → copy the **Internal Database URL**  
   (hostname should look like `dpg-xxxxx-a.oregon-postgres.render.com`, **not** `localhost`)
4. Either:
   - **Link the database:** Environment → **Link Resource** → select your Postgres, **or**
   - **Paste manually:** add `DATABASE_URL` = Internal Database URL
5. **Save** and **Redeploy**

> On Render, the web service and Postgres in the same account should use the **Internal** URL. The External URL is for tools outside Render (e.g. your laptop, Vercel).

---

## Build vs migrate

| Platform | Build | Migrations |
|----------|-------|------------|
| **Render** | `npm run build` → `next build` | `npm start` → `prisma migrate deploy && next start` |
| **Vercel** | `npm run build` → `next build` | Run `npm run db:migrate` separately |

Render **Build Command**:

```bash
npm install && npm run build
```

**Start Command**:

```bash
npm start
```

## Required environment variables

- `DATABASE_URL` — Render Postgres **Internal** URL (from Link Resource or Connect tab)
- `NEXTAUTH_SECRET` — long random string
- `NEXTAUTH_URL` — your Render URL, e.g. `https://your-app.onrender.com`
- `ADMIN_EMAILS` — comma-separated admin emails

## Blueprint (optional)

A starter [`render.yaml`](../render.yaml) links `DATABASE_URL` from a Postgres database automatically. If you created the web service manually, link the database in the dashboard instead.

## SSL

The app uses `sslmode=require` for Prisma migrations. Render Postgres works with SSL on the connection string.
