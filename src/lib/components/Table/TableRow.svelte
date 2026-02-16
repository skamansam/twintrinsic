<script lang="ts">
/**
 * @component
 * TableRow - A component for a row within a Table.
 * Provides consistent styling for table rows with selection and hover states.
 *
 * Usage:
 * ```svelte
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>john@example.com</TableCell>
 * </TableRow>
 *
 * <TableRow selected>
 *   <TableCell>Selected Row</TableCell>
 *   <TableCell>Data</TableCell>
 * </TableRow>
 * ```
 */
import { getContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {boolean} - Whether the row is selected */
  selected = false,

  /** @type {boolean} - Whether the row is disabled */
  disabled = false,

  /** @type {boolean} - Whether the row is clickable */
  clickable = false,

  /** @type {any} - Data associated with the row */
  data,

  /** @type {(event: CustomEvent) => void} - Click event handler */
  onclick,

  children,

  /** @type {object} - Additional props to pass to the input element */
  ...restProps
} = $props()

// Get table context if available
const tableContext = getContext("table")

// Determine if table has hover effect
const hoverable = tableContext?.hoverable || false

/**
 * Handles row click
 * @param {MouseEvent} event - Click event
 */
function handleClick(event: MouseEvent): void {
  if (disabled) return

  onclick?.(new CustomEvent("click", { detail: { event, row: data } }))
}
</script>

<tr
  class="
    table-row
    {selected ? 'table-row-selected' : ''}
    {disabled ? 'table-row-disabled' : ''}
    {clickable || restProps?.onclick ? 'table-row-clickable' : ''}
    {hoverable ? 'table-row-hoverable' : ''}
    {className}
  "
  aria-selected={selected ? 'true' : undefined}
  aria-disabled={disabled ? 'true' : undefined}
  onclick={handleClick}
  {...restProps}
>
  {@render children?.()}
</tr>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .table-row-selected {
    @apply bg-primary-50 dark:bg-primary-900/20;
  }
  
  .table-row-disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  .table-row-clickable {
    @apply cursor-pointer;
  }
  
  .table-row-hoverable {
    @apply hover:bg-hover dark:hover:bg-hover transition-colors duration-150;
  }
</style>
