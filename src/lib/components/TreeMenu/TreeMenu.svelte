<!--
@component
TreeMenu - A hierarchical menu component using native HTML <details>/<summary> elements.
Provides semantic, accessible tree navigation with minimal JavaScript.

## Props
- `items` - Array of menu items with optional children, icons, and links
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
    separator?: boolean;
    children?: MenuItem[];
    class?: string;
  }
</script>

<script lang="ts">
  import Icon from "../Icon/Icon.svelte"
  import TreeMenu from "./TreeMenu.svelte"

  interface Props {
    items?: MenuItem[];
    class?: string;
    showSearch?: boolean;
  }

  let { items = [], class: className = "", showSearch = false }: Props = $props();

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

  <div class="tree-menu" role="menu">
    {#each filteredItems as item (item.title || item.label)}
      {#if item.separator}
        <hr class="tree-menu-separator" />
      {/if}

      {#if item.children?.length}
        <details class="tree-menu-details">
          <summary class="tree-menu-summary" role="menuitem" aria-haspopup="true" onclick={() => item.onClick?.()}>
            {#if item.icon}
              <span class="tree-menu-icon {item.iconClass || ''}">
                <Icon name={item.icon} width="20px" height="20px" />
              </span>
            {/if}
            <span class="tree-menu-label">
              {item.title || item.label}
            </span>
          </summary>
          <div class="tree-menu-children" role="menu">
            <TreeMenu items={item.children} />
          </div>
        </details>
      {:else if item.link}
        <a href={item.link} class="tree-menu-item" role="menuitem" onclick={() => item.onClick?.()}>
          {#if item.icon}
            <span class="tree-menu-icon {item.iconClass || ''}">
              <Icon name={item.icon} width="20px" height="20px" />
            </span>
          {/if}
          <span class="tree-menu-label">
            {item.title || item.label}
          </span>
        </a>
      {:else if item.onClick}
        <button type="button" class="tree-menu-item" role="menuitem" onclick={() => item.onClick?.()}>
          {#if item.icon}
            <span class="tree-menu-icon {item.iconClass || ''}">
              <Icon name={item.icon} width="20px" height="20px" />
            </span>
          {/if}
          <span class="tree-menu-label">
            {item.title || item.label}
          </span>
        </button>
      {:else}
        <div class="tree-menu-item tree-menu-text" role="menuitem" aria-disabled="true">
          {#if item.icon}
            <span class="tree-menu-icon {item.iconClass || ''}">
              <Icon name={item.icon} width="20px" height="20px" />
            </span>
          {/if}
          <span class="tree-menu-label">
            {item.title || item.label}
          </span>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .tree-menu-container {
    @apply flex flex-col p-2;
  }

  .tree-menu-search-header {
    @apply px-0 py-2 border-b border-border;
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

  .tree-menu-details {
    @apply list-none;
  }

  .tree-menu-details > summary::-webkit-details-marker {
    @apply hidden;
  }

  .tree-menu-details > summary::marker {
    @apply hidden;
  }

  .tree-menu-summary {
    @apply flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500;
    @apply transition-colors duration-150 cursor-pointer;
  }

  .tree-menu-summary::before {
    content: "▶";
    @apply shrink-0 w-4 h-4 flex items-center justify-center text-xs text-muted transition-transform duration-150;
  }

  .tree-menu-details[open] > .tree-menu-summary::before {
    @apply rotate-90;
  }

  .tree-menu-item {
    @apply flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm box-border;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500;
    @apply transition-colors duration-150;
  }

  .tree-menu-item[type="button"] {
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

  .tree-menu-children {
    @apply pl-2 border-l border-border;
  }
</style>
