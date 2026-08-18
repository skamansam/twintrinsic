<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Listbox from "$lib/components/Form/Listbox.svelte"

const { Story } = defineMeta({
  title: "Form/Listbox",
  component: Listbox,
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
    filter: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    showCheckbox: { control: "boolean" },
  },
  args: { name: "country", ariaLabel: "Country" },
})

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
]

// String options work through getItemLabel/getItemValue passthrough.
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
</script>

<Story
  name="Default"
  args={{ options: countries, ariaLabel: "Country" }}
  play={async ({ canvas }) => {
    const listbox = canvas.getByRole("listbox", { name: "Country" })
    await expect(listbox).not.toHaveAttribute("aria-multiselectable")

    // Clicking an option selects it (aria-selected flips to true).
    await userEvent.click(canvas.getByRole("option", { name: "Canada" }))
    await expect(canvas.getByRole("option", { name: "Canada" })).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByRole("option", { name: "United States" })).toHaveAttribute("aria-selected", "false")
  }}
/>

<Story
  name="Multiple"
  args={{ options: countries, multiple: true, ariaLabel: "Countries" }}
  play={async ({ canvas }) => {
    const listbox = canvas.getByRole("listbox", { name: "Countries" })
    await expect(listbox).toHaveAttribute("aria-multiselectable", "true")

    // Multiple selection toggles options on/off.
    await userEvent.click(canvas.getByRole("option", { name: "Canada" }))
    await userEvent.click(canvas.getByRole("option", { name: "Germany" }))
    await expect(canvas.getByRole("option", { name: "Canada" })).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByRole("option", { name: "Germany" })).toHaveAttribute("aria-selected", "true")
    await userEvent.click(canvas.getByRole("option", { name: "Canada" }))
    await expect(canvas.getByRole("option", { name: "Canada" })).toHaveAttribute("aria-selected", "false")
  }}
/>

<Story
  name="With Filter"
  args={{ options: countries, filter: true, ariaLabel: "Country" }}
  play={async ({ canvas }) => {
    await expect(canvas.getAllByRole("option").length).toBe(5)

    // Typing in the filter input narrows the visible options.
    const filterInput = canvas.getByPlaceholderText("Search...")
    await userEvent.type(filterInput, "ca")
    const options = canvas.getAllByRole("option")
    await expect(options.length).toBe(1)
    await expect(options[0]).toHaveTextContent("Canada")
  }}
/>

<Story
  name="String Options"
  args={{ options: fruits, ariaLabel: "Fruit" }}
  play={async ({ canvas }) => {
    // Plain string options render as labels and select by value.
    await userEvent.click(canvas.getByRole("option", { name: "Cherry" }))
    await expect(canvas.getByRole("option", { name: "Cherry" })).toHaveAttribute("aria-selected", "true")
  }}
/>

<Story
  name="Disabled"
  args={{ options: countries, disabled: true, value: "us", ariaLabel: "Country" }}
  play={async ({ canvas }) => {
    const listbox = canvas.getByRole("listbox", { name: "Country" })
    await expect(listbox).toHaveAttribute("aria-disabled", "true")
  }}
/>
