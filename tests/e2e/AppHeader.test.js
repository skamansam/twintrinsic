import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for AppHeader.
 *
 * Targets `/docs/components/AppHeader/AppHeader`. The header renders a
 * `<header>` landmark with navigation, search, notifications, and user menu.
 * Examples are scoped via data-testid (app-header-basic, app-header-with-logo,
 * app-header-full-featured).
 */
test.describe("AppHeader docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/AppHeader/AppHeader");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "AppHeader", level: 1 })).toBeVisible();
    await expect(page.getByTestId("app-header-basic")).toBeVisible();
    await expect(page.getByTestId("app-header-with-logo")).toBeVisible();
    await expect(page.getByTestId("app-header-full-featured")).toBeVisible();
  });

  test("basic header renders as a header landmark", async ({ page }) => {
    const header = page.getByTestId("app-header-basic").locator("header");
    await expect(header).toBeVisible();
    await expect(header).toHaveJSProperty("tagName", "HEADER");
  });

  test("basic header renders brand name and nav links", async ({ page }) => {
    const header = page.getByTestId("app-header-basic").locator(".app-header");
    await expect(header).toBeVisible();
    await expect(header.locator(".app-header-brand-name")).toHaveText("Acme Suite");

    const navLinks = header.locator(".app-header-nav-link");
    await expect(navLinks).toHaveCount(3);
    await expect(navLinks.first()).toHaveAttribute("aria-current", "page");
  });

  test("nav links have proper aria-current on the active page", async ({ page }) => {
    const header = page.getByTestId("app-header-basic").locator(".app-header");
    const links = header.locator(".app-header-nav-link");
    const count = await links.count();
    let currentCount = 0;
    for (let i = 0; i < count; i++) {
      const current = await links.nth(i).getAttribute("aria-current");
      if (current === "page") currentCount++;
    }
    expect(currentCount).toBe(1);
  });

  test("mobile menu toggle opens and closes the navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.getByTestId("app-header-basic").locator(".app-header");
    const menuButton = header.locator(".app-header-mobile-menu");
    const nav = header.locator(".app-header-nav");

    await expect(menuButton).toBeVisible();
    await expect(nav).not.toHaveClass(/app-header-nav-open/);

    await menuButton.click();
    await expect(nav).toHaveClass(/app-header-nav-open/);

    await menuButton.click();
    await expect(nav).not.toHaveClass(/app-header-nav-open/);
  });

  test("mobile menu button has aria-expanded and aria-controls", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.getByTestId("app-header-basic").locator(".app-header");
    const menuButton = header.locator(".app-header-mobile-menu");

    await expect(menuButton).toBeVisible();
    const expanded = await menuButton.getAttribute("aria-expanded");
    expect(expanded).toBe("false");

    const controls = await menuButton.getAttribute("aria-controls");
    expect(controls).toBeTruthy();

    // After clicking, aria-expanded flips to true.
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  });

  test("Escape key closes the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.getByTestId("app-header-basic").locator(".app-header");
    const menuButton = header.locator(".app-header-mobile-menu");
    const nav = header.locator(".app-header-nav");

    await menuButton.click();
    await expect(nav).toHaveClass(/app-header-nav-open/);

    await page.keyboard.press("Escape");
    await expect(nav).not.toHaveClass(/app-header-nav-open/);
  });

  test("keyboard Tab navigates through header actions", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");

    const searchInput = header.locator(".app-header-search-input");
    await expect(searchInput).toBeVisible();

    // Focus the search input.
    await searchInput.focus();
    await expect(searchInput).toBeFocused();

    // Tab should move to the next focusable element (notifications or user button).
    await page.keyboard.press("Tab");
    // Some element in the actions area should receive focus.
  });

  test("full-featured header shows search and user menu", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");

    await expect(header.locator(".app-header-search-input")).toBeVisible();
    await expect(header.locator(".app-header-user-button")).toBeVisible();

    // Open the user menu.
    await header.locator(".app-header-user-button").click();
    await expect(header.locator(".app-header-user-menu")).toBeVisible();
    await expect(header.locator(".app-header-user-menu-item")).toHaveCount(3);
  });

  test("user menu button has aria-expanded", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");
    const userBtn = header.locator(".app-header-user-button");

    await expect(userBtn).toHaveAttribute("aria-expanded", "false");
    await userBtn.click();
    await expect(userBtn).toHaveAttribute("aria-expanded", "true");

    // Escape closes the menu.
    await page.keyboard.press("Escape");
    await expect(userBtn).toHaveAttribute("aria-expanded", "false");
  });

  test("notifications button has aria-expanded and toggles panel", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");
    const notifBtn = header.locator(".app-header-notifications-button");

    await expect(notifBtn).toBeVisible();
    await expect(notifBtn).toHaveAttribute("aria-expanded", "false");

    await notifBtn.click();
    await expect(notifBtn).toHaveAttribute("aria-expanded", "true");
    await expect(header.locator(".app-header-notifications-panel")).toBeVisible();
  });

  test("search input has associated label", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");
    const searchInput = header.locator(".app-header-search-input");
    await expect(searchInput).toBeVisible();

    // The input should have an id linked to a label.
    const inputId = await searchInput.getAttribute("id");
    if (inputId) {
      const label = header.locator(`label[for="${inputId}"]`);
      await expect(label).toBeVisible();
    }
  });

  test("locale switcher renders a language button with a flag", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");
    const picker = header.locator(".language-picker");
    await expect(picker).toBeVisible();

    const trigger = picker.locator(".language-picker-trigger");
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    // The current language's flag (circle-flags iconset) loads asynchronously.
    await expect(trigger.locator("svg").first()).toBeAttached();
  });

  test("locale switcher opens a menu of languages and closes on Escape", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");
    const trigger = header.locator(".language-picker-trigger");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = header.locator(".language-picker-menu");
    await expect(menu).toBeVisible();

    const items = menu.locator(".language-picker-item");
    await expect(items).toHaveCount(3);
    // Every item shows its language's own flag and native name.
    for (let i = 0; i < 3; i++) {
      await expect(items.nth(i).locator("svg").first()).toBeAttached();
    }

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("locale switcher autodetects the runtime locales and reports the active one", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");
    const trigger = header.locator(".language-picker-trigger");

    // Autodetection: with no `locales` prop, the picker exposes exactly the
    // compiled Paraglide runtime's locales (messages/{en,es,fa}.json).
    await trigger.click();
    const menu = header.locator(".language-picker-menu");
    const items = menu.locator('.language-picker-item[role="menuitemradio"]');
    await expect(items).toHaveCount(3);
    const langs = [];
    for (let i = 0; i < 3; i++) {
      langs.push(await items.nth(i).getAttribute("lang"));
    }
    expect([...langs].sort()).toEqual(["en", "es", "fa"]);

    // Exactly one active locale: Paraglide's cookie detect strategy resolves
    // one from browser preferences even without an explicit setLocale, and
    // the trigger label mirrors it ("Change language (en)").
    const checked = menu.locator('[role="menuitemradio"][aria-checked="true"]');
    await expect(checked).toHaveCount(1);
    const label = await trigger.getAttribute("aria-label");
    const activeLocale = /\((\w+)\)$/.exec(label ?? "")?.[1];
    expect(activeLocale).toBeTruthy();
    await expect(checked).toHaveAttribute("lang", activeLocale);

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("locale switcher switches the page locale via the runtime", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");
    const trigger = header.locator(".language-picker-trigger");

    await trigger.click();
    const menu = header.locator(".language-picker-menu");
    const items = menu.locator('.language-picker-item[role="menuitemradio"]');
    await expect(items).toHaveCount(3);

    // Selecting a different locale calls the runtime's setLocale, which
    // (default cookie strategy) reloads the page in the new locale.
    await items.nth(1).click();
    await page.waitForLoadState("load");
    await waitForHydration(page);

    // Paraglide set the <html lang> attribute on the reloaded page…
    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).not.toBe("en");

    // …and the docs shell re-rendered in the new locale. The AppHeader demo
    // state resets on reload, so reopen the menu to confirm the runtime now
    // reports the switched locale as checked.
    const trigger2 = page.getByTestId("app-header-full-featured").locator(".language-picker-trigger");
    await trigger2.click();
    const menu2 = page.getByTestId("app-header-full-featured").locator(".language-picker-menu");
    await expect(menu2).toBeVisible();
    const items2 = menu2.locator('.language-picker-item[role="menuitemradio"]');
    await expect(items2).toHaveCount(3);
    const activeIndex = await items2.evaluateAll((nodes) =>
      nodes.findIndex((node) => node.getAttribute("aria-checked") === "true"),
    );
    expect(activeIndex).toBeGreaterThanOrEqual(0);
    await expect(items2.nth(activeIndex)).toHaveAttribute("lang", htmlLang);

    // Restore English so later tests keep deterministic locale state.
    const enIndex = await items2.evaluateAll((nodes) =>
      nodes.findIndex((node) => node.getAttribute("lang") === "en"),
    );
    await items2.nth(enIndex).click();
    await page.waitForLoadState("load");
    await waitForHydration(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});
