import type { Meta, StoryObj } from '@storybook/svelte';
import LineChart from '$lib/components/Metrics/LineChart/LineChart.svelte';

const meta = {
	title: 'Metrics/LineChart',
	component: LineChart,
	tags: ['autodocs'],
	argTypes: {
		series: { control: 'object' },
		labels: { control: 'object' },
		title: { control: 'text' },
		yAxisLabel: { control: 'text' },
		showGrid: { control: 'boolean' },
		showLegend: { control: 'boolean' },
		width: { control: { type: 'range', min: 400, max: 800, step: 50 } },
		height: { control: { type: 'range', min: 200, max: 500, step: 50 } }
	}
} satisfies Meta<LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSeries: Story = {
	args: {
		series: [
			{
				label: 'Sales',
				data: [10, 15, 12, 18, 22, 20, 25],
				color: '#3b82f6'
			}
		],
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		title: 'Weekly Sales',
		yAxisLabel: 'Sales ($)',
		showGrid: true,
		showLegend: true
	}
};

export const MultipleSeries: Story = {
	args: {
		series: [
			{
				label: 'Product A',
				data: [10, 15, 12, 18, 22, 20, 25],
				color: '#3b82f6'
			},
			{
				label: 'Product B',
				data: [8, 12, 14, 16, 18, 22, 20],
				color: '#ef4444'
			},
			{
				label: 'Product C',
				data: [5, 8, 10, 12, 15, 18, 20],
				color: '#10b981'
			}
		],
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		title: 'Product Sales Comparison',
		yAxisLabel: 'Units Sold',
		showGrid: true,
		showLegend: true
	}
};

export const NoGrid: Story = {
	args: {
		series: [
			{
				label: 'Temperature',
				data: [15, 18, 20, 22, 24, 23, 20],
				color: '#f59e0b'
			}
		],
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		title: 'Daily Temperature',
		yAxisLabel: '°C',
		showGrid: false,
		showLegend: true
	}
};
