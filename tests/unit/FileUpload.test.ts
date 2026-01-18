import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import FileUpload from "$lib/components/Form/FileUpload.svelte"

describe("FileUpload", () => {
  it("renders the component", () => {
    const { container } = render(FileUpload)
    expect(container).toBeTruthy()
  })

  it("renders dropzone with default label", () => {
    const { getByText } = render(FileUpload)
    expect(getByText("Drag files here or click to browse")).toBeTruthy()
  })

  it("renders browse button with default label", () => {
    const { getByText } = render(FileUpload)
    expect(getByText("Browse")).toBeTruthy()
  })

  it("accepts custom dropzone label", () => {
    const { getByText } = render(FileUpload, {
      props: { dropzoneLabel: "Custom label" },
    })
    expect(getByText("Custom label")).toBeTruthy()
  })

  it("accepts custom browse label", () => {
    const { getByText } = render(FileUpload, {
      props: { browseLabel: "Select" },
    })
    expect(getByText("Select")).toBeTruthy()
  })
})
