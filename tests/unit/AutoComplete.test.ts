import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AutoComplete from "../../src/lib/components/Form/AutoComplete.svelte"

describe("AutoComplete", () => {
  it("renders element", () => {
    const { container } = render(AutoComplete, {
      props: {
        label: "Search",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
