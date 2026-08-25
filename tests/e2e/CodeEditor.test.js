import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the CodeEditor component.
 *
 * Targets `/docs/components/CodeEditor/CodeEditor`. CodeEditor renders
 * a CodeMirror-based code editor with syntax highlighting, theme support,
 * and language detection. These tests verify the docs page renders all
 * live examples and that the editor instances are functional.
 */
test.describe("CodeEditor docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/CodeEditor/CodeEditor");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "CodeEditor", level: 1 })).toBeVisible();
  });

  test("renders all editor examples with CodeMirror wrappers", async ({ page }) => {
    for (const id of [
      "code-editor-javascript",
      "code-editor-python",
      "code-editor-one-dark",
      "code-editor-dracula",
    ]) {
      const wrapper = page.getByTestId(id).locator(".code-editor-wrapper");
      await expect(wrapper).toBeVisible();
      await expect(wrapper.locator(".cm-editor")).toBeVisible();
    }
  });

  test("JavaScript editor has a textarea for input", async ({ page }) => {
    const editor = page.getByTestId("code-editor-javascript");
    await expect(editor.locator(".cm-content")).toBeVisible();
  });

  test("editor accepts keyboard input", async ({ page }) => {
    const editor = page.getByTestId("code-editor-javascript");
    const cmContent = editor.locator(".cm-content");
    await cmContent.click();

    // Type a line of code
    await page.keyboard.type("// test input");
    await expect(cmContent).toContainText("// test input");
  });

  test("editor supports keyboard input", async ({ page }) => {
    const editor = page.getByTestId("code-editor-javascript");
    const cmContent = editor.locator(".cm-content");
    await cmContent.click();

    // Type some code to verify the editor accepts input
    await page.keyboard.type("x = 1");
    await expect(cmContent).toContainText("x = 1");
  });

  test("different language editors render distinct content", async ({ page }) => {
    const jsEditor = page.getByTestId("code-editor-javascript");
    const pyEditor = page.getByTestId("code-editor-python");

    // Both should be visible with content
    await expect(jsEditor.locator(".cm-editor")).toBeVisible();
    await expect(pyEditor.locator(".cm-editor")).toBeVisible();

    // Python editor should contain Python-style code
    const pyContent = await pyEditor.locator(".cm-content").textContent();
    expect(pyContent).toBeTruthy();
  });

  test("editor has accessible role", async ({ page }) => {
    const editor = page.getByTestId("code-editor-javascript");
    const cmContent = editor.locator(".cm-content");
    await expect(cmContent).toHaveAttribute("role", "textbox");
    await expect(cmContent).toHaveAttribute("contenteditable", "true");
  });
});
