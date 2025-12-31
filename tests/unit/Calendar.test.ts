import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Calendar from "../../src/lib/components/Form/Calendar.svelte"

describe("Calendar", () => {
  it("renders element", () => {
    const { container } = render(Calendar, {
      props: {
        label: "Select date",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})
