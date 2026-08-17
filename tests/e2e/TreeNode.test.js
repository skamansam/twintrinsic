import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the TreeNode component.
 *
 * Targets `/docs/components/Tree/TreeNode`. Nodes render inside a
 * `role="tree"` as `role="treeitem"` (name-matched loosely via regex because
 * the toggle button's label contributes to the accessible name). Examples are
 * scoped via data-testid (tree-node-basic, tree-node-states, tree-node-icons,
 * tree-node-disabled).
 */
test.describe("TreeNode docs page", () => {
  test("basic nodes expand to reveal children", async ({ page }) => {
    await page.goto("/docs/components/Tree/TreeNode");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-node-basic").getByRole("tree");
    await expect(tree).toBeVisible();
    await expect(tree.getByRole("treeitem", { name: /Projects/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    // Children are collapsed by default.
    await expect(tree.getByText("Website")).not.toBeVisible();

    // Expanding reveals the children, nested nodes included.
    await tree.getByRole("button", { name: "Expand" }).click();
    await expect(tree.getByText("Website")).toBeVisible();
    await expect(tree.getByText("Mobile App")).toBeVisible();
    await expect(tree.getByText("iOS")).not.toBeVisible();
  });

  test("expanded and selected node props render their state", async ({ page }) => {
    await page.goto("/docs/components/Tree/TreeNode");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-node-states").getByRole("tree");
    // Documents is expanded, so its children are visible immediately.
    await expect(tree.getByText("Invoices")).toBeVisible();
    await expect(tree.getByRole("treeitem", { name: /Documents/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    // Invoices carries the selected prop (visual state on the node wrapper —
    // the tree is not selectable, so no aria-selected is set); Reports does not.
    const invoicesNode = tree.getByRole("treeitem", { name: /Invoices/ }).locator("..");
    const reportsNode = tree.getByRole("treeitem", { name: /Reports/ }).locator("..");
    await expect(invoicesNode).toHaveClass(/tree-node-selected/);
    await expect(reportsNode).not.toHaveClass(/tree-node-selected/);
  });

  test("nodes with icons render their custom icon", async ({ page }) => {
    await page.goto("/docs/components/Tree/TreeNode");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-node-icons").getByRole("tree");
    await tree.getByRole("button", { name: "Expand" }).click();
    await expect(tree.getByText("Notes.txt")).toBeVisible();
    await expect(tree.getByRole("treeitem", { name: /Notes.txt/ }).locator("svg")).toBeVisible();
  });

  test("disabled nodes expose aria-disabled", async ({ page }) => {
    await page.goto("/docs/components/Tree/TreeNode");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-node-disabled").getByRole("tree");
    await tree.getByRole("button", { name: "Expand" }).click();
    await expect(tree.getByRole("treeitem", { name: /Bob/ })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await expect(tree.getByRole("treeitem", { name: /Alice/ })).not.toHaveAttribute(
      "aria-disabled",
    );
  });
});
