<!--
@component
Timer - A countdown/count-up display with pause/resume/reset controls.
Renders a large monospace readout backed by one of three display variants
(Progress bar, GaugeChart, or KPICard) plus optional built-in controls.

Usage:
```svelte
<Timer duration={90} />

<Timer mode="countup" duration={30} variant="gauge" label="Elapsed" />

<Timer duration={300} variant="kpi" showControls={false} />
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "mode", type: "\"countdown\" | \"countup\"", description: "Timing mode", default: "\"countdown\"", optional: true },
  { name: "duration", type: "number", description: "Total duration in seconds (countdown length or countup target)", default: "60", optional: true },
  { name: "autoStart", type: "boolean", description: "Whether the timer starts running on mount", default: "true", optional: true },
  { name: "loop", type: "boolean", description: "Whether the timer restarts automatically when it completes", default: "false", optional: true },
  { name: "variant", type: "\"bar\" | \"gauge\" | \"kpi\"", description: "Display variant", default: "\"bar\"", optional: true },
  { name: "label", type: "string", description: "Label shown with the display", optional: true },
  { name: "format", type: "(milliseconds: number) => string", description: "Custom formatter for the displayed time (receives milliseconds)", optional: true },
  { name: "color", type: "\"primary\" | \"secondary\" | \"success\" | \"danger\" | \"warning\" | \"info\"", description: "Color theme for the display", default: "\"primary\"", optional: true },
  { name: "size", type: "number", description: "Gauge diameter in pixels (gauge variant only)", default: "180", optional: true },
  { name: "showControls", type: "boolean", description: "Whether to show the built-in pause/resume and reset controls", default: "true", optional: true },
  { name: "pauseLabel", type: "string", description: "Accessible label for the pause button", default: "\"Pause timer\"", optional: true },
  { name: "resumeLabel", type: "string", description: "Accessible label for the resume button", default: "\"Resume timer\"", optional: true },
  { name: "resetLabel", type: "string", description: "Accessible label for the reset button", default: "\"Reset timer\"", optional: true },
  { name: "running", type: "boolean", description: "Externally controlled running state (omit for self-managed timing)", optional: true },
  { name: "showReadout", type: "boolean", description: "Whether to show the large time readout", default: "true", optional: true },
  { name: "onupdate", type: "(event: CustomEvent<{ elapsed: number; remaining: number; percent: number }>) => void", description: "Update event fired on each tick", optional: true, eventDetail: "{ elapsed: number; remaining: number; percent: number }" },
  { name: "oncomplete", type: "(event: CustomEvent<{ elapsed: number; duration: number }>) => void", description: "Complete event fired when the timer reaches its duration", optional: true, eventDetail: "{ elapsed: number; duration: number }" },
];
</script>

<script lang="ts">
import Icon from "../Icon/Icon.svelte"
import GaugeChart from "../Metrics/GaugeChart/GaugeChart.svelte"
import KPICard from "../Metrics/KPICard/KPICard.svelte"
import Progress from "../Progress/Progress.svelte"

interface Props {
  /** Additional CSS classes */
  class?: string;
  /** HTML id for accessibility */
  id?: string;
  /** Timing mode */
  mode?: "countdown" | "countup";
  /** Total duration in seconds (countdown length or countup target) */
  duration?: number;
  /** Whether the timer starts running on mount */
  autoStart?: boolean;
  /** Whether the timer restarts automatically when it completes */
  loop?: boolean;
  /** Display variant */
  variant?: "bar" | "gauge" | "kpi";
  /** Label shown with the display */
  label?: string;
  /** Custom formatter for the displayed time (receives milliseconds) */
  format?: (milliseconds: number) => string;
  /** Color theme for the display */
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  /** Gauge diameter in pixels (gauge variant only) */
  size?: number;
  /** Whether to show the built-in pause/resume and reset controls */
  showControls?: boolean;
  /** Accessible label for the pause button */
  pauseLabel?: string;
  /** Accessible label for the resume button */
  resumeLabel?: string;
  /** Accessible label for the reset button */
  resetLabel?: string;
  /** Externally controlled running state (omit for self-managed timing) */
  running?: boolean;
  /** Whether to show the large time readout */
  showReadout?: boolean;
  /** Update event fired on each tick */
  onupdate?: (event: CustomEvent<{ elapsed: number; remaining: number; percent: number }>) => void;
  /** Complete event fired when the timer reaches its duration */
  oncomplete?: (event: CustomEvent<{ elapsed: number; duration: number }>) => void;
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown;
  [key: `aria-${string}`]: string | undefined;
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  mode = "countdown",
  duration = 60,
  autoStart = true,
  loop = false,
  variant = "bar",
  label = undefined,
  format = undefined,
  color = "primary",
  size = 180,
  showControls = true,
  pauseLabel = "Pause timer",
  resumeLabel = "Resume timer",
  resetLabel = "Reset timer",
  running = undefined,
  showReadout = true,
  onupdate = undefined,
  oncomplete = undefined,
  ...restProps
}: Props = $props()

/** Interval tick in milliseconds */
const TICK_MS = 100

/** Milliseconds elapsed since the timer started */
let elapsed = $state(0)

/** Whether the timer is currently running */
// svelte-ignore state_referenced_locally -- autoStart is intentionally read once at mount
let isRunning = $state(running ?? autoStart)

/** Total duration in milliseconds */
const durationMs = $derived(duration * 1000)

/** Milliseconds remaining (countdown mode) */
const remainingMs = $derived(Math.max(0, durationMs - elapsed))

/** Completion percentage 0-100 (elapsed / duration) */
const percent = $derived(Math.min(100, (elapsed / durationMs) * 100))

/** Milliseconds to display (remaining for countdown, elapsed for countup) */
const displayMs = $derived(mode === "countdown" ? remainingMs : Math.min(elapsed, durationMs))

/** Format a millisecond value as HH:MM:SS (or MM:SS under an hour) */
function formatClock(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (value: number) => String(value).padStart(2, "0")
  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`
}

