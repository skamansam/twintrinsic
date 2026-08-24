import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the CodeBlockSpeed component.
 *
 * Component-level behavior (render-time badge, auto-detection) is
 * covered by the Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="codeblockspeed-*"` hooks) and that the code content,
 * language labels, and copy buttons are present.
 */
test.describe("CodeBlockSpeed docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/CodeBlockSpeed/CodeBlockSpeed");
    await waitForHydration(page);
  });

  test("renders the docs page with all language examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "CodeBlockSpeed", level: 1 })).toBeVisible();
    for (const id of [
      "codeblockspeed-js",
      "codeblockspeed-ts",
      "codeblockspeed-python",
      "codeblockspeed-render-time",
      "codeblockspeed-auto-detect",
    ]) {
      // The data-testid lands on the component root via elementProps
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("renders the language label", async ({ page }) => {
    const langLabel = page.getByTestId("codeblockspeed-js").locator(".code-language");
    await expect(langLabel).toContainText("js");
  });

  test("renders the highlighted code content", async ({ page }) => {
    const codeBlock = page.getByTestId("codeblockspeed-js");
    await expect(codeBlock).toContainText("fibonacci");
  });

  test("exposes a copy button", async ({ page }) => {
    await expect(page.getByTestId("codeblockspeed-js").locator(".code-copy")).toBeVisible();
  });

  test("auto-detect example renders without an explicit language", async ({ page }) => {
    const codeBlock = page.getByTestId("codeblockspeed-auto-detect");
    await expect(codeBlock).toContainText("Hello, Speed Highlight!");
  });
});
