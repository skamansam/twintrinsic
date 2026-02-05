import type { Meta, StoryObj } from '@storybook/svelte';
import DonutChart from '$lib/components/Metrics/DonutChart/DonutChart.svelte';

const meta = {
	title: 'Metrics/DonutChart',
	component: DonutChart,
	tags: ['autodocs'],
	argTypes: {
		data: { control: 'object' },
		labels: { control: 'object' },
		colors: { control: 'object' },
		title: { control: 'text' },
		innerRadius: { control: { type: 'range', min: 0.3, max: 0.8, step: 0.1 } },
		showLegend: { control: 'boolean' },
		size: { control: { type: 'range', min: 200, max: 400, step: 50 } }
	}
} satisfies Meta<DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: [30, 25, 20, 15, 10],
		labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
		title: 'Sales Distribution',
		showLegend: true,
		size: 300
	}
};

export const CustomColors: Story = {
	args: {
		data: [40, 30, 20, 10],
		labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
		title: 'Quarterly Revenue',
		showLegend: true
	}
};

export const NoLegend: Story = {
	args: {
		data: [50, 30, 20],
		labels: ['Desktop', 'Mobile', 'Tablet'],
		title: 'Device Usage',
		showLegend: false
	}
};

export const LargeSize: Story = {
	args: {
		data: [25, 25, 25, 25],
		labels: ['North', 'South', 'East', 'West'],
		title: 'Regional Distribution',
		size: 400
	}
};
