import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Input from "../../src/lib/components/Form/Input.svelte"

describe("Input", () => {
  it("renders input field", () => {
    const { container } = render(Input, {
      props: {
        label: "Username",
      },
    })
    expect(container.querySelector("input")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Input, {
      props: {
        label: "Email",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets input type correctly", () => {
    const { container } = render(Input, {
      props: {
        type: "email",
        label: "Email",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    expect(input?.type).toBe("email")
  })

  it("sets input value", () => {
    const { container } = render(Input, {
      props: {
        value: "test@example.com",
        label: "Email",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    expect(input?.value).toBe("test@example.com")
  })

  it("disables input when disabled prop is true", () => {
    const { container } = render(Input, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    expect(input?.disabled).toBe(true)
  })

  it("marks input as required", () => {
    const { container } = render(Input, {
      props: {
        required: true,
        label: "Required",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    expect(input?.required).toBe(true)
  })

  it("displays error message when error prop is set", () => {
    const { container } = render(Input, {
      props: {
        error: "Invalid email",
        label: "Email",
      },
    })
    expect(container.textContent).toContain("Invalid email")
  })

  it("displays help text", () => {
    const { container } = render(Input, {
      props: {
        helpText: "Enter your email address",
        label: "Email",
      },
    })
    expect(container.textContent).toContain("Enter your email address")
  })

  it("applies floating label class when floating is true", () => {
    const { container } = render(Input, {
      props: {
        floating: true,
        label: "Floating",
      },
    })
    expect(container.querySelector(".form-input-floating")).toBeTruthy()
  })

  it("sets placeholder when not floating", () => {
    const { container } = render(Input, {
      props: {
        placeholder: "Enter text",
        label: "Text",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    expect(input?.placeholder).toBe("Enter text")
  })

  it("handles input events", () => {
    const oninput = vi.fn()
    const { container } = render(Input, {
      props: {
        oninput,
        label: "Input",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    input?.dispatchEvent(new Event("input", { bubbles: true }))
    expect(oninput).toHaveBeenCalled()
  })

  it("handles focus events", () => {
    const onfocus = vi.fn()
    const { container } = render(Input, {
      props: {
        onfocus,
        label: "Focus",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    input?.dispatchEvent(new Event("focus", { bubbles: true }))
    expect(onfocus).toHaveBeenCalled()
  })

  it("handles blur events", () => {
    const onblur = vi.fn()
    const { container } = render(Input, {
      props: {
        onblur,
        label: "Blur",
      },
    })
    const input = container.querySelector("input") as HTMLInputElement
    input?.dispatchEvent(new Event("blur", { bubbles: true }))
    expect(onblur).toHaveBeenCalled()
  })
})
