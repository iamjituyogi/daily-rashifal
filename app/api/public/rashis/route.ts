import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jsonFromCaughtError } from '@/lib/db-route-error';

/** Public: list rashis with optional joined detail for home cards (no auth). */
export async function GET() {
  try {
    const rows = await prisma.rashi.findMany({
      include: { detail: true },
      orderBy: { name: 'asc' },
    });

    const data = rows.map((r) => ({
      id: r.id,
      name: r.name,
      nameNepali: r.nameNepali ?? null,
      icon: r.icon ?? null,
      shortDescription: r.shortDescription ?? null,
      favoriteColor: r.detail?.favoriteColor ?? null,
      favoriteNumber: r.detail?.favoriteNumber ?? null,
    }));

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    return jsonFromCaughtError(error, 'Failed to load rashis');
  }
}
