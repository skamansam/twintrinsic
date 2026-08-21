# Twintrinsic — Consolidated Plan

> **Last updated:** August 21, 2026
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
| **E2E Test Migration** | 🟡 In Progress | Phase A done (scaffolding), Phase B/C pending |

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

### Phase 2: Native HTML Replacements (Not Yet Started)
| Component | Approach | Est. JS Reduction |
|-----------|----------|-------------------|
| Calendar | `<input type="date">` + Temporal API | ~90% |
| ColorPicker | `<input type="color">` + `color-mix()` | ~95% |
| Slider | `<input type="range">` + `accent-color` | ~85% |
| Knob | `<input type="range">` with rotary CSS | ~80% |
| Tabs | `<details name>` (CSS-only tabs) | ~80% |

### Phase 3: Scroll-Based (Not Yet Started)
| Component | Approach | Est. JS Reduction |
|-----------|----------|-------------------|
| Carousel | Scroll Snap + `scroll-state(snapped)` | ~70% |

### Intentionally Kept As-Is
| Component | Reason |
|-----------|--------|
| Map (D6) | Using Leaflet — too complex to replicate |
| Icon (D8) | Using Iconify — user wants any iconset support |
| CodeEditor (D7) | Using CodeMirror — full-featured, battle-tested |

---

## 6. E2E Test Migration — In Progress

### Completed (Phase A — Scaffolding)
- ✅ `data-testid` convention applied to initial batch of components
- ✅ CodeBlockSpeed test typo fixed (`codeblockspeeed` → `codeblockspeed`)
- ✅ ThemeToggle test consolidated (deleted duplicate `.js`, kept typed `.ts`)
- ✅ `@storybook/addon-a11y` installed and configured
- ✅ `.github/workflows/test.yml` created with parallel CI jobs
- ✅ `publish.yml` chain-gates on test success

### Remaining (Phase B/C — File-by-File Migration)
- Migrate remaining Storybook-pointing Playwright tests to docs-site paths
- Add `data-testid` to remaining docs pages
- Migrate component behavior tests to Storybook `play` functions
- Remove hardcoded `localhost:6006` URLs from test files

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
| Storybook (Vitest) | `pnpm test:storybook` | 470+ | Requires `pnpm storybook` running |
| E2E (Playwright) | `pnpm test:e2e` | 423 | Uses docs-site preview |
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
