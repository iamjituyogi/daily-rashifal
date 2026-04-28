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

## Deploy

Use [Vercel](https://vercel.com) or any Node host; set `DATABASE_URL` and `JWT_SECRET` in the host’s environment.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
