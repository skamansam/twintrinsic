import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Tag / TagGroup components.
 *
 * Targets `/docs/components/Tag/Tag` and `/docs/components/Tag/TagGroup`.
 * Verifies dismiss buttons, clickable/link tags, and the TagGroup `role="group"`.
 */
test.describe("Tag docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Tag/Tag");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Tag", level: 1 })).toBeVisible();
    await expect(page.getByTestId("tag-basic")).toBeVisible();
    await expect(page.getByTestId("tag-sizes")).toBeVisible();
  });

  test("dismissible tags expose an aria-labeled dismiss button", async ({ page }) => {
    const dismissible = page.getByTestId("tag-dismissible");
    await expect(dismissible.getByRole("button", { name: "Dismiss" })).toHaveCount(2);
  });

  test("clickable tags render as buttons and links render as anchors", async ({ page }) => {
    const clickable = page.getByTestId("tag-clickable");
    await expect(clickable.getByRole("button", { name: "Clickable" })).toBeVisible();
    await expect(clickable.getByRole("button", { name: "Primary" })).toBeVisible();
    const link = clickable.getByRole("link", { name: "Link" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("tag group exposes the group role and renders items", async ({ page }) => {
    await page.goto("/docs/components/Tag/TagGroup");
    await waitForHydration(page);
    const group = page.getByTestId("tag-group");
    const groupRole = group.getByRole("group");
    await expect(groupRole).toBeVisible();
    for (const name of ["Design", "Development", "Marketing"]) {
      await expect(groupRole.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("dynamic tag group renders the item template", async ({ page }) => {
    await page.goto("/docs/components/Tag/TagGroup");
    await waitForHydration(page);
    const dynamic = page.getByTestId("tag-group-dynamic");
    const groupRole = dynamic.getByRole("group");
    await expect(groupRole).toBeVisible();
    await expect(groupRole.getByText("React")).toBeVisible();
  });
});
