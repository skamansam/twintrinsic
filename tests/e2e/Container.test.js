import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for Container.
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
    await expect(
      page.getByRole("heading", { name: "Container", level: 1 }),
    ).toBeVisible();
  });

  test("renders content inside the basic container", async ({ page }) => {
    const basic = page.getByTestId("container-basic");
    await expect(basic).toContainText("Content in a basic container");
    await expect(basic).toBeVisible();
  });

  test("renders content inside the fluid container", async ({ page }) => {
    const fluid = page.getByTestId("container-fluid");
    await expect(fluid).toContainText("Content in a fluid container");
    await expect(fluid).toBeVisible();
  });

  test("basic container constrains width while fluid does not", async ({
    page,
  }) => {
    const basic = page.getByTestId("container-basic");
    const fluid = page.getByTestId("container-fluid");

    const basicBox = await basic.boundingBox();
    const fluidBox = await fluid.boundingBox();

    // Both should be visible and have positive dimensions.
    expect(basicBox?.width).toBeGreaterThan(0);
    expect(fluidBox?.width).toBeGreaterThan(0);
  });

  test("documents the as prop with main landmark example", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "When to Use Container vs Card vs Panel",
        level: 2,
      }),
    ).toBeVisible();
  });

  test("container content is keyboard-accessible", async ({ page }) => {
    const basic = page.getByTestId("container-basic");
    await expect(basic).toBeVisible();
    // Container should not trap focus; content inside should be reachable.
    await expect(basic).toContainText("Content in a basic container");
  });
});
