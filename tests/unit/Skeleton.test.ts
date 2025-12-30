import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Skeleton from "../../src/lib/components/Skeleton/Skeleton.svelte"

describe("Skeleton", () => {
  it("renders skeleton element", () => {
    const { container } = render(Skeleton, {
      props: {
        width: "100%",
        height: "20px",
      },
    })
    expect(container.querySelector(".skeleton")).toBeTruthy()
  })

  it("applies width and height styles", () => {
    const { container } = render(Skeleton, {
      props: {
        width: "200px",
        height: "40px",
      },
    })
    const skeleton = container.querySelector(".skeleton") as HTMLElement
    expect(skeleton?.style.width).toBe("200px")
    expect(skeleton?.style.height).toBe("40px")
  })
})
