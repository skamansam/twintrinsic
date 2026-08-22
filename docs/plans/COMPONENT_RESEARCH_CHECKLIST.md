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
**Status:** ⬜

| | |
|---|---|
| **What** | Root application wrapper that establishes the page shell — typically containing header, sidebar, main content area, and footer. |
| **When** | Every page in a SvelteKit app. Use as the outermost layout component to provide consistent structure. |
| **Why** | Establishes a predictable page skeleton so users always know where navigation, content, and utilities are. Enables responsive layout reflow (e.g., sidebar collapses on mobile). Provides a landmark structure (`<main>`, `<header>`, `<nav>`, `<footer>`) for screen readers. |

**Sources:** S1 (Landmarks), S2 (`<main>`, `<header>`, `<footer>`, `<nav>`), S3 (PageLayout), S4 (Common layout patterns), S5 (css-layout)

---

### 1.2 AppHeader
**Status:** ⬜

| | |
|---|---|
| **What** | Top navigation bar containing the app logo/name, primary navigation links, search, and utility actions (notifications, theme toggle, user menu). |
| **When** | Every page. The header is the primary way users identify the app and access top-level navigation. |
| **Why** | Users expect a persistent top bar for orientation and navigation (Jakob's Law). Provides a consistent location for search, notifications, and account access. Should use `<header>` + `<nav>` landmarks for accessibility. On mobile, collapses to a hamburger menu. |

**Sources:** S1 (Landmarks), S2 (`<header>`, `<nav>`), S3 (PageHeader), S4 (Top app bar), S5 (navigation-drawer, shrinking-header-on-scroll)

---

### 1.3 BottomBar
**Status:** ⬜

| | |
|---|---|
| **What** | Fixed navigation bar at the bottom of the viewport, typically containing 3–5 icon+label navigation items. Common in mobile-first apps. |
| **When** | Mobile/tablet layouts where bottom navigation is more thumb-accessible than top navigation. Also used for media player controls, meeting controls, or floating action areas. |
| **Why** | Thumb zones on mobile devices make bottom navigation 2–3× faster to reach than top navigation (Steven Hoober research). Follows iOS/Android platform conventions users already know. Provides persistent access to primary destinations without scrolling. |

**Sources:** S1 (Landmarks), S2 (`<nav>`), S3 (ActionList for bottom sheets), S4 (Bottom navigation), S5 (scroll-position-aware-elements)

---

### 1.4 Sidebar
**Status:** ⬜

| | |
|---|---|
| **What** | Vertical navigation panel, typically on the left side, containing nested navigation links, filters, or settings. May be collapsible. |
| **When** | Apps with deep navigation hierarchies (dashboards, admin panels, documentation sites). Use when you have 5+ top-level navigation items or need persistent secondary navigation. |
| **Why** | Accommodates hierarchical navigation better than horizontal tabs. Can show current location via active state highlighting. Collapsible variants save horizontal space. Should use `<nav>` landmark with `aria-label` for screen readers. |

**Sources:** S1 (Landmarks, Tree View), S2 (`<nav>`, `<aside>`), S3 (NavList), S4 (Navigation rail/drawer), S5 (navigation-drawer)

---

### 1.5 Footer
**Status:** ⬜

| | |
|---|---|
| **What** | Bottom section of a page or app containing copyright, legal links, secondary navigation, social links, and contact info. |
| **When** | Every page. Place at the bottom of the page layout. |
| **Why** | Users expect to find legal info, contact details, and secondary links at the bottom ( Jakob's Law). Provides a consistent location for "boring but necessary" content. Should use `<footer>` landmark for accessibility. |

**Sources:** S1 (Landmarks), S2 (`<footer>`), S3 (PageLayout), S4 (Footer patterns), S5 (css-layout)

---

## 2. Form Components

### 2.1 Input / TextInput
**Status:** ⬜

| | |
|---|---|
| **What** | Single-line text input field for collecting short text data (names, emails, search queries, etc.). |
| **When** | Any form field that expects a single line of text. Use `<input type="text">` (or appropriate type like `email`, `tel`, `url`, `search`) for native browser features. |
| **Why** | Native `<input>` provides built-in validation, autocomplete, keyboard types on mobile, screen reader support, and focus management — all for free. Custom text inputs require reimplementing all of this. Use appropriate `type` attributes for mobile keyboards and autocomplete hints. |

**Sources:** S2 (`<input>`), S3 (TextInput), S4 (Text fields), S5 (forms, autofill-sign-in-form, autofill-address-form), S6 (Input)

---

### 2.2 NumberInput
**Status:** ⬜

| | |
|---|---|
| **What** | Input field specialized for numeric values, often with increment/decrement buttons and min/max constraints. |
| **When** | When the user must enter a number (quantity, price, age, percentage). Use `<input type="number">` or `<input type="range">` depending on whether precise or approximate input is needed. |
| **Why** | Native `type="number"` gives mobile numeric keyboards, built-in validation (`min`, `max`, `step`), and spinbutton accessibility. For WAI-ARIA spinbutton pattern, see S1. Avoid custom number inputs unless you need currency formatting or special increment logic. |

**Sources:** S1 (Spinbutton), S2 (`<input type="number">`), S3 (TextInput), S4 (Number field), S5 (forms), S6 (InputNumber)

---

### 2.3 Textarea
**Status:** ⬜

| | |
|---|---|
| **What** | Multi-line text input for longer text content (comments, descriptions, messages, code). |
| **When** | When the user needs to enter more than one line of text. Use `<textarea>` with `field-sizing: content` for auto-grow behavior. |
| **Why** | Native `<textarea>` handles line breaks, scrolling, and resize natively. `field-sizing: content` (CSS) auto-grows the field to fit content — no JS needed. Avoid `<div contenteditable>` unless you need rich text editing. |

**Sources:** S2 (`<textarea>`), S3 (Textarea), S4 (Text fields), S5 (form-fields-automatically-fit-contents), S6 (Input.TextArea)

---

### 2.4 Select / SelectGroup
**Status:** ⬜

| | |
|---|---|
| **What** | Dropdown selection from a predefined list of options. SelectGroup wraps multiple `<optgroup>` sections. |
| **When** | When the user must choose one option from a list of 5+ items. For fewer items, prefer radio buttons (more visible, faster to scan). |
| **Why** | Native `<select>` provides keyboard navigation, screen reader support, form participation, and option grouping via `<optgroup>`. The new customizable `<select>` (CSS `appearance: base-select`) allows full styling while keeping native semantics. Custom dropdowns require reimplementing keyboard navigation, focus management, and screen reader announcements. |

**Sources:** S1 (Listbox), S2 (`<select>`, `<optgroup>`), S3 (Select), S4 (Menus and selects), S5 (animated-select-picker, branded-select-styling, custom-select-picker-layouts, rich-media-picker), S6 (Select)

---

### 2.5 Dropdown
**Status:** ⬜

| | |
|---|---|
| **What** | A button that opens a menu or popover containing actions, links, or options. Different from Select in that it's primarily for actions, not value selection. |
| **When** | When you need a menu of actions (edit, delete, share) or a list of navigation options triggered by a button. Use `popover="auto"` + `popovertarget` for CSS-native open/close/light-dismiss. |
| **Why** | Popover API provides top-layer rendering, light-dismiss (click outside to close), and Escape-to-close for free. No JS needed for open/close state. Should follow WAI-ARIA menu button pattern for keyboard access. |

**Sources:** S1 (Menu Button), S2 (`popover` attribute), S3 (ActionMenu, DropdownMenu), S4 (Menus), S5 (declarative-dialog-popover-control, resilient-context-menus-and-nested-dropdowns)

---

### 2.6 Combobox
**Status:** ⬜

| | |
|---|---|
| **What** | An input field with an associated popup that suggests values as the user types. Combines a text input with a listbox/grid/tree popup. |
| **When** | When users need to filter a large dataset while typing (country selector, tag input, search with suggestions). Also for "select-only" comboboxes where the user picks from a list but can also type. |
| **Why** | Provides type-ahead filtering that `<select>` can't. Supports autocomplete behaviors (inline, list, automatic selection). The WAI-ARIA combobox pattern is well-defined with 4 autocomplete modes. Use `popover="auto"` for the popup. |

**Sources:** S1 (Combobox), S2 (`<datalist>` concept), S3 (Autocomplete, SelectPanel), S4 (Exposed dropdown menu), S5 (select-menu-interaction, validate-input-after-interaction), S6 (AutoComplete)

---

### 2.7 AutoComplete
**Status:** ⬜

| | |
|---|---|
| **What** | A combobox variant focused on text completion — shows suggestions that complete or match the user's typed input. |
| **When** | Search fields, address forms, any field where suggesting completions saves the user time. |
| **Why** | Reduces typing errors and speeds up form completion. Can use browser-native `<datalist>` for simple cases, or a custom popup for rich suggestions. The WAI-ARIA combobox pattern covers all autocomplete modes. |

**Sources:** S1 (Combobox), S2 (`<datalist>`), S3 (Autocomplete), S5 (autofill-address-form, autofill-sign-in-form), S6 (AutoComplete)

---

### 2.8 Listbox
**Status:** ⬜

| | |
|---|---|
| **What** | A widget that presents a list of options and allows the user to select one or more. Unlike `<select>`, options can contain rich content. |
| **When** | When you need a visible list of options (not hidden in a dropdown). For multi-select lists, or when options need rich content (icons, descriptions, secondary text). |
| **Why** | Supports single and multi-select, keyboard navigation (arrows, Home/End, type-ahead), and focus management. Options are always visible (no dropdown to open). Use for lists of 5–15 items that benefit from being always visible. |

**Sources:** S1 (Listbox), S2 (`<select size>` concept), S3 (ActionList), S4 (List), S5 (resilient-context-menus-and-nested-dropdowns), S6 (TreeSelect)

---

### 2.9 Checkbox
**Status:** ⬜

| | |
|---|---|
| **What** | Binary toggle (on/off, checked/unchecked). Can also be tri-state (checked, unchecked, indeterminate) for parent-group controls. |
| **When** | When the user must toggle a single option on/off. Use for independent choices (e.g., "Remember me", "I agree to terms"). For mutually exclusive choices, use radio buttons. For on/off settings that take effect immediately, consider a switch. |
| **Why** | Native `<input type="checkbox">` provides built-in form participation, keyboard toggle (Space), screen reader support, and the `:has(:user-valid)` CSS pattern for validation styling. Custom checkboxes require reimplementing all of this. Use `accent-color` to match brand colors. |

**Sources:** S1 (Checkbox), S2 (`<input type="checkbox">`), S3 (Checkbox), S4 (Checkboxes), S5 (brand-consistent-forms), S6 (Checkbox)

---

### 2.10 Radio / RadioGroup
**Status:** ⬜

| | |
|---|---|
| **What** | A set of mutually exclusive options where exactly one must be selected. RadioGroup wraps related radios with a shared label. |
| **When** | When the user must choose exactly one option from a small set (2–6 options). Use radio buttons over `<select>` when all options should be visible and scannable. |
| **Why** | All options visible = faster decision-making than dropdown (Nielsen Norman Group). Arrow key navigation between options is intuitive. Native `<input type="radio">` with `name` attribute provides automatic mutual exclusion. Group with `<fieldset>` + `<legend>` for accessible labeling. |

**Sources:** S1 (Radio Group), S2 (`<input type="radio">`), S3 (Radio, RadioGroup), S4 (Radio buttons), S5 (brand-consistent-forms), S6 (Radio.Group)

---

### 2.11 Switch / InputSwitch
**Status:** ⬜

| | |
|---|---|
| **What** | A toggle that switches between on/off states, visually styled as a sliding track. Semantically different from checkbox — represents an immediate state change, not a form value. |
| **When** | For settings that take effect immediately (dark mode, notifications on/off, auto-save). Use when "on/off" semantics are clearer than "checked/unchecked". |
| **Why** | Better semantic match for settings that activate/deactivate something. Screen readers announce "on/off" instead of "checked/unchecked", which is clearer for settings. The visual slider metaphor communicates instant effect better than a checkbox. Should toggle on Space key. |

**Sources:** S1 (Switch), S2 (`<input type="checkbox" role="switch">`), S3 (ToggleSwitch), S4 (Switch), S5 (brand-consistent-forms), S6 (Switch)

---

### 2.12 Slider
**Status:** ⬜

| | |
|---|---|
| **What** | An input where the user selects a value from within a given range by moving a thumb along a track. |
| **When** | When the user needs to select a value within a known range (volume, brightness, price range, date range). Use `<input type="range">` for simple cases; custom slider for multi-thumb or rich formatting. |
| **Why** | Native `<input type="range">` provides keyboard support (arrows, Home/End), screen reader announcements of current value, and touch support. `accent-color` styles the thumb/track. Custom sliders need WAI-ARIA slider pattern (S1) for accessibility. |

**Sources:** S1 (Slider, Slider Multi-Thumb), S2 (`<input type="range">`), S3 (Slider — not in Primer, but referenced in APG), S4 (Sliders), S5 (brand-consistent-forms), S6 (Slider)

---

### 2.13 Knob
**Status:** ⬜

| | |
|---|---|
| **What** | A rotary control (like a physical knob) for selecting a value within a range. Common in audio/video production, IoT dashboards, and industrial control UIs. |
| **When** | When the UI mimics physical hardware (audio mixers, light controls, scientific instruments). Not recommended for general-purpose forms — use a slider instead. |
| **Why** | Matches user mental models in domain-specific UIs (audio engineers expect knobs). Provides a compact form factor for value selection. Should implement WAI-ARIA slider pattern (S1) with appropriate `aria-valuemin/max/now`. |

**Sources:** S1 (Slider pattern), S2 (no native element — custom), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Slider — similar concept)

---

### 2.14 Rating
**Status:** ⬜

| | |
|---|---|
| **What** | A star-rating or numeric rating input where users select a rating (e.g., 1–5 stars). |
| **When** | When collecting user feedback, reviews, or satisfaction scores. Use for subjective quality assessments. |
| **Why** | Familiar metaphor from e-commerce (Amazon, Yelp). Should implement WAI-ARIA slider pattern with `aria-valuetext` for "4 out of 5 stars" announcements. Supports half-star increments via appropriate step values. |

**Sources:** S1 (Slider — rating example), S2 (no native element), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 2.15 Calendar
**Status:** ⬜

| | |
|---|---|
| **What** | A date picker component showing a month grid where users can select one or more dates, or a date range. |
| **When** | When the user needs to pick a date or date range. Use `<input type="date">` for simple single-date selection; custom calendar for range selection, week numbers, or custom formatting. |
| **Why** | Native `<input type="date">` provides a platform-native date picker with full accessibility. Custom calendars are needed only for advanced features (range selection, blocked dates, multiple month view). Use `popover="auto"` for the popup panel. |

**Sources:** S1 (Dialog — date picker example), S2 (`<input type="date">`, `<input type="datetime-local">`), S3 (no direct equivalent), S4 (Date pickers), S5 (no direct equivalent)

---

### 2.16 ColorPicker
**Status:** ⬜

| | |
|---|---|
| **What** | A color selection widget, typically with a color wheel/square, hue slider, and opacity slider, plus hex/RGB/HSL input. |
| **When** | When the user needs to select a custom color (design tools, theme customization, chart colors). Use `<input type="color">` for simple cases; custom picker for HSL, opacity, or presets. |
| **Why** | Native `<input type="color">` gives a platform color dialog — simple but limited (hex only). Custom pickers support HSL/RGB switching, opacity, color history, and preset palettes. Use `popover="auto"` for the popup. |

**Sources:** S1 (no direct pattern), S2 (`<input type="color">`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 2.17 FileUpload
**Status:** ⬜

| | |
|---|---|
| **What** | A file selection input, typically with drag-and-drop support, file preview, and upload progress. |
| **When** | When the user needs to upload files (images, documents, data). Use `<input type="file">` as the base; enhance with drag-and-drop and preview. |
| **Why** | Native `<input type="file">` provides file browser, accept filters, and multiple file support. Drag-and-drop improves UX for image uploads. Show file type icons and sizes for clarity. Should announce upload status via `aria-live` region. |

**Sources:** S1 (no direct pattern), S2 (`<input type="file">`, `<input accept>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 2.18 FloatLabel
**Status:** ⬜

| | |
|---|---|
| **What** | A form field pattern where the label floats above the input when focused or filled, saving vertical space. |
| **When** | Dense forms where vertical space is at a premium (mobile forms, side panels). The label acts as a placeholder when empty and a field label when filled. |
| **Why** | Saves space compared to separate label + placeholder. Users always see the field context (floating label) even after typing. Can be implemented with CSS `:has()` — no JS needed for the float animation. Must maintain proper `<label>` + `for` association for accessibility. |

**Sources:** S1 (no direct pattern), S2 (`<label>`), S3 (FormControl), S4 (Filled text fields), S5 (autofill-highlight-inputs), S6 (Form)

---

### 2.19 Form / FormField / InvalidState
**Status:** ⬜

| | |
|---|---|
| **What** | Form is the container; FormField wraps individual inputs with label, helper text, and error message; InvalidState displays validation errors. |
| **When** | Every form should use FormField to wrap inputs. InvalidState appears when validation fails. Use `:has(:user-valid)` / `:has(:user-invalid)` CSS for validation styling. |
| **Why** | Consistent label positioning, error display, and helper text across all form fields. `<fieldset>` + `<legend>` for groups (radio, checkbox). `:user-valid`/`:user-invalid` shows validation only after user interaction (no premature error messages). FormField should announce errors via `aria-describedby` and `aria-invalid`. |

**Sources:** S1 (forms generally), S2 (`<form>`, `<fieldset>`, `<legend>`, `<label>`), S3 (FormControl), S4 (Text fields), S5 (forms, required-field-feedback, validate-input-after-interaction, accessible-error-announcement), S6 (Form)

---

### 2.20 ListInput
**Status:** ⬜

| | |
|---|---|
| **What** | An input that maintains a list of values (tags, chips, tokens). Users type a value and press Enter/comma to add it to the list. |
| **When** | When the user needs to enter multiple short values (tags, email recipients, skills). |
| **Why** | More natural than a comma-separated text field. Each value is a discrete, removable item. Should use `role="list"` on the container and `role="listitem"` on each tag, with a Remove button for each. |

**Sources:** S1 (no direct pattern), S2 (`<input>` + custom), S3 (TextInputWithTokens), S4 (Chips), S5 (no direct equivalent)

---

## 3. Navigation Components

### 3.1 Menu / MenuItem
**Status:** ⬜

| | |
|---|---|
| **What** | A widget offering a list of actions or navigation choices, typically triggered by a button. Supports nested submenus. |
| **When** | For action menus (edit, delete, copy), context menus (right-click), or navigation menus (settings, account). Use `popover="auto"` + CSS Anchor Positioning for the popup. |
| **Why** | Popover API provides light-dismiss and top-layer stacking. WAI-ARIA menu pattern defines keyboard nav (arrows, Home/End, Escape, type-ahead). Arrow keys navigate between items; Enter/Space activates; Escape closes. Focus should be trapped within the menu when open. |

**Sources:** S1 (Menu and Menubar, Menu Button), S2 (`<menu>`, `popover`), S3 (ActionMenu, ActionList), S4 (Menus), S5 (resilient-context-menus-and-nested-dropdowns), S6 (Menu)

---

### 3.2 Tabs / Tab / TabList / TabPanel
**Status:** ⬜

| | |
|---|---|
| **What** | A set of layered sections where only one panel is visible at a time. The user switches between panels by clicking tabs. |
| **When** | When you have 2–5 related content sections that occupy the same space (settings panels, content categories, view modes). Use for same-level content switching, not for navigation between pages. |
| **Why** | Reduces scrolling by showing one section at a time. Users expect tabs for settings/configuration (mental model from desktop apps). Horizontal tabs = content switching; vertical tabs = less common but useful for long labels. Arrow keys navigate between tabs; Enter/Space activates. Should use `role="tablist"` / `role="tab"` / `role="tabpanel"` + `aria-selected`. |

**Sources:** S1 (Tabs), S2 (no native element — `<details name>` is related but different), S3 (UnderlineNav, UnderlinePanels), S4 (Tabs), S5 (search-hidden-content, anchor-positioning-tab-underline), S6 (Tabs)

---

### 3.3 Breadcrumb / BreadcrumbItem
**Status:** ⬜

| | |
|---|---|
| **What** | A trail of links showing the user's current location within a site hierarchy. The last item represents the current page. |
| **When** | When the site has 3+ levels of hierarchy. Use on every page except the homepage. Place at the top of the content area. |
| **Why** | Helps users understand where they are and navigate back to parent pages. Should use `<nav aria-label="Breadcrumb">` + `<ol>` + `<li>` with `aria-current="page"` on the last link. Separator styling via CSS `::before` pseudo-element on `<li>` (no JS needed). |

**Sources:** S1 (Breadcrumb), S2 (`<nav>`, `<ol>`, `<li>`, `aria-current`), S3 (Breadcrumbs), S4 (Breadcrumbs), S5 (no direct equivalent)

---

### 3.4 Tree / TreeNode
**Status:** ⬜

| | |
|---|---|
| **What** | A hierarchical list where items can be expanded/collapsed to show child items. Common in file explorers, navigation menus, and organizational charts. |
| **When** | When data has a parent-child hierarchy (file systems, org charts, nested categories, document outlines). For flat lists, use a listbox instead. |
| **Why** | Provides efficient navigation of hierarchical data. Arrow keys navigate between nodes; Right arrow expands; Left arrow collapses. `role="tree"` / `role="treeitem"` + `aria-expanded` / `aria-level` for screen readers. Can also use `<details>` for simple expand/collapse without full tree semantics. |

**Sources:** S1 (Tree View), S2 (`<details>`, `<summary>` concept), S3 (TreeView), S4 (no direct equivalent), S5 (search-hidden-content), S6 (Tree)

---

### 3.5 TreeMenu
**Status:** ⬜

| | |
|---|---|
| **What** | A navigation menu structured as a tree — hierarchical menu items that expand/collapse. |
| **When** | When navigation has deep nesting (admin panels with nested sections, documentation with nested chapters). |
| **Why** | Combines tree semantics with menu behavior. Users can navigate hierarchically without leaving the page. Should follow WAI-ARIA tree view pattern for keyboard nav and tree menu pattern for action semantics. |

**Sources:** S1 (Tree View, Menu), S2 (`<menu>`, `<li>`), S3 (NavList), S4 (Menus), S5 (resilient-context-menus-and-nested-dropdowns), S6 (Menu)

---

## 4. Data Display Components

### 4.1 DataTable
**Status:** ⬜

| | |
|---|---|
| **What** | A tabular data display with sorting, filtering, pagination, row selection, and column resizing. |
| **When** | When displaying structured data with multiple columns (user lists, product catalogs, financial data). Use for data that benefits from column-based comparison. |
| **Why** | Native `<table>` provides semantic structure for screen readers. Sorting should use `aria-sort` on column headers. Row selection with `aria-selected`. Pagination with `aria-label` on nav controls. For editable cells, use the WAI-ARIA grid pattern (S1) instead of table. |

**Sources:** S1 (Table, Grid), S2 (`<table>`, `<thead>`, `<tbody>`, `<th scope>`), S3 (DataTable), S4 (Data tables), S5 (no direct equivalent), S6 (Table)

---

### 4.2 Badge
**Status:** ⬜

| | |
|---|---|
| **What** | A small, inline label used to convey status, count, or category. Typically a pill-shaped element with text. |
| **When** | To show counts (notifications: "3"), status (active/inactive), or categories (tags). Use inline, not as standalone elements. |
| **Why** | Provides at-a-glance status information without taking up space. Should use semantic color coding (green = success, red = error). Keep text short (1–3 words). If the badge is purely decorative, add `aria-hidden="true"`. If it conveys information, ensure sufficient color contrast (WCAG AA). |

**Sources:** S1 (no direct pattern), S2 (`<span>` or `<output>`), S3 (CounterLabel, Label, StateLabel), S4 (Badges), S5 (no direct equivalent), S6 (Badge)

---

### 4.3 Avatar / AvatarGroup
**Status:** ⬜

| | |
|---|---|
| **What** | An image or icon representing a user or organization. AvatarGroup stacks multiple avatars with overlap. |
| **When** | To show user identity in comments, lists, profiles, or team views. AvatarGroup shows a team or group of users. |
| **Why** | Humanizes the interface — users recognize faces faster than names. Should use `<img>` with descriptive `alt` text (e.g., "Avatar of John Doe"). For initials fallback, use `aria-label` on the element. AvatarGroup should announce "Group of N avatars" and individual names on focus. |

**Sources:** S1 (no direct pattern), S2 (`<img>` with `alt`), S3 (Avatar, AvatarStack), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Avatar)

---

### 4.4 Tag / TagGroup
**Status:** ⬜

| | |
|---|---|
| **What** | A compact label for categorizing or filtering content. Tags are removable and can be interactive (click to filter). |
| **When** | To display categories, labels, or filters on items (blog post tags, user skills, status labels). Use when items can have multiple categories. |
| **Why** | Provides scannable metadata about content. Removable tags should have a visible close button with `aria-label="Remove [tag name]"`. TagGroup should use `role="group"` with a group label. Keyboard users should be able to Tab to each tag and Enter/Space to activate. |

**Sources:** S1 (no direct pattern), S2 (`<span>`), S3 (Token, LabelGroup), S4 (Chips), S5 (no direct equivalent), S6 (Tag)

---

### 4.5 Chip / ChipGroup
**Status:** ⬜

| | |
|---|---|
| **What** | A compact element representing an input, attribute, or action. Chips can be removable, selectable, or clickable. More interactive than tags. |
| **When** | For filter chips (click to toggle a filter), input chips (enter values as chips), or choice chips (select one of several options). |
| **Why** | Material Design's chip pattern — compact, scannable, and interactive. Chips can contain icons, avatars, and close buttons. Should follow WAI-ARIA button pattern for clickable chips. Removable chips should announce removal via `aria-live`. |

**Sources:** S1 (no direct pattern), S2 (`<button>` or `<span>`), S3 (Token), S4 (Chips), S5 (no direct equivalent), S6 (Tag)

---

### 4.6 Tooltip
**Status:** ⬜

| | |
|---|---|
| **What** | A popup that displays informational text when the user hovers over or focuses on an element. Does not receive focus itself. |
| **When** | To provide additional context for an icon, abbreviation, or truncated text. Use for non-essential, supplementary information. |
| **Why** | Helps users understand unfamiliar icons or abbreviations without cluttering the UI. Should use `popover="auto"` for top-layer rendering + CSS Anchor Positioning for tethering. `role="tooltip"` + `aria-describedby` on the trigger. Escape dismisses. No focus inside tooltip (if focusable content needed, use a dialog/popover instead). |

**Sources:** S1 (Tooltip), S2 (`<abbr title>`, `title` attribute), S3 (Tooltip), S4 (Tooltips), S5 (position-aware-tooltips, interest-triggered-tooltips), S6 (Tooltip)

---

### 4.7 EventsTable / PropsTable
**Status:** ⬜

| | |
|---|---|
| **What** | Specialized data tables for documenting component APIs — EventsTable shows callback events, PropsTable shows component properties. |
| **When** | In documentation pages to present component API references in a structured, scannable format. |
| **Why** | Developers need to quickly find prop names, types, defaults, and descriptions. A table format is scannable and sortable. Should use native `<table>` with `<th scope="col">` for headers. Auto-generated from TypeScript types for accuracy. |

**Sources:** S1 (Table), S2 (`<table>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 4.8 CompatibilityMatrix
**Status:** ⬜

| | |
|---|---|
| **What** | A table showing browser/platform support for specific features or APIs. |
| **When** | In documentation to show which features work in which browsers. Auto-generated from feature detection tests. |
| **Why** | Helps developers understand browser support without manual research. Should use native `<table>` with clear visual indicators (checkmarks, crosses, partial support icons). |

**Sources:** S1 (no direct pattern), S2 (`<table>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

## 5. Feedback Components

### 5.1 Modal / Dialog
**Status:** ⬜

| | |
|---|---|
| **What** | A window overlaid on the primary content that requires user interaction before they can return to the app. Blocks interaction with content behind it. |
| **When** | For critical actions that need confirmation (delete, discard changes), important messages (error alerts), or focused tasks (multi-step forms, detail views). Use `<dialog>` with `closedby="any"` for light-dismiss. |
| **Why** | Native `<dialog>` provides: inert background (users can't interact behind it), focus trapping (Tab stays inside), Escape to close, `::backdrop` for dimming, `closedby="any"` for light-dismiss. Invoker commands (`command="show-modal" commandfor="id"`) allow opening from buttons without JS. `@starting-style` + `transition-behavior: allow-discrete` for enter/exit animations. Far superior to custom div-based modals. |

**Sources:** S1 (Dialog Modal), S2 (`<dialog>`), S3 (Dialog, ConfirmationDialog), S4 (Dialogs), S5 (light-dismiss-a-dialog, declarative-dialog-popover-control, animate-to-from-top-layer, platform-controls-dismiss-dialog), S6 (Modal)

---

### 5.2 Toast
**Status:** ⬜

| | |
|---|---|
| **What** | A brief, non-blocking notification that appears temporarily (typically bottom-right or top-right) and auto-dismisses. Used for success messages, warnings, or status updates. |
| **When** | For ephemeral feedback after an action (saved, copied, sent). Don't use for critical errors or actions requiring user response — use a dialog instead. |
| **Why** | Non-intrusive — doesn't block the user's workflow. Multiple toasts can stack. Should use `aria-live="polite"` region so screen readers announce new toasts. Auto-dismiss after a reasonable time (5–10 seconds). Provide a manual close button. Don't use Popover API (one-at-a-time limitation conflicts with stacking). Use `@starting-style` for entry animation. |

**Sources:** S1 (Alert pattern — related), S2 (`<output>`, `aria-live`), S3 (Banner), S4 (Snackbars), S5 (persistent-toast-notifications), S6 (Message)

---

### 5.3 Skeleton
**Status:** ⬜

| | |
|---|---|
| **What** | A placeholder preview of content that is loading — typically gray blocks/shapes that mimic the layout of the actual content. |
| **When** | While content is being fetched or rendered. Use for any async content (data tables, profiles, cards, lists). Show immediately on page load, not after a delay. |
| **Why** | Reduces perceived loading time by showing content structure before it loads. Better than spinners for layout-heavy content. Should use `aria-busy="true"` and `aria-live="polite"` on the loading region. `@starting-style` for smooth entry animation. `content-visibility: auto` for off-screen skeleton performance. |

**Sources:** S1 (no direct pattern), S2 (`aria-busy`, `aria-live`), S3 (SkeletonAvatar, SkeletonBox, SkeletonText), S4 (no direct equivalent), S5 (defer-rendering-heavy-content), S6 (Skeleton)

---

### 5.4 Progress
**Status:** ⬜

| | |
|---|---|
| **What** | A visual indicator showing how much of a task has been completed. Can be determinate (specific percentage) or indeterminate (loading). |
| **When** | For tasks with known duration (file upload, form submission, multi-step process). Use `<progress>` for determinate; indeterminate for unknown duration. |
| **Why** | Native `<progress>` provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax` automatically. Screen readers announce progress percentage. Avoid using `<meter>` for progress (different semantics — meter is for static measurements within a range). |

**Sources:** S1 (Meter — related but different), S2 (`<progress>`, `<meter>`), S3 (ProgressBar), S4 (Progress indicators), S5 (scroll-progress-indicator), S6 (Progress)

---

### 5.5 Stepper / StepperStep
**Status:** ⬜

| | |
|---|---|
| **What** | A visual representation of a multi-step process, showing completed, current, and upcoming steps. |
| **When** | For multi-step workflows (checkout, registration, onboarding). Show the user where they are in the process. |
| **Why** | Reduces anxiety about process length. Users know how many steps remain. Should use `<ol>` for semantic ordering + `aria-current="step"` on the active step. Steps should be focusable and clickable (for non-linear wizards). |

**Sources:** S1 (no direct pattern), S2 (`<ol>`, `aria-current`), S3 (no direct equivalent — but Stepper is common), S4 (no direct equivalent), S5 (scroll-progress-indicator — related)

---

## 6. Navigation Components (continued)

### 6.1 Pagination
**Status:** ⬜

| | |
|---|---|
| **What** | A set of numbered links for navigating between pages of content. |
| **When** | When content is split across multiple pages (search results, blog posts, data tables). Use when the total count is known. |
| **Why** | Provides predictable navigation through paginated content. Should use `<nav aria-label="Pagination">` + `<ol>` + `<li>` with `aria-current="page"` on the active page. Previous/Next buttons with appropriate `aria-label`. |

**Sources:** S1 (no direct pattern), S2 (`<nav>`, `<ol>`, `aria-current`), S3 (Pagination), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Pagination)

---

## 7. Layout Components

### 7.1 Container / Section / Panel
**Status:** ⬜

| | |
|---|---|
| **What** | Structural layout primitives. Container centers content with max-width. Section groups related content with a heading. Panel is a bordered/rounded card-like container. |
| **When** | Container: every page's main content area. Section: grouping related content with a heading. Panel: sidebar content, cards, distinct content blocks. |
| **Why** | Consistent spacing and max-width across the app. Section should use `<section>` with a heading for proper semantics. Panel should use `<div>` with `role="region"` and `aria-label` if it's a landmark. Container Queries (`@container`) allow components to adapt to their parent's size. |

**Sources:** S1 (Landmarks), S2 (`<section>`, `<div>`, `<article>`), S3 (PageLayout, Stack), S4 (no direct equivalent), S5 (css-layout, size-aware-styling), S6 (Space)

---

### 7.2 Hero
**Status:** ⬜

| | |
|---|---|
| **What** | A prominent banner at the top of a page featuring a headline, subtext, and call-to-action. Often includes a background image or gradient. |
| **When** | Homepage, landing pages, or feature pages. Use to introduce the page's purpose and guide users to the primary action. |
| **Why** | First impressions matter — the hero section is typically the largest visual element on the page. Should use `<header>` or `<section>` with a heading. CTA button should be the first focusable element. Background images should have sufficient contrast for text (WCAG AA). |

**Sources:** S1 (no direct pattern), S2 (`<header>`, `<section>`, `<h1>`), S3 (PageHeader — similar), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 7.3 Splitter
**Status:** ⬜

| | |
|---|---|
| **What** | A moveable divider between two panes that allows users to resize each pane by dragging. |
| **When** | When users need to compare two content areas side-by-side (code editor + preview, email list + email content, file tree + file content). |
| **Why** | Gives users control over content distribution. Should follow WAI-ARIA window splitter pattern (S1). Keyboard users should be able to resize with arrow keys. Use `aria-valuenow` / `aria-valuemin` / `aria-valuemax` for the current position. CSS `resize` property provides basic functionality; custom JS needed for precise control. |

**Sources:** S1 (Window Splitter), S2 (CSS `resize`), S3 (SplitPageLayout), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 7.4 Masonry
**Status:** ⬜

| | |
|---|---|
| **What** | A grid layout where items of varying heights are arranged to minimize vertical gaps (like a Pinterest board). |
| **When** | For image galleries, card collections, or content feeds where items have different heights and you want an organic, space-efficient layout. |
| **Why** | More visually interesting than a uniform grid. Better space utilization for variable-height content. CSS `grid-template-rows: masonry` (Firefox experimental) or multi-column CSS for progressive enhancement. `content-visibility: auto` for off-screen performance. |

**Sources:** S1 (no direct pattern), S2 (CSS Grid), S3 (no direct equivalent), S4 (no direct equivalent), S5 (css-layout), S6 (Waterfall — similar concept)

---

## 8. Utility Components

### 8.1 Button / ButtonGroup
**Status:** ⬜

| | |
|---|---|
| **What** | An interactive element that triggers an action when clicked. ButtonGroup renders multiple buttons as a unified control set. |
| **When** | Every interactive action that isn't a link. Use `<button>` for actions (submit, delete, toggle) and `<a>` for navigation. ButtonGroup for related actions (save/cancel, bold/italic/underline). |
| **Why** | Native `<button>` provides: keyboard activation (Enter/Space), focus styling, disabled state, form submission, and screen reader announcement ("button"). Never use `<div onclick>` — it's inaccessible. Use `type="submit"` for form buttons, `type="button"` for JS-only buttons. |

**Sources:** S1 (Button), S2 (`<button>`), S3 (Button, ButtonGroup, IconButton), S4 (Buttons), S5 (custom-button-actions, declarative-dialog-popover-control), S6 (Button)

---

### 8.2 Card
**Status:** ⬜

| | |
|---|---|
| **What** | A styled container that groups related content — typically with a border, padding, and shadow. Can be clickable or static. |
| **When** | To group related information (product cards, user profiles, feature highlights). Use for content that forms a distinct visual unit. |
| **Why** | Creates visual hierarchy and scannable content blocks. If clickable, use `<a>` or `<button>` as the card element (not a `<div>` with onclick). If static, use `<div>` or `<article>` with `role="region"` + `aria-label`. Container Queries allow cards to adapt their layout based on their own width. |

**Sources:** S1 (no direct pattern), S2 (`<article>`, `<div>`), S3 (Card), S4 (Cards), S5 (size-aware-styling), S6 (Card)

---

### 8.3 CodeBlock / CodeBlockSpeed
**Status:** ⬜

| | |
|---|---|
| **What** | A syntax-highlighted code display component. CodeBlock uses Prism.js; CodeBlockSpeed uses a lightweight alternative. |
| **When** | To display code samples in documentation, tutorials, or technical content. Use for read-only code display. |
| **Why** | Syntax highlighting improves code readability dramatically. Should use `<pre><code>` with `class="language-[lang]"` for proper semantics. Prism.js provides language detection and highlighting. Add a copy-to-clipboard button with `aria-label="Copy code"`. |

**Sources:** S1 (no direct pattern), S2 (`<pre>`, `<code>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 8.4 CodeEditor
**Status:** ⬜

| | |
|---|---|
| **What** | A full-featured code editor with syntax highlighting, line numbers, autocomplete, and editing capabilities. Uses CodeMirror. |
| **When** | When users need to write or edit code (configuration editors, playground, admin tools). Not for read-only code display (use CodeBlock). |
| **Why** | CodeMirror is battle-tested with hundreds of plugins, accessibility support, and performance optimizations. Custom code editors can't match its feature set. Keep as-is per user decision. |

**Sources:** S1 (no direct pattern), S2 (`<textarea>` concept), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 8.5 Icon / IconifyIcon
**Status:** ⬜

| | |
|---|---|
| **What** | An SVG icon component powered by Iconify, supporting multiple icon sets (tabler, heroicons, fontawesome, etc.). |
| **When** | For any icon in the UI — buttons, navigation, status indicators, decorative elements. Use `aria-hidden="true"` for decorative icons; provide `aria-label` for meaningful icons. |
| **Why** | Iconify provides 150,000+ icons from 100+ icon sets. Icons load on-demand from the Iconify API. The `preloadIcons()` helper can prefetch icons for performance. Keep as-is per user decision — Icon component is the centralized icon system. |

**Sources:** S1 (no direct pattern), S2 (`<svg>`, `<img>` for icons), S3 (Icon, IconButton), S4 (Icons), S5 (deliver-optimized-decorative-images), S6 (no direct equivalent)

---

### 8.6 Lazy / LazyPanel
**Status:** ⬜

| | |
|---|---|
| **What** | A component that defers rendering of its children until they enter the viewport (or until a specified trigger). LazyPanel is a variant for panel content. |
| **When** | For expensive components that should only render when visible (maps, charts, heavy data visualizations). Use for below-the-fold content. |
| **Why** | Reduces initial page load time and memory usage. Can use Intersection Observer API for viewport detection. Alternative: use `loading="lazy"` on images and `content-visibility: auto` on sections. LazyPanel useful for tab panels that shouldn't render until first activated. |

**Sources:** S1 (no direct pattern), S2 (`loading="lazy"`, Intersection Observer), S3 (no direct equivalent), S4 (no direct equivalent), S5 (defer-rendering-heavy-content, defer-work-until-scroll-ends), S6 (no direct equivalent)

---

### 8.7 Map
**Status:** ⬜

| | |
|---|---|
| **What** | An interactive map component using Leaflet.js for displaying geographic data, markers, and regions. |
| **When** | When the app needs to display geographic/location data (store locators, delivery tracking, real estate). |
| **Why** | Leaflet is lightweight, mobile-friendly, and supports OpenStreetMap tiles. Custom map implementations can't match its tile rendering, interaction, and plugin ecosystem. Keep as-is per user decision. |

**Sources:** S1 (no direct pattern), S2 (`<canvas>`, `<iframe>` concept), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 8.8 Separator
**Status:** ⬜

| | |
|---|---|
| **What** | A visual divider between content sections. Can be a simple line, or include text/elements in the center. |
| **When** | To visually separate distinct content sections. Use `<hr>` for thematic breaks between sections. |
| **Why** | Native `<hr>` provides semantic meaning (thematic break) that screen readers announce. For text-in-separator, use CSS `::before`/`::after` with the `content` property — no need for a custom div. Modern CSS can style `<hr>` with gradients, dots, or text. |

**Sources:** S1 (no direct pattern), S2 (`<hr>`), S3 (no direct equivalent), S4 (Dividers), S5 (no direct equivalent), S6 (Divider)

---

### 8.9 ThemeToggle
**Status:** ⬜

| | |
|---|---|
| **What** | A button/switch that toggles between light and dark mode (and potentially other themes). |
| **When** | In the app header or settings to let users switch themes. Respect `prefers-color-scheme` media query as the default. |
| **Why** | Users expect theme switching in modern apps. Store preference in `localStorage`. Use `data-theme` attribute on `<html>` for CSS-based theming. The `light-dark()` CSS function can resolve colors based on `color-scheme`. Transition smoothly between themes with CSS transitions. |

**Sources:** S1 (no direct pattern), S2 (`prefers-color-scheme`, `color-scheme`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (dark-mode, component-specific-light-dark-theme, design-token-reactivity), S6 (no direct equivalent)

---

### 8.10 Timeline / TimelineItem
**Status:** ⬜

| | |
|---|---|
| **What** | A visual representation of events in chronological order, displayed as a vertical or horizontal line with nodes at each event. |
| **When** | To show event history, activity logs, audit trails, or step-by-step processes. Use when chronological order is the primary organizing principle. |
| **Why** | More visual and scannable than a plain list for chronological data. Should use `<ol>` for semantic ordering. Each TimelineItem should use `<li>` with a time element (`<time datetime="...">`) for the date. Screen readers benefit from the ordered list semantics. |

**Sources:** S1 (no direct pattern), S2 (`<ol>`, `<li>`, `<time>`), S3 (Timeline), S4 (no direct equivalent), S5 (no direct equivalent), S6 (Timeline)

---

### 8.11 RenderStringOrSnippet
**Status:** ⬜

| | |
|---|---|
| **What** | A utility component that renders either a string or a Svelte snippet/fragment, providing flexibility in how content is passed. |
| **When** | Internal utility used by other components to accept either a string prop or a snippet slot for content. |
| **Why** | Enables components to accept simple strings (`header="Title"`) or complex snippets (`{#snippet header()}...{/snippet}`). Improves developer ergonomics — simple cases stay simple, complex cases are possible. |

**Sources:** S1 (no direct pattern), S2 (no direct equivalent), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

## 9. Metrics / Chart Components

### 9.1 AreaChart / BarChart / LineChart / PieChart / DonutChart / HorizontalBarChart
**Status:** ⬜

| | |
|---|---|
| **What** | Data visualization components for displaying numerical data as charts. Each type has specific use cases. |
| **When** | **AreaChart**: Trends over time with volume emphasis. **BarChart**: Comparing discrete categories. **LineChart**: Trends over time (continuous data). **PieChart**: Part-to-whole with ≤6 categories. **DonutChart**: Part-to-whole with space for center label. **HorizontalBarChart**: Long category labels or ranking. |
| **Why** | Visual data representation is faster to understand than tables for trends and comparisons. Choose chart type based on the data relationship: comparison = bar, trend = line/area, composition = pie/donut. Always include accessible data tables as alternatives. Use `aria-label` on the chart container. |

**Sources:** S1 (no direct pattern), S2 (`<canvas>`, `<svg>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 9.2 GaugeChart
**Status:** ⬜

| | |
|---|---|
| **What** | A semicircular or circular gauge showing a single value within a range (like a speedometer). |
| **When** | To show a single KPI or metric against a target (CPU usage, completion rate, score). Use when the value has a meaningful min/max range. |
| **Why** | More visually impactful than a number alone. Should use `role="meter"` with `aria-valuenow/min/max` for accessibility. Provide text alternative with the actual value. |

**Sources:** S1 (Meter), S2 (`<meter>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

### 9.3 KPICard / StatsCard / MetricGrid / MetricTrend / ProgressMetric
**Status:** ⬜

| | |
|---|---|
| **What** | Card-based metric display components. **KPICard**: Single big number with label. **StatsCard**: Number with trend indicator. **MetricGrid**: Grid of multiple metrics. **MetricTrend**: Up/down trend arrow with percentage. **ProgressMetric**: Metric with a progress bar. |
| **When** | Dashboard-style displays showing key business metrics. Use for at-a-glance performance monitoring. |
| **Why** | Aggregated metrics are the primary purpose of dashboards. Large numbers with trend indicators allow quick assessment. Should use semantic HTML (`<dl>` for key-value pairs, `<meter>` for gauges). Ensure sufficient color contrast for trend indicators (green/red). |

**Sources:** S1 (Meter), S2 (`<dl>`, `<dt>`, `<dd>`, `<meter>`), S3 (no direct equivalent), S4 (no direct equivalent), S5 (no direct equivalent)

---

## 10. Accordion (Disclosure)

### 10.1 Accordion / AccordionItem
**Status:** ⬜

| | |
|---|---|
| **What** | A vertically stacked set of headings that expand/collapse to show/hide content sections. AccordionItem represents a single expandable section. |
| **When** | To organize content into expandable sections — FAQs, settings panels, product details, documentation sections. Use when users benefit from seeing all section headers at once but don't need all content visible simultaneously. |
| **Why** | Reduces scrolling by hiding content behind expandable headers. Users can scan headers to find relevant sections. Native `<details>` + `<summary>` provides expand/collapse with zero JS. The `<details name="group">` attribute enables exclusive behavior (only one open at a time). For WAI-ARIA compliance, use `aria-expanded` on the header button and `aria-controls` pointing to the panel. |

**Sources:** S1 (Accordion), S2 (`<details>`, `<summary>`, `<details name>`), S3 (Details), S4 (Expansion panels), S5 (search-hidden-content), S6 (Collapse)

---

## Summary Statistics

| Category | Components | Research Status |
|----------|-----------|-----------------|
| App / Layout | 5 | ⬜ Not started |
| Form | 20 | ⬜ Not started |
| Navigation | 5 | ⬜ Not started |
| Data Display | 8 | ⬜ Not started |
| Feedback | 5 | ⬜ Not started |
| Layout | 4 | ⬜ Not started |
| Utility | 11 | ⬜ Not started |
| Metrics/Charts | 8 | ⬜ Not started |
| Accordion | 1 | ⬜ Not started |
| **Total** | **67** | |

---

## Next Steps

1. ☐ Review each component entry against the actual Twintrinsic implementation
2. ☐ Add Twintrinsic-specific implementation notes (which modern APIs are used)
3. ☐ Add "Common Mistakes" section for each component
4. ☐ Add "Related Components" cross-references
5. ☐ Publish as component documentation on the docs site
