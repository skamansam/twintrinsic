import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Calendar from "../../src/lib/components/Form/Calendar.svelte"

describe("Calendar", () => {
  it("renders calendar container", () => {
    const { container } = render(Calendar, {
      props: {
        label: "Select date",
      },
    })
    expect(container.querySelector(".calendar")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Calendar, {
      props: {
        label: "Select date",
        disabled: true,
      },
    })
    expect(container.querySelector(".calendar")).toBeTruthy()
  })

  it("disables calendar when disabled prop is true", () => {
    const { container } = render(Calendar, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    expect(container.querySelector(".calendar")).toBeTruthy()
    const calendar = container.querySelector(".calendar")
    expect(calendar?.className).toContain("disabled")
  })
})
