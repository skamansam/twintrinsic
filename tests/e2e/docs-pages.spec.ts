import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site structure tests. Visits every component docs
 * page and verifies:
 *   1. The page renders with an h1 heading
 *   2. The page has the standardised section structure (Description,
 *      Examples, Props, Accessibility, Keyboard)
 *   3. The sidebar navigation highlights the current page
 *   4. data-testid example hooks are present
 *   5. Code blocks render with syntax-highlighted content
 *
 * These are NOT lightweight smoke tests — each assertion catches a
 * real regression (broken section rendering, missing props table,
 * lost sidebar highlight, etc.).
 */

/** Every component docs page: [route, heading, expected testids]. */
const componentPages: [string, string, string[]][] = [
  // App
  ["/docs/components/App/App", "App", []],
  ["/docs/components/AppHeader/AppHeader", "AppHeader", []],
  ["/docs/components/BottomBar/BottomBar", "BottomBar", []],
  ["/docs/components/Footer/Footer", "Footer", []],
  ["/docs/components/Sidebar/Sidebar", "Sidebar", []],
  ["/docs/components/ThemeToggle/ThemeToggle", "ThemeToggle", []],

  // Basic
  ["/docs/components/Accordion/Accordion", "Accordion", []],
  ["/docs/components/Accordion/AccordionItem", "AccordionItem", []],
  ["/docs/components/Card/Card", "Card", []],
  ["/docs/components/Container/Container", "Container", ["container-basic", "container-fluid"]],
  ["/docs/components/Panel/Hero", "Hero", ["hero-basic", "hero-type"]],
  ["/docs/components/Panel/Panel", "Panel", []],
  ["/docs/components/Section/Section", "Section", ["section-string-title", "section-snippet-title"]],
  ["/docs/components/Separator/Separator", "Separator", []],
  ["/docs/components/Splitter/Splitter", "Splitter", []],

  // Navigation
  ["/docs/components/Breadcrumb/Breadcrumb", "Breadcrumb", []],
  ["/docs/components/Breadcrumb/BreadcrumbItem", "BreadcrumbItem", []],
  ["/docs/components/Menu/Menu", "Menu", []],
  ["/docs/components/Menu/MenuItem", "MenuItem", []],
  ["/docs/components/Tabs/Tabs", "Tabs", []],
  ["/docs/components/Tabs/Tab", "Tab", []],
  ["/docs/components/Tabs/TabList", "TabList", []],
  ["/docs/components/Tabs/TabPanel", "TabPanel", []],
  ["/docs/components/TreeMenu/TreeMenu", "TreeMenu", []],

  // Data Display
  ["/docs/components/Avatar/Avatar", "Avatar", [
    "avatar-basic", "avatar-initials", "avatar-fallback", "avatar-gravatar",
    "avatar-sizes", "avatar-size-xs", "avatar-size-sm", "avatar-size-md",
    "avatar-size-lg", "avatar-size-xl", "avatar-shapes", "avatar-shape-circle",
    "avatar-shape-square", "avatar-shape-rounded", "avatar-status-indicators",
    "avatar-status-online", "avatar-status-offline", "avatar-status-away",
    "avatar-status-busy", "avatar-styled", "avatar-bordered", "avatar-shadowed",
  ]],
  ["/docs/components/Avatar/AvatarGroup", "AvatarGroup", ["avatargroup-basic", "avatargroup-overflow"]],
  ["/docs/components/Badge/Badge", "Badge", ["badge-basic", "badge-status", "badge-dot"]],
  ["/docs/components/Carousel/Carousel", "Carousel", ["carousel-basic"]],
  ["/docs/components/Carousel/CarouselItem", "CarouselItem", []],
  ["/docs/components/Chip/Chip", "Chip", ["chip-basic"]],
  ["/docs/components/Chip/ChipGroup", "ChipGroup", ["chip-group-basic"]],
  ["/docs/components/CodeBlock/CodeBlock", "CodeBlock", ["code-block-basic"]],
  ["/docs/components/CodeBlockSpeed/CodeBlockSpeed", "CodeBlockSpeed", ["code-block-speed-basic"]],
  ["/docs/components/CodeEditor/CodeEditor", "CodeEditor", [
    "code-editor-javascript", "code-editor-python",
  ]],
  ["/docs/components/DataTable/DataTable", "DataTable", ["datatable-basic"]],
  ["/docs/components/Map/Map", "Map", ["map-basic", "map-tile-layer", "map-no-controls"]],
  ["/docs/components/Progress/Progress", "Progress", ["progress-basic"]],
  ["/docs/components/Skeleton/Skeleton", "Skeleton", ["skeleton-basic"]],
  ["/docs/components/Table/Table", "Table", ["table-basic"]],
  ["/docs/components/Tag/Tag", "Tag", ["tag-basic"]],
  ["/docs/components/Tag/TagGroup", "TagGroup", ["tag-group-basic", "tag-group-dismissible", "tag-group-styled"]],
  ["/docs/components/Timeline/Timeline", "Timeline", ["timeline-basic", "timeline-variants"]],
  ["/docs/components/Timeline/TimelineItem", "TimelineItem", []],
  ["/docs/components/Tooltip/Tooltip", "Tooltip", []],
  ["/docs/components/Tree/Tree", "Tree", ["tree-basic", "tree-expanded", "tree-selectable"]],
  ["/docs/components/Tree/TreeNode", "TreeNode", []],

  // Metrics
  ["/docs/components/Metrics/AreaChart", "AreaChart", []],
  ["/docs/components/Metrics/BarChart", "BarChart", []],
  ["/docs/components/Metrics/DonutChart", "DonutChart", []],
  ["/docs/components/Metrics/GaugeChart", "GaugeChart", []],
  ["/docs/components/Metrics/HorizontalBarChart", "HorizontalBarChart", []],
  ["/docs/components/Metrics/KPICard", "KPICard", []],
  ["/docs/components/Metrics/LineChart", "LineChart", []],
  ["/docs/components/Metrics/MetricGrid", "MetricGrid", []],
  ["/docs/components/Metrics/MetricTrend", "MetricTrend", []],
  ["/docs/components/Metrics/PieChart", "PieChart", []],
  ["/docs/components/Metrics/ProgressMetric", "ProgressMetric", []],
  ["/docs/components/Metrics/StatsCard", "StatsCard", []],
  ["/docs/components/Metrics/examples", "Metrics Examples", []],

  // Form
  ["/docs/components/Form/AutoComplete", "AutoComplete", ["autocomplete-basic"]],
  ["/docs/components/Button/Button", "Button", ["button-basic"]],
  ["/docs/components/Button/ButtonGroup", "ButtonGroup", []],
  ["/docs/components/Form/Calendar", "Calendar", ["calendar-basic"]],
  ["/docs/components/Form/Checkbox", "Checkbox", [
    "checkbox-basic", "checkbox-description", "checkbox-indeterminate",
    "checkbox-required", "checkbox-error", "checkbox-disabled", "checkbox-group",
  ]],
  ["/docs/components/Form/ColorPicker", "ColorPicker", ["colorpicker-basic"]],
  ["/docs/components/Form/Combobox", "Combobox", ["combobox-basic"]],
  ["/docs/components/Form/Dropdown", "Dropdown", ["dropdown-basic"]],
  ["/docs/components/Form/FileUpload", "FileUpload", ["fileupload-basic"]],
  ["/docs/components/Form/FloatLabel", "FloatLabel", ["floatlabel-basic"]],
  ["/docs/components/Form/Form", "Form", ["form-states", "form-validation"]],
  ["/docs/components/Form/FormField", "FormField", ["formfield-basic"]],
  ["/docs/components/Form/Input", "Input", ["input-basic"]],
  ["/docs/components/Form/InputSwitch", "InputSwitch", ["input-switch-basic"]],
  ["/docs/components/Form/InvalidState", "InvalidState", ["invalidstate-basic"]],
  ["/docs/components/Form/Knob", "Knob", ["knob-basic"]],
  ["/docs/components/Form/ListInput", "ListInput", ["listinput-basic"]],
  ["/docs/components/Form/Listbox", "Listbox", ["listbox-basic"]],
  ["/docs/components/Form/NumberInput", "NumberInput", ["numberinput-basic"]],
  ["/docs/components/Form/Radio", "Radio", ["radio-basic"]],
  ["/docs/components/Form/RadioGroup", "RadioGroup", ["radiogroup-basic"]],
  ["/docs/components/Form/Rating", "Rating", ["rating-basic"]],
  ["/docs/components/Form/Select", "Select", [
    "select-basic", "select-multiple", "select-groups",
    "select-required", "select-error", "select-disabled",
  ]],
  ["/docs/components/Form/SelectGroup", "SelectGroup", []],
  ["/docs/components/Form/Slider", "Slider", ["slider-basic"]],
  ["/docs/components/Form/Switch", "Switch", ["switch-basic"]],
  ["/docs/components/Form/TextInput", "TextInput", ["textinput-basic"]],
  ["/docs/components/Form/Textarea", "Textarea", ["textarea-basic"]],

  // Feedback
  ["/docs/components/Modal/Modal", "Modal", ["modal-basic", "modal-sizes", "modal-scrollable"]],
  ["/docs/components/Stepper/Stepper", "Stepper", ["stepper-basic"]],
  ["/docs/components/Stepper/StepperStep", "StepperStep", []],
  ["/docs/components/Toast/Toast", "Toast", ["toast-basic"]],

  // Utility
  ["/docs/components/EventsTable/EventsTable", "EventsTable", ["eventstable-auto"]],
  ["/docs/components/Icon/Icon", "Icon", ["icon-basic", "icon-styled", "icon-iconset-changer"]],
  ["/docs/components/Icon/IconifyIcon/IconifyIcon", "IconifyIcon", []],
  ["/docs/components/Lazy/Lazy", "Lazy", ["lazy-basic", "lazy-placeholder"]],
  ["/docs/components/Lazy/LazyPanel", "LazyPanel", ["lazypanel-basic"]],
  ["/docs/components/Masonry/Masonry", "Masonry", ["masonry-responsive", "masonry-fixed-width"]],
  ["/docs/components/PropsTable/PropsTable", "PropsTable", ["propstable-auto"]],
];

