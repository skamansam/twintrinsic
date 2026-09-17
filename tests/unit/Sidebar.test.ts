import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import SidebarHarness from "./helpers/SidebarHarness.svelte"

/**
 * Sidebar is a complementary landmark whose visibility is prop-driven
 * (hidden on mobile unless visible), optionally titled, and able to
 * render a TreeMenu from the `menu` prop. The old placeholder claimed
 * the component needed element.animate — it doesn't (CSS transitions
 * only), so these are straightforward render tests.
 */
describe("Sidebar", () => {
  it("renders a complementary landmark with the accessible label and content", () => {
    const { getByRole, getByTestId } = render(
      SidebarHarness,
      { props: { ariaLabel: "Main navigation" } },
    )

    expect(getByRole("complementary", { name: "Main navigation" })).toBeInTheDocument()
    expect(getByTestId("sidebar-body")).toBeInTheDocument()
  })

  it("starts hidden by default and becomes visible with the visible prop", () => {
    const { getByRole, rerender } = render(SidebarHarness, { props: { ariaLabel: "Nav" } })

    const aside = getByRole("complementary")
    expect(aside).toHaveClass("sidebar-hidden")

    rerender({ ariaLabel: "Nav", visible: true })
    expect(aside).toHaveClass("sidebar-visible")
  })

  it("renders the title as a labelled heading when provided", () => {
    const { getByRole } = render(SidebarHarness, { props: { title: "Library" } })

    const aside = getByRole("complementary")
    const labelledBy = aside.querySelector(".sidebar")?.getAttribute("aria-labelledby")
    expect(labelledBy).toBeTruthy()
    expect(document.getElementById(labelledBy!)).toHaveTextContent("Library")
  })

  it("renders menu items as links through TreeMenu when menu is provided", () => {
    const { getByText } = render(
      SidebarHarness,
      {
        props: {
          menu: [
            { title: "Home", link: "/" },
            { title: "Docs", link: "/docs" },
          ],
        },
      },
    )

    // TreeMenu renders <a role="menuitem">, so query the anchors directly
    // rather than by implicit link role.
    expect(getByText("Home").closest("a")).toHaveAttribute("href", "/")
    expect(getByText("Docs").closest("a")).toHaveAttribute("href", "/docs")
  })

  it("renders on the right side when position=right", () => {
    const { getByRole } = render(SidebarHarness, { props: { position: "right" } })

    expect(getByRole("complementary")).toHaveClass("sidebar-right")
  })
})
