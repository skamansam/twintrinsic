import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Accordion from "../../src/lib/components/Accordion/Accordion.svelte"

describe("Accordion", () => {
  it("renders accordion container", () => {
    const { container } = render(Accordion, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.querySelector(".accordion")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Accordion, {
      props: {
        children: () => "Accordion content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
