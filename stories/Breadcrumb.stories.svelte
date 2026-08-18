<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Breadcrumb from "$lib/components/Breadcrumb/Breadcrumb.svelte"
import BreadcrumbItem from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"

const { Story } = defineMeta({
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: { control: "text" },
    collapsible: { control: "boolean" },
    maxVisibleItems: { control: { type: "number", min: 1, max: 5 } },
  },
  args: { ariaLabel: "Breadcrumb" },
})
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // The trail renders as a nav with links and a current (non-link) item.
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb" })
    await expect(nav).toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
    await expect(canvas.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products")

    // The last item marks the current page with aria-current.
    const current = canvas.getByText("Laptops").closest(".breadcrumb-item")
    await expect(current).toHaveAttribute("aria-current", "page")
    await expect(current).toHaveClass("breadcrumb-item-current")
  }}
>
  <Breadcrumb ariaLabel="Breadcrumb">
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/products">Products</BreadcrumbItem>
    <BreadcrumbItem>Laptops</BreadcrumbItem>
  </Breadcrumb>
</Story>

<Story
  name="Custom Separator"
  asChild
  play={async ({ canvas }) => {
    // A custom separator renders between items (aria-hidden).
    const separators = await canvas.findAllByText("›")
    await expect(separators.length).toBe(2)
    await expect(separators[0]).toHaveClass("breadcrumb-separator")
  }}
>
  <Breadcrumb separator="›" ariaLabel="Breadcrumb">
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
    <BreadcrumbItem>Components</BreadcrumbItem>
  </Breadcrumb>
</Story>

<Story
  name="Collapsible"
  asChild
  play={async ({ canvas }) => {
    // Middle items beyond maxVisibleItems are hidden.
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb" })
    const visible = Array.from(nav.querySelectorAll(".breadcrumb-item")).filter(
      (el) => !el.classList.contains("breadcrumb-item-hidden"),
    )
    // First + last always visible; maxVisibleItems=1 middle item stays.
    await expect(visible.length).toBe(3)
  }}
>
  <Breadcrumb collapsible maxVisibleItems={1} ariaLabel="Breadcrumb">
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/a">Section A</BreadcrumbItem>
    <BreadcrumbItem href="/b">Section B</BreadcrumbItem>
    <BreadcrumbItem href="/c">Section C</BreadcrumbItem>
    <BreadcrumbItem>Deep page</BreadcrumbItem>
  </Breadcrumb>
</Story>

<Story name="With Icons" asChild>
  <Breadcrumb ariaLabel="Breadcrumb">
    <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
    <BreadcrumbItem>Current</BreadcrumbItem>
  </Breadcrumb>
</Story>
