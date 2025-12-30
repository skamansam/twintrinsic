import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import ThemeToggle from "../../src/lib/components/ThemeToggle/ThemeToggle.svelte"

describe("ThemeToggle", () => {
  it("renders theme toggle button", () => {
    const { container } = render(ThemeToggle, {
      props: {},
    })
    expect(container.querySelector("button")).toBeTruthy()
  })

  it("handles click events", () => {
    const onclick = vi.fn()
    const { container } = render(ThemeToggle, {
      props: {
        onclick,
      },
    })
    const button = container.querySelector("button") as HTMLButtonElement
    button?.click()
    expect(onclick).toHaveBeenCalled()
  })
})
