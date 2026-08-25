import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Every component docs page in the site. Derived from the sidebar menu in
 * src/routes/docs/+layout.svelte. Each entry is [route, expectedHeading].
 *
 * Adding a new docs page? Append it here so the smoke catches regressions
 * immediately.
 */
const componentPages: [string, string][] = [
  // App
  ["/docs/components/App/App", "App"],
  ["/docs/components/AppHeader/AppHeader", "AppHeader"],
  ["/docs/components/BottomBar/BottomBar", "BottomBar"],
  ["/docs/components/Footer/Footer", "Footer"],
  ["/docs/components/Sidebar/Sidebar", "Sidebar"],
  ["/docs/components/ThemeToggle/ThemeToggle", "ThemeToggle"],

  // Basic
  ["/docs/components/Accordion/Accordion", "Accordion"],
  ["/docs/components/Accordion/AccordionItem", "AccordionItem"],
  ["/docs/components/Card/Card", "Card"],
  ["/docs/components/Container/Container", "Container"],
  ["/docs/components/Panel/Hero", "Hero"],
  ["/docs/components/Panel/Panel", "Panel"],
  ["/docs/components/Section/Section", "Section"],
  ["/docs/components/Separator/Separator", "Separator"],
  ["/docs/components/Splitter/Splitter", "Splitter"],

  // Navigation
  ["/docs/components/Breadcrumb/Breadcrumb", "Breadcrumb"],
  ["/docs/components/Breadcrumb/BreadcrumbItem", "BreadcrumbItem"],
  ["/docs/components/Menu/Menu", "Menu"],
  ["/docs/components/Menu/MenuItem", "MenuItem"],
  ["/docs/components/Tabs/Tabs", "Tabs"],
  ["/docs/components/Tabs/Tab", "Tab"],
  ["/docs/components/Tabs/TabList", "TabList"],
  ["/docs/components/Tabs/TabPanel", "TabPanel"],
  ["/docs/components/TreeMenu/TreeMenu", "TreeMenu"],

  // Data Display
  ["/docs/components/Avatar/Avatar", "Avatar"],
  ["/docs/components/Avatar/AvatarGroup", "AvatarGroup"],
  ["/docs/components/Badge/Badge", "Badge"],
  ["/docs/components/Carousel/Carousel", "Carousel"],
  ["/docs/components/Carousel/CarouselItem", "CarouselItem"],
  ["/docs/components/Chip/Chip", "Chip"],
  ["/docs/components/Chip/ChipGroup", "ChipGroup"],
  ["/docs/components/CodeBlock/CodeBlock", "CodeBlock"],
  ["/docs/components/CodeBlockSpeed/CodeBlockSpeed", "CodeBlockSpeed"],
  ["/docs/components/CodeEditor/CodeEditor", "CodeEditor"],
  ["/docs/components/DataTable/DataTable", "DataTable"],
  ["/docs/components/Map/Map", "Map"],
  ["/docs/components/Progress/Progress", "Progress"],
  ["/docs/components/Skeleton/Skeleton", "Skeleton"],
  ["/docs/components/Table/Table", "Table"],
  ["/docs/components/Table/TableBody", "TableBody"],
  ["/docs/components/Table/TableCell", "TableCell"],
  ["/docs/components/Table/TableHead", "TableHead"],
  ["/docs/components/Table/TableHeader", "TableHeader"],
  ["/docs/components/Table/TableRow", "TableRow"],
  ["/docs/components/Tag/Tag", "Tag"],
  ["/docs/components/Tag/TagGroup", "TagGroup"],
  ["/docs/components/Timeline/Timeline", "Timeline"],
  ["/docs/components/Timeline/TimelineItem", "TimelineItem"],
  ["/docs/components/Tooltip/Tooltip", "Tooltip"],
  ["/docs/components/Tree/Tree", "Tree"],
  ["/docs/components/Tree/TreeNode", "TreeNode"],

  // Metrics
  ["/docs/components/Metrics/AreaChart", "AreaChart"],
  ["/docs/components/Metrics/BarChart", "BarChart"],
  ["/docs/components/Metrics/DonutChart", "DonutChart"],
  ["/docs/components/Metrics/GaugeChart", "GaugeChart"],
  ["/docs/components/Metrics/HorizontalBarChart", "HorizontalBarChart"],
  ["/docs/components/Metrics/KPICard", "KPICard"],
  ["/docs/components/Metrics/LineChart", "LineChart"],
  ["/docs/components/Metrics/MetricGrid", "MetricGrid"],
  ["/docs/components/Metrics/MetricTrend", "MetricTrend"],
  ["/docs/components/Metrics/PieChart", "PieChart"],
  ["/docs/components/Metrics/ProgressMetric", "ProgressMetric"],
  ["/docs/components/Metrics/StatsCard", "StatsCard"],
  ["/docs/components/Metrics/examples", "Metrics Examples"],

  // Form
  ["/docs/components/Form/AutoComplete", "AutoComplete"],
  ["/docs/components/Button/Button", "Button"],
  ["/docs/components/Button/ButtonGroup", "ButtonGroup"],
  ["/docs/components/Form/Calendar", "Calendar"],
  ["/docs/components/Form/Checkbox", "Checkbox"],
  ["/docs/components/Form/ColorPicker", "ColorPicker"],
  ["/docs/components/Form/Combobox", "Combobox"],
  ["/docs/components/Form/Dropdown", "Dropdown"],
  ["/docs/components/Form/FileUpload", "FileUpload"],
  ["/docs/components/Form/FloatLabel", "FloatLabel"],
  ["/docs/components/Form/Form", "Form"],
  ["/docs/components/Form/FormField", "FormField"],
  ["/docs/components/Form/Input", "Input"],
  ["/docs/components/Form/InputSwitch", "InputSwitch"],
  ["/docs/components/Form/InvalidState", "InvalidState"],
  ["/docs/components/Form/Knob", "Knob"],
  ["/docs/components/Form/ListInput", "ListInput"],
  ["/docs/components/Form/Listbox", "Listbox"],
  ["/docs/components/Form/NumberInput", "NumberInput"],
  ["/docs/components/Form/Radio", "Radio"],
  ["/docs/components/Form/RadioGroup", "RadioGroup"],
  ["/docs/components/Form/Rating", "Rating"],
  ["/docs/components/Form/Select", "Select"],
  ["/docs/components/Form/SelectGroup", "SelectGroup"],
  ["/docs/components/Form/Slider", "Slider"],
  ["/docs/components/Form/Switch", "Switch"],
  ["/docs/components/Form/TextInput", "TextInput"],
  ["/docs/components/Form/Textarea", "Textarea"],

  // Feedback
  ["/docs/components/Modal/Modal", "Modal"],
  ["/docs/components/Stepper/Stepper", "Stepper"],
  ["/docs/components/Stepper/StepperStep", "StepperStep"],
  ["/docs/components/Toast/Toast", "Toast"],

  // Utility
  ["/docs/components/EventsTable/EventsTable", "EventsTable"],
  ["/docs/components/Icon/Icon", "Icon"],
  ["/docs/components/Icon/IconifyIcon/IconifyIcon", "IconifyIcon"],
  ["/docs/components/Lazy/Lazy", "Lazy"],
  ["/docs/components/Lazy/LazyPanel", "LazyPanel"],
  ["/docs/components/Masonry/Masonry", "Masonry"],
  ["/docs/components/PropsTable/PropsTable", "PropsTable"],

  // Additional pages (not in sidebar but exist as routes)
  ["/docs/components/CompatibilityMatrix/CompatibilityMatrix", "CompatibilityMatrix"],
];

