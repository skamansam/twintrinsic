import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AppHeader from "../../src/lib/components/AppHeader/AppHeader.svelte"

describe("AppHeader", () => {
  it("renders header element", () => {
    const { container } = render(AppHeader, {
      props: {
        children: () => "Header",
      },
    })
    expect(container.querySelector("header")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(AppHeader, {
      props: {
        children: () => "Header content",
      },
    })
    expect(container.textContent).toContain("Header content")
  })
})
