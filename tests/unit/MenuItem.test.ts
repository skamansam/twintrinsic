import { render, screen } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import MenuItem from "../../src/lib/components/Menu/Menu/MenuItem.svelte"

describe("MenuItem", () => {
  const defaultProps = {
    children: () => "Item text",
  }

  it("renders with default props", () => {
    render(MenuItem, { props: defaultProps })
    expect(screen.getByRole("menuitem")).toBeTruthy()
  })

  it("sets tabindex=-1 on the menuitem (only one item is tabbable per WAI-ARIA)", () => {
    render(MenuItem, { props: defaultProps })
    const item = screen.getByRole("menuitem")
    expect(item.getAttribute("tabindex")).toBe("-1")
  })

  it("wraps in a li element with role=none", () => {
    const { container } = render(MenuItem, { props: defaultProps })
    const li = container.querySelector('li[role="none"]')
    expect(li).toBeTruthy()
  })

  it("renders as anchor when href is provided", () => {
    render(MenuItem, { props: { ...defaultProps, href: "/page" } })
    const item = screen.getByRole("menuitem")
    expect(item.tagName).toBe("A")
    expect(item.getAttribute("href")).toBe("/page")
  })

  it("renders as span when no href", () => {
    render(MenuItem, { props: { ...defaultProps, href: "" } })
    const item = screen.getByRole("menuitem")
    expect(item.tagName).toBe("SPAN")
  })

  it("sets aria-disabled when disabled", () => {
    render(MenuItem, { props: { ...defaultProps, disabled: true } })
    const item = screen.getByRole("menuitem")
    expect(item.getAttribute("aria-disabled")).toBe("true")
  })

  it("applies active class", () => {
    const { container } = render(MenuItem, { props: { ...defaultProps, active: true } })
    const item = container.querySelector(".menu-item.active")
    expect(item).toBeTruthy()
  })

  it("applies divider class", () => {
    const { container } = render(MenuItem, { props: { ...defaultProps, divider: true } })
    const item = container.querySelector(".menu-item.divider")
    expect(item).toBeTruthy()
  })
})
