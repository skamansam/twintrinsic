<script lang="ts">
	import { AreaChart, BarChart, DonutChart, GaugeChart, KPICard, LineChart, MetricGrid, ProgressMetric } from '$lib';

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
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
		<p class="text-gray-600 dark:text-gray-400">
			Comprehensive examples showing how to build data dashboards using Metrics components.
		</p>
	</div>

	<!-- Key Metrics Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Key Metrics Overview</h2>
		<p class="text-gray-600 dark:text-gray-400">
			Display key performance indicators in a responsive grid layout.
		</p>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
			<MetricGrid columns={4} gap="md" items={statsCards} />
		</div>
	</section>

	<!-- KPI Cards Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">KPI Progress Tracking</h2>
		<p class="text-gray-600 dark:text-gray-400">
			Track progress towards targets with visual progress indicators.
		</p>
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
		<p class="text-gray-600 dark:text-gray-400">
			Visualize sales performance across multiple products over time.
		</p>
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
		<p class="text-gray-600 dark:text-gray-400">
			Track traffic sources and device types with stacked area charts.
		</p>
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
		<p class="text-gray-600 dark:text-gray-400">
			Understand where your conversions come from with a donut chart breakdown.
		</p>
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
		<p class="text-gray-600 dark:text-gray-400">
			Monitor system and business performance with gauges and progress bars.
		</p>
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
		<p class="text-gray-600 dark:text-gray-400">
			Track resource usage with progress metrics.
		</p>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6">
			<ProgressMetric label="CPU Usage" value={65} max={100} color="primary" showPercentage={true} />
			<ProgressMetric label="Memory Usage" value={78} max={100} color="warning" showPercentage={true} />
			<ProgressMetric label="Disk Usage" value={45} max={100} color="success" showPercentage={true} />
			<ProgressMetric label="Network Bandwidth" value={92} max={100} color="danger" showPercentage={true} />
		</div>
	</section>

	<!-- Code Example Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Implementation Example</h2>
		<p class="text-gray-600 dark:text-gray-400">
			Here's how to build a dashboard with Metrics components:
		</p>
		<div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 overflow-x-auto">
			<pre class="text-gray-100 text-sm"><code>{`<script lang="ts">
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
</script>

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
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Best Practices</h2>
		<div class="space-y-3">
			<div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
				<h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Responsive Design</h3>
				<p class="text-blue-800 dark:text-blue-200 text-sm">
					Use responsive grid layouts with MetricGrid to adapt to different screen sizes. Adjust columns based on viewport width.
				</p>
			</div>
			<div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
				<h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">Color Consistency</h3>
				<p class="text-green-800 dark:text-green-200 text-sm">
					Use consistent colors across related metrics. Leverage the color themes (primary, success, warning, danger) for visual hierarchy.
				</p>
			</div>
			<div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
				<h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Data Accuracy</h3>
				<p class="text-purple-800 dark:text-purple-200 text-sm">
					Ensure data is up-to-date and accurate. Use real-time data sources when possible and clearly indicate data refresh times.
				</p>
			</div>
			<div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
				<h3 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">Accessibility</h3>
				<p class="text-orange-800 dark:text-orange-200 text-sm">
					All Metrics components include ARIA labels and keyboard navigation. Ensure sufficient color contrast and provide text alternatives for visual data.
				</p>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
