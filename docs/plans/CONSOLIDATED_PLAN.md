# Twintrinsic — Consolidated Plan

> **Last updated:** August 25, 2026
> This is the single source of truth for all Twintrinsic planning.
> Supersedes all previous plan documents in this folder.

---

## 1. Project Status Overview

| Area | Status | Notes |
|------|--------|-------|
| **Component Library** | ✅ Core complete | 40+ components, all with unit tests, e2e tests, stories |
| **HTML Semantic Replacement** | ✅ Complete | All Tiers 0-2 done (Modal, Tooltip, Menu, Toast, etc.) |
| **CSS-Only Wins** | ✅ Complete | `:has(:user-valid)`, `@starting-style`, `content-visibility` |
| **Icon System** | ✅ Complete | Iconify with preload system, all inline SVGs converted |
| **Storybook Themes** | ✅ Complete | 12 themes (light/dark × brand/HC/colorblind) |
| **Real-World Examples** | ✅ Complete | All stories and docs use production-quality content |
| **Type Errors** | ✅ Resolved | `pnpm check` passes with 0 errors |
| **Build Warnings** | ✅ Resolved | 0 a11y warnings, CI guard in place |
| **Metrics Components** | ✅ Complete | 12 data visualization components |
| **E2E Test Migration** | ✅ Complete | All phases done, 582 e2e tests + 470 storybook tests passing |

---

## 2. HTML Semantic Replacement — Completed

All component migrations from custom JS to native HTML/CSS are done.

### Tier 0: Chrome-Only Platform APIs
| Component | Migration | Status |
|-----------|-----------|--------|
| Modal | `<dialog closedby="any">` + `@starting-style` + `allow-discrete` | ✅ |
| Combobox | `popover="auto"` + CSS Anchor Positioning | ✅ |
| AutoComplete | `popover="auto"` + CSS Anchor Positioning | ✅ |
| Tooltip | `popover="hint"` + `interestfor` + CSS Anchor Positioning | ✅ |
| Select / SelectGroup | `appearance: base-select` + `::picker(select)` | ✅ |
| Textarea | `field-sizing: content` (replaced JS scrollHeight) | ✅ |
| Menu | `popover="auto"` + CSS Anchor Positioning + WAI-ARIA keyboard nav | ✅ |
| Toast | `@starting-style` + `transition-behavior: allow-discrete` | ✅ |

### Tier 1: Replace Immediately
| Component | Migration | Status |
|-----------|-----------|--------|
| Accordion | `<details>` + `<summary>` | ✅ |
| Progress | `<progress>` element | ✅ |
| Separator | `<hr>` element | ✅ |
| CodeBlock | `<pre>` + `<code>` | ✅ |

### Tier 2: Enhance with Semantic HTML
| Component | Migration | Status |
|-----------|-----------|--------|
| DataTable | `<table>` + `<thead>` + `<tbody>` + `<th>` + `<td>` | ✅ |
| Breadcrumb | `<nav>` + `<ol>` | ✅ |
| Timeline | `<ol>` + `<li>` + `<time>` | ✅ |
| Stepper | `<nav>` semantic landmark | ✅ |
| Card | `<article>` (already used) | ✅ |
| Rating | WAI-ARIA slider pattern (kept) | ✅ |
| Input/NumberInput | `field-sizing: content` skipped (width issue) | ⏭️ |
| FormField | `:has(:user-valid)` / `:has(:user-invalid)` added | ✅ |

### Skipped (Justified)
- **Rating** — already follows WAI-ARIA slider correctly, `<input type="radio">` would regress
- **FormField** — uses TanStack Form for custom validators, `:has()` only works with native constraint validation
- **Input/NumberInput** — `field-sizing: content` on width breaks container layouts
- **Theme tokens → `light-dark()`** — library uses `data-theme` attributes, not `color-scheme`
- **Invoker Commands** — not used on Modal triggers (consumers keep `onclick` handlers)

---

## 3. CSS-Only Wins — Completed

| Change | Component | API |
|--------|-----------|-----|
| `:has(:user-valid)` / `:has(:user-invalid)` | FormField | CSS validation styling for native constraint validation |
| `@starting-style` + `allow-discrete` | Skeleton, Calendar, DataTable | CSS-native entry animations |
| `content-visibility: auto` | Skeleton, DataTable, Masonry | Skip rendering off-screen content |
| `accent-color` | Already on `:root` in `twintrinsic.css` | All form controls inherit it |

---

## 4. Icon System

