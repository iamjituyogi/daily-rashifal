/**
 * Run: npm run db:check
 * Verifies Prisma can connect using DATABASE_URL from .env (via @next/env).
 */
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function maskUrl(url: string): string {
  try {
    return url.replace(/:([^:@/]+)@/, ':****@');
  } catch {
    return '(unable to mask)';
  }
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL is missing. Copy .env.example to .env and set it.');
    process.exit(1);
  }

  console.log('Using', maskUrl(url));
  console.log('Connecting…\n');

  try {
    await prisma.$connect();
    const count = await prisma.rashi.count();
    console.log('✓ Database reachable.');
    console.log(`  Sample query OK — rashi count: ${count}`);
  } catch (e) {
    console.error('✗ Connection failed:\n');
    console.error(e instanceof Error ? e.message : e);
    console.error(`
Atlas / network checklist:
  • Atlas → Network Access → add your current IP (or 0.0.0.0/0 for dev only).
  • Atlas → Database → confirm cluster is not paused.
  • Connection string from Atlas → Connect → Drivers — password must be URL-encoded if it has @ # % etc.
  • Try another Wi‑Fi / disable VPN — TLS "InternalError" often means proxy or inspection blocked the tunnel.
  • Local dev without Atlas: Docker Mongo
      docker run -d -p 27017:27017 --name rashifal-mongo mongo:7
    Then in .env:
      DATABASE_URL="mongodb://127.0.0.1:27017/rashifal"
    Then: npx prisma db push
`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
