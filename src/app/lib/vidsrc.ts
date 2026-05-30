// Vidsrc retires and rotates its domains frequently. When the player stops
// loading (blank frame, or a "chrome-error://chromewebdata/ ... Unsafe attempt
// to load URL" console error), the embed host is almost always dead — check the
// official domain list on the Vidsrc site and update the host below.
//
// Override without editing code by setting NEXT_PUBLIC_VIDSRC_HOST in .env.local.
//
// History: `vidsrc.xyz` went dead (confirmed 2026-05); switched to a live domain.
export const VIDSRC_HOST = process.env.NEXT_PUBLIC_VIDSRC_HOST ?? 'vidsrcme.ru';

export const movieEmbedUrl = (id: string | number) =>
  `https://${VIDSRC_HOST}/embed/movie/${id}/`;

export const tvEmbedUrl = (
  id: string | number,
  season: number,
  episode: number,
) => `https://${VIDSRC_HOST}/embed/tv/${id}/${season}/${episode}`;
