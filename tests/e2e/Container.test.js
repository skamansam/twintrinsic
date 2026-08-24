import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Container component.
 *
 * Targets `/docs/components/Container/Container`. The examples expose
 * `data-testid` hooks (`container-basic`, `container-fluid`); a fluid
 * container renders with full width (no max-width constraint).
 */
test.describe("Container docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Container/Container");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Container", level: 1 })).toBeVisible();
  });

  test("renders content inside the basic container", async ({ page }) => {
    await expect(page.getByTestId("container-basic")).toContainText("Content in a basic container");
  });

  test("renders content inside the fluid container", async ({ page }) => {
    await expect(page.getByTestId("container-fluid")).toContainText("Content in a fluid container");
  });

  test("documents the as prop with main landmark example", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "When to Use Container vs Card vs Panel", level: 2 }),
    ).toBeVisible();
  });
});
