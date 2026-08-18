# Real-World Examples Plan

Checklist for making every Storybook story and docs-site example look like
content that would appear on a real production page — no `John Doe`,
`Option 1`, `Slide 1`, `Lorem`, or placeholder image services
(`pravatar.cc`, `via.placeholder.com`, `picsum.photos`) in example content.

Two parallel passes have already been completed:

1. **Storybook pass (DONE)** — every placeholder story example was replaced
   with realistic content (FAQ accordions, checkout steppers, billing tabs,
   product cards, analytics dashboard, etc.). See git history for the batch.
2. **Docs-site pass (DONE)** — the docs pages were brought in line with the
   stories, and the docs e2e tests were synced to the new content.

This file is the working checklist that remains. Each row lists the component,
its story file, its docs page, and the current example status. Check boxes off
as you go; keep story examples, docs examples, and e2e assertions in sync.

## Conventions

- **One roster, everywhere.** Use the Acme team as the canonical "real people"
  for user-ish examples: Sarah Chen, Marcus Webb, Priya Patel, Diego Ramírez,
  Emma Lindqvist, James Okafor, Lena Fischer, Tomás Herrera, Aisha Bello,
  Noah Kim, Sofia Rossi, Ethan Walker. Emails are `first.last@acme.io`.
- **Avatar images.** Use stable Unsplash portrait URLs (same approach as the
  Carousel story) — never `pravatar.cc`.
- **Company context.** Product/data examples use the "Acme Suite" SaaS brand
  already established in the App / AppHeader / Dashboard stories.
- **Keep play/assertions in sync.** Storybook `play` functions and docs e2e
  tests frequently assert on example text — update them in the same change.
- **Verification:** `pnpm check`, `pnpm test:storybook`, and the docs e2e
  suite (`pnpm test:e2e --project=e2e`) must stay green.

## Checklist

### App

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| App | `App.stories.svelte` | `App/App` | ✅ real-world (Acme Suite layout) |
| AppHeader | `AppHeader.stories.svelte` | `AppHeader/AppHeader` | ✅ real-world (Acme Suite + SVG logo) |
| BottomBar | `BottomBar.stories.js` | `BottomBar/BottomBar` | ✅ real-world (Sarah Chen) |
| Footer | `Footer.stories.svelte` | `Footer/Footer` | ✅ real-world |
| Sidebar | `Sidebar.stories.js` | `Sidebar/Sidebar` | ✅ real-world |

### Basic / Layout

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| Card | `Card.stories.js` | `Panel/Card` | ✅ real-world (product/blog cards, Unsplash cover) |
| Container | `Container.stories.js` | `Container/Container` | ✅ real-world |
| Panel | `Panel.stories.js` | `Panel/Panel` | ✅ real-world (Order Summary / Settings) |
| Separator | `Separator.stories.js` | `Separator/Separator` | ✅ real-world (Overview/Details, Account/Billing) |

### Navigation

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| Accordion | `Accordion.stories.svelte` | `Accordion/Accordion` | ✅ real-world (Billing FAQ) |
| Breadcrumb | `Breadcrumb.stories.svelte` | `Breadcrumb/Breadcrumb` | ✅ real-world |
| Menu | `Menu.stories.svelte` | `Menu/Menu` | ✅ real-world (Account menu) |
| Tabs | `Tabs.stories.svelte` | `Tabs/Tabs` | ✅ real-world (Billing/Team/Usage + pricing) |
| TreeMenu | `TreeMenu.stories.svelte` | `TreeMenu/TreeMenu` | ✅ real-world (file system) |

### Data Display

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| Avatar | `Avatar.stories.svelte` | `Avatar/Avatar` | ✅ real-world (Sarah Chen/Marcus Webb, Unsplash portraits) |
| AvatarGroup | (in Avatar story) | `Avatar/AvatarGroup` | ✅ real-world (Sarah Chen/Priya Patel/Emma Lindqvist) |
| Badge | `Badge.stories.svelte` | `Badge/Badge` | ✅ real-world |
| Carousel | `Carousel.stories.svelte` | `Carousel/Carousel` | ✅ real-world (feature slides, Unsplash) |
| Chip | `Chip.stories.svelte` | `Chip/Chip` | ✅ real-world (Sarah Chen/Marcus Webb avatar chips) |
| CodeBlock | `CodeBlock.stories.js` | `CodeBlock/CodeBlock` | ✅ real-world |
| CodeBlockSpeed | `CodeBlockSpeed.stories.js` | `CodeBlockSpeed/CodeBlockSpeed` | ✅ real-world (Sarah Chen in TS sample) |
| CodeEditor | `CodeEditor.stories.js` | `CodeEditor/CodeEditor` | ✅ real-world (Sarah Chen in Dracula sample) |
| DataTable | `DataTable.stories.svelte` | `DataTable/DataTable` | ✅ real-world (Acme support queue, 12 rows) |
| Progress | `Progress.stories.svelte` | `Progress/Progress` | ✅ real-world |
| Skeleton | `Skeleton.stories.svelte` | `Skeleton/Skeleton` | ✅ real-world |
| Table | `Table.stories.svelte` | `Table/Table` | ✅ real-world (Acme team + real tasks/plans) |
| Tag | `Tag.stories.svelte` | `Tag/Tag` | ✅ real-world (project statuses) |
| Timeline | `Timeline.stories.svelte` | `Timeline/Timeline` | ✅ real-world (release pipeline) |
| Tooltip | `Tooltip.stories.svelte` | `Tooltip/Tooltip` | ✅ real-world (Save changes / actions) |
| Tree | `Tree.stories.svelte` | `Tree/Tree` | ✅ real-world (website structure) |

