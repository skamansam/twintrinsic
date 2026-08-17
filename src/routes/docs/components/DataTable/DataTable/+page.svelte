<!--
@component
DataTable documentation page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import DataTable, * as DataTableModule from "$lib/components/DataTable/DataTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"

// Sample data for examples
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Active" },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Viewer",
    status: "Active",
  },
]

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1299.99, stock: 45 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 899.99, stock: 120 },
  { id: 3, name: "Headphones", category: "Audio", price: 199.99, stock: 75 },
  { id: 4, name: "Monitor", category: "Electronics", price: 349.99, stock: 30 },
  { id: 5, name: "Keyboard", category: "Accessories", price: 89.99, stock: 60 },
]

// Column definitions
const userColumns = [
  { field: "id", header: "ID", sortable: true, width: "50px" },
  { field: "name", header: "Name", sortable: true, filterable: true },
  { field: "email", header: "Email", sortable: true, filterable: true },
  { field: "role", header: "Role", sortable: true, filterable: true },
  {
    field: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    template: (value: unknown) => {
      const color =
        value === "Active"
          ? "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200"
          : "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200";
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${value}</span>`;
    },
  },
];

const productColumns = [
  { field: "id", header: "ID", sortable: true, width: "50px" },
  { field: "name", header: "Product Name", sortable: true, filterable: true },
  { field: "category", header: "Category", sortable: true, filterable: true },
  {
    field: "price",
    header: "Price",
    sortable: true,
    filterable: true,
    template: (value: unknown) => "$" + (value as number).toFixed(2),
  },
  {
    field: "stock",
    header: "Stock",
    sortable: true,
    filterable: true,
    template: (value: unknown) => {
      const color =
        (value as number) > 50
          ? "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200"
          : (value as number) > 20
            ? "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200"
            : "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200";
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${value} units</span>`;
    },
  },
];
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>DataTable</h1>
  
  <p>
    The DataTable component displays data in a tabular format with advanced features like sorting,
    filtering, pagination, and row selection. It's designed for displaying and interacting with
    structured data in a responsive and accessible way.
  </p>

  <h2>Examples</h2>

  <h3>Basic DataTable</h3>
  <div class="not-prose mb-8" data-testid="datatable-basic">
    <DataTable 
      data={users} 
      columns={userColumns}
    />
  </div>

  <CodeBlock language="svelte">{`\u003Cscript>
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Viewer", status: "Inactive" }
  ];

  const columns = [
    { field: 'id', header: 'ID', sortable: true, width: '50px' },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'email', header: 'Email', sortable: true, filterable: true },
    { field: 'role', header: 'Role', sortable: true, filterable: true },
    { field: 'status', header: 'Status', sortable: true, filterable: true }
  ];
\u003C/script>

<DataTable 
  data={users} 
  columns={columns}
/>`}</CodeBlock>

  <h3>Sortable and Filterable</h3>
  <div class="not-prose mb-8" data-testid="datatable-sortable">
    <DataTable 
      data={users} 
      columns={userColumns}
      sortable
      filterable
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={users} 
  columns={columns}
  sortable
  filterable
/>`}</CodeBlock>

  <h3>Pagination</h3>
  <div class="not-prose mb-8" data-testid="datatable-pagination">
    <DataTable 
      data={users} 
      columns={userColumns}
      pageable
      pageSize={2}
      pageSizeOptions={[2, 5, 10]}
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={users} 
  columns={columns}
  pageable
  pageSize={5}
  pageSizeOptions={[5, 10, 25]}
/>`}</CodeBlock>

  <h3>Selectable Rows</h3>
  <div class="not-prose mb-8" data-testid="datatable-selectable">
    <DataTable 
      data={users} 
      columns={userColumns}
      selectable
      multiSelect
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={users} 
  columns={columns}
  selectable
  multiSelect
  onselectionChange={(e) => console.log(e.detail.selection)}
/>`}</CodeBlock>

  <h3>Striped and Bordered</h3>
  <div class="not-prose mb-8" data-testid="datatable-striped">
    <DataTable 
      data={users} 
      columns={userColumns}
      striped
      bordered
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={users} 
  columns={columns}
  striped
  bordered
/>`}</CodeBlock>

  <h3>Dense Layout</h3>
  <div class="not-prose mb-8" data-testid="datatable-compact">
    <DataTable 
      data={users} 
      columns={userColumns}
      compact
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={users} 
  columns={columns}
  compact
/>`}</CodeBlock>

  <h3>Loading State</h3>
  <div class="not-prose mb-8" data-testid="datatable-loading">
    <DataTable 
      data={[]}
      columns={userColumns}
      loading
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={[]}
  columns={columns}
  loading
/>`}</CodeBlock>

  <h3>Empty State</h3>
  <div class="not-prose mb-8" data-testid="datatable-empty">
    <DataTable 
      data={[]}
      columns={userColumns}
      emptyMessage="No users found"
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={[]}
  columns={columns}
  emptyMessage="No users found"
