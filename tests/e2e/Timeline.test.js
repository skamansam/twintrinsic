import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site accessibility + interaction tests for the Timeline component.
 *
 * Targets `/docs/components/Timeline/Timeline`. The examples expose
 * `data-testid` wrappers (`timeline-basic`, `timeline-variants`) around
 * `role="list"` containers with `role="listitem"` children.
 */
test.describe("Timeline docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Timeline/Timeline");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Timeline", level: 1 })).toBeVisible();
  });

  test("basic timeline renders items with titles and content", async ({ page }) => {
    const demo = page.getByTestId("timeline-basic");
    await expect(demo.getByRole("list")).toBeVisible();
    for (let step = 1; step <= 3; step++) {
      await expect(demo.getByRole("listitem").filter({ hasText: `Step ${step}` })).toBeVisible();
      await expect(demo.getByText(`Content for step ${step}`, { exact: true })).toBeVisible();
    }
  });

  test("variant timeline shows dates, statuses, and item content", async ({ page }) => {
    const demo = page.getByTestId("timeline-variants");
    await expect(demo.getByRole("list")).toBeVisible();
    await expect(demo.getByRole("listitem").filter({ hasText: "Planned" })).toContainText(
      "Jan 2023",
    );
    await expect(demo.getByRole("listitem").filter({ hasText: "In Progress" })).toContainText(
      "Feb 2023",
    );
    await expect(demo.getByRole("listitem").filter({ hasText: "Done" })).toContainText("Mar 2023");
    await expect(demo.getByText("Shipped the release", { exact: true })).toBeVisible();
  });
});
