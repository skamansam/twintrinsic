<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import DataTable from "../lib/components/DataTable/DataTable.svelte"
import { fn } from "@storybook/test"

const { Story } = defineMeta({
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    columns: { control: "object" },
    sortable: { control: "boolean" },
    filterable: { control: "boolean" },
    pageable: { control: "boolean" },
    selectable: { control: "boolean" },
    multiSelect: { control: "boolean" },
    rowsPerPage: { control: "number" },
    rowsPerPageOptions: { control: "object" },
    showRowsPerPage: { control: "boolean" },
    showPagination: { control: "boolean" },
    showHeader: { control: "boolean" },
    showFooter: { control: "boolean" },
    striped: { control: "boolean" },
    bordered: { control: "boolean" },
    dense: { control: "boolean" },
    loading: { control: "boolean" },
    emptyText: { control: "text" },
    loadingText: { control: "text" },
  },
  args: {
    sortable: true,
    filterable: true,
    pageable: true,
    selectable: false,
    multiSelect: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25, 50],
    showRowsPerPage: true,
    showPagination: true,
    showHeader: true,
    showFooter: true,
    striped: true,
    bordered: false,
    dense: false,
    loading: false,
    emptyText: "No data available",
    loadingText: "Loading data...",
    onRowClick: fn(),
    onSort: fn(),
    onFilter: fn(),
    onPageChange: fn(),
    onRowsPerPageChange: fn(),
    onSelectionChange: fn(),
  },
})

// Sample data for the table
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
  {
    id: 6,
    name: "Diana Miller",
    email: "diana.miller@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Edward Davis",
    email: "edward.davis@example.com",
    role: "Viewer",
    status: "Active",
  },
  {
    id: 8,
    name: "Fiona Wilson",
    email: "fiona.wilson@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 9,
    name: "George Moore",
    email: "george.moore@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: 10,
    name: "Hannah Taylor",
    email: "hannah.taylor@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 11,
    name: "Ian Anderson",
    email: "ian.anderson@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 12,
    name: "Julia Thomas",
    email: "julia.thomas@example.com",
    role: "Viewer",
    status: "Inactive",
  },
]

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1299.99, stock: 45 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 899.99, stock: 120 },
  { id: 3, name: "Headphones", category: "Audio", price: 199.99, stock: 75 },
  { id: 4, name: "Monitor", category: "Electronics", price: 349.99, stock: 30 },
  { id: 5, name: "Keyboard", category: "Accessories", price: 89.99, stock: 60 },
  { id: 6, name: "Mouse", category: "Accessories", price: 49.99, stock: 80 },
  { id: 7, name: "Tablet", category: "Electronics", price: 599.99, stock: 25 },
  { id: 8, name: "Speakers", category: "Audio", price: 149.99, stock: 40 },
  { id: 9, name: "Webcam", category: "Accessories", price: 79.99, stock: 35 },
  { id: 10, name: "External Hard Drive", category: "Storage", price: 129.99, stock: 50 },
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
    template: (value) => {
      const color =
        value === "Active"
          ? "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200"
          : "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200"
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${value}</span>`
    },
  },
]

const productColumns = [
  { field: "id", header: "ID", sortable: true, width: "50px" },
  { field: "name", header: "Product Name", sortable: true, filterable: true },
  { field: "category", header: "Category", sortable: true, filterable: true },
  {
    field: "price",
    header: "Price",
    sortable: true,
    filterable: true,
    template: (value) => `$${value.toFixed(2)}`,
  },
  {
    field: "stock",
    header: "Stock",
    sortable: true,
    filterable: true,
    template: (value) => {
      const color =
        value > 50
          ? "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200"
          : value > 20
            ? "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200"
            : "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200"
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${value} units</span>`
    },
  },
]
</script>

<Story name="Basic">
  <div class="w-full">
    <DataTable 
      data={users} 
      columns={userColumns}
    />
  </div>
</Story>

<Story name="Sortable and Filterable">
  <div class="w-full">
    <DataTable 
      data={users} 
      columns={userColumns}
      sortable
      filterable
    />
  </div>
</Story>

<Story name="Pagination">
  <div class="w-full">
    <DataTable 
      data={users} 
      columns={userColumns}
      pageable
      rowsPerPage={5}
      rowsPerPageOptions={[5, 10, 15]}
      showRowsPerPage
      showPagination
    />
  </div>
</Story>

<Story name="Selectable Rows">
  <div class="w-full">
    <DataTable 
      data={users} 
      columns={userColumns}
      selectable
      multiSelect
    />
  </div>
</Story>

<Story name="Striped and Bordered">
  <div class="w-full">
    <DataTable 
      data={users} 
      columns={userColumns}
      striped
      bordered
    />
  </div>
</Story>

<Story name="Dense">
  <div class="w-full">
    <DataTable 
      data={users} 
      columns={userColumns}
      dense
    />
  </div>
</Story>

<Story name="Loading State">
  <div class="w-full">
    <DataTable 
      data={[]}
      columns={userColumns}
      loading
      loadingText="Fetching user data..."
    />
  </div>
</Story>

<Story name="Empty State">
  <div class="w-full">
    <DataTable 
      data={[]}
      columns={userColumns}
      emptyText="No users found"
    />
  </div>
</Story>

<Story name="Products Table">
  <div class="w-full">
    <DataTable 
      data={products} 
      columns={productColumns}
      sortable
      filterable
      pageable
    />
  </div>
</Story>

<Story name="Custom Styling">
  <div class="w-full">
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
</Story>