### Form

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| AutoComplete | `AutoComplete.stories.js` | `Form/AutoComplete` | ✅ real-world (Acme team + Unsplash portraits) |
| Button | `Button.stories.svelte` | `Button/Button` | ✅ real-world |
| Calendar | `Calendar.stories.js` | `Form/Calendar` | ✅ real-world |
| Checkbox | `Checkbox.stories.svelte` | `Form/Checkbox` | ✅ real-world |
| ColorPicker | `ColorPicker.stories.svelte` | `Form/ColorPicker` | ✅ real-world |
| Combobox | `Combobox.stories.svelte` | `Form/Combobox` | ✅ real-world (Acme team users) |
| Dropdown | `Dropdown.stories.svelte` | `Form/Dropdown` | ✅ real-world |
| FileUpload | `FileUpload.stories.svelte` | `Form/FileUpload` | ✅ real-world |
| FloatLabel | `FloatLabel.stories.svelte` | `Form/FloatLabel` | ✅ real-world |
| Form | `Form.stories.svelte` | `Form/Form` | ✅ real-world |
| FormField | (via Form) | `Form/FormField` | ✅ real-world |
| Input | `Input.stories.js` | `Form/Input` | ✅ real-world |
| InputSwitch | `InputSwitch.stories.svelte` | `Form/InputSwitch` | ✅ real-world |
| InvalidState | `InvalidState.stories.svelte` | `Form/InvalidState` | ✅ real-world |
| Knob | `Knob.stories.svelte` | `Form/Knob` | ✅ real-world |
| Listbox | `Listbox.stories.svelte` | `Form/Listbox` | ✅ real-world (countries/users) |
| ListInput | `ListInput.stories.svelte` | `Form/ListInput` | ✅ real-world |
| NumberInput | `NumberInput.stories.svelte` | `Form/NumberInput` | ✅ real-world |
| Radio | `Radio.stories.svelte` | `Form/Radio` | ✅ real-world (themes) |
| RadioGroup | (via Radio) | `Form/RadioGroup` | ✅ real-world |
| Rating | `Rating.stories.svelte` | `Form/Rating` | ✅ real-world |
| Select | `Select.stories.js` | `Form/Select` | ✅ real-world (countries/languages) |
| SelectGroup | `SelectGroup.stories.svelte` | `Form/SelectGroup` | ✅ real-world |
| Slider | `Slider.stories.svelte` | `Form/Slider` | ✅ real-world |
| Switch | `Switch.stories.svelte` | `Form/Switch` | ✅ real-world |
| TextInput | `TextInput.stories.svelte` | `Form/TextInput` | ✅ real-world |
| Textarea | `Textarea.stories.svelte` | `Form/Textarea` | ✅ real-world |

### Feedback

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| Modal | `Modal.stories.svelte` | `Modal/Modal` | ✅ real-world (delete/invite dialogs) |
| Stepper | `Stepper.stories.svelte` | `Stepper/Stepper` | ✅ real-world (Sarah Chen review step) |
| Toast | `Toast.stories.svelte` | `Toast/Toast` | ✅ real-world (saved/storage/server) |

### Metrics

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| All Metrics (KPICard, MetricGrid, charts, ProgressMetric, StatsCard, MetricTrend) | `*.stories.ts` | `Metrics/*` | ✅ real-world |
| Dashboard composite | `Dashboard.stories.svelte` | — | ✅ real-world (Acme analytics dashboard) |

### Utility

| Component | Story | Docs | Status |
|-----------|-------|------|--------|
| Icon | `Icon.stories.svelte` | `Icon/Icon` | ✅ real-world |
| Lazy | `Lazy.stories.svelte` | `Lazy/Lazy` | ✅ real-world (chart/analytics) |
| LazyPanel | `LazyPanel.stories.svelte` | `Lazy/LazyPanel` | ✅ real-world (FAQ) |
| Masonry | `Masonry.stories.svelte` | `Masonry/Masonry` | ✅ real-world (pinboard) |
| PropsTable / EventsTable | `PropsTable.stories.svelte` / `EventsTable.stories.svelte` | `PropsTable/PropsTable` / `EventsTable/EventsTable` | ✅ real-world |
| ThemeToggle | `ThemeToggle.stories.js` | `ThemeToggle/ThemeToggle` | ✅ real-world |
| Splitter | `Splitter.stories.svelte` | `Splitter/Splitter` | ✅ real-world (editor + preview) |
| StepperStep | (via Stepper) | `Stepper/StepperStep` | ✅ real-world |
| Tree nodes, Table subcomponents, CarouselItem, Tab* | (via parent stories) | matching docs | ✅ real-world |

## Remaining work (active items)

- [ ] _(none — all identified placeholder content has been replaced; this
      section stays as the place to track anything the next sweep finds)_

## Done items (for reference)

- ✅ Storybook placeholder sweep (Modal, Toast, Accordion, Tabs, Tooltip,
      Carousel, Masonry, Chip, Tag, Card content, Panel, Tree, Timeline,
      Splitter, Menu, Combobox, Lazy, LazyPanel, Hero, Section, Container,
      Stepper checkout flow, Dashboard composite).
- ✅ Docs-site sync pass (Masonry, Menu, Modal, Tooltip, Timeline, Tree,
      Panel, Combobox, Dropdown, Stepper, RadioGroup, Carousel, Lazy,
      LazyPanel, Card, ChipGroup, Accordion, Tabs, Toast, AppHeader, App,
      BottomBar, Splitter) + e2e sync.
- ✅ Dashboard composite story (`Examples/Dashboard`) with play assertions.
