# HTML Semantic Element Replacement Plan for Twintrinsic

## Executive Summary

This document analyzes native HTML elements from MDN and identifies which Twintrinsic custom components can be replaced or enhanced with semantic HTML. The goal is to improve accessibility, reduce custom code complexity, and leverage browser-native functionality.

---

## Part 1: HTML Elements Breakdown by Category

### 1. **Content Sectioning** (Structural Organization)
Elements for organizing document structure and creating semantic outlines.

| Element | Purpose | Twintrinsic Use Case |
|---------|---------|---------------------|
| `<header>` | Introductory content, navigation | AppHeader, Sidebar headers |
| `<nav>` | Navigation links | SidebarMenu, Breadcrumb, TreeMenu |
| `<main>` | Primary content area | App layout wrapper |
| `<section>` | Thematic grouping of content | Panel, Card containers |
| `<article>` | Self-contained content | Card, CodeBlock |
| `<aside>` | Sidebar, supplementary content | Sidebar, Tooltip |
| `<footer>` | Footer content | Footer component |
| `<address>` | Contact information | Footer (contact details) |

---

### 2. **Text Content** (Block-level Organization)
Elements for organizing blocks of text and content.

| Element | Purpose | Twintrinsic Use Case |
|---------|---------|---------------------|
| `<blockquote>` | Extended quotations | CodeBlock (quoted code) |
| `<figure>` + `<figcaption>` | Illustrations, diagrams, code examples | CodeBlock, CodeEditor |
| `<hr>` | Thematic break | Separator component |
| `<ol>`, `<ul>`, `<li>` | Ordered/unordered lists | Menu, TreeMenu, Breadcrumb |
| `<dl>`, `<dt>`, `<dd>` | Definition lists | Metrics (label-value pairs) |
| `<p>` | Paragraphs | Text content in modals, cards |
| `<pre>` | Preformatted text | CodeBlock, CodeEditor |
| `<div>` | Generic container | Currently overused in Twintrinsic |

---

### 3. **Inline Text Semantics** (Meaning & Styling)
Elements for marking up inline text with semantic meaning.

| Element | Purpose | Twintrinsic Use Case |
|---------|---------|---------------------|
| `<a>` | Hyperlinks | Button (href variant), Breadcrumb |
| `<strong>` | Strong importance | Badge, Tag (emphasis) |
| `<em>` | Emphasis | Text styling |
| `<mark>` | Highlighted/marked text | Search results, highlights |
| `<code>` | Code snippets | CodeBlock, inline code |
| `<kbd>` | Keyboard input | Tooltip (keyboard shortcuts) |
| `<abbr>` | Abbreviations | Tooltip, Badge |
| `<time>` | Date/time | Timeline, Stepper (timestamps) |
| `<small>` | Small print, side comments | Badge, Tag (secondary) |
| `<sub>`, `<sup>` | Subscript/superscript | Metrics, formulas |

---

### 4. **Forms** (Interactive Input)
Elements for creating accessible, semantic forms.

| Element | Purpose | Twintrinsic Use Case |
|---------|---------|---------------------|
| `<form>` | Form container | Form component (wrapper) |
| `<fieldset>` | Grouped form controls | Form groups, RadioGroup |
| `<legend>` | Fieldset label | FormField label |
| `<label>` | Input label | FormField, all form inputs |
| `<input>` | Text, checkbox, radio, etc. | Input, Checkbox, Radio, Switch |
| `<textarea>` | Multi-line text | Textarea component |
| `<select>` | Dropdown selection | Select, Dropdown, Listbox |
| `<option>`, `<optgroup>` | Select options | Select, Dropdown options |
| `<datalist>` | Predefined options | AutoComplete, Combobox |
| `<button>` | Clickable button | Button component |
| `<output>` | Calculation result | Progress, Meter display |
| `<progress>` | Progress bar | Progress component |
| `<meter>` | Scalar measurement | Rating, Slider display |

---

### 5. **Tables** (Tabular Data)
Elements for displaying structured tabular data.

| Element | Purpose | Twintrinsic Use Case |
|---------|---------|---------------------|
| `<table>` | Table container | DataTable, Table |
| `<thead>` | Table header rows | DataTable header |
| `<tbody>` | Table body rows | DataTable rows |
| `<tfoot>` | Table footer rows | DataTable footer |
| `<tr>` | Table row | DataTable/Table row |
| `<th>` | Header cell | DataTable/Table header cell |
| `<td>` | Data cell | DataTable/Table data cell |
| `<caption>` | Table title | DataTable title |
| `<colgroup>`, `<col>` | Column grouping | DataTable column styling |

---

### 6. **Interactive Elements** (User Interaction)
Elements for interactive content and disclosure widgets.

