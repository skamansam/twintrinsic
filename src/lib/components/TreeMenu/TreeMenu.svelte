<!--
@component
SidebarMenu - A hierarchical menu component that renders a tree of menu items.
Can be used standalone or with the Sidebar component.

## Props
- `items` - Array of menu items with optional children, icons, links, and actions
- `class` - Additional CSS classes

## Menu Item Structure
```typescript
{
  title?: string;           // Main label for the item
  label?: string;           // Alternative label (used in children)
  icon?: string;            // Icon identifier (e.g., "home", "settings")
  iconClass?: string;       // Custom CSS classes for the icon
  link?: string;            // Navigation link (href)
  onClick?: () => void;     // Click handler function
  action?: () => void;      // Alternative action handler
  separator?: boolean;      // Show separator before this item
  children?: MenuItem[];    // Nested menu items
}
```

## Usage
```svelte
<SidebarMenu {items} />

<Sidebar>
  <SidebarMenu {items} />
</Sidebar>
```
-->
<script lang="ts" module>
  export interface MenuItem {
    title?: string;
    label?: string;
    icon?: string;
    iconClass?: string;
    link?: string;
    onClick?: () => void;
    action?: () => void;
    separator?: boolean;
    children?: MenuItem[];
    class?: string;
  }
</script>

<script lang="ts">
  interface Props {
    items?: MenuItem[];
    class?: string;
  }

  let { items = [], class: className = "" }: Props = $props();

  let expandedItems = $state<Set<number>>(new Set());

  function toggleItem(index: number) {
    if (expandedItems.has(index)) {
      expandedItems.delete(index);
    } else {
      expandedItems.add(index);
    }
    expandedItems = new Set(expandedItems);
  }

  function handleItemClick(item: MenuItem) {
    if (item.onClick) {
      item.onClick();
    } else if (item.action) {
      item.action();
    }
  }

  function getIconContent(icon?: string): string {
    const iconMap: Record<string, string> = {
      questlists: "➰",
      home: "+",
      info: "󰋼",
      sword: "⚔️",
      settings: "⚙️",
      search: "🔍",
      bell: "🔔",
      user: "👤",
    };
    return iconMap[icon || ""] || icon || "";
  }

</script>

<nav class="sidebar-menu {className}">
  {#each items as item, index (index)}
    {#if item.separator}
      <hr class="sidebar-menu-separator" />
    {/if}

    {#if item.link}
      <a
        href={item.link}
        class="sidebar-menu-item"
        class:has-children={item.children?.length}
        onclick={() => handleItemClick(item)}
      >
        {#if item.icon}
          <span class="sidebar-menu-icon {item.iconClass || ''}">
            {getIconContent(item.icon)}
          </span>
        {/if}
        <span class="sidebar-menu-label">
          {item.title || item.label}
        </span>
        {#if item.children?.length}
          <span class="sidebar-menu-chevron">
            {expandedItems.has(index) ? "▼" : "▶"}
          </span>
        {/if}
      </a>
    {:else if item.onClick || item.action}
      <button
        type="button"
        class="sidebar-menu-item sidebar-menu-button"
        class:has-children={item.children?.length}
        onclick={() => {
          handleItemClick(item);
          if (item.children?.length) {
            toggleItem(index);
          }
        }}
      >
        {#if item.icon}
          <span class="sidebar-menu-icon {item.iconClass || ''}">
            {getIconContent(item.icon)}
          </span>
        {/if}
        <span class="sidebar-menu-label">
          {item.title || item.label}
        </span>
        {#if item.children?.length}
          <span class="sidebar-menu-chevron">
            {expandedItems.has(index) ? "▼" : "▶"}
          </span>
        {/if}
      </button>
    {:else if item.children?.length}
      <button
        type="button"
        class="sidebar-menu-item sidebar-menu-button"
        class:has-children={true}
        onclick={() => toggleItem(index)}
      >
        {#if item.icon}
          <span class="sidebar-menu-icon {item.iconClass || ''}">
            {getIconContent(item.icon)}
          </span>
        {/if}
        <span class="sidebar-menu-label">
          {item.title || item.label}
        </span>
        <span class="sidebar-menu-chevron">
          {expandedItems.has(index) ? "▼" : "▶"}
        </span>
      </button>
    {:else}
      <div class="sidebar-menu-item sidebar-menu-text">
        {#if item.icon}
          <span class="sidebar-menu-icon {item.iconClass || ''}">
            {getIconContent(item.icon)}
          </span>
        {/if}
        <span class="sidebar-menu-label">
          {item.title || item.label}
        </span>
      </div>
    {/if}

    {#if item.children?.length && expandedItems.has(index)}
      <div class="sidebar-menu-children">
        <svelte:self items={item.children} {expandedItems} />
      </div>
    {/if}
  {/each}
</nav>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .sidebar-menu {
    @apply space-y-1;
  }

  .sidebar-menu-separator {
    @apply my-2 border-border;
  }

  .sidebar-menu-item {
    @apply flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500;
    @apply transition-colors duration-150;
  }

  .sidebar-menu-button {
    @apply bg-transparent border-none cursor-pointer text-left;
  }

  .sidebar-menu-text {
    @apply flex items-center gap-2 px-4 py-2 text-sm text-muted;
  }

  .sidebar-menu-icon {
    @apply shrink-0 w-5 h-5 flex items-center justify-center;
  }

  .sidebar-menu-label {
    @apply flex-1 truncate;
  }

  .sidebar-menu-chevron {
    @apply shrink-0 text-xs text-muted;
  }

  .sidebar-menu-children {
    @apply pl-2 border-l border-border;
  }

  .sidebar-menu-item.has-children {
    @apply cursor-pointer;
  }
</style>
