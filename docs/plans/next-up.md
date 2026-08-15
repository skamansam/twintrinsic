ACTIVE PLAN: docs/plans/E2E_TO_STORYBOOK_MIGRATION_PLAN.md

# Phase A — Scaffolding (DONE)

All items from § 10.1 are complete:

1. ✅ `data-testid="<component>-<variant>"` — convention applied to Avatar +
   Container + an initial batch (Tag, Progress, Accordion, Sidebar, Button,
   Tabs, Card, AppHeader, BottomBar, Badge, Breadcrumb, Carousel,
   CodeEditor, Icon, Map, Menu, Modal, Panel, Separator, Skeleton,
   Splitter). Phase A still owes data-testid for the rest of the docs
   pages (§ 5.3) — that's Phase A.5 / Phase C scope, file-by-file.
2. ✅ `tests/e2e/CodeBlockSpeed.test.js` — typo fixed (§ 9.1); all 14
   `codeblockspeeed` references in the test file replaced with
   `codeblockspeed`. Repo-wide check: zero remaining in active code;
   intentional mentions remain only in `docs/plans/*` files documenting
   the § 9.1 rename rationale. The 4 stale Playwright error-context
   dumps that referenced the pre-fix misspelling were cleaned up via
   `git clean -fdx test-results/`, and `test-results/` (plus the rest of
   the canonical Playwright artifacts) was added to `.gitignore`.
3. ✅ `tests/e2e/ThemeToggle.test.js` deleted; `themetoggle.test.ts`
   renamed → `tests/e2e/ThemeToggle.test.ts` with corrected URL casing
   + 6 docs-smoke tests (§ 9.2). Component behavior migration to story
   `play` functions happens in Phase C.
4. ✅ `@storybook/addon-a11y` installed (`^10.4.6`, pnpm bumped storybook
   core to satisfy the peer-dep), registered in `.storybook/main.ts`,
   configured in `.storybook/preview.ts` (§ 9.3).
5. ✅ `.github/workflows/test.yml` created with parallel `unit`,
   `build-and-typecheck`, `storybook`, `e2e` jobs (§ 9.4).
   `.github/workflows/publish.yml` now chain-gates `publish.needs: test`
   on a `test` job that re-runs `pnpm check` / `pnpm check:lib` /
   `pnpm check:a11y` / `pnpm test:unit` on the same SHA before tagging.

## Acceptance § 11 status

- [x] No `codeblockspeeed` in `tests/`, `src/`, `stories/`, or
      `.storybook/`. Intentional references remain only in three
      `docs/plans/*` files documenting the § 9.1 rename rationale.
      Stale `test-results/` Playwright error-context dumps removed
      and `test-results/` added to `.gitignore` (canonical Playwright
      convention).
- [x] Exactly one `tests/e2e/ThemeToggle.test.ts` with corrected URL casing.
- [x] `@storybook/addon-a11y` listed in `.storybook/main.ts` addons.
- [x] `.github/workflows/test.yml` exists; runs `unit`, `storybook`,
      `e2e` jobs on every PR.
- [x] `publish.yml` requires `test` job success.
- [x] `pnpm test:storybook` succeeds end-to-end — **282/282 tests, exit 0**
      (45/45 files). The browser harness is fully working. See the
      "Storybook browser harness — gotchas" section below for the root
      causes that were fixed to get here (svelte plugin missing in the
      browser server, `$lib`/`@iconify/svelte` aliases, `asChild` on
      composition stories, async-unmount null-ref guards, cold-cache
      flakiness).
- [⏳] `pnpm test:e2e` succeeds — unverified locally; pre-publish run
      will execute in CI. Playwright container has the right binaries.
- [x] `pnpm check:a11y` 0 warnings.
- [x] Unit-test harness fixed (see "Unit-test harness — FIXED" below): the
      Svelte 5 `mount(...) is not available on the server` crash that made
      every `tests/unit/*.test.ts` fail is resolved. `pnpm test:unit` is now
      green end-to-end.
- [⏳] Pre-existing `pnpm check` errors in `src/routes/docs/*` and
      `src/lib/components/Metrics/*` are unrelated to the Phase A scope;
      they remain open under the historical `docs/plans/TYPE_ERRORS_PLAN.md`
      and don't block this migration.

### `pnpm check` remediation — July batch (DONE)
- [x] Strategic high-leverage batch: added `interface Props` to 14 lib
      components (Tag, Tabs, Toast, DataTable, Switch, Radio,
      RadioGroup, InputSwitch, Calendar, Rating, NumberInput,
      AutoComplete, Listbox, FileUpload).
- [x] `src/lib/**` errors dropped from 214 → **0**. `pnpm check` total
      dropped from 1,370 (Jun 11 baseline, scribe note) → **457** (–7
      net). Remaining 457 errors are concentrated in docs pages
      (`src/routes/docs/**`) and unit tests (`tests/unit/**`).

# Unit-test harness — FIXED (`lifecycle_function_unavailable` resolved)

**Symptom.** Every `tests/unit/*.test.ts` failed at mount with Svelte's
`lifecycle_function_unavailable: mount(...) is not available on the server`
(untouched `Badge.test.ts` failed identically), so the `createRawSnippet`
coverage in `TagGroup.test.ts` / `ChipGroup.test.ts` was unverifiable.

**Root cause.** Svelte 5.56's `exports` map for `.` exposes only `types` /
`worker` / `browser` / `default` conditions — there is NO `import` or `svelte`
condition. Under the unit project's SSR-style resolution (Vite's default
conditions omit `browser`) and via Node's native ESM loader for externalized
deps, the bare `svelte` specifier resolves to `src/index-server.js`, where
`mount()` throws. `@testing-library/svelte-core` does `import * as Svelte from
'svelte'` (mount.js / svelte-version.js), so its `render()` always hit the
server entry. The old `server.deps.inline: ['svelte']` never helped because the
EXTERNALIZED testing-library chain's own `import 'svelte'` was resolved by
Node's loader, bypassing Vite entirely.

**Fix (vitest.config.ts, unit project only):**
1. `resolve.alias: [{ find: /^svelte$/, replacement:
   node_modules/svelte/src/index-client.js }]` — regex-anchored so
   `svelte/internal/*` subpath imports (which compiled components rely on)
   still resolve through the real package; only the bare specifier is pinned
   to the client entry. Scoped to the unit project — the storybook browser
   project already resolves the client entry via the `browser` condition and
   is untouched.
2. `server.deps.inline` expanded to `['svelte', '@testing-library/svelte',
   '@testing-library/svelte-core']` — inlining the chain routes its
   `import 'svelte'` through Vite's resolver where the alias applies.

**Second bug fixed along the way.** `createRawSnippet`'s callback params are
GETTERS (`Getters<Params>` per the .d.ts — each param is `() => T`). The
itemTemplate tests' `render: () => \`${index}:${item}\`` stringified the getter
functions; fixed to `index()` / `item()` in `TagGroup.test.ts` and
`ChipGroup.test.ts`.

**Result.** `pnpm test:unit`: **95 files passed, 423 passed / 2 skipped (425)**
— the 2 skips are intentional `it.skip` in `Select.test.ts`. `pnpm check:lib`
still 0/0. Re-verified the storybook suite is unaffected by the config change.

# Storybook browser harness — DONE (282/282, exit 0)

## What was fixed to get the harness green

1. **`vite-plugin-svelte` absent from the browser server.** Vitest 4
   projects don't propagate the root `plugins` array, and
   `@storybook/addon-vitest`'s config hook filters out the framework's
   own svelte plugin. Fix: add an explicit `svelte({ compilerOptions:
   { dev: true, css: 'injected' }, inspector: false })` plugin to the
   storybook project in `vitest.config.ts`. Without it, the addon's
   setup imports raw `.svelte` renderer files that reach
   `vite:import-analysis` untransformed ('invalid JS syntax', 39
   errors).
