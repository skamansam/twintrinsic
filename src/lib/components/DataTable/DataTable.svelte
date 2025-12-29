<!--
@component
DataTable - A component for displaying tabular data with advanced features.
Provides sorting, filtering, pagination, and selection capabilities with proper accessibility.

Usage:
```svelte
<DataTable 
  data={users} 
  columns={[
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' }
  ]}
/>

<DataTable 
  data={products} 
  columns={columns}
  sortable
  filterable
  pageable
  selectable
  onsort={handleSort}
  onfilter={handleFilter}
  onpage={handlePage}
  onselect={handleSelect}
/>
```
-->
<script>
import { setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {Array} - Data to display */
  data = [],

  /** @type {Array} - Column definitions */
  columns = [],

  /** @type {boolean} - Whether to enable sorting */
  sortable = false,

  /** @type {boolean} - Whether to enable filtering */
  filterable = false,

  /** @type {boolean} - Whether to enable pagination */
  pageable = false,

  /** @type {boolean} - Whether to enable row selection */
  selectable = false,

  /** @type {boolean} - Whether to enable multiple row selection */
  multiSelect = false,

  /** @type {Array} - Selected row keys */
  selected = [],

  /** @type {string} - Key field for row identification */
  keyField = "id",

  /** @type {number} - Current page (1-based) */
  page = 1,

  /** @type {number} - Number of rows per page */
  pageSize = 10,

  /** @type {Array} - Available page size options */
  pageSizeOptions = [5, 10, 20, 50, 100],

  /** @type {string} - Field to sort by */
  sortField,

  /** @type {string} - Sort order (asc, desc) */
  sortOrder = "asc",

  /** @type {Object} - Filter values by field */
  filters = {},

  /** @type {boolean} - Whether to show a loading indicator */
  loading = false,

  /** @type {string} - Text to display when there is no data */
  emptyMessage = "No data available",

  /** @type {string} - ARIA label for the table */
  ariaLabel = "Data table",

  /** @type {Function} - Custom row class function */
  rowClass,

  /** @type {Function} - Custom cell formatter */
  cellFormatter,

  /** @type {boolean} - Whether to enable responsive mode */
  responsive = true,

  /** @type {boolean} - Whether to enable striped rows */
  striped = false,

  /** @type {boolean} - Whether to enable hoverable rows */
  hoverable = true,

  /** @type {boolean} - Whether to show a border */
  bordered = false,

  /** @type {boolean} - Whether to make the header sticky */
  stickyHeader = false,

  /** @type {boolean} - Whether to enable compact mode */
  compact = false,

  /** @type {(event: CustomEvent) => void} - Sort event handler */
  onsort,
  /** @type {(event: CustomEvent) => void} - Filter event handler */
  onfilter,
  /** @type {(event: CustomEvent) => void} - Page event handler */
  onpage,
  /** @type {(event: CustomEvent) => void} - Select event handler */
  onselect,
} = $props()

// Component state
let currentPage = $state(1)
let currentPageSize = $state(10)
let currentSortField = $state("")
let currentSortOrder = $state("asc")
let currentFilters = $state({})
let selectedRows = $state([])
let allSelected = $state(false)
let tableElement = $state()

// Update state when props change
$effect(() => {
  currentPage = page
  currentPageSize = pageSize
  currentSortField = sortField || ""
  currentSortOrder = sortOrder || "asc"
  currentFilters = filters || {}
  selectedRows = Array.isArray(selected) ? [...selected] : []
})

// Provide context for child components
$effect(() => {
  setContext("dataTable", {
    sortable,
    filterable,
    selectable,
    multiSelect,
    keyField,
    getSortField: () => currentSortField,
    getSortOrder: () => currentSortOrder,
    getFilters: () => currentFilters,
    getSelected: () => selectedRows,
    isSelected: (key) => selectedRows.includes(key),
    toggleSort: (field) => handleSort(field),
    setFilter: (field, value) => handleFilter(field, value),
    toggleSelection: (key) => toggleRowSelection(key),
    selectAll: () => toggleSelectAll(),
    cellFormatter,
  })
})

