import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import FormField from "../../src/lib/components/Form/FormField.svelte"

describe("FormField", () => {
  it("renders form field container", () => {
    const { container } = render(FormField, {
      props: {
        children: () => "Field",
      },
    })
    expect(container.querySelector(".form-field")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(FormField, {
      props: {
        children: () => "Field content",
      },
    })
    expect(container.textContent).toContain("Field content")
  })

  it("applies error state", () => {
    const { container } = render(FormField, {
      props: {
        error: true,
        children: () => "Error field",
      },
    })
    const field = container.querySelector(".form-field")
    expect(field?.className).toContain("error")
  })
})
