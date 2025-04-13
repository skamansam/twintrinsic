<!--
@component
TableBody - A component for the body section of a Table.
Provides consistent styling for the table body.

Usage:
```svelte
<Table>
  <TableHead>
    <!-- Table header content -->
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
    <!-- More rows -->
  </TableBody>
</Table>
```
-->
<script>
  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    children
  } = $props();
</script>

<tbody class="table-body {className}">
  {@render children?.()}
</tbody>

<style>
  @reference "../../twintrinsic.css";
  
  .table-body {
    @apply bg-background dark:bg-background;
  }
</style>
