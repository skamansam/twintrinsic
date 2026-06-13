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

  it("sets tabindex=0 on the menuitem for a11y", () => {
    render(MenuItem, { props: defaultProps })
    const item = screen.getByRole("menuitem")
    expect(item.getAttribute("tabindex")).toBe("0")
  })
})
