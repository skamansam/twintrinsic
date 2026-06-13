import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Carousel from "../../src/lib/components/Carousel/Carousel.svelte"

describe("Carousel", () => {
  const defaultProps = {
    items: () => null,
  }

  it("renders with default props", () => {
    const { container } = render(Carousel, { props: defaultProps })
    expect(container.querySelector(".carousel")).toBeTruthy()
  })

  it("uses role=region with aria-roledescription=carousel for a11y", () => {
    const { container } = render(Carousel, { props: defaultProps })
    const region = container.querySelector('[role="region"]')
    expect(region).toBeTruthy()
    expect(region?.getAttribute("aria-roledescription")).toBe("carousel")
  })

  it("does not set tabindex on the region (a11y fix)", () => {
    const { container } = render(Carousel, { props: defaultProps })
    const region = container.querySelector('[role="region"]')
    expect(region?.hasAttribute("tabindex")).toBe(false)
  })
})
