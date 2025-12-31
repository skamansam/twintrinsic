import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import LazyPanel from "../../src/lib/components/Panel/LazyPanel.svelte"

describe("LazyPanel", () => {
  it("renders lazy panel container", () => {
    const { container } = render(LazyPanel, {
      props: {
        placeholder: "Loading...",
        children: () => "Content",
      },
    })
    expect(container.querySelector(".lazy-panel")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(LazyPanel, {
      props: {
        placeholder: "Loading...",
        children: () => "LazyPanel content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
