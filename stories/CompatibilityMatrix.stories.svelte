<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
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

<Story name="Default" args={{}}>
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