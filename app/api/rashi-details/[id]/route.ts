import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyBearer } from '@/lib/auth-server';
import { parseRashiDetailBody } from '@/lib/rashi-detail-body';

// GET one detail by Mongo document id
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const detail = await prisma.rashiDetail.findUnique({
      where: { id },
      include: { rashi: true },
    });

    if (!detail) {
      return NextResponse.json({ success: false, error: 'Rashi detail not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: detail }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// UPDATE one detail by id (does not change rashi link)
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
    const fields = parseRashiDetailBody(body);

    const existing = await prisma.rashiDetail.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Rashi detail not found' }, { status: 404 });
    }

    const detail = await prisma.rashiDetail.update({
      where: { id },
      data: fields,
      include: { rashi: true },
    });

    return NextResponse.json({ success: true, data: detail }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// DELETE one detail by id
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.rashiDetail.delete({ where: { id } });

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
