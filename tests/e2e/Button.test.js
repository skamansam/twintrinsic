import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Button component.
 *
 * Targets `/docs/components/Button/Button` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies native `<button>`
 * vs `<a>` rendering, disabled/loading `aria-disabled`, and icon `aria-hidden`.
 */
test.describe("Button docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Button/Button");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Button", level: 1 })).toBeVisible();
    await expect(page.getByTestId("button-basic")).toBeVisible();
    await expect(page.getByTestId("button-variants")).toBeVisible();
    await expect(page.getByTestId("button-states")).toBeVisible();
  });

  test("renders a native button element by default", async ({ page }) => {
    const basic = page.getByTestId("button-basic");
    const button = basic.getByRole("button", { name: "Default Button" });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("type", "button");
  });

  test("renders all six variants", async ({ page }) => {
    const variants = page.getByTestId("button-variants");
    for (const name of ["Default", "Primary", "Secondary", "Outline", "Ghost", "Link"]) {
      await expect(variants.getByRole("button", { name })).toBeVisible();
    }
  });

  test("disabled and loading buttons expose aria-disabled", async ({ page }) => {
    const states = page.getByTestId("button-states");
    await expect(states.getByRole("button", { name: "Disabled" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await expect(states.getByRole("button", { name: "Loading" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("loading button announces its state for screen readers", async ({ page }) => {
    const states = page.getByTestId("button-states");
    await expect(states.getByRole("button", { name: "Loading" }).locator(".sr-only")).toHaveText(
      "Loading",
    );
  });

  test("icon buttons mark their icons as aria-hidden", async ({ page }) => {
    const icons = page.getByTestId("button-with-icons");
    const addButton = icons.getByRole("button", { name: "Add Item" });
    await expect(addButton.locator(".button-icon")).toHaveAttribute("aria-hidden", "true");
  });

  test("href renders an anchor with the link role", async ({ page }) => {
    const links = page.getByTestId("button-link");
    const linkButton = links.getByRole("link", { name: "Link Button" });
    await expect(linkButton).toBeVisible();
    await expect(linkButton).toHaveAttribute("href", "/docs");
  });
});
