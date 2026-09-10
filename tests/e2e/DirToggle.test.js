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
});
