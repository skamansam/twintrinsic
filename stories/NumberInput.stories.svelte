<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import NumberInput from "$lib/components/Form/NumberInput.svelte"

const { Story } = defineMeta({
  title: "Form/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "number" } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    decimalPlaces: { control: { type: "number" } },
    prefix: { control: "text" },
    suffix: { control: "text" },
    showButtons: { control: "boolean" },
    verticalButtons: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
  },
  args: { name: "quantity", value: 1, min: 0, max: 100, step: 1 },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "quantity" })
    await expect(input).toHaveValue("1")

    // Increment/decrement buttons step the value.
    await userEvent.click(canvas.getByRole("button", { name: "Increase value" }))
    await expect(input).toHaveValue("2")
    await userEvent.click(canvas.getByRole("button", { name: "Decrease value" }))
    await expect(input).toHaveValue("1")
  }}
/>

<Story
  name="Keyboard Stepping"
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "quantity" })
    input.focus()
    await userEvent.keyboard("{ArrowUp}")
    await expect(input).toHaveValue("2")
    await userEvent.keyboard("{ArrowDown}")
    await expect(input).toHaveValue("1")
  }}
/>

<Story
  name="Constrained"
  args={{ name: "percentage", value: 99, min: 0, max: 100 }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "percentage" })
    // The value clamps at max.
    await userEvent.click(canvas.getByRole("button", { name: "Increase value" }))
    await expect(input).toHaveValue("100")
    // The increment button disables at the max.
    await expect(canvas.getByRole("button", { name: "Increase value" })).toBeDisabled()
  }}
/>

<Story
  name="With Prefix and Suffix"
  args={{ name: "price", value: 29.99, prefix: "$", suffix: "USD", decimalPlaces: 2 }}
  play={async ({ canvas }) => {
    await expect(canvas.getByText("$")).toBeInTheDocument()
    await expect(canvas.getByText("USD")).toBeInTheDocument()
    await expect(canvas.getByRole("textbox", { name: "price" })).toHaveValue("29.99")
  }}
/>

<Story
  name="Vertical Buttons"
  args={{ name: "volume", value: 50, verticalButtons: true }}
  play={async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Increase value" }))
    await expect(canvas.getByRole("textbox", { name: "volume" })).toHaveValue("51")
  }}
/>

<Story
  name="No Buttons"
  args={{ name: "plain", value: 5, showButtons: false }}
  play={async ({ canvas }) => {
    await expect(canvas.queryByRole("button", { name: "Increase value" })).not.toBeInTheDocument()
  }}
/>

<Story name="Disabled" args={{ name: "locked", value: 7, disabled: true }} />
