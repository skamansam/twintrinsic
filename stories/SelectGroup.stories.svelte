<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Select from "$lib/components/Form/Select.svelte"
import SelectGroup from "$lib/components/Form/SelectGroup.svelte"

const { Story } = defineMeta({
  title: "Form/SelectGroup",
  component: SelectGroup,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { label: "Region" },
})
</script>

<Story
  name="In a Select"
  asChild
  play={async ({ canvas }) => {
    // SelectGroup renders native <optgroup> elements inside the <select>.
    const select = canvas.getByRole("combobox", { name: "Country" })
    await expect(canvas.getByRole("group", { name: "Europe" })).toBeInTheDocument()
    await expect(canvas.getByRole("group", { name: "North America" })).toBeInTheDocument()

    // Options inside groups are selectable.
    await userEvent.selectOptions(select, "fr")
    await expect(select).toHaveValue("fr")
  }}
>
  <Select label="Country" ariaLabel="Country">
    <SelectGroup label="Europe">
      <option value="fr">France</option>
      <option value="de">Germany</option>
    </SelectGroup>
    <SelectGroup label="North America">
      <option value="us">United States</option>
      <option value="ca">Canada</option>
    </SelectGroup>
  </Select>
</Story>

<Story
  name="Disabled Group"
  asChild
  play={async ({ canvas }) => {
    // A disabled group disables its options.
    await expect(canvas.getByRole("group", { name: "Archive" })).toBeInTheDocument()
    const option = canvas.getByRole("option", { name: "Old entry" })
    await expect(option).toBeDisabled()
  }}
>
  <Select label="Category" ariaLabel="Category">
    <SelectGroup label="Active">
      <option value="a">Active entry</option>
    </SelectGroup>
    <SelectGroup label="Archive" disabled>
      <option value="old">Old entry</option>
    </SelectGroup>
  </Select>
</Story>
