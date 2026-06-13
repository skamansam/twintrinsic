import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Modal from "../../src/lib/components/Modal/Modal.svelte"

describe("Modal", () => {
  const defaultProps = {
    open: true,
    children: () => "Modal content",
  }

  it("renders nothing when closed", () => {
    const { container } = render(Modal, { props: { ...defaultProps, open: false } })
    expect(container.querySelector('[role="dialog"]')).toBeFalsy()
  })

  it("renders dialog with role=dialog and aria-modal=true", () => {
    const { container } = render(Modal, { props: defaultProps })
    const dialog = container.querySelector('[role="dialog"]')
    expect(dialog).toBeTruthy()
    expect(dialog?.getAttribute("aria-modal")).toBe("true")
  })

  it("renders backdrop with modal-backdrop class", () => {
    const { container } = render(Modal, { props: defaultProps })
    expect(container.querySelector(".modal-backdrop")).toBeTruthy()
  })
})
