<script lang="ts">
	import AreaChart from '$lib/components/Metrics/AreaChart/AreaChart.svelte'
	import BarChart from '$lib/components/Metrics/BarChart/BarChart.svelte'
	import DonutChart from '$lib/components/Metrics/DonutChart/DonutChart.svelte'
	import GaugeChart from '$lib/components/Metrics/GaugeChart/GaugeChart.svelte'
	import KPICard from '$lib/components/Metrics/KPICard/KPICard.svelte'
	import LineChart from '$lib/components/Metrics/LineChart/LineChart.svelte'
	import MetricGrid from '$lib/components/Metrics/MetricGrid/MetricGrid.svelte'
	import ProgressMetric from '$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte'
	import { m } from '$lib/paraglide/messages.js'

	// Sample data for the dashboard
	const salesData = {
		series: [
			{
				label: 'Product A',
				data: [45, 52, 48, 61, 55, 67, 72, 68, 75, 80, 78, 85],
				color: '#3b82f6'
			},
			{
				label: 'Product B',
				data: [32, 38, 35, 44, 42, 51, 56, 52, 60, 65, 63, 70],
				color: '#ef4444'
			},
			{
				label: 'Product C',
				data: [20, 25, 22, 28, 26, 32, 38, 35, 42, 48, 46, 52],
				color: '#10b981'
			}
		],
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	};

	const trafficData = {
		series: [
			{
				label: 'Desktop',
				data: [120, 132, 101, 134, 90, 130, 110, 125, 115, 140, 135, 150],
				color: '#3b82f6'
			},
			{
				label: 'Mobile',
				data: [80, 95, 70, 90, 65, 95, 80, 90, 85, 105, 100, 115],
				color: '#ef4444'
			},
			{
				label: 'Tablet',
				data: [40, 50, 35, 45, 30, 50, 40, 45, 40, 55, 50, 60],
				color: '#10b981'
			}
		],
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	};

	const conversionData = {
		data: [45, 38, 52, 41, 35, 48],
		labels: ['Direct', 'Organic', 'Referral', 'Social', 'Email', 'Paid']
	};

	const statsCards = [
		{
			label: 'Total Revenue',
			value: '$124,532.89',
			trend: 'up' as const,
			trendValue: '20.1%',
			color: 'primary' as const,
			icon: 'chart'
		},
		{
			label: 'Total Orders',
			value: '2,543',
			trend: 'up' as const,
			trendValue: '12.5%',
			color: 'success' as const,
			icon: 'users'
		},
		{
			label: 'Conversion Rate',
			value: '4.8%',
			trend: 'down' as const,
			trendValue: '2.1%',
			color: 'warning' as const
		},
		{
			label: 'Active Sessions',
			value: '542',
			color: 'info' as const
		}
	];

	const kpiData = [
		{
			label: 'Q4 Sales Target',
			value: 95000,
			target: 100000,
			unit: '$',
			color: 'success' as const
		},
		{
			label: 'Customer Acquisition',
			value: 750,
			target: 1000,
			color: 'warning' as const
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold text-text mb-2">{m.exdashg_h1()}</h1>
		<p class="text-muted">
			{m.exdashg_lede()}
		</p>
	</div>

	<!-- Key Metrics Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdash_sec_metrics()}</h2>
		<p class="text-muted">
			{m.exdashg_metrics_p()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6">
			<MetricGrid columns={4} gap="md" items={statsCards} />
		</div>
	</section>

	<!-- KPI Cards Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdash_sec_kpi()}</h2>
		<p class="text-muted">
			{m.exdashg_kpi_p()}
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each kpiData as kpi}
				<div class="bg-surface rounded-lg border border-border p-6">
					<KPICard {...kpi} />
				</div>
			{/each}
		</div>
	</section>

	<!-- Sales Trends Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdash_sec_sales()}</h2>
		<p class="text-muted">
			{m.exdashg_sales_p()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6">
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
	</section>

	<!-- Traffic Analysis Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdash_sec_traffic()}</h2>
		<p class="text-muted">
			{m.exdashg_traffic_p()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6">
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
	</section>

	<!-- Conversion Breakdown Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdash_sec_conversion()}</h2>
		<p class="text-muted">
			{m.exdashg_conversion_p()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6 flex justify-center">
			<DonutChart
				data={conversionData.data}
				labels={conversionData.labels}
				title="Conversion Sources"
				showLegend={true}
				size={350}
			/>
		</div>
	</section>

	<!-- Performance Metrics Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdash_sec_perf()}</h2>
		<p class="text-muted">
			{m.exdashg_perf_p()}
		</p>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-surface rounded-lg border border-border p-6">
				<GaugeChart
					value={75}
					min={0}
					max={100}
					label="Performance Score"
					unit="%"
					color="primary"
					size={200}
				/>
			</div>
			<div class="bg-surface rounded-lg border border-border p-6">
				<GaugeChart
					value={92}
					min={0}
					max={100}
					label="Success Rate"
					unit="%"
					color="success"
					size={200}
				/>
			</div>
			<div class="bg-surface rounded-lg border border-border p-6">
				<GaugeChart
					value={45}
					min={0}
					max={100}
					label="Error Rate"
					unit="%"
					color="danger"
					size={200}
				/>
			</div>
		</div>
	</section>

	<!-- Progress Tracking Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdash_sec_resource()}</h2>
		<p class="text-muted">
			{m.exdashg_resource_p()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6 space-y-6">
			<ProgressMetric label="CPU Usage" value={65} max={100} color="primary" showPercentage={true} />
			<ProgressMetric label="Memory Usage" value={78} max={100} color="warning" showPercentage={true} />
			<ProgressMetric label="Disk Usage" value={45} max={100} color="success" showPercentage={true} />
			<ProgressMetric label="Network Bandwidth" value={92} max={100} color="danger" showPercentage={true} />
		</div>
	</section>

	<!-- Code Example Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exdashg_impl_h()}</h2>
		<p class="text-muted">
			{m.exdashg_impl_p()}
		</p>
		<div class="bg-inverse text-inverse-text rounded-lg p-6 overflow-x-auto">
			<pre class="text-muted text-sm"><code>{`\u003Cscript lang="ts">
  import { MetricGrid, BarChart, DonutChart } from '$lib';

  const statsCards = [
    {
      label: 'Total Revenue',
      value: '$124,532.89',
      trend: 'up',
      trendValue: '20.1%',
      color: 'primary'
    },
    // ... more cards
  ];

  const salesData = {
    series: [
      {
        label: 'Product A',
        data: [45, 52, 48, 61, 55, 67],
        color: '#3b82f6'
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  };
\u003C/script>

<!-- Key Metrics -->
<MetricGrid columns={4} gap="md" items={statsCards} />

<!-- Sales Chart -->
<BarChart
  series={salesData.series}
  labels={salesData.labels}
  title="Monthly Sales"
  yAxisLabel="Sales ($K)"
  showGrid={true}
  showLegend={true}
/>

<!-- Conversion Breakdown -->
<DonutChart
  data={[45, 38, 52, 41]}
  labels={['Direct', 'Organic', 'Referral', 'Social']}
  title="Conversion Sources"
  showLegend={true}
/>`}</code></pre>
		</div>
	</section>

	<!-- Best Practices Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.ex_bestpractices()}</h2>
		<div class="space-y-3">
			<div class="bg-info-bg border border-info rounded-lg p-4">
				<h3 class="font-semibold text-info-900 dark:text-info-100 mb-2">{m.ex_bp_responsive_h()}</h3>
				<p class="text-info-800 dark:text-info-200 text-sm">
					{m.exdashg_bp_responsive_p()}
				</p>
			</div>
			<div class="bg-success-bg border border-success rounded-lg p-4">
				<h3 class="font-semibold text-success-900 dark:text-success-100 mb-2">{m.ex_bp_colors_h()}</h3>
				<p class="text-success-800 dark:text-success-200 text-sm">
					{m.exdashg_bp_colors_p()}
				</p>
			</div>
			<div class="bg-secondary-bg border border-secondary rounded-lg p-4">
				<h3 class="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">{m.ex_bp_data_h()}</h3>
				<p class="text-secondary-800 dark:text-secondary-200 text-sm">
					{m.exdashg_bp_data_p()}
				</p>
			</div>
			<div class="bg-warning-bg border border-warning rounded-lg p-4">
				<h3 class="font-semibold text-warning-900 dark:text-warning-100 mb-2">{m.ex_bp_a11y_h()}</h3>
				<p class="text-warning-800 dark:text-warning-200 text-sm">
					{m.exdashg_bp_a11y_p()}
				</p>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
