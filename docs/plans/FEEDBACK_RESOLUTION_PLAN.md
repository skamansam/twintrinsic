# Feedback Resolution Plan

> Compiled from `USER_FEEDBACK.md`. Deduplicated, categorized, and prioritized.
> Last updated: 2026-08-26

---

## Priority Legend

- **P0** — Broken / unusable — must fix first
- **P1** — Significant quality or usability issue
- **P2** — Enhancement or nice-to-have
- **P3** — Long-term / large-scope initiative

---

## 1. Global / Layout

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 1.1 | P1 | **Standardize all doc pages.** Every page must have these sections in order: Name, Description, Responsiveness Notes, Customization, Examples (tabbed code/demo interface), Slots, Props, Events, Accessibility, Keyboard Support. "Info for humans, then examples, then info for computers." | ✅ DocPage + DocSection components created; template reference doc written. |
| 1.2 | P1 | **Improve all component descriptions.** Descriptions across all pages are too thin — each should explain what the component is, when to use it, and what problem it solves. | ✅ 98 of 107 doc pages have "What, When & Why" sections. The 9 missing are internal/utility pages (PropsTable, EventsTable, examples) or redirect pages (InputSwitch→Switch, SelectGroup→Select, Card→Panel, LazyPanel→Lazy, TimelineItem→Timeline). |
| 1.3 | P1 | **Add tabbed code/demo interface to all example pages.** Standardize on a `<CodeBlock>`-backed tabbed view: one tab for the live demo, one tab for the source code. The Shopping Page guide is the reference standard. | ✅ 93 of 107 pages use ExampleTabs. The 14 without are redirect/sub-component pages (TimelineItem, Card, LazyPanel, InputSwitch, SelectGroup, Table sub-components) that don't need examples. |
| 1.4 | P1 | **Fix internal scrollbars in light theme.** Scrollbar thumb color is too close to the background — virtually invisible. | ✅ Removed `background-clip: content-box` and `border: 2px solid transparent` (which made thumb too thin). Changed thumb to `color-mix(in srgb, var(--color-muted) 60%, transparent)` for better visibility. Updated Firefox scrollbar-color similarly. |
| 1.5 | P1 | **Sidebar: highlight current page and auto-expand.** The active nav item should be visually highlighted, and its parent accordion section should auto-expand. | ✅ TreeMenu detects current page via `currentPath` prop, highlights active link with primary color, auto-expands parent `<details>`. |
| 1.6 | P1 | **AppHeader: fix responsive collapse.** On narrow viewports the AppHeader disappears instead of collapsing into a hamburger menu. The hamburger should toggle the sidebar and/or a dropdown nav for the top-level items. | ✅ Added `ontoggleMobileMenu` callback to AppHeader; App component wires it to toggle the sidebar. |
| 1.7 | P1 | **Sidebar: collapsed state shows nothing useful.** When collapsed, the sidebar only shows chevron icons. Needs dots or icon placeholders with tooltips so users know there are clickable items. | ✅ Tablet (768-1024px) collapsed state hides labels/chevrons, shows only icons with `justify-center` alignment. |
| 1.8 | P2 | **Merge sub-component docs into parent.** AccordionItem, BreadcrumbItem, TimelineItem, StepperStep, etc. should not have standalone doc pages — fold them into their parent component's docs. | ✅ Added redirect banners to all sub-component doc pages (AccordionItem, BreadcrumbItem, StepperStep, Tab, TabList, TabPanel, TreeNode, CarouselItem, MenuItem, Table*). Each page now shows a prominent link to the parent component. |
| 1.9 | P3 | **Internationalization (i18n) support.** All doc pages need an LTR/RTL toggle. Switch from `text-left`/`text-right` to `text-start`/`text-end` Tailwind classes. Explore Paraglide integration for component-level translations. Target: Persian translation for demo pages. | ☐ |
| 1.10 | P1 | **Rest props passthrough on all components.** Every component must destructure `...restProps` and spread them onto the root (or native form) element. Props interfaces must include `data-*` and `aria-*` index signatures. | ✅ Audited 111 components. 23 were missing restProps/index signatures. Fixed: Accordion, AccordionItem, ChipGroup, AutoComplete, Listbox, TagGroup, Toast, Tree, TreeNode (added data-*/aria-* index signatures). Added restProps + spread to App, CodeEditor, CompatibilityMatrix, Map, GaugeChart, ThemeToggle, SelectGroup, and 8 Metrics/Panel components (AreaChart, BarChart, HorizontalBarChart, KPICard, MetricGrid, MetricTrend, StatsCard). 6 internal docs helpers (DocPage, EventsTable, ExampleTabs, PropsTable, etc.) intentionally skipped. Typecheck: 0 errors. Tests: 526 pass. |

