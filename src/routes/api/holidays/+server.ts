/**
 * Server endpoint backing the CalendarView playground (plan item 11.4).
 *
 * Google's public holiday feeds send no CORS headers, so the browser
 * cannot fetch them directly — the same reason the M6 connectivity
 * contract puts network calls on the consumer's server. This endpoint is
 * the dogfooded example of that recipe: it proxies the iCal feed
 * server-side, parses it with `parseICal`, filters to the requested
 * range, and returns plain JSON the client feeds into `CalendarSource`.
 *
 * GET /api/holidays?calendar=en.usa%23holiday@group.v.calendar.google.com&from=2026-09-01&to=2026-10-11
 */
import { json, error } from "@sveltejs/kit";
import { parseICal } from "$lib/helpers/parseICal.js";
import type { RequestHandler } from "./$types";

const GOOGLE_ICAL_URL = "https://calendar.google.com/calendar/ical";

/** In-process cache: one parsed full feed per calendarId (feeds are static). */
const feedCache = new Map<string, ReturnType<typeof parseICal>>();

export const GET: RequestHandler = async ({ url, setHeaders }) => {
  const calendar = url.searchParams.get("calendar");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  if (!calendar || !from || !to) {
    error(400, "calendar, from and to query parameters are required");
  }

  let events = feedCache.get(calendar);
  if (!events) {
    try {
      const res = await fetch(
        `${GOOGLE_ICAL_URL}/${encodeURIComponent(calendar)}/public/basic.ics`,
      );
      if (!res.ok) error(502, `holiday feed responded ${res.status}`);
      events = parseICal(await res.text());
      feedCache.set(calendar, events);
    } catch (e) {
      error(502, e instanceof Error ? e.message : "holiday feed unreachable");
    }
  }

  // Filter server-side so the client receives only the visible range.
  const filtered = events.filter((e) => {
    const start = e.start.toString();
    return start >= from && start <= to;
  });

  setHeaders({
    // Public static data — safe to cache at the edge for a day.
    "cache-control": "public, max-age=3600, s-maxage=86400",
  });
  return json(filtered);
};
