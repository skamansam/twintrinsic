/**
 * Event grouping for CalendarView (plan item 11.1, milestone 4) — the
 * "same event on multiple calendars" merge. Built exclusively on the
 * native Temporal API (typed global; see `src/lib/temporal.d.ts`).
 *
 * Dedup strategy (design note §"Rendering", milestone 4):
 * 1. **iCal UID** when present — Google / Outlook / CalDAV preserve the
 *    UID across attendees' calendars, so it is the authoritative key.
 * 2. **Fallback key** `title + startDay + startTime` — deterministic but
 *    best-effort (renamed meetings won't merge; documented behavior).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §"Rendering & CSS" (M4)
 */

import type { CalendarViewEvent, NormalizedEvent } from "./eventNormalize.js";

/**
 * One visual event produced by grouping: the **primary** (first source)
 * supplies title/time/content, and every contributing event is kept in
 * `sources` for count badges and per-source color dots.
 */
export interface GroupedEvent extends NormalizedEvent {
  /** All contributing events, in input order (calendar order when the consumer concatenates per-calendar arrays). */
  sources: CalendarViewEvent[];
}

/**
 * Computes the dedup key for a normalized event: the iCal UID when
 * present, else the `title + startDay + startTime` fallback.
 * @param ne - The normalized event to key
 * @returns A string key shared by every copy of the same real-world event
 */
export function dedupKey(ne: NormalizedEvent): string {
  // uid + start day: the same real-world *occurrence* across calendars.
  // (Plain uid would merge every instance of a recurring series into one
  // chip once RRULE expansion is on — instances must dedup per day, the
  // way UID + RECURRENCE-ID identify an occurrence in iCalendar.)
  if (ne.event.uid) return `uid:${ne.event.uid}@${ne.startDay.toString()}`;
  const day = ne.startDay.toString();
  return `fb:${ne.event.title}|${day}|${ne.startTime ?? "allday"}`;
}

/**
 * Groups normalized events that represent the same real-world event.
 * Groups come out in first-appearance order; the primary (first source)
 * carries the rendered content. Un-shared events become single-source
 * groups, so consumers can treat the output uniformly.
 * @param events - Normalized events (as returned by `normalizeEvents`)
 * @returns One GroupedEvent per distinct real-world event
 */
export function groupEvents(events: NormalizedEvent[]): GroupedEvent[] {
  const byKey = new Map<string, GroupedEvent>();
  for (const ne of events) {
    const key = dedupKey(ne);
    const existing = byKey.get(key);
    if (existing) {
      existing.sources.push(ne.event);
      continue;
    }
    byKey.set(key, { ...ne, sources: [ne.event] });
  }
  return [...byKey.values()];
}

/**
 * Type guard: true when the event went through {@link groupEvents}.
 * @param ne - The chip event to test
 */
export function isGrouped(ne: NormalizedEvent): ne is GroupedEvent {
  return "sources" in ne;
}

/**
 * Number of calendar sources behind a (possibly grouped) chip event.
 * Works on both plain NormalizedEvents (1) and GroupedEvents.
 * @param ne - The chip event
 * @returns How many sources contributed
 */
export function sourceCount(ne: NormalizedEvent): number {
  return isGrouped(ne) ? ne.sources.length : 1;
}

/**
 * Per-source chip colors for the color-dot cluster, in source order.
 * @param ne - The (possibly grouped) chip event
 * @returns One CSS color per contributing source
 */
export function sourceColors(ne: NormalizedEvent): string[] {
  if (!isGrouped(ne)) return [ne.event.color ?? "var(--color-primary)"];
  return ne.sources.map((s) => s.color ?? "var(--color-primary)");
}
