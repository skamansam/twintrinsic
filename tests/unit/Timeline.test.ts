import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Timeline from "../../src/lib/components/Timeline/Timeline.svelte"

describe("Timeline", () => {
  it("renders timeline container", () => {
    const { container } = render(Timeline, {
      props: {
        children: () => "Timeline",
      },
    })
    expect(container.querySelector(".timeline")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Timeline, {
      props: {
        children: () => "Timeline content",
      },
    })
    expect(container.textContent).toContain("Timeline content")
  })
})