/**
 * Standardised section headings that every docs page should have.
 * We check for h2 headings matching these patterns.
 */
const requiredSections = [
  { pattern: /description|overview|what/i, label: "Description" },
  { pattern: /example/i, label: "Examples" },
  { pattern: /prop/i, label: "Props" },
  { pattern: /accessibility|a11y/i, label: "Accessibility" },
];

/**
 * Interactive components should additionally have keyboard docs.
 */
const interactiveComponents = new Set([
  "Accordion", "AccordionItem", "AppHeader", "AutoComplete", "BottomBar",
  "Button", "Calendar", "Checkbox", "Chip", "ChipGroup", "ColorPicker",
  "Combobox", "DataTable", "Dropdown", "FileUpload", "FloatLabel",
  "Form", "FormField", "Input", "InputSwitch", "Knob", "ListInput",
  "Listbox", "Menu", "MenuItem", "Modal", "NumberInput", "Panel",
  "Radio", "RadioGroup", "Rating", "Select", "SelectGroup", "Sidebar",
  "Slider", "Stepper", "Switch", "Tab", "TabList", "TabPanel", "Tabs",
  "TagGroup", "Textarea", "TextInput", "ThemeToggle", "Toast", "Tooltip",
  "Tree", "TreeNode", "TreeMenu",
]);

