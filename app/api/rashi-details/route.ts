import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyBearer } from '@/lib/auth-server';
import { parseRashiDetailBody } from '@/lib/rashi-detail-body';

// GET all rashi details with linked rashi
export async function GET(request: NextRequest) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const details = await prisma.rashiDetail.findMany({
      include: { rashi: true },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: details }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// POST — create detail only if this rashi has none yet (strict create)
export async function POST(request: NextRequest) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const rashiId = typeof body.rashiId === 'string' ? body.rashiId.trim() : '';
    if (!rashiId) {
      return NextResponse.json({ success: false, error: 'rashiId is required' }, { status: 400 });
    }

    const rashi = await prisma.rashi.findUnique({ where: { id: rashiId } });
    if (!rashi) {
      return NextResponse.json({ success: false, error: 'Rashi not found' }, { status: 404 });
    }

    const existing = await prisma.rashiDetail.findUnique({ where: { rashiId } });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            'A detail row already exists for this rashi. Use PUT /api/rashi-details (upsert) or PUT /api/rashi-details/[id] to update.',
        },
        { status: 409 }
      );
    }

    const fields = parseRashiDetailBody(body);

    const detail = await prisma.rashiDetail.create({
      data: {
        rashiId,
        ...fields,
      },
      include: { rashi: true },
    });

    return NextResponse.json({ success: true, data: detail }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// PUT upsert detail for a rashi (create or replace content by rashiId)
export async function PUT(request: NextRequest) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const rashiId = typeof body.rashiId === 'string' ? body.rashiId.trim() : '';
    if (!rashiId) {
      return NextResponse.json({ success: false, error: 'rashiId is required' }, { status: 400 });
    }

    const rashi = await prisma.rashi.findUnique({ where: { id: rashiId } });
    if (!rashi) {
      return NextResponse.json({ success: false, error: 'Rashi not found' }, { status: 404 });
    }

    const fields = parseRashiDetailBody(body);

    const detail = await prisma.rashiDetail.upsert({
      where: { rashiId },
      create: {
        rashiId,
        ...fields,
      },
      update: {
        ...fields,
      },
      include: { rashi: true },
    });

    return NextResponse.json({ success: true, data: detail }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
