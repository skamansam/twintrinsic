import { fireEvent, render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import BottomBarHarness from "./helpers/BottomBarHarness.svelte"

/**
 * BottomBar is a panel docked to the bottom of its container. In static
 * mode visibility is prop-driven (expanded prop toggles a slide class);
 * in collapsible mode the header toggles the bar and a small handle
 * slides it back in. Tests cover the static/class contract, the
 * collapsible toggle flow, and the Escape key.
 */
describe("BottomBar", () => {
  it("renders the bar expanded with header and content by default", () => {
    const { getByRole, getByText } = render(BottomBarHarness)

    expect(getByRole("region")).toHaveClass("bottombar-expanded")
    expect(getByText("Details")).toBeInTheDocument()
    expect(getByText("Bar body content")).toBeInTheDocument()
  })

  it("labels the region via aria-labelledby pointing at the header (static mode)", () => {
    const { getByRole } = render(BottomBarHarness)
    const region = getByRole("region")

    // Regression guard: aria-labelledby must reference a real element id
    // (it previously held a literal '{id}-header' string that never
    // interpolated, leaving a dangling ARIA reference).
    const labelledBy = region.getAttribute("aria-labelledby")
    expect(labelledBy).toBeTruthy()
    expect(document.getElementById(labelledBy!)).toHaveTextContent("Details")
  })

  it("applies the collapsed class when expanded=false in static mode", () => {
    const { getByRole } = render(BottomBarHarness, { props: { expanded: false } })

    expect(getByRole("region")).toHaveClass("bottombar-collapsed")
  })

  it("propagates Panel toggles through ontoggle and shows the handle when collapsed", async () => {
    const ontoggle = vi.fn()
    const { getByRole, queryByRole } = render(
      BottomBarHarness,
      { props: { collapsible: true, ontoggle } },
    )

    await fireEvent.click(getByRole("button", { name: "Details" }))

    expect(ontoggle).toHaveBeenCalledWith({ expanded: false })
    expect(queryByRole("button", { name: "Expand bottom bar" })).toBeInTheDocument()
  })

  it("re-expands from the collapsed handle", async () => {
    const ontoggle = vi.fn()
    const { getByRole, queryByRole } = render(
      BottomBarHarness,
      { props: { collapsible: true, ontoggle } },
    )

    await fireEvent.click(getByRole("button", { name: "Details" }))
    await fireEvent.click(getByRole("button", { name: "Expand bottom bar" }))

    expect(ontoggle).toHaveBeenLastCalledWith({ expanded: true })
    expect(queryByRole("button", { name: "Expand bottom bar" })).not.toBeInTheDocument()
  })

  it("collapses a collapsible bar on Escape", async () => {
    const ontoggle = vi.fn()
    const { getByRole } = render(BottomBarHarness, { props: { collapsible: true, ontoggle } })

    await fireEvent.keyDown(window, { key: "Escape" })

    expect(ontoggle).toHaveBeenCalledWith({ expanded: false })
    expect(getByRole("button", { name: "Expand bottom bar" })).toBeInTheDocument()
  })

  it("ignores Escape in static (non-collapsible) mode", async () => {
    const ontoggle = vi.fn()
    const { getByRole } = render(BottomBarHarness, { props: { ontoggle } })

    await fireEvent.keyDown(window, { key: "Escape" })

    expect(ontoggle).not.toHaveBeenCalled()
    expect(getByRole("region")).toHaveClass("bottombar-expanded")
  })

  it("does not re-expand from the handle when disabled", async () => {
    const ontoggle = vi.fn()
    const { getByRole } = render(
      BottomBarHarness,
      { props: { collapsible: true, expanded: false, disabled: true, ontoggle } },
    )

    await fireEvent.click(getByRole("button", { name: "Expand bottom bar" }))

    expect(ontoggle).not.toHaveBeenCalled()
  })
})
