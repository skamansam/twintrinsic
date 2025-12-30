import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Lazy from "../../src/lib/components/Lazy/Lazy.svelte"

describe("Lazy", () => {
  it("renders lazy container", () => {
    const { container } = render(Lazy, {
      props: {
        children: () => "Lazy content",
      },
    })
    expect(container.querySelector(".lazy")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Lazy, {
      props: {
        children: () => "Lazy loaded",
      },
    })
    expect(container.textContent).toContain("Lazy loaded")
  })
})
