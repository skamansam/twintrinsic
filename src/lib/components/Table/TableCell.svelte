<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "align", type: "string", description: "Cell alignment (left, center, right)", default: "\"left\"", optional: true },
  { name: "truncate", type: "boolean", description: "Whether to truncate overflowing text", default: "false", optional: true },
  { name: "numeric", type: "boolean", description: "Whether the cell contains numeric data", default: "false", optional: true },
  { name: "colspan", type: "number", description: "Number of columns this cell spans", optional: false },
  { name: "rowspan", type: "number", description: "Number of rows this cell spans", optional: false },
];
</script>

<script lang="ts">
/**
 * @component
 * TableCell - A component for data cells within a Table.
 * Provides consistent styling for table cells with alignment and truncation options.
 *
 * Usage:
 * ```svelte
 * <TableCell>John Doe</TableCell>
 *
 * <TableCell align="right">$25.00</TableCell>
 *
 * <TableCell truncate>This is a very long text that will be truncated</TableCell>
 * ```
 */
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - Cell alignment (left, center, right) */
  align = "left",

  /** @type {boolean} - Whether to truncate overflowing text */
  truncate = false,

  /** @type {boolean} - Whether the cell contains numeric data */
  numeric = false,

  /** @type {number} - Number of columns this cell spans */
  colspan,

  /** @type {number} - Number of rows this cell spans */
  rowspan,

  children,

  ...restProps
} = $props()

// Determine alignment classes
const alignClasses = $derived(
  {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align] || "text-left"
)
</script>

<td
  class="
    table-cell
    {alignClasses}
    {truncate ? 'truncate' : ''}
    {numeric ? 'font-mono tabular-nums' : ''}
    {className}
  "
  colspan={colspan}
  rowspan={rowspan}
  {...restProps}
>
  {@render children?.()}
</td>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .table-cell {
    @apply py-3 px-4 text-text dark:text-text;
    @apply border-t border-border dark:border-border;
  }
  
  .truncate {
    @apply max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap;
  }
</style>
