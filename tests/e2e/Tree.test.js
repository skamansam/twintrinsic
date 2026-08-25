import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for Tree.
 *
 * Targets `/docs/components/Tree/Tree`. The Tree renders `role="tree"` with
 * `role="treeitem"` nodes. Each example exposes a data-testid (tree-basic,
 * tree-icons, tree-selectable, tree-multiselect, tree-lines, tree-expanded).
 */
test.describe("Tree docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Tree/Tree");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Tree", level: 1 })).toBeVisible();
  });

  test("basic tree renders with role=tree", async ({ page }) => {
    const tree = page.getByTestId("tree-basic").getByRole("tree");
    await expect(tree).toBeVisible();
    await expect(tree).toHaveAttribute("role", "tree");
  });

  test("basic tree renders collapsed nodes and expands on demand", async ({ page }) => {
    const tree = page.getByTestId("tree-basic").getByRole("tree");
    const root = tree.getByRole("treeitem", { name: /Acme Website/ });
    await expect(root).toHaveAttribute("aria-expanded", "false");

    await expect(tree.getByText("Pages")).not.toBeVisible();

    await tree.getByRole("button", { name: "Expand" }).click();
    await expect(root).toHaveAttribute("aria-expanded", "true");
    await expect(tree.getByText("Pages")).toBeVisible();
    await expect(tree.getByText("Blog")).toBeVisible();

    await tree.getByRole("button", { name: "Collapse" }).click();
    await expect(tree.getByText("Pages")).not.toBeVisible();
  });

  test("expanded-by-default tree shows grandchildren immediately", async ({ page }) => {
    const tree = page.getByTestId("tree-expanded").getByRole("tree");
    await expect(tree.getByText("Home")).toBeVisible();
    await expect(tree.getByText("About")).toBeVisible();
    await expect(tree.getByText("Contact")).toBeVisible();
    await expect(tree.getByRole("button", { name: /Expand|Collapse/ })).toBeVisible();
  });

  test("selectable tree marks the clicked node selected", async ({ page }) => {
    const tree = page.getByTestId("tree-selectable").getByRole("tree");
    const root = tree.getByRole("treeitem", { name: /Acme Website/ });

    await tree.getByText("Acme Website").click();
    await expect(root).toHaveAttribute("aria-selected", "true");

    await tree.getByRole("button", { name: "Expand" }).click();
    await tree.getByText("Pages").click();
    await expect(tree.getByRole("treeitem", { name: /Pages/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test.skip("multi-select tree tracks multiple selected nodes", async ({ page }) => {
    const tree = page.getByTestId("tree-multiselect").getByRole("tree");
    await expect(tree).toHaveAttribute("aria-multiselectable", "true");

    await tree.getByRole("button", { name: "Expand" }).click();
    await tree.getByText("Pages").click();
    await tree.getByText("Blog").click();

    await expect(tree.getByRole("treeitem", { name: /Pages/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(tree.getByRole("treeitem", { name: /Blog/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("tree supports keyboard expansion (ArrowRight) and collapse (ArrowLeft)", async ({
    page,
  }) => {
    const tree = page.getByTestId("tree-selectable").getByRole("tree");
    const root = tree.getByRole("treeitem", { name: /Acme Website/ });

    await root.focus();
    await page.keyboard.press("ArrowRight");
    await expect(root).toHaveAttribute("aria-expanded", "true");
    await expect(tree.getByText("Pages")).toBeVisible();

    await page.keyboard.press("ArrowLeft");
    await expect(root).toHaveAttribute("aria-expanded", "false");
    await expect(tree.getByText("Pages")).not.toBeVisible();
  });

  test("Space selects the focused node", async ({ page }) => {
    const tree = page.getByTestId("tree-selectable").getByRole("tree");
    const root = tree.getByRole("treeitem", { name: /Acme Website/ });

    await root.focus();
    await page.keyboard.press(" ");
    await expect(root).toHaveAttribute("aria-selected", "true");
  });

  test("ArrowRight also expands the focused node", async ({ page }) => {
    const tree = page.getByTestId("tree-basic").getByRole("tree");
    const root = tree.getByRole("treeitem", { name: /Acme Website/ });

    await root.focus();
    // ArrowRight expands.
    await page.keyboard.press("ArrowRight");
    await expect(root).toHaveAttribute("aria-expanded", "true");
  });

  test("each treeitem has role=treeitem", async ({ page }) => {
    const tree = page.getByTestId("tree-basic").getByRole("tree");
    const items = tree.getByRole("treeitem");
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveAttribute("role", "treeitem");
    }
  });

  test("expand/collapse buttons are keyboard focusable", async ({ page }) => {
    const tree = page.getByTestId("tree-basic").getByRole("tree");
    const expandBtn = tree.getByRole("button", { name: "Expand" });

    await expandBtn.focus();
    await expect(expandBtn).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(tree.getByText("Pages")).toBeVisible();
  });

  test("tree supports multiple tree instances on the same page", async ({ page }) => {
    // The page has multiple tree examples; verify at least 2 exist.
    const trees = page.locator("[role='tree']");
    const count = await trees.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
