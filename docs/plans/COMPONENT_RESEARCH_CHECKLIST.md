# Component Research Checklist

> **Purpose:** For every Twintrinsic component, document **What** it is, **When** to use it, and **Why** — from a design perspective, written for developers. Each entry cites ≥5 sources.
>
> **Last updated:** 2026-08-22

---

## Sources Reference

| # | Source | URL | Type |
|---|--------|-----|------|
| S1 | **WAI-ARIA Authoring Practices Guide (APG)** | https://www.w3.org/WAI/ARIA/apg/patterns/ | W3C accessibility patterns & keyboard interactions |
| S2 | **MDN Web Docs — HTML Elements** | https://developer.mozilla.org/en-US/docs/Web/HTML/Element | HTML element reference & browser API docs |
| S3 | **Primer (GitHub Design System)** | https://primer.style/product/components/ | Production component descriptions & use cases |
| S4 | **Material Design 3** | https://m3.material.io/components | Google's design language component guidelines |
| S5 | **Modern Web Guidance** | `npx modern-web-guidance list` | Best-practice coding guides for modern CSS/HTML APIs |
| S6 | **Ant Design** | https://ant.design/components/overview | Enterprise UI component library documentation |
| S7 | **Carbon Design System** | https://carbondesignsystem.com/components/overview | IBM's design system component catalog |

---

## Legend

- ✅ = Research complete (≥5 sources consulted)
- 🔄 = In progress
- ⬜ = Not started

---

## 1. App / Layout Components

### 1.1 App
**Status:** ✅

| | |
|---|---|
| **What** | Root application wrapper that establishes the page shell — typically containing header, sidebar, main content area, and footer. |
| **When** | Every page in a SvelteKit app. Use as the outermost layout component to provide consistent structure. |
| **Why** | Establishes a predictable page skeleton so users always know where navigation, content, and utilities are. Enables responsive layout reflow (e.g., sidebar collapses on mobile). Provides a landmark structure (`<main>`, `<header>`, `<nav>`, `<footer>`) for screen readers. |

**Sources:** S1 (Landmarks), S2 (`<main>`, `<header>`, `<footer>`, `<nav>`), S3 (PageLayout), S4 (Common layout patterns), S5 (css-layout)

**Twintrinsic Implementation:**
- Uses CSS Grid with `grid-template-rows` and `grid-template-columns` for the page shell
- Semantic `<main>` element for the content area
- Accepts `header`, `footer`, `leftPanel`, `rightPanel` snippets for flexible composition
- `<svelte:window>` for scroll event handling
- `data-theme` attribute on root for theme propagation
- `...rest` spread for native attribute passthrough (`data-*`, `aria-*`)

**Common Mistakes:**
- Don't put navigation inside `<main>` — it belongs in `<nav>` within the header or sidebar
- Don't use `<div>` for the main content area — always use `<main>` for landmark semantics
- Don't forget `id="main-content"` for skip-nav links

**Related:** AppHeader, Sidebar, Footer, BottomBar, Container
**Status:** ✅