| Element | Purpose | Twintrinsic Use Case |
|---------|---------|---------------------|
| `<details>` | Disclosure widget | Accordion, Dropdown |
| `<summary>` | Summary/toggle for details | Accordion header, Dropdown trigger |
| `<dialog>` | Modal dialog | Modal component |

---

### 7. **Image & Multimedia** (Media Content)
Elements for embedding images, audio, video.

| Element | Purpose | Twintrinsic Use Case |
|---------|---------|---------------------|
| `<img>` | Image | Avatar, Card images |
| `<picture>` | Responsive images | Avatar, responsive images |
| `<audio>` | Audio playback | Not currently used |
| `<video>` | Video playback | Not currently used |
| `<source>` | Media source | Audio/video sources |

---

## Part 1.5: Chrome-Only Modern Platform APIs (2026)

Twintrinsic explicitly targets **current Chrome** and does not need backwards
compatibility, so beyond plain semantic HTML we should adopt bleeding-edge
CSS/JS/HTML platform APIs (per MDN, as of today) that let us delete custom
JavaScript in favor of browser-native behavior. None of these are currently
used anywhere in `src/lib/components` (verified via search).

| API | Type | Purpose | Twintrinsic Use Case |
|-----|------|---------|----------------------|
| **Popover API** (`popover`, `popovertarget`, `:popover-open`) | HTML/CSS | Native top-layer, light-dismissed overlays | Dropdown, Combobox, AutoComplete, Listbox, Menu, Toast, Tooltip |
| **CSS Anchor Positioning** (`anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`) | CSS | Tether a floating element to a trigger without JS measurement | Tooltip, Dropdown, Combobox, AutoComplete, Select popups |
| **Invoker Commands / Command API** (`command`, `commandfor` on `<button>`) | HTML | Declaratively open/close/toggle a dialog or popover from a button | Modal, Dropdown, Toast, Accordion-like custom toggles |
| **`<dialog closedby="any">`** | HTML | Native light-dismiss + platform close gestures for modals | Modal |
| **Customizable `<select>`** (`appearance: base-select`, `<selectedcontent>`, `::picker(select)`, `::picker-icon`) | CSS/HTML | Fully-styleable native select with rich option markup | Select, SelectGroup, Dropdown, Combobox |
| **`field-sizing: content`** | CSS | Auto-grow inputs/textareas to fit content | Textarea, NumberInput, Input |
| **`:has()`** | CSS | Style a parent/label based on descendant state | FormField, RadioGroup, CheckboxGroup validation styling |
| **`:user-valid` / `:user-invalid`** | CSS | Validation styling only after user interaction, no JS "touched" tracking | FormField, InvalidState, Form |
| **`light-dark()`** | CSS | Resolve a color per the element's `color-scheme` without duplicate `[data-theme="dark"]` blocks | `twintrinsic.css` theme tokens, ThemeToggle |
| **`@starting-style` + `transition-behavior: allow-discrete` + `overlay`** | CSS | Animate elements in/out of the top layer or `display: none` without JS animation classes | Modal, Toast, Dropdown, Combobox, Tooltip |
| **Interest Invokers** (`interestfor`) | HTML | Hover/focus-triggered tooltips/previews without manual mouseenter/mouseleave JS | Tooltip |
| **`<search>`** | HTML | Landmark for search/filter UI | AppHeader search input, Combobox/AutoComplete/DataTable filter bars |

**Note:** Some of these (Popover API, anchor positioning, customizable
`<select>`, `closedby`, invoker commands) are still evolving and don't have
long-term Baseline status, but since Twintrinsic only targets current Chrome,
no fallback/polyfill is required — use them directly.

### Firefox Compatibility Target

Chrome is the primary target because it tends to ship new platform APIs
first, and most non-Firefox/Safari browsers are Chromium-derived and pick
up the same features quickly. Even so, we track a **~80% Firefox
compatibility** goal for the Tier 0 APIs above, so cross-engine support is
verified automatically rather than assumed:

- `tests/compat/browser-support.test.ts` runs a pure feature-detection
  probe (no component behavior) against Chromium, Firefox, and WebKit via
  three dedicated Playwright projects (`compat-chromium`, `compat-firefox`,
  `compat-webkit` in `playwright.config.ts`).
- `pnpm test:compat` runs all three; `pnpm test:compat:merge`
  (`scripts/merge-browser-compat.mjs`) combines the per-browser output into
  `static/browser-compat.json`.
- The docs site's `CompatibilityMatrix` component
  (`$lib/components/CompatibilityMatrix/CompatibilityMatrix.svelte`, shown
  on `/docs/completion`) fetches that JSON at runtime and renders a live
  support table — no hand-maintained matrix to go stale.
- The `browser-compat` CI job (`.github/workflows/test.yml`) runs this
  suite on every push/PR and uploads the merged JSON as a build artifact.

