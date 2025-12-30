import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Button from "../../src/lib/components/Button/Button.svelte"

describe("Button", () => {
  it("renders with default props", () => {
    const { container } = render(Button, {
      props: {
        children: () => "Click me",
      },
    })
    expect(container.querySelector("button")).toBeTruthy()
  })

  it("renders as link when href is provided", () => {
    const { container } = render(Button, {
      props: {
        href: "/about",
        children: () => "About",
      },
    })
    expect(container.querySelector("a")).toBeTruthy()
  })

  it("applies variant classes correctly", () => {
    const { container } = render(Button, {
      props: {
        variant: "primary",
        children: () => "Primary",
      },
    })
    const button = container.querySelector("button")
    expect(button?.className).toContain("primary")
  })

  it("applies size classes correctly", () => {
    const { container } = render(Button, {
      props: {
        size: "lg",
        children: () => "Large",
      },
    })
    const button = container.querySelector("button")
    expect(button?.className).toContain("lg")
  })

  it("disables button when disabled prop is true", () => {
    const { container } = render(Button, {
      props: {
        disabled: true,
        children: () => "Disabled",
      },
    })
    const button = container.querySelector("button") as HTMLButtonElement
    expect(button?.disabled).toBe(true)
  })

  it("shows loading state", () => {
    const { container } = render(Button, {
      props: {
        loading: true,
        children: () => "Loading",
      },
    })
    expect(container.querySelector(".button-loader")).toBeTruthy()
  })

  it("applies full width class", () => {
    const { container } = render(Button, {
      props: {
        fullWidth: true,
        children: () => "Full Width",
      },
    })
    const button = container.querySelector("button")
    expect(button?.className).toContain("w-full")
  })

  it("handles click events", async () => {
    const onclick = vi.fn()
    const { container } = render(Button, {
      props: {
        onclick,
        children: () => "Click",
      },
    })
    const button = container.querySelector("button") as HTMLButtonElement
    button?.click()
    expect(onclick).toHaveBeenCalled()
  })

  it("prevents click when disabled", async () => {
    const onclick = vi.fn()
    const { container } = render(Button, {
      props: {
        disabled: true,
        onclick,
        children: () => "Disabled",
      },
    })
    const button = container.querySelector("button") as HTMLButtonElement
    button?.click()
    expect(onclick).not.toHaveBeenCalled()
  })

  it("sets aria-label correctly", () => {
    const { container } = render(Button, {
      props: {
        ariaLabel: "Close dialog",
        children: () => "X",
      },
    })
    const button = container.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Close dialog")
  })
})
