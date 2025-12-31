import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Lazy from "../../src/lib/components/Lazy/Lazy.svelte"

describe("Lazy", () => {
  it("renders lazy container", () => {
    const { container } = render(Lazy, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.querySelector(".lazy")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Lazy, {
      props: {
        children: () => "Lazy content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
