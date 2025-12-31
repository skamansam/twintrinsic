import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Container from "../../src/lib/components/Container/Container.svelte"

describe("Container", () => {
  it("renders container element", () => {
    const { container } = render(Container, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.querySelector(".container")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Container, {
      props: {
        children: () => "Container content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