// Computed values
const totalRecords = $derived(data.length)
const totalPages = $derived(Math.max(1, Math.ceil(totalRecords / currentPageSize)))
const startIndex = $derived((currentPage - 1) * currentPageSize)
const endIndex = $derived(Math.min(startIndex + currentPageSize, totalRecords))

// Process data with sorting, filtering, and pagination
const processedData = $derived.by(() => {
  let result = [...data]

  // Apply filters
  if (filterable && Object.keys(currentFilters).length > 0) {
    result = result.filter((item) => {
      return Object.entries(currentFilters).every(([field, filterValue]) => {
        if (!filterValue) return true

        const value = item[field]
        if (value === undefined || value === null) return false

        return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
      })
    })
  }

  // Apply sorting
  if (sortable && currentSortField) {
    result.sort((a, b) => {
      const valueA = a[currentSortField]
      const valueB = b[currentSortField]

      // Handle null/undefined values
      if (valueA === undefined || valueA === null) return currentSortOrder === "asc" ? -1 : 1
      if (valueB === undefined || valueB === null) return currentSortOrder === "asc" ? 1 : -1

      // Compare based on type
      if (typeof valueA === "string" && typeof valueB === "string") {
        return currentSortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      }

      return currentSortOrder === "asc" ? valueA - valueB : valueB - valueA
    })
  }

  // Get total after filtering
  const filteredTotal = result.length

  // Apply pagination
  if (pageable) {
    result = result.slice(startIndex, endIndex)
  }

  return {
    rows: result,
    filteredTotal,
  }
})

/**
 * Handles sorting
 * @param {string} field - Field to sort by
 */
function handleSort(field) {
  if (!sortable) return

  if (currentSortField === field) {
    // Toggle order if same field
    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc"
  } else {
    // Set new field and default to ascending
    currentSortField = field
    currentSortOrder = "asc"
  }

  onsort?.(new CustomEvent("sort", { detail: { field: currentSortField, order: currentSortOrder } }))
}

/**
 * Handles filtering
 * @param {string} field - Field to filter
 * @param {string} value - Filter value
 */
function handleFilter(field, value) {
  if (!filterable) return

  if (value) {
    currentFilters = { ...currentFilters, [field]: value }
  } else {
    // Remove filter if value is empty
    const { [field]: removed, ...rest } = currentFilters
    currentFilters = rest
  }

  // Reset to first page when filtering
  currentPage = 1

  onfilter?.(new CustomEvent("filter", { detail: { filters: currentFilters } }))
}

/**
 * Handles page change
 * @param {number} newPage - New page number
 */
function handlePageChange(newPage) {
  if (!pageable) return

  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage
    onpage?.(new CustomEvent("page", { detail: { page: currentPage, pageSize: currentPageSize } }))
  }
}

/**
 * Handles page size change
 * @param {Event} event - Change event
 */
function handlePageSizeChange(event) {
  if (!pageable) return

  const newPageSize = Number(event.target.value)
  currentPageSize = newPageSize

  // Adjust current page to maintain position
  const newTotalPages = Math.max(1, Math.ceil(totalRecords / newPageSize))
  if (currentPage > newTotalPages) {
    currentPage = newTotalPages
  }

  onpage?.(new CustomEvent("page", { detail: { page: currentPage, pageSize: currentPageSize } }))
}

/**
 * Toggles selection of a row
 * @param {string|number} key - Row key
 */
function toggleRowSelection(key) {
  if (!selectable) return

  if (selectedRows.includes(key)) {
    // Remove if already selected
    selectedRows = selectedRows.filter((k) => k !== key)
    allSelected = false
  } else {
    // Add if not selected
    if (multiSelect) {
      selectedRows = [...selectedRows, key]

      // Check if all visible rows are now selected
      const visibleKeys = processedData.rows.map((row) => row[keyField])
      allSelected = visibleKeys.every((k) => selectedRows.includes(k))
    } else {
      selectedRows = [key]
      allSelected = false
    }
  }

  onselect?.(new CustomEvent("select", { detail: { selected: selectedRows } }))
}

