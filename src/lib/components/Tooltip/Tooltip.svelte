<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for the tooltip element", default: "crypto.randomUUID()", optional: true },
  { name: "content", type: "string", description: "Plain-text tooltip content", default: "\"\"", optional: true },
  { name: "position", type: "string", description: "Position of the tooltip relative to the trigger (top, right, bottom, left)", default: "\"top\"", optional: true },
  { name: "arrow", type: "boolean", description: "Whether to show the arrow", default: "true", optional: true },
  { name: "offset", type: "number", description: "Distance in pixels between the tooltip and its trigger", default: "8", optional: true },
  { name: "tooltipContent", type: "import(\"svelte\").Snippet", description: "Snippet rendered as the tooltip content (overrides `content`)", optional: true },
];
</script>

<script lang="ts">
/**
 * @component
 * Tooltip - Displays additional information when users hover or focus on an element.
 *
 * Built on the native Popover API (`popover="hint"`), the `interestfor`
 * attribute (Interest Invokers API, Chrome 142+), and CSS Anchor Positioning
 * for automatic placement with flip behavior. Zero JavaScript is used for
 * show/hide or positioning in modern browsers.
 *
 * The `interestfor` attribute is only supported on `<button>` and `<a>`
 * elements, so the trigger is always rendered as a transparent `<button>`.
 * The children snippet renders inside this button.
 *
 * The browser automatically:
 * - Wires `aria-describedby` (or `aria-details`) on the trigger
 * - Shows the popover on hover/focus, hides on blur/move-away
 * - Provides light-dismiss via Esc key
 * - Excludes mutual hint popovers (opening one closes others)
 * - Positions the tooltip via CSS Anchor Positioning with flip fallbacks
 *
 * Usage:
 * ```svelte
 * <Tooltip content="Save changes to your profile">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * <Tooltip position="bottom" content="More details">
 *   <IconInfo />
 * </Tooltip>
 * ```
 */
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for the tooltip element */
  id = crypto.randomUUID(),

  /** @type {string} - Plain-text tooltip content */
  content = "",

  /** @type {string} - Position of the tooltip relative to the trigger (top, right, bottom, left) */
  position = "top",

  /** @type {boolean} - Whether to show the arrow */
  arrow = true,

  /** @type {number} - Distance in pixels between the tooltip and its trigger */
  offset = 8,

  children = undefined,

  /** @type {import("svelte").Snippet} - Snippet rendered as the tooltip content (overrides `content`) */
  tooltipContent = undefined,
} = $props()

/** Unique anchor name linking the trigger to the tooltip via CSS Anchor Positioning. */
const anchorName = $derived(`--tooltip-${id}`)
</script>

<span class="tooltip-wrapper {className}">
  <!--
    Trigger: interestfor wires hover/focus → popover open, and automatically
    sets aria-describedby (plaintext) or aria-details (interactive content).
    Must be a <button> or <a> — interestfor only works on these elements.
    The anchor-name links to the tooltip's position-anchor for CSS tethering.
  -->
  <button
    class="tooltip-trigger"
    interestfor="{id}-tooltip"
    style="anchor-name: {anchorName}"
    type="button"
  >
    {@render children?.()}
  </button>

  <!--
    Tooltip: popover="hint" gives top-layer rendering, light-dismiss (Esc),
    and mutual exclusion with other hint popovers. CSS Anchor Positioning
    handles placement and flip — zero JS positioning.
  -->
  <div
    id="{id}-tooltip"
    class="tooltip tooltip-{position} {arrow ? 'tooltip-arrow' : ''}"
    popover="hint"
    style="position-anchor: {anchorName}; margin: {offset}px;"
  >
    {#if tooltipContent}
      {@render tooltipContent()}
    {:else}
      {content}
    {/if}
  </div>
</span>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .tooltip-wrapper {
    @apply inline-block relative;
  }

  .tooltip-trigger {
    @apply inline-block p-0 m-0 border-0 bg-transparent;
    appearance: none;
    font: inherit;
    color: inherit;
    line-height: inherit;
    cursor: inherit;

    /* Reset button styles so children render naturally */
    &::-webkit-details-marker,
    &::marker {
      display: none;
      content: "";
    }
  }

  .tooltip {
    @apply z-50 max-w-xs;
    @apply bg-surface text-text;
    @apply border border-border rounded-md shadow-md;
    @apply px-3 py-2 text-sm;

    /* Reset popover defaults for anchor positioning */
    inset: auto;
    width: max-content;

    /* Anchor positioning — use anchor() functions (polyfill-compatible) */
    &.tooltip-top {
      bottom: anchor(top);
      left: anchor(center);
      translate: -50% 0;
    }
    &.tooltip-bottom {
      top: anchor(bottom);
      left: anchor(center);
      translate: -50% 0;
    }
    &.tooltip-left {
      right: anchor(left);
      top: anchor(center);
      translate: 0 -50%;
    }
    &.tooltip-right {
      left: anchor(right);
      top: anchor(center);
      translate: 0 -50%;
    }

    /* Flip when near viewport edge */
    position-try-fallbacks: flip-block, flip-inline;
  }

  /* Popover open state — polyfill uses .\:popover-open class */
  .tooltip:is(:popover-open, .\:popover-open) {
    display: block;
  }

  /* Arrow pseudo-element */
  .tooltip-arrow::before {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    transform: rotate(45deg);
    background: inherit;
    border: inherit;
  }

  .tooltip-top.tooltip-arrow::before {
    bottom: -0.25rem;
    left: 50%;
    translate: -50% 0;
    border-top: none;
    border-left: none;
  }

  .tooltip-bottom.tooltip-arrow::before {
    top: -0.25rem;
    left: 50%;
    translate: -50% 0;
    border-bottom: none;
    border-right: none;
  }

  .tooltip-left.tooltip-arrow::before {
    right: -0.25rem;
    top: 50%;
    translate: 0 -50%;
    border-bottom: none;
    border-left: none;
  }

  .tooltip-right.tooltip-arrow::before {
    left: -0.25rem;
    top: 50%;
    translate: 0 -50%;
    border-top: none;
    border-right: none;
  }

  /* Entry animation via @starting-style + transition-behavior: allow-discrete */
  .tooltip {
    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity 150ms ease,
      transform 150ms ease,
      overlay 150ms allow-discrete,
      display 150ms allow-discrete;
  }

  .tooltip:is(:popover-open, .\:popover-open) {
    opacity: 1;
    transform: scale(1);
  }

  @starting-style {
    .tooltip:is(:popover-open, .\:popover-open) {
      opacity: 0;
      transform: scale(0.95);
    }
  }
</style>