| | |
|---|---|
| **What** | Top navigation bar containing the app logo/name, primary navigation links, search, and utility actions (notifications, theme toggle, user menu). |
| **When** | Every page. The header is the primary way users identify the app and access top-level navigation. |
| **Why** | Users expect a persistent top bar for orientation and navigation (Jakob's Law). Provides a consistent location for search, notifications, and account access. Should use `<header>` + `<nav>` landmarks for accessibility. On mobile, collapses to a hamburger menu. |

**Sources:** S1 (Landmarks), S2 (`<header>`, `<nav>`), S3 (PageHeader), S4 (Top app bar), S5 (navigation-drawer, shrinking-header-on-scroll)

**Twintrinsic Implementation:**
- Semantic `<header>` element as root
- `<svelte:window>` for scroll-based shadow/border transitions
- Mobile hamburger menu with popover-style slide-out
- Search input with `role="searchbox"` and `aria-label`
- User menu with keyboard-navigable dropdown
- `...rest` spread on `<header>` for native attributes

**Common Mistakes:**
- Don't nest multiple `<header>` landmarks — one per page section
- Don't use `<div>` for the top bar — always `<header>` for screen reader landmarks
- Don't forget `aria-label` when there are multiple navigation landmarks

**Related:** App, Sidebar, BottomBar, Menu, Breadcrumb
**Status:** ✅

| | |
|---|---|
| **What** | Fixed navigation bar at the bottom of the viewport, typically containing 3–5 icon+label navigation items. Common in mobile-first apps. |
| **When** | Mobile/tablet layouts where bottom navigation is more thumb-accessible than top navigation. Also used for media player controls, meeting controls, or floating action areas. |
| **Why** | Thumb zones on mobile devices make bottom navigation 2–3× faster to reach than top navigation (Steven Hoober research). Follows iOS/Android platform conventions users already know. Provides persistent access to primary destinations without scrolling. |

**Sources:** S1 (Landmarks), S2 (`<nav>`), S3 (ActionList for bottom sheets), S4 (Bottom navigation), S5 (scroll-position-aware-elements)

**Twintrinsic Implementation:**
- `<div>` root with `role="navigation"` and `aria-label="Bottom navigation"`
- Flexbox layout for even distribution of nav items
- Icon + label pairs with `aria-label` on each link
- Active state indicated via `aria-current="page"`
- Fixed positioning at viewport bottom for mobile-first design

**Common Mistakes:**
- Don't use for desktop layouts — bottom navigation is a mobile pattern
- Don't put more than 5 items — cognitive load increases beyond that
- Don't forget `aria-current="page"` on the active item

**Related:** AppHeader, Sidebar, App, Menu
**Status:** ✅

| | |
|---|---|
| **What** | Vertical navigation panel, typically on the left side, containing nested navigation links, filters, or settings. May be collapsible. |
| **When** | Apps with deep navigation hierarchies (dashboards, admin panels, documentation sites). Use when you have 5+ top-level navigation items or need persistent secondary navigation. |
| **Why** | Accommodates hierarchical navigation better than horizontal tabs. Can show current location via active state highlighting. Collapsible variants save horizontal space. Should use `<nav>` landmark with `aria-label` for screen readers. |

**Sources:** S1 (Landmarks, Tree View), S2 (`<nav>`, `<aside>`), S3 (NavList), S4 (Navigation rail/drawer), S5 (navigation-drawer)

**Twintrinsic Implementation:**
- Semantic `<aside>` element as root
- Collapsible on mobile with CSS transitions
- Nested navigation with `<nav>` and `<ul>` for sidebar links
- `aria-expanded` on the collapse toggle
- `...rest` spread for native attributes

**Common Mistakes:**
- Don't use `<nav>` as the root — `<aside>` is the correct landmark for sidebars
- Don't forget `aria-label` when there are multiple `<nav>` elements on the page
- Don't hardcode sidebar width — use CSS custom properties for flexibility

**Related:** App, AppHeader, Tree, TreeMenu, Breadcrumb
**Status:** ✅

---

### 1.5 Footer
**Status:** ✅

| | |
|---|---|
| **What** | Bottom section of a page or app containing copyright, legal links, secondary navigation, social links, and contact info. |
| **When** | Every page. Place at the bottom of the page layout. |
| **Why** | Users expect to find legal info, contact details, and secondary links at the bottom ( Jakob's Law). Provides a consistent location for "boring but necessary" content. Should use `<footer>` landmark for accessibility. |

**Sources:** S1 (Landmarks), S2 (`<footer>`), S3 (PageLayout), S4 (Footer patterns), S5 (css-layout)

**Twintrinsic Implementation:**
- Semantic `<footer>` element as root
- Three-region layout: `footer-left`, `footer-center`, `footer-right` via CSS flexbox
- Accepts `left`, `center`, `right` snippets for flexible content
- `...rest` spread on `<footer>` for native attributes

**Common Mistakes:**
- Don't put primary navigation in the footer — it belongs in the header or sidebar
- Don't use `<div>` — always `<footer>` for landmark semantics
- Don't forget copyright year can be dynamic via JS

**Related:** App, AppHeader, Separator

---

## 2. Form Components

### 2.1 Input / TextInput
**Status:** ✅

| | |
|---|---|
| **What** | Single-line text input field for collecting short text data (names, emails, search queries, etc.). |
| **When** | Any form field that expects a single line of text. Use `<input type="text">` (or appropriate type like `email`, `tel`, `url`, `search`) for native browser features. |
| **Why** | Native `<input>` provides built-in validation, autocomplete, keyboard types on mobile, screen reader support, and focus management — all for free. Custom text inputs require reimplementing all of this. Use appropriate `type` attributes for mobile keyboards and autocomplete hints. |

**Sources:** S2 (`<input>`), S3 (TextInput), S4 (Text fields), S5 (forms, autofill-sign-in-form, autofill-address-form), S6 (Input)

**Twintrinsic Implementation:**
- Native `<input>` element with `type` prop (text, email, tel, url, search, password, etc.)
- Floating label via CSS `:has()` + `:placeholder-shown` — zero JS for label animation
- Form context integration via `getContext('form')` for `effectiveDisabled` and validation
- `...rest` spread on `<input>` for native attributes (`data-*`, `aria-*`)
- `id` with `crypto.randomUUID()` default for accessibility

**Common Mistakes:**
- Don't use `<div contenteditable>` — always `<input>` for form participation
- Don't forget `type="email"` for email fields — it enables mobile keyboards and native validation
- Don't override `id` unless you need label association — the default handles `aria-describedby`

**Related:** Textarea, NumberInput, AutoComplete, Combobox, FloatLabel, FormField

---

### 2.2 NumberInput
**Status:** ✅

| | |
|---|---|
| **What** | Input field specialized for numeric values, often with increment/decrement buttons and min/max constraints. |
| **When** | When the user must enter a number (quantity, price, age, percentage). Use `<input type="number">` or `<input type="range">` depending on whether precise or approximate input is needed. |
| **Why** | Native `type="number"` gives mobile numeric keyboards, built-in validation (`min`, `max`, `step`), and spinbutton accessibility. For WAI-ARIA spinbutton pattern, see S1. Avoid custom number inputs unless you need currency formatting or special increment logic. |

**Sources:** S1 (Spinbutton), S2 (`<input type="number">`), S3 (TextInput), S4 (Number field), S5 (forms), S6 (InputNumber)

**Twintrinsic Implementation:**
- Wraps native `<input type="number">` with increment/decrement buttons
- Uses `step`, `min`, `max` for constraints — all native HTML5 validation
- `aria-live="polite"` on the value display for screen reader announcements
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use `<input type="text" inputmode="numeric">` when you need step controls
- Don't forget `aria-label` on increment/decrement buttons

**Related:** Input, Slider, Knob

---

### 2.3 Textarea
**Status:** ✅

| | |
|---|---|
| **What** | Multi-line text input for longer text content (comments, descriptions, messages, code). |
| **When** | When the user needs to enter more than one line of text. Use `<textarea>` with `field-sizing: content` for auto-grow behavior. |
| **Why** | Native `<textarea>` handles line breaks, scrolling, and resize natively. `field-sizing: content` (CSS) auto-grows the field to fit content — no JS needed. Avoid `<div contenteditable>` unless you need rich text editing. |

**Sources:** S2 (`<textarea>`), S3 (Textarea), S4 (Text fields), S5 (form-fields-automatically-fit-contents), S6 (Input.TextArea)

**Twintrinsic Implementation:**
- Native `<textarea>` element with `field-sizing: content` for auto-grow (Chrome 123+)
- JS fallback for `autoResize` using `scrollHeight` when `field-sizing` isn't supported
- `aria-live="polite"` on character count when `maxLength` is set
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use `<div contenteditable>` for multi-line text — always `<textarea>`
- Don't forget `field-sizing: content` is Chrome-only — provide a JS fallback

**Related:** Input, CodeEditor, FloatLabel, FormField

---

### 2.4 Select / SelectGroup
**Status:** ✅

| | |
|---|---|
| **What** | Dropdown selection from a predefined list of options. SelectGroup wraps multiple `<optgroup>` sections. |
| **When** | When the user must choose one option from a list of 5+ items. For fewer items, prefer radio buttons (more visible, faster to scan). |
| **Why** | Native `<select>` provides keyboard navigation, screen reader support, form participation, and option grouping via `<optgroup>`. The new customizable `<select>` (CSS `appearance: base-select`) allows full styling while keeping native semantics. Custom dropdowns require reimplementing keyboard navigation, focus management, and screen reader announcements. |

**Sources:** S1 (Listbox), S2 (`<select>`, `<optgroup>`), S3 (Select), S4 (Menus and selects), S5 (animated-select-picker, branded-select-styling, custom-select-picker-layouts, rich-media-picker), S6 (Select)

**Twintrinsic Implementation:**
- Native `<select>` element with `appearance: base-select` (Chrome 135+) for customizable styling
- `::picker(select)` CSS pseudo-element for popover-style option list
- `<optgroup>` for option grouping via SelectGroup subcomponent
- Form context integration via `getContext('form')` for `effectiveDisabled`

**Common Mistakes:**
- Don't build a custom dropdown from `<div>` — use `<select>` for form participation and keyboard nav
- Don't forget `appearance: base-select` requires Chrome 135+ — provide fallback styling
- Don't use for fewer than 5 options — radio buttons are faster to scan

**Related:** SelectGroup, Combobox, Listbox, Dropdown

---

### 2.5 Dropdown
**Status:** ✅

| | |
|---|---|
| **What** | A button that opens a menu or popover containing actions, links, or options. Different from Select in that it's primarily for actions, not value selection. |
| **When** | When you need a menu of actions (edit, delete, share) or a list of navigation options triggered by a button. Use `popover="auto"` + `popovertarget` for CSS-native open/close/light-dismiss. |
| **Why** | Popover API provides top-layer rendering, light-dismiss (click outside to close), and Escape-to-close for free. No JS needed for open/close state. Should follow WAI-ARIA menu button pattern for keyboard access. |

**Sources:** S1 (Menu Button), S2 (`popover` attribute), S3 (ActionMenu, DropdownMenu), S4 (Menus), S5 (declarative-dialog-popover-control, resilient-context-menus-and-nested-dropdowns)

**Twintrinsic Implementation:**
- Deprecated wrapper around Select — kept for backward compatibility
- Delegates all behavior to the Select component

**Common Mistakes:**
- Don't use in new code — use Select or Combobox instead

**Related:** Select, Combobox, Menu

---

### 2.6 Combobox
**Status:** ✅

| | |
|---|---|
| **What** | An input field with an associated popup that suggests values as the user types. Combines a text input with a listbox/grid/tree popup. |
| **When** | When users need to filter a large dataset while typing (country selector, tag input, search with suggestions). Also for "select-only" comboboxes where the user picks from a list but can also type. |
| **Why** | Provides type-ahead filtering that `<select>` can't. Supports autocomplete behaviors (inline, list, automatic selection). The WAI-ARIA combobox pattern is well-defined with 4 autocomplete modes. Use `popover="auto"` for the popup. |

**Sources:** S1 (Combobox), S2 (`<datalist>` concept), S3 (Autocomplete, SelectPanel), S4 (Exposed dropdown menu), S5 (select-menu-interaction, validate-input-after-interaction), S6 (AutoComplete)

**Twintrinsic Implementation:**
- Uses `popover="auto"` for the suggestions panel — top-layer rendering with light-dismiss
- CSS Anchor Positioning for tethering the popup to the input
- WAI-ARIA combobox pattern with `role="combobox"` + `aria-expanded` + `aria-controls`
- Keyboard: ArrowDown/Up navigate, Enter selects, Escape closes
- Form context integration via `getContext('form')` for `effectiveDisabled`

**Common Mistakes:**
- Don't use a `<div>` dropdown — `popover="auto"` handles top-layer, light-dismiss, and z-index
- Don't forget `aria-activedescendant` for highlighting the active option

**Related:** AutoComplete, Select, Listbox, Menu

---

### 2.7 AutoComplete
**Status:** ✅

| | |
|---|---|
| **What** | A combobox variant focused on text completion — shows suggestions that complete or match the user's typed input. |
| **When** | Search fields, address forms, any field where suggesting completions saves the user time. |
| **Why** | Reduces typing errors and speeds up form completion. Can use browser-native `<datalist>` for simple cases, or a custom popup for rich suggestions. The WAI-ARIA combobox pattern covers all autocomplete modes. |

**Sources:** S1 (Combobox), S2 (`<datalist>`), S3 (Autocomplete), S5 (autofill-address-form, autofill-sign-in-form), S6 (AutoComplete)

**Twintrinsic Implementation:**
- Uses `popover="auto"` for the suggestions panel with CSS Anchor Positioning
- Supports single and multiple selection with removable chip display
- Custom `itemTemplate` for rich suggestion rendering (avatars, icons)
- `highlight` prop for matching text highlighting in suggestions
- WAI-ARIA combobox pattern with full keyboard navigation

**Common Mistakes:**
- Don't confuse with Combobox — AutoComplete is for text completion, Combobox for selection
- Don't forget to set `multiple={true}` for tag-input style behavior

**Related:** Combobox, Input, Listbox, Chip

---

### 2.8 Listbox
**Status:** ✅

| | |
|---|---|
| **What** | A widget that presents a list of options and allows the user to select one or more. Unlike `<select>`, options can contain rich content. |
| **When** | When you need a visible list of options (not hidden in a dropdown). For multi-select lists, or when options need rich content (icons, descriptions, secondary text). |
| **Why** | Supports single and multi-select, keyboard navigation (arrows, Home/End, type-ahead), and focus management. Options are always visible (no dropdown to open). Use for lists of 5–15 items that benefit from being always visible. |

**Sources:** S1 (Listbox), S2 (`<select size>` concept), S3 (ActionList), S4 (List), S5 (resilient-context-menus-and-nested-dropdowns), S6 (TreeSelect)

**Twintrinsic Implementation:**
- Always-visible list of options (no dropdown to open)
- `filter={true}` enables a filter input for narrowing options
- `filterPlaceholder` for the filter input placeholder text
- WAI-ARIA listbox pattern with `role="listbox"` + `role="option"`
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use for fewer than 5 options — use radio buttons or checkboxes
- Don't forget `aria-selected` on the selected option

**Related:** Select, Combobox, AutoComplete, Menu

---

### 2.9 Checkbox
**Status:** ✅

| | |
|---|---|
| **What** | Binary toggle (on/off, checked/unchecked). Can also be tri-state (checked, unchecked, indeterminate) for parent-group controls. |
| **When** | When the user must toggle a single option on/off. Use for independent choices (e.g., "Remember me", "I agree to terms"). For mutually exclusive choices, use radio buttons. For on/off settings that take effect immediately, consider a switch. |
| **Why** | Native `<input type="checkbox">` provides built-in form participation, keyboard toggle (Space), screen reader support, and the `:has(:user-valid)` CSS pattern for validation styling. Custom checkboxes require reimplementing all of this. Use `accent-color` to match brand colors. |

**Sources:** S1 (Checkbox), S2 (`<input type="checkbox">`), S3 (Checkbox), S4 (Checkboxes), S5 (brand-consistent-forms), S6 (Checkbox)

**Twintrinsic Implementation:**
- Native `<input type="checkbox">` with custom wrapper styling
- Supports indeterminate state via JS `element.indeterminate = true`
- `accent-color` for brand-tinted checkbox appearance
- Form context integration via `getContext('form')` for `effectiveDisabled`
- `id` with `crypto.randomUUID()` default for label association

**Common Mistakes:**
- Don't use `<div onclick>` — always `<input type="checkbox">` for form participation
- Don't forget `aria-describedby` for error messages
- Don't use for on/off settings — use Switch instead

**Related:** Radio, RadioGroup, Switch, FormField

---

### 2.10 Radio / RadioGroup
**Status:** ✅

| | |
|---|---|
| **What** | A set of mutually exclusive options where exactly one must be selected. RadioGroup wraps related radios with a shared label. |
| **When** | When the user must choose exactly one option from a small set (2–6 options). Use radio buttons over `<select>` when all options should be visible and scannable. |
| **Why** | All options visible = faster decision-making than dropdown (Nielsen Norman Group). Arrow key navigation between options is intuitive. Native `<input type="radio">` with `name` attribute provides automatic mutual exclusion. Group with `<fieldset>` + `<legend>` for accessible labeling. |

**Sources:** S1 (Radio Group), S2 (`<input type="radio">`), S3 (Radio, RadioGroup), S4 (Radio buttons), S5 (brand-consistent-forms), S6 (Radio.Group)

**Twintrinsic Implementation:**
- Native `<input type="radio">` with custom wrapper styling
- RadioGroup uses `<fieldset>` + `<legend>` for accessible grouping
- `name` attribute for mutual exclusion — native browser behavior
- Arrow key navigation between radios in a group (native)
- `accent-color` for brand-tinted appearance

**Common Mistakes:**
- Don't forget `name` attribute — without it, radios won't be mutually exclusive
- Don't use for binary on/off — use Checkbox or Switch
- Don't use `<div role="radio">` — always native `<input type="radio">`

**Related:** Checkbox, Switch, RadioGroup, FormField

---

### 2.11 Switch / InputSwitch
**Status:** ✅

| | |
|---|---|
| **What** | A toggle that switches between on/off states, visually styled as a sliding track. Semantically different from checkbox — represents an immediate state change, not a form value. |
| **When** | For settings that take effect immediately (dark mode, notifications on/off, auto-save). Use when "on/off" semantics are clearer than "checked/unchecked". |
| **Why** | Better semantic match for settings that activate/deactivate something. Screen readers announce "on/off" instead of "checked/unchecked", which is clearer for settings. The visual slider metaphor communicates instant effect better than a checkbox. Should toggle on Space key. |

**Sources:** S1 (Switch), S2 (`<input type="checkbox" role="switch">`), S3 (ToggleSwitch), S4 (Switch), S5 (brand-consistent-forms), S6 (Switch)

**Twintrinsic Implementation:**
- Uses `<input type="checkbox" role="switch">` — native checkbox with switch semantics
- Screen readers announce "on/off" instead of "checked/unchecked"
- CSS transition on the track for smooth sliding animation
- `accent-color` for brand-tinted track color
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use `<div role="switch">` — always `<input type="checkbox" role="switch">`
- Don't use for form values — use Checkbox for checked/unchecked semantics

**Related:** Checkbox, FormField

---

### 2.12 Slider
**Status:** ✅

| | |
|---|---|
| **What** | An input where the user selects a value from within a given range by moving a thumb along a track. |
| **When** | When the user needs to select a value within a known range (volume, brightness, price range, date range). Use `<input type="range">` for simple cases; custom slider for multi-thumb or rich formatting. |
| **Why** | Native `<input type="range">` provides keyboard support (arrows, Home/End), screen reader announcements of current value, and touch support. `accent-color` styles the thumb/track. Custom sliders need WAI-ARIA slider pattern (S1) for accessibility. |

**Sources:** S1 (Slider, Slider Multi-Thumb), S2 (`<input type="range">`), S3 (Slider — not in Primer, but referenced in APG), S4 (Sliders), S5 (brand-consistent-forms), S6 (Slider)

**Twintrinsic Implementation:**
- Native `<input type="range">` with custom WebKit/Firefox styling
- `accent-color` for brand-tinted thumb and track
- `<output>` element for live value display with `aria-live`
- WAI-ARIA slider pattern — native element already implements it
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't build a custom slider from `<div>` — `<input type="range">` provides keyboard nav and touch support
- Don't forget `<output>` for the value display — it's semantically correct and accessible

**Related:** NumberInput, Knob, Rating

---

### 2.13 Knob
**Status:** ✅

| | |
|---|---|
| **What** | A rotary control (like a physical knob) for selecting a value within a range. Common in audio/video production, IoT dashboards, and industrial control UIs. |
| **When** | When the UI mimics physical hardware (audio mixers, light controls, scientific instruments). Not recommended for general-purpose forms — use a slider instead. |
| **Why** | Matches user mental models in domain-specific UIs (audio engineers expect knobs). Provides a compact form factor for value selection. Should implement WAI-ARIA slider pattern (S1) with appropriate `aria-valuemin/max/now`. |

**Sources:** S1 (Slider pattern), S2 (no native element — custom), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Slider — similar concept)

**Twintrinsic Implementation:**
- SVG-based rotary control with ARIA slider pattern
- `conic-gradient` for the fill indicator based on value
- Mouse/touch drag for angle-to-value conversion
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` for screen readers
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use for general-purpose forms — use Slider instead
- Don't forget `aria-valuetext` for human-readable value announcements

**Related:** Slider, Rating, NumberInput

---

### 2.14 Rating
**Status:** ✅

| | |
|---|---|
| **What** | A star-rating or numeric rating input where users select a rating (e.g., 1–5 stars). |
| **When** | When collecting user feedback, reviews, or satisfaction scores. Use for subjective quality assessments. |
| **Why** | Familiar metaphor from e-commerce (Amazon, Yelp). Should implement WAI-ARIA slider pattern with `aria-valuetext` for "4 out of 5 stars" announcements. Supports half-star increments via appropriate step values. |

**Sources:** S1 (Slider — rating example), S2 (no native element), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- WAI-ARIA slider pattern with `role="slider"`
- Hidden `<input type="number">` for form submission
- `step` prop for half-star increments (0.5)
- `accent-color` for brand-tinted star color
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use `<input type="radio">` for star ratings — slider pattern supports half-stars and drag
- Don't forget `aria-valuetext` for "4 out of 5 stars" announcements

**Related:** Slider, NumberInput

---

### 2.15 Calendar
**Status:** ✅

| | |
|---|---|
| **What** | A date picker component showing a month grid where users can select one or more dates, or a date range. |
| **When** | When the user needs to pick a date or date range. Use `<input type="date">` for simple single-date selection; custom calendar for range selection, week numbers, or custom formatting. |
| **Why** | Native `<input type="date">` provides a platform-native date picker with full accessibility. Custom calendars are needed only for advanced features (range selection, blocked dates, multiple month view). Use `popover="auto"` for the popup panel. |

**Sources:** S1 (Dialog — date picker example), S2 (`<input type="date">`, `<input type="datetime-local">`), S3 (no direct equivalent), S4 (Date pickers), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Custom grid-based calendar with `popover="auto"` for the picker panel
- `@starting-style` + `transition-behavior: allow-discrete` for entry animation
- Range selection support with visual highlighting
- Week numbers via `weekNumber` prop
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use `<input type="date">` when you need range selection or custom formatting
- Don't forget `popover="auto"` — it handles top-layer rendering and light-dismiss

**Related:** Input, ColorPicker, Select

---

### 2.16 ColorPicker
**Status:** ✅

| | |
|---|---|
| **What** | A color selection widget, typically with a color wheel/square, hue slider, and opacity slider, plus hex/RGB/HSL input. |
| **When** | When the user needs to select a custom color (design tools, theme customization, chart colors). Use `<input type="color">` for simple cases; custom picker for HSL, opacity, or presets. |
| **Why** | Native `<input type="color">` gives a platform color dialog — simple but limited (hex only). Custom pickers support HSL/RGB switching, opacity, color history, and preset palettes. Use `popover="auto"` for the popup. |

**Sources:** S1 (no direct pattern), S2 (`<input type="color">`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Custom HSL wheel with `conic-gradient` for the color picker
- `popover="auto"` for the picker panel with light-dismiss
- Format switching: hex, RGB, HSL with live preview
- Alpha/opacity slider for transparent colors
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use `<input type="color">` when you need HSL, alpha, or preset palettes
- Don't forget to provide a hex input for precise color entry

**Related:** Input, Calendar, Slider

---

### 2.17 FileUpload
**Status:** ✅

| | |
|---|---|
| **What** | A file selection input, typically with drag-and-drop support, file preview, and upload progress. |
| **When** | When the user needs to upload files (images, documents, data). Use `<input type="file">` as the base; enhance with drag-and-drop and preview. |
| **Why** | Native `<input type="file">` provides file browser, accept filters, and multiple file support. Drag-and-drop improves UX for image uploads. Show file type icons and sizes for clarity. Should announce upload status via `aria-live` region. |

**Sources:** S1 (no direct pattern), S2 (`<input type="file">`, `<input accept>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Native `<input type="file">` as the base with custom dropzone UI
- Drag-and-drop support via `dragenter`/`dragover`/`drop` events
- `FileReader` API for preview generation
- `<progress>` element for upload progress display
- Form context integration via `getContext('form')`

**Common Mistakes:**
- Don't use `<div contenteditable>` for file uploads — always `<input type="file">`
- Don't forget `accept` attribute for file type filtering
- Don't forget `aria-live="polite"` on the progress/status region

**Related:** Input, Progress, ListInput

---

### 2.18 FloatLabel
**Status:** ✅

| | |
|---|---|
| **What** | A form field pattern where the label floats above the input when focused or filled, saving vertical space. |
| **When** | Dense forms where vertical space is at a premium (mobile forms, side panels). The label acts as a placeholder when empty and a field label when filled. |
| **Why** | Saves space compared to separate label + placeholder. Users always see the field context (floating label) even after typing. Can be implemented with CSS `:has()` — no JS needed for the float animation. Must maintain proper `<label>` + `for` association for accessibility. |

**Sources:** S1 (no direct pattern), S2 (`<label>`), S3 (FormControl), S4 (Filled text fields), S5 (autofill-highlight-inputs), S6 (Form)

**Twintrinsic Implementation:**
- CSS `:has()` + `:placeholder-shown` for label float animation — zero JS
- `@starting-style` for smooth label transition on mount
- Wraps any form input (Input, Select, Textarea) with floating label behavior

**Common Mistakes:**
- Don't use JS for the float animation — CSS `:has()` handles it natively
- Don't forget proper `<label>` + `for` association for accessibility

**Related:** Input, FormField, Select

---

### 2.19 Form / FormField / InvalidState
**Status:** ✅

| | |
|---|---|
| **What** | Form is the container; FormField wraps individual inputs with label, helper text, and error message; InvalidState displays validation errors. |
| **When** | Every form should use FormField to wrap inputs. InvalidState appears when validation fails. Use `:has(:user-valid)` / `:has(:user-invalid)` CSS for validation styling. |
| **Why** | Consistent label positioning, error display, and helper text across all form fields. `<fieldset>` + `<legend>` for groups (radio, checkbox). `:user-valid`/`:user-invalid` shows validation only after user interaction (no premature error messages). FormField should announce errors via `aria-describedby` and `aria-invalid`. |

**Sources:** S1 (forms generally), S2 (`<form>`, `<fieldset>`, `<legend>`, `<label>`), S3 (FormControl), S4 (Text fields), S5 (forms, required-field-feedback, validate-input-after-interaction, accessible-error-announcement), S6 (Form)

**Twintrinsic Implementation:**
- FormField wraps inputs with label, helper text, and error message
- `:has(:user-valid)` / `:has(:user-invalid)` for CSS-only validation styling
- `aria-describedby` links input to error/helper text
- `aria-invalid` on the input when validation fails
- Form context via `setContext('form')` / `getContext('form')` for shared state

**Common Mistakes:**
- Don't show error messages on mount — use `:user-valid`/`:user-invalid` to show after interaction
- Don't forget `aria-describedby` — screen readers need the error message linked to the input

**Related:** Input, Checkbox, Select, InvalidState

---

### 2.20 ListInput
**Status:** ✅

| | |
|---|---|
| **What** | An input that maintains a list of values (tags, chips, tokens). Users type a value and press Enter/comma to add it to the list. |
| **When** | When the user needs to enter multiple short values (tags, email recipients, skills). |
| **Why** | More natural than a comma-separated text field. Each value is a discrete, removable item. Should use `role="list"` on the container and `role="listitem"` on each tag, with a Remove button for each. |

**Sources:** S1 (no direct pattern), S2 (`<input>` + custom), S3 (TextInputWithTokens), S4 (Chips), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Maintains a list of values (tags, chips, tokens)
- Enter/comma adds a new item, Backspace removes the last
- Each tag has a Remove button with `aria-label="Remove [value]"`
- `role="list"` on the container, `role="listitem"` on each tag

**Common Mistakes:**
- Don't use a comma-separated text field — discrete items are more accessible
- Don't forget `aria-label` on remove buttons

**Related:** Chip, Tag, Input, AutoComplete

---

## 3. Navigation Components

### 3.1 Menu / MenuItem
**Status:** ✅

| | |
|---|---|
| **What** | A widget offering a list of actions or navigation choices, typically triggered by a button. Supports nested submenus. |
| **When** | For action menus (edit, delete, copy), context menus (right-click), or navigation menus (settings, account). Use `popover="auto"` + CSS Anchor Positioning for the popup. |
| **Why** | Popover API provides light-dismiss and top-layer stacking. WAI-ARIA menu pattern defines keyboard nav (arrows, Home/End, Escape, type-ahead). Arrow keys navigate between items; Enter/Space activates; Escape closes. Focus should be trapped within the menu when open. |

**Sources:** S1 (Menu and Menubar, Menu Button), S2 (`<menu>`, `popover`), S3 (ActionMenu, ActionList), S4 (Menus), S5 (resilient-context-menus-and-nested-dropdowns), S6 (Menu)

**Twintrinsic Implementation:**
- Uses `popover="auto"` for the menu panel — top-layer rendering with light-dismiss
- CSS Anchor Positioning for tethering the menu to the trigger button
- WAI-ARIA menu pattern: ArrowDown/Up navigate, Enter/Space activates, Escape closes
- Nested submenus with proper focus management

**Common Mistakes:**
- Don't use a `<div>` dropdown — `popover="auto"` handles light-dismiss and z-index
- Don't forget `aria-expanded` on the trigger button

**Related:** Dropdown, Combobox, TreeMenu

---

### 3.2 Tabs / Tab / TabList / TabPanel
**Status:** ✅

| | |
|---|---|
| **What** | A set of layered sections where only one panel is visible at a time. The user switches between panels by clicking tabs. |
| **When** | When you have 2–5 related content sections that occupy the same space (settings panels, content categories, view modes). Use for same-level content switching, not for navigation between pages. |
| **Why** | Reduces scrolling by showing one section at a time. Users expect tabs for settings/configuration (mental model from desktop apps). Horizontal tabs = content switching; vertical tabs = less common but useful for long labels. Arrow keys navigate between tabs; Enter/Space activates. Should use `role="tablist"` / `role="tab"` / `role="tabpanel"` + `aria-selected`. |

**Sources:** S1 (Tabs), S2 (no native element — `<details name>` is related but different), S3 (UnderlineNav, UnderlinePanels), S4 (Tabs), S5 (search-hidden-content, anchor-positioning-tab-underline), S6 (Tabs)

**Twintrinsic Implementation:**
- ARIA tablist pattern with `role="tablist"` / `role="tab"` / `role="tabpanel"`
- 4 variants: underline, pills, enclosed, default
- `aria-selected` on the active tab, `aria-controls` linking to panel
- Arrow keys navigate between tabs, Enter/Space activates
- Tab panels use `role="tabpanel"` with `aria-labelledby`

**Common Mistakes:**
- Don't use `<details name>` when you need proper tab semantics (aria-selected, tablist)
- Don't forget `tabindex="0"` on the active tab and `tabindex="-1"` on inactive tabs

**Related:** Accordion, Menu, Breadcrumb

---

### 3.3 Breadcrumb / BreadcrumbItem
**Status:** ✅

| | |
|---|---|
| **What** | A trail of links showing the user's current location within a site hierarchy. The last item represents the current page. |
| **When** | When the site has 3+ levels of hierarchy. Use on every page except the homepage. Place at the top of the content area. |
| **Why** | Helps users understand where they are and navigate back to parent pages. Should use `<nav aria-label="Breadcrumb">` + `<ol>` + `<li>` with `aria-current="page"` on the last link. Separator styling via CSS `::before` pseudo-element on `<li>` (no JS needed). |

**Sources:** S1 (Breadcrumb), S2 (`<nav>`, `<ol>`, `<li>`, `aria-current`), S3 (Breadcrumbs), S4 (Breadcrumbs), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Semantic `<nav aria-label="Breadcrumb">` + `<ol>` + `<li>` structure
- `aria-current="page"` on the last link (current page)
- Separator styling via CSS `::before` pseudo-element — no JS needed
- `<link>` on each item except the last (which uses `<span>` or `<a aria-current="page">`)

**Common Mistakes:**
- Don't use `<div>` for breadcrumbs — always `<nav>` + `<ol>` for landmark semantics
- Don't forget `aria-current="page"` on the last item

**Related:** App, AppHeader, Sidebar, Tree

---

### 3.4 Tree / TreeNode
**Status:** ✅

| | |
|---|---|
| **What** | A hierarchical list where items can be expanded/collapsed to show child items. Common in file explorers, navigation menus, and organizational charts. |
| **When** | When data has a parent-child hierarchy (file systems, org charts, nested categories, document outlines). For flat lists, use a listbox instead. |
| **Why** | Provides efficient navigation of hierarchical data. Arrow keys navigate between nodes; Right arrow expands; Left arrow collapses. `role="tree"` / `role="treeitem"` + `aria-expanded` / `aria-level` for screen readers. Can also use `<details>` for simple expand/collapse without full tree semantics. |

**Sources:** S1 (Tree View), S2 (`<details>`, `<summary>` concept), S3 (TreeView), S4 (no direct equivalent), S5 (search-hidden-content), S6 (Tree)

**Twintrinsic Implementation:**
- `<details>` + `<summary>` for expand/collapse — native HTML
- ARIA treeview pattern: `role="tree"` / `role="treeitem"` / `role="group"`
- `aria-expanded`, `aria-selected`, `aria-level` for screen readers
- Arrow keys: Right expands, Left collapses, Up/Down navigate siblings
- `multiSelect` implies `selectable` (fixed in recent commit)

**Common Mistakes:**
- Don't use a nested `<ul>` without ARIA roles — tree semantics require `role="tree"`
- Don't forget `aria-level` — screen readers need depth information

**Related:** TreeMenu, Listbox, Menu

---

### 3.5 TreeMenu
**Status:** ✅

| | |
|---|---|
| **What** | A navigation menu structured as a tree — hierarchical menu items that expand/collapse. |
| **When** | When navigation has deep nesting (admin panels with nested sections, documentation with nested chapters). |
| **Why** | Combines tree semantics with menu behavior. Users can navigate hierarchically without leaving the page. Should follow WAI-ARIA tree view pattern for keyboard nav and tree menu pattern for action semantics. |

**Sources:** S1 (Tree View, Menu), S2 (`<menu>`, `<li>`), S3 (NavList), S4 (Menus), S5 (resilient-context-menus-and-nested-dropdowns), S6 (Menu)

**Twintrinsic Implementation:**
- Combines tree semantics with menu behavior
- Hierarchical navigation items that expand/collapse
- Uses `role="tree"` / `role="treeitem"` for semantics
- `...rest` spread for native attributes

**Common Mistakes:**
- Don't use for flat navigation — use Menu or Breadcrumb instead
- Don't forget keyboard navigation — arrow keys should work like Tree

**Related:** Tree, Menu, Sidebar

---

## 4. Data Display Components

### 4.1 DataTable
**Status:** ✅

| | |
|---|---|
| **What** | A tabular data display with sorting, filtering, pagination, row selection, and column resizing. |
| **When** | When displaying structured data with multiple columns (user lists, product catalogs, financial data). Use for data that benefits from column-based comparison. |
| **Why** | Native `<table>` provides semantic structure for screen readers. Sorting should use `aria-sort` on column headers. Row selection with `aria-selected`. Pagination with `aria-label` on nav controls. For editable cells, use the WAI-ARIA grid pattern (S1) instead of table. |

**Sources:** S1 (Table, Grid), S2 (`<table>`, `<thead>`, `<tbody>`, `<th scope>`), S3 (DataTable), S4 (Data tables), S5 (no direct equivalent), S6 (Table)

**Twintrinsic Implementation:**
- Native `<table>` + `<thead>` + `<tbody>` + `<th scope>` for semantic structure
- `aria-sort` on sorted column headers
- `aria-selected` on selected rows
- `content-visibility: auto` on `<tbody>` for large table performance
- `@starting-style` for row entry animations

**Common Mistakes:**
- Don't use `<div role="table">` — always native `<table>` for semantics
- Don't forget `<th scope="col">` — screen readers need column header associations

**Related:** Listbox, EventsTable, PropsTable

---

### 4.2 Badge
**Status:** ✅

| | |
|---|---|
| **What** | A small, inline label used to convey status, count, or category. Typically a pill-shaped element with text. |
| **When** | To show counts (notifications: "3"), status (active/inactive), or categories (tags). Use inline, not as standalone elements. |
| **Why** | Provides at-a-glance status information without taking up space. Should use semantic color coding (green = success, red = error). Keep text short (1–3 words). If the badge is purely decorative, add `aria-hidden="true"`. If it conveys information, ensure sufficient color contrast (WCAG AA). |

**Sources:** S1 (no direct pattern), S2 (`<span>` or `<output>`), S3 (CounterLabel, Label, StateLabel), S4 (Badges), S5 (no direct equivalent), S6 (Badge)

**Twintrinsic Implementation:**
- `<span>` with variant classes for status/count/category
- `accent-color` for consistent theming
- `aria-hidden="true"` for decorative badges, `aria-label` for informative ones
- WCAG AA color contrast for status colors

**Common Mistakes:**
- Don't use a `<div>` — `<span>` is more semantic for inline content
- Don't rely solely on color to convey status — add text or icons

**Related:** Tag, Chip, Avatar

---

### 4.3 Avatar / AvatarGroup
**Status:** ✅

| | |
|---|---|
| **What** | An image or icon representing a user or organization. AvatarGroup stacks multiple avatars with overlap. |
| **When** | To show user identity in comments, lists, profiles, or team views. AvatarGroup shows a team or group of users. |
| **Why** | Humanizes the interface — users recognize faces faster than names. Should use `<img>` with descriptive `alt` text (e.g., "Avatar of John Doe"). For initials fallback, use `aria-label` on the element. AvatarGroup should announce "Group of N avatars" and individual names on focus. |

**Sources:** S1 (no direct pattern), S2 (`<img>` with `alt`), S3 (Avatar, AvatarStack), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Avatar)

