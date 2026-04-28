import { NextResponse } from 'next/server';

/** Detect Prisma/Mongo driver failures that mean “DB unreachable”, not bad credentials or validation. */
export function isLikelyDatabaseConnectivityError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return /Server selection timed out|No available servers|Topology:|ReplicaSetNoPrimary|Raw query failed|connection.*closed|ECONNREFUSED|P1001|P1017|fatal alert|I\/O error|Kind:.*Server selection|Unable to reach database server/i.test(
    msg
  );
}

/**
 * Maps thrown errors to JSON responses. Avoids leaking huge Prisma/Turbopack stacks to the client.
 * Set EXPOSE_INTERNAL_ERRORS=true in .env to see raw messages in development (500 only).
 */
export function jsonFromCaughtError(error: unknown, fallbackMessage: string): NextResponse {
  if (isLikelyDatabaseConnectivityError(error)) {
    return NextResponse.json(
      {
        success: false,
        code: 'DATABASE_UNAVAILABLE',
        error:
          'Cannot reach the database. On MongoDB Atlas: open your cluster → Network Access → add your IP (or 0.0.0.0/0 for local dev). Ensure the cluster is not paused. In .env, DATABASE_URL must match Atlas “Connect → Drivers” (password URL-encoded if it has special characters).',
      },
      { status: 503 }
    );
  }

  const internal = error instanceof Error ? error.message : fallbackMessage;
  const showDetails =
    process.env.NODE_ENV === 'development' && process.env.EXPOSE_INTERNAL_ERRORS === 'true';
  return NextResponse.json(
    {
      success: false,
      error: showDetails ? internal : fallbackMessage,
    },
    { status: 500 }
  );
}