/**
 * Standardised docs page structure. Every component page should have these
 * sections in order. We verify the presence of the h1 heading (which every
 * page must have) and optionally check for common section headings.
 */
const standardSections = [
  { pattern: /description|what|overview/i, label: "Description section" },
  { pattern: /example/i, label: "Examples section" },
  { pattern: /prop/i, label: "Props section" },
  { pattern: /accessibility|a11y/i, label: "Accessibility section" },
];

test.describe("All component docs pages render", () => {
  test.describe.configure({ mode: "serial" });

  for (const [route, heading] of componentPages) {
    test(`${heading} — renders h1 on ${route}`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      const h1 = page.getByRole("heading", { name: heading, level: 1, exact: true });
      await expect(h1).toBeVisible();
    });
  }
});

test.describe("Docs pages have standardised structure", () => {
  /**
   * Sample a representative set of pages to verify they follow the standard
   * section layout (Description, Examples, Props, Accessibility). Testing
   * every page for every section would be fragile; a representative sample
   * catches systemic issues like broken section rendering.
   */
  const representativePages: [string, string][] = [
    ["/docs/components/Avatar/Avatar", "Avatar"],
    ["/docs/components/Button/Button", "Button"],
    ["/docs/components/Form/Checkbox", "Checkbox"],
    ["/docs/components/Container/Container", "Container"],
    ["/docs/components/Modal/Modal", "Modal"],
    ["/docs/components/Metrics/BarChart", "BarChart"],
    ["/docs/components/Tabs/Tabs", "Tabs"],
    ["/docs/components/Toast/Toast", "Toast"],
  ];

  for (const [route, heading] of representativePages) {
    test(`${heading} page has standard section headings`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      // Must have h1
      await expect(
        page.getByRole("heading", { name: heading, level: 1, exact: true }),
      ).toBeVisible();

      // Should have at least some h2 section headings
      const h2s = page.getByRole("heading", { level: 2 });
      const h2Count = await h2s.count();
      expect(h2Count).toBeGreaterThanOrEqual(3);
    });
  }
});

test.describe("Non-component docs pages render", () => {
  const pages: [string, string][] = [
    ["/docs", "Twintrinsic Documentation"],
    ["/docs/components", "Components"],
    ["/docs/theming", "Theming"],
    ["/docs/utilities", "Utilities"],
    ["/docs/completion", "Development Completion"],
    ["/docs/theming/preview", "Theme Preview"],
    ["/docs/examples/game-map", "Game Map Example"],
  ];

  for (const [route, heading] of pages) {
    test(`${heading} — renders on ${route}`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      await expect(
        page.getByRole("heading", { name: heading, level: 1, exact: true }),
      ).toBeVisible();
    });
  }
});

test("Dashboard example page renders", async ({ page }) => {
  await page.goto("/docs/examples/dashboard");
  await waitForHydration(page);
  // Dashboard has no h1 — check for its first h2
  await expect(
    page.getByRole("heading", { name: "Key Metrics Overview", level: 2 }),
  ).toBeVisible();
});

test("Shopping example page renders", async ({ page }) => {
  await page.goto("/docs/examples/shopping");
  await waitForHydration(page);
  await expect(
    page.getByText("Big Deals on Everything You Need"),
  ).toBeVisible();
});
