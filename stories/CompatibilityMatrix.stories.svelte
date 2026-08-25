<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import CompatibilityMatrix from "$lib/components/CompatibilityMatrix/CompatibilityMatrix.svelte"

const { Story } = defineMeta({
  title: "Utility/CompatibilityMatrix",
  component: CompatibilityMatrix,
  tags: ["autodocs"],
  argTypes: {
    features: { control: "object" },
    src: { control: "text" },
  },
})
</script>

<Story
  name="Default"
  args={{}}
  play={async ({ canvas }) => {
    // The component fetches /browser-compat.json asynchronously.
    // In Storybook test env, it renders loading/error state first.
    await expect(canvas.getByText(/browser compatibility/i)).toBeInTheDocument();
  }}
>
  <CompatibilityMatrix />
</Story>

<Story name="Filtered Features">
  <CompatibilityMatrix features={["Popover API", "CSS Anchor Positioning"]} />
</Story>

<Story name="Custom Source">
  <CompatibilityMatrix src="/browser-compat.json" />
</Story>

<Story name="Loading State">
  <CompatibilityMatrix src="/nonexistent.json" />
</Story>