import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Carousel from "../../src/lib/components/Carousel/Carousel.svelte"

describe("Carousel", () => {
  it("renders carousel container", () => {
    const { container } = render(Carousel, {
      props: {
        children: () => "Carousel",
      },
    })
    expect(container.querySelector(".carousel")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Carousel, {
      props: {
        children: () => "Slide content",
      },
    })
    expect(container.textContent).toContain("Slide content")
  })
})
