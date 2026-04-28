import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyBearer } from '@/lib/auth-server';
import { jsonFromCaughtError } from '@/lib/db-route-error';

// GET all rashis
export async function GET(request: NextRequest) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const rashis = await prisma.rashi.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: rashis }, { status: 200 });
  } catch (error: unknown) {
    return jsonFromCaughtError(error, 'Could not load rashis.');
  }
}

// POST create rashi (name)
export async function POST(request: NextRequest) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Rashi name is required' },
        { status: 400 }
      );
    }

    const optionalStr = (v: unknown): string | null => {
      if (v === null || v === undefined) return null;
      if (typeof v !== 'string') return null;
      const t = v.trim();
      return t.length ? t : null;
    };

    const rashi = await prisma.rashi.create({
      data: {
        name: body.name.trim(),
        nameNepali: optionalStr(body.nameNepali),
        icon: optionalStr(body.icon),
        shortDescription: optionalStr(body.shortDescription),
        description: optionalStr(body.description),
      },
    });

    return NextResponse.json({ success: true, data: rashi }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
