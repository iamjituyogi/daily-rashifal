/** Payload from GET /api/public/rashis for home cards. */
export interface PublicRashiCard {
  id: string;
  name: string;
  nameNepali: string | null;
  icon: string | null;
  shortDescription: string | null;
  favoriteNumber: string | null;
}
