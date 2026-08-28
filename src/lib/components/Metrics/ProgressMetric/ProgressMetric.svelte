<!--
@component
ProgressMetric — A labeled progress bar for displaying metric values.
Features a hover tooltip showing the percentage and value, multiple height
sizes, and color themes.

Usage:
```svelte
<ProgressMetric label="Storage" value={750} max={1000} />
<ProgressMetric label="Revenue" value={42000} max={50000} color="success" height="lg" />
```
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

let isHovered = $state(false);

// Unique id so the <label> can be associated with the progressbar control.
const id = `progress-${crypto.randomUUID()}`;

const percentage = $derived(Math.min((value / max) * 100, 100));

const colorMap: Record<string, string> = {
  primary: 'bg-blue-500',
  secondary: 'bg-purple-500',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-cyan-500'
};

const heightMap: Record<string, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

const colorClass = $derived(colorMap[color]);
const heightClass = $derived(heightMap[height]);
</script>

<div class="flex flex-col gap-2" {...restProps}>
  <div class="flex items-center justify-between">
    <label for={id} class="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    {#if showPercentage}
      <span class="text-sm font-semibold text-gray-900 dark:text-white">{percentage.toFixed(0)}%</span>
    {/if}
  </div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 {heightClass}"
    onmouseenter={() => isHovered = true}
    onmouseleave={() => isHovered = false}
  >
    <div
      {id}
      class="h-full transition-all duration-300 {colorClass}"
      style="width: {percentage}%"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax={max}
      aria-label={label}
    ></div>

    {#if showTooltip && isHovered}
      <div
        class="absolute top-0 right-0 -mt-8 px-2 py-1 rounded-md text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-lg whitespace-nowrap"
      >
        {value} / {max} ({percentage.toFixed(1)}%)
      </div>
    {/if}
  </div>

  <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400">
    <span>0</span>
    <span>{max}</span>
  </div>
</div>

<style lang="postcss">
  @reference "../../../twintrinsic.css";
</style>
