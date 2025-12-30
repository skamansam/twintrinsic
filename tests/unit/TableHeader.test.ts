import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableHeader from "../../src/lib/components/Table/TableHeader.svelte"

describe("TableHeader", () => {
  it("renders th element", () => {
    const { container } = render(TableHeader, {
      props: {
        children: () => "Header",
      },
    })
    expect(container.querySelector("th")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(TableHeader, {
      props: {
        children: () => "Header content",
      },
    })
    expect(container.textContent).toContain("Header content")
  })
})
