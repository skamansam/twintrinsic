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
});
