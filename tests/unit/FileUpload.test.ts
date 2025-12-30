import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import FileUpload from "../../src/lib/components/FileUpload/FileUpload.svelte"

describe("FileUpload", () => {
  it("renders file upload input", () => {
    const { container } = render(FileUpload, {
      props: {
        label: "Upload file",
      },
    })
    expect(container.querySelector("input[type='file']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(FileUpload, {
      props: {
        label: "Upload file",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("disables file upload when disabled prop is true", () => {
    const { container } = render(FileUpload, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const input = container.querySelector("input[type='file']") as HTMLInputElement
    expect(input?.disabled).toBe(true)
  })
})
