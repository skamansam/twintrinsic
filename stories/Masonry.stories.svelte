<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Masonry from "$lib/components/Masonry/Masonry.svelte"

const { Story } = defineMeta({
  title: "Utility/Masonry",
  component: Masonry,
  tags: ["autodocs"],
  argTypes: {
    columns: { control: { type: "number", min: 1, max: 6 } },
    gap: { control: { type: "number", min: 0, max: 64 } },
    centered: { control: "boolean" },
    animated: { control: "boolean" },
  },
  args: { columns: 3, gap: 16 },
})

const items = [
  { id: 1, height: "h-24", label: "Sketch: login flow", color: "bg-primary-100 dark:bg-primary-900" },
  { id: 2, height: "h-40", label: "Photo: team offsite", color: "bg-secondary-100 dark:bg-secondary-900" },
  { id: 3, height: "h-16", label: "Note: Q3 roadmap", color: "bg-success-100 dark:bg-success-900" },
  { id: 4, height: "h-32", label: "Screenshot: v2 dashboard", color: "bg-warning-100 dark:bg-warning-900" },
  { id: 5, height: "h-20", label: "Quote: design review", color: "bg-info-100 dark:bg-info-900" },
  { id: 6, height: "h-28", label: "Moodboard: brand refresh", color: "bg-error-100 dark:bg-error-900" },
]
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // The grid is announced with role="grid" and all items render.
    const grid = canvas.getByRole("grid")
    await expect(grid).toBeInTheDocument()
    for (const item of items) {
      await expect(canvas.getByText(item.label)).toBeInTheDocument()
    }
    // Items are absolutely positioned by the layout engine on mount.
    const children = Array.from(grid.children)
    await expect(children.length).toBeGreaterThan(0)
    await expect(children.every((el) => el.getAttribute("style")?.includes("position"))).toBe(true)
  }}
>
  {#each items as item}
    <div class={`${item.color} rounded-lg flex items-center justify-center px-4 text-center ${item.height}`}>
      {item.label}
    </div>
  {/each}
</Story>

<Story
  name="Two Columns"
  args={{ columns: 2, gap: 20 }}
  play={async ({ canvas }) => {
    const grid = canvas.getByRole("grid")
    await expect(grid).toBeInTheDocument()
    await expect(canvas.getByText("Sketch: login flow")).toBeInTheDocument()
  }}
>
  {#each items as item}
    <div class={`${item.color} rounded-lg flex items-center justify-center px-4 text-center ${item.height}`}>
      {item.label}
    </div>
  {/each}
</Story>

<Story name="Centered" args={{ columns: 3, centered: true, animated: false }}>
  {#each items as item}
    <div class={`${item.color} rounded-lg flex items-center justify-center px-4 text-center ${item.height}`}>
      {item.label}
    </div>
  {/each}
</Story>
