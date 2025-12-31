import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Textarea from "../../src/lib/components/Form/Textarea.svelte"

describe("Textarea", () => {
  it("renders textarea element", () => {
    const { container } = render(Textarea, {
      props: {
        label: "Message",
      },
    })
    expect(container.querySelector("textarea")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Textarea, {
      props: {
        label: "Textarea label",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("sets textarea value", () => {
    const { container } = render(Textarea, {
      props: {
        value: "Test message",
        label: "Message",
      },
    })
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement
    expect(textarea?.value).toBe("Test message")
  })

  it("disables textarea when disabled prop is true", () => {
    const { container } = render(Textarea, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement
    expect(textarea?.disabled).toBe(true)
  })

  it("handles input events", () => {
    const oninput = vi.fn()
    const { container } = render(Textarea, {
      props: {
        oninput,
        label: "Input",
      },
    })
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement
    textarea?.dispatchEvent(new Event("input", { bubbles: true }))
    expect(oninput).toHaveBeenCalled()
  })

  it("sets rows attribute", () => {
    const { container } = render(Textarea, {
      props: {
        rows: 5,
        label: "Message",
      },
    })
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement
    expect(textarea?.rows).toBe(5)
  })
})
