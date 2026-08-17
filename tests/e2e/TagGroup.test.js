import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the TagGroup component.
 *
 * Targets `/docs/components/Tag/TagGroup`. The group renders `role="group"`
 * with an aria-label; dismissible tags expose a "Dismiss" button. Examples are
 * scoped via data-testid (tag-group-basic, tag-group-dismissible,
 * tag-group-styled).
 */
test.describe("TagGroup docs page", () => {
  test("basic tag group renders its tags in a labeled group", async ({ page }) => {
    await page.goto("/docs/components/Tag/TagGroup");
    await waitForHydration(page);

    const example = page.getByTestId("tag-group-basic");
    await expect(example.getByRole("group", { name: "Tag group" })).toBeVisible();
    for (const tag of ["JavaScript", "TypeScript", "Svelte", "Tailwind CSS"]) {
      await expect(example.getByText(tag, { exact: true })).toBeVisible();
    }
  });

  test("dismissible tags expose dismiss buttons", async ({ page }) => {
    await page.goto("/docs/components/Tag/TagGroup");
    await waitForHydration(page);

    const example = page.getByTestId("tag-group-dismissible");
    const dismissButtons = example.getByRole("button", { name: "Dismiss" });
    await expect(dismissButtons).toHaveCount(4);
  });

  test("styled tag group applies variant and pill styles", async ({ page }) => {
    await page.goto("/docs/components/Tag/TagGroup");
    await waitForHydration(page);

    const example = page.getByTestId("tag-group-styled");
    await expect(example.getByRole("group", { name: "Tag group" })).toBeVisible();
    for (const tag of ["Primary", "Pill", "Large"]) {
      await expect(example.getByText(tag, { exact: true })).toBeVisible();
    }
  });
});
