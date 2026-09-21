/**
 * E2E coverage for the Kanban board example (/docs/examples/kanban).
 *
 * The page embeds two KanbanBoard demos — a Google-Calendar-style week
 * view (temporal) and a Jira-style sprint board (stacked) — pinned to
 * September 2026 so the assertions stay stable regardless of run date.
 * Covers rendering, per-column ticks, overlapping lanes, spanning cards,
 * drag and drop (HTML5 events), the keyboard alternative, and the
 * add/reset controls that show the consumer-owned state pattern.
 */
import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

test.describe("kanban example page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/examples/kanban");
    await waitForHydration(page);
  });

  test("renders both demos with their boards", async ({ page }) => {
    const week = page.getByTestId("kanban-week-demo");
    const sprint = page.getByTestId("kanban-sprint-demo");
    await expect(week.getByTestId("kanban-board")).toHaveAttribute("data-positioning", "temporal");
    await expect(sprint.getByTestId("kanban-board")).toHaveAttribute("data-positioning", "stacked");
  });

  test("temporal board renders the hour ruler and day columns", async ({ page }) => {
    const week = page.getByTestId("kanban-week-demo");
    await expect(week.getByTestId("kanban-ruler")).toBeVisible();
    for (const day of ["2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18"]) {
      await expect(week.getByTestId(`kanban-column-${day}`)).toBeVisible();
    }
    // Labeled ruler ticks (9 AM, 11 AM, 1 PM, 3 PM, 5 PM).
    await expect(week.locator(".kanban-ruler-label")).toHaveCount(5);
  });

  test("overlapping cards sit in side-by-side lanes on Tuesday", async ({ page }) => {
    const tuesday = page.getByTestId("kanban-week-demo").getByTestId("kanban-column-2026-09-15");
    const review = tuesday.getByTestId("kanban-card-wk-review");
    const offsite = tuesday.getByTestId("kanban-card-wk-offsite");
    await expect(review).toBeVisible();
    await expect(offsite).toBeVisible();
    // Lane 1 vs lane 2 via the --lane custom property.
    await expect(review).toHaveAttribute("style", /--lane: 1/);
    await expect(offsite).toHaveAttribute("style", /--lane: 2/);
  });

  test("the release window spans Thursday → Friday with a continuation marker", async ({
    page,
  }) => {
    const week = page.getByTestId("kanban-week-demo");
    const card = week.getByTestId("kanban-card-wk-deploy");
    // One element owning grid-column lines 5/7 (0-based 3..4 + gutter track).
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("style", /grid-column: 5 \/ 7/);
    // Friday shows the continuation marker, not a second card.
    await expect(week.getByTestId("kanban-continuation-wk-deploy")).toBeVisible();
  });

  test("temporal cards carry their tick positions", async ({ page }) => {
    const card = page.getByTestId("kanban-week-demo").getByTestId("kanban-card-wk-plan");
    // Sprint planning 9→10.5 on a 9→17 axis: top 0%, height 18.75%.
    await expect(card).toHaveAttribute("style", /top: 0%/);
    await expect(card).toHaveAttribute("style", /height: 18\.75%/);
  });

  test("temporal cards expose resize handles and resize commits on pointer up", async ({
    page,
  }) => {
    const week = page.getByTestId("kanban-week-demo");
    const card = week.getByTestId("kanban-card-wk-plan");
    const handle = week.getByTestId("kanban-resize-end-wk-plan");
    await expect(handle).toBeVisible();
    // Pointer gesture: down on the end handle, drag ~1 tick down, release.
    const box = await card.boundingBox();
    const body = week.locator("[data-kanban-body]");
    const bodyBox = await body.boundingBox();
    const stepY = (bodyBox.height / 8) * 0.75; // three-quarters of an hour (snap target: 30-min half ticks)
    await page.mouse.move(box.x + box.width / 2, box.y + box.height - 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height + stepY, { steps: 4 });
    await page.mouse.up();
    // Sprint planning 9→10.5 becomes 9→11 on the half-tick snap.
    await expect(card).toHaveAttribute("style", /height: 25%/);
    // The card's inner button carries the accessible label; it reflects the new end time.
    await expect(card.locator(".kanban-card-body")).toHaveAttribute("aria-label", /at 9/);
  });

  test("the week demo shows the keyboard resize legend", async ({ page }) => {
    const week = page.getByTestId("kanban-week-demo");
    const legend = week.getByTestId("kanban-week-legend");
    await expect(legend).toBeVisible();
    // Three shortcuts: extend/shrink, Shift-trim, move between days.
    await expect(legend.locator("li")).toHaveCount(3);
    await expect(legend.locator("kbd").filter({ hasText: "Shift" })).toHaveCount(1);
  });

  test("dragging a card's end past the axis spills it into the next day", async ({ page }) => {
    const week = page.getByTestId("kanban-week-demo");
    const card = week.getByTestId("kanban-card-wk-offsite");
    const handle = week.getByTestId("kanban-resize-end-wk-offsite");
    await expect(handle).toBeVisible();
    const body = week.locator("[data-kanban-body]");
    await handle.scrollIntoViewIfNeeded();
    const bodyBox = await body.boundingBox();
    const hourY = bodyBox.height / 8; // 9→17 axis
    const handleBox = await handle.boundingBox();
    await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
    await page.mouse.down();
    // One full hour past the axis bottom → Wednesday 9→10.
    await page.mouse.move(handleBox.x + handleBox.width / 2, bodyBox.y + bodyBox.height + hourY, {
      steps: 6,
    });
    await expect(
      week.getByTestId("kanban-column-2026-09-16").getByTestId("kanban-spill-wk-offsite"),
    ).toBeVisible(); // live preview in Wednesday during the gesture
    await page.mouse.up();
    // Committed: the example persists the spill, so Wednesday keeps the
    // segment and the origin card clamps to Tuesday's bottom (14.5→17).
    await expect(
      week.getByTestId("kanban-column-2026-09-16").getByTestId("kanban-spill-wk-offsite"),
    ).toBeVisible();
    await expect(card).toHaveAttribute("style", /height: 31\.25%/);
  });

  test("drag and drop moves a week card between days (HTML5 DnD)", async ({ page }) => {
    const week = page.getByTestId("kanban-week-demo");
    const card = week.getByTestId("kanban-card-wk-1on1");
    const target = week.getByTestId("kanban-column-2026-09-16");
    const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
    await card.dispatchEvent("dragstart", { dataTransfer });
    await target.dispatchEvent("dragover", { dataTransfer });
    await expect(target.locator(".kanban-dropzone")).toHaveClass(/kanban-dropzone-active/);
    await target.dispatchEvent("drop", { dataTransfer });
    // The consumer-owned state re-renders the card in Wednesday.
    await expect(
      week.getByTestId("kanban-column-2026-09-16").getByTestId("kanban-card-wk-1on1"),
    ).toBeVisible();
    await expect(
      week.getByTestId("kanban-column-2026-09-14").getByTestId("kanban-card-wk-1on1"),
    ).toHaveCount(0);
  });

  test("keyboard alternative moves the activated card between columns", async ({ page }) => {
    const week = page.getByTestId("kanban-week-demo");
    const card = week.getByTestId("kanban-card-wk-talk");
    await card.click();
    await card.press("ArrowRight");
    await expect(
      week.getByTestId("kanban-column-2026-09-17").getByTestId("kanban-card-wk-talk"),
    ).toBeVisible();
  });

  test("sprint board stacks cards and renders the spanning release task", async ({ page }) => {
    const sprint = page.getByTestId("kanban-sprint-demo");
    await expect(sprint.getByTestId("kanban-card-sp-1")).toBeVisible();
    // The release task straddles Doing → Review in the overlay band (its own
    // body row, so it never covers stacked cards); no continuation marker in
    // stacked mode.
    const release = sprint.getByTestId("kanban-card-sp-release");
    await expect(release).toHaveAttribute("style", /grid-column: 3 \/ 5/);
    await expect(sprint.getByTestId("kanban-continuation-sp-release")).toHaveCount(0);
  });

  test("add card and reset manage consumer-owned state", async ({ page }) => {
    const sprint = page.getByTestId("kanban-sprint-demo");
    await sprint.getByTestId("kanban-add").click();
    await expect(sprint.getByTestId("kanban-card-sp-added-1")).toBeVisible();
    await sprint.getByTestId("kanban-reset").click();
    await expect(sprint.getByTestId("kanban-card-sp-added-1")).toHaveCount(0);
    await expect(sprint.getByTestId("kanban-card-sp-1")).toBeVisible();
  });

  test("completed cards are drag-locked via cardsDraggable", async ({ page }) => {
    const sprint = page.getByTestId("kanban-sprint-demo");
    await expect(sprint.getByTestId("kanban-card-sp-6")).toHaveAttribute("draggable", "false");
    await expect(sprint.getByTestId("kanban-card-sp-1")).toHaveAttribute("draggable", "true");
  });

  test("sprint board DnD fires oncardmove and updates the card's column", async ({ page }) => {
    const sprint = page.getByTestId("kanban-sprint-demo");
    const card = sprint.getByTestId("kanban-card-sp-3");
    const target = sprint.getByTestId("kanban-column-doing");
    const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
    await card.dispatchEvent("dragstart", { dataTransfer });
    await target.dispatchEvent("dragover", { dataTransfer });
    await target.dispatchEvent("drop", { dataTransfer });
    await expect(
      sprint.getByTestId("kanban-column-doing").getByTestId("kanban-card-sp-3"),
    ).toBeVisible();
    await expect(
      sprint.getByTestId("kanban-column-todo").getByTestId("kanban-card-sp-3"),
    ).toHaveCount(0);
  });
});
