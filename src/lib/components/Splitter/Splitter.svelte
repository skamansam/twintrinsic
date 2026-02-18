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
-->
<script lang="ts">
import { onMount } from "svelte"

interface Props {
  class?: string
  id?: string
  orientation?: "horizontal" | "vertical"
  initialSize?: number
  minSize?: number
  maxSize?: number
  storageKey?: string
  onresize?: (size: number) => void
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  orientation = "horizontal",
  initialSize = 50,
  minSize = 20,
  maxSize = 80,
  storageKey,
  onresize,
}: Props = $props()

let size = $state(initialSize)
let isDragging = $state(false)
let containerRef = $state<HTMLDivElement>()

onMount(() => {
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
</script>

<div
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
    <slot name="first" />
  </div>

  <div
    class={orientation === "horizontal"
      ? "splitter-divider-horizontal"
      : "splitter-divider-vertical"}
    role="button"
    tabindex="0"
    aria-label={orientation === "horizontal"
      ? "Resize panels left and right"
      : "Resize panels up and down"}
    aria-orientation={orientation}
    onmousedown={handleMouseDown}
    onkeydown={handleKeyDown}
  ></div>

  <div class="splitter-panel splitter-panel-second" style="flex: 1 1 auto">
    <slot name="second" />
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
