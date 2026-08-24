import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the CodeBlock component.
 *
 * Component-level behavior (syntax-highlight token classes, copy
 * feedback, plugin loading, CDN sources) is covered by the Storybook
 * vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the many live
 * CodeBlock examples (one per language) with their copy buttons and
 * language labels.
 */
test.describe("CodeBlock docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/CodeBlock/CodeBlock");
    await waitForHydration(page);
  });

  test("renders the docs page with multiple code blocks", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "CodeBlock", level: 1 })).toBeVisible();

    const codeBlocks = page.locator(".code-block");
    await expect(codeBlocks.first()).toBeVisible();
    expect(await codeBlocks.count()).toBeGreaterThanOrEqual(4);
  });

  test("each code block renders highlighted code", async ({ page }) => {
    const code = page.locator(".code-block pre code").first();
    await expect(code).toBeVisible();
    await expect(code).toHaveClass(/language-/);
  });

  test("code blocks expose a copy button with a proper aria-label", async ({ page }) => {
    const copyButton = page.locator(".code-copy").first();
    await expect(copyButton).toBeVisible();
    await expect(copyButton).toHaveAttribute("aria-label", "Copy code");
  });

  test("renders the language label in the header", async ({ page }) => {
    const language = page.locator(".code-language").first();
    await expect(language).toBeVisible();
  });

  test("renders language-specific content", async ({ page }) => {
    await expect(
      page.locator(".code-block").filter({ hasText: "interface Person" }).first(),
    ).toBeVisible();
    await expect(
      page.locator(".code-block").filter({ hasText: "Hello, world!" }).first(),
    ).toBeVisible();
  });
});
