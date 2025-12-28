<!--
@component
Sidebar - A collapsible side panel that attaches to its parent container.
Built on top of the Panel component with additional positioning and animation features.

## Props
- `expanded` - Initial expanded state (default: true)
- `position` - Sidebar position: "left" or "right" (default: "left")
- `width` - Width of the sidebar when expanded (default: "16rem")
- `floatOnMobile` - Float above content on mobile instead of taking full width (default: false)
- `disabled` - Disable toggle functionality (default: false)
- `hideBackdrop` - Hide the backdrop overlay when expanded (default: false)
- `id` - Custom element ID (default: random UUID)
- `ariaLabel` - Accessibility label for the sidebar
- `docked` - Reserved for future use
- `class` - Additional CSS classes
- `ontoggle` - Callback when sidebar is toggled

## Slots
- `header` - Header content for the Panel
- `default` - Main sidebar content

## Usage
```svelte
<Sidebar>
  <svelte:fragment slot="header">Navigation</svelte:fragment>
  <nav>Menu items here</nav>
</Sidebar>

<Sidebar position="right" expanded={false}>
  <svelte:fragment slot="header">Settings</svelte:fragment>
  Settings content
</Sidebar>

<Sidebar floatOnMobile>
  <svelte:fragment slot="header">Mobile Menu</svelte:fragment>
  Content that floats on mobile
</Sidebar>
```
-->
<script lang="ts">
import { slide } from "svelte/transition"
import Panel from "../Panel/Panel.svelte"

/** Sidebar component props configuration */
type SidebarProps = {
  /** Initial expanded state */
  expanded?: boolean
  /** Additional CSS classes */
  class?: string
  /** Sidebar position: left or right */
  position?: "left" | "right"
  /** Width of the sidebar when expanded */
  width?: string
  /** Custom element ID (auto-generated if not provided) */
  id?: string
  /** Accessibility label for the sidebar */
  ariaLabel?: string
  /** Disable toggle functionality */
  disabled?: boolean
  /** Hide the backdrop overlay when expanded */
  hideBackdrop?: boolean
  /** Float above content on mobile instead of taking full width */
  floatOnMobile?: boolean
  /** Reserved for future use */
  docked?: boolean
  /** Callback when sidebar is toggled */
  ontoggle?: (payload: { expanded: boolean }) => void
}

const {
  expanded = true,
  class: className = "",
  position = "left",
  width = "16rem",
  id = crypto.randomUUID(),
  ariaLabel,
  disabled = false,
  hideBackdrop = false,
  floatOnMobile = false,
  docked = false,
  ontoggle,
} = $props() satisfies SidebarProps

let isExpanded = $state(false)
let sidebarElement = $state()

// Initialize and sync expanded state when prop changes
$effect(() => {
  isExpanded = expanded
})

/** Handle toggle events from the Panel component */
function handleToggle(payload: { expanded: boolean }): void {
  isExpanded = payload.expanded
  ontoggle?.({ expanded: isExpanded })
}

/** Handle backdrop click to collapse the sidebar */
function handleBackdropClick(): void {
  if (!disabled) {
    isExpanded = false
    ontoggle?.({ expanded: isExpanded })
  }
}

/** Handle Escape key to collapse the sidebar */
function handleKeydown(event: KeyboardEvent): void {
  if (!disabled && event.key === "Escape" && isExpanded) {
    isExpanded = false
    ontoggle?.({ expanded: isExpanded })
  }
}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="
    sidebar-container
    {position === 'right' ? 'sidebar-right' : 'sidebar-left'}
    {floatOnMobile ? 'sidebar-float-mobile' : ''}
    {className}
  "
  style="--sidebar-width: {width}"
  {id}
  role="complementary"
  aria-label={ariaLabel}
>
  {#if !hideBackdrop && isExpanded}
    <div
      class="sidebar-backdrop"
      onclick={handleBackdropClick}
      transition:slide={{ duration: 200 }}
      aria-hidden="true"
    ></div>
  {/if}

  <div
    class="
      sidebar
      {isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}
    "
    role="region"
    aria-labelledby="{id}-header"
  >
    <Panel
      expanded={isExpanded}
      {disabled}
      bordered={false}
      ontoggle={handleToggle}
    >
      <svelte:fragment slot="header">
        <slot name="header" />
      </svelte:fragment>
      <slot />
    </Panel>
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  .sidebar-container {
    @apply relative;
  }

  /* Base sidebar styles */
  .sidebar {
    @apply h-full bg-background transition-[width,transform] duration-200 ease-in-out;
    width: var(--sidebar-width);
  }

  /* Left position styles */
  .sidebar-left .sidebar {
    @apply left-0;
  }

  .sidebar-left .sidebar-collapsed {
    @apply -translate-x-full;
  }

  /* Right position styles */
  .sidebar-right .sidebar {
    @apply right-0;
  }

  .sidebar-right .sidebar-collapsed {
    @apply translate-x-full;
  }

  /* Backdrop styles */
  .sidebar-backdrop {
    @apply fixed inset-0 bg-black/20 backdrop-blur-sm z-40;
  }

  /* Mobile styles */
  @media (max-width: 640px) {
    .sidebar-float-mobile .sidebar {
      @apply fixed top-0 bottom-0 z-50;
    }

    .sidebar-float-mobile .sidebar-backdrop {
      @apply z-40;
    }
  }

  /* Non-floating mobile styles */
  @media (max-width: 640px) {
    .sidebar:not(.sidebar-float-mobile) {
      @apply w-full;
    }
  }
</style>