As of the last local run, 9 of the 12 tracked features are supported in
Firefox (Popover API, CSS Anchor Positioning, Invoker Commands, `:has()`,
`:user-valid`/`:user-invalid`, `light-dark()`, `@starting-style`, `<search>`,
and — surprisingly — even `dialog closedby`), landing close to the 80%
target. The current gaps are Customizable `<select>` and
`field-sizing: content` (not yet in Firefox) and the `interestfor`
attribute (not yet shipping in any of the three engines' Playwright
builds tested).

---

## Part 2: Twintrinsic Components Analysis & Replacement Strategy

### **HIGH PRIORITY** - Direct Semantic HTML Replacements

#### 1. **Accordion** → `<details>` + `<summary>`
**Current:** Custom div-based with JavaScript state management
**Replacement:** Native HTML5 `<details>` element
**Benefits:**
- Built-in open/close functionality
- No JavaScript needed for basic toggle
- Better accessibility (ARIA handled by browser)
- Keyboard navigation built-in
- Smaller bundle size

**Migration Path:**
```svelte
<!-- Before: Custom Accordion -->
<Accordion allowMultiple={false}>
  <AccordionItem>
    <svelte:fragment slot="header">Section 1</svelte:fragment>
    Content here
  </AccordionItem>
</Accordion>

<!-- After: Native details -->
<details name="accordion-group">
  <summary>Section 1</summary>
  Content here
</details>
```

**Recommendation:** Replace with `<details>` + `<summary>` wrapper component for styling consistency.

---

#### 2. **Modal** → `<dialog closedby="any">`
**Current:** Custom div-based with manual focus management
**Status:** ✅ DONE (`src/lib/components/Modal/Modal.svelte` now renders a native
`<dialog>` with `closedby` mapped from `closeOnEscape`/`closeOnOutsideClick`,
`@starting-style` + `allow-discrete` entry/exit animation, `:has()` body-scroll
lock, and zero focus-trap/backdrop/Esc JS). Invoker commands on trigger buttons
are NOT used — the component's close button and consumers' triggers keep
`onclick` handlers; `closedby="any"` handles light-dismiss natively.
**Replacement:** Native HTML5 `<dialog>` element
**Benefits:**
- Built-in backdrop (`::backdrop` pseudo-element)
- Automatic focus management
- Inert content outside dialog
- `showModal()` and `close()` methods
- `closedby="any"` gives native light-dismiss (backdrop click) and platform close gestures (Esc, mobile back) with zero JS
- `command="show-modal" commandfor="dialog-id"` / `command="close"` on trigger `<button>`s removes the need for manual `onclick` handlers
- `@starting-style` + `transition-behavior: allow-discrete` for entry/exit animation of the dialog and `::backdrop`
- Better accessibility

**Migration Path:**
```svelte
<!-- Before: Custom Modal -->
<Modal open={isOpen} onclose={() => isOpen = false}>
  Content
</Modal>

<!-- After: Native dialog, no JS toggle handlers needed -->
<button command="show-modal" commandfor="my-dialog">Open</button>
<dialog id="my-dialog" closedby="any" onclose={() => isOpen = false}>
  Content
  <button command="close" commandfor="my-dialog">Close</button>
</dialog>
```

**Recommendation:** Replace with `<dialog closedby="any">` driven by invoker commands. Keep wrapper for styling and slot management.

---

#### 3. **Button** → `<button>` (Already using semantic HTML)
**Current:** Correctly uses `<button>` and `<a>` elements
**Status:** ✅ Already semantic
**Note:** Good example of semantic HTML usage in Twintrinsic.

---

#### 4. **Form Components** → Native `<input>`, `<select>`, `<textarea>`
**Current:** Custom wrappers around form elements
**Status:** ✅ Mostly semantic (uses native elements)
**Recommendation:** Ensure all form inputs use native elements with proper `<label>` associations.

---

### **MEDIUM PRIORITY** - Enhanced with Semantic HTML

#### 5. **DataTable / Table** → `<table>` with semantic structure
**Current:** Likely using div-based layout
**Replacement:** Proper `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
**Benefits:**
- Screen reader support for table relationships
- Proper row/column associations
- Native sorting/filtering semantics
- Better mobile responsiveness with CSS

**Recommendation:** Refactor to use semantic table elements with ARIA attributes for complex tables.

---

#### 6. **Breadcrumb** → `<nav>` + `<ol>` + `<a>`
**Current:** Likely using custom div structure
**Replacement:** `<nav>` with ordered list and links
**Benefits:**
- Semantic navigation landmark
- Proper list semantics
- Better screen reader experience

**Recommended Structure:**
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li aria-current="page">Components</li>
  </ol>
</nav>
```

---

