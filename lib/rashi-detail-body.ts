/** Shared parsing for admin RashiDetail APIs (JSON body). */

export type ParsedRashiDetailFields = {
  dailyRashifal: string;
  favoriteColor: string;
  favoriteNumber: string;
  upay: string;
  weeklyRashifal: string;
  saptahikPrem: string;
  monthlyRashifal: string;
};

export function parseRashiDetailBody(body: Record<string, unknown>): ParsedRashiDetailFields {
  const dailyRashifal = typeof body.dailyRashifal === 'string' ? body.dailyRashifal : '';
  const favoriteColor =
    typeof body.favoriteColor === 'string' ? body.favoriteColor.trim() : '';
  const favoriteNumber =
    typeof body.favoriteNumber === 'string'
      ? body.favoriteNumber.trim()
      : body.favoriteNumber != null
        ? String(body.favoriteNumber).trim()
        : '';
  const upay = typeof body.upay === 'string' ? body.upay : '';
  const weeklyRashifal = typeof body.weeklyRashifal === 'string' ? body.weeklyRashifal : '';
  const saptahikPrem = typeof body.saptahikPrem === 'string' ? body.saptahikPrem : '';
  const monthlyRashifal = typeof body.monthlyRashifal === 'string' ? body.monthlyRashifal : '';

  return {
    dailyRashifal,
    favoriteColor,
    favoriteNumber,
    upay,
    weeklyRashifal,
    saptahikPrem,
    monthlyRashifal,
  };
}
