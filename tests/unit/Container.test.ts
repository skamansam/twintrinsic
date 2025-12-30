import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Container from "../../src/lib/components/Container/Container.svelte"

describe("Container", () => {
  it("renders container element", () => {
    const { container } = render(Container, {
      props: {
        children: () => "Container content",
      },
    })
    expect(container.querySelector(".container")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Container, {
      props: {
        children: () => "Test content",
      },
    })
    expect(container.textContent).toContain("Test content")
  })
})
