import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import MenuItem from "../../src/lib/components/Menu/MenuItem.svelte"

describe("MenuItem", () => {
  it("renders menu item", () => {
    const { container } = render(MenuItem, {
      props: {
        children: () => "Item",
      },
    })
    expect(container.querySelector(".menu-item")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(MenuItem, {
      props: {
        children: () => "MenuItem content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