### Architecture
- **Icon component** (`src/lib/components/Icon/Icon.svelte`) wraps `@iconify/svelte`
- **Default iconset**: `tabler` (configurable via `setIconset()`)
- **Icon name format**: `iconset:name` (e.g., `tabler:check`) or just `name` (uses default)

### Preloading
Three strategies available:

```ts
import { 
  preloadIcons,           // Runtime: fetch icons from API ahead of time
  preloadManifest,        // Build-time: register icons from JSON manifest
  addLinkPreloads,        // Link preload: inject <link rel="preload"> tags
  DEFAULT_PRELOAD_ICONS   // Auto-generated list of 20 internal icons
} from 'twintrinsic'
```

- `DEFAULT_PRELOAD_ICONS` contains all 20 tabler icons used by internal components
- `scripts/generate-icon-manifest.mjs` scans codebase and outputs `static/icon-manifest.json`
- Users should call `preloadIcons()` in their root layout for instant icon rendering

### Inline SVGs Converted
All components now use `Icon` instead of inline SVGs:
Toast, AppHeader, ThemeToggle, Carousel, CodeBlock, CodeBlockSpeed, TreeNode, TimelineItem, Tag, Chip, Panel, DataTable, Calendar

### Intentionally Kept as Inline SVGs
- Metrics/Chart components (data visualization, not icons)
- Avatar placeholder (single fallback icon)
- DataTable spinner (custom CSS animation)

---

## 5. 2026 Component Modernization — Future Work

Reference: `COMPONENT_MODERNIZATION_PLAN_2026.md`

### Phase 2: Native HTML Replacements ✅ DONE — ALREADY OPTIMAL
After code review, all Phase 2 components are already optimally implemented.

| Component | Approach | Status | Reason for Keeping |
|-----------|----------|--------|--------------------|
| Calendar | Custom grid + `popover="auto"` + `@starting-style` | ✅ Optimal | Custom grid needed for range selection, week numbers, custom formats |
| ColorPicker | Custom HSL wheel + `popover="auto"` + `conic-gradient` | ✅ Optimal | Needs format switching (hex/rgb/hsl), alpha, color wheel |
| Slider | `<input type="range">` + custom WebKit/Firefox styling | ✅ Optimal | Already uses native element — nothing to replace |
| Knob | SVG-based + ARIA slider pattern | ✅ Optimal | Rotary interaction can't be done with `<input type="range">` |
| Tabs | ARIA tablist with 4 variants (underline/pills/enclosed/default) | ✅ Optimal | `<details name>` would lose variant support and proper tab semantics |

### Phase 3: Scroll-Based ✅ DONE — ALREADY OPTIMAL
| Component | Approach | Status | Reason for Keeping |
|-----------|----------|--------|--------------------|
| Carousel | Scroll Snap + JS prev/next + auto-play + ARIA live region | ✅ Optimal | Already uses Scroll Snap; JS needed for buttons, auto-play, live region |

### Phase 4: Advanced Patterns ✅ DONE — ALREADY OPTIMAL
| Component | Approach | Status | Reason for Keeping |
|-----------|----------|--------|--------------------|
| Tree | `<details>` + `<summary>` for expand + ARIA treeview | ✅ Optimal | `<details>` handles expand; JS needed for arrow-key navigation and selection |
| DataTable | Native `<table>` + `<thead>`/`<tbody>`/`<th>` + JS sorting | ✅ Optimal | Already semantic; sorting needs JS |

### Intentionally Kept As-Is
| Component | Reason |
|-----------|--------|
| Map (D6) | Using Leaflet — too complex to replicate |
| Icon (D8) | Using Iconify — user wants any iconset support |
| CodeEditor (D7) | Using CodeMirror — full-featured, battle-tested |

---

## 6. E2E Test Migration — ✅ Complete

### Completed (Phase A — Scaffolding)
- ✅ `data-testid` convention applied to initial batch of components
- ✅ CodeBlockSpeed test typo fixed (`codeblockspeeed` → `codeblockspeed`)
- ✅ ThemeToggle test consolidated (deleted duplicate `.js`, kept typed `.ts`)
- ✅ `@storybook/addon-a11y` installed and configured
- ✅ `.github/workflows/test.yml` created with parallel CI jobs
- ✅ `publish.yml` chain-gates on test success

