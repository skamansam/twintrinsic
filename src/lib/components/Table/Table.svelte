<!--
@component
Table - A component for displaying structured data in rows and columns.
Provides accessible, responsive tables with sorting, selection, and pagination options.

Usage:
```svelte
<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
      <TableHeader>Role</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <!-- More rows --\>
  </TableBody>
</Table>
```
-->
<script>
import { createEventDispatcher, setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {boolean} - Whether the table has borders */
  bordered = false,

  /** @type {boolean} - Whether the table has striped rows */
  striped = false,

  /** @type {boolean} - Whether the table has hover effects on rows */
  hoverable = false,

  /** @type {boolean} - Whether the table is compact (less padding) */
  compact = false,

  /** @type {boolean} - Whether the table has a fixed layout */
  fixed = false,

  /** @type {boolean} - Whether the table is responsive (horizontal scrolling) */
  responsive = true,

  /** @type {string} - Caption for the table (for accessibility) */
  caption,

  /** @type {string} - ARIA description for the table */
  ariaDescription,

  children,
} = $props()

const dispatch = createEventDispatcher()

// Provide context for child components
$effect(() => {
  setContext("table", {
    bordered,
    striped,
    hoverable,
    compact,
  })
})
</script>

{#if responsive}
  <div class="table-responsive">
    <table
      {id}
      class="
        table
        {bordered ? 'table-bordered' : ''}
        {striped ? 'table-striped' : ''}
        {hoverable ? 'table-hoverable' : ''}
        {compact ? 'table-compact' : ''}
        {fixed ? 'table-fixed' : ''}
        {className}
      "
      aria-describedby={ariaDescription ? `${id}-description` : undefined}
    >
      {#if caption}
        <caption>{caption}</caption>
      {/if}
      
      {@render children?.()}
    </table>
    
    {#if ariaDescription}
      <div id="{id}-description" class="sr-only">{ariaDescription}</div>
    {/if}
  </div>
{:else}
  <table
    {id}
    class="
      table
      {bordered ? 'table-bordered' : ''}
      {striped ? 'table-striped' : ''}
      {hoverable ? 'table-hoverable' : ''}
      {compact ? 'table-compact' : ''}
      {fixed ? 'table-fixed' : ''}
      {className}
    "
    aria-describedby={ariaDescription ? `${id}-description` : undefined}
  >
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    
    {@render children?.()}
  </table>
  
  {#if ariaDescription}
    <div id="{id}-description" class="sr-only">{ariaDescription}</div>
  {/if}
{/if}

<style>
  @reference "../../twintrinsic.css";
  
  .table-responsive {
    @apply w-full overflow-x-auto;
  }
  
  .table {
    @apply w-full border-collapse text-text dark:text-text;
  }
  
  .table-fixed {
    @apply table-fixed;
  }
  
  .table-bordered {
    @apply border border-border dark:border-border;
  }
  
  .table-bordered :global(th),
  .table-bordered :global(td) {
    @apply border border-border dark:border-border;
  }
  
  .table-striped :global(tbody tr:nth-child(odd)) {
    @apply bg-surface dark:bg-surface;
  }
  
  .table-hoverable :global(tbody tr) {
    @apply hover:bg-hover dark:hover:bg-hover transition-colors duration-150;
  }
  
  .table-compact :global(th),
  .table-compact :global(td) {
    @apply py-1 px-2;
  }
  
  .table :global(caption) {
    @apply caption-top text-muted dark:text-muted text-sm py-2;
  }
</style>
