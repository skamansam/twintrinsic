/**
 * Shared helpers for the CalendarView holiday playground (plan item 11.4).
 *
 * Used by both the embedded playground demo on the CalendarView docs page
 * and the standalone `/docs/examples/calendar` example page, so the two
 * stay behaviorally identical (including the seeded sprinkle RNG that e2e
 * tests pin).
 *
 * Docs-only module — not part of the library bundle. Temporal is consumed
 * as a typed global (see `src/lib/temporal.d.ts`); pages importing these
 * helpers install the consumer polyfill pattern in their `script module`.
 */
import { buildMonthGrid, buildWeekGrid } from "$lib/helpers/calendarGrid.js";
import type { CalendarSource } from "$lib/helpers/connectCalendars.js";
import type { CalendarViewEvent } from "$lib/helpers/eventNormalize.js";

/** Google public holiday calendarIds are stable public slugs. */
export interface HolidayFeed {
  /** Google public calendarId (e.g. "en.usa#holiday@group.v.calendar.google.com"). */
  id: string;
  /** Legend label shown next to the toggle. */
  name: string;
  /** Source color for the calendar's chips. */
  color: string;
}

/** Holiday feeds offered in the playground. */
export const PLAYGROUND_CALENDARS: HolidayFeed[] = [
  {
    id: "en.usa#holiday@group.v.calendar.google.com",
    name: "US holidays",
    color: "var(--color-error)",
  },
  {
    id: "en.uk#holiday@group.v.calendar.google.com",
    name: "UK holidays",
    color: "var(--color-info)",
  },
  {
    id: "en.german#holiday@group.v.calendar.google.com",
    name: "German holidays",
    color: "var(--color-warning)",
  },
  {
    id: "en.christian#holiday@group.v.calendar.google.com",
    name: "Christian holidays",
    color: "var(--color-primary)",
  },
];

/**
 * Builds a CalendarSource for one of Google's public holiday calendars.
 * The legacy GData JSON endpoints are retired; the current public feed is
 * plain iCalendar, so parseICal handles it and UID-based grouping works.
 * Fetches are cached per calendarId — repeat toggles don't re-hit the feed.
 * @param id - Google public calendarId
 * @param name - Legend label shown next to the toggle
 * @param color - Source color for the calendar's chips
 */
export function googleHolidaySource(id: string, name: string, color: string): CalendarSource {
  const cache = new Map<string, CalendarViewEvent[]>();
  return {
    id,
    name,
    color,
    fetchEvents: async ({ start, end }) => {
      const key = `${start.year}-${start.month}`;
      if (!cache.has(key)) {
        // CORS-safe: the iCal fetch + parse happen server-side
        // (src/routes/api/holidays/+server.ts, the M6 recipe).
        const url = `/api/holidays?calendar=${encodeURIComponent(id)}&from=${start.toString()}&to=${end.toString()}`;
        cache.set(
          key,
          await fetch(url).then((r) => {
            if (!r.ok) throw new Error(`holiday feed ${r.status}`);
            return r.json();
          }),
        );
      }
      return cache.get(key) ?? [];
    },
  };
}

/**
 * Deterministic RNG for the sprinkle button (mulberry32) — same seed,
 * same events, so demos and e2e tests are reproducible.
 * @param seed - 32-bit seed
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Chip colors cycled by the sprinkle generator (semantic theme tokens). */
export const SANDBOX_COLORS = [
  "var(--color-secondary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-error)",
  "var(--color-primary)",
  "var(--color-primary-bold)",
];

/** Icons the sprinkle generator randomly attaches to events. */
export const SANDBOX_ICONS = [
  "tabler:coffee",
  "tabler:calendar-star",
  "tabler:users",
  "tabler:flag",
];

/** The first/last day of the period currently displayed. */
export function viewSpan(
  month: Temporal.PlainDate,
  view: "month" | "week" | "day",
): { start: Temporal.PlainDate; end: Temporal.PlainDate; days: number } {
  if (view === "day") return { start: month, end: month, days: 1 };
  if (view === "week") {
    const week = buildWeekGrid(month, { weekStart: 0 });
    return { start: week[0], end: week[6], days: 7 };
  }
  const grid = buildMonthGrid(month, { weekStart: 0 });
  return { start: grid[0], end: grid[grid.length - 1], days: grid.length };
}

/**
 * Sprinkles 4 seeded random events across the given visible span.
 * Deterministic per run: run 1 always yields ids `sb-1-0`…`sb-1-3`,
 * which the e2e suite pins.
 * @param run - 1-based sprinkle click counter (first click = 1)
 * @param span - The currently visible period (see {@link viewSpan})
 */
export function sprinkleEvents(
  run: number,
  span: { start: Temporal.PlainDate; days: number },
): CalendarViewEvent[] {
  const rand = mulberry32(42 + run - 1);
  return Array.from({ length: 4 }, (_, i) => {
    const dayOffset = Math.floor(rand() * span.days);
    const day = span.start.add({ days: dayOffset });
    const timed = rand() > 0.35;
    const hour = 8 + Math.floor(rand() * 10);
    return {
      id: `sb-${run}-${i}`,
      title: "Random event",
      start: timed ? `${day.toString()}T${String(hour).padStart(2, "0")}:00` : day.toString(),
      allDay: !timed,
      color: SANDBOX_COLORS[Math.floor(rand() * SANDBOX_COLORS.length)],
      icon: rand() > 0.5 ? SANDBOX_ICONS[Math.floor(rand() * SANDBOX_ICONS.length)] : undefined,
      badge: rand() > 0.7 ? String(1 + Math.floor(rand() * 9)) : undefined,
    };
  });
}
