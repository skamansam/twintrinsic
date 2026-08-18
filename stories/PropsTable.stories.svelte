<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"

const { Story } = defineMeta({
  title: "Utility/PropsTable",
  component: PropsTable,
  tags: ["autodocs"],
})
</script>

<Story
  name="From Data Hash"
  args={{
    data: {
      value: { type: "string", description: "Current value", default: "''" },
      disabled: { type: "boolean", description: "Whether the control is disabled", default: "false" },
      label: { type: "string", description: "Accessible label", optional: true },
    },
  }}
  play={async ({ canvas }) => {
    const headers = await canvas.findAllByRole("columnheader")
    await expect(headers.map((h) => h.textContent)).toEqual(["Prop", "Type", "Default", "Description"])

    // Each prop renders its name, type, default, and description.
    const row = canvas.getByText("disabled").closest("tr")
    await expect(row).not.toBeNull()
    await expect(row).toHaveTextContent("boolean")
    await expect(row).toHaveTextContent("false")
    await expect(row).toHaveTextContent("Whether the control is disabled")

    // Optional props (no default) show an em dash in the default column.
    const optionalRow = canvas.getByText("label").closest("tr")
    await expect(optionalRow).toHaveTextContent("—")
  }}
/>

<Story
  name="Empty Data"
  play={async ({ canvas }) => {
    // No data -> no table renders (component logs a console.warn).
    await expect(canvas.queryByRole("table")).not.toBeInTheDocument()
  }}
/>
