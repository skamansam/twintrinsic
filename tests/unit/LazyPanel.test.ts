import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import LazyPanel from "../../src/lib/components/Lazy/LazyPanel.svelte"

describe("LazyPanel", () => {
  it("renders lazy panel container", () => {
    const { container } = render(LazyPanel, {
      props: {
        placeholder: () => "Loading",
        children: () => "Content",
      },
    })
    expect(container.querySelector(".lazy-panel")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(LazyPanel, {
      props: {
        placeholder: () => "Loading",
        children: () => "Panel content",
      },
    })
    expect(container.textContent).toContain("Panel content")
  })
})
