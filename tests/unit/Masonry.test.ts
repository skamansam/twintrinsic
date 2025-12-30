import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Masonry from "../../src/lib/components/Masonry/Masonry.svelte"

describe("Masonry", () => {
  it("renders masonry container", () => {
    const { container } = render(Masonry, {
      props: {
        children: () => "Masonry",
      },
    })
    expect(container.querySelector(".masonry")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Masonry, {
      props: {
        children: () => "Masonry content",
      },
    })
    expect(container.textContent).toContain("Masonry content")
  })

  it("applies column count", () => {
    const { container } = render(Masonry, {
      props: {
        columns: 3,
        children: () => "Masonry",
      },
    })
    const masonry = container.querySelector(".masonry")
    expect(masonry).toBeTruthy()
  })
})