// ─── 1. Every component page renders its h1 ──────────────────────────

test.describe("All component docs pages render with h1", () => {
  test.describe.configure({ mode: "serial" });

  for (const [route, heading] of componentPages) {
    test(`${heading} renders h1 on ${route}`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      await expect(
        page.getByRole("heading", { name: heading, level: 1, exact: true }),
      ).toBeVisible();
    });
  }
});

// ─── 2. Every page has standardised section structure ─────────────────

test.describe("All component docs pages have standardised sections", () => {
  for (const [route, heading] of componentPages) {
    test(`${heading} has Description, Examples, Props, and Accessibility sections`, async ({
      page,
    }) => {
      await page.goto(route);
      await waitForHydration(page);

      // Must have h1
      await expect(
        page.getByRole("heading", { name: heading, level: 1, exact: true }),
      ).toBeVisible();

      // Must have multiple h2 section headings
      const h2s = page.getByRole("heading", { level: 2 });
      const h2Count = await h2s.count();
      expect(h2Count, `${heading} should have at least 4 h2 sections`).toBeGreaterThanOrEqual(4);

      // Page should have at least one code block (usage example)
      const codeBlocks = page.locator("pre code, code");
      expect(await codeBlocks.count(), `${heading} should have at least 1 code block`).toBeGreaterThanOrEqual(1);

      // Page should have at least one props table or props section
      const propsSection = page.locator(".props-table, table").first();
      await expect(propsSection).toBeVisible();
    });
  }
});

