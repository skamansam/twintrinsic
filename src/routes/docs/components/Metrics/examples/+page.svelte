<!--
@component
Metrics examples page — comprehensive dashboard demo
-->
<script lang="ts">
import AreaChart from '$lib/components/Metrics/AreaChart/AreaChart.svelte'
import BarChart from '$lib/components/Metrics/BarChart/BarChart.svelte'
import Container from "$lib/components/Container/Container.svelte"
import DonutChart from '$lib/components/Metrics/DonutChart/DonutChart.svelte'
import GaugeChart from '$lib/components/Metrics/GaugeChart/GaugeChart.svelte'
import KPICard from '$lib/components/Metrics/KPICard/KPICard.svelte'
import LineChart from '$lib/components/Metrics/LineChart/LineChart.svelte'
import MetricGrid from '$lib/components/Metrics/MetricGrid/MetricGrid.svelte'
import ProgressMetric from '$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte'

const salesData = {
  series: [
    { label: 'Product A', data: [45, 52, 48, 61, 55, 67, 72, 68, 75, 80, 78, 85], color: '#3b82f6' },
    { label: 'Product B', data: [32, 38, 35, 44, 42, 51, 56, 52, 60, 65, 63, 70], color: '#ef4444' },
    { label: 'Product C', data: [20, 25, 22, 28, 26, 32, 38, 35, 42, 48, 46, 52], color: '#10b981' }
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

const trafficData = {
  series: [
    { label: 'Desktop', data: [120, 132, 101, 134, 90, 130, 110, 125, 115, 140, 135, 150], color: '#3b82f6' },
    { label: 'Mobile', data: [80, 95, 70, 90, 65, 95, 80, 90, 85, 105, 100, 115], color: '#ef4444' },
    { label: 'Tablet', data: [40, 50, 35, 45, 30, 50, 40, 45, 40, 55, 50, 60], color: '#10b981' }
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

const conversionData = {
  data: [45, 38, 52, 41, 35, 48],
  labels: ['Direct', 'Organic', 'Referral', 'Social', 'Email', 'Paid']
}

const statsCards = [
  { label: 'Total Revenue', value: '$124,532.89', trend: 'up' as const, trendValue: '20.1%', color: 'primary' as const, icon: 'chart' },
  { label: 'Total Orders', value: '2,543', trend: 'up' as const, trendValue: '12.5%', color: 'success' as const, icon: 'users' },
  { label: 'Conversion Rate', value: '4.8%', trend: 'down' as const, trendValue: '2.1%', color: 'warning' as const },
  { label: 'Active Sessions', value: '542', color: 'info' as const }
]

const kpiData = [
  { label: 'Q4 Sales Target', value: 95000, target: 100000, unit: '$', color: 'success' as const },
  { label: 'Customer Acquisition', value: 750, target: 1000, color: 'warning' as const }
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Dashboard Examples</h1>

<p>
  Comprehensive examples showing how to build data dashboards using Metrics
  components. These demonstrate real-world layouts combining multiple chart
  types, KPI cards, and progress indicators.
</p>

<h2>Key Metrics Overview</h2>
<p>Display key performance indicators in a responsive grid layout.</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
  <MetricGrid columns={4} gap="md" items={statsCards} />
</div>

<h2>KPI Progress Tracking</h2>
<p>Track progress towards targets with visual progress indicators.</p>
<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
  {#each kpiData as kpi}
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <KPICard {...kpi} />
    </div>
  {/each}
</div>

<h2>Sales Trends</h2>
<p>Visualize sales performance across multiple products over time.</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
  <BarChart
    series={salesData.series}
    labels={salesData.labels}
    title="Monthly Sales by Product"
    yAxisLabel="Sales ($K)"
    showGrid={true}
    showLegend={true}
    width={700}
    height={350}
  />
</div>

<h2>Website Traffic Analysis</h2>
<p>Track traffic sources and device types with stacked area charts.</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
  <AreaChart
    series={trafficData.series}
    labels={trafficData.labels}
    title="Traffic by Device Type (Stacked)"
    yAxisLabel="Visits"
    showGrid={true}
    stacked={true}
    showLegend={true}
    width={700}
    height={350}
  />
</div>

<h2>Conversion Sources</h2>
<p>Understand where your conversions come from with a donut chart breakdown.</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 flex justify-center">
  <DonutChart
    data={conversionData.data}
    labels={conversionData.labels}
    title="Conversion Sources"
    showLegend={true}
    size={350}
  />
</div>

<h2>Performance Metrics</h2>
<p>Monitor system and business performance with gauges and progress bars.</p>
<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
    <GaugeChart value={75} min={0} max={100} label="Performance Score" unit="%" color="primary" size={200} />
  </div>
  <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
    <GaugeChart value={92} min={0} max={100} label="Success Rate" unit="%" color="success" size={200} />
  </div>
  <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
    <GaugeChart value={45} min={0} max={100} label="Error Rate" unit="%" color="danger" size={200} />
  </div>
</div>

<h2>Resource Utilization</h2>
<p>Track resource usage with progress metrics.</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6">
  <ProgressMetric label="CPU Usage" value={65} max={100} color="primary" showPercentage={true} />
  <ProgressMetric label="Memory Usage" value={78} max={100} color="warning" showPercentage={true} />
  <ProgressMetric label="Disk Usage" value={45} max={100} color="success" showPercentage={true} />
  <ProgressMetric label="Network Bandwidth" value={92} max={100} color="danger" showPercentage={true} />
</div>

<h2>Best Practices</h2>
<ul>
  <li><strong>Responsive Design:</strong> Use responsive grid layouts with MetricGrid to adapt to different screen sizes.</li>
  <li><strong>Color Consistency:</strong> Use consistent colors across related metrics. Leverage the color themes (primary, success, warning, danger) for visual hierarchy.</li>
  <li><strong>Data Accuracy:</strong> Ensure data is up-to-date and clearly indicate refresh times.</li>
  <li><strong>Accessibility:</strong> All Metrics components include ARIA labels and keyboard navigation. Provide text alternatives for visual data.</li>
</ul>
</Container>
