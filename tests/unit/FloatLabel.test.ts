import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import FloatLabel from "../../src/lib/components/Form/FloatLabel.svelte"

describe("FloatLabel", () => {
  it("renders float label container", () => {
    const { container } = render(FloatLabel, {
      props: {
        children: () => "Label",
      },
    })
    expect(container.querySelector(".float-label")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(FloatLabel, {
      props: {
        children: () => "Float label",
      },
    })
    expect(container.textContent).toContain("Float label")
  })
})
