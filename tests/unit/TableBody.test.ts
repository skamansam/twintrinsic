import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableBody from "../../src/lib/components/Table/TableBody.svelte"

describe("TableBody", () => {
  it("renders tbody element", () => {
    const { container } = render(TableBody, {
      props: {
        children: () => "Body",
      },
    })
    expect(container.querySelector("tbody")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TableBody, {
      props: {
        children: () => "Body content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
