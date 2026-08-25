<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Skeleton from "$lib/components/Skeleton/Skeleton.svelte"

const { Story } = defineMeta({
  title: "Data Display/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["text", "rectangle", "circle", "rounded"] },
    width: { control: "text" },
    height: { control: "text" },
    lines: { control: { type: "number", min: 1, max: 10 } },
    animated: { control: "boolean" },
  },
  args: { variant: "rectangle" },
})
</script>

<Story
  name="Default"
  args={{ width: "200px", height: "20px" }}
  play={async ({ canvas }) => {
    const skeleton = canvas.getByRole("status");
    await expect(skeleton).toBeInTheDocument();
    await expect(skeleton).toHaveAttribute("aria-busy", "true");
  }}
/>

<Story name="Variants">
  <div class="space-y-4">
    <Skeleton variant="rectangle" width="300px" height="24px" />
    <Skeleton variant="text" lines={3} width="300px" />
    <Skeleton variant="circle" size="48px" />
    <Skeleton variant="rounded" width="300px" height="80px" />
  </div>
</Story>

<Story name="Text Lines" args={{ variant: "text", lines: 4, width: "100%" }} />

<Story name="Card Skeleton">
  <div class="p-4 bg-surface rounded-lg max-w-sm space-y-3">
    <Skeleton variant="rectangle" width="100%" height="160px" />
    <Skeleton variant="text" lines={1} width="60%" />
    <Skeleton variant="text" lines={3} width="100%" />
  </div>
</Story>
