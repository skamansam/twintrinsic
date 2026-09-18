import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Tab from "../../src/lib/components/Tabs/Tab.svelte";
import TabsHarness from "./helpers/TabsHarness.svelte";

/**
 * Tab is tested through the TabsHarness (Tab needs the tabs context to
 * register itself). Covers the outside-context throw contract,
 * registration/ARIA, click selection, the disabled tab, and
 * roving-tabindex keyboard navigation.
 */
describe("Tab", () => {
  it("throws when rendered outside a Tabs component", () => {
    expect(() => render(Tab)).toThrow(/Tab must be used within a Tabs component/);
  });

  it("registers tabs with role=tab, aria-selected, and aria-controls", () => {
    const { getByRole } = render(TabsHarness);

    const first = getByRole("tab", { name: "First" });
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(first).toHaveAttribute("aria-controls");
    expect(getByRole("tab", { name: "Second" })).toHaveAttribute("aria-selected", "false");
    expect(getByRole("tablist")).toBeInTheDocument();
  });

  it("selects a tab on click and switches the visible panel", async () => {
    const onchange = vi.fn();
    const { getByRole, getByText } = render(TabsHarness, { props: { onchange } });

    await fireEvent.click(getByRole("tab", { name: "Second" }));

    expect(getByRole("tab", { name: "Second" })).toHaveAttribute("aria-selected", "true");
    expect(getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "false");
    expect(getByText("Second panel content")).toBeVisible();
    expect(onchange).toHaveBeenCalledTimes(1);
    expect(onchange.mock.calls[0][0].detail.index).toBe(1);
  });

  it("ignores clicks on a disabled tab", async () => {
    const onchange = vi.fn();
    const { getByRole } = render(TabsHarness, { props: { onchange } });

    await fireEvent.click(getByRole("tab", { name: "Disabled" }));

    expect(getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
    expect(onchange).not.toHaveBeenCalled();
  });

  it("implements roving tabindex and arrow-key navigation", async () => {
    const { getByRole } = render(TabsHarness);
    const first = getByRole("tab", { name: "First" });
    const second = getByRole("tab", { name: "Second" });

    expect(first).toHaveAttribute("tabindex", "0");
    expect(second).toHaveAttribute("tabindex", "-1");

    await fireEvent.keyDown(first, { key: "ArrowRight" });

    expect(second).toHaveAttribute("aria-selected", "true");
    expect(second).toHaveAttribute("tabindex", "0");
    expect(document.activeElement).toBe(second);
  });

  it("disables all tab interaction when the Tabs component is disabled", async () => {
    const { getByRole } = render(TabsHarness, { props: { disabled: true } });

    await fireEvent.click(getByRole("tab", { name: "Second" }));

    expect(getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
  });
});
