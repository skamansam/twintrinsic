import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the TreeNode component.
 *
 * Targets `/docs/components/Tree/TreeNode`. TreeNode renders individual
 * tree nodes with expand/collapse, selection, keyboard navigation, and
 * disabled state support.
 */
test.describe("TreeNode docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Tree/TreeNode");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "TreeNode", level: 1 })).toBeVisible();
  });

  test("basic tree renders collapsed nodes", async ({ page }) => {
    const tree = page.getByTestId("tree-node-basic").getByRole("tree");
    await expect(tree).toBeVisible();
    const treeitems = tree.getByRole("treeitem");
    const count = await treeitems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("expanded tree shows nested content immediately", async ({ page }) => {
    // The "Expanded and Selected" example has Documents already expanded
    const tree = page.getByTestId("tree-node-states").getByRole("tree");
    await expect(tree).toBeVisible();

    // Documents is expanded, so its children should be visible
    await expect(tree.getByRole("treeitem", { name: /Invoices/ })).toBeVisible();
    await expect(tree.getByRole("treeitem", { name: /Reports/ })).toBeVisible();
  });

  test("tree uses proper ARIA tree pattern", async ({ page }) => {
    const tree = page.getByTestId("tree-node-basic").getByRole("tree");
    await expect(tree).toHaveAttribute("role", "tree");
    const treeitems = tree.getByRole("treeitem");
    expect(await treeitems.count()).toBeGreaterThanOrEqual(1);
  });

  test("disabled nodes page renders the tree-node-disabled example", async ({ page }) => {
    const tree = page.getByTestId("tree-node-disabled");
    await expect(tree).toBeVisible();
    // The tree should contain treeitems
    const treeitems = tree.locator("[role='treeitem']");
    const count = await treeitems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("expanded tree has aria-expanded on parent nodes", async ({ page }) => {
    const tree = page.getByTestId("tree-node-states").getByRole("tree");
    const expanded = tree.getByRole("treeitem", { expanded: true });
    const count = await expanded.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("basic tree has unexpanded parent nodes", async ({ page }) => {
    const tree = page.getByTestId("tree-node-basic").getByRole("tree");
    // Projects is a parent that starts collapsed
    const collapsed = tree.getByRole("treeitem", { expanded: false });
    const count = await collapsed.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("icons example renders TreeNode elements", async ({ page }) => {
    const icons = page.getByTestId("tree-node-icons");
    await expect(icons).toBeVisible();
    // The icons example renders TreeNode components (may or may not be inside a Tree)
    const text = await icons.textContent();
    expect(text).toContain("Folder");
  });
});
