<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Dropdown from "$lib/components/Form/Dropdown.svelte"

const { Story } = defineMeta({
  title: "Form/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    placeholder: { control: "text" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    filter: { control: "boolean" },
    clearable: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
  },
  args: {
    name: "country",
    placeholder: "Select a country...",
  },
})

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
]

// String options are normalized into { label, value } by Dropdown.
const stringCountries = ["United States", "Canada", "Mexico", "France", "Germany"]
</script>

<Story
  name="Default"
  args={{ options: countries, ariaLabel: "Country" }}
  play={async ({ canvas }) => {
    // Dropdown wraps a native <select> (via Select), so it exposes the
    // combobox role and participates in forms natively.
    const select = canvas.getByRole("combobox", { name: "Country" })
    await userEvent.selectOptions(select, "ca")
    await expect(select).toHaveValue("ca")
    await expect(canvas.getByRole("option", { name: "Canada" }).selected).toBe(true)
  }}
/>

<Story
  name="String Options"
  args={{ options: stringCountries, ariaLabel: "Fruit" }}
  play={async ({ canvas }) => {
    // Plain string arrays are normalized to { label, value } pairs.
    const select = canvas.getByRole("combobox", { name: "Fruit" })
    await expect(canvas.getByRole("option", { name: "United States" })).toBeInTheDocument()
    await userEvent.selectOptions(select, "Mexico")
    await expect(select).toHaveValue("Mexico")
  }}
/>

<Story
  name="Multiple"
  args={{ options: countries, multiple: true, ariaLabel: "Countries" }}
  play={async ({ canvas }) => {
    // A multi-select native <select> exposes the listbox role.
    const select = canvas.getByRole("listbox", { name: "Countries" })
    await expect(select).toHaveAttribute("multiple")
    await userEvent.selectOptions(select, ["us", "de"])
    await expect(select).toHaveValue(["us", "de"])
  }}
/>

<Story name="Disabled" args={{ options: countries, value: "us", disabled: true, ariaLabel: "Country" }} />

<Story name="Required" args={{ options: countries, required: true, ariaLabel: "Country" }} />

<Story name="Clearable" args={{ options: countries, clearable: true, ariaLabel: "Country" }} />
