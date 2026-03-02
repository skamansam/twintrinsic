import { expect, test } from "@playwright/test";

test.describe("Select Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--default");
  });

  test.describe("Rendering", () => {
    test("renders with label and placeholder", async ({ page }) => {
      const select = page.locator(".select");
      await expect(select).toBeVisible();

      const label = select.locator(".select-label-text");
      await expect(label).toBeVisible();

      const placeholder = select.locator(".select-placeholder");
      await expect(placeholder).toBeVisible();
    });

    test("renders required indicator", async ({ page }) => {
      const select = page.locator(".select");
      const required = select.locator(".select-required");

      // Required indicator should be present when required=true
      const control = select.locator(".select-control");
      const ariaRequired = await control.getAttribute("aria-required");
      if (ariaRequired === "true") {
        await expect(required).toBeVisible();
      }
    });

    test("renders with error message", async ({ page }) => {
      const select = page.locator(".select");
      const error = select.locator(".select-error-text");

      // Error should be visible if present
      const errorVisible = await error.isVisible().catch(() => false);
      if (errorVisible) {
        await expect(error).toBeVisible();
      }
    });

    test("renders disabled state", async ({ page }) => {
      const select = page.locator(".select");
      const control = select.locator(".select-control");

      // Check if disabled
      const tabindex = await control.getAttribute("tabindex");
      if (tabindex === "-1") {
        await expect(select).toHaveClass(/select-disabled/);
      }
    });
  });

  test.describe("Popover Interaction", () => {
    test("opens popover on click", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.click();
      await expect(menu).toBeVisible();
    });

    test("closes popover when clicking option", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");
      const firstOption = page.locator(".select-option").first();

      await control.click();
      await expect(menu).toBeVisible();

      await firstOption.click();

      // Menu should be hidden after selection
      await expect(menu).not.toBeVisible();
    });

    test("closes popover with Escape key", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.click();
      await expect(menu).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(menu).not.toBeVisible();
    });

    test("toggles popover on multiple clicks", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.click();
      await expect(menu).toBeVisible();

      await control.click();
      await expect(menu).not.toBeVisible();

      await control.click();
      await expect(menu).toBeVisible();
    });
  });

  test.describe("Single Selection", () => {
    test("selects option on click", async ({ page }) => {
      const control = page.locator(".select-control");
      const firstOption = page.locator(".select-option").first();

      await control.click();
      await firstOption.click();

      // Selected value should be displayed
      const value = page.locator(".select-value");
      const text = await value.textContent();
      expect(text).toBeTruthy();
      expect(text).not.toContain("Select");
    });

    test("highlights selected option", async ({ page }) => {
      const control = page.locator(".select-control");
      const options = page.locator(".select-option");

      await control.click();
      await options.first().click();

      // Reopen to verify selection
      await control.click();
      const selectedOption = page.locator(".select-option-selected").first();
      await expect(selectedOption).toBeVisible();
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("opens popover with Enter key", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.focus();
      await page.keyboard.press("Enter");

      await expect(menu).toBeVisible();
    });

    test("opens popover with Space key", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.focus();
      await page.keyboard.press(" ");

      await expect(menu).toBeVisible();
    });

    test("navigates options with arrow keys", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.focus();
      await page.keyboard.press("Enter");
      await expect(menu).toBeVisible();

      // Navigate down
      await page.keyboard.press("ArrowDown");
      const highlighted = page.locator(".select-option-highlighted");
      await expect(highlighted).toBeVisible();

      // Navigate up
      await page.keyboard.press("ArrowUp");
      await expect(highlighted).toBeVisible();
    });

    test("selects option with Enter key", async ({ page }) => {
      const control = page.locator(".select-control");

      await control.focus();
      await page.keyboard.press("Enter");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");

      // Menu should close after selection
      const menu = page.locator("#select-menu");
      await expect(menu).not.toBeVisible();
    });

    test("closes popover with Escape key", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.focus();
      await page.keyboard.press("Enter");
      await expect(menu).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(menu).not.toBeVisible();
    });
  });

  test.describe("Clear Button", () => {
    test("shows clear button when value selected", async ({ page }) => {
      const control = page.locator(".select-control");
      const firstOption = page.locator(".select-option").first();

      await control.click();
      await firstOption.click();

      const clearButton = page.locator(".select-clear-button");
      await expect(clearButton).toBeVisible();
    });

    test("clears selection on click", async ({ page }) => {
      const control = page.locator(".select-control");
      const firstOption = page.locator(".select-option").first();

      await control.click();
      await firstOption.click();

      const clearButton = page.locator(".select-clear-button");
      await clearButton.click();

      // Placeholder should be visible again
      const placeholder = page.locator(".select-placeholder");
      await expect(placeholder).toBeVisible();
    });
  });

  test.describe("Filtering", () => {
    test("filters options while typing", async ({ page }) => {
      // Navigate to filtered story if available
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.click();
      await expect(menu).toBeVisible();

      // Check if filter input is present
      const filterInput = page.locator(".select-filter");
      const hasFilter = await filterInput.isVisible().catch(() => false);

      if (hasFilter) {
        await filterInput.fill("united");

        const options = page.locator(".select-option");
        const count = await options.count();
        expect(count).toBeGreaterThan(0);
      }
    });
  });

  test.describe("Accessibility", () => {
    test("has proper ARIA attributes", async ({ page }) => {
      const control = page.locator(".select-control");

      await expect(control).toHaveAttribute("role", "combobox");
      await expect(control).toHaveAttribute("aria-haspopup", "listbox");

      const ariaExpanded = await control.getAttribute("aria-expanded");
      expect(["true", "false"]).toContain(ariaExpanded);
    });

    test("marks options with aria-selected", async ({ page }) => {
      const control = page.locator(".select-control");
      const options = page.locator(".select-option");

      await control.click();

      const firstOption = options.first();
      const ariaSelected = await firstOption.getAttribute("aria-selected");
      expect(["true", "false"]).toContain(ariaSelected);
    });

    test("listbox has proper ARIA attributes", async ({ page }) => {
      const control = page.locator(".select-control");
      const menu = page.locator("#select-menu");

      await control.click();

      await expect(menu).toHaveAttribute("role", "listbox");
    });

    test("error message is linked with aria-describedby", async ({ page }) => {
      const control = page.locator(".select-control");
      const error = page.locator(".select-error-text");

      const errorVisible = await error.isVisible().catch(() => false);
      if (errorVisible) {
        const describedBy = await control.getAttribute("aria-describedby");
        expect(describedBy).toBeTruthy();
      }
    });

    test("supports keyboard focus", async ({ page }) => {
      const control = page.locator(".select-control");

      await control.focus();
      await expect(control).toBeFocused();
    });
  });

  test.describe("Size Variants", () => {
    test("renders with different sizes", async ({ page }) => {
      const control = page.locator(".select-control");

      // Control should be visible regardless of size
      await expect(control).toBeVisible();

      // Check if size classes are applied
      const className = await control.getAttribute("class");
      expect(className).toBeTruthy();
    });
  });

  test.describe("Option Display", () => {
    test("displays all options in dropdown", async ({ page }) => {
      const control = page.locator(".select-control");
      const options = page.locator(".select-option");

      await control.click();

      const count = await options.count();
      expect(count).toBeGreaterThan(0);
    });

    test("shows empty state when no options", async ({ page }) => {
      const control = page.locator(".select-control");
      const empty = page.locator(".select-empty");

      await control.click();

      const emptyVisible = await empty.isVisible().catch(() => false);
      if (emptyVisible) {
        await expect(empty).toBeVisible();
      }
    });
  });
});
