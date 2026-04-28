import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jsonFromCaughtError } from '@/lib/db-route-error';

/** Public: single rashi + detail for `/rashi/[id]` (no auth). */
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const rashi = await prisma.rashi.findUnique({
      where: { id },
      include: { detail: true },
    });

    if (!rashi) {
      return NextResponse.json({ success: false, error: 'Rashi not found' }, { status: 404 });
    }

    const { detail, ...rest } = rashi;

    return NextResponse.json(
      {
        success: true,
        data: {
          rashi: {
            id: rest.id,
            name: rest.name,
            nameNepali: rest.nameNepali,
            icon: rest.icon,
            shortDescription: rest.shortDescription,
            description: rest.description,
          },
          detail: detail
            ? {
                dailyRashifal: detail.dailyRashifal,
                weeklyRashifal: detail.weeklyRashifal,
                saptahikPrem: detail.saptahikPrem,
                monthlyRashifal: detail.monthlyRashifal,
                upay: detail.upay,
                favoriteColor: detail.favoriteColor,
                favoriteNumber: detail.favoriteNumber,
              }
            : null,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return jsonFromCaughtError(error, 'Failed to load rashi');
  }
}
