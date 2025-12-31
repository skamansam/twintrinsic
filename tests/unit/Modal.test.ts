import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Modal from "../../src/lib/components/Modal/Modal.svelte"

describe("Modal", () => {
  it("renders modal container", () => {
    const { container } = render(Modal, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.querySelector(".modal")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Modal, {
      props: {
        children: () => "Modal content",
      },
    })
    expect(container.firstChild).toBeTruthy()
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
