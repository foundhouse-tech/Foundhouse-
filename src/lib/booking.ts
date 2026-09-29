/**
 * Booking pages per tier. Env vars override; tier 3 (tinyHouse) has no booking
 * page on purpose and lands on the "webinars coming soon" page instead.
 * Server-only (reads env).
 */
const DEFAULT_BOOKING: Record<1 | 2 | 3, string | undefined> = {
  1: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ017b8HkZxwzHhFOrpUrx48hshnMlRPQIYa5XiqVUrQZ_Ow434X2fq_tPPpNlio7hFn-yIEyST1",
  // Resolved from https://calendar.app.google/QS5qNfzMXyrPbVPa7 so it can be embedded.
  2: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2juf9HI8InAiGVji_RFiVNswBawvM74xtiWnDJ8QChXOPEPqap1ZlLFb29orEjhMu7juWIa13T",
  3: undefined,
};

export function bookingUrlFor(tier: 1 | 2 | 3): string | null {
  const env = { 1: process.env.BOOKING_URL_TIER1, 2: process.env.BOOKING_URL_TIER2, 3: process.env.BOOKING_URL_TIER3 }[tier];
  const url = env || DEFAULT_BOOKING[tier];
  return url && /^https?:\/\//.test(url) ? url : null;
}

/**
 * Google appointment schedules can be framed with `?gv=true`. Anything else
 * (short links, other providers) returns null and the page falls back to a
 * new-tab link.
 */
export function embedUrlFor(url: string): string | null {
  const m = url.match(/^https:\/\/calendar\.google\.com\/calendar\/(?:u\/\d+\/)?appointments\/schedules\/([\w-]+)/);
  return m ? `https://calendar.google.com/calendar/appointments/schedules/${m[1]}?gv=true` : null;
}