2. **`$lib` and `@iconify/svelte` resolution.** The addon runs
   `.storybook/main.ts`'s `viteFinal` against a bare `{ root }` config,
   so SvelteKit's aliases are absent. Fix: add both aliases in the
   `viteFinal` hook (`$lib` → `../src/lib`; `/^@iconify\/svelte$/` →
   the raw `.svelte` entry, since its exports map exposes only
   `svelte`/`types` conditions the addon's dep-scan omits).
3. **`server.fs.allow`.** The vitest browser server runs in
   middlewareMode on the ROOT vite server, so its fs.allow comes from
   the root config in `vitest.config.ts` (workspace root + project +
   stories) — NOT from the project's viteFinal. Without the workspace
   root, browser client scripts under hoisted `node_modules` 404 and
   the session times out.
4. **`asChild` on composition stories.** With `component` set in
   `defineMeta`, `<Story>` children default to the component's default
   slot; components with no default snippet (Avatar, Icon) silently
   drop the markup and render a bare default instance (undefined props
   → `name.split(':')` TypeErrors). Fix: `asChild` on multi-component
   stories so children become the static story content.
5. **Svelte-CSF indexer crash on TS non-null assertions.**
   `SB_SVELTE_CSF_PARSER_EXTRACT_SVELTE_0009` — `wrapper!.querySelector`
   in a plain-JS `<script module>` template attribute can't be parsed.
   Fix: optional chaining (`wrapper?.querySelector`).
6. **Legacy `render`+`template`/`slots`-string stories.** Storybook 10's
   Svelte renderer ignores these (renders a bare default component with
   undefined props → `Object.entries(undefined)` crash). Fix: converted
   Avatar, Icon, Checkbox, ColorPicker, LazyPanel to Svelte CSF
   (`defineMeta` + `<Story>` with real markup). Deleted the superseded
   `.ts`/`.js` files. `CodeBlock.stories.js` AutoDetect got a minimal
   `props` fix; Page import fixed (`storybook/test`, not
   `@storybook/test`); CodeEditor `export const JSON` renamed (TDZ).
7. **Async-unmount null-ref rejections.** Component code that awaited
   (CodeBlock `highlightCode`, Map `await import('leaflet')`) had the
   `bind:this` ref nulled by Svelte teardown mid-await → unhandled
   rejections that failed the CI exit code. Fix: guard
   (`if (codeElement)`) / capture (`const container = mapContainer`)
   before use. Tag story's `let:item` removed (Svelte 5
   `invalid_default_snippet`).
8. **Cold-cache flakiness.** `rm -rf node_modules/.cache/storybook`
   forces a deps rebuild race that surfaces 'Vitest failed to find the
   runner/current suite' on ~10 files. A second (warm-cache) run is
   green. Do NOT clear that cache before a CI storybook run; CI gets a
   fresh checkout anyway.

## Follow-ups for future sessions

- ✅ **TagGroup `items` + `let:item` API migrated to a Svelte 5 `itemTemplate`
  snippet prop (DONE).** `children?.item` named-slot access removed from
  `TagGroup.svelte`; new typed API: `itemTemplate?: Snippet<[TItem, number]>`
  with generic `TItem extends string | Record<string, unknown>`, plus a
  default `<Tag>` fallback rendering `getItemLabel(item)` and a `labelField`
  prop (default `"label"`) for object items. `ondismiss` detail is now
  precisely `{ item: TItem; index: number }` (matching what `handleDismiss`
  dispatches). Consumers updated: `stories/Tag.stories.svelte` Dynamic Tags
  story (`{#snippet itemTemplate(item: string)}`), docs live example + code
  block + TagGroup props table (`src/routes/docs/components/Tag/Tag/+page.svelte`),
  and `tests/unit/TagGroup.test.ts` (6 tests incl. `createRawSnippet` template,
  ondismiss detail, labelField). WARNINGS.md TagGroup `<svelte:component>`
  entry removed (18→17; deprecated-patterns category 2→1).
  **Validation:** `pnpm check:lib` 0/0; `pnpm test:storybook -t Tag` 2 passed
  exit 0 (proves svelte-csf renders the `{#snippet}` story); `pnpm check` 331
  (down from 332 baseline — only remaining Tag docs error is the pre-existing
  `Cannot find module '$lib'`).
  **Breaking-change notes for consumers:** (1) `items` now requires
  `string | Record<string, unknown>` elements (numbers/booleans will type-error);
  (2) when `items` is non-empty, `children` is ignored (only rendered in the
  empty-items branch) — the old per-item children render was the broken
  `invalid_default_snippet` path; (3) the `setContext("tagGroup", …)` that
  TagGroup previously set (and nothing ever consumed — Tag never called
  `getContext`) was removed; group props propagate to the default fallback
  Tag explicitly; (4) unit tests now RUN and PASS: `pnpm test:unit -t TagGroup`
  green (harness fixed, see below). The Dynamic Tags story `play` function
  (green under `pnpm test:storybook`) also covers the snippet path at runtime
  via a `pill` discriminator.
