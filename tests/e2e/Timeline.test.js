import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site accessibility tests for Timeline.
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
    await expect(
      page.getByRole("heading", { name: "Timeline", level: 1 }),
    ).toBeVisible();
  });

  test("basic timeline renders as an accessible list", async ({ page }) => {
    const demo = page.getByTestId("timeline-basic");
    // The timeline renders as an <ol> which has implicit role="list".
    const list = demo.locator("ol");
    await expect(list).toBeVisible();
    await expect(list).toHaveJSProperty("tagName", "OL");
  });

  test("basic timeline renders items with titles and content", async ({ page }) => {
    const demo = page.getByTestId("timeline-basic");
    for (const [title, content] of [
      ["Kickoff", "Project started"],
      ["Milestone", "First release shipped"],
      ["Retrospective", "Team retro"],
    ]) {
      await expect(
        demo.getByRole("listitem").filter({ hasText: title }),
      ).toBeVisible();
      await expect(demo.getByText(content, { exact: true })).toBeVisible();
    }
  });

  test("each timeline item renders as a list element", async ({ page }) => {
    const demo = page.getByTestId("timeline-basic");
    // Items are <li> elements inside the <ol>, which have implicit role="listitem".
    const items = demo.locator("li");
    const count = await items.count();
    expect(count).toBe(3);
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveJSProperty("tagName", "LI");
    }
  });

  test("variant timeline shows dates, statuses, and item content", async ({
    page,
  }) => {
    const demo = page.getByTestId("timeline-variants");
    await expect(demo.getByRole("list")).toBeVisible();
    await expect(
      demo.getByRole("listitem").filter({ hasText: "Planned" }),
    ).toContainText("Jan 2023");
    await expect(
      demo.getByRole("listitem").filter({ hasText: "In Progress" }),
    ).toContainText("Feb 2023");
    await expect(
      demo.getByRole("listitem").filter({ hasText: "Done" }),
    ).toContainText("Mar 2023");
    await expect(
      demo.getByText("Shipped the release", { exact: true }),
    ).toBeVisible();
  });

  test("timeline items have distinctive status indicators", async ({ page }) => {
    const demo = page.getByTestId("timeline-variants");
    // Each status label should be visible.
    for (const status of ["Planned", "In Progress", "Done"]) {
      await expect(demo.getByText(status, { exact: true })).toBeVisible();
    }
  });
});