### Completed (Phase B/C — File-by-File Migration)
- ✅ All Storybook-pointing Playwright tests migrated to docs-site paths
- ✅ `data-testid` hooks added to all docs pages
- ✅ All 83 stories have `play` functions (470 tests passing)
- ✅ All `localhost:6006` URLs removed from test files
- ✅ Comprehensive e2e tests (582 tests) covering interaction, a11y, keyboard

### Key Decisions Made
1. **data-testid convention**: `data-testid="<component>-<variant>"` on example blocks
2. **ThemeToggle**: Keep typed `.ts` file, delete `.js` duplicate
3. **a11y addon**: Enabled (`@storybook/addon-a11y`)
4. **CI strategy**: Separate `test.yml` with parallel `unit`, `storybook`, `e2e` jobs

---

## 7. Testing Infrastructure

### Test Suites
| Suite | Command | Count | Notes |
|-------|---------|-------|-------|
| Unit (Vitest) | `pnpm test:unit` | 508 | 100 files, 0 failures |
| Storybook (Vitest) | `pnpm test:storybook` | 470 | 83 story files, all pass |
| E2E (Playwright) | `pnpm test:e2e` | 582 | Uses docs-site preview |
| Compat (Playwright) | `pnpm test:compat` | 3 browsers | Chromium, Firefox, WebKit |

### Browser Compatibility
- **Primary target**: Current Chrome (Chromium-derived)
- **Firefox goal**: ~80% of Tier 0 APIs
- **Feature detection**: `tests/compat/browser-support.test.ts`
- **Matrix display**: `CompatibilityMatrix` component on `/docs/completion`
- **CI**: `browser-compat` job uploads merged JSON as artifact

---

## 8. Storybook Configuration

### Themes
12 themes available via toolbar picker:
- **Light**: Default, Brand, High Contrast, Protanopia, Deuteranopia, Tritanopia
- **Dark**: Default Dark, Brand Dark, HC Dark, Protanopia Dark, Deuteranopia Dark, Tritanopia Dark

### Addons
- `@storybook/addon-svelte-csf` — Svelte CSF format
- `@storybook/addon-a11y` — Accessibility checks
- `@storybook/addon-docs` — Autodocs
- `@storybook/addon-themes` — Theme switcher toolbar

### Theme Tokens
- Defined in `.storybook/themes.css` (Storybook-only, not shipped with library)
- Library ships only default light/dark pair in `src/lib/twintrinsic.css`
- Color-blind themes use adjusted hue rotations for accessibility

---

## 9. Key APIs Reference

| API | Browser Support | Use Case |
|-----|----------------|----------|
| `Popover API` | Chrome 114+, Firefox 125+ | Top-layer overlays (Menu, Combobox, Tooltip) |
| `<dialog closedby>` | Chrome 135+ | Native light-dismiss dialogs (Modal) |
| CSS Anchor Positioning | Chrome 125+ | Tether floating elements (Tooltip, Menu) |
| `interestfor` | Chrome 135+ (flag) | Hover-triggered popovers (Tooltip) |
| `appearance: base-select` | Chrome 135+ | Customizable native select |
| `field-sizing: content` | Chrome 123+ | Auto-size inputs to content |
| `@starting-style` | Chrome 117+, Firefox 129+ | CSS entry animations |
| `transition-behavior: allow-discrete` | Chrome 117+, Firefox 129+ | Animate `display` property |
| `content-visibility: auto` | Chrome 85+, Firefox 125+ | Skip rendering off-screen content |
| `:has()` | Chrome 105+, Firefox 121+ | Parent styling based on child state |
| `:user-valid` / `:user-invalid` | Chrome 119+, Firefox 88+ | Validation after interaction |
| `accent-color` | Chrome 93+, Firefox 92+ | Brand-tinted form controls |
| `light-dark()` | Chrome 123+, Firefox 120+ | Theme token resolution |
| `<details name>` | Chrome 120+ | Exclusive accordion/tabs |
| `scroll-snap-type` | Chrome 69+, Firefox 103+ | Native carousel snapping |
| `scroll-state(snapped)` | Chrome 133+ | Highlight snapped carousel items |
| `color-mix()` | Chrome 111+, Firefox 113+ | CSS color manipulation |
| Temporal API | Chrome 131+ | Date/time calculations |
| `@property` | Chrome 85+, Firefox 128+ | Animated custom properties |

---

## 10. File Cleanup

