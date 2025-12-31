import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TextInput from "../../src/lib/components/Form/TextInput.svelte"

describe("TextInput", () => {
  it("renders text input element", () => {
    const { container } = render(TextInput, {
      props: {
        label: "Input",
      },
    })
    expect(container.querySelector("input")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TextInput, {
      props: {
        label: "TextInput label",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
