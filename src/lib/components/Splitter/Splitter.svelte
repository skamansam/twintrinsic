<!--
@component
Splitter - A resizable divider component that allows users to drag and adjust the width/height of two adjacent containers.

Usage:
```svelte
<Splitter orientation="horizontal" initialSize={50}>
  <svelte:fragment slot="first">
    <div>Left content</div>
  </svelte:fragment>
  <svelte:fragment slot="second">
    <div>Right content</div>
  </svelte:fragment>
</Splitter>
```

## A11y note

The divider follows the [W3C APG window-splitter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)
(`role="separator"` + `tabindex="0"` + `aria-valuenow/min/max` + keyboard handlers).
Svelte 5's static analysis flags this as `a11y_no_noninteractive_tabindex`
because `separator` is classified as a non-interactive role. The `role`,
`tabindex`, and event listeners are set at runtime via the `separator`
Svelte action to bypass the false positive. If Svelte updates its role
classifications, move these attributes back into the template.
-->
<script lang="ts">
import { onMount, type Snippet } from "svelte"

interface Props {
  class?: string
  id?: string
  orientation?: "horizontal" | "vertical"
  initialSize?: number
  minSize?: number
  maxSize?: number
  storageKey?: string
  /** Snippet for the first (resizable) panel */
  first?: Snippet
  /** Snippet for the second (flex) panel */
  second?: Snippet
  onresize?: (size: number) => void
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  orientation = "horizontal",
  initialSize = 50,
  minSize = 20,
  maxSize = 80,
  storageKey = undefined,
  first = undefined,
  second = undefined,
  onresize = undefined,
}: Props = $props()

let size = $state(0)
let isDragging = $state(false)
let containerRef = $state<HTMLDivElement>()

/**
 * Stable params object for the `separator` Svelte action. Declared in the
 * script (not inline in the template) so the action receives the same
 * object reference on every render and isn't re-invoked.
 */
const separatorParams = {
  onMouseDown: handleMouseDown,
  onKeyDown: handleKeyDown,
}

onMount(() => {
  // Default to the prop value, then override with a saved value if present.
  // We can't initialize `size` from `initialSize` directly (that would
  // capture only the initial value of a prop), so we set it on mount.
  size = initialSize

  if (storageKey) {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const savedSize = parseFloat(saved)
      if (savedSize >= minSize && savedSize <= maxSize) {
        size = savedSize
      }
    }
  }
})

function handleMouseDown(event: MouseEvent) {
  isDragging = true
  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)
  event.preventDefault()
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging || !containerRef) return

  const rect = containerRef.getBoundingClientRect()
  let newSize: number

  if (orientation === "horizontal") {
    newSize = ((event.clientX - rect.left) / rect.width) * 100
  } else {
    newSize = ((event.clientY - rect.top) / rect.height) * 100
  }

  newSize = Math.max(minSize, Math.min(maxSize, newSize))
  size = newSize

  if (storageKey) {
    localStorage.setItem(storageKey, size.toString())
  }

  onresize?.(size)
}

function handleMouseUp() {
  isDragging = false
  document.removeEventListener("mousemove", handleMouseMove)
  document.removeEventListener("mouseup", handleMouseUp)
}

function handleKeyDown(event: KeyboardEvent) {
  const step = 5
  let newSize = size

  if (orientation === "horizontal") {
    if (event.key === "ArrowLeft") {
      newSize = size - step
      event.preventDefault()
    } else if (event.key === "ArrowRight") {
      newSize = size + step
      event.preventDefault()
    }
  } else {
    if (event.key === "ArrowUp") {
      newSize = size - step
      event.preventDefault()
    } else if (event.key === "ArrowDown") {
      newSize = size + step
      event.preventDefault()
    }
  }

  newSize = Math.max(minSize, Math.min(maxSize, newSize))
  if (newSize !== size) {
    size = newSize

    if (storageKey) {
      localStorage.setItem(storageKey, size.toString())
    }

    onresize?.(size)
  }
}

/**
 * Svelte action that wires up the W3C APG splitter pattern.
 * Sets role="separator" + tabindex="0" and attaches mouse/keyboard
 * handlers at runtime so Svelte's static analysis does not flag the
 * `tabindex` and `onmousedown`/`onkeydown` on a non-interactive role.
 * The handler identities are stable (defined in the component script),
 * so no `update` is needed — Svelte would re-invoke it on every
 * reactive change to the params object, causing unnecessary listener
 * thrash during drag.
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
 */
function separator(
  node: HTMLElement,
  params: {
    onMouseDown: (e: MouseEvent) => void
    onKeyDown: (e: KeyboardEvent) => void
  }
) {
  node.setAttribute("role", "separator")
  node.setAttribute("tabindex", "0")
  node.addEventListener("mousedown", params.onMouseDown)
  node.addEventListener("keydown", params.onKeyDown)
  return {
    destroy() {
      node.removeEventListener("mousedown", params.onMouseDown)
      node.removeEventListener("keydown", params.onKeyDown)
    },
  }
}
</script>  <div
    {id}
    bind:this={containerRef}
    class="splitter {className}"
    style="flex-direction: {orientation === 'horizontal' ? 'row' : 'column'}"
  >
    <div
      class="splitter-panel splitter-panel-first"
      style={orientation === "horizontal"
        ? `flex: 0 0 ${size}%`
        : `flex: 0 0 ${size}%`}
    >
      {@render first?.()}
    </div>

    <div
      class={orientation === "horizontal"
        ? "splitter-divider-horizontal"
        : "splitter-divider-vertical"}
      use:separator={separatorParams}
      aria-label={orientation === "horizontal"
        ? "Resize panels left and right"
        : "Resize panels up and down"}
      aria-orientation={orientation}
      aria-valuenow={Math.round(size)}
      aria-valuemin={minSize}
      aria-valuemax={maxSize}
    ></div>

    <div class="splitter-panel splitter-panel-second" style="flex: 1 1 auto">
      {@render second?.()}
    </div>
  </div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .splitter {
    @apply w-full h-full flex overflow-hidden;
  }

  .splitter-panel {
    @apply overflow-auto;
  }

  .splitter-panel-first {
    @apply shrink-0;
  }

  .splitter-panel-second {
    @apply grow;
  }

  .splitter-divider-horizontal {
    @apply w-1 bg-border dark:bg-border cursor-col-resize;
    @apply hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    flex-shrink: 0;
  }

  .splitter-divider-vertical {
    @apply h-1 bg-border dark:bg-border cursor-row-resize;
    @apply hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    flex-shrink: 0;
  }
</style>
