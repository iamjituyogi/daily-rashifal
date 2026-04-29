# daily-rashifal (RashiNow)

Next.js app for **Daily Hindi Rashifal** — public rashi pages, admin dashboard, Prisma + MongoDB Atlas.

Repository: [github.com/iamjituyogi/daily-rashifal](https://github.com/iamjituyogi/daily-rashifal)

## Features

- Public home, rashi detail, Hindi-first UI
- Admin: rashis, rashi detail (rich text), login (JWT)
- Prisma + MongoDB, API routes for public and authenticated use

## Prerequisites

- Node.js 20+
- MongoDB Atlas (or local MongoDB) and a connection string

## Setup

1. Clone and install:

```bash
git clone https://github.com/iamjituyogi/daily-rashifal.git
cd daily-rashifal
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

Edit `.env`: set `DATABASE_URL` (Atlas **Connect → Drivers** SRV string) and a strong `JWT_SECRET`.

3. Prisma and DB:

```bash
npx prisma generate
npx prisma db push
npm run setup:db
```

`setup:db` creates a default user (see `scripts/setup-database.ts` — default `admin` / `admin123`; change in production).

4. Dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run db:check` — test database connectivity
- `npm run build` / `npm start` — production build and run

## What is *not* in Git

`node_modules/`, `.next/`, and `.env*` (except `.env.example`) are listed in `.gitignore` — never commit secrets.

## Deploy (Vercel)

1. **Push this repo to GitHub** — the Next.js app must live at the **repository root** (same folder as `package.json`). If Vercel says the project is empty, you usually imported the wrong repo/branch or the branch has no commits with `package.json`.

2. **Import on Vercel** → Add New Project → Import your Git repo → Framework Preset **Next.js**, Root Directory **`.`** (leave default).

3. **Environment variables** (Project → Settings → Environment Variables), for Production / Preview / Development as needed:
   - `DATABASE_URL` — MongoDB Atlas connection string (same as local `.env`).
   - `JWT_SECRET` — long random string (do not use the example from `.env.example` in production).

4. **Redeploy** after saving env vars. The build runs `prisma generate` automatically (`postinstall` + `build` script) so Prisma Client exists on Vercel.

5. If the **site loads but looks broken**, open **Functions** / build logs; missing `DATABASE_URL` often causes API routes to fail at runtime.

Use any other Node host the same way: set env vars and run `npm install` then `npm run build` then `npm start`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
