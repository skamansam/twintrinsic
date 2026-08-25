<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Badge from "$lib/components/Badge/Badge.svelte"

const { Story } = defineMeta({
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "error", "info"],
    },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    dot: { control: "boolean" },
    pill: { control: "boolean" },
    outline: { control: "boolean" },
    pulse: { control: "boolean" },
  },
  args: { variant: "primary" },
})
</script>

<Story
  name="Default"
  args={{}}
  play={async ({ canvas }) => {
    await expect(canvas.getByText("5")).toBeInTheDocument();
  }}
>5</Story>

<Story name="Variants">
  <div class="flex flex-wrap gap-2">
    <Badge>Default</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
  </div>
</Story>

<Story name="Sizes">
  <div class="flex flex-wrap items-center gap-3">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size="lg">Large</Badge>
  </div>
</Story>

<Story name="Pill and Outline">
  <div class="flex flex-wrap gap-2">
    <Badge pill>12</Badge>
    <Badge pill outline>12</Badge>
    <Badge outline variant="success">New</Badge>
    <Badge outline variant="error">Error</Badge>
  </div>
</Story>

<Story name="Dot Indicator">
  <div class="flex flex-wrap items-center gap-4">
    <Badge dot /> Active
    <Badge dot variant="success" /> Online
    <Badge dot variant="warning" /> Away
    <Badge dot variant="error" pulse /> Do not disturb
  </div>
</Story>
