import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site e2e tests for `{...rest}` attribute passthrough.
 *
 * Since the 5b88cf7 change, every component spreads consumer-provided
 * attributes (data-*, aria-*, native attributes) onto its root element —
 * or onto the native form element for form controls. These tests prove the
 * passthrough works for three representative shapes:
 *
 * 1. Button  — inline `$props()` + conditional `<a>`/`<button>` rendering
 * 2. Input   — inline `$props()`, rest forwarded to the native `<input>`
 * 3. Card    — interface Props + `<svelte:element>` root (article/a)
 */
test.describe("Rest props attribute passthrough", () => {
  test("Button forwards data-* attributes to the rendered element", async ({ page }) => {
    await page.goto("/docs/components/Button/Button");
    await waitForHydration(page);

    const example = page.getByTestId("button-rest-props");
    const button = example.getByRole("button", { name: "Rest Props" });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("data-rest-pass", "button");
    // The attribute must live on the component's own element, not a wrapper.
    await expect(button).toHaveAttribute("type", "button");
  });

  test("Button forwards rest props when rendering as a link", async ({ page }) => {
    await page.goto("/docs/components/Button/Button");
    await waitForHydration(page);

    const example = page.getByTestId("button-link");
    const link = example.getByRole("link", { name: "Link Button" });
    await expect(link).toHaveAttribute("href", "/docs");
  });

  test("Input forwards data-* and aria-* to the native input", async ({ page }) => {
    await page.goto("/docs/components/Form/Input");
    await waitForHydration(page);

    const example = page.getByTestId("input-rest-props");
    const input = example.getByRole("textbox", { name: "Rest props input" });
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("data-rest-pass", "input");
    await expect(input).toHaveAttribute("aria-label", "Rest props input");
    // The attributes land on the <input> itself, not the wrapper container.
    await expect(input).toHaveAttribute("type", "text");
  });

  test("Card forwards data-* to the svelte:element root", async ({ page }) => {
    await page.goto("/docs/components/Card/Card");
    await waitForHydration(page);

    const example = page.getByTestId("card-rest-props");
    const card = example.locator("article[data-rest-pass='card']");
    await expect(card).toBeVisible();
    await expect(card).toContainText("Rest props (data-*, aria-*, and native event handlers)");
  });

  test("Card forwards a native onclick handler passed via rest props", async ({ page }) => {
    await page.goto("/docs/components/Card/Card");
    await waitForHydration(page);

    const example = page.getByTestId("card-rest-props");
    const card = example.locator("article[data-rest-pass='card']");
    await expect(card).not.toHaveAttribute("data-clicked", "true");

    await card.click();
    // The consumer-supplied native handler runs because it was forwarded
    // onto the root element through the rest spread.
    await expect(card).toHaveAttribute("data-clicked", "true");
  });
});
