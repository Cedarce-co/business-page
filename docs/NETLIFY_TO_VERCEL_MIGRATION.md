# Migration Guide: Netlify to Vercel with Full Backend

This guide covers migrating your app from Netlify (frontend-only) to Vercel (full-stack) including database setup, environment configuration, and domain migration.

---

## Phase 1: Pre-Migration Setup (Before Changing Domain)

### Step 1.1: Create a Vercel Account & Project

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in
3. Click "Add New" → "Project"
4. Import your GitHub/GitLab repository
5. Select the repository with this codebase
6. Configure project settings:
   - Framework: **Next.js**
   - Root Directory: **./** (default is fine)
   - Node version: **20.x** or latest
7. Click "Deploy" (this will fail initially without env vars—that's OK)

### Step 1.2: Create a Production Database

Choose **one** of these free options:

#### Option A: Neon (Recommended)
1. Go to [console.neon.tech](https://console.neon.tech)
2. Sign up with GitHub
3. Create a new project (auto-named, e.g., "main")
4. Go to **Connection string** → **Pooled connection**
5. Select **psycopg3** (for Prisma)
6. Copy the full connection string (looks like: `postgresql://user:password@host/dbname?sslmode=require`)
7. Save this as `DATABASE_URL` (you'll need it in Step 2)

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create a new project
4. Wait for provisioning (~2 min)
5. Go to **Settings** → **Database** → **Connection pooling**
6. Copy **Connection string** (Transaction mode)
7. Replace `[YOUR-PASSWORD]` with your actual password from **Settings** → **Database**
8. Save this as `DATABASE_URL`

#### Option C: Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project → **Provision PostgreSQL**
4. Go to the PostgreSQL service
5. Open **Connect** tab
6. Copy the connection string (DATABASE_URL format)
7. Save as `DATABASE_URL`

---

## Phase 2: Configure Vercel Environment Variables

### Step 2.1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable below (make sure "Production" is selected):

#### Required Variables:

**1. DATABASE_URL**
- Paste the connection string from Step 1.2
- Example: `postgresql://user:password@host/dbname?sslmode=require`

**2. NEXTAUTH_SECRET**
- Generate a secure random string. Run this locally:
  ```bash
  openssl rand -base64 32
  ```
- Paste the output (looks like: `aBcD1234eFgH5678iJkL9012mNoPqRsT==`)

**3. NEXTAUTH_URL**
- For now, use the temporary Vercel domain: `https://your-project.vercel.app`
- You'll update this after domain migration
- Example: `https://cedarce.vercel.app`

**4. ADMIN_EMAILS**
- Comma-separated list of admin emails allowed into `/admin`
- Example: `admin@cedarce.com,owner@cedarce.com`

#### Optional but Recommended:

**5. BLOB_READ_WRITE_TOKEN** (if using KYC file uploads)
- Go to Vercel project → **Storage** → **Blob**
- Click "Create Store" (if not exists)
- Copy the read/write token
- Example: `vercel_blob_rw_abc123xyz...`

**6. RESEND_API_KEY** (for email notifications)
- Go to [resend.com](https://resend.com)
- Sign up → Create API key
- Paste the key (looks like: `re_abc123xyz...`)

**7. RESEND_FROM** (email sender address)
- Example: `noreply@cedarce.com` or `support@cedarce.com`

**8. ADMIN_LOGIN_EMAIL** (special admin account)
- Email for admin-only login (not the regular signup)
- Example: `admin@cedarce.com`

**9. ADMIN_LOGIN_PASSWORD** (admin account password)
- Strong password for admin login
- Example: `SecureAdminPass123!`

After adding all variables, click "Save"

---

## Phase 3: Database Migration & Setup

### Step 3.1: Run Prisma Migrations on Production Database

Do this **before** the first Vercel deployment:

1. Ensure your `DATABASE_URL` environment variable is set locally:
   ```bash
   # Create a .env.local file with:
   # DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

2. Run migrations against production database:
   ```bash
   npx prisma migrate deploy
   ```
   - This applies all existing migrations from `prisma/migrations/`
   - Creates tables, indexes, enums in your production DB

3. Verify migrations completed:
   ```bash
   npx prisma studio
   ```
   - Opens web UI showing your database tables
   - Confirm you see: User, Profile, Kyc, ServiceRequest, ServiceIntake, etc.
   - Close Prisma Studio (Ctrl+C)

### Step 3.2: Create Initial Admin User (Optional)

If you want a test admin account:

1. Open Prisma Studio:
   ```bash
   npx prisma studio
   ```

2. Click on the **User** table

3. Click "Create record" and fill:
   - **id**: (leave blank, auto-generated)
   - **name**: Your Name
   - **email**: your admin email (must match `ADMIN_LOGIN_EMAIL` from env vars)
   - **passwordHash**: (you'll need to generate this—see below)
   - **phone**: (optional)
   - **image**: (leave blank)

4. To generate a password hash, run locally:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourPassword123!', 10))"
   ```
   - Replace `YourPassword123!` with your desired admin password
   - Paste the long hash into **passwordHash**

5. Save and close Prisma Studio

---

## Phase 4: Deploy to Vercel

### Step 4.1: Trigger Vercel Deployment

Option A: Automatic (recommended)
- Push your code to the main branch:
  ```bash
  git add .
  git commit -m "Configure for Vercel deployment"
  git push origin main
  ```
- Vercel automatically deploys on push
- Check deployment status in Vercel dashboard

Option B: Manual
- In Vercel dashboard, click "Deployments" → "Redeploy"
- Select your main branch

### Step 4.2: Wait for Deployment

1. Watch the deployment logs in Vercel dashboard
2. Look for:
   - ✅ Build successful
   - ✅ Environment variables loaded
   - ✅ NextAuth configured
3. Once complete, you'll get a production URL: `https://your-project.vercel.app`

### Step 4.3: Test the Deployed App

1. Open `https://your-project.vercel.app`
2. Try these flows:
   - **Sign up**: Create a new account (should work)
   - **Sign in**: Log in with the account you just created
   - **Dashboard**: Should load user profile & KYC section
   - **Admin**: Try logging in with your admin email at `/admin`

If anything fails, check Vercel deployment logs or Prisma Studio to debug.

---

## Phase 5: Domain Migration (Netlify → Vercel)

### Step 5.1: Update NEXTAUTH_URL in Vercel

Before changing domain settings, update the environment variable:

1. In Vercel dashboard → **Settings** → **Environment Variables**
2. Find **NEXTAUTH_URL**
3. Change from `https://your-project.vercel.app` to your actual domain
4. Example: `https://cedarce.com` (or `https://www.cedarce.com`)
5. Click "Save"
6. Vercel will **automatically redeploy** with the new value

### Step 5.2: Configure Domain in Vercel

1. In Vercel project dashboard, go to **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain: `cedarce.com` (without `https://`)
4. Vercel shows you the nameserver records:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`

### Step 5.3: Update Nameservers at Your Domain Registrar

You need to update nameservers wherever you registered your domain (GoDaddy, Namecheap, etc.):

1. Log in to your domain registrar
2. Find **Nameserver** or **DNS** settings
3. Remove current nameservers (Netlify's or others)
4. Add Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`
5. Save changes
6. **Nameserver propagation takes 24-48 hours** (check status in Vercel: Settings → Domains)

### Step 5.4: Wait for Domain Propagation

- Vercel will show a checkmark when nameservers are active
- In the meantime, your app is still live at `your-project.vercel.app`
- Once propagated, `cedarce.com` will point to Vercel

### Step 5.5: Disable/Delete Netlify Domain (After Propagation)

Once your domain is working on Vercel (you can access `cedarce.com`):

1. Log in to Netlify
2. Go to your site settings → **Domain management**
3. Remove the domain binding or delete the site
4. You can keep the Netlify account for other projects if needed

---

## Phase 6: Post-Deployment Verification

### Step 6.1: Smoke Test

After domain propagation (24-48 hours), test everything:

1. **Visit your domain**: `https://cedarce.com`
2. **Sign up**: Create a test account
3. **Sign in**: Verify login works
4. **Dashboard**: Check user profile loads
5. **Admin panel**: Log in with admin credentials at `/admin`
6. **KYC flow**: Try uploading a file (if you configured BLOB_READ_WRITE_TOKEN)
7. **Email notifications**: Request password reset (check inbox)
8. **API calls**: Open browser DevTools → Network tab, confirm `/api/*` calls succeed

### Step 6.2: Monitor Logs

- Go to Vercel dashboard → **Deployments** → **Runtime Logs**
- Check for errors in real-time as users interact with the app
- Fix any issues and redeploy

### Step 6.3: Database Backup

Once live, set up backups:

**Neon**:
- Automatic hourly backups (free plan included)
- Access via Neon dashboard → **Backups**

**Supabase**:
- Automatic daily backups
- Access via Supabase dashboard → **Backups**

**Railway**:
- Backups available via Railway dashboard

---

## Troubleshooting

### "API calls return 404"
- Check `NEXTAUTH_URL` is correct in Vercel env vars
- Verify `DATABASE_URL` is set and valid
- Check Vercel deployment logs for errors

### "Database connection failed"
- Confirm `DATABASE_URL` matches your actual database
- Ensure database allows connections from Vercel IPs
- Test connection locally: `npx prisma db execute --stdin < /dev/null`

### "Sign in fails"
- Check `NEXTAUTH_SECRET` is set in Vercel
- Verify `ADMIN_LOGIN_EMAIL` and `ADMIN_LOGIN_PASSWORD` in env vars
- Check `src/server/auth/options.ts` for any issues

### "Domain not resolving"
- Nameserver propagation takes up to 48 hours
- Check status in Vercel: Settings → Domains → "Check status"
- Use `nslookup cedarce.com` to debug DNS

### "SSL certificate not issued"
- Vercel auto-issues SSL certificates (~5 min after domain propagation)
- If still pending after 1 hour, verify nameservers are correct

---

## Summary Timeline

| Step | Time | Dependency |
|------|------|-----------|
| Create Vercel project | 5 min | GitHub account |
| Create database (Neon/Supabase) | 5 min | None |
| Set env vars in Vercel | 10 min | Database created |
| Run Prisma migrations | 5 min | DATABASE_URL set |
| Deploy to Vercel | 5 min | Env vars set |
| Test on Vercel domain | 5 min | Deployment complete |
| Update nameservers | 5 min | Vercel domain added |
| **Wait for propagation** | **24-48 hours** | Nameservers updated |
| Delete Netlify domain | 5 min | Domain propagated |
| Final smoke test | 10 min | Domain live |

**Total hands-on time**: ~45 minutes  
**Total elapsed time**: ~24-48 hours (mostly waiting for DNS propagation)

---

## Quick Reference Commands

```bash
# Generate NextAuth secret locally
openssl rand -base64 32

# Generate password hash (for admin account)
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password', 10))"

# Run migrations on production database
npx prisma migrate deploy

# View production database
npx prisma studio

# Test database connection
npx prisma db execute --stdin < /dev/null
```

---

## Need Help?

- **Vercel docs**: https://vercel.com/docs/frameworks/nextjs
- **Prisma docs**: https://www.prisma.io/docs/guides/deployment/deploy-to-vercel
- **Next.js + Auth**: https://next-auth.js.org/deployment
