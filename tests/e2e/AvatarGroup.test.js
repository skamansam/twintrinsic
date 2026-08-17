import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site accessibility tests for the AvatarGroup component.
 *
 * Targets `/docs/components/Avatar/AvatarGroup`. The examples expose
 * `data-testid` wrappers (`avatargroup-basic`, `avatargroup-overflow`)
 * around `role="group"` containers.
 */
test.describe("AvatarGroup docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Avatar/AvatarGroup");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "AvatarGroup", level: 1 })).toBeVisible();
  });

  test("basic group renders a role=group with avatars", async ({ page }) => {
    const demo = page.getByTestId("avatargroup-basic");
    await expect(demo.getByRole("group")).toBeVisible();
    for (const name of ["John Doe", "Jane Smith", "Bob Johnson"]) {
      await expect(demo.getByLabel(name)).toBeVisible();
    }
  });

  test("overflow group shows the +N counter", async ({ page }) => {
    const demo = page.getByTestId("avatargroup-overflow");
    await expect(demo.getByRole("group")).toBeVisible();
    // max={3} total={10} → "+7" overflow counter.
    await expect(demo.getByText("+7", { exact: true })).toBeVisible();
  });
});
