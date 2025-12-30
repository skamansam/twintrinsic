import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Toast from "../../src/lib/components/Toast/Toast.svelte"

describe("Toast", () => {
  it("renders toast container", () => {
    const { container } = render(Toast, {
      props: {
        children: () => "Toast message",
      },
    })
    expect(container.querySelector(".toast")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Toast, {
      props: {
        children: () => "Toast content",
      },
    })
    expect(container.textContent).toContain("Toast content")
  })
})
