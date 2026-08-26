<!--
@component
LazyPanel - A Panel component that only loads its content when it becomes visible in the viewport.
Built on top of the Panel component with intersection observer for lazy loading.

Usage:
```svelte
<LazyPanel>
  {#snippet header()}Lazy Content{/snippet}
  {#snippet loading()}Loading...{/snippet}
  <ExpensiveComponent />
</LazyPanel>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "expanded", type: "boolean", description: "Whether the panel is expanded", default: "true", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label", optional: true },
  { name: "disabled", type: "boolean", description: "Whether to disable the panel controls", default: "false", optional: true },
  { name: "bordered", type: "boolean", description: "Whether to show a border", default: "true", optional: true },
  { name: "showIcon", type: "boolean", description: "Whether to show the expand/collapse icon", default: "true", optional: true },
  { name: "rootMargin", type: "string", description: "Root margin for intersection observer", default: "\"50px\"", optional: true },
  { name: "threshold", type: "number", description: "Threshold for intersection observer", default: "0", optional: true },
  { name: "header", type: "Snippet", description: "Header content rendered at the top of the panel", optional: true },
  { name: "loading", type: "Snippet", description: "Snippet rendered while the content is loading", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"
import { onMount } from "svelte"
import Panel from "./Panel.svelte"

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** Whether the panel is expanded */
  expanded?: boolean
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** ARIA label */
  ariaLabel?: string
  /** Whether to disable the panel controls */
  disabled?: boolean
  /** Whether to show a border */
  bordered?: boolean
  /** Whether to show the expand/collapse icon */
  showIcon?: boolean
  /** Root margin for intersection observer */
  rootMargin?: string
  /** Threshold for intersection observer */
  threshold?: number
  children?: Snippet
  /** Header content rendered at the top of the panel */
  header?: Snippet
  /** Snippet rendered while the content is loading */
  loading?: Snippet
}

let {
  expanded = true,
  class: className = "",
  id = crypto.randomUUID(),
  ariaLabel,
  disabled = false,
  bordered = true,
  showIcon = true,
  rootMargin = "50px",
  threshold = 0,
  children,
  header,
  loading,
  ...restProps
}: Props = $props()

let isVisible = $state(false)
let panelElement: HTMLElement | undefined = $state()
let observer: IntersectionObserver | undefined

onMount(() => {
  const obs = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        isVisible = true
        // Once visible, disconnect the observer
        obs.disconnect()
        observer = undefined
      }
    },
    {
      rootMargin,
      threshold,
    }
  )
  observer = obs

  if (panelElement) {
    obs.observe(panelElement)
  }

  return () => {
    obs.disconnect()
    observer = undefined
  }
})
</script>

<div {...restProps} bind:this={panelElement}>
  <Panel
    {expanded}
    class={className}
    {id}
    {ariaLabel}
    {disabled}
    {bordered}
    {showIcon}
    {header}
  >
    {#if isVisible}
      {@render children?.()}
    {:else if loading}
      {@render loading()}
    {:else}
      Loading...
    {/if}
  </Panel>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
</style>
