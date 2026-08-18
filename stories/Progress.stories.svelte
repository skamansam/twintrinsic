<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import Progress from "$lib/components/Progress/Progress.svelte"

const { Story } = defineMeta({
  title: "Data Display/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    max: { control: { type: "number", min: 1 } },
    variant: { control: { type: "select" }, options: ["primary", "secondary", "success", "warning", "error"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    showValue: { control: "boolean" },
    striped: { control: "boolean" },
    animated: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: { value: 65, showValue: true },
})
</script>

<Story name="Default" />

<Story name="Variants">
  <div class="space-y-3">
    <Progress variant="primary" value={75} showValue />
    <Progress variant="secondary" value={60} showValue />
    <Progress variant="success" value={90} showValue />
    <Progress variant="warning" value={40} showValue />
    <Progress variant="error" value={25} showValue />
  </div>
</Story>

<Story name="Sizes">
  <div class="space-y-3">
    <Progress size="sm" value={50} showValue />
    <Progress size="md" value={50} showValue />
    <Progress size="lg" value={50} showValue />
  </div>
</Story>

<Story name="Striped Animated" args={{ value: 70, striped: true, animated: true, showValue: true }} />

<Story name="Indeterminate" args={{ indeterminate: true, variant: "primary" }} />