**Twintrinsic Implementation:**
- `<img>` with `alt` text for user avatars
- `aspect-ratio: 1` for consistent circular sizing
- Fallback to initials when no image is provided
- AvatarGroup with overlap using negative margin
- `<picture>` with `<source>` for AVIF/WebP responsive images

**Common Mistakes:**
- Don't forget `alt` text — even if decorative, use `alt=""` (empty alt)
- Don't use `<div>` for the image — always `<img>` for semantics

**Related:** Badge, Icon, Image

---

### 4.4 Tag / TagGroup
**Status:** ✅

| | |
|---|---|
| **What** | A compact label for categorizing or filtering content. Tags are removable and can be interactive (click to filter). |
| **When** | To display categories, labels, or filters on items (blog post tags, user skills, status labels). Use when items can have multiple categories. |
| **Why** | Provides scannable metadata about content. Removable tags should have a visible close button with `aria-label="Remove [tag name]"`. TagGroup should use `role="group"` with a group label. Keyboard users should be able to Tab to each tag and Enter/Space to activate. |

**Sources:** S1 (no direct pattern), S2 (`<span>`), S3 (Token, LabelGroup), S4 (Chips), S5 (no direct equivalent), S6 (Tag)

**Twintrinsic Implementation:**
- `<span>` with removable button for delete action
- `role="group"` with group label for TagGroup
- Each removable tag has `aria-label="Remove [tag name]"`
- `dispatchGroupRemove` helper for consistent removal events

