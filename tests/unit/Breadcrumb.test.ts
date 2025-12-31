import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Breadcrumb from "../../src/lib/components/Breadcrumb/Breadcrumb.svelte"

describe("Breadcrumb", () => {
  it("renders breadcrumb container", () => {
    const { container } = render(Breadcrumb, {
      props: {
        children: () => "Home",
      },
    })
    expect(container.querySelector(".breadcrumb")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Breadcrumb, {
      props: {
        children: () => "Breadcrumb content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
