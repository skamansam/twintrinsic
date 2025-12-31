import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import SelectGroup from "../../src/lib/components/Form/SelectGroup.svelte"

describe("SelectGroup", () => {
  it("renders select group element", () => {
    const { container } = render(SelectGroup, {
      props: {
        label: "Select",
        children: () => "Options",
      },
    })
    expect(container.querySelector(".select-group")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(SelectGroup, {
      props: {
        label: "SelectGroup label",
        children: () => "Options",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