The following plan files have been **deleted** (information consolidated above):
- `BUILD_WARNINGS_PLAN.md` — 0 warnings, all resolved
- `HTML_SEMANTIC_REPLACEMENT_PLAN.md` — All tiers complete
- `METRICS_COMPONENTS_PLAN.md` — Metrics implemented
- `METRICS_IMPLEMENTATION_SUMMARY.md` — Implementation complete
- `TYPE_CHECK_ERRORS_PLAN.md` — Old (Feb 2026), superseded
- `TYPE_ERRORS_PLAN.md` — Old (Jun 2026), superseded
- `LIB_TYPE_ERRORS_PLAN.md` — Old, superseded
- `REAL_WORLD_EXAMPLES_PLAN.md` — Done (both passes completed)
- `REAL_WORLD_EXAMPLES_REVIEW.md` — Done (checklist complete)
- `next-up.md` — Superseded by this document
- `check-errors.log` — Temporary file
- `unique-error-files.txt` — Temporary file

---

## 11. Component Research — In Progress

**Status:** ⬜ Not started — all entries in `COMPONENT_RESEARCH_CHECKLIST.md` are blank.

### What's Needed
For every component, document **What** it is, **When** to use it, and **Why** — from a design perspective, written for developers. Each entry must cite ≥5 sources.

### Groups to Cover
1. **App / Layout** (5): App, AppHeader, BottomBar, Sidebar, Footer
2. **Form** (20): Input, NumberInput, Textarea, Select, SelectGroup, Dropdown, Combobox, AutoComplete, Listbox, Checkbox, Radio, RadioGroup, Switch, Slider, Knob, Rating, Calendar, ColorPicker, FileUpload, FloatLabel, Form/FormField/InvalidState, ListInput
3. **Navigation** (5): Menu, Tabs, Breadcrumb, Tree, TreeMenu
4. **Data Display** (8): DataTable, Badge, Avatar, Tag, Chip, Tooltip, EventsTable, CompatibilityMatrix
5. **Feedback** (5): Modal, Toast, Skeleton, Progress, Stepper
6. **Layout** (5): Container, Hero, Splitter, Masonry
7. **Utility** (11): Button, Card, CodeBlock, CodeEditor, Icon, Lazy, Map, Separator, ThemeToggle, Timeline, RenderStringOrSnippet
8. **Metrics/Charts** (11): AreaChart, BarChart, LineChart, PieChart, DonutChart, HorizontalBarChart, GaugeChart, KPICard, StatsCard, MetricGrid, MetricTrend, ProgressMetric

### Sources
- S1: WAI-ARIA APG — https://www.w3.org/WAI/ARIA/apg/patterns/
- S2: MDN Web Docs — https://developer.mozilla.org/
- S3: Primer (GitHub) — https://primer.style/product/components/
- S4: Material Design 3 — https://m3.material.io/components
- S5: modern-web-guidance skill
- S6: Ant Design — https://ant.design/components/overview
- S7: Carbon Design System — https://carbondesignsystem.com/components/overview

---

## 12. Plan File Cleanup — In Progress

| File | Status |
|------|--------|
| `E2E_TO_STORYBOOK_MIGRATION_PLAN.md` | ⬜ Can be deleted (completed) |
| `USER_FEEDBACK.md` | ⬜ Review for actionable items |
| `README.md` | ⬜ Update plan folder index |

---

## ✅ Implementation Complete — All Phases Assessed

All phases of the 2026 Modernization Plan have been reviewed and assessed:

| Phase | Status | Notes |
|-------|--------|-------|
| **Phase 1: CSS-Only Wins** | ✅ Done | `:has(:user-valid)`, `@starting-style`, `content-visibility`, `accent-color` |
| **Phase 2: Native HTML Replacements** | ✅ Done — Already Optimal | Calendar, ColorPicker, Slider, Knob, Tabs all already use the best available APIs |
| **Phase 3: Scroll-Based** | ✅ Done — Already Optimal | Carousel already uses Scroll Snap |
| **Phase 4: Advanced Patterns** | ✅ Done — Already Optimal | Tree, DataTable already use native HTML |
| **HTML Semantic Replacement** | ✅ Done | All Tiers 0-2 complete |
| **E2E Test Migration** | ✅ Done | 582 e2e + 470 storybook tests passing |
| **Docs Standardization** | ✅ Done | All pages use standardized format |
| **Storybook Themes** | ✅ Done | 12 themes with dark mode support |
| **Icon System** | ✅ Done | Iconify with preload system |
| **CI Gating** | ✅ Done | unit/storybook/e2e/compat jobs in test.yml |

### Still TODO
- Component Research Checklist — fill in What/When/Why for all 40+ components
- Plan file cleanup — delete completed plans, update index