**Common Mistakes:**
- Don't forget `aria-label` on remove buttons
- Don't use `<div>` — `<span>` is more semantic for inline tags

**Related:** Chip, ChipGroup, ListInput

---

### 4.5 Chip / ChipGroup
**Status:** ✅

| | |
|---|---|
| **What** | A compact element representing an input, attribute, or action. Chips can be removable, selectable, or clickable. More interactive than tags. |
| **When** | For filter chips (click to toggle a filter), input chips (enter values as chips), or choice chips (select one of several options). |
| **Why** | Material Design's chip pattern — compact, scannable, and interactive. Chips can contain icons, avatars, and close buttons. Should follow WAI-ARIA button pattern for clickable chips. Removable chips should announce removal via `aria-live`. |

**Sources:** S1 (no direct pattern), S2 (`<button>` or `<span>`), S3 (Token), S4 (Chips), S5 (no direct equivalent), S6 (Tag)

**Twintrinsic Implementation:**
- `<button>` for clickable chips (more interactive than Tag)
- `aria-pressed` for toggle chips
- `aria-live="polite"` for dynamic chip addition/removal
- Icons, avatars, and close buttons supported

**Common Mistakes:**
- Don't use `<span onclick>` — always `<button>` for interactive chips
- Don't forget `aria-pressed` for toggle state

