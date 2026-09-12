import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the locale switcher. The switcher drives the
 * Paraglide locale, which in turn sets `document.documentElement.dir`
 * (via `getTextDirection`), translates the docs chrome (nav group titles,
 * header links, app name), and persists via the PARAGLIDE_LOCALE cookie.
 */
test.describe("Docs locale switcher", () => {
  test("renders in English (LTR) by default", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const switcher = page.getByTestId("docs-locale-switcher");
    await expect(switcher.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(switcher.getByRole("button", { name: "فارسی" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("switches to Persian: RTL direction and translated chrome", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(
      page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }),
    ).toHaveAttribute("aria-pressed", "true");
    // Header links translate
    await expect(page.getByRole("link", { name: "شروع" })).toBeVisible();
    await expect(page.getByRole("link", { name: "کامپوننت‌ها" })).toBeVisible();
    // Nav group titles translate (Form -> فرم, Feedback -> بازخورد)
    await expect(page.getByText("فرم", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("بازخورد", { exact: true }).first()).toBeVisible();
  });

  test("persists the locale across reloads", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    await page.reload();
    await waitForHydration(page);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(
      page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("translates the components index heading", async ({ page }) => {
    await page.goto("/docs/components");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Components");
    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("کامپوننت‌ها");
  });

  test("translates the docs home page prose", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Twintrinsic Documentation");
    await expect(page.locator("h2", { hasText: "Installation" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("مستندات Twintrinsic");
    await expect(page.locator("h2", { hasText: "نصب" })).toBeVisible();
    await expect(page.getByText(/خوش آمدید/)).toBeVisible();
  });

  test("translates the utilities page prose", async ({ page }) => {
    await page.goto("/docs/utilities");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Utilities");
    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("ابزارها");
    await expect(page.getByText(/توابع کمکی مشترک/)).toBeVisible();
    await expect(page.getByText(/استخراج برچسب/).first()).toBeVisible();
  });

  test("translates the theming page prose", async ({ page }) => {
    await page.goto("/docs/theming");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Theming");
    await expect(page.locator("h2", { hasText: "Base Colors" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("تم‌سازی");
    await expect(page.locator("h2", { hasText: "رنگ‌های پایه" })).toBeVisible();
    await expect(page.getByText(/متغیرهای CSS/).first()).toBeVisible();
    await expect(page.getByText(/سفارشی‌سازی/).first()).toBeVisible();
  });

  test("translates the completion page prose", async ({ page }) => {
    await page.goto("/docs/completion");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Development Completion");
    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("تکمیل توسعه");
    await expect(page.getByText(/پیشرفت:/)).toBeVisible();
    await expect(page.getByText(/گام‌های بعدی/).first()).toBeVisible();
    await expect(page.getByText(/چک‌لیست تکمیل کامپوننت‌ها/).first()).toBeVisible();
  });

  test("translates the Button docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Button/Button");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Button");
    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("دکمه");
    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
  });

  test("translates the DataTable docs page prose", async ({ page }) => {
    await page.goto("/docs/components/DataTable/DataTable");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("DataTable");
    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("جدول داده‌ها");
    await expect(page.locator("h2", { hasText: "اسلات‌ها" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "پشتیبانی صفحه‌کلید" })).toBeVisible();
  });

  test("translates the Footer docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Footer/Footer");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Footer");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("فوتر");
    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.getByText(/حق تکثیر/).first()).toBeVisible();
  });

  test("translates the ThemeToggle docs page prose", async ({ page }) => {
    await page.goto("/docs/components/ThemeToggle/ThemeToggle");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("ThemeToggle");
    await expect(page.locator("h2", { hasText: "Keyboard Support" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Setup" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("کلید پوسته");
    await expect(page.locator("h2", { hasText: "راه‌اندازی" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "پشتیبانی صفحه‌کلید" })).toBeVisible();
  });

  test("translates the AppHeader docs page prose", async ({ page }) => {
    await page.goto("/docs/components/AppHeader/AppHeader");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("AppHeader");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Customization" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("هدر برنامه");
    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "پشتیبانی صفحه‌کلید" })).toBeVisible();
    await expect(page.getByText(/لوگو\/نام برند/)).toBeVisible();
  });

  test("translates the Sidebar docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Sidebar/Sidebar");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Sidebar");
    await expect(page.locator("h2", { hasText: "Customization" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Slots" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("نوار کناری");
    await expect(page.locator("h2", { hasText: "اسلات‌ها" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.getByText(/پنل ناوبری عمودی جمع‌شدنی/)).toBeVisible();
  });

  test("translates the App docs page prose", async ({ page }) => {
    await page.goto("/docs/components/App/App");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("App");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Slots" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "اسلات‌ها" })).toBeVisible();
    await expect(page.getByText(/اسکلت صفحه/).first()).toBeVisible();
  });

  test("translates the BottomBar docs page prose", async ({ page }) => {
    await page.goto("/docs/components/BottomBar/BottomBar");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("BottomBar");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("نوار پایین");
    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "پشتیبانی صفحه‌کلید" })).toBeVisible();
    await expect(page.getByText(/کارآمدی فضا/)).toBeVisible();
  });

  test("translates the Accordion docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Accordion/Accordion");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Accordion");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("آکاردئون");
    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "پشتیبانی صفحه‌کلید" })).toBeVisible();
    await expect(page.getByText(/پرسش‌های متداول/).first()).toBeVisible();
  });

  test("translates the AccordionItem docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Accordion/AccordionItem");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("AccordionItem");
    await expect(page.locator("h2", { hasText: "Customization" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "سفارشی‌سازی" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.getByText(/زیرکامپوننت/).first()).toBeVisible();
  });

  test("translates the Container docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Container/Container");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Container");
    await expect(page.locator("h2", { hasText: "Twintrinsic Implementation" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.getByText(/چندشکلی/).first()).toBeVisible();
  });

  test("translates the Section docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Section/Section");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Section");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(page.getByText(/زیرعنوان/).first()).toBeVisible();
  });

  test("translates the Separator docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Separator/Separator");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Separator");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.getByText(/جداکننده/).first()).toBeVisible();
  });

  test("translates the Hero docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Panel/Hero");
    await waitForHydration(page);

    await expect(page.locator("h1").first()).toHaveText("Hero");
    await expect(page.locator("h2", { hasText: "Related Components" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "کامپوننت‌های مرتبط" })).toBeVisible();
    await expect(page.getByText(/صفحات فرود/).first()).toBeVisible();
  });

  test("translates the Card docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Card/Card");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Card");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "اسلات‌ها" })).toBeVisible();
  });

  test("translates the Panel docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Panel/Panel");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Panel");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.getByText(/کانتینر تاشو/).first()).toBeVisible();
  });

  test("translates the Splitter docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Splitter/Splitter");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Splitter");
    await expect(page.locator("h2", { hasText: "Keyboard Support" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "پشتیبانی صفحه‌کلید" })).toBeVisible();
    await expect(page.getByText(/کاهش اندازهٔ پنل اول/).first()).toBeVisible();
  });

  test("translates the Tooltip docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tooltip/Tooltip");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Tooltip");
    await expect(page.locator("h2", { hasText: "How It Works" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "نحوهٔ کار" })).toBeVisible();
    await expect(page.getByText(/تولتیپ در لایهٔ بالایی/).first()).toBeVisible();
  });

  test("translates the Breadcrumb docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/Breadcrumb");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Breadcrumb");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.getByText(/ساختار معنایی با/).first()).toBeVisible();
  });

  test("translates the BreadcrumbItem docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/BreadcrumbItem");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("BreadcrumbItem");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(page.getByText(/یک زیرکامپوننت از/).first()).toBeVisible();
  });

  test("translates the Menu docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Menu/Menu");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Menu");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.getByText(/الگوی منوی WAI-ARIA/).first()).toBeVisible();
  });

  test("translates the MenuItem docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Menu/MenuItem");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("MenuItem");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.getByText(/یک مورد تکی درون/).first()).toBeVisible();
  });

  test("translates the Tabs docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tabs/Tabs");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Tabs");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.getByText(/الگوی tablist در ARIA/).first()).toBeVisible();
  });

  test("translates the TabList docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tabs/TabList");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TabList");
    await expect(page.locator("h2", { hasText: "What, When & Why" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "چیست، چه زمانی و چرا" })).toBeVisible();
    await expect(page.getByText(/یک زیرکامپوننت از/).first()).toBeVisible();
  });

  test("translates the Tab docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tabs/Tab");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Tab");

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.getByText(/یک زبانهٔ تکی درون/).first()).toBeVisible();
  });

  test("translates the TabPanel docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tabs/TabPanel");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TabPanel");

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.getByText(/پنل محتوای یک زبانه درون/).first()).toBeVisible();
  });

  test("translates the TreeMenu docs page prose", async ({ page }) => {
    await page.goto("/docs/components/TreeMenu/TreeMenu");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TreeMenu");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.getByText(/یک منوی سلسله‌مراتبی/).first()).toBeVisible();
  });

  test("translates the Avatar docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Avatar/Avatar");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Avatar");
    await expect(page.locator("h2", { hasText: "Fallback Behavior" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "رفتار جایگزین" })).toBeVisible();
    await expect(page.getByText(/تصویر نمایهٔ کاربر/).first()).toBeVisible();
  });

  test("translates the AvatarGroup docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Avatar/AvatarGroup");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("AvatarGroup");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(page.getByText(/چند آواتار را در یک پشتهٔ/).first()).toBeVisible();
  });

  test("translates the Badge docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Badge/Badge");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Badge");
    await expect(page.locator("h2", { hasText: "Common Mistakes" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(page.getByText(/یک عنصر درون‌خطی کوچک/).first()).toBeVisible();
  });
  test("translates the Chip docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Chip/Chip");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Chip");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(
      page
        .getByText(
          /عنصری کوچک و گرد که می‌تواند متن، شمایل یا تصویر کاربر را نمایش دهد\. Chipها می‌توانند قابل کلیک \(تغییر انتخاب\)، قابل حذف \(با دکمه ×\) یا ایستا باشند\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the ChipGroup docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Chip/ChipGroup");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("ChipGroup");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page
        .getByText(
          /محفظه‌ای برای مدیریت چندین کامپوننت Chip با فاصله، چیدمان و وضعیت انتخاب یکسان\. از معناشناسی listbox برای گروه‌های قابل انتخاب دسترس‌پذیر پشتیبانی می‌کند\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the Tag docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tag/Tag");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Tag");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "اشتباهات رایج" })).toBeVisible();
    await expect(
      page
        .getByText(
          /عنصری برچسب برای نمایش دسته‌ها، وضعیت‌ها یا کلیدواژه‌ها\. Tagها از شمایل، حذف، کنش کلیک و پیمایش پیوند با پشتیبانی کامل صفحه‌کلید پشتیبانی می‌کنند\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the TagGroup docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tag/TagGroup");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TagGroup");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page
        .getByText(
          /محفظه‌ای برای مدیریت چندین Tag با فاصله، چیدمان و مدیریت حذف یکسان\. از رندر پویای عناصر و معناشناسی گروه ARIA پشتیبانی می‌کند\./,
        )
        .first(),
    ).toBeVisible();
  });
  test("translates the Timeline docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Timeline/Timeline");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Timeline");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page
        .getByText(
          /کامپوننتی مبتنی بر فهرست که عناصر را به ترتیب زمانی با اتصال‌دهنده‌های بصری \(خط و نقطه\) رندر می‌کند\. هر عنصر می‌تواند عنوان، تاریخ، گونه وضعیت و ناحیه محتوا داشته باشد\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the Carousel docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Carousel/Carousel");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Carousel");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page
        .getByText(
          /یک اسلایدر محتوا با انتقال اسلاید\/محو، فلش قبلی\/بعدی، نشانگرهای نقطه‌ای و پشتیبانی پخش خودکار\. از CSS Scroll Snap برای کشیدن روان و از ARIA tablist برای دسترس‌پذیری استفاده می‌کند\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the CarouselItem docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Carousel/CarouselItem");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("CarouselItem");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page
        .getByText(
          /یک اسلاید واحد درون Carousel\. هر CarouselItem یک پنل محتواست که می‌تواند تصویر، متن، کارت یا هر نشانه‌گذاری داشته باشد\. Carousel والد انتقال‌ها، ناوبری و وضعیت فعال را مدیریت می‌کند\./,
        )
        .first(),
    ).toBeVisible();
  });
  test("translates the Progress docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Progress/Progress");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Progress");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page.getByText(/نشانگر پیشرفتی ساخته‌شده بر پایه عنصر بومی /).first(),
    ).toBeVisible();
  });

  test("translates the Skeleton docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Skeleton/Skeleton");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Skeleton");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page
        .getByText(
          /کامپوننتی جای‌نگهدار که شکل محتوایی را که در هنگام بارگذاری جایگزین می‌کند تقلید می‌کند\. از انیمیشن درخشش برای نشان دادن ورود محتوا استفاده می‌کند و پیش از رسیدن داده واقعی، نشانه‌ای بصری از ساختار چیدمان به کاربر می‌دهد\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the Map docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Map/Map");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Map");
    await expect(page.locator("h2", { hasText: "Responsiveness" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "واکنش‌گرایی" })).toBeVisible();
    await expect(
      page
        .getByText(
          /یک نقشه تعاملی مبتنی بر Leaflet با رندر کاشی‌محور، کنترل‌های بزرگ‌نمایی\/جابه‌جایی، نشانگرهای سفارشی و مدیریت رویداد\. از هر دو دستگاه مختصات جغرافیایی \(lat\/lng\) و پیکسلی \(CRS ساده\) برای نقشه‌های تصویری سفارشی پشتیبانی می‌کند\./,
        )
        .first(),
    ).toBeVisible();
  });
  test("translates the Tree docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tree/Tree");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Tree");

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "چیست، چه زمانی و چرا" })).toBeVisible();
    await expect(
      page
        .getByText(
          /فهرستی تودرتوی از عناصر TreeNode با کنترل‌های باز\/بستن، حالت‌های انتخاب، خطوط اتصال و پیمایش کامل صفحه‌کلید\. از /,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the TreeNode docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Tree/TreeNode");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TreeNode");

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "چیست، چه زمانی و چرا" })).toBeVisible();
    await expect(
      page
        .getByText(
          /یک عنصر فهرست جمع‌شدنی درون Tree\. هر گره می‌تواند فرزند \(TreeNodeهای تودرتو\)، شمایل و محتوای برچسب سفارشی داشته باشد\./,
        )
        .first(),
    ).toBeVisible();
  });
  test("translates the Table docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Table/Table");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Table");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(page.getByText(/پوششی سبک‌دار حول عنصر HTML بومی /).first()).toBeVisible();
  });

  test("translates the TableBody docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Table/TableBody");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TableBody");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(
      page.getByText(/پوششی معنایی برای سطرهای بدنه جدول\. به‌صورت /).first(),
    ).toBeVisible();
  });

  test("translates the TableCell docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Table/TableCell");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TableCell");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(page.getByText(/یک سلول داده جدول سبک‌دار\. به‌صورت /).first()).toBeVisible();
  });

  test("translates the TableHead docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Table/TableHead");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TableHead");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(
      page.getByText(/پوششی معنایی برای سطرهای سرصفحه جدول\. به‌صورت /).first(),
    ).toBeVisible();
  });

  test("translates the TableHeader docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Table/TableHeader");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TableHeader");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(page.getByText(/یک سلول سرصفحه جدول سبک‌دار\. به‌صورت /).first()).toBeVisible();
  });

  test("translates the TableRow docs page prose", async ({ page }) => {
    await page.goto("/docs/components/Table/TableRow");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("TableRow");
    await expect(page.locator("h2", { hasText: "Accessibility" })).toBeVisible();

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(
      page.getByText(/یک سطر جدول سبک‌دار با حالت‌های اختیاری انتخاب و غیرفعال\. به‌صورت /).first(),
    ).toBeVisible();
  });
  test("translates the CodeBlock docs page prose", async ({ page }) => {
    await page.goto("/docs/components/CodeBlock/CodeBlock");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("CodeBlock");

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(
      page
        .getByText(
          /یک کامپوننت نمایش کد با برجسته‌سازی نحو مبتنی بر Prism\.js، تشخیص خودکار زبان، دکمه کپی در کلیپ‌بورد و منابع CDN قابل تنظیم\. زبان‌ها به‌صورت درخواستی با افزونه autoloader در Prism بارگذاری می‌شوند\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the CodeBlockSpeed docs page prose", async ({ page }) => {
    await page.goto("/docs/components/CodeBlockSpeed/CodeBlockSpeed");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("CodeBlockSpeed");

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(
      page
        .getByText(
          /یک ویجت نمایش کد فقط-خواندنی که از Speed Highlight برای برجسته‌سازی نحو استفاده می‌کند\. برجسته‌ساز را به‌صورت درخواستی بارگذاری می‌کند و در مقایسه با گزینه‌های مبتنی بر Prism حجم بسته را کم نگه می‌دارد\./,
        )
        .first(),
    ).toBeVisible();
  });

  test("translates the CodeEditor docs page prose", async ({ page }) => {
    await page.goto("/docs/components/CodeEditor/CodeEditor");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("CodeEditor");

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h2", { hasText: "دسترس‌پذیری" })).toBeVisible();
    await expect(
      page
        .getByText(
          /یک ویجت کامل ویرایش کد ساخته‌شده بر پایه CodeMirror 6\. افزونه‌ها را به‌صورت پویا از CDN بارگذاری می‌کند \(esm\.sh، jsdelivr، unpkg\) و برجسته‌سازی نحو، شماره خطوط، تاشدن کد و برجسته‌سازی خط فعال را بدون قرار دادن کل کتابخانه CodeMirror در بسته فراهم می‌کند\./,
        )
        .first(),
    ).toBeVisible();
  });
  test("AreaChart docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/AreaChart");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "انتخاب نمودار مناسب" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("BarChart docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/BarChart");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
  test("LineChart docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/LineChart");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "انتخاب نمودار مناسب" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("PieChart docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/PieChart");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
  test("DonutChart docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/DonutChart");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("GaugeChart docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/GaugeChart");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("ProgressMetric docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/ProgressMetric");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
  test("KPICard docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/KPICard");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("StatsCard docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/StatsCard");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("MetricGrid docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/MetricGrid");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("MetricTrend docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Metrics/MetricTrend");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "چیست، چه زمانی و چرا" });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
  test("Input docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Form/Input");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "Input", level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "سفارشی‌سازی", level: 2 })).toBeVisible();
  });
  test("Textarea docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Form/Textarea");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "Textarea", level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "سفارشی‌سازی", level: 2 })).toBeVisible();
  });
  test("NumberInput docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Form/NumberInput");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "NumberInput", level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "سفارشی‌سازی", level: 2 })).toBeVisible();
  });
  test("Select docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Form/Select");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "Select", level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "سفارشی‌سازی", level: 2 })).toBeVisible();
  });
  test("Checkbox docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Form/Checkbox");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "Checkbox", level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "سفارشی‌سازی", level: 2 })).toBeVisible();
  });
  test("Radio docs page switches to Persian", async ({ page }) => {
    await page.goto("/docs/components/Form/Radio");
    await waitForHydration(page);

    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    const heading = page.getByRole("heading", { name: "Radio", level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "سفارشی‌سازی", level: 2 })).toBeVisible();
  });
});
