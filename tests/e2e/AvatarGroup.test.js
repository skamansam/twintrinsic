import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site accessibility tests for AvatarGroup.
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
    await expect(
      page.getByRole("heading", { name: "AvatarGroup", level: 1 }),
    ).toBeVisible();
  });

  test("basic group renders a role=group with accessible avatars", async ({
    page,
  }) => {
    const demo = page.getByTestId("avatargroup-basic");
    const group = demo.getByRole("group");
    await expect(group).toBeVisible();
    await expect(group).toHaveAttribute("role", "group");

    for (const name of ["Sarah Chen", "Priya Patel", "Emma Lindqvist"]) {
      const avatar = demo.getByLabel(name);
      await expect(avatar).toBeVisible();
      // Each avatar has an aria-label for accessibility.
      await expect(avatar).toHaveAttribute("aria-label", name);
    }
  });

  test("overflow group shows the +N counter", async ({ page }) => {
    const demo = page.getByTestId("avatargroup-overflow");
    await expect(demo.getByRole("group")).toBeVisible();
    // max={3} total={10} → "+7" overflow counter.
    await expect(demo.getByText("+7", { exact: true })).toBeVisible();
  });

  test("overflow counter is visible to screen readers", async ({ page }) => {
    const demo = page.getByTestId("avatargroup-overflow");
    const counter = demo.getByText("+7", { exact: true });
    await expect(counter).toBeVisible();
    // The counter should not be aria-hidden since it conveys information.
    await expect(counter).not.toHaveAttribute("aria-hidden", "true");
  });

  test("group has an accessible label", async ({ page }) => {
    const demo = page.getByTestId("avatargroup-basic");
    const group = demo.getByRole("group");
    // The group should have an aria-label or aria-labelledby.
    const label = await group.getAttribute("aria-label");
    const labelledby = await group.getAttribute("aria-labelledby");
    // At least one should be present for proper a11y.
    expect(label || labelledby).toBeTruthy();
  });

  test("avatar elements have accessible labels", async ({ page }) => {
    const demo = page.getByTestId("avatargroup-basic");
    const avatars = demo.locator("[aria-label]");
    const count = await avatars.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const label = await avatars.nth(i).getAttribute("aria-label");
      expect(label && label.length > 0).toBe(true);
    }
  });
});
