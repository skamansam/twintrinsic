<script lang="ts">
/**
 * @component
 * TableHead - A component for the header section of a Table.
 * Provides consistent styling for the table header.
 *
 * Usage:
 * ```svelte
 * <Table>
 *   <TableHead>
 *     <TableRow>
 *       <TableHeader>Name</TableHeader>
 *       <TableHeader>Email</TableHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <!-- Table body content -->
 *   </TableBody>
 * </Table>
 * ```
 */
import { getContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  children,
} = $props()
</script>

<thead class="table-head {className}">
  {@render children?.()}
</thead>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .table-head {
    @apply bg-surface dark:bg-surface text-text dark:text-text;
    @apply border-b border-border dark:border-border;
  }
</style>
