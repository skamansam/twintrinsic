import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import SelectGroup from "../../src/lib/components/Form/SelectGroup.svelte"

describe("SelectGroup", () => {
  it("renders select group container", () => {
    const { container } = render(SelectGroup, {
      props: {
        label: "Group",
      },
    })
    expect(container.querySelector(".select-group")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(SelectGroup, {
      props: {
        label: "Group",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })
})