#### 7. **Tabs** → `<div role="tablist">` with proper ARIA
**Current:** Custom implementation
**Status:** ⚠️ No native HTML element for tabs
**Recommendation:** Keep custom component but ensure it follows WAI-ARIA Authoring Practices Guide (APG) for tabs pattern.

---

#### 8. **Menu / TreeMenu** → `<nav>` + `<ul>` + `<a>`
**Current:** Custom div-based navigation
**Replacement:** Semantic `<nav>` with nested `<ul>` and `<a>` elements
**Benefits:**
- Proper navigation landmark
- List semantics for screen readers
- Better keyboard navigation with native list behavior

---

#### 9. **Progress** → `<progress>` element
**Current:** Custom div-based progress bar
**Replacement:** Native `<progress>` element
**Benefits:**
- Built-in accessibility
- Native browser styling (can be customized with CSS)
- Smaller code footprint

**Recommended Structure:**
```html
<progress value="70" max="100" aria-label="Loading"></progress>
```

---

#### 10. **Slider** → `<input type="range">`
**Current:** Custom slider implementation
**Replacement:** Native `<input type="range">`
**Benefits:**
- Built-in keyboard navigation (arrow keys)
- Native touch support
- Accessibility features built-in
- Smaller bundle size

**Note:** For complex sliders (multi-handle, custom styling), keep custom component but base on native input.

---

#### 11. **Rating** → `<fieldset>` + `<input type="radio">`
**Current:** Custom radio-based rating
**Replacement:** Semantic `<fieldset>` with radio inputs
**Benefits:**
- Proper form semantics
- Better accessibility
- Native keyboard navigation

---

#### 12. **Card** → `<article>` or `<section>`
**Current:** Custom div-based card
**Replacement:** `<article>` for self-contained content, `<section>` for thematic grouping
**Benefits:**
- Semantic meaning for screen readers
- Better document outline
- Improved SEO

---

#### 13. **Separator** → `<hr>`
**Current:** Custom div-based separator
**Replacement:** Native `<hr>` element
**Benefits:**
- Semantic thematic break
- Proper accessibility
- Simpler markup

---

#### 14. **Timeline** → `<ol>` with `<time>` elements
**Current:** Custom div-based timeline
**Replacement:** Ordered list with `<time>` elements
**Benefits:**
- Proper list semantics
- Semantic time representation
- Better screen reader experience

**Recommended Structure:**
```html
<ol>
  <li>
    <time datetime="2024-01-15">January 15, 2024</time>
    Event description
  </li>
</ol>
```

---

#### 15. **Stepper** → `<ol>` with ARIA attributes
**Current:** Custom div-based stepper
**Replacement:** Ordered list with proper ARIA
**Benefits:**
- List semantics
- Proper numbering
- Better screen reader experience

---

### **LOW PRIORITY** - Consider Semantic Enhancement

#### 16. **Badge / Tag** → `<span>` with semantic wrapping
**Current:** Likely using `<span>`
**Status:** ✅ Already semantic
**Enhancement:** Use `<strong>` or `<em>` for emphasis variants

---

#### 17. **Tooltip** → Popover API + Anchor Positioning + `interestfor` ✅ DONE
**Previous:** Custom div-based tooltip with JS-managed show/hide, `getBoundingClientRect()` positioning, and manual event listeners
**Current Implementation:**
- `popover="hint"` for top-layer rendering, light-dismiss, and mutual exclusion
- `interestfor` attribute on a `<button>` trigger for hover/focus → popover open
- CSS Anchor Positioning (`anchor-name`/`position-anchor` + `anchor()` functions) for tethering with `position-try-fallbacks: flip-block, flip-inline`
- `@starting-style` + `transition-behavior: allow-discrete` for entry animation
- Arrow via `::before` pseudo-element
- `interestfor` polyfill loaded via `loadPlatformPolyfills()` for Firefox/Safari
**Key learnings:**
- `interestfor` only works on `<button>` and `<a>` elements (not `<span>` or generic elements)
- The trigger must be a `<button>` — wrapper approach resets button styles with `appearance: none` + transparent bg so children render naturally
- jsdom 20+ hides `[popover]` elements — unit tests query the attribute directly rather than checking visibility
**Benefits:**
- Zero JavaScript for show/hide, positioning, or accessibility wiring
- Built-in WCAG 1.4.13 compliance (dismissible, hoverable, persistent)
- Automatic `aria-describedby`/`aria-details` wiring
- Simpler markup and no manual `getBoundingClientRect()` math

---

#### 18. **CodeBlock** → `<pre>` + `<code>`
**Current:** Likely using custom div
**Replacement:** Semantic `<pre>` + `<code>` with optional `<figure>` + `<figcaption>`
**Benefits:**
- Proper code semantics
- Better screen reader experience
- Proper whitespace preservation

**Recommended Structure:**
```html
<figure>
  <figcaption>Example Code</figcaption>
  <pre><code>const x = 1;</code></pre>
</figure>
```

