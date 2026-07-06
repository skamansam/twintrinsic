<!--
@component
LazyPanel - A Panel that only renders its body once it becomes visible in the viewport.
Useful for expandable panels holding lazy content.

Usage:
```svelte
<LazyPanel>
  {#snippet header()}Lazy Content{/snippet}
  {#snippet loading()}Loading...{/snippet}
  <ExpensiveComponent />
</LazyPanel>
```
-->
<script lang="ts">
import { onMount } from "svelte"
import type { Snippet } from "svelte"
import Panel from "../Panel/Panel.svelte"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Whether the panel is expanded initially */
  expanded?: boolean
  /** Root margin for the intersection observer */
  rootMargin?: string
  /** Threshold for the intersection observer */
  threshold?: number
  /** Header content (forwarded to Panel) */
  header?: Snippet
  /** Loading placeholder rendered until visibility */
  loading?: Snippet
  /** Lazy body content (rendered after visibility) */
  children?: Snippet
}

const {
  class: className = "",
  id = crypto.randomUUID(),
  expanded = true,
  rootMargin = "50px",
  threshold = 0,
  header = undefined,
  loading = undefined,
  children = undefined,
}: Props = $props()

let isVisible = $state(false)
let sentinel: HTMLElement | undefined = $state()
let observer: IntersectionObserver | undefined

onMount(() => {
  if (!("IntersectionObserver" in window)) {
    isVisible = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        isVisible = true
        observer?.disconnect()
      }
    },
    { root: null, rootMargin, threshold }
  )
  if (sentinel) observer.observe(sentinel)
  return () => observer?.disconnect()
})
</script>

<div bind:this={sentinel} class="lazy-panel-sentinel {className}">
  {#if isVisible}
    <Panel {expanded} {id}>
      {#if header}
        {@render header()}
      {/if}
      {@render children?.()}
    </Panel>
  {:else if loading}
    {@render loading()}
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .lazy-panel-sentinel {
    @apply min-h-[20px];
  }
</style>
