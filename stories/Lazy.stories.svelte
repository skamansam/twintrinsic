<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, waitFor } from "storybook/test"
import Lazy from "$lib/components/Lazy/Lazy.svelte"
import LazyPlaceholderDemo from "./LazyPlaceholderDemo.svelte"

const { Story } = defineMeta({
  title: "Utility/Lazy",
  component: Lazy,
  tags: ["autodocs"],
  argTypes: {
    threshold: { control: { type: "number", min: 0, max: 1, step: 0.1 } },
    delay: { control: { type: "number", min: 0 } },
    keepRendered: { control: "boolean" },
    showLoading: { control: "boolean" },
  },
  args: { threshold: 0.1 },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // The content is deferred until the container intersects the viewport
    // (which it does immediately in the story canvas).
    await expect(canvas.queryByText("Monthly revenue chart")).not.toBeInTheDocument()
    await waitFor(() => {
      expect(canvas.getByText("Monthly revenue chart")).toBeInTheDocument()
    })
  }}
>
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Monthly revenue chart</h3>
    <p class="mt-1 text-sm text-muted">This chart is only rendered once it scrolls into view.</p>
  </div>
</Story>

<Story
  name="With Placeholder"
  asChild
  play={async ({ canvas }) => {
    // The placeholder renders first, then swaps to the content once visible.
    await expect(canvas.getByText("Loading chart…")).toBeInTheDocument()
    await waitFor(() => {
      expect(canvas.getByText("Live analytics widget")).toBeInTheDocument()
    })
  }}
>
  <LazyPlaceholderDemo />
</Story>

<Story name="Delayed" args={{ delay: 50 }}>
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Embedded map</h3>
    <p class="mt-1 text-sm text-muted">Loads after a short delay to prioritize initial paint.</p>
  </div>
</Story>
