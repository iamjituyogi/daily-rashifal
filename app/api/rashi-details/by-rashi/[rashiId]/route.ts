import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyBearer } from '@/lib/auth-server';

// GET detail for one rashi (or null if not created yet)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ rashiId: string }> }
) {
  try {
    if (!verifyBearer(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { rashiId } = await context.params;

    const detail = await prisma.rashiDetail.findUnique({
      where: { rashiId },
      include: { rashi: true },
    });

    return NextResponse.json({ success: true, data: detail }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
