import { render } from "@testing-library/svelte"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ThemeToggle from "../../src/lib/components/ThemeToggle/ThemeToggle.svelte"

describe("ThemeToggle", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it("renders theme toggle button", () => {
    const { container } = render(ThemeToggle, {
      props: {},
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders element", () => {
    const onclick = vi.fn()
    const { container } = render(ThemeToggle, {
      props: {
        onclick,
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
