<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"

const { Story } = defineMeta({
  title: "Utility/EventsTable",
  component: EventsTable,
  tags: ["autodocs"],
})
</script>

<Story
  name="From Data Hash"
  args={{
    data: {
      change: { type: "{ value: string }", description: "Fired when the value changes" },
      focus: { type: "FocusEvent", description: "Fired when the control receives focus" },
      blur: { type: "FocusEvent", description: "Fired when the control loses focus" },
    },
  }}
  play={async ({ canvas }) => {
    // Headers render once for the three fixed columns.
    const headers = await canvas.findAllByRole("columnheader")
    await expect(headers.map((h) => h.textContent)).toEqual([
      "Event",
      "Detail Type",
      "Description",
    ])
    // Event names render with the `on` prefix restored.
    await expect(canvas.getByText("onchange")).toBeInTheDocument()
    await expect(canvas.getByText("onfocus")).toBeInTheDocument()
    // Description and type text render for each event.
    await expect(canvas.getByText("Fired when the value changes")).toBeInTheDocument()
    await expect(canvas.getAllByText("FocusEvent").length).toBe(2)
  }}
/>

<Story
  name="Empty Data"
  play={async ({ canvas }) => {
    // No data -> no table renders (component logs a console.warn).
    await expect(canvas.queryByRole("table")).not.toBeInTheDocument()
  }}
/>