/**
 * Toggles selection of all rows
 */
function toggleSelectAll() {
  if (!selectable || !multiSelect) return

  if (allSelected) {
    // Deselect all visible rows
    const visibleKeys = processedData.rows.map((row) => row[keyField])
    selectedRows = selectedRows.filter((key) => !visibleKeys.includes(key))
    allSelected = false
  } else {
    // Select all visible rows
    const visibleKeys = processedData.rows.map((row) => row[keyField])
    const newSelected = [...selectedRows]

    visibleKeys.forEach((key) => {
      if (!newSelected.includes(key)) {
        newSelected.push(key)
      }
    })

    selectedRows = newSelected
    allSelected = true
  }

  onselect?.(new CustomEvent("select", { detail: { selected: selectedRows } }))
}

/**
 * Gets CSS classes for a row
 * @param {Object} row - Row data
 * @param {number} index - Row index
 * @returns {string} - CSS classes
 */
function getRowClasses(row, index) {
  const isSelected = selectedRows.includes(row[keyField])
  const classes = [
    "data-table-row",
    isSelected ? "data-table-row-selected" : "",
    striped && index % 2 === 1 ? "data-table-row-striped" : "",
    hoverable ? "data-table-row-hoverable" : "",
  ]

  if (rowClass && typeof rowClass === "function") {
    const customClass = rowClass(row, index)
    if (customClass) {
      classes.push(customClass)
    }
  }

  return classes.filter(Boolean).join(" ")
}

/**
 * Formats a cell value
 * @param {any} value - Cell value
 * @param {Object} column - Column definition
 * @param {Object} row - Row data
 * @returns {string} - Formatted value
 */
function formatCell(value, column, row) {
  if (column.formatter) {
    return column.formatter(value, row)
  }

  if (cellFormatter) {
    return cellFormatter(value, column, row)
  }

  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
}
</script>

<div
  class="
    data-table-wrapper
    {responsive ? 'data-table-responsive' : ''}
    {className}
  "
