import type { Meta, StoryObj } from '@storybook/svelte';
import AreaChart from '$lib/components/Metrics/AreaChart/AreaChart.svelte';

const meta = {
	title: 'Metrics/AreaChart',
	component: AreaChart,
	tags: ['autodocs'],
	argTypes: {
		series: { control: 'object' },
		labels: { control: 'object' },
		title: { control: 'text' },
		yAxisLabel: { control: 'text' },
		showGrid: { control: 'boolean' },
		stacked: { control: 'boolean' },
		showLegend: { control: 'boolean' },
		width: { control: { type: 'range', min: 400, max: 800, step: 50 } },
		height: { control: { type: 'range', min: 200, max: 500, step: 50 } }
	}
} satisfies Meta<AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSeries: Story = {
	args: {
		series: [
			{
				label: 'Website Traffic',
				data: [10, 15, 12, 18, 22, 20, 25],
				color: '#3b82f6'
			}
		],
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		title: 'Weekly Traffic',
		yAxisLabel: 'Visits',
		showGrid: true,
		showLegend: true
	}
};

export const MultipleSeries: Story = {
	args: {
		series: [
			{
				label: 'Desktop',
				data: [10, 15, 12, 18, 22, 20, 25],
				color: '#3b82f6'
			},
			{
				label: 'Mobile',
				data: [8, 12, 14, 16, 18, 22, 20],
				color: '#ef4444'
			},
			{
				label: 'Tablet',
				data: [5, 8, 10, 12, 15, 18, 20],
				color: '#10b981'
			}
		],
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		title: 'Traffic by Device',
		yAxisLabel: 'Visits',
		showGrid: true,
		stacked: false,
		showLegend: true
	}
};

export const Stacked: Story = {
	args: {
		series: [
			{
				label: 'Product A',
				data: [30, 35, 32, 38, 42, 40, 45],
				color: '#3b82f6'
			},
			{
				label: 'Product B',
				data: [20, 25, 28, 30, 32, 35, 38],
				color: '#ef4444'
			},
			{
				label: 'Product C',
				data: [15, 18, 20, 22, 25, 28, 30],
				color: '#10b981'
			}
		],
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		title: 'Stacked Sales by Product',
		yAxisLabel: 'Sales ($K)',
		showGrid: true,
		stacked: true,
		showLegend: true
	}
};