**Related:** Tag, TagGroup, Button

---

### 4.6 Tooltip
**Status:** ✅

| | |
|---|---|
| **What** | A popup that displays informational text when the user hovers over or focuses on an element. Does not receive focus itself. |
| **When** | To provide additional context for an icon, abbreviation, or truncated text. Use for non-essential, supplementary information. |
| **Why** | Helps users understand unfamiliar icons or abbreviations without cluttering the UI. Should use `popover="auto"` for top-layer rendering + CSS Anchor Positioning for tethering. `role="tooltip"` + `aria-describedby` on the trigger. Escape dismisses. No focus inside tooltip (if focusable content needed, use a dialog/popover instead). |

**Sources:** S1 (Tooltip), S2 (`<abbr title>`, `title` attribute), S3 (Tooltip), S4 (Tooltips), S5 (position-aware-tooltips, interest-triggered-tooltips), S6 (Tooltip)

**Twintrinsic Implementation:**
- Uses `popover="hint"` + `interestfor` for hover-triggered display
- CSS Anchor Positioning for tethering to the trigger element
- `role="tooltip"` + `aria-describedby` on the trigger
- Escape dismisses; no focus inside tooltip

**Common Mistakes:**
- Don't put focusable content in a tooltip — use a dialog/popover instead
- Don't forget `aria-describedby` — screen readers need the tooltip linked

**Related:** Menu, Popover, Modal

---

### 4.7 EventsTable / PropsTable
**Status:** ✅

| | |
|---|---|
| **What** | Specialized data tables for documenting component APIs — EventsTable shows callback events, PropsTable shows component properties. |
| **When** | In documentation pages to present component API references in a structured, scannable format. |
| **Why** | Developers need to quickly find prop names, types, defaults, and descriptions. A table format is scannable and sortable. Should use native `<table>` with `<th scope="col">` for headers. Auto-generated from TypeScript types for accuracy. |

