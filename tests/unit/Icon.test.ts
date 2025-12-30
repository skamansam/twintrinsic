import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Icon from "../../src/lib/components/Icon/Icon.svelte"

describe("Icon", () => {
  it("renders icon element", () => {
    const { container } = render(Icon, {
      props: {
        name: "star",
      },
    })
    expect(container.querySelector("svg")).toBeTruthy()
  })

  it("applies size class", () => {
    const { container } = render(Icon, {
      props: {
        name: "star",
        size: "lg",
      },
    })
    const icon = container.querySelector("svg")
    expect(icon?.className).toContain("lg")
  })

  it("applies color class", () => {
    const { container } = render(Icon, {
      props: {
        name: "star",
        color: "primary",
      },
    })
    const icon = container.querySelector("svg")
    expect(icon?.className).toContain("primary")
  })
})
