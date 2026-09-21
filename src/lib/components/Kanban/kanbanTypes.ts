/**
 * Shared data types for the Kanban board family (`KanbanBoard`).
 *
 * The board is data-driven first (no KanbanColumn/KanbanCard
 * sub-components): consumers pass plain arrays of `KanbanColumnData` and
 * `KanbanCardData`, matching the `events`/`calendars` convention of
 * CalendarView. Dates are ISO strings so JSON-API-backed apps never need
 * Temporal.
 *
 * @see docs/plans/KANBAN_DESIGN.md
 */

/** One tick (row guide / axis label) on the board. */
export interface KanbanTick {
  /**
   * Position of the tick on the board axis, in axis units. In `temporal`
   * mode the unit is hours of the day (9 → 9 AM); in `stacked` mode it is
   * an abstract row index (1, 2, 3 …).
   */
  value: number;
  /** Label rendered beside the tick on the ruler (omitted ticks are guides only). */
  label?: string;
  /** Major ticks get a stronger rule and, when unlabeled, an auto label. */
  major?: boolean;
}

/** One column (lane) of the board. */
export interface KanbanColumnData {
  /** Stable identity referenced by `KanbanCardData.column`. */
  id: string;
  /** Header label. */
  title: string;
  /** Secondary header text (e.g. a date or WIP count). */
  subtitle?: string;
  /** Marks the column as a calendar day (ISO `YYYY-MM-DD`) for temporal boards. */
  date?: string;
  /** Per-column tick override; falls back to the board's `ticks` prop. */
  ticks?: KanbanTick[];
  /** CSS color for the column's header accent (falls back to primary). */
  accent?: string;
  /** Rest props forwarded to the column root element. */
  [key: `data-${string}`]: unknown;
}

/** One card on the board. */
export interface KanbanCardData {
  /** Stable identity. */
  id: string;
  /** The column the card lives in (matches `KanbanColumnData.id`). */
  column: string;
  /** Card label. Rendered inside the card; announced to assistive tech. */
  title: string;
  /**
   * Temporal position in tick units (e.g. hours of the day). `start` is
   * inclusive, `end` exclusive-ish (a 9–9.5 card is a half hour). When
   * `endColumn` is set, `end` is measured in that column's axis instead.
   * Default: first tick → first tick + 1.
   */
  start?: number;
  end?: number;
  /**
   * Column the card's end extends into (cross-column resize). When set to
   * a later column, the card renders clamped to its own column's axis plus
   * a spill segment in the target column, and `end` is interpreted in the
   * target column's ticks. Ignored for statically spanning cards
   * (`columnStart`/`columnEnd`/`span`).
   */
  endColumn?: string;
  /**
   * 0-based inclusive column span — the card visually covers columns
   * `columnStart`…`columnEnd` of the board. Explicit span overrides
   * `span`; both are resolved against the card's `column` index.
   */
  columnStart?: number;
  columnEnd?: number;
  /** Columns spanned, starting at the card's own column (default 1). */
  span?: number;
  /**
   * Explicit side-by-side lane (1-based) for overlapping same-column
   * cards. When omitted the board auto-assigns lanes with interval
   * packing (`assignKanbanLanes`).
   */
  lane?: number;
  /** CSS color for the card (falls back to the column accent, then primary). */
  color?: string;
  /** Iconify icon name rendered inside the card (e.g. "tabler:clock"). */
  icon?: string;
  /** Small badge rendered next to the title (count, label, etc.). */
  badge?: string | number;
  /** Assignee initials rendered as an avatar dot. */
  assignee?: string;
  /** Progress 0–100 rendered as a bottom bar. */
  progress?: number;
  /** Per-card DnD lock (default true when the board has `dragDrop`). */
  draggable?: boolean;
  /** Per-card resize lock (default true when the board has `resize`). */
  resizable?: boolean;
  /** Free-form metadata for snippet consumers. */
  description?: string;
  /** Rest props forwarded to the card element. */
  [key: `data-${string}`]: unknown;
}

/** Payload for the board's `oncardmove` callback. */
export interface KanbanMoveDetail {
  /** The moved card (raw, as passed via the `cards` prop). */
  card: KanbanCardData;
  /** Column id the card was moved from. */
  fromColumn: string;
  /** Column id the card was moved to. */
  toColumn: string;
  /** Insertion index in the target column (0-based, stacked mode ordering). */
  toIndex: number;
}

/** Payload for the board's `oncardresize` callback. */
export interface KanbanResizeDetail {
  /** The resized card (raw, as passed via the `cards` prop). */
  card: KanbanCardData;
  /** Column id the card lives in. */
  column: string;
  /** New start of the card's extent, in tick units. */
  start: number;
  /**
   * New end of the card's extent, in tick units — measured in
   * `endColumn`'s axis when set, otherwise in `column`'s.
   */
  end: number;
  /**
   * Column the end extends into when the resize rolled over into a later
   * column (cross-column resize); absent when the card ends in `column`.
   */
  endColumn?: string;
  /** Which edge the gesture moved (`"start"` = top, `"end"` = bottom). */
  edge: "start" | "end";
}