**Sources:** S1 (Table), S2 (`<table>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Native `<table>` with `<th scope="col">` for headers
- Auto-generated from TypeScript types via `propsMetadata`
- `<caption>` for table title
- `content-visibility: auto` for large tables

**Common Mistakes:**
- Don't use `<div>` — always `<table>` for semantic data display
- Don't forget `<th scope="col">` for column header associations

**Related:** DataTable, CompatibilityMatrix

---

### 4.8 CompatibilityMatrix
**Status:** ✅

| | |
|---|---|
| **What** | A table showing browser/platform support for specific features or APIs. |
| **When** | In documentation to show which features work in which browsers. Auto-generated from feature detection tests. |
| **Why** | Helps developers understand browser support without manual research. Should use native `<table>` with clear visual indicators (checkmarks, crosses, partial support icons). |

**Sources:** S1 (no direct pattern), S2 (`<table>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Native `<table>` with clear visual indicators
- Auto-generated from feature detection tests
- Checkmarks, crosses, partial support icons

**Common Mistakes:**
- Don't use color alone to indicate support — add icons or text

**Related:** DataTable, PropsTable, EventsTable

---

## 5. Feedback Components

### 5.1 Modal / Dialog
**Status:** ✅

| | |
|---|---|
| **What** | A window overlaid on the primary content that requires user interaction before they can return to the app. Blocks interaction with content behind it. |
| **When** | For critical actions that need confirmation (delete, discard changes), important messages (error alerts), or focused tasks (multi-step forms, detail views). Use `<dialog>` with `closedby="any"` for light-dismiss. |
| **Why** | Native `<dialog>` provides: inert background (users can't interact behind it), focus trapping (Tab stays inside), Escape to close, `::backdrop` for dimming, `closedby="any"` for light-dismiss. Invoker commands (`command="show-modal" commandfor="id"`) allow opening from buttons without JS. `@starting-style` + `transition-behavior: allow-discrete` for enter/exit animations. Far superior to custom div-based modals. |

**Sources:** S1 (Dialog Modal), S2 (`<dialog>`), S3 (Dialog, ConfirmationDialog), S4 (Dialogs), S5 (light-dismiss-a-dialog, declarative-dialog-popover-control, animate-to-from-top-layer, platform-controls-dismiss-dialog), S6 (Modal)

**Twintrinsic Implementation:**
- Native `<dialog closedby="any">` for light-dismiss dialogs
- `@starting-style` + `transition-behavior: allow-discrete` for enter/exit animations
- `::backdrop` for dimming the background
- Focus trapping via native `<dialog>` behavior
- Escape to close (native)

**Common Mistakes:**
- Don't use a `<div>` overlay — `<dialog>` provides inert background, focus trap, and Escape
- Don't forget `closedby="any"` for light-dismiss behavior

**Related:** Toast, Popover, Menu

---

### 5.2 Toast
**Status:** ✅

| | |
|---|---|
| **What** | A brief, non-blocking notification that appears temporarily (typically bottom-right or top-right) and auto-dismisses. Used for success messages, warnings, or status updates. |
| **When** | For ephemeral feedback after an action (saved, copied, sent). Don't use for critical errors or actions requiring user response — use a dialog instead. |
| **Why** | Non-intrusive — doesn't block the user's workflow. Multiple toasts can stack. Should use `aria-live="polite"` region so screen readers announce new toasts. Auto-dismiss after a reasonable time (5–10 seconds). Provide a manual close button. Don't use Popover API (one-at-a-time limitation conflicts with stacking). Use `@starting-style` for entry animation. |

**Sources:** S1 (Alert pattern — related), S2 (`<output>`, `aria-live`), S3 (Banner), S4 (Snackbars), S5 (persistent-toast-notifications), S6 (Message)

**Twintrinsic Implementation:**
- `@starting-style` + `transition-behavior: allow-discrete` for entry animation
- `content-visibility: auto` for off-screen performance
- `aria-live="polite"` region for screen reader announcements
- Auto-dismiss after configurable timeout
- Multiple toasts stack (not limited by Popover API)

**Common Mistakes:**
- Don't use Popover API for toasts — it's one-at-a-time, conflicts with stacking
- Don't forget `aria-live="polite"` — screen readers need to announce new toasts

**Related:** Modal, Skeleton, Progress

---

### 5.3 Skeleton
**Status:** ✅

| | |
|---|---|
| **What** | A placeholder preview of content that is loading — typically gray blocks/shapes that mimic the layout of the actual content. |
| **When** | While content is being fetched or rendered. Use for any async content (data tables, profiles, cards, lists). Show immediately on page load, not after a delay. |
| **Why** | Reduces perceived loading time by showing content structure before it loads. Better than spinners for layout-heavy content. Should use `aria-busy="true"` and `aria-live="polite"` on the loading region. `@starting-style` for smooth entry animation. `content-visibility: auto` for off-screen skeleton performance. |

**Sources:** S1 (no direct pattern), S2 (`aria-busy`, `aria-live`), S3 (SkeletonAvatar, SkeletonBox, SkeletonText), S4 (no direct equivalent), S5 (defer-rendering-heavy-content), S6 (Skeleton)

**Twintrinsic Implementation:**
- CSS `@keyframes` shimmer animation with `@property` for gradient angle
- `@starting-style` for smooth entry animation
- `content-visibility: auto` for off-screen skeleton performance
- `aria-busy="true"` and `aria-live="polite"` on the loading region
- `transition-behavior: allow-discrete` for exit when content loads

**Common Mistakes:**
- Don't use spinners for layout-heavy content — skeletons show structure
- Don't forget `aria-busy="true"` — screen readers need loading state

**Related:** Progress, Lazy, Toast

---

### 5.4 Progress
**Status:** ✅

| | |
|---|---|
| **What** | A visual indicator showing how much of a task has been completed. Can be determinate (specific percentage) or indeterminate (loading). |
| **When** | For tasks with known duration (file upload, form submission, multi-step process). Use `<progress>` for determinate; indeterminate for unknown duration. |
| **Why** | Native `<progress>` provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax` automatically. Screen readers announce progress percentage. Avoid using `<meter>` for progress (different semantics — meter is for static measurements within a range). |

**Sources:** S1 (Meter — related but different), S2 (`<progress>`, `<meter>`), S3 (ProgressBar), S4 (Progress indicators), S5 (scroll-progress-indicator), S6 (Progress)

**Twintrinsic Implementation:**
- Native `<progress>` element with `aria-valuenow/min/max`
- CSS styling for track and fill with `accent-color`
- Indeterminate mode via CSS animation (no `value` attribute)
- `<meter>` for scalar measurements within a range

**Common Mistakes:**
- Don't use `<div>` with width animation — `<progress>` is semantic and accessible
- Don't confuse `<progress>` (task completion) with `<meter>` (scalar measurement)

**Related:** Skeleton, Metrics, NumberInput

---

### 5.5 Stepper / StepperStep
**Status:** ✅

| | |
|---|---|
| **What** | A visual representation of a multi-step process, showing completed, current, and upcoming steps. |
| **When** | For multi-step workflows (checkout, registration, onboarding). Show the user where they are in the process. |
| **Why** | Reduces anxiety about process length. Users know how many steps remain. Should use `<ol>` for semantic ordering + `aria-current="step"` on the active step. Steps should be focusable and clickable (for non-linear wizards). |

**Sources:** S1 (no direct pattern), S2 (`<ol>`, `aria-current`), S3 (no direct equivalent — but Stepper is common), S4 (no direct equivalent), S5 (scroll-progress-indicator — related)

**Twintrinsic Implementation:**
- `<ol>` for semantic ordering of steps
- `aria-current="step"` on the active step
- Step states: completed (checkmark), current (active), upcoming (muted)
- `<nav>` wrapping for landmark semantics

**Common Mistakes:**
- Don't use `<ul>` — steps have inherent order, so `<ol>` is correct
- Don't forget `aria-current="step"` on the active step

**Related:** Timeline, Breadcrumb, Accordion

---

## 6. Navigation Components (continued)

### 6.1 Pagination
**Status:** ✅

| | |
|---|---|
| **What** | A set of numbered links for navigating between pages of content. |
| **When** | When content is split across multiple pages (search results, blog posts, data tables). Use when the total count is known. |
| **Why** | Provides predictable navigation through paginated content. Should use `<nav aria-label="Pagination">` + `<ol>` + `<li>` with `aria-current="page"` on the active page. Previous/Next buttons with appropriate `aria-label`. |

**Sources:** S1 (no direct pattern), S2 (`<nav>`, `<ol>`, `aria-current`), S3 (Pagination), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Pagination)

---

## 7. Layout Components

### 7.1 Container / Section / Panel
**Status:** ✅

| | |
|---|---|
| **What** | Structural layout primitives. Container centers content with max-width. Section groups related content with a heading. Panel is a bordered/rounded card-like container. |
| **When** | Container: every page's main content area. Section: grouping related content with a heading. Panel: sidebar content, cards, distinct content blocks. |
| **Why** | Consistent spacing and max-width across the app. Section should use `<section>` with a heading for proper semantics. Panel should use `<div>` with `role="region"` and `aria-label` if it's a landmark. Container Queries (`@container`) allow components to adapt to their parent's size. |

**Sources:** S1 (Landmarks), S2 (`<section>`, `<div>`, `<article>`), S3 (PageLayout, Stack), S4 (no direct equivalent), S5 (css-layout, size-aware-styling), S6 (Space)

**Twintrinsic Implementation:**
- Container: CSS Container Queries (`container-type: inline-size`) for responsive child styling
- Section: `<section>` semantic element with heading
- Panel: `<div>` with `role="region"` and `aria-label` if it's a landmark
- `...rest` spread for native attributes

**Common Mistakes:**
- Don't use `<div>` for Section — `<section>` is the correct semantic element
- Don't forget `<section>` needs a heading for proper semantics

**Related:** Card, App, Container

---

### 7.2 Hero
**Status:** ✅

| | |
|---|---|
| **What** | A prominent banner at the top of a page featuring a headline, subtext, and call-to-action. Often includes a background image or gradient. |
| **When** | Homepage, landing pages, or feature pages. Use to introduce the page's purpose and guide users to the primary action. |
| **Why** | First impressions matter — the hero section is typically the largest visual element on the page. Should use `<header>` or `<section>` with a heading. CTA button should be the first focusable element. Background images should have sufficient contrast for text (WCAG AA). |

**Sources:** S1 (no direct pattern), S2 (`<header>`, `<section>`, `<h1>`), S3 (PageHeader — similar), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- `<header>` or `<section>` as root with heading
- CTA button should be the first focusable element
- Background images with sufficient contrast (WCAG AA)
- Responsive layout with CSS Grid or Flexbox

**Common Mistakes:**
- Don't use `<div>` — `<header>` or `<section>` is correct for landmark semantics
- Don't forget to check color contrast on text over background images

**Related:** AppHeader, Card, Container

---

### 7.3 Splitter
**Status:** ✅

| | |
|---|---|
| **What** | A moveable divider between two panes that allows users to resize each pane by dragging. |
| **When** | When users need to compare two content areas side-by-side (code editor + preview, email list + email content, file tree + file content). |
| **Why** | Gives users control over content distribution. Should follow WAI-ARIA window splitter pattern (S1). Keyboard users should be able to resize with arrow keys. Use `aria-valuenow` / `aria-valuemin` / `aria-valuemax` for the current position. CSS `resize` property provides basic functionality; custom JS needed for precise control. |

**Sources:** S1 (Window Splitter), S2 (CSS `resize`), S3 (SplitPageLayout), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- WAI-ARIA window splitter pattern
- Keyboard: arrow keys resize, Enter resets
- `aria-valuenow/min/max` for position
- CSS `resize` for basic functionality; custom JS for precise control

**Common Mistakes:**
- Don't use CSS `resize` alone — it doesn't support multi-panel layout
- Don't forget keyboard accessibility — arrow keys must work

**Related:** Container, Section, Card

---

### 7.4 Masonry
**Status:** ✅

| | |
|---|---|
| **What** | A grid layout where items of varying heights are arranged to minimize vertical gaps (like a Pinterest board). |
| **When** | For image galleries, card collections, or content feeds where items have different heights and you want an organic, space-efficient layout. |
| **Why** | More visually interesting than a uniform grid. Better space utilization for variable-height content. CSS `grid-template-rows: masonry` (Firefox experimental) or multi-column CSS for progressive enhancement. `content-visibility: auto` for off-screen performance. |

**Sources:** S1 (no direct pattern), S2 (CSS Grid), S3 (no direct equivalent), S4 (no direct equivalent), S5 (css-layout), S6 (Waterfall — similar concept)

**Twintrinsic Implementation:**
- CSS columns for masonry-like flow (`columns: 3`)
- `content-visibility: auto` for off-screen items
- `break-inside: avoid` on items to prevent splitting
- Progressive enhancement with `@supports (grid-template-rows: masonry)`

**Common Mistakes:**
- Don't use JS for layout measurement — CSS columns handle it natively
- Don't forget `break-inside: avoid` — items can split across columns without it

**Related:** Masonry, Container, Card

---

## 8. Utility Components

### 8.1 Button / ButtonGroup
**Status:** ✅

| | |
|---|---|
| **What** | An interactive element that triggers an action when clicked. ButtonGroup renders multiple buttons as a unified control set. |
| **When** | Every interactive action that isn't a link. Use `<button>` for actions (submit, delete, toggle) and `<a>` for navigation. ButtonGroup for related actions (save/cancel, bold/italic/underline). |
| **Why** | Native `<button>` provides: keyboard activation (Enter/Space), focus styling, disabled state, form submission, and screen reader announcement ("button"). Never use `<div onclick>` — it's inaccessible. Use `type="submit"` for form buttons, `type="button"` for JS-only buttons. |

**Sources:** S1 (Button), S2 (`<button>`), S3 (Button, ButtonGroup, IconButton), S4 (Buttons), S5 (custom-button-actions, declarative-dialog-popover-control), S6 (Button)

**Twintrinsic Implementation:**
- Conditional `<a>` or `<button>` based on `href` prop
- `type="submit"` for form buttons, `type="button"` for JS-only
- Native keyboard activation (Enter/Space) — zero JS needed
- `...rest` spread on every branch (a/button)
- `disabled` prop with `aria-disabled` for consistent semantics

**Common Mistakes:**
- Don't use `<div onclick>` — always `<button>` or `<a>` for interactive elements
- Don't forget `type="button"` — without it, the button submits forms by default

**Related:** ButtonGroup, Chip, Tag, Link

---

### 8.2 Card
**Status:** ✅

| | |
|---|---|
| **What** | A styled container that groups related content — typically with a border, padding, and shadow. Can be clickable or static. |
| **When** | To group related information (product cards, user profiles, feature highlights). Use for content that forms a distinct visual unit. |
| **Why** | Creates visual hierarchy and scannable content blocks. If clickable, use `<a>` or `<button>` as the card element (not a `<div>` with onclick). If static, use `<div>` or `<article>` with `role="region"` + `aria-label`. Container Queries allow cards to adapt their layout based on their own width. |

**Sources:** S1 (no direct pattern), S2 (`<article>`, `<div>`), S3 (Card), S4 (Cards), S5 (size-aware-styling), S6 (Card)

**Twintrinsic Implementation:**
- Semantic `<article>` element as root
- Container Queries for responsive child layout
- `...rest` spread with `on${string}` event handler index signature
- Clickable cards use `<a>` or `<button>` as root (not `<div onclick>`)

**Common Mistakes:**
- Don't use `<div onclick>` for clickable cards — use `<a>` or `<button>`
- Don't forget `role="region"` + `aria-label` if the card is a landmark

**Related:** Container, Section, Button

---

### 8.3 CodeBlock / CodeBlockSpeed
**Status:** ✅

| | |
|---|---|
| **What** | A syntax-highlighted code display component. CodeBlock uses Prism.js; CodeBlockSpeed uses a lightweight alternative. |
| **When** | To display code samples in documentation, tutorials, or technical content. Use for read-only code display. |
| **Why** | Syntax highlighting improves code readability dramatically. Should use `<pre><code>` with `class="language-[lang]"` for proper semantics. Prism.js provides language detection and highlighting. Add a copy-to-clipboard button with `aria-label="Copy code"`. |

**Sources:** S1 (no direct pattern), S2 (`<pre>`, `<code>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- `<pre><code>` with `class="language-[lang]"` for semantics
- Prism.js for syntax highlighting
- Copy-to-clipboard button with `aria-label="Copy code"`
- `content-visibility: auto` for large code blocks

**Common Mistakes:**
- Don't use `<div>` with `white-space: pre` — always `<pre><code>`
- Don't forget the copy button — developers expect it

**Related:** CodeEditor, CodeBlockSpeed, Icon

---

### 8.4 CodeEditor
**Status:** ✅

| | |
|---|---|
| **What** | A full-featured code editor with syntax highlighting, line numbers, autocomplete, and editing capabilities. Uses CodeMirror. |
| **When** | When users need to write or edit code (configuration editors, playground, admin tools). Not for read-only code display (use CodeBlock). |
| **Why** | CodeMirror is battle-tested with hundreds of plugins, accessibility support, and performance optimizations. Custom code editors can't match its feature set. Keep as-is per user decision. |

**Sources:** S1 (no direct pattern), S2 (`<textarea>` concept), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- CodeMirror integration — full-featured, battle-tested
- Syntax highlighting, line numbers, autocomplete, plugins
- Kept as-is per user decision — too complex to replace

**Common Mistakes:**
- Don't use for read-only code display — use CodeBlock instead

**Related:** CodeBlock, CodeBlockSpeed

---

### 8.5 Icon / IconifyIcon
**Status:** ✅

| | |
|---|---|
| **What** | An SVG icon component powered by Iconify, supporting multiple icon sets (tabler, heroicons, fontawesome, etc.). |
| **When** | For any icon in the UI — buttons, navigation, status indicators, decorative elements. Use `aria-hidden="true"` for decorative icons; provide `aria-label` for meaningful icons. |
| **Why** | Iconify provides 150,000+ icons from 100+ icon sets. Icons load on-demand from the Iconify API. The `preloadIcons()` helper can prefetch icons for performance. Keep as-is per user decision — Icon component is the centralized icon system. |

**Sources:** S1 (no direct pattern), S2 (`<svg>`, `<img>` for icons), S3 (Icon, IconButton), S4 (Icons), S5 (deliver-optimized-decorative-images), S6 (no direct equivalent)

**Twintrinsic Implementation:**
- Wraps `@iconify/svelte` for 150,000+ icons from 100+ icon sets
- `preloadIcons()` for runtime prefetching
- `preloadManifest` for build-time registration
- `addLinkPreloads` for `<link rel="preload">` injection
- `aria-hidden="true"` for decorative icons

**Common Mistakes:**
- Don't use inline SVGs — use the Icon component for consistency
- Don't forget `aria-hidden="true"` for decorative icons

**Related:** Avatar, Badge, Button

---

### 8.6 Lazy / LazyPanel
**Status:** ✅

| | |
|---|---|
| **What** | A component that defers rendering of its children until they enter the viewport (or until a specified trigger). LazyPanel is a variant for panel content. |
| **When** | For expensive components that should only render when visible (maps, charts, heavy data visualizations). Use for below-the-fold content. |
| **Why** | Reduces initial page load time and memory usage. Can use Intersection Observer API for viewport detection. Alternative: use `loading="lazy"` on images and `content-visibility: auto` on sections. LazyPanel useful for tab panels that shouldn't render until first activated. |

**Sources:** S1 (no direct pattern), S2 (`loading="lazy"`, Intersection Observer), S3 (no direct equivalent), S4 (no direct equivalent), S5 (defer-rendering-heavy-content, defer-work-until-scroll-ends), S6 (no direct equivalent)

**Twintrinsic Implementation:**
- Intersection Observer for viewport detection
- `<img loading="lazy">` for native image lazy loading
- `content-visibility: auto` for off-screen content skipping
- LazyPanel variant for tab panels

**Common Mistakes:**
- Don't use JS timers for lazy loading — Intersection Observer is the standard
- Don't forget `content-visibility: auto` as a CSS-only alternative for simple cases

**Related:** Skeleton, Card, Container

---

### 8.7 Map
**Status:** ✅

| | |
|---|---|
| **What** | An interactive map component using Leaflet.js for displaying geographic data, markers, and regions. |
| **When** | When the app needs to display geographic/location data (store locators, delivery tracking, real estate). |
| **Why** | Leaflet is lightweight, mobile-friendly, and supports OpenStreetMap tiles. Custom map implementations can't match its tile rendering, interaction, and plugin ecosystem. Keep as-is per user decision. |

**Sources:** S1 (no direct pattern), S2 (`<canvas>`, `<iframe>` concept), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Leaflet.js integration — lightweight, mobile-friendly
- OpenStreetMap tiles by default
- Kept as-is per user decision — too complex to replicate

**Common Mistakes:**
- Don't use `<map>` + `<area>` — those are for image maps, not interactive maps

**Related:** Icon, CodeEditor

---

### 8.8 Separator
**Status:** ✅

| | |
|---|---|
| **What** | A visual divider between content sections. Can be a simple line, or include text/elements in the center. |
| **When** | To visually separate distinct content sections. Use `<hr>` for thematic breaks between sections. |
| **Why** | Native `<hr>` provides semantic meaning (thematic break) that screen readers announce. For text-in-separator, use CSS `::before`/`::after` with the `content` property — no need for a custom div. Modern CSS can style `<hr>` with gradients, dots, or text. |

**Sources:** S1 (no direct pattern), S2 (`<hr>`), S3 (no direct equivalent), S4 (Dividers), S5 (no direct equivalent), S6 (Divider)

**Twintrinsic Implementation:**
- Native `<hr>` element for semantic thematic breaks
- CSS-only variants: solid, dashed, dotted, gradient, with text
- `role="separator"` when used as a visual divider (not thematic break)
- `aria-orientation="vertical"` for vertical separators

**Common Mistakes:**
- Don't use `<div>` — `<hr>` is semantic and accessible
- Don't forget `role="separator"` when the `<hr>` is visual, not thematic

**Related:** Container, Section, Card

---

### 8.9 ThemeToggle
**Status:** ✅

| | |
|---|---|
| **What** | A button/switch that toggles between light and dark mode (and potentially other themes). |
| **When** | In the app header or settings to let users switch themes. Respect `prefers-color-scheme` media query as the default. |
| **Why** | Users expect theme switching in modern apps. Store preference in `localStorage`. Use `data-theme` attribute on `<html>` for CSS-based theming. The `light-dark()` CSS function can resolve colors based on `color-scheme`. Transition smoothly between themes with CSS transitions. |

**Sources:** S1 (no direct pattern), S2 (`prefers-color-scheme`, `color-scheme`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (dark-mode, component-specific-light-dark-theme, design-token-reactivity), S6 (no direct equivalent)

**Twintrinsic Implementation:**
- Toggles `data-theme` attribute on `<html>` for CSS-based theming
- Respects `prefers-color-scheme` media query as default
- Stores preference in `localStorage`
- `id` with `crypto.randomUUID()` default
- `...rest` spread for native attributes

**Common Mistakes:**
- Don't use JS to toggle individual CSS properties — use `data-theme` + CSS custom properties
- Don't forget to respect system preference as the default

**Related:** Container, Section

---

### 8.10 Timeline / TimelineItem
**Status:** ✅

| | |
|---|---|
| **What** | A visual representation of events in chronological order, displayed as a vertical or horizontal line with nodes at each event. |
| **When** | To show event history, activity logs, audit trails, or step-by-step processes. Use when chronological order is the primary organizing principle. |
| **Why** | More visual and scannable than a plain list for chronological data. Should use `<ol>` for semantic ordering. Each TimelineItem should use `<li>` with a time element (`<time datetime="...">`) for the date. Screen readers benefit from the ordered list semantics. |

**Sources:** S1 (no direct pattern), S2 (`<ol>`, `<li>`, `<time>`), S3 (Timeline), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Timeline)

**Twintrinsic Implementation:**
- Semantic `<ol>` + `<li>` for chronological ordering
- `<time datetime="...">` for machine-readable dates
- Connecting lines via CSS `::before` pseudo-element
- Vertical and horizontal layout variants

**Common Mistakes:**
- Don't use `<ul>` — events have inherent order, so `<ol>` is correct
- Don't forget `<time datetime="...">` for screen readers and SEO

**Related:** Stepper, Breadcrumb, Listbox

---

### 8.11 RenderStringOrSnippet
**Status:** ✅

| | |
|---|---|
| **What** | A utility component that renders either a string or a Svelte snippet/fragment, providing flexibility in how content is passed. |
| **When** | Internal utility used by other components to accept either a string prop or a snippet slot for content. |
| **Why** | Enables components to accept simple strings (`header="Title"`) or complex snippets (`{#snippet header()}...{/snippet}`). Improves developer ergonomics — simple cases stay simple, complex cases are possible. |

**Sources:** S1 (no direct pattern), S2 (no direct equivalent), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- Utility component for rendering either a string or Svelte snippet
- Used internally by other components to accept flexible content
- No public API — internal only

**Common Mistakes:**
- Don't use directly — it's an internal utility

**Related:** No related public components

---

## 9. Metrics / Chart Components

### 9.1 AreaChart / BarChart / LineChart / PieChart / DonutChart / HorizontalBarChart
**Status:** ✅

| | |
|---|---|
| **What** | Data visualization components for displaying numerical data as charts. Each type has specific use cases. |
| **When** | **AreaChart**: Trends over time with volume emphasis. **BarChart**: Comparing discrete categories. **LineChart**: Trends over time (continuous data). **PieChart**: Part-to-whole with ≤6 categories. **DonutChart**: Part-to-whole with space for center label. **HorizontalBarChart**: Long category labels or ranking. |
| **Why** | Visual data representation is faster to understand than tables for trends and comparisons. Choose chart type based on the data relationship: comparison = bar, trend = line/area, composition = pie/donut. Always include accessible data tables as alternatives. Use `aria-label` on the chart container. |

**Sources:** S1 (no direct pattern), S2 (`<canvas>`, `<svg>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- SVG-based chart rendering for Area, Bar, Line, Pie, Donut, HorizontalBar
- `aria-label` on chart container for screen readers
- Accessible data tables as alternatives
- `content-visibility: auto` for off-screen charts

**Common Mistakes:**
- Don't use `<canvas>` without a text alternative — SVG is more accessible
- Don't forget to provide an accessible data table alternative

**Related:** KPICard, MetricGrid, GaugeChart

---

### 9.2 GaugeChart
**Status:** ✅

| | |
|---|---|
| **What** | A semicircular or circular gauge showing a single value within a range (like a speedometer). |
| **When** | To show a single KPI or metric against a target (CPU usage, completion rate, score). Use when the value has a meaningful min/max range. |
| **Why** | More visually impactful than a number alone. Should use `role="meter"` with `aria-valuenow/min/max` for accessibility. Provide text alternative with the actual value. |

**Sources:** S1 (Meter), S2 (`<meter>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- SVG-based semicircular/circular gauge
- `role="meter"` with `aria-valuenow/min/max`
- Text alternative with actual value
- `conic-gradient` for the fill indicator

**Common Mistakes:**
- Don't use `<div>` with CSS rotation — always `role="meter"` for accessibility
- Don't forget the text alternative — screen readers can't read SVG

**Related:** Slider, Progress, NumberInput

---

### 9.3 KPICard / StatsCard / MetricGrid / MetricTrend / ProgressMetric
**Status:** ✅

| | |
|---|---|
| **What** | Card-based metric display components. **KPICard**: Single big number with label. **StatsCard**: Number with trend indicator. **MetricGrid**: Grid of multiple metrics. **MetricTrend**: Up/down trend arrow with percentage. **ProgressMetric**: Metric with a progress bar. |
| **When** | Dashboard-style displays showing key business metrics. Use for at-a-glance performance monitoring. |
| **Why** | Aggregated metrics are the primary purpose of dashboards. Large numbers with trend indicators allow quick assessment. Should use semantic HTML (`<dl>` for key-value pairs, `<meter>` for gauges). Ensure sufficient color contrast for trend indicators (green/red). |

**Sources:** S1 (Meter), S2 (`<dl>`, `<dt>`, `<dd>`, `<meter>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

**Twintrinsic Implementation:**
- `<dl>` + `<dt>` + `<dd>` for semantic key-value pairs
- `<meter>` for scalar measurements within metrics
- CSS Grid for responsive layout
- `content-visibility: auto` for off-screen metric cards

**Common Mistakes:**
- Don't use `<div>` for label-value pairs — `<dl>` is semantic
- Don't forget `aria-label` on metric containers

**Related:** Progress, GaugeChart, DataTable

---

## 10. Accordion (Disclosure)

### 10.1 Accordion / AccordionItem
**Status:** ✅

| | |
|---|---|
| **What** | A vertically stacked set of headings that expand/collapse to show/hide content sections. AccordionItem represents a single expandable section. |
| **When** | To organize content into expandable sections — FAQs, settings panels, product details, documentation sections. Use when users benefit from seeing all section headers at once but don't need all content visible simultaneously. |
| **Why** | Reduces scrolling by hiding content behind expandable headers. Users can scan headers to find relevant sections. Native `<details>` + `<summary>` provides expand/collapse with zero JS. The `<details name="group">` attribute enables exclusive behavior (only one open at a time). For WAI-ARIA compliance, use `aria-expanded` on the header button and `aria-controls` pointing to the panel. |

**Sources:** S1 (Accordion), S2 (`<details>`, `<summary>`, `<details name>`), S3 (Details), S4 (Expansion panels), S5 (search-hidden-content), S6 (Collapse)

**Twintrinsic Implementation:**
- Native `<details>` + `<summary>` for expand/collapse — zero JS
- `<details name="group">` for exclusive behavior (only one open at a time)
- `aria-expanded` on the summary button
- `aria-controls` linking summary to panel content
- CSS transitions for smooth expand/collapse animation

**Common Mistakes:**
- Don't use `<div onclick>` with JS toggle — `<details>` is native and accessible
- Don't forget `<details name>` for exclusive accordion behavior
- Don't use Accordion for tab switching — use Tabs component instead

**Related:** Tabs, Tree, Menu

---

## Summary Statistics

| Category | Components | Research Status |
|----------|-----------|-----------------|
| App / Layout | 5 | ✅ Implementation notes added |
| Form | 20 | ✅ Implementation notes added |
| Navigation | 5 | ✅ Implementation notes added |
| Data Display | 8 | ✅ Implementation notes added |
| Feedback | 5 | ✅ Implementation notes added |
| Layout | 4 | ✅ Implementation notes added |
| Utility | 11 | ✅ Implementation notes added |
| Metrics/Charts | 8 | ✅ Implementation notes added |
| Accordion | 1 | ✅ Implementation notes added |
| **Total** | **67** | |

---

## Next Steps

1. ✅ Review each component entry against the actual Twintrinsic implementation
2. ✅ Add Twintrinsic-specific implementation notes (which modern APIs are used)
3. ✅ Add "Common Mistakes" section for each component
4. ✅ Add "Related Components" cross-references
5. ☐ Publish as component documentation on the docs site
