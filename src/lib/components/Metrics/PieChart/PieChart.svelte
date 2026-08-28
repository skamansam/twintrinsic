<!--
@component
PieChart — An SVG pie chart for displaying proportional data. Supports donut mode
via the `hole` prop, custom start angle, counter-clockwise direction, center text,
hover tooltips, click interactivity, and keyboard navigation.
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "data", type: "number[]", description: "Array of numeric values for each slice", optional: false },
  { name: "labels", type: "string[]", description: "Array of labels for each slice", optional: false },
  { name: "colors", type: "string[]", description: "Array of colors for each slice", default: "['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']", optional: true },
  { name: "title", type: "string", description: "Chart title", optional: true },
  { name: "hole", type: "number", description: "Donut hole ratio (0 = pie, 0.6 = standard donut, 0.8 = thin ring)", default: "0", optional: true },
  { name: "centerText", type: "string", description: "Text rendered in the center (donut mode only)", optional: true },
  { name: "centerSubtext", type: "string", description: "Smaller text below centerText", optional: true },
  { name: "start", type: "string", description: "Start angle: 'top', 'right', 'bottom', 'left', or degrees string", default: "'top'", optional: true },
  { name: "counterClockwise", type: "boolean", description: "Draw slices counter-clockwise", default: "false", optional: true },
  { name: "onsliceclick", type: "(event: MouseEvent | KeyboardEvent, detail: Readonly<{ index: number; label: string; value: number }>) => void", description: "Callback when a slice is clicked", optional: true },
  { name: "showLegend", type: "boolean", description: "Show legend below the chart", default: "true", optional: true },
  { name: "showTooltips", type: "boolean", description: "Show hover tooltips on slices", default: "true", optional: true },
  { name: "size", type: "number", description: "Size of the chart in pixels", default: "300", optional: true },
  { name: "activeSlice", type: "number | null", description: "Index of the pulled-out active slice (null = none)", default: "null", optional: true },
  { name: "pullDistance", type: "number", description: "Distance in pixels to pull the active slice outward", default: "12", optional: true },
  { name: "onactivechange", type: "(event: CustomEvent<{ index: number | null }>) => void", description: "Fired when the active slice changes", optional: true, eventDetail: "{ index: number | null }" },
];
</script>

<script lang="ts">
/**
 * Parse the `start` prop into a radian offset.
 * Named positions: top=-90°, right=0°, bottom=90°, left=180°
 * Numeric strings like "45deg" are converted to radians.
 */
function parseStartAngle(start: string): number {
  const map: Record<string, number> = {
    top: -Math.PI / 2,
    right: 0,
    bottom: Math.PI / 2,
    left: Math.PI,
  }
  if (map[start] !== undefined) return map[start]
  const degMatch = start.match(/^(-?\d+(?:\.\d+)?)deg$/)
  if (degMatch) return (parseFloat(degMatch[1]) * Math.PI) / 180
  return -Math.PI / 2
}

interface Props {
  /** Array of numeric values for each slice */
  data: number[]
  /** Array of labels for each slice */
  labels: string[]
  /** Array of colors for each slice */
  colors?: string[]
  /** Chart title */
  title?: string
  /** Donut hole ratio (0 = pie, 0.6 = standard donut, 0.8 = thin ring) */
  hole?: number
  /** Text rendered in the center (donut mode only) */
  centerText?: string
  /** Smaller text below centerText */
  centerSubtext?: string
  /** Start angle: 'top', 'right', 'bottom', 'left', or degrees string */
  start?: string
  /** Draw slices counter-clockwise */
  counterClockwise?: boolean
  /** Callback when a slice is clicked */
  onsliceclick?: (event: MouseEvent | KeyboardEvent, detail: Readonly<{ index: number; label: string; value: number }>) => void
  /** Show legend below the chart */
  showLegend?: boolean
  /** Show hover tooltips on slices */
  showTooltips?: boolean
  /** Size of the chart in pixels */
  size?: number
  /** Index of the pulled-out active slice (null = none) */
  activeSlice?: number | null
  /** Distance in pixels to pull the active slice outward */
  pullDistance?: number
  /** Fired when the active slice changes */
  onactivechange?: (event: CustomEvent<{ index: number | null }>) => void
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
}

let {
  data,
  labels,
  colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
  title = undefined,
  hole = 0,
  centerText = undefined,
  centerSubtext = undefined,
  start = 'top',
  counterClockwise = false,
  onsliceclick = undefined,
  showLegend = true,
  showTooltips = true,
  size = 300,
  activeSlice = null,
  pullDistance = 12,
  onactivechange = undefined,
  ...restProps
}: Props = $props()

/** Currently hovered slice index (-1 = none) */
let hoveredIndex = $state(-1)
/** Tooltip x position */
let tooltipX = $state(0)
/** Tooltip y position */
let tooltipY = $state(0)

const total = $derived(data.reduce((sum, val) => sum + val, 0))
const startAngle = $derived(parseStartAngle(start))
const isDonut = $derived(hole > 0)

