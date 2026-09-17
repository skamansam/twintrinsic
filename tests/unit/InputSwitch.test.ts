import { fireEvent, render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import InputSwitch from "../../src/lib/components/Form/InputSwitch.svelte"

/**
 * InputSwitch is a documented deprecated alias for Switch: it forwards
 * every prop unchanged. These tests pin the alias contract — checked
 * state, accessible name, and the onchange callback with the
 * { checked } detail — so refactors can't silently break consumers.
 * (The underlying control is a checkbox input, hence role=checkbox.)
 */
describe("InputSwitch", () => {
  it("forwards checked and label to the underlying Switch", () => {
    const { getByRole } = render(
      InputSwitch,
      { props: { label: "Enable dark mode", checked: true } },
    )

    const toggle = getByRole("checkbox", { name: "Enable dark mode" })
    expect(toggle).toBeChecked()
  })

  it("starts unchecked by default", () => {
    const { getByRole } = render(InputSwitch, { props: { label: "Notifications" } })

    expect(getByRole("checkbox", { name: "Notifications" })).not.toBeChecked()
  })

  it("toggles on click and emits onchange with the new checked state", async () => {
    const onchange = vi.fn()
    const { getByRole } = render(
      InputSwitch,
      { props: { label: "Airplane mode", onchange } },
    )
    const toggle = getByRole("checkbox", { name: "Airplane mode" })

    await fireEvent.click(toggle)

    expect(toggle).toBeChecked()
    expect(onchange).toHaveBeenCalledTimes(1)
    expect(onchange.mock.calls[0][0].detail).toEqual({ checked: true })

    await fireEvent.click(toggle)

    expect(toggle).not.toBeChecked()
    expect(onchange.mock.calls[1][0].detail).toEqual({ checked: false })
  })

  it("forwards ariaLabel as the accessible name", () => {
    const { getByRole } = render(
      InputSwitch,
      { props: { label: "Visible label", ariaLabel: "Custom name" } },
    )

    // ariaLabel wins over the visible label, matching Switch's behavior
    expect(getByRole("checkbox", { name: "Custom name" })).toBeInTheDocument()
  })
})
