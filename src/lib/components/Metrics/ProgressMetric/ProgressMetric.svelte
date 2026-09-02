<!--
@component
ProgressMetric — A labeled progress bar for displaying metric values.
Delegates to the Progress component with label, tooltip, and percentage display.

Usage:
```svelte
<ProgressMetric label="Storage" value={750} max={1000} />
<ProgressMetric label="Revenue" value={42000} max={50000} color="success" height="lg" />
```

> **Note:** Prefer using `<Progress>` directly for new code. ProgressMetric is maintained
> for backward compatibility.
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "label", type: "string", description: "Metric label", optional: false },
  { name: "value", type: "number", description: "Current value", optional: false },
  { name: "max", type: "number", description: "Maximum value", optional: false },
  { name: "color", type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'", description: "Color theme", default: "'primary'", optional: true },
  { name: "showPercentage", type: "boolean", description: "Show percentage text", default: "true", optional: true },
  { name: "showTooltip", type: "boolean", description: "Show hover tooltip with value details", default: "true", optional: true },
  { name: "height", type: "'sm' | 'md' | 'lg'", description: "Height of the progress bar", default: "'md'", optional: true },
];
</script>

<script lang="ts">
import Progress from "../../Progress/Progress.svelte"

interface Props {
  /** Metric label */
  label: string;
  /** Current value */
  value: number;
  /** Maximum value */
  max: number;
  /** Color theme */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  /** Show percentage text */
  showPercentage?: boolean;
  /** Show hover tooltip with value details */
  showTooltip?: boolean;
  /** Height of the progress bar */
  height?: 'sm' | 'md' | 'lg';
  [key: `data-${string}`]: unknown;
  [key: `aria-${string}`]: string | undefined;
}

let {
  label,
  value,
  max,
  color = 'primary',
  showPercentage = true,
  showTooltip = true,
  height = 'md',
  ...restProps
}: Props = $props();
</script>

<div {...restProps}>
  <Progress
    {value}
    {max}
    variant={color}
    size={height}
    label={label}
    showValue={showPercentage}
    {showTooltip}
  />
</div>

<style lang="postcss">
  @reference "../../../twintrinsic.css";
</style>
