import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Sidebar from "../../src/lib/components/Sidebar/Sidebar.svelte"

describe("Sidebar", () => {
  it("renders sidebar container", () => {
    const { container } = render(Sidebar, {
      props: {
        children: () => "Sidebar",
      },
    })
    expect(container.querySelector(".sidebar")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Sidebar, {
      props: {
        children: () => "Sidebar content",
      },
    })
    expect(container.textContent).toContain("Sidebar content")
  })
})
