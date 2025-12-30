import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Modal from "../../src/lib/components/Modal/Modal.svelte"

describe("Modal", () => {
  it("renders modal when open is true", () => {
    const { container } = render(Modal, {
      props: {
        open: true,
        children: () => "Modal content",
      },
    })
    expect(container.querySelector(".modal")).toBeTruthy()
  })

  it("does not render modal when open is false", () => {
    const { container } = render(Modal, {
      props: {
        open: false,
        children: () => "Modal content",
      },
    })
    expect(container.querySelector(".modal")).toBeFalsy()
  })

  it("renders children content", () => {
    const { container } = render(Modal, {
      props: {
        open: true,
        children: () => "Modal content",
      },
    })
    expect(container.textContent).toContain("Modal content")
  })
})