const slices = $derived.by(() => {
  let currentAngle = startAngle
  const direction = counterClockwise ? -1 : 1
  return data.map((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI * direction
    const sAngle = currentAngle
    const eAngle = currentAngle + sliceAngle
    const percentage = ((value / total) * 100).toFixed(1)

    const outerRadius = size / 2 - 10
    const innerRadius = outerRadius * hole

    // Calculate pull offset for active slice
    const isActive = activeSlice === index
    const midAngle = (sAngle + eAngle) / 2
    const pullX = isActive ? Math.cos(midAngle) * pullDistance : 0
    const pullY = isActive ? Math.sin(midAngle) * pullDistance : 0
    const cx = size / 2 + pullX
    const cy = size / 2 + pullY

    const outerStart = polarToCartesian(cx, cy, outerRadius, eAngle)
    const outerEnd = polarToCartesian(cx, cy, outerRadius, sAngle)

    const largeArc = Math.abs(sliceAngle) > Math.PI ? 1 : 0
    const sweep = counterClockwise ? 0 : 1

    let pathData: string
    if (isDonut) {
      const innerStart = polarToCartesian(cx, cy, innerRadius, eAngle)
      const innerEnd = polarToCartesian(cx, cy, innerRadius, sAngle)
      pathData = [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} ${sweep} ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} ${sweep === 1 ? 0 : 1} ${innerStart.x} ${innerStart.y}`,
        'Z'
      ].join(' ')
    } else {
      pathData = [
        `M ${cx} ${cy}`,
        `L ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} ${sweep} ${outerEnd.x} ${outerEnd.y}`,
        'Z'
      ].join(' ')
    }

    currentAngle = eAngle

    return {
      pathData,
      color: colors[index % colors.length],
      label: labels[index],
      value,
      percentage,
      isActive
    }
  })
})

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInRadians: number
) {
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function handleSliceClick(event: MouseEvent | KeyboardEvent, index: number) {
  onsliceclick?.(event, {
    index,
    label: labels[index],
    value: data[index]
  })

  // Toggle active slice
  const newActive = activeSlice === index ? null : index
  onactivechange?.(new CustomEvent('activechange', { detail: { index: newActive } }))
}

function handleMouseEnter(index: number, event: MouseEvent) {
  if (!showTooltips) return
  hoveredIndex = index
  const svg = (event.currentTarget as SVGElement).closest('svg')
  if (svg) {
    const rect = svg.getBoundingClientRect()
    tooltipX = event.clientX - rect.left
    tooltipY = event.clientY - rect.top
  }
}

function handleMouseMove(event: MouseEvent) {
  if (!showTooltips || hoveredIndex < 0) return
  const svg = (event.currentTarget as SVGElement).closest('svg')
  if (svg) {
    const rect = svg.getBoundingClientRect()
    tooltipX = event.clientX - rect.left
    tooltipY = event.clientY - rect.top
  }
}

function handleMouseLeave() {
  hoveredIndex = -1
}
</script>

<div class="flex flex-col items-center gap-4" {...restProps} role="region" aria-label={title || 'Pie chart visualization'}>
  {#if title}
    <h3 class="text-lg font-semibold text-text dark:text-text">{title}</h3>
  {/if}

  <div class="relative">
    <svg
      width={size}
      height={size}
      viewBox="0 0 {size} {size}"
      class="drop-shadow-sm"
      role="img"
      aria-label={title || 'Pie chart'}
    >
      {#each slices as slice, i}
        <path
          d={slice.pathData}
          fill={slice.color}
          class="pie-slice cursor-pointer transition-transform duration-200 ease-out {hoveredIndex === i ? 'opacity-80 drop-shadow-md' : 'hover:opacity-90'} {slice.isActive ? 'drop-shadow-lg' : ''}"
          role="button"
          tabindex="0"
          aria-label="{slice.label}: {slice.value} ({slice.percentage}%)"
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleSliceClick(e, i);
            }
          }}
          onclick={(e) => handleSliceClick(e, i)}
          onmouseenter={(e) => handleMouseEnter(i, e)}
          onmousemove={handleMouseMove}
          onmouseleave={handleMouseLeave}
        ></path>
      {/each}
    </svg>

    {#if isDonut && (centerText || centerSubtext)}
      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {#if centerText}
          <span class="text-2xl font-bold text-text dark:text-text">{centerText}</span>
        {/if}
        {#if centerSubtext}
          <span class="text-xs text-muted dark:text-muted">{centerSubtext}</span>
        {/if}
      </div>
    {/if}

    {#if showTooltips && hoveredIndex >= 0}
      <div
        class="absolute pointer-events-none z-10 px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-lg"
        style="left: {tooltipX}px; top: {tooltipY - 40}px; transform: translateX(-50%);"
      >
        {slices[hoveredIndex].label}: {slices[hoveredIndex].value} ({slices[hoveredIndex].percentage}%)
      </div>
    {/if}
  </div>

  {#if showLegend}
    <div class="flex flex-wrap justify-center gap-4">
      {#each slices as slice, i}
        <button
          type="button"
          class="flex items-center gap-2 rounded px-1.5 py-0.5 transition-colors duration-150 {slice.isActive ? 'bg-surface ring-1 ring-border' : 'hover:bg-hover'}"
          onclick={() => {
            const newActive = activeSlice === i ? null : i
            onactivechange?.(new CustomEvent('activechange', { detail: { index: newActive } }))
          }}
        >
          <div
            class="h-3 w-3 rounded-full shrink-0"
            style="background-color: {slice.color}"
            aria-hidden="true"
          ></div>
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {slice.label} ({slice.percentage}%)
          </span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../../twintrinsic.css";
</style>
