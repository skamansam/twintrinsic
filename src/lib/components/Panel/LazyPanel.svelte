<!--
@component
LazyPanel - A Panel component that only loads its content when it becomes visible in the viewport.
Built on top of the Panel component with intersection observer for lazy loading.

Usage:
```svelte
<LazyPanel>
  <svelte:fragment slot="header">Lazy Content</svelte:fragment>
  <svelte:fragment slot="loading">Loading...</svelte:fragment>
  <ExpensiveComponent />
</LazyPanel>
```
-->
<script lang="ts">
import { onMount } from "svelte"
import type { Snippet } from "svelte"
import Panel from "./Panel.svelte"

interface Props {
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
  header?: Snippet
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

<div bind:this={panelElement}>
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
