<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Radio from "$lib/components/Form/Radio.svelte"
import RadioGroup from "$lib/components/Form/RadioGroup.svelte"

const { Story } = defineMeta({
  title: "Form/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
  },
  args: { name: "theme", value: "light", label: "Light" },
})
</script>

<Story
  name="Standalone"
  args={{ label: "Enable feature", checked: false }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("radio", { name: "Enable feature" })
    await expect(input).not.toBeChecked()
    await userEvent.click(input)
    await expect(input).toBeChecked()
  }}
/>

<Story
  name="Checked"
  args={{ label: "Dark mode", checked: true }}
  play={async ({ canvas }) => {
    // checked={true} renders checked on mount.
    await expect(canvas.getByRole("radio", { name: "Dark mode" })).toBeChecked()
  }}
/>

<Story
  name="Disabled"
  args={{ label: "Disabled option", disabled: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("radio", { name: "Disabled option" })).toBeDisabled()
  }}
/>

<Story
  name="Sizes"
  asChild
  play={async ({ canvas }) => {
    // Size classes are applied to the radio control spans.
    const sm = canvas.getByRole("radio", { name: "Small" }).nextElementSibling
    const lg = canvas.getByRole("radio", { name: "Large" }).nextElementSibling
    await expect(sm).toHaveClass("w-3.5")
    await expect(lg).toHaveClass("w-5")
  }}
>
  <div class="flex gap-4">
    <Radio name="size" value="sm" label="Small" size="sm" />
    <Radio name="size" value="md" label="Medium" size="md" />
    <Radio name="size" value="lg" label="Large" size="lg" />
  </div>
</Story>

<Story
  name="In a Group"
  asChild
  play={async ({ canvas }) => {
    // RadioGroup renders a fieldset + legend; radios share the group's name
    // and only one can be checked at a time.
    await expect(canvas.getByRole("group", { name: "Select theme" })).toBeInTheDocument()
    const light = canvas.getByRole("radio", { name: "Light" })
    const dark = canvas.getByRole("radio", { name: "Dark" })

    await expect(light).not.toBeChecked()
    await userEvent.click(dark)
    await expect(dark).toBeChecked()
    await expect(light).not.toBeChecked()

    await userEvent.click(light)
    await expect(light).toBeChecked()
    await expect(dark).not.toBeChecked()
  }}
>
  <RadioGroup name="theme" legend="Select theme">
    <Radio value="light" label="Light" />
    <Radio value="dark" label="Dark" />
    <Radio value="system" label="System" />
  </RadioGroup>
</Story>

<Story
  name="Group Horizontal"
  asChild
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Delivery" })).toBeInTheDocument()
  }}
>
  <RadioGroup name="delivery" legend="Delivery" layout="horizontal">
    <Radio value="pickup" label="Pickup" />
    <Radio value="delivery" label="Delivery" />
  </RadioGroup>
</Story>

<Story
  name="Group Disabled"
  asChild
  play={async ({ canvas }) => {
    // A disabled group disables every radio inside it.
    await expect(canvas.getByRole("radio", { name: "Option A" })).toBeDisabled()
    await expect(canvas.getByRole("radio", { name: "Option B" })).toBeDisabled()
  }}
>
  <RadioGroup name="opts" legend="Options" disabled>
    <Radio value="a" label="Option A" />
    <Radio value="b" label="Option B" />
  </RadioGroup>
</Story>
