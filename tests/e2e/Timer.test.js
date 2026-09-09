import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Timer component.
 *
 * Targets `/docs/components/Timer/Timer`. Selectors are scoped through the
 * `data-testid` hooks each example block exposes, and the live countdown /
 * count-up examples are asserted with short real-time waits (the component
 * ticks on a 100ms interval).
 */
test.describe("Timer docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Timer/Timer");
    await waitForHydration(page);
  });

  const readout = (page, block) => page.getByTestId(block).getByRole("timer");

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Timer", level: 1 })).toBeVisible();
    await expect(page.getByTestId("timer-countdown")).toBeVisible();
    await expect(page.getByTestId("timer-countup")).toBeVisible();
    await expect(page.getByTestId("timer-variants")).toBeVisible();
    await expect(page.getByTestId("timer-loop")).toBeVisible();
    await expect(page.getByTestId("timer-format")).toBeVisible();
    await expect(page.getByTestId("timer-no-controls")).toBeVisible();
  });

  test("the countdown shows a ticking MM:SS readout", async ({ page }) => {
    const timer = readout(page, "timer-countdown");
    await expect(timer).toHaveText(/^01:/);

    const before = await timer.textContent();
    await page.waitForTimeout(1300);
    const after = await timer.textContent();
    expect(after).not.toBe(before);
  });

  test("pause stops the countdown and resume restarts it", async ({ page }) => {
    const block = page.getByTestId("timer-countdown");

    await block.getByRole("button", { name: "Pause timer" }).click();
    const paused = await readout(page, "timer-countdown").textContent();
    await page.waitForTimeout(1300);
    expect(await readout(page, "timer-countdown").textContent()).toBe(paused);

    await block.getByRole("button", { name: "Resume timer" }).click();
    await page.waitForTimeout(1300);
    expect(await readout(page, "timer-countdown").textContent()).not.toBe(paused);
  });

  test("reset restores the countdown to its starting time", async ({ page }) => {
    const block = page.getByTestId("timer-countdown");
    await page.waitForTimeout(1200);

    await block.getByRole("button", { name: "Reset timer" }).click();
    await expect(readout(page, "timer-countdown")).toHaveText(/^01:/);
  });

  test("the count-up example increments from zero", async ({ page }) => {
    const timer = readout(page, "timer-countup");
    await expect(timer).toHaveText("00:00");

    await page.waitForTimeout(1300);
    const after = await timer.textContent();
    expect(after).not.toBe("00:00");
  });

  test("display variants render the bar, gauge, and KPI displays", async ({ page }) => {
    const variants = page.getByTestId("timer-variants");

    await expect(variants.getByRole("timer")).toHaveCount(3);
    // Bar variant -> native <progress>
    await expect(variants.locator("progress")).toHaveCount(1);
    // Gauge variant -> svg with a chart role
    await expect(variants.locator("svg")).toHaveCount(1);
    // KPI variant -> clickable card showing the labeled value vs target
    await expect(variants.getByText("Deploy")).toBeVisible();
    await expect(variants.getByRole("button", { name: /Deploy: 120 of 120/i })).toBeVisible();
  });

  test("the custom-format example uses the formatter", async ({ page }) => {
    await expect(readout(page, "timer-format")).toHaveText("30.0s");
  });

  test("the no-controls example exposes no control buttons", async ({ page }) => {
    const block = page.getByTestId("timer-no-controls");
    await expect(block.getByRole("button", { name: /pause|resume|reset/i })).toHaveCount(0);
  });

  test("the readout exposes role=timer for assistive tech", async ({ page }) => {
    const timer = readout(page, "timer-countdown");
    await expect(timer).toHaveAttribute("role", "timer");
  });
});
