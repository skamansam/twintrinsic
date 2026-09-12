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
import { m } from "$lib/paraglide/messages.js"

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
<h1>{m.mex_heading}</h1>

<p>
  {m.mex_intro}
</p>

<h2>{m.mex_kpi_overview}</h2>
<p>{m.mex_kpi_overview_desc}</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
  <MetricGrid columns={4} gap="md" items={statsCards} />
</div>

<h2>{m.mex_kpi_tracking}</h2>
<p>{m.mex_kpi_tracking_desc}</p>
<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
  {#each kpiData as kpi}
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <KPICard {...kpi} />
    </div>
  {/each}
</div>

<h2>{m.mex_sales}</h2>
<p>{m.mex_sales_desc}</p>
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

<h2>{m.mex_traffic}</h2>
<p>{m.mex_traffic_desc}</p>
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

<h2>{m.mex_conversion}</h2>
<p>{m.mex_conversion_desc}</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 flex justify-center">
  <DonutChart
    data={conversionData.data}
    labels={conversionData.labels}
    title="Conversion Sources"
    showLegend={true}
    size={350}
  />
</div>

<h2>{m.mex_performance}</h2>
<p>{m.mex_performance_desc}</p>
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

<h2>{m.mex_resources}</h2>
<p>{m.mex_resources_desc}</p>
<div class="not-prose bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6">
  <ProgressMetric label="CPU Usage" value={65} max={100} color="primary" showPercentage={true} />
  <ProgressMetric label="Memory Usage" value={78} max={100} color="warning" showPercentage={true} />
  <ProgressMetric label="Disk Usage" value={45} max={100} color="success" showPercentage={true} />
  <ProgressMetric label="Network Bandwidth" value={92} max={100} color="danger" showPercentage={true} />
</div>

<h2>{m.mex_best}</h2>
<ul>
  <li><strong>{m.mex_bp_responsive}:</strong> {m.mex_bp_responsive_desc}</li>
  <li><strong>{m.mex_bp_color}:</strong> {m.mex_bp_color_desc}</li>
  <li><strong>{m.mex_bp_accuracy}:</strong> {m.mex_bp_accuracy_desc}</li>
  <li><strong>{m.mex_bp_a11y}:</strong> {m.mex_bp_a11y_desc}</li>
</ul>
</Container>
