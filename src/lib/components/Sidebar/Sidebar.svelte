<!--
@component
Sidebar - A responsive side panel that adapts to screen size.
- Mobile: Hidden by default, controlled by parent via `visible` prop
- Tablet: Shows only icons (collapsed width via CSS)
- Desktop: Shows full width with labels

## Props
- `visible` - Show/hide the sidebar (controlled by parent) (default: false)
- `position` - Sidebar position: "left" or "right" (default: "left")
- `width` - Width of the sidebar on desktop when fully expanded (default: "16rem")
- `collapsedWidth` - Width of the sidebar on tablet (icon-only mode) (default: "4rem")
- `id` - Custom element ID (default: random UUID)
- `ariaLabel` - Accessibility label for the sidebar
- `disabled` - Disable toggle functionality (default: false)
- `class` - Additional CSS classes
- `menu` - Menu items array for SidebarMenu component (optional)
- `onvisibilitychange` - Callback when sidebar visibility changes
- `ontoggle` - Callback when sidebar is toggled (for desktop expand/collapse)

## Slots
- `header` - Header content for the Panel
- `default` - Main sidebar content

## Responsive Behavior
- Mobile (< 768px): Hidden unless `visible={true}`, controlled by parent
- Tablet (768px - 1024px): Shows with `collapsedWidth` (icons only)
- Desktop (> 1024px): Shows with full `width`

## Usage
```svelte
<Sidebar {menu} visible={showMobileMenu} onvisibilitychange={(e) => showMobileMenu = e.visible}>
  Menu will be rendered using SidebarMenu
</Sidebar>
```
-->
<script lang="ts">
import Panel from "../Panel/Panel.svelte"
import type { MenuItem } from "../TreeMenu/TreeMenu.svelte"
import TreeMenu from "../TreeMenu/TreeMenu.svelte"

/** Sidebar component props configuration */
type SidebarProps = {
  /** Show/hide the sidebar (controlled by parent) */
  visible?: boolean
  /** Additional CSS classes */
  class?: string
  /** Sidebar position: left or right */
  position?: "left" | "right"
  /** Width of the sidebar on desktop (default: "16rem") */
  width?: string
  /** Width of the sidebar on tablet - icon only mode (default: "4rem") */
  collapsedWidth?: string
  /** Custom element ID (auto-generated if not provided) */
  id?: string
  /** Accessibility label for the sidebar */
  ariaLabel?: string
  /** Disable toggle functionality */
  disabled?: boolean
  /** Menu items for SidebarMenu component */
  menu?: MenuItem[]
  /** Callback when sidebar visibility changes (mobile) */
  onvisibilitychange?: (payload: { visible: boolean }) => void
  /** Callback when sidebar is toggled (desktop expand/collapse) */
  ontoggle?: (payload: { expanded: boolean }) => void
}

const {
  visible = false,
  class: className = "",
  position = "left",
  width = "16rem",
  collapsedWidth = "4rem",
  id = crypto.randomUUID(),
  ariaLabel,
  disabled = false,
  menu,
  onvisibilitychange,
  ontoggle,
  header,
  title,
  children,
} = $props() satisfies SidebarProps

let isExpanded = $state(true)
let sidebarElement = $state()

/** Handle visibility change callback */
function handleVisibilityChange(): void {
  onvisibilitychange?.({ visible })
}

/** Handle toggle events from the Panel component (desktop expand/collapse) */
function handleToggle(payload: { expanded: boolean }): void {
  isExpanded = payload.expanded
  ontoggle?.({ expanded: isExpanded })
}

$effect(() => {
  handleVisibilityChange()
})
</script>

<aside
  class="
    sidebar-container
    {position === 'right' ? 'sidebar-right' : 'sidebar-left'}
    {visible ? 'sidebar-visible' : 'sidebar-hidden'}
    {className}
  "
  style="--sidebar-width: {width}; --sidebar-collapsed-width: {collapsedWidth}"
  {id}
  role="complementary"
  aria-label={ariaLabel}
  aria-hidden={!visible}
>
  <div
    class="
      sidebar
      {isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}
    "
    role="region"
    aria-labelledby="{id}-header"
  >
      {#if header || title}
        <div class="sidebar-header">
          {#if title}
            <h2 id="{id}-header">{title}</h2>
          {/if}
          {@render header?.()}
        </div>
      {/if}
      {#if menu}
        <TreeMenu items={menu} showSearch />
      {:else}
        {@render children?.()}
      {/if}
  </div>
</aside>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .sidebar-container {
    @apply relative overflow-hidden;
  }

  /* Base sidebar styles */
  .sidebar {
    @apply h-full bg-background transition-[width] duration-200 ease-in-out;
    width: var(--sidebar-width);
  }

  /* Mobile: Hidden by default */
  @media (max-width: 767px) {
    .sidebar-container.sidebar-hidden {
      @apply hidden;
    }

    .sidebar-container.sidebar-visible {
      @apply fixed inset-0 z-50 w-full;
    }

    .sidebar-container.sidebar-visible .sidebar {
      @apply w-full;
    }
  }

  /* Tablet: Icon-only (collapsed width) */
  @media (min-width: 768px) and (max-width: 1023px) {
    .sidebar {
      width: var(--sidebar-collapsed-width);
    }
  }

  /* Desktop: Full width */
  @media (min-width: 1024px) {
    .sidebar {
      width: var(--sidebar-width);
    }
  }

  /* Left position styles */
  .sidebar-left .sidebar {
    @apply left-0;
  }

  /* Right position styles */
  .sidebar-right .sidebar {
    @apply right-0;
  }
</style>
