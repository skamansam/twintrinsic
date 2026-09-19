# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.51.0] - 2026-09-18

### Added

#### CalendarView — Temporal-based calendar with events (11.1)

A new calendar component built exclusively on the native
[Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)
(no polyfill shipped; consumers opt in with `@js-temporal/polyfill` for
pre-Temporal browsers):

- **Month / week / day views** — a fixed 6×7 month grid, 1×7 week row, and
  single-cell day view with per-view paging and roving-tabindex keyboard
  navigation on a proper ARIA `grid`.
- **Event chips** with icons, count badges, status (`cancelled`), and all-day
  multi-day spans rendered as start + continuation chips.
- **Event grouping** — events sharing an iCal UID (+ occurrence day) merge
  into one chip with a "+N calendars" count badge; toggleable.
- **Import** — `parseICal` helper parses iCal/ics text (VEVENT, DTSTART/DTEND,
  RRULE, UID) and `expandRecurrences`/`rruleExpand` expands real-world
  recurrence rules (FREQ, INTERVAL, COUNT, UNTIL, weekly BYDAY), range-capped,
  failing closed on unsupported parts.
- **Connectivity contract** — pass `calendars` sources with a `fetchEvents(range)`
  callback; the component merges and colors feeds, reports partial failures via
  `oncalendarserror`, and groups across sources by UID. Docs recipes for
  Google Calendar, Microsoft 365/Outlook, and Apple Calendar (server-side
  fetching; OAuth/CORS keep network calls out of the component).
- **Drag to edit** — reschedule events by dragging start chips to another day
  (native HTML Drag and Drop API) with a full keyboard alternative
  (activate → arrow keys → Escape); per-event opt-out via `eventsDraggable`.
- **Holiday playground demo** — multi-select public Google holiday feeds
  (proxied through `/api/holidays` since the feeds send no CORS headers),
  seeded random-event sprinkling scoped to the visible period, and a
  custom-event creator with select/edit/delete management.

The previous `Calendar` component is renamed **`CalendarInput`** (date-entry
field); the `twintrinsic/components/Calendar` subpath is replaced by
`./components/CalendarInput`.

#### BrowserApiBadge (11.3)

- New `BrowserApiBadge` component + `browserApiRegistry` mapping each
  component to the browser APIs it uses (Temporal, Popover, Anchor
  Positioning, Drag and Drop, …) with MDN links and tooltips naming the exact
  polyfill a consumer may need — or stating that none exists.
- Exported from the barrel and `twintrinsic/components/BrowserApiBadge`;
  rolled out across all component docs pages.

#### Docs infrastructure

- **Consistent iconography (11.2)** — every docs page and the sidebar use
  Tabler icons resolved from bundled `@iconify-json/tabler` data (no runtime
  Iconify API fetches); a unit test pins every mapped icon name against the
  bundled dataset.
- **Theme-token sweep** — docs demos/examples converted from hardcoded
  palette classes and hex values to semantic tokens (`bg-surface`,
  `text-muted`, `border-border`, …) so they follow ThemeCustomizer themes;
  new `--color-inverse`/`--color-inverse-text` tokens for dark chrome that
  stays dark in both modes.
- `check:assets` script flagging docs demos referencing missing static
  assets; CONTRIBUTING guide (incl. the Paraglide i18n workflow); locale-switch
  e2e coverage for translated pages; Playwright failure screenshots/video.

### Changed

- Docs demo colors: chart/Map `color` props intentionally keep literal hex —
  SVG presentation attributes cannot resolve `var()`.

## [0.50.0]

Initial tagged release of the Twintrinsic component library.

[0.51.0]: https://github.com/koltondev/twintrinsic/compare/v0.50.0...v0.51.0
[0.50.0]: https://github.com/koltondev/twintrinsic/releases/tag/v0.50.0
