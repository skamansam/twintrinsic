import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Toast from "../../src/lib/components/Toast/Toast.svelte"

describe("Toast", () => {
  it("renders toast element", () => {
    const { container } = render(Toast, {
      props: {
        children: () => "Toast message",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders with children", () => {
    const { container } = render(Toast, {
      props: {
        children: () => "Toast content",
      },
    })
    expect(container).toBeTruthy()
  })
})
