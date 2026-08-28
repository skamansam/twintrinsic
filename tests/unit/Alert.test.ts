import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/svelte"
import Alert from "$lib/components/Alert/Alert.svelte"

describe("Alert", () => {
  it("renders with default props", () => {
    const { container } = render(Alert, { props: { children: () => "Test alert" } })
    expect(container.querySelector(".alert")).toBeInTheDocument()
    expect(container.querySelector("[role='alert']")).toBeInTheDocument()
  })

  it("renders with title", () => {
    const { container } = render(Alert, { props: { title: "Alert Title", children: () => "Alert body" } })
    expect(screen.getByText("Alert Title")).toBeInTheDocument()
    expect(container.querySelector(".alert-title")).toBeInTheDocument()
  })

  it("applies variant classes", () => {
    const { container } = render(Alert, { props: { variant: "warning", children: () => "Warning" } })
    const alert = container.querySelector(".alert")
    expect(alert?.className).toContain("bg-warning-50")
  })

  it("applies border side classes", () => {
    const { container } = render(Alert, { props: { border: "top", children: () => "Top border" } })
    const alert = container.querySelector(".alert")
    expect(alert?.className).toContain("border-t-4")
  })

  it("shows close button when dismissible", () => {
    render(Alert, { props: { dismissible: true, children: () => "Dismissible" } })
    expect(screen.getByRole("button", { name: /dismiss alert/i })).toBeInTheDocument()
  })

  it("hides alert when close button is clicked", async () => {
    const { container } = render(Alert, { props: { dismissible: true, children: () => "Dismissible" } })
    const closeBtn = screen.getByRole("button", { name: /dismiss alert/i })
    await fireEvent.click(closeBtn)
    expect(container.querySelector(".alert")).not.toBeInTheDocument()
  })

  it("fires onclose when dismissed", async () => {
    const onclose = vi.fn()
    render(Alert, { props: { dismissible: true, onclose, children: () => "Dismissible" } })
    const closeBtn = screen.getByRole("button", { name: /dismiss alert/i })
    await fireEvent.click(closeBtn)
    expect(onclose).toHaveBeenCalledTimes(1)
  })

  it("does not show close button when not dismissible", () => {
    render(Alert, { props: { children: () => "Not dismissible" } })
    expect(screen.queryByRole("button", { name: /dismiss alert/i })).not.toBeInTheDocument()
  })

  it("passes rest props to root element", () => {
    render(Alert, { props: { "data-testid": "custom-alert", children: () => "With data" } })
    expect(screen.getByTestId("custom-alert")).toBeInTheDocument()
  })
})
