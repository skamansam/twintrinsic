import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Menu from "../../src/lib/components/Menu/Menu.svelte"

describe("Menu", () => {
  it("renders menu container", () => {
    const { container } = render(Menu, {
      props: {
        children: () => "Items",
      },
    })
    expect(container.querySelector(".menu")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Menu, {
      props: {
        children: () => "Menu content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
