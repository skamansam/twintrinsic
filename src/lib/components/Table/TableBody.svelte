<!--
@component
TableBody - A component for the body section of a Table.
Provides consistent styling for the table body.

Usage:
```svelte
<Table>
  <TableHead>
    <!-- Table header content --\>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
    <!-- More rows --\>
  </TableBody>
</Table>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
];
</script>

<script lang="ts">
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  children,
  ...restProps
} = $props()
</script>

<tbody {...restProps} class="table-body {className}">
  {@render children?.()}
</tbody>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .table-body {
    @apply bg-background dark:bg-background;
  }
</style>
