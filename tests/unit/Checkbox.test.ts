import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Checkbox from "../../src/lib/components/Form/Checkbox.svelte"

describe("Checkbox", () => {
  it("renders checkbox input", () => {
    const { container } = render(Checkbox, {
      props: {
        label: "Accept terms",
      },
    })
    expect(container.querySelector("input[type='checkbox']")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Checkbox, {
      props: {
        label: "Accept terms",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
