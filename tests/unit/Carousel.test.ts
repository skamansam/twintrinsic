import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Carousel from "../../src/lib/components/Carousel/Carousel.svelte"

describe("Carousel", () => {
  it("renders carousel container", () => {
    const { container } = render(Carousel, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Carousel, {
      props: {
        children: () => "Carousel content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