/>`}</CodeBlock>

  <h3>Custom Templates</h3>
  <div class="not-prose mb-8" data-testid="datatable-templates">
    <DataTable 
      data={products} 
      columns={productColumns}
      sortable
      filterable
    />
  </div>

  <CodeBlock language="svelte">{`\u003Cscript>
  const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 1299.99, stock: 45 },
    { id: 2, name: "Smartphone", category: "Electronics", price: 899.99, stock: 120 },
    { id: 3, name: "Headphones", category: "Audio", price: 199.99, stock: 75 }
  ];

  const columns = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Product Name', sortable: true, filterable: true },
    { field: 'category', header: 'Category', sortable: true, filterable: true },
    {
      field: 'price',
      header: 'Price',
      sortable: true,
      filterable: true,
      template: (value) => "$" + value.toFixed(2)
    },
    {
      field: 'stock',
      header: 'Stock',
      sortable: true,
      filterable: true,
      template: (value) => {
        const color = value > 50 ? 'bg-success-100 text-success-800' :
                      value > 20 ? 'bg-warning-100 text-warning-800' :
                      'bg-error-100 text-error-800';
        return "<span class='px-2 py-1 rounded-full text-xs font-medium " + color + "'>" + value + " units</span>";
      }
    }
  ];
<\/script>

<DataTable
  data={products}
  columns={columns}
  sortable
  filterable
/>`}</CodeBlock>

  <h3>Custom Styling</h3>
  <div class="not-prose mb-8" data-testid="datatable-styling">
    <DataTable 
      data={products} 
      columns={productColumns}
      class="border border-primary-200 dark:border-primary-800 rounded-lg overflow-hidden"
      sortable
      filterable
    />
  </div>

  <CodeBlock language="svelte">{`<DataTable 
  data={products} 
  columns={columns}
  class="border border-primary-200 dark:border-primary-800 rounded-lg overflow-hidden"
  headerClass="bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-100"
  rowClass="hover:bg-primary-50 dark:hover:bg-primary-900/30"
  sortable
  filterable
/>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={DataTableModule} />

  <h2>Column Definition</h2>
  <p>
    Each column in the <code>columns</code> array should be an object with the following properties:
  </p>
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>field</code></td>
        <td><code>string</code></td>
        <td>Required</td>
        <td>Field name in the data object</td>
      </tr>
      <tr>
        <td><code>header</code></td>
        <td><code>string</code></td>
        <td>Required</td>
        <td>Column header text</td>
      </tr>
      <tr>
        <td><code>sortable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the column is sortable</td>
      </tr>
      <tr>
        <td><code>filterable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the column is filterable</td>
      </tr>
      <tr>
        <td><code>width</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Column width (e.g., "100px", "20%")</td>
      </tr>
      <tr>
        <td><code>template</code></td>
        <td><code>Function</code></td>
        <td><code>undefined</code></td>
        <td>Function to customize cell content, receives the cell value</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for the column</td>
      </tr>
      <tr>
        <td><code>headerClass</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for the column header</td>
      </tr>
      <tr>
        <td><code>cellClass</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for the column cells</td>
      </tr>
    </tbody>
  </table>

  <h2>Events</h2>
<EventsTable component={DataTableModule} />

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Props</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>header</code></td>
        <td><code>{`{ columns: Array }`}</code></td>
        <td>Custom table header</td>
      </tr>
      <tr>
        <td><code>footer</code></td>
        <td><code>{`{ columns: Array, data: Array }`}</code></td>
        <td>Custom table footer</td>
      </tr>
      <tr>
        <td><code>empty</code></td>
        <td><code>{`{ emptyMessage: string }`}</code></td>
        <td>Custom empty state</td>
      </tr>
      <tr>
        <td><code>loading</code></td>
        <td><code>{`{ loading: boolean }`}</code></td>
        <td>Custom loading state</td>
      </tr>
      <tr>
        <td><code>pagination</code></td>
        <td><code>{`{ page: number, pageSize: number }`}</code></td>
        <td>Custom pagination controls</td>
      </tr>
      <tr>
        <td><code>cell</code></td>
        <td><code>{`{ value: any, row: Object, column: Object, rowIndex: number, columnIndex: number }`}</code></td>
        <td>Custom cell content</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The DataTable component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses semantic HTML table elements (<code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, etc.)</li>
    <li>Provides proper ARIA attributes for interactive elements</li>
    <li>Supports keyboard navigation</li>
    <li>Ensures sufficient color contrast for all states</li>
    <li>Uses <code>aria-sort</code> for sortable columns</li>
    <li>Uses <code>aria-live</code> regions for dynamic content updates</li>
    <li>Provides proper focus management for interactive elements</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus through interactive elements</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on a sortable column header, toggles sort direction</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on a selectable row, toggles selection</td>
      </tr>
      <tr>
        <td><kbd>Arrow Keys</kbd></td>
        <td>Navigates between cells when cell navigation is enabled</td>
      </tr>
    </tbody>
  </table>
</Container>