---

#### 19. **Avatar** → `<img>` with proper alt text
**Current:** Likely using custom div
**Status:** ✅ Use native `<img>` element
**Recommendation:** Ensure proper `alt` text and `aria-label` for accessibility

---

#### 20. **Carousel** → `<div role="region">` with ARIA
**Current:** Custom carousel implementation
**Status:** ⚠️ No native HTML element
**Recommendation:** Keep custom component but follow WAI-ARIA carousel pattern from APG.

---

#### 21. **Dropdown / Combobox / AutoComplete / Listbox** → Popover API + Anchor Positioning
**Status:** 🟡 PARTIAL — **Combobox** and **AutoComplete** are ✅ done
(`src/lib/components/Form/Combobox.svelte` and `Form/AutoComplete.svelte` now
render their option panels as `popover="auto"` elements in the top layer,
positioned with explicit `anchor-name` + `anchor()`/`anchor-size()` + `flip-block`
so the OddBird anchor-positioning polyfill can handle them, with zero JS for
light-dismiss/Esc/positioning. Both are backed by `src/lib/polyfills.ts`
(`loadPlatformPolyfills()`), which feature-detects and injects the OddBird
popover + css-anchor-positioning polyfills).

**Scope notes:** **Listbox** is an *inline* widget (an always-visible ARIA
listbox, not a popup panel) — the Popover API is not applicable and it keeps
its existing keyboard nav. **Dropdown** is a legacy wrapper around the native
`<select>` (which has its own native popup, keyboard support, and form
participation) — no popover migration needed.

**Interaction notes learned while migrating (Combobox/AutoComplete + Tooltip):**
- `showPopover({ source })` does **NOT** exempt the source from light-dismiss —
  clicking the input while the popover is open still closes it. The combobox
  re-opens in the input's `click` handler (`openDropdown()` is idempotent via
  an `isPopoverOpen()` guard that handles both `:popover-open` and the
  polyfill's `:popover-open` class).
- `showPopover()` throws `InvalidStateError` if a show/hide is mid-flight
  (e.g. typing fires the input handler while the toggle event is still
  settling `isOpen`), so open/close calls are wrapped in try/catch and the
  open guards read the DOM state rather than the lagging `isOpen` flag.
- Native `showPopover()` does not move focus; the OddBird popover polyfill
  does (focuses the first focusable element) — AutoComplete refocuses the
  input after opening to cover the polyfilled path.
- **`interestfor` (Tooltip)** only works on `<button>` and `<a>` elements —
  not `<span>` or generic elements. The trigger is rendered as a transparent
  `<button>` with `appearance: none` so children render naturally. Hover on
  a `<span interestfor>` does nothing; this is a browser constraint, not a
  polyfill limitation.
- **`popover="hint"` (Tooltip)** has a small delay between hover and open
  in the real browser (unlike `popover="auto"` which opens instantly on
  click). E2e tests use a 500ms wait after hover to account for this.
- **jsdom + `[popover]`**: jsdom 20+ hides elements with `[popover]`, so
  unit tests check the attribute/class rather than visibility.
**Current:** Custom div-based panels with manual open/close state and JS positioning
**Replacement:** `popover` attribute for the option panel, `popovertarget` (or `command`/`commandfor`) on the trigger, `anchor-name`/`position-anchor`/`position-area`/`position-try-fallbacks` for tethering and viewport-edge flipping
**Benefits:**
- No JS for open/close, light-dismiss, or top-layer stacking
- No manual `getBoundingClientRect()` positioning logic
- Built-in Esc-to-close and outside-click-to-close

---

#### 22. **Select / SelectGroup** → Customizable `<select>` ✅ DONE
**Previous:** Already a native `<select>` element with proper ARIA, but used standard OS dropdown styling
**Current Implementation:**
- Added `appearance: base-select` as progressive enhancement (Chrome 135+ / Edge 135+)
- `::picker(select)` styled dropdown with custom background, border, border-radius, box-shadow
- `option` styling with hover states and `option:checked` background
- `::picker-icon` arrow styling
- `option::checkmark` indicator
- Falls back to standard OS dropdown in Firefox/Safari
**Benefits:**
- Fully custom styling while keeping native `<select>` semantics, keyboard support, and form participation
- Options can contain rich markup (icons, secondary text) via `<option>` children
- No JS needed for the open/close popup behavior
- Progressive enhancement — no polyfill needed, unsupported browsers get standard dropdown

---