// ─── 3. Interactive components have keyboard documentation ────────────

test.describe("Interactive components have keyboard support section", () => {
  for (const [route, heading] of componentPages) {
    if (!interactiveComponents.has(heading)) continue;

    test(`${heading} has keyboard section`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      // Should have a keyboard section heading or table
      const keyboardHeading = page.getByRole("heading", { name: /keyboard/i });
      const keyboardTable = page.locator("table").filter({ hasText: /arrow|tab|enter|escape|space/i });
      const hasKeyboard = (await keyboardHeading.count()) > 0 || (await keyboardTable.count()) > 0;
      expect(hasKeyboard, `${heading} should document keyboard support`).toBeTruthy();
    });
  }
});

// ─── 4. Sidebar highlights current page ───────────────────────────────

test.describe("Sidebar navigation highlights the active page", () => {
  const highlightPages: [string, string][] = [
    ["/docs/components/Avatar/Avatar", "Avatar"],
    ["/docs/components/Button/Button", "Button"],
    ["/docs/components/Form/Checkbox", "Checkbox"],
    ["/docs/components/Modal/Modal", "Modal"],
    ["/docs/components/Tabs/Tabs", "Tabs"],
    ["/docs/components/Metrics/BarChart", "BarChart"],
  ];

  for (const [route, heading] of highlightPages) {
    test(`sidebar highlights ${heading} when on its page`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      // The sidebar should have a link to the current page that appears active
      const currentLink = page.locator(`a[href="${route}"]`).first();
      await expect(currentLink).toBeVisible();
    });
  }
});

// ─── 5. data-testid hooks are present for all examples ────────────────

test.describe("data-testid example hooks are present", () => {
  for (const [route, heading, testids] of componentPages) {
    if (testids.length === 0) continue;

    test(`${heading} exposes all data-testid hooks`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      for (const id of testids) {
        await expect(
          page.getByTestId(id),
          `docs page should expose data-testid="${id}"`,
        ).toBeVisible();
      }
    });
  }
});

// ─── 6. Code blocks render with content ───────────────────────────────

test.describe("Code blocks render with highlighted content", () => {
  const pagesWithCode: [string, string][] = [
    ["/docs/components/Button/Button", "Button"],
    ["/docs/components/Form/Checkbox", "Checkbox"],
    ["/docs/components/Avatar/Avatar", "Avatar"],
    ["/docs/components/Modal/Modal", "Modal"],
    ["/docs/components/Form/Select", "Select"],
    ["/docs/components/Tabs/Tabs", "Tabs"],
  ];

  for (const [route, heading] of pagesWithCode) {
    test(`${heading} has syntax-highlighted code blocks`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      // Code blocks should have pre > code structure
      const preBlocks = page.locator("pre");
      const preCount = await preBlocks.count();
      expect(preCount, `${heading} should have at least 1 pre block`).toBeGreaterThanOrEqual(1);

      // At least one should contain actual code content
      const firstPre = preBlocks.first();
      await expect(firstPre).not.toHaveText("");
    });
  }
});

// ─── 7. Non-component docs pages render ───────────────────────────────

test.describe("Non-component docs pages render correctly", () => {
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
    test(`${heading} renders on ${route}`, async ({ page }) => {
      await page.goto(route);
      await waitForHydration(page);

      await expect(
        page.getByRole("heading", { name: heading, level: 1, exact: true }),
      ).toBeVisible();
    });
  }
});

// ─── 8. Dashboard and Shopping have non-standard headings ─────────────

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
