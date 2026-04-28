import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export type JwtPayload = {
  userId: string;
  username: string;
};

export function verifyBearer(request: NextRequest): JwtPayload | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    ) as JwtPayload & { userId?: unknown };

    const userId =
      typeof decoded.userId === 'string'
        ? decoded.userId
        : decoded.userId != null
          ? String(decoded.userId)
          : '';

    if (!userId || !decoded.username) return null;

    return { userId, username: decoded.username };
  } catch {
    return null;
  }
}
