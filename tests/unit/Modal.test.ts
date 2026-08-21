import { createRawSnippet, type Snippet } from "svelte"
import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Modal from "../../src/lib/components/Modal/Modal.svelte"

// jsdom + @testing-library cannot render plain-function snippet props as
// content (see ChipGroup.test.ts note), so build real snippets via
// createRawSnippet when asserting rendered text.
const snippet = (text: string): Snippet =>
  createRawSnippet(() => ({ render: () => `<span>${text}</span>` }))

describe("Modal", () => {
  const defaultProps = {
    open: true,
    children: () => "Modal content",
  }

  it("renders a native dialog element", () => {
    const { container } = render(Modal, { props: defaultProps })
    const dialog = container.querySelector("dialog")
    expect(dialog).toBeTruthy()
    // jsdom lacks showModal(), so the open state is reflected via the
    // `open` attribute in this environment.
    expect(dialog?.open).toBe(true)
    expect(dialog?.hasAttribute("open")).toBe(true)
  })

  it("leaves the dialog closed when open is false", () => {
    const { container } = render(Modal, { props: { ...defaultProps, open: false } })
    const dialog = container.querySelector("dialog")
    expect(dialog).toBeTruthy()
    expect(dialog?.open).toBe(false)
    expect(dialog?.hasAttribute("open")).toBe(false)
  })

  it("maps close behaviors onto the native closedby attribute", () => {
    const { container: anyContainer } = render(Modal, { props: defaultProps })
    expect(anyContainer.querySelector("dialog")?.getAttribute("closedby")).toBe("any")

    const { container: escOnly, unmount: unmountEsc } = render(Modal, {
      props: { ...defaultProps, closeOnOutsideClick: false },
    })
    expect(escOnly.querySelector("dialog")?.getAttribute("closedby")).toBe("closerequest")
    unmountEsc()

    // Outside-click only: no native closedby value exists, so it maps to
    // "none" and is handled manually in handleBackdropClick.
    const { container: outsideOnly, unmount: unmountOutside } = render(Modal, {
      props: { ...defaultProps, closeOnEscape: false },
    })
    expect(outsideOnly.querySelector("dialog")?.getAttribute("closedby")).toBe("none")
    unmountOutside()

    const { container: none, unmount: unmountNone } = render(Modal, {
      props: { ...defaultProps, closeOnEscape: false, closeOnOutsideClick: false },
    })
    expect(none.querySelector("dialog")?.getAttribute("closedby")).toBe("none")
    unmountNone()
  })

  it("marks the dialog aria-modal when open", () => {
    const { container } = render(Modal, { props: defaultProps })
    expect(container.querySelector("dialog")?.getAttribute("aria-modal")).toBe("true")
  })

  it("renders header and footer snippets", () => {
    const { container } = render(Modal, {
      props: {
        open: true,
        header: snippet("Modal title"),
        children: snippet("Body content"),
        footer: snippet("Footer actions"),
      },
    })
    expect(container.textContent).toContain("Modal title")
    expect(container.textContent).toContain("Body content")
    expect(container.textContent).toContain("Footer actions")
  })

  it("renders the close button with its aria-label", () => {
    const { container } = render(Modal, {
      props: { ...defaultProps, header: () => "Title", closeButtonLabel: "Dismiss" },
    })
    const closeButton = container.querySelector<HTMLButtonElement>(".modal-close-button")
    expect(closeButton).toBeTruthy()
    expect(closeButton?.getAttribute("aria-label")).toBe("Dismiss")
  })

  it("hides the close button when showCloseButton is false", () => {
    const { container } = render(Modal, {
      props: { ...defaultProps, header: () => "Title", showCloseButton: false },
    })
    expect(container.querySelector(".modal-close-button")).toBeFalsy()
  })

  it("fires onclose with reason programmatic when the close button is clicked", async () => {
    const onclose = vi.fn()
    const { container } = render(Modal, {
      props: { ...defaultProps, header: () => "Title", onclose },
    })
    const closeButton = container.querySelector<HTMLButtonElement>(".modal-close-button")
    await closeButton?.click()
    expect(onclose).toHaveBeenCalledTimes(1)
    const event = onclose.mock.calls[0][0] as CustomEvent
    expect(event.detail).toEqual({ reason: "programmatic" })
  })

  it("fires onopen when opened", () => {
    const onopen = vi.fn()
    render(Modal, { props: { ...defaultProps, onopen } })
    // The effect fires onopen synchronously when the dialog opens.
    expect(onopen).toHaveBeenCalledTimes(1)
  })

  it("applies the size class", () => {
    const { container } = render(Modal, { props: { ...defaultProps, size: "lg" } })
    expect(container.querySelector("dialog")?.className).toContain("max-w-lg")
  })
})