/** Formatted time string for the readout */
const formattedTime = $derived(format ? format(displayMs) : formatClock(displayMs))

/** Seconds value passed to the display variant */
const displaySeconds = $derived(Math.round(displayMs / 1000))

/** Progress variant (maps danger -> error, which Progress expects) */
const progressVariant = $derived(color === "danger" ? "error" : color)

/** Advance the timer by one tick */
function tick(): void {
  elapsed += TICK_MS
  onupdate?.(new CustomEvent("update", {
    detail: { elapsed, remaining: remainingMs, percent },
  }))
  if (elapsed >= durationMs) complete()
}

/** Sync the externally controlled `running` prop into local state */
$effect(() => {
  if (running !== undefined) isRunning = running
})

/** Start (or resume) the timer */
function start(): void {
  if (isRunning) return
  isRunning = true
}

/** Pause the timer without resetting the elapsed time */
function pause(): void {
  isRunning = false
}

/** Reset the elapsed time back to zero (and pause) */
function reset(): void {
  pause()
  elapsed = 0
}

/** Toggle between running and paused */
function toggle(): void {
  if (isRunning) pause()
  else start()
}

/** Handle timer completion */
function complete(): void {
  // Stop the local tick regardless of control mode so completion can't loop
  isRunning = false
  oncomplete?.(new CustomEvent("complete", { detail: { elapsed, duration } }))
  if (loop) {
    elapsed = 0
    start()
  }
}

/** Keep the interval alive while running, cleaning up on pause/unmount */
$effect(() => {
  if (!isRunning) return
  const intervalId = setInterval(tick, TICK_MS)
  return () => clearInterval(intervalId)
})
</script>

<div {...restProps} {id} class="timer flex flex-col items-center gap-3 {className}">
  {#if showReadout}
    <div
      role="timer"
      class="text-4xl font-mono font-semibold tabular-nums text-text dark:text-text"
    >
      {formattedTime}
    </div>
  {/if}

  {#if variant === "gauge"}
    <GaugeChart
      value={displaySeconds}
      min={0}
      max={duration}
      {label}
      {color}
      {size}
    />
  {:else if variant === "kpi"}
    <KPICard
      label={label || "Time left"}
      value={displaySeconds}
      target={duration}
      {color}
      onclick={toggle}
    />
  {:else}
    <Progress
      value={displaySeconds}
      max={duration}
      {label}
      variant={progressVariant}
      class="max-w-sm"
    />
  {/if}

  {#if showControls}
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="timer-control"
        aria-label={isRunning ? pauseLabel : resumeLabel}
        onclick={isRunning ? pause : start}
      >
        <Icon name={isRunning ? "tabler:pause" : "tabler:play"} class="w-4 h-4" />
      </button>
      <button
        type="button"
        class="timer-control"
        aria-label={resetLabel}
        onclick={reset}
      >
        <Icon name="tabler:rotate-ccw" class="w-4 h-4" />
      </button>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .timer-control {
    @apply p-2 rounded-md text-text dark:text-text;
    @apply hover:bg-hover hover:text-primary-500;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500;
    @apply transition-colors duration-150;
  }
</style>