import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableHead from "../../src/lib/components/Table/TableHead.svelte"

describe("TableHead", () => {
  it("renders thead element", () => {
    const { container } = render(TableHead, {
      props: {
        children: () => "Head",
      },
    })
    expect(container.querySelector("thead")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TableHead, {
      props: {
        children: () => "Head content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
