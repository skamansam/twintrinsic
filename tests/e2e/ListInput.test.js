import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for ListInput.
 *
 * Targets `/docs/components/Form/ListInput`. The text field is exposed with
 * its ariaLabel; chips render as `role="button"` with a "Remove {value}"
 * button inside. Examples are scoped via data-testid (list-input-basic,
 * list-input-validated, list-input-disabled, list-input-formfield).
 */
test.describe("ListInput docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/ListInput");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "ListInput", level: 1 }),
    ).toBeVisible();
  });

  test("basic list input renders chips and adds new ones on Enter", async ({ page }) => {
    const example = page.getByTestId("list-input-basic");
    for (const chip of ["svelte", "typescript"]) {
      await expect(
        example.getByRole("button", {
          name: `Tag: ${chip}. Press Backspace to remove.`,
        }),
      ).toBeVisible();
    }

    const input = example.getByRole("textbox", { name: "Add a tag" });
    await input.fill("sveltekit");
    await input.press("Enter");
    await expect(
      example.getByRole("button", {
        name: "Tag: sveltekit. Press Backspace to remove.",
      }),
    ).toBeVisible();

    // The chip's remove button removes it.
    await example.getByRole("button", { name: "Remove sveltekit" }).click();
    await expect(
      example.getByRole("button", {
        name: "Tag: sveltekit. Press Backspace to remove.",
      }),
    ).not.toBeVisible();
  });

  test("chips have accessible role=button and descriptive aria-label", async ({ page }) => {
    const example = page.getByTestId("list-input-basic");
    const chips = example.locator(".list-input-chip");
    const count = await chips.count();
    for (let i = 0; i < count; i++) {
      await expect(chips.nth(i)).toHaveAttribute("role", "button");
      await expect(chips.nth(i)).toHaveAttribute("tabindex", "0");
      const label = await chips.nth(i).getAttribute("aria-label");
      expect(label).toContain("Press Backspace to remove");
    }
  });

  test("Backspace on empty input focuses the last chip", async ({ page }) => {
    const example = page.getByTestId("list-input-basic");
    const input = example.getByRole("textbox", { name: "Add a tag" });

    // Focus the input and press Backspace — first press focuses the last chip.
    await input.focus();
    await page.keyboard.press("Backspace");
    // The last chip should now be focused (have focused styling).
    const lastChip = example.locator(".list-input-chip").last();
    await expect(lastChip).toHaveClass(/list-input-chip-focused/);
  });

  test("Arrow keys navigate between chips", async ({ page }) => {
    const example = page.getByTestId("list-input-basic");
    const input = example.getByRole("textbox", { name: "Add a tag" });
    await input.focus();

    // ArrowLeft from empty input focuses the last chip.
    await page.keyboard.press("ArrowLeft");
    const chips = example.locator(".list-input-chip");
    const lastChip = chips.last();
    await expect(lastChip).toHaveClass(/list-input-chip-focused/);
  });

  test("Escape blurs the input", async ({ page }) => {
    const example = page.getByTestId("list-input-basic");
    const input = example.getByRole("textbox", { name: "Add a tag" });
    await input.focus();
    await expect(input).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(input).not.toBeFocused();
  });

  test("validated list input rejects invalid values with an alert", async ({ page }) => {
    const example = page.getByTestId("list-input-validated");
    const input = example.getByRole("textbox", { name: "Add an email" });

    await input.fill("not-an-email");
    await input.press("Enter");
    await expect(example.getByRole("alert")).toHaveText(
      "Please enter a valid email address",
    );
    await expect(
      example.getByRole("button", {
        name: "Tag: not-an-email. Press Backspace to remove.",
      }),
    ).not.toBeVisible();

    // A valid email adds the chip and clears the error.
    await input.fill("bob@example.com");
    await input.press("Enter");
    await expect(
      example.getByRole("button", {
        name: "Tag: bob@example.com. Press Backspace to remove.",
      }),
    ).toBeVisible();
    await expect(example.getByRole("alert")).not.toBeVisible();
  });

  test("aria-invalid is set on invalid input", async ({ page }) => {
    const example = page.getByTestId("list-input-validated");
    const input = example.getByRole("textbox", { name: "Add an email" });

    await input.fill("bad");
    await input.press("Enter");
    await expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("disabled list input disables the text field", async ({ page }) => {
    const example = page.getByTestId("list-input-disabled");
    await expect(
      example.getByRole("textbox", { name: "Readonly tags" }),
    ).toBeDisabled();
    for (const chip of ["locked", "frozen"]) {
      await expect(example.getByText(chip, { exact: true })).toBeVisible();
    }
  });

  test("list input inside a form field keeps its placeholder", async ({ page }) => {
    const example = page.getByTestId("list-input-formfield");
    const input = example.getByRole("textbox");
    await expect(input).toHaveAttribute("placeholder", "Add a tag");
  });

  test("clicking a chip focuses it via keyboard", async ({ page }) => {
    const example = page.getByTestId("list-input-basic");
    const chip = example.locator(".list-input-chip").first();
    await chip.click();
    await expect(chip).toHaveClass(/list-input-chip-focused/);
  });

  test("hidden input stores JSON array for form submission", async ({ page }) => {
    const example = page.getByTestId("list-input-basic");
    const hidden = example.locator("input[type='hidden']");
    await expect(hidden).toBeAttached();
    const value = await hidden.inputValue();
    const parsed = JSON.parse(value);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toContain("svelte");
    expect(parsed).toContain("typescript");
  });
});
