import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Form from "../../src/lib/components/Form/Form.svelte"

describe("Form", () => {
  it("renders form element", () => {
    const { container } = render(Form, {
      props: {
        children: () => "Form content",
      },
    })
    expect(container.querySelector("form")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Form, {
      props: {
        children: () => "Form fields",
      },
    })
    expect(container.textContent).toContain("Form fields")
  })

  it("sets form method", () => {
    const { container } = render(Form, {
      props: {
        method: "POST",
        children: () => "Form",
      },
    })
    const form = container.querySelector("form") as HTMLFormElement
    expect(form?.method).toBe("post")
  })
})
