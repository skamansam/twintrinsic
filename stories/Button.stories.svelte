<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Button from "$lib/components/Button/Button.svelte"
import ButtonGroup from "$lib/components/Button/ButtonGroup.svelte"

const { Story } = defineMeta({
  title: "Form/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["default", "primary", "secondary", "outline", "ghost", "link"] },
    size: { control: { type: "select" }, options: ["xs", "sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    href: { control: "text" },
  },
  args: { variant: "default", size: "md" },
})

let clicks = 0
function recordClick() {
  clicks++
}
</script>

<Story
  name="Default"
  args={{ variant: "primary" }}
  play={async ({ canvas }) => {
    // Default renders a <button> with type="button".
    const button = canvas.getByRole("button", { name: "Save changes" })
    await expect(button.tagName).toBe("BUTTON")
    await expect(button).toHaveAttribute("type", "button")
    await expect(button).not.toBeDisabled()
  }}
>
  Save changes
</Story>

<Story
  name="Click Handler"
  args={{ onclick: recordClick }}
  play={async ({ canvas }) => {
    clicks = 0
    const button = canvas.getByRole("button", { name: "Increment" })
    await userEvent.click(button)
    await expect(clicks).toBe(1)
    await userEvent.click(button)
    await expect(clicks).toBe(2)
  }}
>
  Increment
</Story>

<Story
  name="Disabled"
  args={{ disabled: true, onclick: recordClick }}
  play={async ({ canvas }) => {
    clicks = 0
    const button = canvas.getByRole("button", { name: "Disabled" })
    await expect(button).toBeDisabled()
    // Clicking a disabled button does not fire the callback.
    await userEvent.click(button)
    await expect(clicks).toBe(0)
  }}
>
  Disabled
</Story>

<Story
  name="Loading"
  args={{ loading: true }}
  play={async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Loading" })
    // The label is replaced by a spinner with sr-only text.
    await expect(canvas.getByText("Loading")).toBeInTheDocument()
    await expect(button.querySelector(".button-loader")).not.toBeNull()
    await expect(button).toHaveAttribute("aria-disabled", "true")
  }}
>
  Submitting
</Story>

<Story
  name="As Link"
  args={{ href: "/about" }}
  play={async ({ canvas }) => {
    // href renders an <a> instead of a <button>.
    const link = canvas.getByRole("link", { name: "About Us" })
    await expect(link.tagName).toBe("A")
    await expect(link).toHaveAttribute("href", "/about")
  }}
>
  About Us
</Story>

<Story
  name="With Icon"
  args={{
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>',
  }}
  play={async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Download" })
    await expect(button.querySelector(".button-icon-left")).not.toBeNull()
  }}
>
  Download
</Story>

<Story name="Variants" asChild>
  <div class="flex flex-wrap gap-2">
    <Button>Default</Button>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-wrap items-center gap-2">
    <Button size="xs">XS</Button>
    <Button size="sm">SM</Button>
    <Button size="md">MD</Button>
    <Button size="lg">LG</Button>
    <Button size="xl">XL</Button>
  </div>
</Story>

<Story
  name="In a Button Group"
  asChild
  play={async ({ canvas }) => {
    // ButtonGroup propagates variant/size to child buttons via context.
    const group = canvas.getByRole("group", { name: "Alignment" })
    await expect(group).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Left" })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Center" })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Right" })).toBeInTheDocument()
  }}
>
  <ButtonGroup ariaLabel="Alignment" variant="outline" size="sm">
    <Button>Left</Button>
    <Button>Center</Button>
    <Button>Right</Button>
  </ButtonGroup>
</Story>

<Story name="Vertical Button Group" asChild>
  <div class="max-w-[120px]">
    <ButtonGroup vertical ariaLabel="View options">
      <Button>Top</Button>
      <Button>Middle</Button>
      <Button>Bottom</Button>
    </ButtonGroup>
  </div>
</Story>
