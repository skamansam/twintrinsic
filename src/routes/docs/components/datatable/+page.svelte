<!--
@component
DataTable documentation page
-->
<script>
import Container from "$lib/components/Container/Container.svelte"
import DataTable from "$lib/components/DataTable/DataTable.svelte"

// Sample data for examples
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Viewer", status: "Active" }
];

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1299.99, stock: 45 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 899.99, stock: 120 },
  { id: 3, name: "Headphones", category: "Audio", price: 199.99, stock: 75 },
  { id: 4, name: "Monitor", category: "Electronics", price: 349.99, stock: 30 },
  { id: 5, name: "Keyboard", category: "Accessories", price: 89.99, stock: 60 }
];

// Column definitions
const userColumns = [
  { field: 'id', header: 'ID', sortable: true, width: '50px' },
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'email', header: 'Email', sortable: true, filterable: true },
  { field: 'role', header: 'Role', sortable: true, filterable: true },
  { 
    field: 'status', 
    header: 'Status', 
    sortable: true, 
    filterable: true,
    template: (value) => {
      const color = (value === 'Active') ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200' : 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200';
      return '<span class="px-2 py-1 rounded-full text-xs font-medium ' + color + '">' + value + '</span>';
    }
  }
];

const productColumns = [
  { field: 'id', header: 'ID', sortable: true, width: '50px' },
  { field: 'name', header: 'Product Name', sortable: true, filterable: true },
  { field: 'category', header: 'Category', sortable: true, filterable: true },
  { 
    field: 'price', 
    header: 'Price', 
    sortable: true, 
    filterable: true,
    template: (value) => '$' + value.toFixed(2)
  },
  { 
    field: 'stock', 
    header: 'Stock', 
    sortable: true, 
    filterable: true,
    template: (value) => {
      const color = value > 50 ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200' : 
                    value > 20 ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200' : 
                    'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200';
      return '<span class="px-2 py-1 rounded-full text-xs font-medium ' + color + '">' + value + ' units</span>';
    }
  }
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
  <div class="not-prose mb-8">
    <DataTable 
      data={users} 
      columns={userColumns}
    />
  </div>

  <pre class="language-svelte"><code>{`<script>
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
</script>

<DataTable 
  data={users} 
  columns={columns}
/>`}</code></pre>

  <h3>Sortable and Filterable</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={users} 
      columns={userColumns}
      sortable
      filterable
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={users} 
  columns={columns}
  sortable
  filterable
/>`}</code></pre>

  <h3>Pagination</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={users} 
      columns={userColumns}
      pageable
      rowsPerPage={2}
      rowsPerPageOptions={[2, 5, 10]}
      showRowsPerPage
      showPagination
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={users} 
  columns={columns}
  pageable
  rowsPerPage={5}
  rowsPerPageOptions={[5, 10, 25]}
  showRowsPerPage
  showPagination
/>`}</code></pre>

  <h3>Selectable Rows</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={users} 
      columns={userColumns}
      selectable
      multiSelect
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={users} 
  columns={columns}
  selectable
  multiSelect
  on:selectionChange={(e) => console.log(e.detail.selection)}
/>`}</code></pre>

  <h3>Striped and Bordered</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={users} 
      columns={userColumns}
      striped
      bordered
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={users} 
  columns={columns}
  striped
  bordered
/>`}</code></pre>

  <h3>Dense Layout</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={users} 
      columns={userColumns}
      dense
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={users} 
  columns={columns}
  dense
/>`}</code></pre>

  <h3>Loading State</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={[]}
      columns={userColumns}
      loading
      loadingText="Fetching user data..."
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={[]}
  columns={columns}
  loading
  loadingText="Fetching user data..."
/>`}</code></pre>

  <h3>Empty State</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={[]}
      columns={userColumns}
      emptyText="No users found"
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={[]}
  columns={columns}
  emptyText="No users found"
/>`}</code></pre>

  <h3>Custom Templates</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={products} 
      columns={productColumns}
      sortable
      filterable
    />
  </div>

  <pre class="language-svelte"><code>{`<script>
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
      template: (value) => \`$\${value.toFixed(2)}\`
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
        return \`<span class="px-2 py-1 rounded-full text-xs font-medium \${color}">\${value} units</span>\`;
      }
    }
  ];`}
</script>

<DataTable 
  data={products} 
  columns={columns}
  sortable
  filterable
