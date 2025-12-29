<!--
@component
TableHeader - A component for header cells within a Table.
Provides consistent styling for table headers with sorting capabilities.

Usage:
```svelte
<TableHeader>Name</TableHeader>

<TableHeader sortable sortDirection="asc" onsort={handleSort}>
  Age
</TableHeader>

<TableHeader align="right">Actions</TableHeader>
```
-->
<script>
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - Column alignment (left, center, right) */
  align = "left",

  /** @type {boolean} - Whether the column is sortable */
  sortable = false,

  /** @type {string} - Sort direction (asc, desc, none) */
  sortDirection = "none",

  /** @type {string} - Column scope (col, row) */
  scope = "col",

  /** @type {string} - Column width (e.g., '200px', '25%') */
  width,

  /** @type {boolean} - Whether to truncate overflowing text */
  truncate = false,

  /** @type {(event: CustomEvent) => void} - Sort event handler */
  onsort,

  children,
  /** @type {object} - Additional props to pass to the input element */
  ...restProps
} = $props()

/**
 * Handles sort click
 */
function handleSort() {
  if (!sortable) return

  // Determine next sort direction
  let nextDirection

  switch (sortDirection) {
    case "asc":
      nextDirection = "desc"
      break
    case "desc":
      nextDirection = "none"
      break
    default:
      nextDirection = "asc"
  }

  onsort?.(new CustomEvent("sort", { detail: { direction: nextDirection } }))
}

// Determine alignment classes
const alignClasses = $derived(
  {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align] || "text-left"
)
</script>

<th
  class="
    table-header
    {alignClasses}
    {sortable ? 'table-header-sortable' : ''}
    {truncate ? 'truncate' : ''}
    {className}
  "
  {scope}
  style={width ? `width: ${width}` : undefined}
  aria-sort={sortable ? (sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none') : undefined}
  onclick={sortable ? handleSort : undefined}
  {...restProps}
>
  <div class="table-header-content">
    <span class="table-header-text">
      {@render children?.()}
    </span>
    
    {#if sortable}
      <span class="table-sort-icon" aria-hidden="true">
        {#if sortDirection === 'asc'}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
        {:else if sortDirection === 'desc'}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        {:else}
          <svg class="w-4 h-4 opacity-0 hover:opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
          </svg>
        {/if}
      </span>
    {/if}
  </div>
</th>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .table-header {
    @apply py-3 px-4 font-medium;
    @apply bg-surface dark:bg-surface text-text dark:text-text;
  }
  
  .table-header-content {
    @apply flex items-center gap-1;
  }
  
  .table-header-sortable {
    @apply cursor-pointer select-none;
    @apply hover:bg-hover dark:hover:bg-hover;
  }
  
  .table-header-text {
    @apply flex-grow;
  }
  
  .table-sort-icon {
    @apply flex-shrink-0;
  }
  
  .truncate {
    @apply max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap;
  }
</style>
