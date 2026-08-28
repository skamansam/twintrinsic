<!--
@component
LineChart — An SVG line chart with multiple series, grid lines, and legend.
Supports line smoothing (smooth, step), hover tooltips, and click interactivity.
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "series", type: "Series[]", description: "Array of data series", optional: false },
  { name: "labels", type: "string[]", description: "Array of x-axis labels", optional: false },
  { name: "title", type: "string", description: "Chart title", optional: true },
  { name: "yAxisLabel", type: "string", description: "Y-axis label", optional: true },
  { name: "showGrid", type: "boolean", description: "Show grid lines", default: "true", optional: true },
  { name: "curve", type: "'linear' | 'smooth' | 'step'", description: "Line interpolation mode", default: "'linear'", optional: true },
  { name: "onpointclick", type: "(event: MouseEvent | KeyboardEvent, detail: Readonly<{ seriesIndex: number; pointIndex: number; value: number }>) => void", description: "Callback when a point is clicked", optional: true },
  { name: "showLegend", type: "boolean", description: "Show legend", default: "true", optional: true },
  { name: "showTooltips", type: "boolean", description: "Show hover tooltips", default: "true", optional: true },
  { name: "width", type: "number", description: "Width of the chart in pixels", default: "500", optional: true },
  { name: "height", type: "number", description: "Height of the chart in pixels", default: "300", optional: true },
];
</script>

<script lang="ts">
interface Series {
  label: string;
  data: number[];
  color?: string;
}

interface Props {
  /** Array of data series */
  series: Series[];
  /** Array of x-axis labels */
  labels: string[];
  /** Chart title */
  title?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Show grid lines */
  showGrid?: boolean;
  /** Line interpolation mode */
  curve?: 'linear' | 'smooth' | 'step';
  /** Callback when a point is clicked */
  onpointclick?: (event: MouseEvent | KeyboardEvent, detail: Readonly<{ seriesIndex: number; pointIndex: number; value: number }>) => void;
  /** Show legend */
  showLegend?: boolean;
  /** Show hover tooltips */
  showTooltips?: boolean;
  /** Width of the chart in pixels */
  width?: number;
  /** Height of the chart in pixels */
  height?: number;
  [key: `data-${string}`]: unknown;
  [key: `aria-${string}`]: string | undefined;
}

let {
  series,
  labels,
  title = undefined,
  yAxisLabel = undefined,
  showGrid = true,
  curve = 'linear',
  onpointclick = undefined,
  showLegend = true,
  showTooltips = true,
  width = 500,
  height = 300,
  ...restProps
}: Props = $props();

const defaultColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
const padding = { top: 20, right: 20, bottom: 40, left: 50 };

const chartWidth = $derived(width - padding.left - padding.right);
const chartHeight = $derived(height - padding.top - padding.bottom);

const allValues = $derived(series.flatMap((s) => s.data));
const maxValue = $derived(Math.max(...allValues, 0));
const minValue = $derived(Math.min(...allValues, 0));
const yRange = $derived(maxValue - minValue || 1);

const seriesWithColors = $derived(
  series.map((s, i) => ({
    ...s,
    color: s.color || defaultColors[i % defaultColors.length]
  }))
);

let hoveredPoint = $state<{ seriesIndex: number; pointIndex: number; x: number; y: number } | null>(null);

function getX(index: number): number {
  return padding.left + (index / Math.max(labels.length - 1, 1)) * chartWidth;
}

function getY(value: number): number {
  return padding.top + chartHeight - ((value - minValue) / yRange) * chartHeight;
}

