import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the CodeEditor component.
 *
 * Component-level behavior (themes, custom height, language support)
 * is covered by the Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live editor
 * examples (`data-testid="code-editor-*"` hooks) with a visible
 * CodeMirror editor wrapper.
 */
test.describe("CodeEditor docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/CodeEditor/CodeEditor");
    await waitForHydration(page);
  });

  test("renders the docs page with all editor examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "CodeEditor", level: 1 })).toBeVisible();
    for (const id of [
      "code-editor-javascript",
      "code-editor-python",
      "code-editor-html",
      "code-editor-one-dark",
      "code-editor-dracula",
    ]) {
      await expect(page.getByTestId(id).locator(".code-editor-wrapper")).toBeVisible();
    }
  });

  test("renders a CodeMirror editor with content", async ({ page }) => {
    const editor = page.getByTestId("code-editor-javascript").locator(".code-editor-wrapper");
    await expect(editor).toBeVisible();
    await expect(editor.locator(".cm-editor")).toBeVisible();
  });
});
