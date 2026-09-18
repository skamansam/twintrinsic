import { render, waitFor } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import MasonryHarness from "./helpers/MasonryHarness.svelte";

/**
 * Masonry positions its immediate children absolutely inside a grid
 * container (jsdom has no layout, so we assert the style contract, not
 * pixel math). A MutationObserver picks up dynamically added children
 * and positions them too.
 */
describe("Masonry", () => {
  it("renders a labelled grid container", () => {
    const { getByRole } = render(MasonryHarness, { props: { ariaLabel: "Photo gallery" } });

    expect(getByRole("grid", { name: "Photo gallery" })).toBeInTheDocument();
  });

  it("absolutely positions its children on mount", async () => {
    const { getByTestId } = render(MasonryHarness, { props: { count: 2 } });

    await waitFor(() => {
      const first = getByTestId("masonry-item-0") as HTMLElement;
      expect(first.style.position).toBe("absolute");
    });

    // All items carry the absolute-position contract
    const second = getByTestId("masonry-item-1") as HTMLElement;
    expect(second.style.position).toBe("absolute");
  });

  it("positions dynamically added children via its MutationObserver", async () => {
    const { getByRole } = render(MasonryHarness, { props: { count: 2 } });
    const container = getByRole("grid");

    const extra = document.createElement("div");
    extra.dataset.testid = "masonry-item-extra";
    container.appendChild(extra);

    await waitFor(() => {
      expect((extra as HTMLElement).style.position).toBe("absolute");
    });
  });

  it("recomputes the container height after layout", async () => {
    const { getByRole } = render(MasonryHarness);
    const container = getByRole("grid") as HTMLElement;

    // The container height style is always set (0 in jsdom, which has no
    // layout engine — the assertion pins that the code path ran).
    await waitFor(() => expect(container.style.height).not.toBe(""));
  });
});
