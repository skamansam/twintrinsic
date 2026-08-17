import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Radio component.
 *
 * Targets `/docs/components/Form/Radio`. Each demo exposes a `data-testid`
 * wrapper (`radio-basic`, ...) around native radio inputs with labels.
 */
test.describe("Radio docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Radio");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Radio", level: 1 })).toBeVisible();
  });

  test("basic radio renders with label and checked state", async ({ page }) => {
    const demo = page.getByTestId("radio-basic");
    const radio = demo.getByLabel("Light theme");
    await expect(radio).toBeChecked();
    await expect(radio).toHaveAttribute("name", "theme");
  });

  test("radio group updates selection on click", async ({ page }) => {
    const demo = page.getByTestId("radio-group");
    const light = demo.getByLabel("Light");
    const dark = demo.getByLabel("Dark");
    await expect(light).toBeChecked();
    // The native input is visually hidden (sr-only); clicking its label text
    // toggles it the same way a user would.
    await demo.getByText("Dark", { exact: true }).click();
    await expect(dark).toBeChecked();
    await expect(light).not.toBeChecked();
    await expect(demo).toContainText("Selected theme: dark");
  });

  test("horizontal layout radios are mutually exclusive", async ({ page }) => {
    const demo = page.getByTestId("radio-horizontal");
    const apple = demo.getByLabel("Apple");
    const banana = demo.getByLabel("Banana");
    await expect(apple).toBeChecked();
    await demo.getByText("Banana", { exact: true }).click();
    await expect(banana).toBeChecked();
    await expect(apple).not.toBeChecked();
    await expect(demo).toContainText("Selected fruit: banana");
  });

  test("disabled radio is not interactive", async ({ page }) => {
    const demo = page.getByTestId("radio-disabled");
    await expect(demo.getByLabel("Disabled option")).toBeDisabled();
  });
});
