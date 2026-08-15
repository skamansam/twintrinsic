<script lang="ts">
	import AreaChart from '$lib/components/Metrics/AreaChart/AreaChart.svelte'
	import BarChart from '$lib/components/Metrics/BarChart/BarChart.svelte'
	import DonutChart from '$lib/components/Metrics/DonutChart/DonutChart.svelte'
	import GaugeChart from '$lib/components/Metrics/GaugeChart/GaugeChart.svelte'
	import KPICard from '$lib/components/Metrics/KPICard/KPICard.svelte'
	import LineChart from '$lib/components/Metrics/LineChart/LineChart.svelte'
	import MetricGrid from '$lib/components/Metrics/MetricGrid/MetricGrid.svelte'
	import ProgressMetric from '$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte'

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
			color: 'primary' as const
		},
		{
			label: 'Total Orders',
			value: '2,543',
			trend: 'up' as const,
			trendValue: '12.5%',
			color: 'success' as const
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

<!-- Build This Yourself Banner -->
<div class="mb-8 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded">
	<div class="flex items-center justify-between">
		<div>
			<h3 class="font-semibold text-blue-900 dark:text-blue-100">Build this yourself!</h3>
			<p class="text-sm text-blue-800 dark:text-blue-200 mt-1">
				Learn how to create this dashboard with our comprehensive guide and component documentation.
			</p>
		</div>
		<a href="/docs/examples/dashboard/guide" class="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium whitespace-nowrap transition-colors">
			View Guide
		</a>
	</div>
</div>

<div class="space-y-8">
	<!-- Key Metrics Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Key Metrics Overview</h2>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
			<MetricGrid columns={4} gap="md" items={statsCards} />
		</div>
	</section>

	<!-- KPI Cards Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">KPI Progress Tracking</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each kpiData as kpi}
				<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
					<KPICard {...kpi} />
				</div>
			{/each}
		</div>
	</section>

	<!-- Sales Trends Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Sales Trends</h2>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
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
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Website Traffic Analysis</h2>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
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
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Conversion Sources</h2>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 flex justify-center">
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
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Performance Metrics</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
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
			<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
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
			<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
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
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Resource Utilization</h2>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6">
			<ProgressMetric label="CPU Usage" value={65} max={100} color="primary" showPercentage={true} />
			<ProgressMetric label="Memory Usage" value={78} max={100} color="warning" showPercentage={true} />
			<ProgressMetric label="Disk Usage" value={45} max={100} color="success" showPercentage={true} />
			<ProgressMetric label="Network Bandwidth" value={92} max={100} color="danger" showPercentage={true} />
		</div>
	</section>
</div>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
