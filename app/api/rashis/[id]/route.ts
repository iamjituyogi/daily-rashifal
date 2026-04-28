import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyBearer } from '@/lib/auth-server';

// GET single rashi
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const rashi = await prisma.rashi.findUnique({ where: { id } });

    if (!rashi) {
      return NextResponse.json({ success: false, error: 'Rashi not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rashi }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// PUT update rashi name
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
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

    const rashi = await prisma.rashi.update({
      where: { id },
      data: {
        name: body.name.trim(),
        nameNepali: optionalStr(body.nameNepali),
        icon: optionalStr(body.icon),
        shortDescription: optionalStr(body.shortDescription),
        description: optionalStr(body.description),
      },
    });

    return NextResponse.json({ success: true, data: rashi }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// DELETE rashi (cascades RashiDetail in Prisma)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.rashi.delete({ where: { id } });

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
