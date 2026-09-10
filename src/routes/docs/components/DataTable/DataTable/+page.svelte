<!--
@component
DataTable documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import DataTable, * as DataTableModule from "$lib/components/DataTable/DataTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import { m } from "$lib/paraglide/messages.js"

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

const templateData = [
  { name: "Widget A", price: 29.99, stock: 120 },
  { name: "Gadget B", price: 49.50, stock: 85 },
  { name: "Doohickey C", price: 12.00, stock: 200 },
]

const templateColumns = [
  { field: "name", header: "Product" },
  { field: "price", header: "Price", template: (v: unknown) => `$${Number(v).toFixed(2)}` },
  { field: "stock", header: "Stock", template: (v: unknown) => `${v} units` },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.dt_heading()}</h1>

<p>
  {m.dt_intro_1()}
  <code>&lt;table&gt;</code>
  {m.dt_intro_2()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.dt_what()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.dt_when_1()}
  <code>&lt;DataTable&gt;</code>
  {m.dt_when_2()}
  <code>&lt;table&gt;</code>
  {m.dt_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.dt_why_sorting()}</strong> — {m.dt_why_sorting_desc()}.</li>
  <li><strong>{m.dt_why_pagination()}</strong> — {m.dt_why_pagination_desc()}.</li>
  <li><strong>{m.dt_why_selection()}</strong> — {m.dt_why_selection_desc()}.</li>
  <li><strong>{m.dt_why_templates()}</strong> — {m.dt_why_templates_desc()}.</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/">WAI-ARIA APG — Grid</a></li>
  <li><a href="https://m3.material.io/components/data-table/overview">Material Design 3 — Data Table</a></li>
  <li><a href="https://primer.style/components/data-table">Primer — DataTable</a></li>
</ul>


<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.dt_impl_1()}</li>
    <li>{m.dt_impl_2()}</li>
    <li>{m.dt_impl_3()}</li>
    <li>{m.dt_impl_4()}</li>
    <li>{m.dt_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.dt_mistake_1()}</li>
    <li>{m.dt_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>Listbox, EventsTable, PropsTable</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.dt_responsive_1()}</li>
  <li>{m.dt_responsive_2_pre()}<code>width</code>{m.dt_responsive_2_post()}</li>
  <li>{m.dt_responsive_3()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li><code>sortable</code> / <code>filterable</code>{m.dt_custom_features()}</li>
  <li><code>pageable</code> / <code>pageSize</code>{m.dt_custom_pagination()}</li>
  <li><code>selectable</code> / <code>multiSelect</code>{m.dt_custom_selection()}</li>
  <li><code>striped</code> / <code>bordered</code> / <code>compact</code>{m.dt_custom_visual()}</li>
  <li><code>template</code>{m.dt_custom_template()}</li>
  <li><code>class</code> / <code>headerClass</code> / <code>rowClass</code>{m.dt_custom_css()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.dt_ex_basic()}</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} />`}>
  <div class="not-prose mb-8" data-testid="datatable-basic">
    <DataTable data={users} columns={userColumns} />
  </div>
</ExampleTabs>

<h3>{m.dt_ex_sortable()}</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} sortable filterable />`}>
  <div class="not-prose mb-8" data-testid="datatable-sortable">
    <DataTable data={users} columns={userColumns} sortable filterable />
  </div>
</ExampleTabs>

<h3>{m.dt_ex_pagination()}</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} pageable pageSize={2} pageSizeOptions={[2, 5, 10]} />`}>
  <div class="not-prose mb-8" data-testid="datatable-pagination">
    <DataTable data={users} columns={userColumns} pageable pageSize={2} pageSizeOptions={[2, 5, 10]} />
  </div>
</ExampleTabs>

<h3>{m.dt_ex_selectable()}</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} selectable multiSelect />`}>
  <div class="not-prose mb-8" data-testid="datatable-selectable">
    <DataTable data={users} columns={userColumns} selectable multiSelect />
  </div>
</ExampleTabs>

<h3>{m.dt_ex_striped()}</h3>
<ExampleTabs code={`<DataTable data={users} columns={columns} striped bordered />`}>
  <div class="not-prose mb-8" data-testid="datatable-striped">
    <DataTable data={users} columns={userColumns} striped bordered />
  </div>
</ExampleTabs>

<h3>{m.dt_ex_loading()}</h3>
<ExampleTabs code={`<DataTable data={[]} columns={columns} loading />`}>
  <div class="not-prose mb-8" data-testid="datatable-loading">
    <DataTable data={[]} columns={userColumns} loading />
  </div>
</ExampleTabs>

<h3>{m.dt_ex_empty()}</h3>
<ExampleTabs code={`<DataTable data={[]} columns={columns} emptyMessage="No users found" />`}>
  <div class="not-prose mb-8" data-testid="datatable-empty">
    <DataTable data={[]} columns={userColumns} emptyMessage="No users found" />
  </div>
</ExampleTabs>

  <h3>{m.dt_ex_templates()}</h3>
  <ExampleTabs code={`const productColumns = [
  { field: 'name', header: 'Product' },
  { field: 'price', header: 'Price', template: (v) => "$" + Number(v).toFixed(2) },
  { field: 'stock', header: 'Stock', template: (v) => v + " units" },
]
<DataTable columns={productColumns} data={products} />`}>
    <div class="overflow-x-auto" data-testid="datatable-templates">
      <DataTable columns={templateColumns} data={templateData} />
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={DataTableModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={DataTableModule} />

<h2>{m.sec_slots()}</h2>
<table>
  <thead><tr><th>Slot</th><th>{m.sec_props()}</th><th>{m.sec_description()}</th></tr></thead>
  <tbody>
    <tr><td><code>header</code></td><td><code>&#123; columns &#125;</code></td><td>{m.dt_slot_header()}</td></tr>
    <tr><td><code>footer</code></td><td><code>&#123; columns, data &#125;</code></td><td>{m.dt_slot_footer()}</td></tr>
    <tr><td><code>empty</code></td><td><code>&#123; emptyMessage &#125;</code></td><td>{m.dt_slot_empty()}</td></tr>
    <tr><td><code>loading</code></td><td><code>&#123; loading &#125;</code></td><td>{m.dt_slot_loading()}</td></tr>
    <tr><td><code>cell</code></td><td><code>&#123; value, row, column, rowIndex, columnIndex &#125;</code></td><td>{m.dt_slot_cell()}</td></tr>
  </tbody>
</table>

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.dt_a11y_1_pre()}<code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>{m.dt_a11y_1_post()}</li>
  <li>{m.dt_a11y_2_pre()}<code>aria-sort</code>{m.dt_a11y_2_post()}</li>
  <li>{m.dt_a11y_3_pre()}<code>aria-live</code>{m.dt_a11y_3_post()}</li>
  <li>{m.dt_a11y_4()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>{m.dt_kb_1()}</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.dt_kb_2()}</td></tr>
    <tr><td><kbd>Arrow Keys</kbd></td><td>{m.dt_kb_3()}</td></tr>
  </tbody>
</table>
</Container>