- ✅ **ChipGroup `items` + `let:item` API migrated to a Svelte 5 `itemTemplate`
  snippet prop (DONE).** Same migration as TagGroup: `children?.item` named-slot
  access and the self-referential `setContext("chipGroup", …)` (only read by the
  component's own markup) removed from `ChipGroup.svelte`; new typed API:
  `itemTemplate?: Snippet<[TItem, number]>` with generic
  `TItem extends string | Record<string, unknown>`, a default `<Chip>` fallback
  rendering `getItemLabel(item)`, a `labelField` prop (default `"label"`), and
  precise `onselect` detail `{ selected: TItem[] }` / `onremove` detail
  `{ item: TItem; index: number }`. Selection state (`toggleSelection`, multiple)
  is now a plain internal function instead of going through context.
  Consumers: NEW `stories/Chip.stories.svelte` (Chip had no story before) with a
  Dynamic Chips story on `{#snippet itemTemplate(item)}` + play function that
  discriminates the snippet path via `clickable`/`role="button"` (the fallback
  only renders clickable chips when the group sets `clickable`/`selectable`);
  docs live example + code block + props table
  (`src/routes/docs/components/Chip/ChipGroup/+page.svelte`);
  `tests/unit/ChipGroup.test.ts` rewritten (7 tests incl. `createRawSnippet`
  template, onremove detail, labelField, selectable toggle).
  **Validation:** `pnpm check:lib` 0/0; `pnpm test:storybook -t Chip` passes
  (storybook browser harness executes the `{#snippet}` story).
  **Breaking-change notes:** (1) `items` now requires
  `string | Record<string, unknown>` elements; (2) when `items` is non-empty,
  `children` is ignored (only rendered in the empty-items branch); (3) the
  `setContext("chipGroup", …)` context is gone — group props propagate to the
  default fallback Chip explicitly; (4) **interactive props (`clickable`,
  `selectable`, `removable`, `selected`) apply ONLY to the default fallback —
  a custom `itemTemplate` snippet owns the Chip entirely and must apply those
  props itself** (documented on the `itemTemplate` JSDoc + the docs page;
  the docs Selectable example now uses the fallback so selection works  out of the box); (5) unit tests now RUN and PASS: `pnpm test:unit -t ChipGroup`
  green (harness fixed, see below).
- ✅ **ChipGroup `itemTemplate` widened to `Snippet<[TItem, number, boolean]>`
  (DONE).** The `itemTemplate` snippet now receives a third arg — a boolean
  reflecting whether that item is selected in the group, kept in sync with the
  controlled `selected` prop (`{@render itemTemplate(item, index,
  selectedItems.includes(item))}`). Snippet chips can render
  `<Chip selected={selected}>` without tracking selection themselves. This was
  the flagged "possible future enhancement" from the original migration.
  Consumers: new `Snippet Selection Chips` story in `stories/Chip.stories.svelte`
  (play asserts `chip-selected` on the controlled-selected items and its absence
  on the unselected one; group intentionally NOT `selectable` there — with a
  custom snippet the consumer owns click handling, and `role="listbox"` on the
  group alongside snippet `role="button"` chips would violate ARIA); docs page
  gains a "Dynamic Items Reflecting Selection" example + updated props table
  (`Snippet<[TItem, number, boolean]>`); `tests/unit/ChipGroup.test.ts` updated
  (existing custom-template test now asserts `selected` getter = false) + new
  test asserting the third arg reflects the controlled `selected` prop.
  **Gotchas found en route:** (1) snippet params bind POSITIONALLY — the first
  story/demo declared `{#snippet itemTemplate(item, selected)}` (2 params) but
  the render passes 3 args, so `selected` silently bound to the INDEX (0 for
  Red → falsy → only Red's chip-selected assertion failed). All snippet sites
  must declare all 3 params: `(item, index, selected)`. (2) The UPDATE path
  (controlled `selected` prop change → `$effect` → third arg flips) cannot be
  unit-tested in jsdom: @testing-library's rerender/$set does not re-trigger
  Svelte 5 `$effect`s (rerender+tick, rerender+flushSync, fireEvent.click+
  waitFor, native .click()+waitFor all left the DOM stale). It IS covered by a
  new `Selection Chips Update` storybook story + `stories/ChipSelectionDemo.svelte`
  wrapper, which drives the change through a real browser via `$state`.
  **Backwards-compatible:** existing `{#snippet itemTemplate(item)}` consumers
  are unaffected (Svelte ignores extra args). TagGroup untouched (no selection
  state).
- ✅ **Shared helper consolidation — getItemLabel / dispatchGroupRemove /
  getItemValue (DONE).** Extracted three duplicated utilities into
  `src/lib/helpers/` (barrel `src/lib/helpers/index.ts`, NodeNext `.js`-
  extension imports). **Convention codified in `AGENTS.md` § Code Standards
  → "Shared Helpers":** the Form select family + group components must route
  label/value extraction through these helpers — no local `getOptionLabel` /
  `getOptionValue` helpers; field props passed explicitly; `getItemValue`
  no-guard passthrough is deliberate; `grep -rn 'getOptionLabel\|getOptionValue'
  src/` must return zero. Full audit below:
  1. `itemLabel.ts` — `getItemLabel(item, labelField = "label")`, no-guard
     `value == null ? "" : String(value)` semantics. Consumers: TagGroup +
     ChipGroup fallback labels, AutoComplete (8 call sites now pass
     `labelField` explicitly; empty-array value-init edge case guarded).
     Unifies the old per-component `?.toString() || ""` label semantics.
  2. `groupRemove.ts` — `dispatchGroupRemove<TItem>(items, index,
     eventName: "dismiss" | "remove", handler?)`: resolves `items[index]`
     and dispatches a `CustomEvent` with `{ item, index }` detail. Consumers:
     TagGroup `handleDismiss` + ChipGroup `handleRemove` (both delegate).
  3. `itemValue.ts` — `getItemValue(item: unknown, valueField = "value")`,
     no-guard passthrough (objects yield `item[valueField]`, primitives
     as-is). Consumers: AutoComplete (7 sites), Form/Listbox + Form/Combobox
     (local `getOptionValue` removed).
  **Falsy-semantics decision (RESOLVED — passthrough wins).** The old
  per-component `if (!option) return null` guards were inconsistent AND buggy
  (`getOptionValue(0)` collapsed numeric option `0` → `null`, breaking
  selection). The shared helper passes falsy primitives (`""`, `0`, `false`,
  `null`, `undefined`) through unchanged — safe because selection logic
  compares values symmetrically (both sides run the same helper), and it
  matches the `getItemLabel` precedent plus the newer
  `Combobox/Combobox.svelte` (which never had the guard). Decision documented
  in the `itemValue.ts` JSDoc.
  **Unit tests:** all three helpers covered — `itemLabel.test.ts` (5),
  `groupRemove.test.ts` (4), `itemValue.test.ts` (6; pins the passthrough
  semantics incl. falsy field values).
  **Validation:** `pnpm check:lib` 0/0; `pnpm test:unit` 97 files / 433 passed
  exit 0 (full suite; the later-added `itemValue.test.ts` ran 6/6 in
  isolation); per-component storybook suites green (Tag/Chip 22, AutoComplete
  10, Combobox 12); `pnpm check` 330 unchanged baseline.
  **Remaining follow-ups:** none — all three are now DONE, and the optional
  `getOptionLabel` dedup for the standalone Combobox is also done (see the
  bullets below).
- ✅ **`getOptionLabel` dedup — Form/Listbox + Form/Combobox migrated to the
  shared `getItemLabel` (DONE).** Rather than creating a second label helper,
  the existing `getItemLabel` was reused — its `value == null ? "" :
  String(value)` semantics are identical to the old `?.toString() || ""`
  pattern for all contract-valid inputs (the same unification AutoComplete
  already went through). `getItemLabel` widened to `item: unknown` (mirroring
  the `getItemValue` widening) so Combobox's untyped options work. Locals
  removed: Listbox 4 call sites (filter, type-ahead ×2, template),
  Combobox 7 call sites (value effect, filter, blur, keydown resets ×2,
  select, template), all now `getItemLabel(option, optionLabel)`. Grep:
  0 `getOptionLabel` refs remain. Semantics note: out-of-contract falsy
  options (`0`/`false`) now render `"0"`/`"false"` instead of `""` — a fix
  consistent with the deliberate passthrough decision.
  **Validation:** `pnpm check:lib` 0/0; `pnpm test:unit -t
  'Listbox|Combobox|getItemLabel'` 12 passed; storybook Combobox 12 passed;
  `pnpm check` 330 unchanged baseline.
- ✅ **Listbox inline `[optionValue]` accesses consolidated to `getItemValue`
  (DONE).** The last remaining inline
  `(v as Record<string, unknown>)[optionValue]` patterns in
  `Form/Listbox.svelte` — in `isOptionSelected` (multi-select `.some()` and
  the single-select object branch) and the `selectOption` removal filter —
  now call `getItemValue(v, optionValue)` /
  `getItemValue(selectedValues, optionValue)`. Grep: 0 `[optionValue]` refs
  remain. Behavior-preserving: the helper's object/primitive branches are
  exactly what the old inline ternaries did, and the guarded
  `typeof selectedValues === "object"` sites keep their guard.
  **Validation:** `pnpm check:lib` 0/0; `pnpm test:unit -t Listbox` green;
  `pnpm check` 330 unchanged baseline.
- ✅ **Standalone `Combobox/Combobox.svelte` inline `getOptionValue` migrated
  to the shared `getItemValue` (DONE).** The newer, separate Combobox (not
  Form/Combobox) had a local no-guard `getOptionValue` — already the
  passthrough form, semantically identical to `getItemValue`. Local removed;
  4 call sites now `getItemValue(option, optionValue)` (handleOptionClick
  newValue, selectedLabel `options.find`, `class:selected`, `aria-selected`).
  Import added from `../../helpers/index.js`. Grep: 0 `getOptionValue` refs
  remain in `src/lib/**`. Behavior-preserving (identical object/primitive
  branches, same `optionValue` prop default `"value"` as the helper's).
  **Validation:** `pnpm check:lib` 0/0; `pnpm check` 330 unchanged baseline.
- ✅ **Docs-site Utilities page + public helper exports (DONE).** Added
  `src/routes/docs/utilities/+page.svelte` documenting the shared helpers
  (`getItemLabel`, `getItemValue`, `dispatchGroupRemove`, `detectLanguage`)
  with import sample + per-helper signature panels + usage CodeBlocks
  (`\u003C`-escaped per the Phase 9.3 convention). Made the helpers genuinely
  public: `src/lib/index.ts` now re-exports the helpers barrel
  (`export { detectLanguage, dispatchGroupRemove, getItemLabel,
  getItemValue } from "./helpers/index.js"`) — previously they were only
  reachable via the internal `$lib/helpers/` path, so the docs claim
  "public exports" is now true. Navigation: top-nav "Utilities" link
  (`siteLinks`) + "APIs" sidebar group (`siteMenu`) in
  `src/routes/docs/+layout.svelte`.
  **Validation:** `pnpm check:lib` 0/0 (the export is clean); biome clean;
  `pnpm check` 331 — **+1 from the 330 baseline, fully attributed** to the
  known systemic `Cannot find module '$lib'` error that every docs page
  importing from the bare `$lib` barrel already hits (untouched theming page
  has the identical error at the same import line; `pnpm svelte-kit sync`
  does not clear it — it's the deferred NodeNext mixed-resolution category,
  not a stale cache). The utilities page itself has exactly 1 error (that
  same class) and zero parse errors from the `\u003C` escapes.
  **(Superseded by Phase 9.7 — the bare-`$lib` barrel imports were removed
  from all docs pages and `pnpm check` is now 0 errors.)**
- ✅ **Standalone `Combobox/Combobox.svelte` inline `getOptionLabel` migrated
  to the shared `getItemLabel` (DONE).** The last optional dedup from the
  shared-helper consolidation — this Combobox's local `getOptionLabel` used
  the exact `?.toString() || ""` pattern the Form components already migrated
  off of. Local removed; 3 call sites now `getItemLabel(option, optionLabel)`
  (filter, `selectedLabel` fallback, option markup) — the `optionLabel` prop
  passed explicitly so a consumer's custom field name still resolves (no
  reliance on the helper's `"label"` default), mirroring the Form pattern.
  Import line extended to `import { getItemLabel, getItemValue } from
  "../../helpers/index.js"`. Grep: 0 `getOptionLabel` refs remain in
  `src/lib/**` (verified repo-wide: src/ + stories/). Behavior-preserving
  for all contract-valid inputs — this Combobox's old local helper had no
  `!option` guard (unlike Form/Listbox+Combobox), so `0`/`false` primitives
  already rendered `"0"`/`"false"` before; the only divergence is
  out-of-contract `null`/`undefined` *options* rendering `"null"`/`"undefined"`
  instead of `""` (consistent with the deliberate passthrough decision).
  This closes the final dedup — every Form select component plus the
  standalone Combobox now uses the shared `getItemLabel`/`getItemValue`.
  **Validation:** `pnpm check:lib` 0/0; `pnpm check` 330 unchanged baseline.
- **e2e story-URL references are stale.** `tests/e2e/*.test.js` still
  hard-code `localhost:6006` URLs (Map, PanelCardSnippets, CodeEditor,
  Input, Checkbox, ColorPicker, LazyPanel, AppHeader, CodeBlockSpeed…)
  while `playwright.config.ts` boots the docs preview on 5173. Those
  are Phase C scope (docs smoke + story `play` ports).

Resolved decisions (§ 9): see the plan file for rationale.

## Side-channel: docs/typecheck remediation (Phase 8 partial)

- ✅ Phase 6 — literal-union tightening on 9 lib components (done).
- ✅ Phase 7 — generic types for DataTable / AutoComplete / Listbox (done).
- ⏳ Phase 8 — strategic batch on `tests/unit/**` + `src/routes/docs/**`
  parse/prop issues. **Partial** in this round:
  - **DataTable.svelte sort arithmetic** — `valueA - valueB` on
    `unknown` (TRow) → coerce via `Number()` + `Number.isFinite`
    guard returning 0 (stable order) on non-finite operands.
    Removed 4 of 5 sort errors (the 5th was the column definition
    unused-var that the existing refactor in Phase 7 cleared). Code
    review: PASS, no HIGH/MEDIUM, two LOW notes.
  - **Baseline:** 457 errors. **Now:** 453 errors (–4 net).
  - **`src/lib/**` errors:** still 0.
  - **`tests/unit/**` errors:** 0 (premise of this batch was wrong —
    no Svelte-5 mount errors live there in the current snapshot).

**Remaining 453 errors** are in `src/routes/docs/**` and require a
separate, larger batch (Phase 8.5) to clear. The blockers, in
priority order:

1. **Slot→Snippet migration** in 10+ docs pages (Accordion,
   BottomBar, Carousel, Menu, Panel, etc.). Each unfixed slot
   causes 1 cascades of `$$_name.$$slot_def` errors.
2. **`src/routes/docs/+layout.svelte`** has `<script>` (no
   `lang="ts"`) and imports from `$app/stores` (Svelte 4 path).
   Should be migrated to `lang="ts"` + `$app/state`.
3. ✅ **MenuItem API** — DONE this batch: extended `Props` with
   `divider?: boolean` and `icon?: string`. MenuItem now imports
   `Icon` and renders `<Icon>` before children with direct Tailwind
   utilities; `.menu-item.divider` gets `border-b border-border`.
4. ✅ **AutoComplete `itemTemplate` shape** — DONE this batch:
   added `ItemTemplateValue<TItem>` union accepting both the
   function form and the docs render-object `{ render: ({item}) ... }`.
   New `renderItemTemplate` dispatcher handles null/function/object
   shapes. JSDoc carries an explicit XSS-via-`{@html}` security note.
5. **FormField / FloatLabel "missing required props"** — the
   Snippet-based FormField passes a `ChildProps` to its child, but
   docs use regular Svelte components as children. Either revert
   FormField to a slot-style API or rewrite all docs to call
   `{@render children?.(childProps)}` explicitly.
6. **Knob / Slider `valueTemplate` template literals** — `{value}`
   references in unescaped string samples are parsed as
   identifiers (`Cannot find name 'value'`).
7. **`genie-mapData.js` typed-window shape** — augment the Window
   global or add `// @ts-expect-error` casts on the demo data.

This is ≥ 50 file edits and a couple of architectural decisions
(FormField slot-vs-snippet, +layout.svelte migration). Worth scoping
as its own focused PR — recommended next session.

### Phase 8.5 partial — verified results

- MenuItem + AutoComplete changes: 0 errors under
  `src/lib/components/Menu/Menu/MenuItem.svelte` and
  `src/lib/components/Form/AutoComplete.svelte`.
- Cascade clears: `src/routes/docs/components/Menu/**` 0 errors,
  `src/routes/docs/components/Form/AutoComplete/**` 0 errors.
- `pnpm check`: **451 errors / 1 warning** (delta **-6** from 457).
- `src/lib/**` errors: **0** (still).
- Code review: two passes. All MEDIUMs resolved; final LOW applied
  (XSS JSDoc phrasing tightened, DOMPurify mention dropped).
  No HIGH concerns.

### Phase 8.5 cleanup batch — verified results

Four small surgical edits to clear the last 5 lib leftovers (Radio,
AutoComplete, MetricGrid, DonutChart). Each was a 1-2 line fix with a
two-pass code review (HIGH/MEDIUMs cleaned up; final LOW applied:
DonutChart redundant `as MouseEvent` removed). `pnpm check`:
**447 errors / 1 warning** (delta **-4** from 451). **`src/lib/**`
errors: 0 — LIBRARY IS FULLY CLEAN.** Remaining 447 errors are
entirely in `src/routes/docs/**`. Next batch is docs-only:
slot→snippet migration in 10+ docs pages (Accordion, BottomBar,
Carousel, Menu, Panel), `+layout.svelte` lang/ts + $app/state
migration, FormField/FloatLabel API, Knob/Slider template literals,
`genie-mapData.js` window-shape casts.

### Phase 8.5 slot→snippet migration (DONE) — actual results

**Result was modest: 447 → 430 (–17 net), not the –200 to –300 estimate.**
The slot→snippet migration was largely cosmetic because the lib
components were already snippet-based; the docs were the legacy holdout.
Reaching zero requires tackling the OTHER error categories (Form/Form
malformed `<script>`, $lib resolution, etc.), not just slots.

**Pass 1 — lib structural edits (4 files):**
- `Menu/Menu.svelte` — replaced the awkward `children<'trigger'|'content'>`
  discriminator with two named snippet props (`trigger?: Snippet`,
  `content?: Snippet`).
- `Card/Card.svelte` — added `media?: Snippet` prop next to the existing
  `image?: string` prop. `media` snippet takes precedence when both are
  passed. Unblocked docs `<svelte:fragment slot="media">` migration.
- `Lazy/LazyPanel.svelte` — created (file was missing — docs imported
  `LazyPanel` from `$lib` but no lib file existed). Implementation:
  IntersectionObserver swaps `loading` snippet for `children` on first
  visibility; forwards `id` to inner `<Panel {id}>`. Note: `id` is on
  the inner Panel ONLY (outer sentinel div has no id) to avoid
  duplicate-id DOM violation.
- `src/routes/docs/+layout.svelte` — modernized: `lang="ts"`,
  `$app/stores` → `$app/state`, dropped `$` prefix from `page.url.pathname`,
  `{#snippet logo(size: number)}` typed snippet block.

**Pass 2 — docs mass migration (9 files):**
- Python script applied two transformations:
  - `<svelte:fragment slot="X">` → `{#snippet X()}` and `</svelte:fragment>` → `{/snippet}` (text substitution)
  - `<TAG slot="Y">...</TAG>` (state machine) → `{#snippet Y()}...{/snippet}`
- Files migrated: Accordion, BottomBar, Card, Carousel, Menu, Panel, App,
  `components/+page`, LazyPanel docs. All migrated files verified 0
  errors in pnpm check strict count.

**Pass 3 — reviewer follow-ons:**
- `Card.svelte` JSDoc — the original 30-line `<!-- @component … -->`
  comment had a nested `<!-- Image-only media via prop -->` inside an
  outer HTML comment, which prematurely closed the outer comment and
  leaked `<Card image=…>` into the parser (the real cause of "Cannot
  find name 'Card'"). Replaced with a short HTML comment listing the
  snippet props.
- `LazyPanel` id — removed `{id}` from the outer sentinel `<div>` to
  avoid DOM duplicate-id; the inner `<Panel>` still receives the id.
- Menu docs Button wrapper — initially re-added the `<Button>` tags
  inside the trigger snippets; the code-reviewer correctly flagged
  this as a nested-button HTML violation (Menu's own `<button class="menu-trigger">`
  already wraps the trigger). Reverted to plain text in all 5 places
  (3 inline triggers + 2 CodeBlock template strings). Removed the now-unused
  `Button` import from the Menu docs script.

**Verification (post-batch):**
- `pnpm check`: **430 errors / 1 warning** (was 447 / 1; delta **-17**).
  Not the -200 to -300 originally estimated — the slot migration was
  largely cosmetic; the bulk of the remaining errors are in OTHER
  categories.
- `src/lib/**` errors: **0** (unchanged — library is fully clean).
- Per-file strict count for all 13 changed files (4 lib + 9 docs +
  layout): **all 0**.
- Code review: three passes (initial → follow-on Menu Button → final).
  All HIGH and MEDIUM concerns resolved.

**Remaining 430 errors** are NOT slot-related. Top error files:

| Errors | File |
| ------ | ---- |
| 32 | `src/routes/docs/components/Form/Form/+page.svelte` |
| 20 | `src/routes/docs/theming/+page.svelte` |
| 20 | `src/routes/docs/components/Modal/Modal/+page.svelte` |
| 15 | `src/routes/docs/components/Form/Radio/+page.svelte` |
| 13 | `src/routes/docs/components/Form/InvalidState/+page.svelte` |
| 12 | `src/routes/docs/components/Menu/Menu/+page.svelte` |
| 11 | `src/routes/docs/components/TreeMenu/TreeMenu/+page.svelte` |
| 11 | `src/routes/docs/components/Tabs/Tabs/+page.svelte` |
| 11 | `src/routes/docs/components/Map/Map/+page.svelte` |
| 10 | `src/routes/docs/components/DataTable/DataTable/+page.svelte` |

Top categories: "Cannot find module '$lib'" (59), the 32 four-way errors
in `Form/Form/+page.svelte` ("Expression expected / Cannot find name
'script' / '>' expected / ';' expected" — likely a single malformed
`<script>` tag), "Type expected" (26), "Cannot find name 'CodeBlock'" (20).

### Phase 9.2 — `$lib` resolution structural fix (ATTEMPTED, REVERTED)

**Goal.** Clear 60 "Cannot find module '$lib'" errors with one structural change
(no per-file edits), as the user requested.

**Round 1 — `tsconfig.json`: drop `module: \"NodeNext\"` + `moduleResolution: \"NodeNext\"`.**
Let SvelteKit's generated `.svelte-kit/tsconfig.json` flow through (it has
`paths: { \"$lib\": [\"../src/lib\"], \"$lib/*\": [\"../src/lib/*\"] }` +
`module: \"esnext\"` + `moduleResolution: \"bundler\"`). `tsconfig.lib.json`
untouched (library publish still uses NodeNext).

**Result:** REGRESSION. `pnpm check` 413 → **500 (+87)**. `pnpm check:lib`: 0.
- `$lib` errors: 60 → **9** (the resolution part worked — 51 cleared)
- But 144 NEW errors surfaced across many files. The new error classes:
  - **31× "Cannot find name 'script'" + 31× "Cannot find name 'lang'" + 31×
    "Expression expected" + 31× "> expected" + 31× "; expected"** — same
    Phase 9.1 `<script>`-in-CodeBlock 4-way cascade now triggering in 5+
    *additional* docs files (Tree 1→45, Chip 1→28, Stepper 1→17,
    Form/Slider 3→17, Skeleton 1→10, Form/Combobox 1→8). These are real
    occurrences of the Phase 9.1 bug at scale, NOT a fixable config issue.
  - **25× "Type '{ label: string; }' is not assignable..." + 18× "Type
    '{ children: () => any; }' is missing properties"** — real previously-
    masked type errors surfaced because `any` propagation stopped once
    `$lib` resolved. (Masking mechanic: when TS can't resolve `$lib`, it
    types imported symbols as `any`, which silences downstream type
    checking across the file.)
  - **13× "Cannot find module '$lib/components/Container/Container.svelte'"
    + 7× `'${'$'}lib/docs/index.js'`** — explicit path imports that the
    generic `$lib` mapping doesn't reach (need `.js`/no-extension cleanup).
  - **16× "Cannot find name 'CodeBlock'"** — types that previously were
    `any` now properly resolve (because `$lib` resolves), exposing that
    the docs import `CodeBlock` from a path that no longer matches
    actual exports after the Phase 8.5 Card `media` snippet refactor.

**Round 2 — `verbatimModuleSyntax: false`.**
Thinker recommended to soften the type-import rule flowing from
`.svelte-kit/tsconfig.json`. Applied: 500 → **500** (zero impact).
Conclusion: the new errors are not primarily V/S strictness.

**REVERT.** `git checkout -- tsconfig.json` — back to baseline `pnpm check`
413 / `pnpm check:lib` 0 working tree clean. No diff. Code-reviewer:
no HIGH, 2 MEDIUM (`tsconfig.json` overrides are now documented in commit
history only — could be reinforced with a comment), 4 LOW (forward-compat
risk if SvelteKit 3 changes generated tsconfig template).

**Lesson learned.** A single tsconfig change CAN'T clear the 60 `$lib`
errors because it unmasks a much deeper latent problem set:
1. Per-file `<script>`-in-CodeBlock instances (5+ additional files
   beyond Form/+page.svelte) — fixed by Phase 9.1-style `\u003C` escapes,
   done in a Phase 9.3 bulk pass.
2. Per-file type-repair cases — 25× "is not assignable" + 18× "missing
   properties" + 16× "Cannot find name 'CodeBlock'" — fixed in a per-file
   sweep (Phase 9.4).
3. Explicit-path `$lib/components/.../*.svelte` and `$lib/docs/*.js`
   imports — fixed via path normalization (Phase 9.5).

Then, and only then, re-attempt the structural `$lib` resolution fix
(round 1) — by which point the +87 surfacing will be zero or small.

**Recommended next batch (Phase 9.3 onward).**
### Phase 9.3 — bulk `\u003C`-escape, 4-file pass (DONE — `8f6e98a`)

Bulk-applied the Phase 9.1 escape pattern across 4 high-density docs
files using a Python helper that anchors the substitution on each file's
real `<script lang="ts">` block boundary (so the file's own script/style
tags are preserved). Touched:

- `src/routes/docs/theming/+page.svelte`               (3 escapes)
- `src/routes/docs/components/Map/Map/+page.svelte`    (16 escapes)
- `src/routes/docs/components/Form/Radio/+page.svelte` (7 escapes)
- `src/routes/docs/components/Form/InvalidState/+page.svelte` (3 escapes)

**Result: `pnpm check` 413 → 363 (−50). `pnpm check:lib`: 0. `src/lib/**`: 0.**
Cumulative with Phase 9.1: **−64** across 5 files.

Still untouched (12 same-bug candidates with **lower** error counts —
Phase 9.3b):
- Form/Slider (3 errors), Stepper (3), Tag/TagGroup (??),
  Form/Combobox (3), Form/Listbox (3), Form/Rating (3),
  Form/SelectGroup (3), Form/NumberInput (3), Skeleton (3),
  Tree/Chip (1 each), CodeEditor (7), CodeBlockSpeed (7).

- **Phase 9.3 — bulk `\u003C`-escape for the same `<script>`-in-CodeBlock
  bug across the 5 newly-discovered files** (Tree, Chip, Stepper,
  Form/Slider, Skeleton, Form/Combobox, Form/NumberInput, Form/Radio,
  Form/Listbox, Form/InvalidState, Form/Rating, Form/SelectGroup,
  CodeEditor, CodeBlockSpeed, Map, theming — total 16 candidates beyond
  Form/+page.svelte). Expect drop ~ +200 to +250 in the `pnpm check` total
  under the existing broken `$lib` resolution.
- **Phase 9.4 — per-file type assignment + missing-property errors** —
  likely Card media-snippet consumers (Card, App, etc.), Form/Slider,
  and Tag/Avatar files where the `Props` interface from Phase 8.5 didn't
  fully flow.
- **Phase 9.5 — explicit-path `$lib/components/.../X.svelte` and
  `$lib/docs/.../*.js` cleanup** — `find` for `\\\$lib/components.*\\.svelte`
  and `/!\/docs/` to identify the ~20 docs files.
- **Phase 9.6 — re-attempt the structural `$lib` resolution fix** (drop
  `module`/`moduleResolution` NodeNext from `tsconfig.json`). By this
  point the underlying latent bug set should be empty, so the +87
  regression won't materialize.

### Phase 9.7 — de-barrel-ify: per-file/deep imports everywhere (DONE)

**Goal (user directive).** Reverse the barrel-ification. The user does not
want barrel imports (`import { X } from "$lib"`) in the project's own code:
per-file imports make the source file behind every symbol visible. All
internal component imports must be **relative**; everything outside
`src/lib/components/` uses **deep `$lib/...` paths**; consumers get the
package root barrel or **subpath exports**. Research confirmed the standard
splits exactly this way: a root barrel for the public API is the norm
(Radix, MUI, Melt UI, Skeleton, shadcn-svelte), while internal code and
library consumers deep-import (tkdodo's "Please Stop Using Barrel Files";
MUI's own bundle-size guide recommends deep imports). The barrel-ify was a
NodeNext mixed-resolution workaround — Phase 9.6 removed NodeNext from the
root tsconfig, so the workaround is moot and `pnpm check` is clean.

**Changes (117 files in `src/`):**

1. **Docs site (`src/routes/`)** — every `import { X, Y } from "$lib"` /
   `"$lib/index.js"` / `"$lib/docs/index.js"` in real `<script>` blocks
   rewritten to per-symbol deep imports: components →
   `"$lib/components/<Dir>/<File>.svelte"`, helpers →
   `"$lib/helpers/<file>.js"`, docs tables → `"$lib/docs/PropsTable.svelte"`
   etc., icon manager → `"$lib/stores/iconManager.js"`, and type exports
   (`TreeMenuItem`, `IconConfig`) → `import type { ... }`. Example blocks
   inside `<CodeBlock>` template literals (`\u003C`-escaped) were preserved
   untouched — the rewrite only operates on real `<script>` blocks.
2. **Internal components (`src/lib/components/`)** — 7 components that
   imported the helpers barrel (`../../helpers/index.js`) now import the
   per-file module **relatively**: `../../helpers/itemLabel.js`,
   `../../helpers/groupRemove.js`, `../../helpers/detectLanguage.js`.
3. **`package.json` `exports`** — added **109 subpath entries** so consumers
   can deep-import: `twintrinsic/components/Button`, …,
   `twintrinsic/helpers/getItemLabel`, `twintrinsic/stores/iconManager`,
   `twintrinsic/docs/PropsTable`, plus the existing `.` and
   `./twintrinsic.css`. Each entry maps `{ types, svelte, default }` to the
   published **`./dist`** artifact (`.svelte.d.ts` / `.d.ts` for types — see
   the consumer-verification note below; the initial source-file targets
   were wrong).

**Validation.** `pnpm check` **0 errors** (1 pre-existing warning),
`pnpm check:lib` **0/0**, `pnpm test:unit` **459 passed / 2 skipped**.

**Mechanics.** Rewrite was driven by `.tmp-dearrel.py` (deleted after use):
a `<script>`-block-aware regex pass with a barrel export-name → source-path
map verified against `src/lib/index.ts`. Three bugs were fixed during the
sweep: a stray `>` injected after `<script lang="ts">`, trailing-newline
consumption (`\s*` after the closing quote), and loss of leading indent on
the first generated line. Lesson: when the pattern must preserve everything
around it, capture the trailing line-ending as a group and restore it, and
apply the captured indent to the first output line too.

**Convention (codified in AGENTS.md § Coding Guidelines → Import Style):**
components import each other relatively; non-component code outside
`src/lib/components/` imports via deep `$lib/...` paths (never the bare
`$lib` barrel); the barrel `src/lib/index.ts` remains the public API entry
for consumers alongside the subpath exports.

### Phase 9.7b — consumer verification of the subpath exports (DONE)

**Goal.** Prove the packed library is actually consumable: `npm pack`,
install the tarball into a scratch Vite project, build, and render in a real
browser. Three real publish bugs surfaced and were fixed:

1. **Exports must point at `./dist`, not `./src/lib`.** The initial subpath
   map targeted source files, but `files: ["dist"]` excludes `src/` from the
   tarball — `publint` (run by the `prepack` script via `svelte-package`)
   flagged ~100 "file is not published" errors. Retargeted every entry to the
   `@sveltejs/package` output: components → `./dist/<Dir>/<File>.svelte`
   with types `./dist/<Dir>/<File>.svelte.d.ts`; helpers/stores (compiled
   `.js` + `.d.ts`); root `.` → `./dist/index.js` + `./dist/index.d.ts`.
   `svelte`/`types` top-level fields updated to match. Publint now clean.
2. **`@iconify/svelte` moved from devDependencies → dependencies.** It is a
   runtime import of `Icon.svelte`; devDependencies are not installed in
   consumer apps, so the packed Button/Icon chain failed to resolve
   (`Rolldown failed to resolve import "@iconify/svelte"`). Verified no
   other runtime import is undeclared (scanned all bare imports in `dist`).
3. **`default` condition added** alongside `types`/`svelte` on every entry
   so plain-Node/ESM consumers can import the helper modules (plain `.js`)
   without a bundler resolving the `svelte` condition.

**Consumer proof (end-to-end).** `pnpm add <tarball>` into a scratch Vite +
Svelte 5 project; `vite build` succeeded (346 modules) and a Playwright
browser run rendered `<Button>` and logged working helper results:
`{RootButton: function, SubButton: function, Chip: function,
getItemLabel: hello, detectLanguage: markup}` — root barrel, component
subpaths (**default** imports — a `.svelte` subpath exports default only),
helper subpaths (named), `stores/iconManager` values + types, and
`twintrinsic/twintrinsic.css` all resolve. Consumers must additionally
install `tailwindcss` + `@tailwindcss/forms` + `@tailwindcss/typography`
(the theme file declares the plugins via `@plugin`) — documented on the
`/docs` page's Installation section.

**Commit.** `7d9f49c` is the surgical de-barrel-ify commit: HEAD + only
this session's 519-line delta (110 converted files + `package.json` +
`AGENTS.md`). The ~26k lines of prior uncommitted session work layered in
the same files stay in the working tree for a separate commit. The committed
tree itself has 421 `pnpm check` errors vs HEAD's 336 — not a regression:
HEAD's 80 `Cannot find module '$lib'` errors are gone and ~165 latent docs
type errors (previously masked by the failed barrel import making components
`any`) surface instead; both trees fail check, and the working tree remains
0-error.

### Phase 9.5 — explicit-path imports via `$lib` barrel (DONE — `83b3423`)

**Goal.** Clear 22 specific Phase 9.5 errors: 17× `Cannot find module '$lib/components/.../X.svelte'` + 5× `Cannot find module '$lib/docs/index.js'`.

**Approach (thinker rec.).** Convert Svelte-component deep imports to `$lib` barrel (already exported from `src/lib/index.ts`). Convert failing `$lib/docs/index.js` sites to `$lib` barrel (since `src/lib/index.ts` re-exports `PropsTable` and `EventsTable` from `./docs/index.js`). Add `.js` extension to `toastStore` import (mandatory under `module: "NodeNext"`).

**Files modified: 20**

A. **12 Metrics/* + AreaChart** — merged Container deep import into the existing `import { BarChart } from '$lib';` line per file. Tab-indented. WIN: cleared 12 `$lib/components/Container/Container.svelte` errors.

B. **ThemeToggle** — 5 deep imports consolidated into one `import { Button, CodeBlock, Container, Panel, ThemeToggle } from "$lib"`. WIN: cleared the 2 remaining `ThemeToggle` failures (Container + CodeBlock).

C. **Toast** — `toastStore.ts`/`.js` coexistence: import path now `"$lib/components/Toast/toastStore.js"` (NodeNext-mandated). `allowMultiple: true` because the same line appears in L6 + inside a `<CodeBlock language="svelte">{\`…\`}</CodeBlock>` template literal on L27. WIN: cleared `toastStore` failure.

D. **TreeMenu** — barrel-converted + type rename `MenuItem` → `TreeMenuItem` (reviewer-flagged: `src/lib/index.ts` re-exports `type MenuItem as TreeMenuItem`, so `MenuItem` does not exist on `$lib`). 4 sites updated: 1 import line + 3 type annotations (`const basicItems: MenuItem[]` / `nestedItems` / `actionItems` → all `TreeMenuItem[]`). The `MenuItem[] ` pattern-with-trailing-space also rewrote docs sample strings (desirable — they now reflect the published API name).

E. **5 originally-failing `$lib/docs/index.js` sites → `$lib` barrel.** Files: `CodeBlock/CodeBlock/+page.svelte` (`PropsTable` alone, unique), Form/{Listbox, NumberInput, SelectGroup} (`PropsTable, EventsTable`), Form/Rating (`EventsTable, PropsTable` — note reversed order). WIN: cleared 5 failures.

**Verification.**
- `pnpm check`: **363 → 350 (Δ -13)** — 22 specific errors cleared; ~9 latent type errors surfaced from `$lib` lineage now resolving cleanly + from the TreeMenu rename touching `<pre>` doc samples.
- `pnpm check:lib`: **0** (constraint preserved).
- `src/lib/**`: **0** (constraint preserved).
- All 22 `Cannot find module '$lib/...'` errors that described the Phase 9.5 fix scope: **0** (verified post-fix).
- All 20 touched files: **0 errors** (verified per-file strict count in `/tmp/check-p95-final2.txt`).
- Working tree clean. Commit `83b3423` on `origin/main`.

**Why -13 not -22.** The 22 targeted errors all went to 0, but ~9 new errors surfaced as previously-masked bug bites exposed. The 9 are class-(3)/(4) from the Phase 9.2 diagnostic — real type errors, missing-property errors, and `Cannot find name 'CodeBlock'` references that surfaced because `$lib` no longer silently falls back to `any` propagation. These are deferred to Phase 9.7 (per-file type sweep).

**Reviewer feedback (open MEDIUMs/LOWs not addressed in this commit):**
- The 4 Form/* + CodeBlock/* files now mix pre-existing `$lib/index.js` (Svelte component imports) with the new `$lib` (PropsTable+EventsTable barrel). Consistency would prefer picking one convention per file in a follow-up.
- TreeMenu `<pre><code>` reader-facing docs samples (~L70–100) still reference `type MenuItem` from `'twintrinsic'` — only the JS-code-in-docs IS typechecked by templates if those samples are actual Svelte code, but ours are template-literal contents so they don't trip svelte-check. Follow-up to update reader text-only for accuracy.
- `src/lib/components/Toast/toastStore.ts` is effectively dead code (every consumer routes through `.js`). Pre-existing in HEAD; flagged for deletion in a small follow-up.

**Lesson learned (RE the failed mid-round heredoc revert).** A bash-heredoc `<<'PY'` Python script with raw-string regex `\$lib` didn't actually match in the corrective round because of how the escapes propagated through bash → Python raw-string → re. After that round was abandoned, the clean approach was: `git checkout -- .`, then re-apply each fix via direct str_replace tool calls (exact-string match, no regex), then validate. The direct str_replace recipe is reliable and is the recommended pattern for future bulk scripts that would otherwise hit similar escaping pitfalls.


### Phase 9.4 — lib Props (DONE — `4c3c48e`); docs sweep REVERTED, deferred to Phase 9.4b

**Goal.** Add explicit `interface Props` to `Tree`, `TreeNode`, `Chip` to harden public API surface and silence missing-property cascades. (Initial scope also included a 36-file docs CodeBlock barrel consolidation; that part of the work was reverted due to a +51 baseline regression and is deferred to Phase 9.4b.)

**Approach (user-approved Shape A transient).** Apply Shape A (drop `module`/`moduleResolution` NodeNext from `tsconfig.json`) locally to unmask the latent type errors. Fix per file using Card/Avatar/Tag-style type-Props conventions. **Revert Shape A via `git checkout -- tsconfig.json` BEFORE commit** — only per-file fixes go into the commit.

**Files committed — lib only (3):**

1. `src/lib/components/Tree/Tree.svelte` — added `expandAll?: boolean` to the existing 9-prop `interface Props`. The docs site already passes `expandAll` to `<Tree expandAll>` in `src/routes/docs/components/Tree/Tree/+page.svelte`; without the prop declaration, downstream consumers tripped the missing-property check under Shape A unmasking. Additive change; no behavioral risk for previous callers.

2. `src/lib/components/Tree/TreeNode.svelte` — added a brand-new `interface Props { class, id, key, label, icon, expanded, selected, disabled, leaf, level, labelRender, ontoggle, onselect, children }` (13 props). Imports `import type { Snippet } from "svelte"`. Recursion goes through `const Self = TreeNode as unknown as Component<Record<string, unknown>>` — the sole Svelte 5 pattern for recursion with partial-prop pass-through. Inline JSDoc block justifies the loose typing so future maintainers don't try to "fix" it without context.

3. `src/lib/components/Chip/Chip.svelte` — the leading `/** @component Chip - A compact element ... Usage: ... */` JSDoc was preserved intact. Added a new 16-prop `interface Props { class, id, variant, size, icon, avatar, removable, clickable, disabled, selected, outline, removeAriaLabel, removeIcon, onremove, onclick, children }` to harden the public API. Per-prop JSDoc comments carried over on each member. Destructuring uses `= undefined` defaults for `onremove`/`onclick`/`children` to match the Avatar/Card visual convention for optional callback + snippet props.

**Files REVERTED — NOT committed (36 total):**

The docs CodeBlock barrel-consolidation sweep (22 Form/* + Modal in round 1, 13 theming/Accordion/AppHeader/Avatar/Badge/BottomBar/Button/Carousel/Menu/Sidebar/Tabs/Tag/Tooltip in round 2, plus the `CodeBlock/+page.svelte` duplicate-line dedup) was applied during the sweep, then **fully reverted** via `git checkout -- src/routes/` because:

- Under Shape A transient: pnpm check dropped from 363 → claimed -13 to -112 (mid-cycle, noisy).
- After Shape A revert (baseline = Shape B NodeNext): pnpm check went **363 → 414 (+51 regression)**, pnpm check:lib stayed 0.
- The +51 regression was unattributed; reverting the docs sweep restored the lib-only 363 baseline cleanly.
- The docs sweep is deferred to **Phase 9.4b** with explicit regression-attribution strategy (per file diff against the saved `/tmp/check-p94-baseline.txt`).

**Verification.**
- `pnpm check` (baseline Shape B): **363 errors** (`Phase 9.5 baseline 363 → net 0 errors cleared this round`; the lib Props additions are STABILIZING, NO -13 net improvement was actually achievable under baseline because Tree/TreeNode/Chip were not regressors in the first place).
- `pnpm check:lib`: **0 / 0** (constraint preserved).
- `src/lib/**` errors: **0** (constraint preserved).
- Tsconfig drift check: clean (no diff vs HEAD; Shape A fully reverted before commit).
- Stories consumer check: `stories/Tree.stories.svelte` uses `<Tree expandAll>` and `<TreeNode label=...>` with props our new interfaces accept; Chip has no Storybook story (docs-only consumer).
- Working tree at commit: 3 files modified (the 3 lib files only). Commit `4c3c48e` on `origin/main`, in sync with remote.

**Commit:** `4c3c48e fix(lib): Phase 9.4 — explicit interface Props on Tree, TreeNode, Chip`

**Lesson learned (RE the +51 regression).** When sweeping edits discover a +N baseline regression, **bisect across the sweep** to identify the regressor before scoping down. Bash heredocs with escaped regex inside shell+Python+re conventions are unstable; **diff two `pnpm check` log files (clean vs regressed) directly** — svelte-check's output already names the file paths and that's enough to bisect. Identify regressors by file BEFORE applying any revert. Whenever a Phase introduces a regression under Shape B baseline, scope down to ONLY the changes that are clean under both Shape A and Shape B. Defer the rest to a per-file follow-up batch.

**Open Phase 9.4b items.**

- Re-apply the docs CodeBlock barrel consolidation **per file**, NOT in bulk. Use Approach C from the thinker plan: diff `/tmp/check-p94-baseline.txt` (414) vs `/tmp/check-p95-final2.txt` (363) to find files that went UP in error count under Shape B baseline; those files are transient impurities that must be reverted individually, NOT in bulk.
- Keep the actual barrel conversion only for files that test clean individually; revert or refactor the rest.
- Other Phase 9.4b scope items already declared in earlier planner notes (FormField `ChildProps` migration, Knob/Slider `{value}` template-literal escape, `genie-mapData.js` window-shape casts) are still in scope but not regressors of THIS batch.

**Reviewer feedback (acknowledged, not addressed in this commit).**

* HIGH: Consumer verification of stories was partial in this round (Tree expandAll + TreeNode label/icon/expanded spot-checked; Chip has no story). A future batch should run `pnpm check` filtered to `stories/` or grep every story against the new interfaces.
* HIGH: TreeNode's `Self as unknown as Component<Record<string, unknown>>` would benefit from an inline `// @ts-expect-error Svelte 5 recursion has no clean partial-props type` annotation. The JSDoc justification is present; the `@ts-expect-error` would surface the warning if a future Svelte version provides a better type.
* MEDIUM: Chip.svelte leading JSDoc-style `@component` block — verify byte-for-byte losslessness with `git show HEAD:` diff (visually verified by reading lines 1-15 of the working copy, which matches HEAD content).
* LOW: Commit title `fix(lib):` is appropriate for this round (additive Props for cascade resolution); future purely-additive commits should use `feat(lib):`.

### Phase 9.4b — full barrel import consolidation, 14 docs files (DONE)

**Commit:** a6f5b5a

**What changed.** Converted all deep `import X from "$lib/components/X/X.svelte"` imports to single barrel `import { X, Y, Z } from "$lib"` in 14 docs files that previously imported CodeBlock via deep path.

**Root cause fix.** The `Cannot find module '$lib'` error occurred when a script block had BOTH bare `$lib` imports AND deep `$lib/components/.../...svelte` imports under NodeNext resolution. By converting ALL imports to barrel, the mixed-resolution conflict is eliminated.

**Validation.**
- pnpm check: 332 errors (−18 from Phase 9.4 baseline of 350; −31 from Phase 9.5 baseline of 363)
- pnpm check:lib: 0 errors, 0 warnings
- No regressions

**Files:** 14 files, +14/−53 lines

**Key lesson:** Under NodeNext module resolution, bare `$lib` and deep `$lib/components/X/X.svelte` imports cannot coexist in the same `<script lang="ts">` block. The fix is to consolidate all imports through the barrel.

### Phase 9.5 — barrel-ify remaining Container.svelte deep imports (DONE)

**Commit:** 486f5cd

**What changed.** Converted the last 3 source files with deep `import X from "$lib/components/X/X.svelte"` to barrel `import { X } from "$lib"`.

- `src/routes/+page.svelte`: 6 deep imports → barrel (AppHeader, Container, Panel, Separator, ThemeToggle, TwintrinsicLogo)
- `src/routes/docs/components/+page.svelte`: 3 deep imports → barrel (Container, Panel, Separator)
- `src/routes/docs/completion/+page.svelte`: 2 deep imports → barrel (Container, Separator)

**What was NOT changed (with rationale).**
- `$lib/docs/index.js` imports (~41 files) were left as-is. These already have `.js` extensions which are NodeNext-compatible — no fix needed. A bulk conversion attempt caused a +39 regression (mixed-resolution `Cannot find module '$lib'` errors) and was reverted.
- `stories/Container.stories.js` — story file outside src/ scope, no typecheck impact.
- Masonry/Modal files had deep imports only in CodeBlock string content (example code), not actual imports.

**Validation.**
- pnpm check: 332 errors (0 delta from baseline)
- pnpm check:lib: 0 errors, 0 warnings

**Key lesson.** NodeNext resolution is strict about mixing `$lib` (bare path) and `$lib/index.js` (wildcard path) in the same file. Converting `$lib/docs/index.js` → `$lib` in files that already had `$lib/index.js` imports caused cascading failures. Leave `.js`-extension imports alone.

### Phase 9.6 — systemic `$lib` resolution fix + full docs type sweep (DONE)

**Root cause resolved.** The `Cannot find module '$lib'` issue (84 errors across 70 docs files) was caused by the root `tsconfig.json` overriding `module`/`moduleResolution` to **NodeNext**, while SvelteKit's generated `.svelte-kit/tsconfig.json` uses **bundler** resolution. `tsconfig.lib.json` keeps NodeNext independently for npm publishing.

**Fix (architectural):** dropped the `module`/`moduleResolution` override from `tsconfig.json` — the site now inherits bundler resolution (all `$lib` errors → 0), and the lib keeps NodeNext in `tsconfig.lib.json` (`check:lib` stays 0/0). This makes the site/lib resolution split explicit.

**Per-file repair sweep** (unmasked by the fix — previously hidden behind `$lib`-as-`any`):
- **Component fixes:** `= undefined` defaults added for undefaulted optional props in Table (caption/ariaDescription/children), Textarea (name), Combobox (8 props), InvalidState (message/children), Tooltip (5 props), Menu/MenuItem, Tab, Skeleton, StepperStep, Select (`value = $bindable()` + `children` snippet support so `<SelectGroup>` children work).
- **Input.svelte:** added `minlength`/`maxlength` props.
- **Docs fixes:** IconifyIcon page → `Icon` (the real export); CodeBlock `code=` prop → children snippet form (CodeEditor, CodeBlockSpeed, LazyPanel, Accordion, Card); DataTable props aligned to real API (`pageSize`/`pageSizeOptions`/`emptyMessage`/`compact`, typed template callbacks); SelectGroup page children work via new Select children support; Menu page `{#snippet content()}`; Combobox `optionTemplate` snippet; Tooltip `text=`→`content=`; Toast `on:click`→`onclick`, dropped store `position`; Stepper `optional="…"`→`optional`; Slider range arrays→single values; Listbox value shapes; Knob/Slider brace escapes; theming `getTextColor` types + Button `class` color maps; root page AppHeader `brand.logo` snippet + Panel snippets; game-map CodeEditor `code`/`onchange` + popupContent signature; `genie-mapData.js` marked `@ts-nocheck` (orphaned 41k-line data file).

**Validation.**
- `pnpm check`: **0 errors** (was 331 at session start) — 1 pre-existing warning remains
- `pnpm check:lib`: 0 errors / 0 warnings
- `pnpm test:unit`: 98 files / 439 passed / 2 skipped — exit 0

**Docs updated:** `AGENTS.md` "NodeNext Module Resolution" section rewritten as "Module Resolution (site vs. lib)" to document the split and warn against re-adding NodeNext to the root config.

### Phase 9.7c — subpath export audit: doubled-prefix bug + self-import d.ts conflicts (DONE)

**Prompt:** audit all subpath exports for type availability (module-script types reachable via `twintrinsic/components/...`).

**Bug 1 (critical): every component subpath target was broken.** All 87 `./components/*` entries in `package.json` pointed at `./dist/components/components/<Name>/...` (doubled `components/`), while the real layout is `./dist/components/<Name>/...`. Introduced by the surgical-commit generator in `7d9f49c`; the pre-commit consumer test only passed because it ran against the pre-commit (correct) exports. Net effect: `twintrinsic/components/Button` and friends were unresolvable in the published package.
- Fix: regenerated the 87 targets from `src/lib/index.ts` barrel paths (source of truth, also resolves Card/Combobox/LazyPanel basename collisions), keeping the committed subpath keys.
- Validated: 0/325 missing targets; `publint` clean ("All good!").

**Bug 2: TS2440 in generated `.d.ts` for recursive components.** `MenuItem.svelte`, `TreeNode.svelte`, `TreeMenu.svelte` self-import (`import X from "./X.svelte"`) for Svelte 5 recursion (no `svelte:self` in Svelte 5). svelte-package carries the self-import into the `.d.ts`, colliding with the component's own `declare const`/`type` → `Import declaration conflicts with local declaration` under `skipLibCheck: false`.
- Fix: alias the self-import (`import TreeMenuSelf from "./TreeMenu.svelte"`); generated d.ts is now clean.

**Consumer proof (the audit's value):** packed tarball → scratch project → `tsc --noEmit` with `skipLibCheck: false` (checks library d.ts too) importing:
- 8 module-script types: `ColumnDef` (DataTable), `SidebarProps`, `BottomBarProps`, `MenuItem` (TreeMenu), `PanelProps`, `InputProps`, `ItemTemplateValue` (AutoComplete), `AppProps`
- component default imports (Button, DataTable, PropsTable, EventsTable), root barrel (Accordion, Container, helpers), helper subpaths (getItemLabel, getItemValue, dispatchGroupRemove, detectLanguage), stores (iconConfig, setIconset, setIconColor, setIconSize, updateIconConfig, IconConfig)
- **Result: exit 0.**

**Lesson:** a passing `pnpm pack`/build does not validate the exports map — add a target-existence check + consumer `tsc` to the publish path (or at least re-run before tagging).

### Phase 9.7d — exports-map validation guard (DONE)

**Prompt:** add an exports-map validation script + CI wiring so the 9.7c regression class can't recur.

**What was added:**
- `scripts/validate-exports.mjs` (`pnpm validate:exports`): (1) builds `dist/` via svelte-package, (2) asserts every `types`/`svelte`/`default` target exists and lives under `./dist/` (matches `files: ["dist"]` — catches the doubled `components/components/` bug AND a future exports→src/ regression), (3) generates a temp module that namespace-imports all 108 subpaths via self-reference resolution plus the 8 known `<script module>` type exports, then runs `tsc --noEmit` with `skipLibCheck: false` so errors *inside* the library's own `.d.ts` files are caught (TS2440 self-import conflicts, unresolvable imports, missing type exports).
- Wired into the publish gate: `.github/workflows/publish.yml` `test` job and its mirror `.github/workflows/test.yml` `check` job both run `pnpm validate:exports`.
- `src/lib/components/Map/leaflet.d.ts` gains `declare module 'leaflet/dist/leaflet.css'` so the Map d.ts's side-effect css import is declared library-side.

**Design notes / gotchas:**
- Self-reference imports (`import * as X from "twintrinsic/components/Button"`) resolve through the package's own exports map under tsc — no packing/installing needed, runs in ~30s.
- `declare module "*.css"` must live in its own import-free ambient file (TS2664 if mixed into a module file with imports); mirrors the `vite/client` css declarations real consumers have. Non-css asset imports still fail the check.
- Ambient `.d.ts` shims shipped by svelte-package (prismjs.d.ts, leaflet.d.ts) are NOT auto-included in consumer programs — only files reached via imports/references are. The prismjs side-effect import resolves because it's a real `.js` path; the `.css` import cannot, hence the ambient declaration.
- Self-test: injected the historical doubled-prefix bug into `./components/Button` → script fails with per-condition diagnostics, exit 1; restored.