function createSmoothPath(data: number[]): string {
  if (data.length < 2) return createPathData(data);
  const points = data.map((v, i) => ({ x: getX(i), y: getY(v) }));
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function createStepPath(data: number[]): string {
  return data
    .map((value, index) => {
      const x = getX(index);
      const y = getY(value);
      if (index === 0) return `M ${x} ${y}`;
      const prevY = getY(data[index - 1]);
      return `L ${x} ${prevY} L ${x} ${y}`;
    })
    .join(' ');
}

function createPathData(data: number[]): string {
  return data
    .map((value, index) => {
      const x = getX(index);
      const y = getY(value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

function getLinePath(data: number[]): string {
  if (curve === 'smooth') return createSmoothPath(data);
  if (curve === 'step') return createStepPath(data);
  return createPathData(data);
}

function handlePointClick(event: MouseEvent | KeyboardEvent, seriesIndex: number, pointIndex: number) {
  onpointclick?.(event, {
    seriesIndex,
    pointIndex,
    value: series[seriesIndex].data[pointIndex]
  });
}

function handlePointEnter(seriesIndex: number, pointIndex: number, event: MouseEvent) {
  if (!showTooltips) return;
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (svg) {
    const rect = svg.getBoundingClientRect();
    hoveredPoint = {
      seriesIndex,
      pointIndex,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}

function handlePointMove(event: MouseEvent) {
  if (!showTooltips || !hoveredPoint) return;
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (svg) {
    const rect = svg.getBoundingClientRect();
    hoveredPoint = {
      ...hoveredPoint,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}

function handlePointLeave() {
  hoveredPoint = null;
}
</script>

<div class="flex flex-col gap-4" {...restProps}>
  {#if title}
    <h3 class="text-lg font-semibold text-text dark:text-text">{title}</h3>
  {/if}

  <div class="relative">
    <svg
      {width}
      {height}
      viewBox="0 0 {width} {height}"
      class="drop-shadow-sm"
      role="img"
      aria-label={title || 'Line chart'}
    >
      <!-- Grid lines -->
      {#if showGrid}
        {#each Array.from({ length: 5 }) as _, i}
          {@const y = padding.top + (chartHeight / 4) * i}
          <line
            x1={padding.left}
            y1={y}
            x2={width - padding.right}
            y2={y}
            stroke="currentColor"
            stroke-width="0.5"
            opacity="0.1"
            class="text-gray-400"
          ></line>
        {/each}
      {/if}

      <!-- Y-axis -->
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={height - padding.bottom}
        stroke="currentColor"
        stroke-width="1"
        class="text-gray-400"
      ></line>

      <!-- X-axis -->
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        stroke="currentColor"
        stroke-width="1"
        class="text-gray-400"
      ></line>

      <!-- Y-axis labels -->
      {#each Array.from({ length: 5 }) as _, i}
        {@const value = minValue + (yRange / 4) * i}
        {@const y = padding.top + (chartHeight / 4) * (4 - i)}
        <text
          x={padding.left - 10}
          y={y + 4}
          text-anchor="end"
          font-size="12"
          fill="currentColor"
          class="text-gray-600 dark:text-gray-400"
        >
          {value.toFixed(0)}
        </text>
      {/each}

      <!-- X-axis labels -->
      {#each labels as label, i}
        {@const x = getX(i)}
        <text
          x={x}
          y={height - padding.bottom + 20}
          text-anchor="middle"
          font-size="12"
          fill="currentColor"
          class="text-gray-600 dark:text-gray-400"
        >
          {label}
        </text>
      {/each}

      <!-- Y-axis label -->
      {#if yAxisLabel}
        <text
          x={-height / 2}
          y={15}
          text-anchor="middle"
          font-size="12"
          fill="currentColor"
          transform="rotate(-90)"
          class="text-gray-600 dark:text-gray-400"
        >
          {yAxisLabel}
        </text>
      {/if}

      <!-- Lines and points -->
      {#each seriesWithColors as s, seriesIndex}
        <!-- Line -->
        <path
          d={getLinePath(s.data)}
          fill="none"
          stroke={s.color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>

        <!-- Points -->
        {#each s.data as value, pointIndex}
          {@const x = getX(pointIndex)}
          {@const y = getY(value)}
          <circle
            cx={x}
            cy={y}
            r="4"
            fill={s.color}
            class="cursor-pointer transition-all"
            role="button"
            tabindex="0"
            aria-label="{s.label}: {value}"
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handlePointClick(e, seriesIndex, pointIndex);
              }
            }}
            onclick={(e) => handlePointClick(e, seriesIndex, pointIndex)}
            onmouseenter={(e) => handlePointEnter(seriesIndex, pointIndex, e)}
            onmousemove={handlePointMove}
            onmouseleave={handlePointLeave}
          ></circle>
        {/each}
      {/each}
    </svg>

    {#if showTooltips && hoveredPoint}
      {@const s = seriesWithColors[hoveredPoint.seriesIndex]}
      {@const val = s.data[hoveredPoint.pointIndex]}
      <div
        class="absolute pointer-events-none z-10 px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-lg"
        style="left: {hoveredPoint.x}px; top: {hoveredPoint.y - 40}px; transform: translateX(-50%);"
      >
        {s.label}: {val}
      </div>
    {/if}
  </div>

  {#if showLegend}
    <div class="flex flex-wrap justify-center gap-4">
      {#each seriesWithColors as s}
        <div class="flex items-center gap-2">
          <div
            class="h-3 w-3 rounded-full"
            style="background-color: {s.color}"
            aria-hidden="true"
          ></div>
          <span class="text-sm text-gray-700 dark:text-gray-300">{s.label}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../../twintrinsic.css";
</style>
