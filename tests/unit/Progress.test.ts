import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Progress from "../../src/lib/components/Progress/Progress.svelte"

describe("Progress", () => {
  it("renders progress element", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        max: 100,
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Progress, {
      props: {
        value: 75,
        max: 100,
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
