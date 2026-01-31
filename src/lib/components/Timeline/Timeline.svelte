<script lang="ts">
/**
 * @component
 * Timeline - A component for displaying chronological events or steps.
 * Provides consistent styling, accessibility features, and various display options.
 *
 * Usage:
 * ```svelte
 * <Timeline>
 *   <TimelineItem title="Step 1">Content for step 1</TimelineItem>
 *   <TimelineItem title="Step 2">Content for step 2</TimelineItem>
 *   <TimelineItem title="Step 3">Content for step 3</TimelineItem>
 * </Timeline>
 *
 * <Timeline variant="primary" position="alternate">
 *   <TimelineItem title="Event 1" date="Jan 2023">Event details</TimelineItem>
 *   <TimelineItem title="Event 2" date="Feb 2023" variant="success">Event details</TimelineItem>
 *   <TimelineItem title="Event 3" date="Mar 2023" variant="error">Event details</TimelineItem>
 * </Timeline>
 * ```
 */
import { setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Visual style variant for all items */
  variant = "primary",

  /** @type {string} - Position of content relative to the line (left, right, alternate) */
  position = "left",

  /** @type {string} - Orientation of the timeline (vertical, horizontal) */
  orientation = "vertical",

  /** @type {boolean} - Whether to reverse the order of items */
  reverse = false,

  /** @type {boolean} - Whether to show connecting lines between items */
  connected = true,

  /** @type {boolean} - Whether to animate items when they enter the viewport */
  animated = false,

  /** @type {string} - ARIA label for the timeline */
  ariaLabel = "Timeline",

  children,
} = $props()

// Provide context for child components
$effect(() => {
  setContext("timeline", {
    variant,
    position,
    orientation,
    connected,
    animated,
  })
})
</script>

<div
  {id}
  class="
    timeline
    timeline-{orientation}
    timeline-position-{position}
    {reverse ? 'timeline-reverse' : ''}
    {connected ? 'timeline-connected' : ''}
    {animated ? 'timeline-animated' : ''}
    {className}
  "
  role="list"
  aria-label={ariaLabel}
>
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .timeline {
    @apply relative w-full;
  }
  
  .timeline-vertical {
    @apply flex flex-col;
  }
  
  .timeline-horizontal {
    @apply flex flex-row;
  }
  
  .timeline-reverse.timeline-vertical {
    @apply flex-col-reverse;
  }
  
  .timeline-reverse.timeline-horizontal {
    @apply flex-row-reverse;
  }
  
  /* Connected line for vertical timeline */
  .timeline-vertical.timeline-connected::before {
    content: '';
    @apply absolute top-0 bottom-0 w-0.5;
    @apply bg-border dark:bg-border;
  }
  
  .timeline-vertical.timeline-position-left::before {
    @apply left-6;
  }
  
  .timeline-vertical.timeline-position-right::before {
    @apply right-6;
  }
  
  .timeline-vertical.timeline-position-alternate::before {
    @apply left-1/2 -ml-px;
  }
  
  /* Connected line for horizontal timeline */
  .timeline-horizontal.timeline-connected::before {
    content: '';
    @apply absolute left-0 right-0 h-0.5;
    @apply bg-border dark:bg-border;
  }
  
  .timeline-horizontal.timeline-position-left::before {
    @apply top-6;
  }
  
  .timeline-horizontal.timeline-position-right::before {
    @apply bottom-6;
  }
  
  .timeline-horizontal.timeline-position-alternate::before {
    @apply top-1/2 -mt-px;
  }
</style>
