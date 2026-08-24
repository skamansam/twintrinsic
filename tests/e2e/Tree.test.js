import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Tree component.
 *
 * Targets `/docs/components/Tree/Tree`. The Tree renders `role="tree"` with
 * `role="treeitem"` nodes (name-matched loosely via regex because the toggle
 * button's "Expand"/"Collapse" label can contribute to the accessible name).
 * Each example exposes a data-testid (tree-basic, tree-icons, tree-selectable,
 * tree-multiselect, tree-lines, tree-expanded).
 */
test.describe("Tree docs page", () => {
  test("basic tree renders collapsed nodes and expands on demand", async ({ page }) => {
    await page.goto("/docs/components/Tree/Tree");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-basic").getByRole("tree");
    await expect(tree).toBeVisible();

    const root = tree.getByRole("treeitem", { name: /Acme Website/ });
    await expect(root).toHaveAttribute("aria-expanded", "false");

    // Children are collapsed by default.
    await expect(tree.getByText("Pages")).not.toBeVisible();

    // Expanding the root reveals its children.
    await tree.getByRole("button", { name: "Expand" }).click();
    await expect(root).toHaveAttribute("aria-expanded", "true");
    await expect(tree.getByText("Pages")).toBeVisible();
    await expect(tree.getByText("Blog")).toBeVisible();

    // Collapse again hides them.
    await tree.getByRole("button", { name: "Collapse" }).click();
    await expect(tree.getByText("Pages")).not.toBeVisible();
  });

  test("expanded-by-default tree shows grandchildren immediately", async ({ page }) => {
    await page.goto("/docs/components/Tree/Tree");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-expanded").getByRole("tree");
    await expect(tree.getByText("Home")).toBeVisible();
    await expect(tree.getByText("About")).toBeVisible();
    await expect(tree.getByText("Contact")).toBeVisible();
    // Expanded node has no Expand button; collapsed nodes do.
    await expect(tree.getByRole("button", { name: /Expand|Collapse/ })).toBeVisible();
  });

  test("selectable tree marks the clicked node selected", async ({ page }) => {
    await page.goto("/docs/components/Tree/Tree");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-selectable").getByRole("tree");
    await expect(tree).toBeVisible();

    // Click the root node's label to select it (clicking the toggle would expand).
    const root = tree.getByRole("treeitem", { name: /Acme Website/ });
    await tree.getByText("Acme Website").click();
    await expect(root).toHaveAttribute("aria-selected", "true");

    // Expand and select a child node.
    await tree.getByRole("button", { name: "Expand" }).click();
    await tree.getByText("Pages").click();
    await expect(tree.getByRole("treeitem", { name: /Pages/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test.skip("multi-select tree tracks multiple selected nodes", async ({ page }) => {
    await page.goto("/docs/components/Tree/Tree");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-multiselect").getByRole("tree");
    await expect(tree).toHaveAttribute("aria-multiselectable", "true");

    // Expand the root, then select two siblings.
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

  test("tree supports keyboard expansion and selection", async ({ page }) => {
    await page.goto("/docs/components/Tree/Tree");
    await waitForHydration(page);

    const tree = page.getByTestId("tree-selectable").getByRole("tree");
    const root = tree.getByRole("treeitem", { name: /Acme Website/ });

    // ArrowRight expands the focused node.
    await root.focus();
    await page.keyboard.press("ArrowRight");
    await expect(root).toHaveAttribute("aria-expanded", "true");
    await expect(tree.getByText("Pages")).toBeVisible();

    // Space selects the focused node.
    await page.keyboard.press(" ");
    await expect(root).toHaveAttribute("aria-selected", "true");
  });
});