>
  <div class="data-table-container">
    <table
      {id}
      class="
        data-table
        {bordered ? 'data-table-bordered' : ''}
        {compact ? 'data-table-compact' : ''}
        {stickyHeader ? 'data-table-sticky-header' : ''}
      "
      aria-label={ariaLabel}
      aria-busy={loading}
      bind:this={tableElement}
    >
      <thead class="data-table-header">
        <tr>
          {#if selectable}
            <th class="data-table-selection-cell">
              {#if multiSelect}
                <div class="data-table-checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onchange={toggleSelectAll}
                    aria-label="Select all rows"
                  />
                </div>
              {/if}
            </th>
          {/if}
          
          {#each columns as column, colIndex}
            <th
              class="
                data-table-header-cell
                {column.sortable !== false && sortable ? 'data-table-sortable' : ''}
                {column.class || ''}
              "
              style={column.style || ''}
              onclick={() => column.sortable !== false && sortable && handleSort(column.field)}
              aria-sort={currentSortField === column.field 
                ? (currentSortOrder === 'asc' ? 'ascending' : 'descending') 
                : undefined}
            >
              <div class="data-table-header-content">
                <span class="data-table-header-text">
                  {column.header || column.field}
                </span>
                
                {#if column.sortable !== false && sortable}
                  <span class="data-table-sort-icon">
                    {#if currentSortField === column.field}
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d={currentSortOrder === 'asc' 
                            ? "M5 15l7-7 7 7" 
                            : "M19 9l-7 7-7-7"}
                        ></path>
                      </svg>
                    {:else}
                      <svg class="w-4 h-4 opacity-0 hover:parent:opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                      </svg>
                    {/if}
                  </span>
                {/if}
              </div>
              
              {#if column.filterable !== false && filterable}
                <div class="data-table-filter">
                  <input
                    type="text"
                    placeholder="Filter..."
                    value={currentFilters[column.field] || ''}
                    oninput={(e) => handleFilter(column.field, e.target.value)}
                    onclick={(e) => e.stopPropagation()}
                    aria-label={`Filter by ${column.header || column.field}`}
                    class="data-table-filter-input"
                  />
                </div>
              {/if}
            </th>
          {/each}
        </tr>
      </thead>
      
      <tbody class="data-table-body">
        {#if loading}
          <tr class="data-table-loading-row">
            <td colspan={columns.length + (selectable ? 1 : 0)} class="data-table-loading-cell">
              <div class="data-table-loading">
                <svg class="data-table-spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle class="data-table-spinner-track" cx="12" cy="12" r="10" />
                  <circle class="data-table-spinner-path" cx="12" cy="12" r="10" />
                </svg>
                <span>Loading...</span>
              </div>
            </td>
          </tr>
        {:else if processedData.rows.length === 0}
          <tr class="data-table-empty-row">
            <td colspan={columns.length + (selectable ? 1 : 0)} class="data-table-empty-cell">
              {emptyMessage}
            </td>
          </tr>
        {:else}
          {#each processedData.rows as row, rowIndex}
            <tr
              class={getRowClasses(row, rowIndex)}
              onclick={() => selectable && toggleRowSelection(row[keyField])}
              aria-selected={selectable && selectedRows.includes(row[keyField])}
            >
              {#if selectable}
                <td class="data-table-selection-cell">
                  <div class="data-table-checkbox">
                    <input
                      type={multiSelect ? 'checkbox' : 'radio'}
                      checked={selectedRows.includes(row[keyField])}
                      onchange={() => toggleRowSelection(row[keyField])}
                      name={multiSelect ? undefined : `${id}-selection`}
                      aria-label={`Select row ${rowIndex + 1}`}
                      onclick={(e) => e.stopPropagation()}
                    />
                  </div>
                </td>
              {/if}
              
              {#each columns as column, colIndex}
                <td
                  class="
                    data-table-cell
                    {column.cellClass || ''}
                  "
                  style={column.cellStyle || ''}
                  data-label={responsive ? (column.header || column.field) : undefined}
                >
                  {#if column.template}
                    {@html column.template(row[column.field])}
                  {:else}
                    {formatCell(row[column.field], column, row)}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
  
  {#if pageable && totalRecords > 0}
    <div class="data-table-pagination">
      <div class="data-table-pagination-info">
        Showing {startIndex + 1} to {endIndex} of {processedData.filteredTotal} entries
      </div>
      
      <div class="data-table-pagination-controls">
        <div class="data-table-page-size">
          <label>
            <span>Rows per page:</span>
            <select 
              value={currentPageSize} 
              onchange={handlePageSizeChange}
              aria-label="Rows per page"
            >
              {#each pageSizeOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </label>
        </div>
        
        <div class="data-table-page-controls">
          <button
            type="button"
            class="data-table-page-button"
            disabled={currentPage === 1}
            onclick={() => handlePageChange(1)}
            aria-label="First page"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            type="button"
            class="data-table-page-button"
            disabled={currentPage === 1}
            onclick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <span class="data-table-page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            type="button"
            class="data-table-page-button"
            disabled={currentPage === totalPages}
            onclick={() => handlePageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <button
            type="button"
            class="data-table-page-button"
            disabled={currentPage === totalPages}
            onclick={() => handlePageChange(totalPages)}
            aria-label="Last page"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .data-table-wrapper {
    @apply w-full;
  }
  
  .data-table-container {
    @apply w-full overflow-x-auto;
  }
  
  .data-table {
    @apply w-full border-collapse;
    @apply text-text dark:text-text;
  }
  
  .data-table-bordered {
    @apply border border-border dark:border-border;
  }
  
  .data-table-bordered th,
  .data-table-bordered td {
    @apply border border-border dark:border-border;
  }
  
  .data-table-compact th,
  .data-table-compact td {
    @apply py-1 px-2;
  }
  
  .data-table-sticky-header thead {
    @apply sticky top-0;
    @apply z-10;
  }
  
  .data-table-header {
    @apply bg-surface dark:bg-surface;
  }
  
  .data-table-header-cell {
    @apply py-3 px-4;
    @apply font-medium text-left;
    @apply whitespace-nowrap;
  }
  
  .data-table-sortable {
    @apply cursor-pointer;
    @apply hover:bg-hover dark:hover:bg-hover;
  }
  
  .data-table-header-content {
    @apply flex items-center;
  }
  
  .data-table-header-text {
    @apply flex-grow;
  }
  
  .data-table-sort-icon {
    @apply ml-1 flex-shrink-0;
  }
  
  .data-table-filter {
    @apply mt-2;
  }
  
  .data-table-filter-input {
    @apply w-full px-2 py-1;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply rounded-md;
    @apply text-sm;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .data-table-body {
    @apply bg-background dark:bg-background;
  }
  
  .data-table-row {
    @apply border-t border-border dark:border-border;
  }
  
  .data-table-row-striped {
    @apply bg-muted/5 dark:bg-muted/5;
  }
  
  .data-table-row-hoverable {
    @apply hover:bg-hover dark:hover:bg-hover;
  }
  
  .data-table-row-selected {
    @apply bg-primary-50 dark:bg-primary-900/20;
  }
  
  .data-table-cell {
    @apply py-3 px-4;
    @apply align-middle;
  }
  
  .data-table-selection-cell {
    @apply w-10 py-3 px-4;
    @apply text-center;
  }
  
  .data-table-checkbox {
    @apply flex items-center justify-center;
  }
  
  .data-table-checkbox input {
    @apply w-4 h-4;
    @apply text-primary-500 dark:text-primary-500;
    @apply border border-border dark:border-border;
    @apply rounded;
    @apply focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .data-table-loading-cell,
  .data-table-empty-cell {
    @apply py-8 px-4;
    @apply text-center;
    @apply text-muted dark:text-muted;
  }
  
  .data-table-loading {
    @apply flex flex-col items-center justify-center;
    @apply space-y-2;
  }
  
  .data-table-spinner {
    @apply w-8 h-8;
    @apply animate-spin;
  }
  
  .data-table-spinner-track {
    @apply opacity-25;
    @apply stroke-current;
    @apply fill-none;
    @apply stroke-2;
  }
  
  .data-table-spinner-path {
    @apply opacity-75;
    @apply stroke-current;
    @apply fill-none;
    @apply stroke-2;
    stroke-dasharray: 60;
    stroke-dashoffset: 45;
  }
  
  .data-table-pagination {
    @apply mt-4;
    @apply flex flex-col sm:flex-row items-center justify-between;
    @apply text-sm;
  }
  
  .data-table-pagination-info {
    @apply mb-2 sm:mb-0;
    @apply text-muted dark:text-muted;
  }
  
  .data-table-pagination-controls {
    @apply flex flex-col sm:flex-row items-center;
    @apply space-y-2 sm:space-y-0 sm:space-x-4;
  }
  
  .data-table-page-size {
    @apply flex items-center;
    @apply space-x-2;
  }
  
  .data-table-page-size select {
    @apply px-2 py-1;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .data-table-page-controls {
    @apply flex items-center;
    @apply space-x-1;
  }
  
  .data-table-page-button {
    @apply p-1;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply hover:bg-hover dark:hover:bg-hover;
    @apply transition-colors duration-150;
  }
  
  .data-table-page-button:disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply hover:bg-background dark:hover:bg-background;
  }
  
  .data-table-page-info {
    @apply px-2;
  }
  
  /* Responsive styles */
  @media (max-width: 640px) {
    .data-table-responsive thead {
      @apply hidden;
    }
    
    .data-table-responsive tbody tr {
      @apply block border-b border-border dark:border-border;
    }
    
    .data-table-responsive tbody td {
      @apply block text-right;
      @apply py-2 px-3;
      @apply border-none;
    }
    
    .data-table-responsive tbody td::before {
      content: attr(data-label);
      @apply float-left font-medium;
    }
    
    .data-table-responsive .data-table-selection-cell {
      @apply w-full text-left;
    }
    
    .data-table-responsive .data-table-checkbox {
      @apply justify-start;
    }
  }
</style>
