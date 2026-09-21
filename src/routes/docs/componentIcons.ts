/**
 * Per-component docs iconography (plan item 11.2).
 *
 * One consistent iconset for the whole site: **Tabler** — it matches the
 * library's existing `defaultIconset: "tabler"` in `iconManager.ts` and
 * the `tabler:` prefixes already used inside components.
 *
 * Icons resolve from **bundled** `@iconify-json/tabler` data (a dev
 * dependency) — no runtime Iconify API fetches, so builds stay offline
 * and deterministic. `loadDocsIconCollection()` registers that data once
 * with `@iconify/svelte`; afterwards every `<Icon name="…">` in the docs
 * renders from the local collection.
 *
 * Icons are decorative (the adjacent text carries the component name),
 * so no message keys are needed — the map is language-neutral.
 */
import { addCollection } from "@iconify/svelte";
import tablerIcons from "@iconify-json/tabler/icons.json";

/**
 * Component name → Tabler icon name (without the iconset prefix — the
 * shared Icon component resolves it against the configured iconset).
 * Every name is verified to exist in the bundled `@iconify-json/tabler`
 * data by `tests/unit/componentIcons.test.ts`, so a rename upstream
 * fails CI instead of silently rendering an empty glyph.
 */
export const componentIcons: Record<string, string> = {
  // App shell
  App: "apps",
  AppHeader: "layout-navbar",
  BottomBar: "layout-bottombar",
  Footer: "border-bottom",
  Sidebar: "layout-sidebar",
  ThemeToggle: "moon",
  // Basic
  Accordion: "list-details",
  AccordionItem: "box",
  Card: "flag",
  Container: "layout-distribute-vertical",
  Hero: "layout-navbar",
  Panel: "layout-sidebar-right",
  Section: "border-top",
  Separator: "separator-horizontal",
  Splitter: "separator-vertical",
  Tooltip: "message",
  // Navigation
  Breadcrumb: "chevrons-right",
  BreadcrumbItem: "chevron-right",
  Menu: "list",
  MenuItem: "chevron-right",
  Tabs: "tabs",
  Tab: "square-rounded-number-1",
  TabList: "layout-list",
  TabPanel: "rectangle",
  TreeMenu: "binary-tree",
  Tree: "binary-tree",
  TreeNode: "box",
  // Data display
  Avatar: "user",
  KanbanBoard: "layout-kanban",
  AvatarGroup: "users",
  Badge: "award",
  Carousel: "slideshow",
  CarouselItem: "flag",
  Chip: "rosette-discount-check",
  ChipGroup: "tags",
  CodeBlock: "code",
  CodeBlockSpeed: "file-code",
  CodeEditor: "file-code",
  DataTable: "table",
  Map: "map",
  Progress: "circle-check",
  Skeleton: "ghost",
  Table: "table",
  TableBody: "table",
  TableCell: "table",
  TableHead: "table",
  TableHeader: "table",
  TableRow: "table",
  Tag: "tag",
  TagGroup: "tags",
  Timeline: "dots",
  TimelineItem: "point",
  // Metrics
  PieChart: "chart-pie",
  DonutChart: "chart-donut",
  LineChart: "chart-line",
  BarChart: "chart-bar",
  HorizontalBarChart: "chart-bar",
  AreaChart: "chart-area",
  StatsCard: "chart-dots",
  MetricGrid: "layout-grid",
  KPICard: "target-arrow",
  GaugeChart: "gauge",
  ProgressMetric: "progress-check",
  MetricTrend: "presentation",
  // Form
  AutoComplete: "input-search",
  Button: "square",
  ButtonGroup: "components",
  CalendarInput: "calendar",
  CalendarView: "calendar-month",
  Checkbox: "checkbox",
  ColorPicker: "color-picker",
  Combobox: "select",
  Dropdown: "chevron-down",
  FormBuilder: "forms",
  FileUpload: "cloud-upload",
  FloatLabel: "text-size",
  Form: "forms",
  FormField: "forms",
  Input: "text-caption",
  InputSwitch: "toggle-left",
  InvalidState: "alert-triangle",
  Knob: "adjustments-horizontal",
  ListInput: "playlist",
  Listbox: "list",
  NumberInput: "hash",
  Radio: "circle-check",
  RadioGroup: "checklist",
  Rating: "star",
  Select: "select",
  SelectGroup: "checklist",
  Slider: "adjustments-horizontal",
  Switch: "toggle-right",
  TextInput: "text-caption",
  Textarea: "typography",
  // Feedback
  Alert: "alert-triangle",
  Modal: "app-window",
  Stepper: "route",
  StepperStep: "point",
  Timer: "clock",
  Toast: "bell",
  // Utility
  EventsTable: "clipboard-list",
  Icon: "star",
  Lazy: "hourglass",
  LazyPanel: "hourglass",
  LocaleSwitcher: "language",
  Masonry: "stack-2",
  PropsTable: "clipboard-list",
  BrowserApiBadge: "rosette-discount-check",
};

/**
 * Registers the bundled Tabler collection with `@iconify/svelte` (once).
 * After this resolves, every Icon in the docs renders offline from the
 * local data — no API fetches at build time or runtime.
 */
let registered = false;

export function loadDocsIconCollection(): void {
  if (registered) return;
  addCollection(tablerIcons as Parameters<typeof addCollection>[0]);
  registered = true;
}

/**
 * The icon for a component, or `undefined` when it has no mapping
 * (callers fall back to text-only rendering).
 * @param component - Component name (e.g. "CalendarView")
 */
export function docsIconFor(component: string): string | undefined {
  return componentIcons[component];
}

/**
 * The icon for a component, throwing when unmapped — for call sites that
 * require an icon (docs h1 rows). The unit test pins full coverage of the
 * rolled-out pages, so this only fires when a page is added without a map
 * entry.
 * @param component - Component name (e.g. "CalendarView")
 */
export function docsIcon(component: string): string {
  const icon = componentIcons[component];
  if (icon === undefined) {
    throw new Error(`No docs icon mapped for component "${component}" — add it to componentIcons`);
  }
  return icon;
}
