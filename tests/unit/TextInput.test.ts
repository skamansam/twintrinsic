import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TextInput from "../../src/lib/components/Form/TextInput.svelte"

describe("TextInput", () => {
  it("renders text input field", () => {
    const { container } = render(TextInput, {
      props: {
        label: "Text",
      },
    })
    expect(container.querySelector("input[type='text']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(TextInput, {
      props: {
        label: "Text",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })
})
