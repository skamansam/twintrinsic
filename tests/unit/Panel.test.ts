import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Panel from "../../src/lib/components/Panel/Panel.svelte"

describe("Panel", () => {
  it("renders panel container", () => {
    const { container } = render(Panel, {
      props: {
        children: () => "Panel content",
      },
    })
    expect(container.querySelector(".panel")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Panel, {
      props: {
        children: () => "Panel content",
      },
    })
    expect(container.textContent).toContain("Panel content")
  })
})
