<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, fireEvent, waitFor, within } from "storybook/test"
// The polyfill stands in for the browser's native Temporal global in the
// Storybook iframe — same shape as a consumer's install.
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"
import CalendarView from "$lib/components/CalendarView/CalendarView.svelte"

const { Story } = defineMeta({
  title: "Form/CalendarView",
  component: CalendarView,
  tags: ["autodocs"],
  argTypes: {
    weekStart: { control: "radio", options: ["auto", 0, 1], description: "Day the week starts on; 'auto' derives from the locale" },
    weeks: { control: "number", description: "Number of grid rows (6 keeps the grid stable)" },
  },
  args: {},
})

/** Fixed visible month so story screenshots don't drift with the calendar. */
const SEPTEMBER = TemporalPolyfill.PlainDate.from("2026-09-01")
</script>

<Story name="Default">
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story name="SundayWeekStart">
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} weekStart={0} />
    </div>
  {/snippet}
</Story>

<Story name="SelectedDate">
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} value={TemporalPolyfill.PlainDate.from("2026-09-21")} />
    </div>
  {/snippet}
</Story>

<Story
  name="KeyboardNavigation"
  play={async ({ canvas, step }) => {
    const grid = await canvas.findByRole("grid")
    const tabbable = () => grid.querySelector('[role="gridcell"] [tabindex="0"]')

    await step("ArrowRight moves cell focus by one day", async () => {
      expect(tabbable()?.textContent).toBe("1")
      await fireEvent.keyDown(grid, { key: "ArrowRight" })
      expect(tabbable()?.textContent).toBe("2")
    })

    await step("ArrowDown moves by one week", async () => {
      await fireEvent.keyDown(grid, { key: "ArrowDown" })
      expect(tabbable()?.textContent).toBe("9")
    })

    await step("Home/End jump to week start/end", async () => {
      await fireEvent.keyDown(grid, { key: "Home" })
      expect(tabbable()?.textContent).toBe("7")
      await fireEvent.keyDown(grid, { key: "End" })
      expect(tabbable()?.textContent).toBe("13")
    })

    await step("Enter selects the focused day", async () => {
      await fireEvent.keyDown(grid, { key: "Enter" })
      await waitFor(() => {
        expect(grid.querySelector('[aria-selected="true"]')).not.toBeNull()
      })
    })

    await step("PageDown pages to the next month with focus intact", async () => {
      await fireEvent.keyDown(grid, { key: "PageDown" })
      await waitFor(() => {
        expect(canvas.getByText("October 2026")).toBeInTheDocument()
      })
      expect(tabbable()).not.toBeNull()
    })
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="SelectionCallback"
  play={async ({ canvas }) => {
    const grid = await canvas.findByRole("grid")
    const day = canvas.getByTestId("calendar-view-day-2026-09-15")
    await fireEvent.click(day)
    await expect(day.closest('[role="gridcell"]')).toHaveAttribute("aria-selected", "true")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView
        {...args}
        month={SEPTEMBER}
        ondateselect={(e) => console.log("selected", e.detail.date.toString())}
      />
    </div>
  {/snippet}
</Story>
