<!--
@component
Menu - A dropdown menu component using the native Popover API with CSS Anchor Positioning.

Renders a trigger button and a popover content panel positioned relative to the trigger.
Supports full WAI-ARIA keyboard navigation (arrow keys, Enter, Esc, Home/End).

Usage:
```svelte
<Menu>
  {#snippet trigger()}<Button>Open Menu</Button>{/snippet}
  {#snippet content()}
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
  {/snippet}
</Menu>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for the menu trigger", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the menu", default: "\"Menu\"", optional: true },
  { name: "trigger", type: "Snippet", description: "Trigger button content", optional: true },
  { name: "content", type: "Snippet", description: "Popup menu content", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for the menu trigger */
  id?: string
  /** ARIA label for the menu */
  ariaLabel?: string
  /** Trigger button content */
  trigger?: Snippet
  /** Popup menu content */
  content?: Snippet
}

const {
  class: className = "",
  id = crypto.randomUUID(),
  ariaLabel = "Menu",
  trigger = undefined,
  content = undefined,
}: Props = $props()

let menuEl: HTMLDivElement | undefined = $state()

/** Whether the Popover API is available (native or polyfilled). */
const hasPopoverAPI = typeof HTMLElement !== "undefined" && "popover" in HTMLElement.prototype

/** Check whether the popover is currently open (polyfill-robust). */
function isPopoverOpen(el: HTMLElement | null | undefined): boolean {
  if (!el) return false
  return (el as any).popover === "auto" && el.matches(":popover-open") || el.classList.contains(".\\:popover-open")
}

/** Show the popover, focusing the first focusable menu item. */
function openMenu() {
  if (!menuEl) return
  try {
    menuEl.showPopover()
  } catch { /* already open */ }
  requestAnimationFrame(() => {
    const first = menuEl?.querySelector('[role="menuitem"]:not([aria-disabled="true"])') as HTMLElement | null
    first?.focus()
  })
}

/** Close the popover and return focus to the trigger. */
function closeMenu() {
  if (!menuEl) return
  try {
    menuEl.hidePopover()
  } catch { /* already closed */ }
}

/** Toggle open/close. */
function toggleMenu() {
  if (isPopoverOpen(menuEl)) {
    closeMenu()
  } else {
    openMenu()
  }
}

/**
 * WAI-ARIA menu keyboard navigation.
 * - ArrowDown/ArrowUp: Move focus between items (wrapping)
 * - Enter: Activate item
 * - Escape: Close menu
 * - Home/End: Jump to first/last item
 */
function handleKeydown(e: KeyboardEvent) {
  if (!menuEl) return
  const items = Array.from(
    menuEl.querySelectorAll('[role="menuitem"]')
  ) as HTMLElement[]
  const currentIndex = items.indexOf(e.target as HTMLElement)

  switch (e.key) {
    case "ArrowDown": {
      e.preventDefault()
      const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      items[next]?.focus()
      break
    }
    case "ArrowUp": {
      e.preventDefault()
      const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      items[prev]?.focus()
      break
    }
    case "Home": {
      e.preventDefault()
      items[0]?.focus()
      break
    }
    case "End": {
      e.preventDefault()
      items[items.length - 1]?.focus()
      break
    }
    case "Enter":
    case " ": {
      e.preventDefault()
      ;(e.target as HTMLElement)?.click()
      closeMenu()
      break
    }
    case "Escape": {
      e.preventDefault()
      closeMenu()
      break
    }
  }
}

/** Close when focus leaves the menu entirely. */
function handleFocusOut(e: FocusEvent) {
  requestAnimationFrame(() => {
    if (!menuEl?.contains(document.activeElement)) {
      closeMenu()
    }
  })
}
</script>

<div class="menu {className}" {id}>
  <button
    type="button"
    class="menu-trigger"
    style="anchor-name: --menu-anchor"
    popovertarget={id}
    aria-haspopup="menu"
    aria-label={ariaLabel}
    onclick={toggleMenu}
  >
    {@render trigger?.()}
  </button>

  <div
    bind:this={menuEl}
    id="{id}-panel"
    popover={hasPopoverAPI ? "auto" : undefined}
    class="menu-content"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby={id}
    onkeydown={handleKeydown}
    onfocusout={handleFocusOut}
    tabindex="-1"
  >
    {@render content?.()}
  </div>
</div>

<style lang="postcss">
  @reference "../../../twintrinsic.css";

  .menu {
    @apply relative inline-block;
  }

  .menu-trigger {
    anchor-name: --menu-anchor;
    @apply inline-flex items-center justify-center rounded-md;
    @apply px-4 py-2 text-sm font-medium;
    @apply bg-background border border-border;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .menu-content {
    /* Anchor to the trigger for CSS Anchor Positioning. */
    position-anchor: --menu-anchor;
    top: anchor(bottom);
    left: anchor(left);
    inset: auto;
    position-try-fallbacks: flip-block, flip-inline;

    @apply w-56 mt-2;
    @apply bg-background border border-border rounded-md shadow-lg;
    @apply origin-top-right;
  }

  /* Polyfill-robust open state: native :popover-open or polyfill's class. */
  .menu-content:is(:popover-open, .\:popover-open) {
    display: block;
  }
</style>