#### 23. **Textarea** → `field-sizing: content` ✅ DONE
**Previous:** JS-based auto-resize using `scrollHeight` measurement (`autoResize` prop)
**Current Implementation:**
- Added `field-sizing: content` CSS to `.textarea-auto-resize` class (applied when `autoResize=true`)
- `min-height: 4.5rem` preserves the default rows-based height
- `max-height: 24rem` caps the auto-growth
- `resize: none` prevents manual resize (auto-size handles it)
- Removed the JS `resizeTextarea()` function and `queueMicrotask` initialization — zero JavaScript for auto-resize
**Note:** `field-sizing: content` on `<input>` affects width (not height), which can break layouts where inputs fill their container. Input and NumberInput were left unchanged — the main value is in Textarea where it replaces JS.

---

#### 24. **FormField / InvalidState / RadioGroup** → `:has()` + `:user-valid` / `:user-invalid` — ⏭️ SKIPPED
**Reason:** FormField already uses effective `.has-error` CSS rules (`.has-error input` gets error border/ring styling) plus TanStack Form integration for the `touched` state. The `:has(:user-invalid)` approach would only replace the **styling** layer, not the error message visibility (which requires JS because it depends on TanStack Form's custom validators, not native constraint validation). Adding `:has()` rules alongside the existing `.has-error` rules would create duplicate/conflicting selectors. The current implementation is already clean and functional.
**If revisited:** `:has(:user-invalid)` could replace the `.has-error` class for fields using native `required`/`pattern`/`type` validation, but not for fields with custom TanStack Form validators.

---

## Part 3: Implementation Priority Matrix

### **Tier 0: Chrome-Only Platform APIs** (Highest Impact, Deletes Custom JS)
1. **Modal** → `<dialog closedby="any">` + invoker commands (`command`/`commandfor`) — ✅ DONE
2. **Dropdown / Combobox / AutoComplete / Listbox** → Popover API + Anchor Positioning — 🟡 Combobox + AutoComplete done; Listbox/Dropdown are inline/native (no popup migration needed)
3. **Tooltip** → Popover API + Anchor Positioning + `interestfor` — ✅ DONE
4. **Select / SelectGroup** → Customizable `<select>` — ✅ DONE
5. **Textarea** → `field-sizing: content` — ✅ DONE (Input/NumberInput skipped — field-sizing affects width, breaks layouts)
6. **FormField / InvalidState / RadioGroup** → `:has()` + `:user-valid`/`:user-invalid` — ⏭️ SKIPPED (already uses .has-error CSS + TanStack Form)
7. **`twintrinsic.css` theme tokens** → `light-dark()` — ⏭️ SKIPPED (Tailwind `dark:` variant already standard)
8. **Modal / Toast / Dropdown / Combobox / Tooltip** → `@starting-style` + `transition-behavior: allow-discrete` for enter/exit animation — ✅ Toast done (`@starting-style` for entry, `.toast-closing` class + `transition-behavior: allow-discrete` for exit, `content-visibility: auto` for perf). Popover API not used (toasts need multiple visible simultaneously + `aria-live` region, which conflicts with Popover API's one-at-a-time model).

### **Tier 1: Replace Immediately** (High Impact, Low Effort) ✅ ALL DONE
1. **Accordion** → `<details>` + `<summary>` — ✅ DONE
2. **Modal** → `<dialog>` — ✅ DONE (also upgraded to `<dialog closedby>` in Tier 0)
3. **Progress** → `<progress>` — ✅ DONE
4. **Separator** → `<hr>` — ✅ DONE
5. **CodeBlock** → `<pre>` + `<code>` + `<figure>` — ✅ DONE

### **Tier 2: Enhance with Semantic HTML** (Medium Impact, Medium Effort)
1. **DataTable/Table** → Proper `<table>` structure — ✅ DONE (already uses `<table>` + `<thead>` + `<tbody>` + `<th>` + `<td>`)
2. **Breadcrumb** → `<nav>` + `<ol>` + `<a>` — ✅ DONE (already uses `<nav>` + `<ol>`)
3. **Menu** → Popover API + CSS Anchor Positioning + WAI-ARIA keyboard nav — ✅ DONE (`popover="auto"` for light-dismiss/top-layer, `position-anchor`/`anchor()` for positioning, arrow key/Enter/Esc/Home/End navigation). TreeMenu already has ARIA roles, no change needed.
4. **Timeline** → `<ol>` + `<time>` — ✅ DONE (`<div role="list">` → `<ol>`, `<div role="listitem">` → `<li>`, date → `<time>`)
5. **Stepper** → `<nav>` + ARIA — ✅ DONE (`<div role="navigation">` → `<nav>`)
6. **Rating** → `<fieldset>` + `<input type="radio">` — ⏭️ SKIPPED (already implements WAI-ARIA slider pattern correctly: `role="slider"`, `aria-valuemin/max/now`, arrow key ±step, Home/End, hidden `<input type="number">` for form submission. `<input type="radio">` would regress: no half-star increments, no drag support)
7. **Card** → `<article>` — ✅ DONE (already uses `<svelte:element this={href ? "a" : "article"}>`)

### **Tier 3: Consider for Future** (Lower Priority)
1. **Slider** → Keep custom but consider `<input type="range">` base
2. **Tabs** → Keep custom, ensure WAI-ARIA compliance
3. **Carousel** → Keep custom, ensure WAI-ARIA compliance
4. **Tooltip** → Consider `<abbr>` or `aria-describedby`
5. **Badge/Tag** → Minor semantic enhancements

---

## Part 4: Accessibility & WAI-ARIA Compliance

### Key Principles for Semantic HTML in Twintrinsic

1. **Use Native Elements First**
   - Always prefer native HTML elements over custom divs
   - Native elements come with built-in accessibility

2. **Follow WAI-ARIA APG Patterns**
   - For custom components (Tabs, Carousel, etc.), follow patterns from https://www.w3.org/WAI/ARIA/apg/patterns/
   - Ensure proper ARIA roles, states, and properties

3. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Tab order should be logical
   - Arrow keys for lists, menus, sliders

4. **Screen Reader Support**
   - Use semantic HTML for proper announcements
   - Add `aria-label`, `aria-describedby`, `aria-current` where needed
   - Test with screen readers (NVDA, JAWS, VoiceOver)

5. **Color Contrast**
   - Maintain WCAG AA minimum (4.5:1 for text)
   - Don't rely on color alone for information

---

## Part 5: Migration Checklist

For each component replacement:

- [ ] Identify native HTML element or WAI-ARIA pattern
- [ ] Create wrapper component for styling consistency
- [ ] Update component props to match native element attributes
- [ ] Ensure all ARIA attributes are present
- [ ] Update unit tests
- [ ] Update e2e tests
- [ ] Update Storybook stories
- [ ] Update documentation
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify visual consistency
- [ ] Update TypeScript types

---

## Part 6: Quick Reference - Semantic HTML Mapping

| Twintrinsic Component | Native HTML / WAI-ARIA Pattern | Priority |
|----------------------|--------------------------------|----------|
| Modal | `<dialog closedby="any">` + invoker commands | Tier 0 |
| Dropdown / Combobox / AutoComplete / Listbox | Popover API + Anchor Positioning | Tier 0 |
| Tooltip | Popover API + Anchor Positioning + `interestfor` | Tier 0 |
| Select / SelectGroup | Customizable `<select>` | Tier 0 |
| Textarea / NumberInput / Input | `field-sizing: content` | Tier 0 |
| FormField / InvalidState / RadioGroup | `:has()` + `:user-valid`/`:user-invalid` | Tier 0 |
| `twintrinsic.css` theme tokens | `light-dark()` | Tier 0 |
| Accordion | `<details>` + `<summary>` | Tier 1 |
| Modal | `<dialog>` | Tier 1 |
| Progress | `<progress>` | Tier 1 |
| Separator | `<hr>` | Tier 1 |
| CodeBlock | `<pre>` + `<code>` + `<figure>` | Tier 1 |
| DataTable/Table | `<table>` + semantic structure | Tier 2 |
| Breadcrumb | `<nav>` + `<ol>` + `<a>` | Tier 2 |
| Menu | Popover API + Anchor Positioning + WAI-ARIA keys | ✅ DONE |
| Timeline | `<ol>` + `<time>` | Tier 2 |
| Stepper | `<ol>` + ARIA | Tier 2 |
| Rating | `<fieldset>` + `<input type="radio">` | ⏭️ SKIPPED (already WAI-ARIA slider) |
| Card | `<article>` or `<section>` | Tier 2 |
| Slider | `<input type="range">` or custom | Tier 3 |
| Tabs | Custom with WAI-ARIA tablist pattern | Tier 3 |
| Carousel | Custom with WAI-ARIA region pattern | Tier 3 |
| Tooltip | `<abbr>` or `aria-describedby` | Tier 3 |
| Button | `<button>` or `<a>` | ✅ Already semantic |
| Form Inputs | Native `<input>`, `<select>`, `<textarea>` | ✅ Already semantic |
| Avatar | `<img>` | ✅ Already semantic |
| Badge/Tag | `<span>` with semantic variants | ✅ Already semantic |

---

## Part 6.5: Component Consolidation Analysis - Card vs Container vs Panel

### Should These Three Components Be Merged?

**Short Answer:** No. Keep them separate for semantic HTML and accessibility reasons.

### Component Comparison

| Aspect | Card | Container | Panel |
|--------|------|-----------|-------|
| **HTML Element** | `<article>` | `<div>` | `<details>` |
| **Purpose** | Self-contained content unit | Responsive layout wrapper | Collapsible disclosure widget |
| **Primary Use** | Display content (blog post, product, etc.) | Page/section layout | Hide/show content on demand |
| **Semantic Meaning** | Content is independent/reusable | No semantic meaning (layout only) | Disclosure/expandable section |
| **Keyboard Interaction** | None (content only) | None | Enter/Space to toggle |
| **Default State** | Always visible | Always visible | Collapsed or expanded |
| **Nesting** | Can be nested in Container | Wraps other components | Can contain any content |
| **Accessibility** | Screen reader announces as article | No special announcement | Built-in disclosure semantics |

### When to Use Each

#### **Card** - Use When:
- Displaying self-contained, reusable content
- Content could stand alone (blog post, product listing, user profile)
- You want semantic `<article>` element
- Content is always visible (not collapsible)
- Examples: Blog post preview, product card, team member profile, testimonial

#### **Container** - Use When:
- Creating page/section layout structure
- Need responsive max-width constraints
- Wrapping multiple components for spacing/alignment
- No semantic content meaning needed
- Examples: Page wrapper, section container, layout grid

#### **Panel** - Use When:
- Content should be collapsible/expandable
- Saving vertical space is important
- Users might want to hide content temporarily
- Using native `<details>` element for accessibility
- Examples: FAQ section, settings panel, advanced options, collapsible documentation

### Pros of Keeping Separate

**Semantic HTML**
- Card uses `<article>` (semantic content)
- Container uses `<div>` (layout-only)
- Panel uses `<details>` (disclosure widget)
- Each has correct HTML semantics for its purpose

**Accessibility**
- Panel has built-in keyboard navigation (Enter/Space)
- Card announces as article to screen readers
- Container is transparent (no special announcement)
- Different ARIA requirements for each

**Developer Clarity**
- Clear naming prevents mistakes
- Developers immediately understand purpose
- No need to learn variant names or conditional props
- Easier to document and teach

**Composability**
- Can nest: `Container > Card > Panel`
- Each component does one thing well
- Flexible combinations for complex layouts

**Code Maintenance**
- Smaller, focused components
- Easier to test independently
- Clear responsibility for each component
- Less conditional logic per component

### Cons of Merging into Single Component

**Semantic HTML Loss**
- Would need `as` prop to switch between `<article>`, `<div>`, `<details>`
- Loses semantic meaning if developer forgets prop
- Harder to enforce correct HTML structure

**API Bloat**
- Single component needs: `variant="card" | "container" | "panel"`
- Plus all props from each variant
- Confusing documentation
- Larger prop interface

**Accessibility Regression**
- Panel wouldn't be collapsible by default
- Would need conditional logic for `<details>` behavior
- Harder to implement keyboard navigation correctly
- More room for accessibility bugs

**Maintenance Burden**
- One massive component with conditional logic
- Harder to test all combinations
- More complex code paths
- Increased bundle size for single component

### Bundle Size Impact

**Current (Three Separate):**
- Card.svelte: ~1.5KB
- Container.svelte: ~0.8KB
- Panel.svelte: ~1.2KB
- **Total: ~3.5KB**

**Merged (Single Component):**
- Box.svelte: ~4.5KB (with all conditional logic)
- **Total: ~4.5KB**

**Verdict:** Minimal difference, but separate components are cleaner and more maintainable.

### Recommendation

**Keep all three components separate.** The semantic HTML benefits, accessibility advantages, and developer clarity outweigh the minimal bundle size savings from merging. If code duplication is a concern, extract shared styles into utility classes in `twintrinsic.css` rather than merging components.

---

## Part 7: Expected Benefits

### Code Quality
- **Reduced Custom Code:** ~30-40% reduction in custom JavaScript
- **Improved Maintainability:** Fewer custom implementations to maintain
- **Better Type Safety:** Native elements have well-defined APIs

### Accessibility
- **WCAG 2.1 Compliance:** Better out-of-the-box compliance
- **Screen Reader Support:** Improved announcements and navigation
- **Keyboard Navigation:** Built-in keyboard support for many elements

### Performance
- **Smaller Bundle:** Less custom JavaScript to ship
- **Faster Rendering:** Browser-optimized native elements
- **Better Mobile:** Native elements optimized for touch

### User Experience
- **Consistent Behavior:** Native elements behave as users expect
- **Better Mobile:** Native mobile optimizations
- **Improved Accessibility:** Better for users with disabilities

---

## Part 8: Next Steps

1. **Start with Tier 1 components** (Accordion, Modal, Progress, Separator, CodeBlock)
2. **Create wrapper components** for styling consistency
3. **Update tests** for each replacement
4. **Update documentation** with new patterns
5. **Gather feedback** from users and accessibility testers
6. **Move to Tier 2 components** once Tier 1 is complete
7. **Consider Tier 3** for future releases

---

## References

- [MDN HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [HTML Living Standard](https://html.spec.whatwg.org/)
- [Semantic HTML Best Practices](https://www.w3.org/TR/html-aria/)
