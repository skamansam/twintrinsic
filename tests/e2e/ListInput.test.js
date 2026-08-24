import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the ListInput component.
 *
 * Targets `/docs/components/Form/ListInput`. The text field is exposed with
 * its ariaLabel; chips render as `role="button"` with a "Remove {value}"
 * button inside. Examples are scoped via data-testid (list-input-basic,
 * list-input-validated, list-input-disabled, list-input-formfield).
 */
test.describe("ListInput docs page", () => {
  test("basic list input renders chips and adds new ones on Enter", async ({ page }) => {
    await page.goto("/docs/components/Form/ListInput");
    await waitForHydration(page);

    const example = page.getByTestId("list-input-basic");
    // Pre-filled chips.
    for (const chip of ["svelte", "typescript"]) {
      await expect(
        example.getByRole("button", { name: `Tag: ${chip}. Press Backspace to remove.` }),
      ).toBeVisible();
    }

    // Type a new value and press Enter — a new chip appears.
    const input = example.getByRole("textbox", { name: "Add a tag" });
    await input.fill("sveltekit");
    await input.press("Enter");
    await expect(
      example.getByRole("button", { name: "Tag: sveltekit. Press Backspace to remove." }),
    ).toBeVisible();

    // The chip's remove button removes it.
    await example.getByRole("button", { name: "Remove sveltekit" }).click();
    await expect(
      example.getByRole("button", { name: "Tag: sveltekit. Press Backspace to remove." }),
    ).not.toBeVisible();
  });

  test("validated list input rejects invalid values with an alert", async ({ page }) => {
    await page.goto("/docs/components/Form/ListInput");
    await waitForHydration(page);

    const example = page.getByTestId("list-input-validated");
    const input = example.getByRole("textbox", { name: "Add an email" });

    // An invalid email shows the error alert and adds no chip.
    await input.fill("not-an-email");
    await input.press("Enter");
    await expect(example.getByRole("alert")).toHaveText("Please enter a valid email address");
    await expect(
      example.getByRole("button", { name: "Tag: not-an-email. Press Backspace to remove." }),
    ).not.toBeVisible();

    // A valid email adds the chip and clears the error.
    await input.fill("bob@example.com");
    await input.press("Enter");
    await expect(
      example.getByRole("button", { name: "Tag: bob@example.com. Press Backspace to remove." }),
    ).toBeVisible();
    await expect(example.getByRole("alert")).not.toBeVisible();
  });

  test("disabled list input disables the text field", async ({ page }) => {
    await page.goto("/docs/components/Form/ListInput");
    await waitForHydration(page);

    const example = page.getByTestId("list-input-disabled");
    await expect(example.getByRole("textbox", { name: "Readonly tags" })).toBeDisabled();
    // Existing chips still render.
    for (const chip of ["locked", "frozen"]) {
      await expect(example.getByText(chip, { exact: true })).toBeVisible();
    }
  });

  test("list input inside a form field keeps its placeholder", async ({ page }) => {
    await page.goto("/docs/components/Form/ListInput");
    await waitForHydration(page);

    const example = page.getByTestId("list-input-formfield");
    const input = example.getByRole("textbox");
    await expect(input).toHaveAttribute("placeholder", "Add a tag");
  });
});