/>`}</code></pre>

  <h3>Custom Styling</h3>
  <div class="not-prose mb-8">
    <DataTable 
      data={products} 
      columns={productColumns}
      class="border border-primary-200 dark:border-primary-800 rounded-lg overflow-hidden"
      headerClass="bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-100"
      rowClass="hover:bg-primary-50 dark:hover:bg-primary-900/30"
      sortable
      filterable
    />
  </div>

  <pre class="language-svelte"><code>{`<DataTable 
  data={products} 
  columns={columns}
  class="border border-primary-200 dark:border-primary-800 rounded-lg overflow-hidden"
  headerClass="bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-100"
  rowClass="hover:bg-primary-50 dark:hover:bg-primary-900/30"
  sortable
  filterable
/>`}</code></pre>

  <h2>Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>data</code></td>
        <td><code>Array</code></td>
        <td><code>[]</code></td>
        <td>Data to display in the table</td>
      </tr>
      <tr>
        <td><code>columns</code></td>
        <td><code>Array</code></td>
        <td><code>[]</code></td>
        <td>Column definitions</td>
      </tr>
      <tr>
        <td><code>sortable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to enable sorting</td>
      </tr>
      <tr>
        <td><code>filterable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to enable filtering</td>
      </tr>
      <tr>
        <td><code>pageable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to enable pagination</td>
      </tr>
      <tr>
        <td><code>selectable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to enable row selection</td>
      </tr>
      <tr>
        <td><code>multiSelect</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to allow multiple row selection</td>
      </tr>
      <tr>
        <td><code>rowsPerPage</code></td>
        <td><code>number</code></td>
        <td><code>10</code></td>
        <td>Number of rows per page</td>
      </tr>
      <tr>
        <td><code>rowsPerPageOptions</code></td>
        <td><code>Array</code></td>
        <td><code>[5, 10, 25, 50]</code></td>
        <td>Options for rows per page</td>
      </tr>
      <tr>
        <td><code>showRowsPerPage</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show rows per page selector</td>
      </tr>
      <tr>
        <td><code>showPagination</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show pagination controls</td>
      </tr>
      <tr>
        <td><code>showHeader</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show the table header</td>
      </tr>
      <tr>
        <td><code>showFooter</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show the table footer</td>
      </tr>
      <tr>
        <td><code>striped</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to use striped rows</td>
      </tr>
      <tr>
        <td><code>bordered</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show borders between cells</td>
      </tr>
      <tr>
        <td><code>dense</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to use a more compact layout</td>
      </tr>
      <tr>
        <td><code>loading</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the table is in a loading state</td>
      </tr>
      <tr>
        <td><code>emptyText</code></td>
        <td><code>string</code></td>
        <td><code>"No data available"</code></td>
        <td>Text to display when there is no data</td>
      </tr>
      <tr>
        <td><code>loadingText</code></td>
        <td><code>string</code></td>
        <td><code>"Loading data..."</code></td>
        <td>Text to display during loading</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for the table container</td>
      </tr>
      <tr>
        <td><code>tableClass</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for the table element</td>
      </tr>
      <tr>
        <td><code>headerClass</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for header cells</td>
      </tr>
      <tr>
        <td><code>rowClass</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for table rows</td>
      </tr>
      <tr>
        <td><code>cellClass</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes for table cells</td>
      </tr>
    </tbody>
  </table>

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
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>rowClick</code></td>
        <td><code>{`{ row: Object, index: number, event: MouseEvent }`}</code></td>
        <td>Fired when a row is clicked</td>
      </tr>
      <tr>
        <td><code>sort</code></td>
        <td><code>{`{ field: string, direction: "asc" | "desc" | null }`}</code></td>
        <td>Fired when sorting changes</td>
      </tr>
      <tr>
        <td><code>filter</code></td>
        <td><code>{`{ filters: Object }`}</code></td>
        <td>Fired when filtering changes</td>
      </tr>
      <tr>
        <td><code>pageChange</code></td>
        <td><code>{`{ page: number }`}</code></td>
        <td>Fired when the current page changes</td>
      </tr>
      <tr>
        <td><code>rowsPerPageChange</code></td>
        <td><code>{`{ rowsPerPage: number }`}</code></td>
        <td>Fired when rows per page changes</td>
      </tr>
      <tr>
        <td><code>selectionChange</code></td>
        <td><code>{`{ selection: Array }`}</code></td>
        <td>Fired when row selection changes</td>
      </tr>
    </tbody>
  </table>

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
        <td><code>{`{ emptyText: string }`}</code></td>
        <td>Custom empty state</td>
      </tr>
      <tr>
        <td><code>loading</code></td>
        <td><code>{`{ loadingText: string }`}</code></td>
        <td>Custom loading state</td>
      </tr>
      <tr>
        <td><code>pagination</code></td>
        <td><code>{`{ page: number, totalPages: number, totalItems: number, rowsPerPage: number }`}</code></td>
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
