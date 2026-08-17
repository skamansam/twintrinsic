import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Textarea component.
 *
 * Targets `/docs/components/Form/Textarea`. Each example exposes a
 * `data-testid` (e.g. `textarea-basic`) that lands on the native `<textarea>`
 * via the component's rest-prop passthrough. Verifies typing, pre-filled
 * values, disabled/readonly states, and character limits.
 */
test.describe("Textarea docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Textarea");
    await waitForHydration(page);
  });

  test("renders the docs page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Textarea", level: 1 })).toBeVisible();
    await expect(page.getByTestId("textarea-basic")).toBeVisible();
  });

  test("accepts typed input", async ({ page }) => {
    const textarea = page.getByTestId("textarea-basic");
    await textarea.fill("Hello from the docs test");
    await expect(textarea).toHaveValue("Hello from the docs test");
  });

  test("pre-filled value is honored", async ({ page }) => {
    await expect(page.getByTestId("textarea-prefilled")).toHaveValue(
      "This is a pre-filled textarea with some initial content.",
    );
  });

  test("auto-resize textarea accepts input", async ({ page }) => {
    const textarea = page.getByTestId("textarea-autoresize");
    await textarea.fill("A line of text");
    await expect(textarea).toHaveValue("A line of text");
  });

  test("disabled textarea is not editable", async ({ page }) => {
    await expect(page.getByTestId("textarea-disabled")).toBeDisabled();
  });

  test("readonly textarea is not editable but focusable", async ({ page }) => {
    const readonly = page.getByTestId("textarea-readonly");
    await expect(readonly).not.toBeEditable();
    await readonly.focus();
    await expect(readonly).toBeFocused();
  });

  test("enforces the character limit", async ({ page }) => {
    const limited = page.getByTestId("textarea-maxlength");
    await limited.fill("x".repeat(150));
    await expect(limited).toHaveValue("x".repeat(100));
  });

  test("required textarea is marked required", async ({ page }) => {
    await expect(page.getByTestId("textarea-required")).toHaveAttribute("required", "");
  });
});
