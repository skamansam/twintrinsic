import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Table from "../../src/lib/components/Table/Table.svelte"

describe("Table", () => {
  it("renders table element", () => {
    const { container } = render(Table, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.querySelector("table")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Table, {
      props: {
        children: () => "Table content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
