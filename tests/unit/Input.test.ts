import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Input from "../../src/lib/components/Form/Input.svelte"

describe("Input", () => {
  it("renders element", () => {
    const { container } = render(Input, {
      props: {
        label: "Name",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
