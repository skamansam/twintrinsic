<!--
@component
DonutChart — Backward-compatible wrapper around PieChart with `hole={0.6}`.
Prefer using `<PieChart hole={0.6}>` directly for new code.
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "data", type: "number[]", description: "Array of numeric values for each slice", optional: false },
  { name: "labels", type: "string[]", description: "Array of labels for each slice", optional: false },
  { name: "colors", type: "string[] | undefined", description: "Array of colors for each slice", optional: true },
  { name: "title", type: "string | undefined", description: "Chart title", optional: true },
  { name: "innerRadius", type: "number", description: "Width of the donut ring (0-1, where 1 is full circle)", default: "0.6", optional: true },
  { name: "size", type: "number", description: "Size of the chart in pixels", default: "300", optional: true },
  { name: "showLegend", type: "boolean", description: "Show legend", default: "true", optional: true },
  { name: "onsliceclick", type: "((event: CustomEvent<{ index: number; value: number; label: string }>) => void) | undefined", description: "Callback when a slice is clicked", optional: true, eventDetail: "{ index: number; value: number; label: string }" },
  { name: "activeSlice", type: "number | null", description: "Index of the pulled-out active slice (null = none)", default: "null", optional: true },
  { name: "pullDistance", type: "number", description: "Distance in pixels to pull the active slice outward", default: "12", optional: true },
];
</script>

<script lang="ts">
import PieChart from "../PieChart/PieChart.svelte"

const {
  /** @type {number[]} - Array of numeric values for each slice */
  data,
  /** @type {string[]} - Array of labels for each slice */
  labels,
  /** @type {string[] | undefined} - Array of colors for each slice */
  colors = undefined,
  /** @type {string | undefined} - Chart title */
  title = undefined,
  /** @type {number} - Width of the donut ring (0-1, where 1 is full circle) */
  innerRadius = 0.6,
  /** @type {((event: CustomEvent<{ index: number; value: number; label: string }>) => void) | undefined} - Callback when a slice is clicked */
  onsliceclick = undefined,
  /** @type {boolean} - Show legend */
  showLegend = true,
  /** @type {number} - Size of the chart in pixels */
  size = 300,
  /** @type {number | null} - Index of the pulled-out active slice (null = none) */
  activeSlice = null,
  /** @type {number} - Distance in pixels to pull the active slice outward */
  pullDistance = 12,
  ...restProps
} = $props()
</script>

<PieChart
  {data}
  {labels}
  {colors}
  {title}
  hole={innerRadius}
  {onsliceclick}
  {showLegend}
  {size}
  {...restProps}
/>
