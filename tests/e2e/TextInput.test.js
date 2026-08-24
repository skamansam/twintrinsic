import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the TextInput component.
 *
 * Targets `/docs/components/Form/TextInput`. Each demo exposes a `data-testid`
 * wrapper (`textinput-basic`, ...) around a native `<input>`.
 */
test.describe("TextInput docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/TextInput");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "TextInput", level: 1 })).toBeVisible();
  });

  test("accepts typed input", async ({ page }) => {
    const demo = page.getByTestId("textinput-basic");
    const input = demo.getByPlaceholder("Enter your username");
    await input.fill("buffy");
    await expect(input).toHaveValue("buffy");
  });

  test("initial value is honored", async ({ page }) => {
    const demo = page.getByTestId("textinput-value");
    await expect(demo.locator("input")).toHaveValue("hello@world.com");
  });

  test("multiple inputs render in the icons example", async ({ page }) => {
    const demo = page.getByTestId("textinput-icons");
    const inputs = demo.locator("input");
    await expect(inputs).toHaveCount(2);
  });

  test("clearable input shows a clear button and clears the value", async ({ page }) => {
    const demo = page.getByTestId("textinput-clearable");
    const input = demo.getByPlaceholder("Type then clear...");
    await input.fill("search query");
    await demo.getByRole("button", { name: "Clear input" }).click();
    await expect(input).toHaveValue("");
  });

  test("disabled input is not editable", async ({ page }) => {
    const demo = page.getByTestId("textinput-disabled");
    await expect(demo.locator("input")).toBeDisabled();
  });

  test("sizes render three inputs", async ({ page }) => {
    const demo = page.getByTestId("textinput-sizes");
    await expect(demo.getByPlaceholder("Small")).toBeVisible();
    await expect(demo.getByPlaceholder("Medium (default)")).toBeVisible();
    await expect(demo.getByPlaceholder("Large")).toBeVisible();
  });
});