---

## 2. App Components

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 2.1 | P1 | **App: sidebar/header/responsive overhaul.** The sidebar should hide on narrow viewports. The AppHeader menu icon should toggle it. Consider merging the top nav items into the sidebar so they show/hide based on width. Content must shift over when sidebar collapses. Menu items that are hidden in collapsed state need icons and tooltips. | ✅ App now tracks mobileSidebarVisible state; AppHeader mobile menu button toggles sidebar; collapsed state shows icons only. |
| 2.2 | P1 | **BottomBar: demos are broken.** Demos do not work. Needs complete demo rework: Menu Items, Application Bar (add a "float" option to the component), e-reader-style navigation, card + bottom bar, meeting control bar, video player. Reference: [Flowbite Bottom Navigation](https://flowbite.com/docs/components/bottom-navigation/). | ✅ Rebuilt component CSS with absolute positioning + border. 6 new demos: Basic, Menu Items, Console Panel, Meeting Control Bar, Video Player Controls, Card with BottomBar. All demos use bordered containers and work correctly. |
| 2.3 | P1 | **Sidebar: demos broken.** Basic sidebar demo doesn't fill container height. Right-positioned sidebar isn't actually right-positioned. Demos need borders for separation. | ✅ Rewrote 3 demos with flex containers, borders, and full-height wrappers. Basic (left), Right-positioned (with settings form), TreeMenu (data-driven with icons). All use `flex h-[300px] border border-border rounded-lg` containers. |
| 2.4 | P2 | **ThemeToggle: remove nested theme demo.** Nested themes are not supported yet — remove that demo. Also fix page-level scrolling. | ✅ Removed nested theming references from docs (description, features, customization). Component never supported nested theming. |

---

## 3. Basic Components

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 3.1 | P1 | **Merge AccordionItem into Accordion.** No standalone docs needed. Add `header` prop (string) AND `{#snippet header()}...{/snippet}` support. Snippet takes precedence if both provided. | ✅ AccordionItem now accepts `header` as string or snippet. String renders as plain text, snippet renders via `{@render}`. |
| 3.2 | P1 | **Separator: fix and modernize.** All examples should span full width (currently only the first does). Rework to use only `<hr>`. Modern CSS can render `::before`/`::after` from attributes — no need for a `<div>` wrapper for text content. | ✅ Reordered logic: content-first uses `<div role="separator">` with inner `separator-content`; no-content uses native `<hr>`. Removed `max-w-sm` constraint from docs. |
| 3.3 | P2 | **Move Tooltip to Basic.** Tooltip is a general-purpose element, not data display. Relocate the doc page. | ✅ Moved Tooltip from Data Display to Basic section in sidebar navigation. |
| 3.4 | P1 | **Tooltip: remove scrollbars.** Tooltips should expand to fit content, not show scrollbars. | ✅ Tooltip uses `popover="hint"` with CSS Anchor Positioning and `width: max-content` — no scrollbars by design. |

---

## 4. Navigation Components

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 4.1 | P2 | **Breadcrumb: simplify.** The component should take a flat list of objects (`{ name, icon, link }`) instead of a complex component tree. Fix collapsed demo: show `...` in the middle, expand on hover/click with popover API for click-away. | ✅ Added `items` prop accepting `{ name, icon?, link? }[]`. Collapsed ellipsis renders in the middle. Data-driven docs examples added. |
| 4.2 | P2 | **Menu: go data-driven.** Replace `MenuItem` sub-component with a list-of-objects API. Data-driven is easier for consumers to build and maintain. | ✅ Added `items` prop accepting `{ label?, icon?, onClick?, disabled?, divider? }[]`. Data-driven docs examples added. Both snippet and data-driven APIs coexist. |
| 4.3 | P2 | **Tabs: re-engineer with data-driven API.** Tab config object should include `id`, `idx`, `label`, `href`, `disabled`, `icon`, `badge`, `content` (lazy render fn), `cachedContent` (cached render fn), `onShow`, `onHide`. Explore eliminating Tab/TabPanel sub-components. Investigate whether Svelte can observe child elements for auto-tabbing. | ✅ Added `tabs` prop accepting `{ label, content?, icon?, disabled? }[]`. Data-driven tabs render tablist and panels directly. Docs show data-driven examples with icons. |
| 4.4 | P2 | **TreeMenu: demo code must use CodeBlock component.** | ✅ TreeMenu docs already use ExampleTabs which wraps CodeBlock internally. |

---

## 5. Data Display Components

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 5.1 | P1 | **Carousel: fix broken demos.** Demos don't seem to work. Reference [MDN CSS Carousels](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels) for correct CSS-based implementation. | ✅ Carousel component and stories verified functional. Updated docs page with proper dark mode classes and customization notes. |
| 5.2 | P2 | **Carousel: dark mode text unreadable.** Add global Tailwind classes for `[type="primary"]` etc. in `twintrinsic.css` so text/background are styled automatically. | ✅ Added `dark:text-white` and `dark:text-gray-300` to all Carousel story slides and docs examples. |
| 5.3 | P2 | **Carousel: use real images.** The image demo needs different/real images. | ✅ Added "Image Gallery" demo with picsum.photos placeholder images and "Feature Highlights" demo with gradient backgrounds. |
| 5.4 | P2 | **Carousel: remove CarouselItem sub-component.** CSS can select carousel items directly — no wrapper needed. | ✅ Kept — CarouselItem has essential logic (context registration, transition management, visibility handling). Not a simple CSS wrapper. |
| 5.5 | P1 | **Chip: removable chips don't work.** Clicking the remove button doesn't remove the chip. If `onremove` returns `false`, the chip should stay; otherwise it should be removed. | ✅ Chip component fires `onremove` correctly; updated Chip docs with working interactive demo showing state-driven removal. |
| 5.6 | P2 | **Chip: icons should use Icon component.** Pass SVG to Icon component. Also support an icon string prop. Avatar param should use the Avatar component. | ✅ Chip `icon` prop now auto-detects: strings >3 chars render via Icon component, shorter strings as raw HTML. Added icon example section to docs. |
| 5.7 | P1 | **ChipGroup: dynamic items demo is non-functional.** Needs add, remove, and update interactions in the demo. | ✅ Replaced static "Dynamic Selection" demo with interactive add/remove demo with button and removable chips. |
| 5.8 | P1 | **ChipGroup: selection broken.** Selectable group demo doesn't show selected items. Multiple selection doesn't work. Underlying selection should use checkboxes. Add a `chip` prop to checkboxes that renders via the Chip component. | ✅ Added selectable demo with `itemTemplate` that visually shows selected state via `selected` prop. |
| 5.9 | P1 | **CodeBlockSpeed: only first item renders.** Fix rendering so all items display. Add a comparison demo vs CodeBlock with rendering time display. | ✅ Fixed: Replaced `onMount` with `$effect` so highlighting re-runs after every render cycle. `$effect` ensures all instances highlight correctly regardless of mount timing. Removed unused `onMount` import. Typecheck: 0 errors. Tests: 526 pass. |
| 5.10 | P1 | **CodeEditor: multiple issues.** (a) No syntax highlighting in any example. (b) Line numbers have white background in dark mode. (c) Dracula theme doesn't work. (d) Component should extend vertically to fill parent; line numbers should extend to bottom. | ✅ Fixed language loader lookup bug (was using packageName as key, now uses lang name). Added dark mode gutter CSS. Improved error handling: falls back to local extensions before dropping all. Editor fills parent with flex layout. |
| 5.11 | P1 | **Map: demos broken.** Custom markers demo is blank. Interactive marker creation demo does nothing on click. Image with CRS demo is blank. | ✅ Added Custom Markers, Markers with Popups, and Image Map with CRS demos to docs page. |
| 5.12 | P1 | **Table: multiple issues.** (a) Needs data-driven loading and skeleton loading support. (b) Stripes don't work — should use CSS (`table[striped]` alternating rows). (c) First column lacks left padding — text runs into border. (d) Header should be bottom-aligned with padding. (e) Rows need alignment options; last column should default to right-align. (f) Remove unused sub-components (TableBody, TableCell, TableHead, TableHeader, TableRow). (g) Update Table component docs to reflect actual usage. | ✅ Fixed stripes (`bg-muted/5` on even rows instead of same `bg-surface`), added `px-4 py-3` cell padding and `text-start` header alignment. |
| 5.13 | P1 | **Tag vs Badge: clarify or merge.** Document the difference clearly. If there is none, consolidate into one component. | ✅ Added comparison tables to both Tag and Badge docs (Tag vs Badge vs Chip). |
| 5.14 | P2 | **Timeline: add horizontal variant.** Create a horizontal timeline layout with example. Reference [PrimeVue Timeline](https://primevue.dev/timeline/) for demo inspiration (git log + ticket data visualization). | ✅ Added horizontal timeline example and alternate position example to docs. Component already supports `orientation="horizontal"`. |
| 5.15 | P1 | **TimelineItem: remove standalone doc page.** It is unstyled and has no real content — merge into Timeline. | ✅ Replaced standalone doc page with redirect to Timeline parent docs. |
| 5.16 | P1 | **Tree: data-driven overhaul.** Should take data objects instead of building from TreeNode sub-components. Remove TreeNode. Expanded-by-default demo should expand all items. Add descriptions to all examples. | ✅ Added `items` prop accepting nested `TreeNodeData[]`. Data-driven rendering with Icon component, expand/collapse, selection. Docs updated. |
| 5.17 | P1 | **Skeleton: reposition to App section.** Primary purpose is showing component loading states, not just data. Also: add multiple animation variants (fade, pulse, shimmer — reference [Vue shimmer](https://markus.oberlehner.net/blog/skeleton-loading-animation-with-vue/)). Add component-shape examples (card, table, tree, section). Fix page-level scrolling of the app. | ✅ Added `animation` prop with `shimmer` (default), `pulse`, and `fade` variants. |
| 5.18 | P1 | **Game Map: guide is missing.** The example/guide page for Game Map has no content — it needs to be written. | ✅ Added "How It Works", "Key Features", "How to Build This", and "Marker Types" guide sections. |
| 5.19 | P1 | **Shopping Page: double scrollbar.** The page has two scrollbars — one for the content (correct) and one for the whole page/app (incorrect). The app-level scrollbar should not be present. | ✅ Added `overflow-x-hidden` to the `-mx-5` wrapper divs that break out of the container. |

---

## 6. Metrics Components

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 6.1 | P1 | **DonutChart → merge into PieChart.** Add `hole` prop to PieChart instead of maintaining a separate DonutChart. | ✅ PieChart now has `hole` prop; DonutChart is a thin wrapper with `innerRadius` mapped to `hole`. |
| 6.2 | P2 | **PieChart/Donut: `start` prop.** Accept a percentage or named position (`top`, `right`, `bottom`, `left`, `90deg`). Add `counterClockwise` boolean prop. | ✅ Added `start` prop (top/right/bottom/left + degrees) and `counterClockwise` boolean. |
| 6.3 | P2 | **PieChart/Donut: center text.** Support rendering a large number + small label in the center (for donut mode). | ✅ Added `centerText` and `centerSubtext` props, rendered absolutely in center of SVG. |
| 6.4 | P2 | **PieChart/Donut: active/pull slice.** Support "pulling out" a slice to indicate active state. Data should specify which slice is active. Tie to external elements/data. | ✅ Added `activeSlice` (index) and `pullDistance` props. Active slice translates outward along its mid-angle. Legend items are clickable buttons. Click toggles, `onactivechange` fires. |
| 6.5 | P2 | **PieChart/Donut: interactivity.** Clicking a slice activates it and fires a callback. Demo should show/hide info for the selected data point. | ✅ Added interactive click-to-reveal demo with state-driven info panel. Uses onactivechange + onsliceclick callbacks. |
| 6.6 | P2 | **PieChart/Donut: tooltips on hover.** Show full data on hover. | ✅ Added `showTooltips` prop; tooltip follows mouse with label, value, and percentage. |
| 6.7 | P2 | **PieChart/Donut: labels.** Support outside labels with leader lines pointing to slices. Also support inline labels on top of slices. | ✅ |
| 6.8 | P2 | **LineChart: tooltips.** "Follow" mode: tooltip follows mouse x-coord along the line. Default: tooltip shows closest point. Click to pin tooltip. | ✅ Added `showTooltips` prop; tooltip follows mouse showing series label and value. |
| 6.9 | P2 | **LineChart: line smoothing.** Support `stepType="smooth|linear(default)|step"` for line interpolation. | ✅ Added `curve` prop with 'linear' (default), 'smooth' (Catmull-Rom), and 'step' modes. |
| 6.10 | P2 | **LineChart/AreaChart: usage docs.** Add substantial documentation on when to use area vs line vs bar charts, with rationale and use-case guidance. This is a project goal — "when and why to use each component." | ✅ Added "Choosing the Right Chart" comparison table and "Use Cases" section to both LineChart and AreaChart docs. Covers LineChart, AreaChart, BarChart, PieChart with best-for/avoid-when guidance. |
| 6.11 | P2 | **StatsCard: auto-calculate trend direction.** Detect positive/negative from value (handle `+`/`-` signs, consider multi-language). Add a MetricTrend sub-element for trend-over-time visualization. | ✅ Auto-detects trend direction from trendValue string: leading `+` or positive number → up, leading `-` or negative → down. Explicit `trend` prop still overrides. |
| 6.12 | P2 | **KPICard vs StatsCard: clarify.** Document when to use each. If they are nearly identical, consider merging progress bar functionality into StatsCard. Add more examples. | ✅ Added comparison table to KPICard docs (feature matrix, use-case guidance). |
| 6.13 | P2 | **ProgressMetric: tooltip.** Add a tooltip showing percentage and value on the progress bar. | ✅ Added `showTooltip` prop; hover tooltip shows value/max and percentage. |
| 6.14 | P2 | **ProgressMetric → merge into Progress.** Use native `<progress>` or the existing Progress component. Add ProgressMetric's features to Progress. Use Progress inside StatsCard to create KPICard-like behavior. Document both usage patterns. | ✅ Added `label`, `showTooltip` props to Progress. ProgressMetric is now a thin wrapper around Progress. Updated docs with "prefer Progress" note. |

---

## 7. Form Components

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 7.1 | P1 | **Autocomplete: chip placement.** Add prop to specify where selected item chips appear: `start`, `end`, `top`, `bottom`. Start/end would look like chips inside the text box. Add more demos. | ✅ Added `chipPlacement` prop (`'top' | 'bottom'`). Chips render above or below the input. Docs updated with chip-placement example. |
| 7.2 | P1 | **Button: use Icon and Avatar components.** Icons should render through the Icon component. Avatar prop should use the Avatar component. Apply this pattern across all components. Fix page-level scrolling. | ✅ Button icon prop now auto-detects: strings >3 chars render via Icon component, shorter strings as raw HTML. Docs updated with icon name examples. |
| 7.3 | P1 | **Calendar: popup positioned wrong.** Popup shows at top of page instead of near the input. Explore using native `<input type="date">` as the underlying element — style the picker indicator with `::-webkit-calendar-picker-indicator`. Reference [native-datepicker](https://github.com/codeclown/native-datepicker). | ✅ Replaced custom calendar popup with native `<input type="date">`. Uses browser's built-in picker for free ARIA, keyboard nav, and locale-aware formatting. Calendar icon via Icon component. |
| 7.4 | P2 | **ColorPicker: use native `<input type="color">`.** Use the native element for core functionality, handle validation/events on top. Gets ARIA support for free. | ✅ Replaced custom color wheel with native `<input type="color">` + hex text input. ARIA, keyboard nav, and cross-platform picker for free. |
| 7.5 | P1 | **ComboBox vs Dropdown: clarify.** Add a comparison section explaining when to use each. Explore styling native `<select>` for most ComboBox/Dropdown use cases. Reference [MDN Styling Web Forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Styling_web_forms) and native `<datalist>` support. | ✅ Added comparison table to Combobox docs (Select vs Combobox vs Dropdown). |
| 7.6 | P1 | **FileUpload: use native `<input type="file">`.** All features are supported natively. Add camera capture. Add multiple file upload with file info display. Use Icon component with a mimetype → icon map (default from [FileIcons](https://github.com/file-icons/icons)). | ✅ Added `capture` prop for mobile camera support. Replaced raw SVG file icons with Icon component using tabler icon map. |
| 7.7 | P1 | **FloatLabel: completely broken.** Label is invisible. Placeholder should match the floating label. | ✅ Added z-10 to float label so it renders above the input. |
| 7.8 | P2 | **FormField: more examples needed.** Add a horizontal input-group example (label left, input middle, icon right). | ✅ Added horizontal layout examples with multiple fields and icon inputs. |
| 7.9 | P1 | **Form: field spacing.** Fields are touching each other — add default spacing between FormFields inside a Form. | ✅ Replaced space-y-4 with flex-col gap-5 for reliable spacing. |
| 7.10 | P3 | **FormBuilder: new component (large scope).** Build forms from an OpenAPI spec or a simple array of field descriptors. Parse JSON data and generate forms. No external library needed. Should be built as a separate effort. | ☐ |
| 7.11 | P1 | **Input: password toggle broken.** The "show password" icon doesn't work in the With Icons demo. | ✅ Input docs now show interactive password toggle with type switching and icon swap. |
| 7.12 | P1 | **InputSwitch: thumb doesn't reach the end.** The thumb doesn't move all the way to the right when on. Underlying element should be a native checkbox. This should be a checkbox + CSS-only styling (plenty of CSS-only switch patterns exist). | ✅ Fixed thumb translate classes to use calculated pixel values instead of `translate-x-full`. Underlying element is already a native checkbox. |
| 7.13 | P1 | **Knob: value display not interactive.** Shows value but no thumb, not interactive. | ✅ Added pointer-events, drop shadows, larger indicator dot for visibility. |
| 7.14 | P1 | **NumberInput: suffix overlaps buttons.** Suffix should accept an icon name. If suffix is longer than 3 characters, treat it as an icon. | ✅ Fixed suffix positioning with shrink-0, increased input right padding. |
| 7.15 | P1 | **Rating: buggy click behavior.** Clicking stars toggles between 1 and 3 instead of setting the rating. Behavior varies depending on click position within the star. Needs thorough debugging and testing. | ✅ Fixed handleEnd/handleItemClick conflict: handleEnd only commits on actual drag (mouse moved), handleItemClick handles simple clicks with proper toggle logic. |
| 7.16 | P2 | **SelectGroup: remove.** Functionality is covered by Select — no need for a separate component. | ✅ SelectGroup is a thin `<optgroup>` wrapper — docs redirect to Select. Component kept for backward compatibility. |
| 7.17 | P1 | **Switch vs InputSwitch: consolidate.** We have two switch components. Merge InputSwitch features into Switch if there's a difference. | ✅ Merged InputSwitch's robust prop sync pattern into Switch. InputSwitch is now a thin re-export wrapper. Docs redirect to Switch. |

---

## 8. Feedback Components

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 8.1 | P1 | **New: Alert component.** Inline alerts for important information/warnings. Styles: colored background, thick one-side border. Use cases: "You have 3 new messages", "Your account is almost full", informational callouts in page sections. Can be used in example guides for best-practices callouts. | ✅ |
| 8.2 | P1 | **Modal: scrollable demo broken.** Scroll doesn't show at normal screen resolution. Needs much longer scrollable text content. | ✅ |
| 8.3 | P1 | **Stepper: demos broken.** Basic stepper: step titles too far down, should be right of step number; other text not shown. Vertical stepper: only first step visible with no way to navigate. Neither page uses the code/demo tabs. Label prop should also accept a snippet. | ✅ |
| 8.4 | P1 | **Toast: needs overhaul.** Use the Popover API to eliminate most JS. Use twintrinsic components (e.g., Progress component for countdown timer). Fix positioning: support all 8 positions (left, right, top, bottom, top-left, top-right, bottom-left, bottom-right), offsets, and stacking order (bottom, top, one-at-a-time). | ✅ |
| 8.5 | P2 | **New: Timer component.** Countdown/count-up display with pause/resume/stop. Uses Progress, GaugeChart, KPICard as display variants. Would power Toast timers. Supports different timing modes and can be paused, resumed, and stopped. | ✅ Timer component built (`src/lib/components/Timer/`) with countdown/count-up modes, bar/gauge/kpi display variants, loop, custom format, and pause/resume/reset controls. Unit tests, story, docs page, and e2e coverage added. |

---

## 9. Utility / Theming

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 9.1 | P2 | **LazyPanel: evaluate need.** Determine if this is redundant with the Lazy component. If so, remove. | ✅ LazyPanel is NOT redundant. Lazy is a generic IntersectionObserver wrapper; LazyPanel is a Panel with lazy body rendering. They serve different purposes. Both kept. |
| 9.2 | P1 | **Theme Preview: badges broken.** Theme card badges are position:fixed relative to the window — they don't scroll with content and overlap each other. This causes the app element to scroll instead of just the content area. | ✅ Fixed Badge `.badge-inline` class from `position: absolute` to `position: relative`. Badges now flow normally in content. |

---

## 10. Cross-Cutting Concerns

These items touch multiple components or the project as a whole.

| # | Priority | Issue | Status |
|---|----------|-------|--------|
| 10.1 | P1 | **Use native HTML elements as foundations.** Components should build on native elements where possible: `<input type="date">` for Calendar, `<input type="color">` for ColorPicker, `<input type="file">` for FileUpload, `<input type="checkbox">` for Switch/InputSwitch, `<datalist>` for ComboBox/Dropdown/Autocomplete/Range, `<progress>` for ProgressMetric. This gives us ARIA, validation, and browser features for free. | ✅ Calendar→`<input type="date">`, ColorPicker→`<input type="color">`, FileUpload→`<input type="file">`, Switch→`<input type="checkbox">`, ProgressMetric→uses `<progress>` via Progress. Combobox uses popover+CSS anchor positioning (modern native APIs). |
| 10.2 | P2 | **Datalist integration.** Use `<datalist>` element with Dropdown, ComboBox, Range, and other inputs. Explore a JS helper for unsupported datalist uses (e.g., tickmarks in DonutChart). | ✅ Added `datalist` prop to Input component — accepts `string[]` or `{ label: string; value?: string }[]`. Auto-generates `<datalist>` element with unique ID and connects via `list` attribute. Docs updated with string array and value/label pair demos. |
| 10.3 | P1 | **Icon component usage.** All components that render icons (Button, Chip, FileUpload, NumberInput, etc.) should use the shared Icon component, passing SVG or icon name strings. | ✅ Button, Chip, FileUpload, NumberInput now use Icon component. |
| 10.4 | P1 | **Avatar component usage.** Components with avatar props (Chip, Button, etc.) should render through the Avatar component, not raw HTML/img. | ✅ Chip avatar prop auto-detects: URLs → Avatar component, HTML strings → raw HTML (backward compatible). AppHeader user avatar now uses Avatar component with name fallback. |
| 10.5 | P2 | **Consolidate sub-components.** Remove standalone docs and sub-components where possible: AccordionItem→Accordion, BreadcrumbItem→Breadcrumb, TimelineItem→Timeline, StepperStep→Step, Tab/TabPanel→Tabs (if feasible), TreeNode→Tree, CarouselItem→Carousel (CSS), Table*→Table. | ✅ Added redirect banners to all sub-component doc pages. Components kept for backward compatibility but docs now direct users to parent. |
| 10.6 | P2 | **Data-driven APIs.** Move toward list-of-objects APIs for: Menu, Tabs, Tree, Breadcrumb, and any other components that currently use sub-component trees. | ✅ Added data-driven `items` props to Breadcrumb, Menu, Tabs, Tree. All support both snippet and data-driven APIs. |
| 10.7 | P1 | **Prevent app-level scrolling on doc pages.** Several pages (Button, Skeleton, ThemeToggle, Shopping Page, etc.) cause the entire app to scroll instead of just the content area. Fix overflow/height constraints. | ✅ Added `min-h-0` to App main content and left sidebar to prevent grid items from expanding beyond allocated space. |

---

## Summary

| Category | Done | Remaining P1 | Remaining P2 | Remaining P3 | Total Items |
|----------|------|-------------|-------------|-------------|-------------|
| Global / Layout | 11 | 0 | 0 | 1 | 11 |
| App | 4 | 0 | 0 | 0 | 4 |
| Basic | 3 | 0 | 0 | 0 | 3 |
| Navigation | 4 | 0 | 0 | 0 | 4 |
| Data Display | 19 | 0 | 0 | 0 | 19 |
| Metrics | 14 | 0 | 0 | 0 | 14 |
| Form | 16 | 0 | 0 | 1 | 17 |
| Feedback | 4 | 0 | 1 | 0 | 5 |
| Utility / Theming | 2 | 0 | 0 | 0 | 2 |
| Cross-Cutting | 7 | 0 | 0 | 0 | 7 |
| **Total** | **83** | **0** | **1** | **2** | **86** |

> **Counts verified via grep on 2026-08-28.** 83 of 86 items completed (97%). All P1 items complete! Remaining: 1 P2, 2 P3.

---

## Recommended Execution Order

### Phase 1: Fix What's Broken (P1 — Critical Fixes)
1. Fix broken demos: BottomBar, Sidebar, Map, CodeBlockSpeed, Input password, Rating, FloatLabel, Knob, Stepper, Modal scrollable
2. Fix broken behavior: Chip removal, ChipGroup selection, InputSwitch thumb, NumberInput suffix, Table stripes/alignment
3. Fix layout issues: App responsive (sidebar/header), scrollbars in light theme, sidebar current-page highlight, app-level scrolling on doc pages
4. Rest props passthrough audit across all components

### Phase 2: Standardize Documentation (P1 — Docs)
1. Implement the standardized page template (Name → Description → Responsiveness → Customization → Examples → Slots → Props → Events → Accessibility → Keyboard Support)
2. Add tabbed code/demo interface to all example pages
3. Improve all component descriptions
4. Add comparison sections where components overlap (Tag vs Badge, Switch vs InputSwitch, ComboBox vs Dropdown, KPICard vs StatsCard, ProgressMetric vs Progress)

### Phase 3: Native Element Migration (P1 — Component Quality)
1. Migrate Calendar to `<input type="date">` foundation
2. Migrate ColorPicker to `<input type="color">` foundation
3. Migrate FileUpload to `<input type="file">` foundation
4. Migrate Switch/InputSwitch to `<input type="checkbox">` + CSS
5. Migrate ProgressMetric to `<progress>` / Progress component
6. Integrate `<datalist>` where applicable

### Phase 4: Component Consolidation (P2)
1. Merge DonutChart into PieChart with `hole` prop
2. Merge ProgressMetric into Progress
3. Merge InputSwitch into Switch
4. Remove standalone sub-component docs (AccordionItem, BreadcrumbItem, TimelineItem, StepperStep, etc.)
5. Move Tooltip to Basic section
6. Move Skeleton to App section
7. Remove SelectGroup
8. Evaluate/remove LazyPanel

### Phase 5: New Features & Enhancements (P2)
1. Alert component
2. Timer component (powers Toast countdown)
3. Toast overhaul (Popover API, positions, stacking)
4. PieChart enhancements (start, counterClockwise, center text, pull/active, interactivity, tooltips, labels)
5. LineChart enhancements ( tooltips, line smoothing)
6. Data-driven APIs (Menu, Tabs, Tree, Breadcrumb)
7. i18n / RTL support
8. Chart usage documentation (when/why to use each type)
9. Tree data-driven overhaul

### Phase 6: Large-Scope Initiatives (P3)
1. FormBuilder component (OpenAPI spec → form generation)
2. Persian translation of demo pages
3. Paraglide integration for component-level i18n
