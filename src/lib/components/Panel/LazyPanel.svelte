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
<script>
import { onMount } from "svelte"
import Panel from "./Panel.svelte"

const {
  /** @type {boolean} - Whether the panel is expanded */
  expanded = true,

  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label */
  ariaLabel,

  /** @type {boolean} - Whether to disable the panel controls */
  disabled = false,

  /** @type {boolean} - Whether to show a border */
  bordered = true,

  /** @type {boolean} - Whether to show the expand/collapse icon */
  showIcon = true,

  /** @type {number} - Root margin for intersection observer */
  rootMargin = "50px",

  /** @type {number} - Threshold for intersection observer */
  threshold = 0,

  children,
  header,
  loading,
} = $props()

let isVisible = $state(false)
let panelElement
let observer

onMount(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        isVisible = true
        // Once visible, disconnect the observer
        observer.disconnect()
      }
    },
    {
      rootMargin,
      threshold,
    }
  )

  if (panelElement) {
    observer.observe(panelElement)
  }

  return () => {
    if (observer) {
      observer.disconnect()
    }
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
  >
    <svelte:fragment slot="header">
      {@render header?.()}
    </svelte:fragment>

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
