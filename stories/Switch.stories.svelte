<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Switch from "$lib/components/Form/Switch.svelte"

const { Story } = defineMeta({
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
  },
  args: { name: "notifications", label: "Enable notifications" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // The switch renders an sr-only checkbox that toggles on click.
    const input = canvas.getByRole("checkbox", { name: "Enable notifications" })
    await expect(input).not.toBeChecked()
    await userEvent.click(input)
    await expect(input).toBeChecked()
    await userEvent.click(input)
    await expect(input).not.toBeChecked()
  }}
/>

<Story
  name="Checked"
  args={{ label: "Dark mode", checked: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Dark mode" })).toBeChecked()
  }}
/>

<Story
  name="Disabled"
  args={{ label: "Disabled switch", disabled: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Disabled switch" })).toBeDisabled()
  }}
/>

<Story
  name="Required"
  args={{ label: "I agree to the terms", required: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "I agree to the terms" })).toHaveAttribute("required")
  }}
/>

<Story
  name="Sizes"
  asChild
  play={async ({ canvas }) => {
    const sm = canvas.getByRole("checkbox", { name: "Small" }).nextElementSibling
    const lg = canvas.getByRole("checkbox", { name: "Large" }).nextElementSibling
    await expect(sm).toHaveClass("w-8")
    await expect(lg).toHaveClass("w-12")
  }}
>
  <div class="flex flex-col gap-4">
    <Switch name="size" label="Small" size="sm" />
    <Switch name="size2" label="Medium" size="md" />
    <Switch name="size3" label="Large" size="lg" />
  </div>
</Story>
