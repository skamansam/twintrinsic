<!--
@component
DataTable documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import DataTable, * as DataTableModule from "$lib/components/DataTable/DataTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"

const users = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@acme.io", role: "Admin", status: "Active" },
  { id: 2, name: "Marcus Webb", email: "marcus.webb@acme.io", role: "Editor", status: "Active" },
  { id: 3, name: "Priya Patel", email: "priya.patel@acme.io", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Diego Ramírez", email: "diego.ramirez@acme.io", role: "Editor", status: "Active" },
  { id: 5, name: "Emma Lindqvist", email: "emma.lindqvist@acme.io", role: "Viewer", status: "Active" },
]

const userColumns = [
  { field: "id", header: "ID", sortable: true, width: "50px" },
  { field: "name", header: "Name", sortable: true, filterable: true },
  { field: "email", header: "Email", sortable: true, filterable: true },
  { field: "role", header: "Role", sortable: true, filterable: true },
  {
    field: "status", header: "Status", sortable: true, filterable: true,
    template: (value: unknown) => {
      const color = value === "Active"
        ? "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200"
        : "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200"
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${value}</span>`
    },
  },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>DataTable</h1>

<p>
  Displays structured data in a tabular format with sorting, filtering,
  pagination, row selection, and custom cell templates. Built on semantic
  HTML <code>&lt;table&gt;</code> elements.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A full-featured data grid component that renders tabular data with column
  headers, sortable columns, text filters, pagination, and selectable rows.
  Supports custom cell templates for rich content.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;DataTable&gt;</code> when you need to display a collection of
  structured records that users will sort, filter, or paginate through — user
  lists, product catalogs, transaction logs. For simple static tables, use a
  plain <code>&lt;table&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Sorting &amp; filtering</strong> — click column headers to sort; type to filter.</li>
  <li><strong>Pagination</strong> — handles large datasets without DOM overload.</li>
  <li><strong>Row selection</strong> — single or multi-select with keyboard support.</li>
  <li><strong>Custom templates</strong> — render badges, links, or any HTML in cells.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/">WAI-ARIA APG — Grid</a></li>
  <li><a href="https://m3.material.io/components/data-table/overview">Material Design 3 — Data Table</a></li>
  <li><a href="https://primer.style/components/data-table">Primer — DataTable</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Table scrolls horizontally on narrow viewports.</li>
  <li>Column widths respect <code>width</code> definitions.</li>
  <li>Compact mode reduces row padding for dense layouts.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li><code>sortable</code> / <code>filterable</code> — enable per-column features.</li>
  <li><code>pageable</code> / <code>pageSize</code> — pagination controls.</li>
  <li><code>selectable</code> / <code>multiSelect</code> — row selection.</li>
  <li><code>striped</code> / <code>bordered</code> / <code>compact</code> — visual variants.</li>
  <li><code>template</code> — custom cell rendering function.</li>
  <li><code>class</code> / <code>headerClass</code> / <code>rowClass</code> — custom CSS.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Table</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} />`}>
  <div class="not-prose mb-8" data-testid="datatable-basic">
    <DataTable data={users} columns={userColumns} />
  </div>
</ExampleTabs>

<h3>Sortable and Filterable</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} sortable filterable />`}>
  <div class="not-prose mb-8" data-testid="datatable-sortable">
    <DataTable data={users} columns={userColumns} sortable filterable />
  </div>
</ExampleTabs>

<h3>Pagination</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} pageable pageSize={2} pageSizeOptions={[2, 5, 10]} />`}>
  <div class="not-prose mb-8" data-testid="datatable-pagination">
    <DataTable data={users} columns={userColumns} pageable pageSize={2} pageSizeOptions={[2, 5, 10]} />
  </div>
</ExampleTabs>

<h3>Selectable Rows</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} selectable multiSelect />`}>
  <div class="not-prose mb-8" data-testid="datatable-selectable">
    <DataTable data={users} columns={userColumns} selectable multiSelect />
  </div>
</ExampleTabs>

<h3>Striped and Bordered</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} striped bordered />`}>
  <div class="not-prose mb-8" data-testid="datatable-striped">
    <DataTable data={users} columns={userColumns} striped bordered />
  </div>
</ExampleTabs>

<h3>Loading State</h3>
<ExampleTabs code={`<DataTable data={[]} columns={columns} loading />`}>
  <div class="not-prose mb-8" data-testid="datatable-loading">
    <DataTable data={[]} columns={userColumns} loading />
  </div>
</ExampleTabs>

<h3>Empty State</h3>
<ExampleTabs code={`<DataTable data={[]} columns={columns} emptyMessage="No users found" />`}>
  <div class="not-prose mb-8" data-testid="datatable-empty">
    <DataTable data={[]} columns={userColumns} emptyMessage="No users found" />
  </div>
</ExampleTabs>

  <h3>Custom Templates</h3>
  <ExampleTabs code={`<DataTable columns={[...]} data={[...]} />`}>
    <div class="overflow-x-auto" data-testid="datatable-templates">
      <!-- DataTable template example -->
    </div>
  </ExampleTabs>

<h2>Props</h2>
<PropsTable component={DataTableModule} />

<h2>Events</h2>
<EventsTable component={DataTableModule} />

<h2>Slots</h2>
<table>
  <thead><tr><th>Slot</th><th>Props</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><code>header</code></td><td><code>&#123; columns &#125;</code></td><td>Custom table header</td></tr>
    <tr><td><code>footer</code></td><td><code>&#123; columns, data &#125;</code></td><td>Custom table footer</td></tr>
    <tr><td><code>empty</code></td><td><code>&#123; emptyMessage &#125;</code></td><td>Custom empty state</td></tr>
    <tr><td><code>loading</code></td><td><code>&#123; loading &#125;</code></td><td>Custom loading state</td></tr>
    <tr><td><code>cell</code></td><td><code>&#123; value, row, column, rowIndex, columnIndex &#125;</code></td><td>Custom cell content</td></tr>
  </tbody>
</table>

<h2>Accessibility</h2>
<ul>
  <li>Uses semantic <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>.</li>
  <li>Sortable columns use <code>aria-sort</code>.</li>
  <li>Dynamic updates announced via <code>aria-live</code> regions.</li>
  <li>Focus management for interactive elements.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>Move focus through interactive elements</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle sort (on header) or selection (on row)</td></tr>
    <tr><td><kbd>Arrow Keys</kbd></td><td>Navigate between cells (when cell navigation enabled)</td></tr>
  </tbody>
</table>
</Container>
