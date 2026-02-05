import type { Meta, StoryObj } from '@storybook/svelte';
import BarChart from '$lib/components/Metrics/BarChart/BarChart.svelte';

const meta = {
	title: 'Metrics/BarChart',
	component: BarChart,
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
} satisfies Meta<BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSeries: Story = {
	args: {
		series: [
			{
				label: 'Revenue',
				data: [45, 52, 48, 61, 55, 67],
				color: '#3b82f6'
			}
		],
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		title: 'Monthly Revenue',
		yAxisLabel: 'Revenue ($K)',
		showGrid: true,
		showLegend: true
	}
};

export const MultipleSeries: Story = {
	args: {
		series: [
			{
				label: 'Q1',
				data: [30, 40, 35, 50],
				color: '#3b82f6'
			},
			{
				label: 'Q2',
				data: [35, 45, 40, 55],
				color: '#ef4444'
			},
			{
				label: 'Q3',
				data: [40, 50, 45, 60],
				color: '#10b981'
			}
		],
		labels: ['Product A', 'Product B', 'Product C', 'Product D'],
		title: 'Quarterly Sales by Product',
		yAxisLabel: 'Sales ($K)',
		showGrid: true,
		showLegend: true
	}
};

export const LargeDataset: Story = {
	args: {
		series: [
			{
				label: 'Visits',
				data: [120, 132, 101, 134, 90, 130, 110, 125, 115, 140, 135, 150],
				color: '#8b5cf6'
			}
		],
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		title: 'Annual Website Visits',
		yAxisLabel: 'Visits',
		showGrid: true,
		showLegend: true,
		width: 700,
		height: 350
	}
};
