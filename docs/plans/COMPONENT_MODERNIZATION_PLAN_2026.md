# 2026 Component Modernization Plan — Minimal JS, Maximum Native

## Executive Summary

This plan documents how to implement every Twintrinsic component with **as little JavaScript as possible** using 2026 browser APIs, native HTML elements, CSS-only techniques, and WAI-ARIA APG patterns. The goal is to delete custom JS wherever the platform provides equivalent behavior natively.

**Browser target:** Current Chrome (Chromium-derived browsers). Firefox ~80% compat goal.

**Key references:**
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) — accessibility patterns
- [MDN Web Docs](https://developer.mozilla.org/) — HTML elements, CSS APIs, JS APIs
- [CSS Tricks](https://css-tricks.com/) — recent CSS technique articles
- [Kevin Powell](https://www.kevinpowell.co/) — CSS tutorials and modern techniques
- [modern-web-guidance](https://www.npmjs.com/package/modern-web-guidance) — best-practice guides

---

## Tier A: Already Done (Previous Sessions)

These components have already been migrated to modern APIs. Kept for completeness.

| # | Component | Migration | Status |
|---|-----------|-----------|--------|
| 1 | Modal | `<dialog closedby="any">` + `@starting-style` + `allow-discrete` | ✅ |
| 2 | Combobox | `popover="auto"` + CSS Anchor Positioning | ✅ |
| 3 | AutoComplete | `popover="auto"` + CSS Anchor Positioning | ✅ |
| 4 | Tooltip | `popover="hint"` + `interestfor` + CSS Anchor Positioning | ✅ |
| 5 | Select / SelectGroup | `appearance: base-select` + `::picker(select)` | ✅ |
| 6 | Textarea | `field-sizing: content` (replaced JS scrollHeight) | ✅ |
| 7 | Menu | `popover="auto"` + CSS Anchor Positioning + WAI-ARIA keyboard nav | ✅ |
| 8 | Toast | `@starting-style` + `transition-behavior: allow-discrete` + `content-visibility: auto` | ✅ |
| 9 | Timeline | `<ol>` + `<li>` + `<time>` | ✅ |
| 10 | Stepper | `<nav>` semantic landmark | ✅ |
| 11 | Accordion | `<details>` + `<summary>` | ✅ |
| 12 | Progress | `<progress>` element | ✅ |
| 13 | Separator | `<hr>` element | ✅ |
| 14 | CodeBlock | `<pre>` + `<code>` | ✅ |

---

## Tier B: Quick CSS Wins (No JS Changes Needed)

These components can be improved with CSS-only additions. No JavaScript modifications required.

---

### B1. Checkbox / Radio / Switch — `accent-color` + `:has()` + `:user-valid`/`:user-invalid`

**Current state:** Native `<input type="checkbox">` / `<input type="radio">` with custom wrapper styling.

**Modern approach:**
- `accent-color` on the form container tints all checkboxes, radios, range sliders, and progress bars with brand color — one line of CSS
- `:has(:user-invalid)` on the `<label>` or `<fieldset>` shows validation styling only after user interaction (no JS "touched" tracking)
- `:has(:checked)` on parent containers enables state-based styling without JS class toggling

**CSS-only implementation:**
```css
/* Brand-tinted form controls */
form { accent-color: var(--color-primary-500); }

/* Validation styling only after user interaction */
label:has(:user-invalid) { border-color: var(--color-error-500); }
label:has(:user-valid) { border-color: var(--color-success-500); }

/* Parent state based on child */
.field-group:has(:checked) { background: var(--color-primary-50); }
```

**WAI-ARIA APG:** [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), [Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

**JS reduction:** Removes manual "touched" state tracking, removes class-toggle on parent elements.

---

### B2. Badge / Tag — Semantic `<span>` + `accent-color` for status

**Current state:** `<span>` with variant classes.

**Modern approach:**
- Already semantic — no changes needed
- For status indicators: `accent-color` on parent for consistent theming
- For emphasis: `<strong>` for important badges, `<em>` for stress emphasis

**JS reduction:** None needed — already minimal.

---

### B3. Avatar — `<img>` + `<picture>` + `aspect-ratio`

**Current state:** `<img>` with fallback initials.

**Modern approach:**
- `aspect-ratio: 1` for consistent sizing without JS measurement
- `<picture>` with `<source>` for AVIF/WebP responsive images
- `object-fit: cover` for cropping
- `content-visibility: auto` for off-screen avatars in lists

**JS reduction:** Minimal — avatar groups might use Intersection Observer for lazy loading, but `<img loading="lazy">` handles most cases.

---

### B4. Container / Section / Panel — Layout primitives

**Current state:** `<div>` wrappers with Tailwind classes.

**Modern approach:**
- Container: CSS Container Queries (`container-type: inline-size`) for responsive child styling
- Section: `<section>` semantic element (already used where appropriate)
- Panel: `<details>` + `<summary>` for collapsible panels (already done for Accordion)

**CSS Container Queries for responsive children:**
```css
.container-sidebar { container-type: inline-size; }
@container (min-width: 640px) { .child { /* tablet layout */ } }
@container (min-width: 1024px) { .child { /* desktop layout */ } }
```

**JS reduction:** Container queries replace JS-based responsive breakpoint detection.

---

### B5. Skeleton — CSS `@starting-style` + `content-visibility`

**Current state:** CSS `@keyframes` shimmer animation.

**Modern approach:**
- `@starting-style` for entry animation when skeleton appears
- `content-visibility: auto` on skeleton containers for rendering perf
- `transition-behavior: allow-discrete` + `display` for exit when content loads
- `@property` for animating custom properties (shimmer gradient)

**CSS-only shimmer with `@property`:**
```css
@property --shimmer-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.skeleton {
  background: linear-gradient(var(--shimmer-angle), 
    var(--color-border) 25%, var(--color-surface) 50%, var(--color-border) 75%);
  animation: shimmer 1.5s linear infinite;
}
@keyframes shimmer { to { --shimmer-angle: 360deg; } }
```

**JS reduction:** Exit animation handled by CSS `allow-discrete`, not JS class toggling.

---

### B6. ThemeToggle — `light-dark()` CSS function

**Current state:** JS toggles `data-theme` attribute, Tailwind `dark:` variant.

**Modern approach:**
- `light-dark()` CSS function resolves colors based on `color-scheme` without duplicate `[data-theme="dark"]` blocks
- Set `color-scheme: light dark` on `:root`, let `light-dark()` handle token resolution
- `prefers-color-scheme` media query for system preference detection (no JS needed for initial theme)
- `localStorage` for user preference persistence (minimal JS)

**CSS-only theme tokens:**
```css
:root {
  color-scheme: light dark;
  --color-bg: light-dark(#ffffff, #1a1a1a);
  --color-text: light-dark(#000000, #ffffff);
  --color-primary: light-dark(#3b82f6, #60a5fa);
}
```

**JS reduction:** Removes duplicate dark-mode CSS blocks, reduces `dark:` variant usage.

---

### B7. Metrics — `<dl>` + `<dt>` + `<dd>` definition list

**Current state:** `<div>` grid with label-value pairs.

**Modern approach:**
- `<dl>` semantic definition list for label-value pairs
- `<dt>` for label, `<dd>` for value
- CSS Grid for layout (already used)
- `<meter>` for scalar measurements within metrics

**HTML structure:**
```html
<dl class="metrics-grid">
  <div class="metric">
    <dt>Revenue</dt>
    <dd>$12,345</dd>
  </div>
  <div class="metric">
    <dt>Growth</dt>
    <dd><meter value="0.85" min="0" max="1">85%</meter></dd>
  </div>
</dl>
```

**JS reduction:** None — already minimal.

---

## Tier C: Major JS-Reduction Migrations

These components have significant JavaScript that can be replaced with native platform APIs.

---

### C1. Calendar — `<input type="date">` + Temporal API

**Current state:** Custom grid-based calendar with JS date math.

**Modern approach:**
- `<input type="date">` for date picking — native popup calendar, keyboard accessible, form participation
- **Temporal API** (`Temporal.PlainDate`, `Temporal.Calendar`) for date calculations — replaces `Date`, `moment`, `dayjs`
- `<input type="date">` with `appearance: base-select` for customizable picker styling (Chrome 135+)
- CSS `field-sizing: content` for auto-sizing the input

**Native HTML date input:**
```html
<label for="event-date">Event date</label>
<input type="date" id="event-date" name="date" min="2026-01-01" max="2026-12-31">
```

**Temporal API for date math (replaces moment/dayjs):**
```js
const today = Temporal.Now.plainDateISO();
const nextWeek = today.add({ days: 7 });
const daysInMonth = today.daysInMonth;
const firstOfMonth = today.with({ day: 1 });
```

**CSS-customizable date picker (Chrome 135+):**
```css
input[type="date"] { appearance: base-select; }
input[type="date"]::picker(select) {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgb(0 0 0 / 0.15);
}
```

**WAI-ARIA APG:** No custom calendar pattern — use native `<input type="date">`.

**JS reduction:** ~90% — removes custom date grid rendering, date math, keyboard navigation (all native).

---

### C2. ColorPicker — `<input type="color">` + CSS `color-mix()`

**Current state:** Custom canvas-based color picker.

**Modern approach:**
- `<input type="color">` for native color selection — keyboard accessible, form participation
- CSS `color-mix()` for generating tints/shades without JS color manipulation
- CSS `color()` function for wide-gamut colors (Display P3)
- `<input type="color">` with `appearance: base-select` for customizable swatch picker (Chrome 135+)

**Native HTML color input:**
```html
<label for="brand-color">Brand color</label>
<input type="color" id="brand-color" value="#3b82f6">
```

**CSS color manipulation (replaces JS):**
```css
/* Generate tints/shades without JS */
.brand-50 { background: color-mix(in srgb, var(--brand) 10%, white); }
.brand-900 { background: color-mix(in srgb, var(--brand) 90%, black); }

/* Wide-gamut colors */
.hero { background: color(display-p3 0.2 0.4 0.8); }
```

**JS reduction:** ~95% — removes canvas rendering, color conversion math, swatch generation.

---

### C3. Slider — `<input type="range">` + `<meter>` + `accent-color`

**Current state:** Custom div-based slider with JS drag handling.

**Modern approach:**
- `<input type="range">` for native slider — keyboard accessible (arrow keys, Home/End), touch support
- `accent-color` for brand-tinted track/thumb
- CSS `::-webkit-slider-thumb` / `::-moz-range-thumb` for custom thumb styling
- `output` element for live value display
- `<meter>` for visual fill indicator

**Native HTML range input:**
```html
<label for="volume">Volume</label>
<input type="range" id="volume" min="0" max="100" value="70" step="1">
<output for="volume">70</output>
```

**CSS-styled range (no JS):**
```css
input[type="range"] {
  accent-color: var(--color-primary-500);
  width: 100%;
}
/* Custom thumb styling */
input[type="range"]::-webkit-slider-thumb {
  width: 1.25rem; height: 1.25rem;
  border-radius: 50%;
  background: var(--color-primary-500);
  cursor: grab;
}
```

**WAI-ARIA APG:** [Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) — but native `<input type="range">` already implements this pattern.

**JS reduction:** ~85% — removes drag handling, keyboard navigation, value calculation (all native).

---

### C4. Knob — `<input type="range">` styled as rotary

**Current state:** Canvas-based rotary knob with JS mouse/touch handling.

**Modern approach:**
- `<input type="range">` with CSS transforms to appear circular
- `conic-gradient` for the fill indicator
- CSS `accent-color` for theming
- No canvas needed

**CSS rotary styling:**
```css
.knob-input {
  appearance: none;
  width: 4rem; height: 4rem;
  border-radius: 50%;
  background: conic-gradient(
    var(--color-primary-500) calc(var(--value) * 1deg),
    var(--color-border) calc(var(--value) * 1deg)
  );
  /* Hide the native range, use custom visual */
}
```

**JS reduction:** ~80% — removes canvas rendering, mouse/touch angle calculation.

---

### C5. Carousel — Scroll Snap + `scroll-state(snapped)` + `@starting-style`

**Current state:** Custom div-based carousel with JS slide management.

**Modern approach:**
- **Scroll Snap** (`scroll-snap-type: x mandatory` + `scroll-snap-align: center`) for native slide snapping
- **`scroll-state(snapped: x)`** container query for highlighting the active slide (Chrome 133+)
- **`@starting-style`** for slide entry animation
- **`overscroll-behavior: contain`** to prevent scroll chaining
- **`scrollbar-width: none`** to hide scrollbar while keeping scroll functional
- **CSS `scroll-timeline`** for progress indicators driven by scroll position

**CSS-only carousel:**
```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior: contain;
  scrollbar-width: none;
  gap: 1rem;
}
.carousel-slide {
  scroll-snap-align: center;
  container-type: scroll-state;
  flex: 0 0 100%;
}
/* Highlight active slide — no JS IntersectionObserver needed */
@media (prefers-reduced-motion: no-preference) {
  @container scroll-state(snapped: x) {
    .slide-content { scale: 1.05; box-shadow: 0 10px 30px rgb(0 0 0 / 0.15); }
  }
}
```

**WAI-ARIA APG:** [Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) — use `aria-roledescription="carousel"`, `aria-label`, live region for auto-rotating slides.

**JS reduction:** ~70% — removes slide position calculation, drag handling, IntersectionObserver for active state. JS still needed for: prev/next buttons (scroll-by), auto-play timer, ARIA live region updates.

---

### C6. Splitter — CSS `resize` + Container Queries

**Current state:** Custom drag-handle with JS resize handling.

**Modern approach:**
- CSS `resize: horizontal` / `resize: vertical` on panels — native resize handle
- `min-width` / `max-width` constraints
- Container Queries for responsive child layout
- `overflow: auto` for scrollable panels

**CSS-only splitter:**
```css
.splitter-panel {
  resize: horizontal;
  overflow: auto;
  min-width: 200px;
  max-width: 80vw;
  container-type: inline-size;
}
```

**JS reduction:** ~60% — removes mouse/touch drag handling, position calculation. JS still needed for: multi-panel layout logic, collapse/expand, persistence.

---

### C7. Tabs — `<details>` + `:has()` OR ARIA tablist pattern

**Current state:** Custom div-based tabs with JS panel switching.

**Modern approach (Option 1 — CSS-only with `<details>`):**
- `<details name="tab-group">` for exclusive accordion (only one open at a time, native HTML)
- `name` attribute on `<details>` creates radio-button-like behavior (Chrome 120+)
- `<summary>` for tab triggers
- CSS `::details-content` for panel transitions

**CSS-only tabs with `<details name>`:**
```html
<details name="tabs" open>
  <summary>Tab 1</summary>
  <div class="tab-panel">Content 1</div>
</details>
<details name="tabs">
  <summary>Tab 2</summary>
  <div class="tab-panel">Content 2</div>
</details>
```
```css
/* Style as horizontal tabs */
details[name="tabs"] { display: inline-block; }
details[name="tabs"] summary {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
details[name="tabs"][open] summary {
  border-bottom-color: var(--color-primary-500);
  font-weight: 600;
}
/* Panel transitions */
details::details-content {
  transition: content-visibility 0.2s allow-discrete,
              opacity 0.2s ease;
  opacity: 0;
}
details[open]::details-content { opacity: 1; }
```

**Modern approach (Option 2 — WAI-ARIA tablist):**
If true tab semantics are needed (not disclosure), use the WAI-ARIA tablist pattern with minimal JS for `aria-selected` and `tabpanel` visibility.

**WAI-ARIA APG:** [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

**JS reduction:** ~80% with `<details name>` approach — removes all panel switching JS, keyboard navigation is native. ~40% with ARIA tablist (still need JS for `aria-selected` management).

---

### C8. Accordion — `<details name>` (Already done, but can be enhanced)

**Current state:** `<details>` + `<summary>` ✅

**Modern enhancement:**
- Add `name` attribute for exclusive behavior (only one open at a time)
- `::details-content` transition for smooth expand/collapse
- `@starting-style` for entry animation

```html
<details name="faq" open>
  <summary>What is Twintrinsic?</summary>
  <p>A Svelte 5 component library...</p>
</details>
<details name="faq">
  <summary>How do I install it?</summary>
  <p>pnpm add twintrinsic</p>
</details>
```

**JS reduction:** Already minimal — `name` attribute removes the need for JS that closes other accordion items.

---

### C9. DataTable / Table — Native `<table>` + CSS Sorting

**Current state:** `<table>` with JS sorting/filtering.

**Modern approach:**
- Native `<table>` with `<thead>`, `<tbody>`, `<tfoot>`, `<th scope="col">` ✅ (already done)
- CSS `:has(:sort)` for styling sorted columns (Chrome 135+)
- `<td>` with `contenteditable` for inline editing (if needed)
- CSS `position: sticky` for fixed headers
- `content-visibility: auto` on `<tbody>` for large table performance

**CSS sticky header:**
```css
thead th { position: sticky; top: 0; z-index: 1; background: var(--color-surface); }
```

**JS reduction:** ~30% — sorting still needs JS, but rendering and accessibility are native.

---

### C10. FileUpload — `<input type="file">` + Drag and Drop API

**Current state:** Custom dropzone with JS file handling.

**Modern approach:**
- `<input type="file" multiple accept="image/*">` for native file selection
- Drag and Drop API (`dragenter`, `dragover`, `drop`) for dropzone
- `<progress>` for upload progress
- `FileReader` API for preview
- `showOpenFilePicker()` (File System Access API) for modern file selection

**Native file input with custom styling:**
```html
<label for="file-upload" class="dropzone">
  <input type="file" id="file-upload" multiple accept="image/*" class="sr-only">
  <span>Drop files here or click to browse</span>
</label>
```

**CSS dropzone styling:**
```css
.dropzone {
  border: 2px dashed var(--color-border);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  transition: border-color 0.2s, background 0.2s;
}
.dropzone:has(input:focus) {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
}
```

**JS reduction:** ~40% — file selection is native, drop handling still needs JS, but validation and preview can use native APIs.

---

### C11. Form / FormField — `:has()` + `:user-valid`/`:user-invalid` + Native Validation

**Current state:** TanStack Form integration with JS validation.

**Modern approach:**
- `:has(:user-invalid)` on `<fieldset>` for validation styling after interaction
- `:has(:required:invalid)` for required field indicators
- Native constraint validation API (`checkValidity()`, `setCustomValidity()`)
- `<output>` for validation messages
- `formAssociatedCustomElements` for custom form controls

**CSS-only validation styling:**
```css
fieldset:has(:user-invalid) {
  border-color: var(--color-error-500);
}
fieldset:has(:user-invalid) .error-message {
  display: block; /* Show error message */
}
fieldset:has(:user-valid) {
  border-color: var(--color-success-500);
}
```

**JS reduction:** ~50% — removes "touched" state tracking, removes class-toggle for validation styling. TanStack Form integration still needs JS for complex validation rules.

---

### C12. Rating — `<input type="radio">` + `<meter>` + CSS `accent-color`

**Current state:** WAI-ARIA slider pattern with JS.

**Modern approach (Option 1 — keep slider):**
- Already implements WAI-ARIA slider correctly
- `accent-color` for brand-tinted stars
- CSS `conic-gradient` for partial fill (half-star)

**Modern approach (Option 2 — radio group):**
- `<fieldset>` with `<input type="radio" name="rating">` for star selection
- CSS `:has()` on `<label>` for hover preview
- `accent-color` for star color

**CSS star rating with radio inputs:**
```html
<fieldset class="star-rating">
  <legend>Rating</legend>
  {#each [5,4,3,2,1] as star}
    <label>
      <input type="radio" name="rating" value={star}>
      <span class="star">★</span>
    </label>
  {/each}
</fieldset>
```
```css
.star-rating { display: flex; flex-direction: row-reverse; justify-content: flex-end; }
.star-rating input { position: absolute; opacity: 0; }
.star-rating .star { font-size: 1.5rem; color: var(--color-border); cursor: pointer; }
/* Highlight on hover and selection */
.star-rating label:has(:checked) ~ label .star,
.star-rating label:has(:checked) .star { color: var(--color-warning-500); }
.star-rating label:hover .star,
.star-rating label:hover ~ label .star { color: var(--color-warning-400); }
```

**Note:** The slider approach is better for half-star increments and drag. Keep current implementation.

**JS reduction:** ~20% — minimal JS reduction since slider pattern is already efficient.

---

## Tier D: Components Requiring JS (But Can Be Reduced)

These components inherently need JavaScript for their behavior, but can use modern APIs to reduce the amount.

---

### D1. App / AppHeader / Sidebar / Footer / BottomBar — Layout Components

**Current state:** Semantic HTML with Tailwind layout.

**Modern approach:**
- `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` semantic landmarks ✅
- CSS `position: sticky` for fixed headers/footers
- Container Queries for responsive child layout
- `<search>` element for search inputs in AppHeader
- `scroll-timeline` for scroll-based header shadow

**JS reduction:** Minimal — layout components are already CSS-driven.

---

### D2. Breadcrumb — `<nav>` + `<ol>` + `aria-current="page"` (Already done)

**Current state:** `<nav>` + `<ol>` ✅

**Enhancement:**
- `<search>` wrapping filter inputs in related components
- JSON-LD `BreadcrumbList` structured data for SEO

**JS reduction:** None needed.

---

### D3. Tree / TreeMenu — ARIA Treeview Pattern

**Current state:** ARIA tree pattern with keyboard navigation.

**Modern approach:**
- Keep ARIA treeview pattern (no native HTML element for treeview)
- `<details>` + `<summary>` for expandable tree nodes (reduces JS for toggle)
- `content-visibility: auto` for large trees (skip rendering hidden subtrees)
- `inert` on collapsed subtrees (prevents tabbing into hidden content)

**WAI-ARIA APG:** [Treeview](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)

**JS reduction:** ~30% — `<details>` handles expand/collapse, JS still needed for arrow key navigation and selection.

---

### D4. Lazy / LazyPanel — `<img loading="lazy">` + `content-visibility: auto`

**Current state:** Intersection Observer for lazy loading.

**Modern approach:**
- `<img loading="lazy">` for native lazy loading of images
- `<iframe loading="lazy">` for lazy iframes
- `content-visibility: auto` for off-screen content skipping
- `loading="lazy"` on `<video>`, `<audio>` elements
- Intersection Observer still needed for non-image lazy loading (component-level)

**JS reduction:** ~40% — image lazy loading is native, component lazy loading still needs Intersection Observer.

---

### D5. Masonry — CSS Grid Lanes (Progressive Enhancement)

**Current state:** CSS columns-based masonry.

**Modern approach:**
- `grid-template-rows: masonry` (Firefox behind flag, not yet in Chrome)
- `columns: 3` for masonry-like flow (already used)
- Progressive enhancement with `@supports`:

```css
/* Base: CSS columns */
.gallery { columns: 3 200px; column-gap: 1rem; }
.gallery > * { break-inside: avoid; margin-block-end: 1rem; }

/* Enhancement: Grid lanes when supported */
@supports (grid-template-rows: masonry) {
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: masonry;
    gap: 1rem;
    columns: unset;
  }
}
```

**JS reduction:** ~50% — CSS columns handles layout, no JS measurement needed.

---

### D6. Map — Leaflet / Mapbox (Keep JS)

**Current state:** Map library integration.

**Modern approach:**
- No native HTML element for maps
- `<map>` + `<area>` are for image maps, not interactive maps
- Keep current map library integration

**JS reduction:** None — maps require JS.

---

### D7. CodeEditor — Contenteditable + `<pre><code>`

**Current state:** CodeMirror integration.

**Modern approach:**
- `<textarea>` with `field-sizing: content` for basic code input
- `<pre><code>` for syntax-highlighted display
- `contenteditable` for inline editing (limited)
- Keep CodeMirror for full editor features (syntax highlighting, line numbers, etc.)

**JS reduction:** ~20% — basic code input can be native, full editor features need JS.

---

### D8. Icon — SVG + `<symbol>` + `<use>`

**Current state:** `@iconify/svelte` for icon loading.

**Modern approach:**
- `<svg>` inline for critical icons
- `<symbol>` + `<use>` for icon sprites (reduces DOM nodes)
- CSS `currentColor` for icon color inheritance
- `accent-color` for form control icons

**JS reduction:** ~30% — sprite sheets reduce JS icon loading, but icon libraries still need JS for dynamic icons.

---

### D9. EventsTable / PropsTable — Native `<table>`

**Current state:** `<table>` with Tailwind styling.

**Modern approach:**
- Already uses `<table>` ✅
- `<caption>` for table title
- `<colgroup>` + `<col>` for column styling
- `<tfoot>` for summary rows
- `content-visibility: auto` for large tables

**JS reduction:** None needed — already semantic.

---

## Tier E: Components With No Semantic Replacement

These components don't have a native HTML equivalent or CSS-only solution.

| # | Component | Reason | Modern Enhancement |
|---|-----------|--------|--------------------|
| 1 | Chip | No native element | `accent-color` for selection state |
| 2 | ChipGroup | No native element | `:has(:checked)` for group state |
| 3 | FloatLabel | CSS-only technique | `@starting-style` for label animation |
| 4 | InvalidState | Validation display | `:has(:user-invalid)` for CSS-only state |
| 5 | ListInput | Dynamic list | Minimal JS needed |
| 6 | RenderStringOrSnippet | Rendering utility | No change needed |
| 7 | Metrics | Already semantic | `<dl>` + `<meter>` |
| 8 | Section | Already semantic | `<section>` element |

---

## Implementation Priority

### Phase 1: CSS-Only Wins (No JS Changes)
1. `accent-color` on Checkbox, Radio, Switch, Slider, Rating, Knob
2. `:has(:user-valid)` / `:has(:user-invalid)` on FormField, RadioGroup
3. `light-dark()` on twintrinsic.css theme tokens
4. `@starting-style` + `allow-discrete` on Skeleton, LazyPanel
5. `content-visibility: auto` on DataTable, Tree, Masonry

### Phase 2: Native HTML Replacements
6. Calendar → `<input type="date">` + Temporal API
7. ColorPicker → `<input type="color">` + `color-mix()`
8. Slider → `<input type="range">` + `accent-color`
9. Knob → `<input type="range">` with rotary CSS
10. Tabs → `<details name>` (CSS-only tabs)

### Phase 3: Scroll-Based Modernization
11. Carousel → Scroll Snap + `scroll-state(snapped)`
12. Accordion → `<details name>` + `::details-content` transitions
13. Splitter → CSS `resize` + Container Queries

### Phase 4: Advanced Patterns
14. Tree → `<details>` for expand + ARIA treeview for keyboard
15. DataTable → `:has(:sort)` + sticky headers
16. Masonry → Grid lanes progressive enhancement
17. Metrics → `<dl>` + `<meter>`

---

## JS Reduction Summary

| Category | Components | Est. JS Reduction |
|----------|------------|-------------------|
| **Tier A** (Done) | 14 components | ✅ Already migrated |
| **Tier B** (CSS wins) | 7 components | ~30-50% per component |
| **Tier C** (Major) | 12 components | ~60-95% per component |
| **Tier D** (JS required) | 9 components | ~20-40% per component |
| **Tier E** (No replacement) | 8 components | ~10-20% per component |

**Overall estimated JS reduction: ~40-60% across the entire library.**

---

## Key APIs Reference

| API | Browser Support | Use Case |
|-----|----------------|----------|
| `accent-color` | Chrome 93+, Firefox 92+, Safari 26.2+ | Brand-tinted form controls |
| `:has()` | Chrome 105+, Firefox 121+, Safari 15.4+ | Parent styling based on child state |
| `:user-valid` / `:user-invalid` | Chrome 119+, Firefox 88+, Safari 16.5+ | Validation after interaction |
| `light-dark()` | Chrome 123+, Firefox 120+, Safari 17.5+ | Theme token resolution |
| `@starting-style` | Chrome 117+, Firefox 129+ | CSS entry animations |
| `transition-behavior: allow-discrete` | Chrome 117+, Firefox 129+ | Animate `display` property |
| `content-visibility: auto` | Chrome 85+, Firefox 125+ | Skip rendering off-screen content |
| `field-sizing: content` | Chrome 123+ | Auto-size inputs to content |
| `scroll-snap-type` | Chrome 69+, Firefox 103+ | Native carousel snapping |
| `scroll-state(snapped)` | Chrome 133+ | Highlight snapped carousel items |
| `appearance: base-select` | Chrome 135+ | Customizable native select |
| `Popover API` | Chrome 114+, Firefox 125+ | Top-layer overlays |
| `<dialog closedby>` | Chrome 135+ | Native light-dismiss dialogs |
| Invoker Commands | Chrome 135+, Firefox 144+ | Declarative dialog/popover toggle |
| `interestfor` | Chrome 135+ (behind flag) | Hover-triggered popovers |
| CSS Anchor Positioning | Chrome 125+ | Tether floating elements |
| Temporal API | Chrome 131+ | Date/time calculations |
| `color-mix()` | Chrome 111+, Firefox 113+ | CSS color manipulation |
| `<details name>` | Chrome 120+ | Exclusive accordion/tabs |
| `::details-content` | Chrome 131+ | Panel transitions |
| `@property` | Chrome 85+, Firefox 128+ | Animated custom properties |
| `color-scheme` | Chrome 76+, Firefox 67+ | Dark mode support |

---

## References

- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/) — recently revived with new articles
- [Kevin Powell](https://www.kevinpowell.co/) — CSS tutorials and modern techniques
- [Can I Use](https://caniuse.com/) — browser compatibility data
- [web.dev](https://web.dev/) — Chrome team best practices
- [Baseline](https://web.dev/baseline) — feature availability tracking
- [modern-web-guidance](https://www.npmjs.com/package/modern-web-guidance) — best-practice skill
