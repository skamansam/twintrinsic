import { render, screen } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Calendar from "../../src/lib/components/Form/Calendar.svelte"

describe("Calendar", () => {
  it("renders a date input", () => {
    render(Calendar, {
      props: {
        label: "Select date",
      },
    })
    const input = screen.getByLabelText("Select date")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "date")
  })

  it("renders with a value", () => {
    render(Calendar, {
      props: {
        label: "Date",
        value: new Date(2026, 3, 7),
      },
    })
    const input = screen.getByLabelText("Date")
    expect(input).toHaveValue("2026-04-07")
  })

  it("renders disabled state", () => {
    render(Calendar, {
      props: {
        label: "Date",
        disabled: true,
      },
    })
    const input = screen.getByLabelText("Date")
    expect(input).toBeDisabled()
  })

  it("renders with min and max dates", () => {
    render(Calendar, {
      props: {
        label: "Date",
        minDate: new Date(2026, 3, 1),
        maxDate: new Date(2026, 3, 30),
      },
    })
    const input = screen.getByLabelText("Date")
    expect(input).toHaveAttribute("min", "2026-04-01")
    expect(input).toHaveAttribute("max", "2026-04-30")
  })

  it("renders without label", () => {
    const { container } = render(Calendar, {})
    expect(container.firstChild).toBeTruthy()
    const input = container.querySelector("input[type='date']")
    expect(input).toBeTruthy()
    expect(input).toHaveAttribute("type", "date")
  })
})
