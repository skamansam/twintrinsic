<script lang="ts">
  import App from "$lib/components/App/App.svelte"
  import AreaChart from "$lib/components/Metrics/AreaChart/AreaChart.svelte"
  import Avatar from "$lib/components/Avatar/Avatar.svelte"
  import AvatarGroup from "$lib/components/Avatar/AvatarGroup.svelte"
  import Badge from "$lib/components/Badge/Badge.svelte"
  import DataTable from "$lib/components/DataTable/DataTable.svelte"
  import MetricGrid from "$lib/components/Metrics/MetricGrid/MetricGrid.svelte"
  import ProgressMetric from "$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte"

  // --- KPI cards -----------------------------------------------------------
  const kpis = [
    { label: "Total Revenue", value: "$84,254.10", trend: "up" as const, trendValue: "12.4%", color: "primary" as const, icon: "chart" },
    { label: "New Customers", value: "1,482", trend: "up" as const, trendValue: "8.1%", color: "success" as const, icon: "users" },
    { label: "Conversion Rate", value: "3.6%", trend: "down" as const, trendValue: "0.4%", color: "warning" as const },
    { label: "Avg. Order Value", value: "$186.20", trend: "up" as const, trendValue: "5.2%", color: "info" as const },
  ]

  // --- Revenue chart --------------------------------------------------------
  const revenueSeries = [
    {
      label: "This year",
      data: [22, 26, 24, 30, 34, 38, 36, 42, 46, 44, 52, 58],
      color: "#4f46e5",
    },
    {
      label: "Last year",
      data: [18, 20, 19, 22, 25, 27, 26, 30, 33, 31, 36, 40],
      color: "#94a3b8",
    },
  ]
  const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // --- Recent orders table ----------------------------------------------------
  const orders = [
    { id: "#1042", customer: "Acme Corp", product: "Team plan", amount: 480, status: "Paid" },
    { id: "#1041", customer: "Globex", product: "Startup plan", amount: 96, status: "Paid" },
    { id: "#1040", customer: "Initech", product: "Team plan", amount: 480, status: "Pending" },
    { id: "#1039", customer: "Umbrella Co", product: "Enterprise", amount: 2400, status: "Paid" },
    { id: "#1038", customer: "Stark Ind.", product: "Startup plan", amount: 96, status: "Refunded" },
    { id: "#1037", customer: "Wayne Ent.", product: "Team plan", amount: 480, status: "Paid" },
  ]

  const orderColumns = [
    { field: "id", header: "Order", sortable: true, width: "90px" },
    { field: "customer", header: "Customer", sortable: true, filterable: true },
    { field: "product", header: "Plan", sortable: true, filterable: true },
    {
      field: "amount",
      header: "Amount",
      sortable: true,
      template: (value: unknown) => `$${(value as number).toFixed(2)}`,
    },
    {
      field: "status",
      header: "Status",
      sortable: true,
      template: (value: unknown) => {
        const variant =
          value === "Paid" ? "success" : value === "Pending" ? "warning" : "error"
        return `<span class="px-2 py-1 rounded-full text-xs font-medium bg-${variant}-100 text-${variant}-800 dark:bg-${variant}-900 dark:text-${variant}-200">${value}</span>`
      },
    },
  ]

  // --- Sidebar menu -----------------------------------------------------------
  const menu = [
    { title: "Overview", icon: "dashboard", link: "#" },
    { title: "Customers", icon: "users", link: "#" },
    {
      title: "Reports",
      icon: "chart",
      children: [
        { title: "Revenue", link: "#" },
        { title: "Usage", link: "#" },
      ],
    },
    { title: "Settings", icon: "settings", link: "#" },
  ]
</script>

<App
  appName="Acme Suite — Dashboard"
  brand="Acme Suite"
  user={{ name: "Sarah Chen", role: "Admin" }}
  navItems={[
    { label: "Dashboard", href: "#", current: true },
    { label: "Customers", href: "#" },
    { label: "Reports", href: "#" },
  ]}
  siteMenu={menu}
  showSearch
  showNotifications
>
  <div class="dashboard space-y-6 pb-4">
    <!-- KPI row -->
    <section aria-label="Key metrics">
      <MetricGrid items={kpis} columns={4} gap="md" />
    </section>

    <!-- Revenue chart + utilization -->
    <section aria-label="Performance" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-surface rounded-lg border border-border p-6">
        <AreaChart
          series={revenueSeries}
          labels={revenueLabels}
          title="Monthly recurring revenue"
          yAxisLabel="$K"
          showGrid
          showLegend
          width={700}
          height={280}
        />
      </div>
      <div class="bg-surface rounded-lg border border-border p-6 space-y-6">
        <h3 class="text-sm font-semibold text-muted">Resource utilization</h3>
        <ProgressMetric label="API calls" value={68} max={100} color="primary" />
        <ProgressMetric label="Storage" value={41} max={100} color="success" />
        <ProgressMetric label="Seats used" value={22} max={25} color="warning" />
        <ProgressMetric label="Error rate" value={1.2} max={100} color="danger" />
      </div>
    </section>

    <!-- Recent orders -->
    <section aria-label="Recent orders">
      <DataTable data={orders} columns={orderColumns} sortable filterable pageable striped />
    </section>

    <!-- Team strip -->
    <section aria-label="Team" class="flex flex-wrap items-center justify-between gap-4 bg-surface rounded-lg border border-border p-6">
      <div>
        <h3 class="text-sm font-semibold">Team members</h3>
        <p class="text-sm text-muted mt-1">6 of 10 seats used on the Team plan</p>
      </div>
      <AvatarGroup max={5} total={6} ariaLabel="Team members">
        <Avatar name="Sarah Chen" status="online" />
        <Avatar name="Michael Okafor" status="online" />
        <Avatar name="Priya Patel" status="away" />
        <Avatar name="Diego Ramos" status="offline" />
        <Avatar name="Emily Zhang" status="online" />
      </AvatarGroup>
      <Badge variant="success" pill>All systems operational</Badge>
    </section>
  </div>
</App>

<style lang="postcss">
  @reference "../src/lib/twintrinsic.css";
  .dashboard {
    @apply max-w-6xl mx-auto;
  }
</style>
