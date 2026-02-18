<!--
@component
TreeMenu - A hierarchical menu component that renders a tree of menu items.
Can be used standalone or with any container component.

## Props
- `items` - Array of menu items with optional children, icons, links, and actions
- `class` - Additional CSS classes
- `showSearch` - Whether to show search/filter input (default: false)

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
<TreeMenu {items} />

<TreeMenu {items} showSearch />
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
  import Icon from "../Icon/Icon.svelte"

  interface Props {
    items?: MenuItem[];
    class?: string;
    showSearch?: boolean;
  }

  let { items = [], class: className = "", showSearch = false }: Props = $props();

  let expandedItems = $state<Set<number>>(new Set());
  let searchQuery = $state("");

  let filteredItems = $derived.by(() => {
    if (!searchQuery.trim()) return items;
    return filterItems(items, searchQuery.toLowerCase());
  });

  function filterItems(itemList: MenuItem[], query: string): MenuItem[] {
    return itemList
      .filter((item) => {
        const title = (item.title || item.label || "").toLowerCase();
        const matches = title.includes(query);
        const hasMatchingChildren = item.children ? filterItems(item.children, query).length > 0 : false;
        return matches || hasMatchingChildren;
      })
      .map((item) => ({
        ...item,
        children: item.children ? filterItems(item.children, query) : item.children,
      }));
  }

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

  function getIconName(icon?: string): string {
    const iconMap: Record<string, string> = {
      questlists: "list",
      home: "home",
      info: "info-circle",
      sword: "sword",
      settings: "settings",
      search: "search",
      bell: "bell",
      user: "user",
    };
    return iconMap[icon || ""] || icon || "";
  }

</script>

<div class="tree-menu-container {className}">
  {#if showSearch}
    <div class="tree-menu-search-header">
      <input
        type="text"
        placeholder="Search..."
        bind:value={searchQuery}
        class="tree-menu-search-input"
        aria-label="Search menu items"
      />
    </div>
  {/if}

  <nav class="tree-menu">
    {#each filteredItems as item, index (index)}
    {#if item.separator}
      <hr class="tree-menu-separator" />
    {/if}

    {#if item.link}
      <a
        href={item.link}
        class="tree-menu-item"
        class:has-children={item.children?.length}
        onclick={() => handleItemClick(item)}
      >
        {#if item.icon}
          <span class="tree-menu-icon {item.iconClass || ''}">
            <Icon name={getIconName(item.icon)} width="20px" height="20px" />
          </span>
        {/if}
        <span class="tree-menu-label">
          {item.title || item.label}
        </span>
        {#if item.children?.length}
          <span class="tree-menu-chevron">
            <Icon name={expandedItems.has(index) ? "chevron-down" : "chevron-right"} width="16px" height="16px" />
          </span>
        {/if}
      </a>
    {:else if item.onClick || item.action}
      <button
        type="button"
        class="tree-menu-item tree-menu-button"
        class:has-children={item.children?.length}
        onclick={() => {
          handleItemClick(item);
          if (item.children?.length) {
            toggleItem(index);
          }
        }}
      >
        {#if item.icon}
          <span class="tree-menu-icon {item.iconClass || ''}">
            <Icon name={getIconName(item.icon)} width="20px" height="20px" />
          </span>
        {/if}
        <span class="tree-menu-label">
          {item.title || item.label}
        </span>
        {#if item.children?.length}
          <span class="tree-menu-chevron">
            <Icon name={expandedItems.has(index) ? "chevron-down" : "chevron-right"} width="16px" height="16px" />
          </span>
        {/if}
      </button>
    {:else if item.children?.length}
      <button
        type="button"
        class="tree-menu-item tree-menu-button"
        class:has-children={true}
        onclick={() => toggleItem(index)}
      >
        {#if item.icon}
          <span class="tree-menu-icon {item.iconClass || ''}">
            <Icon name={getIconName(item.icon)} width="20px" height="20px" />
          </span>
        {/if}
        <span class="tree-menu-label">
          {item.title || item.label}
        </span>
        <span class="tree-menu-chevron">
          <Icon name={expandedItems.has(index) ? "chevron-down" : "chevron-right"} width="16px" height="16px" />
        </span>
      </button>
    {:else}
      <div class="tree-menu-item tree-menu-text">
        {#if item.icon}
          <span class="tree-menu-icon {item.iconClass || ''}">
            <Icon name={getIconName(item.icon)} width="20px" height="20px" />
          </span>
        {/if}
        <span class="tree-menu-label">
          {item.title || item.label}
        </span>
      </div>
    {/if}

    {#if item.children?.length && expandedItems.has(index)}
      <div class="tree-menu-children">
        <svelte:self items={item.children} {expandedItems} />
      </div>
    {/if}
    {/each}
  </nav>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .tree-menu-container {
    @apply flex flex-col p-2;
  }

  .tree-menu-search-header {
    @apply px-0 py-2 border-b border-border;
  }

  .tree-menu-search-toggle {
    @apply flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-none cursor-pointer text-muted hover:bg-hover transition-colors;
  }

  .tree-menu-search-input {
    @apply flex-1 px-3 py-1.5 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .tree-menu {
    @apply space-y-1;
  }

  .tree-menu * {
    @apply box-border;
  }

  .tree-menu-separator {
    @apply my-2 border-border;
  }

  .tree-menu-item {
    @apply flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm box-border;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500;
    @apply transition-colors duration-150;
  }

  .tree-menu-button {
    @apply bg-transparent border-none cursor-pointer text-left;
  }

  .tree-menu-text {
    @apply flex items-center gap-2 px-4 py-2 text-sm text-muted;
  }

  .tree-menu-icon {
    @apply shrink-0 w-5 h-5 flex items-center justify-center;
  }

  .tree-menu-label {
    @apply flex-1 truncate;
  }

  .tree-menu-chevron {
    @apply shrink-0 text-xs text-muted;
  }

  .tree-menu-children {
    @apply pl-2 border-l border-border;
  }

  .tree-menu-item.has-children {
    @apply cursor-pointer;
  }
</style>
