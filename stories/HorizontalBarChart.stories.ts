import type { Meta, StoryObj } from '@storybook/svelte';
import HorizontalBarChart from '$lib/components/Metrics/HorizontalBarChart/HorizontalBarChart.svelte';

const meta = {
	title: 'Metrics/HorizontalBarChart',
	component: HorizontalBarChart,
	tags: ['autodocs'],
	argTypes: {
		data: { control: 'object' },
		labels: { control: 'object' },
		colors: { control: 'object' },
		title: { control: 'text' },
		xAxisLabel: { control: 'text' },
		showGrid: { control: 'boolean' },
		width: { control: { type: 'range', min: 400, max: 800, step: 50 } },
		height: { control: { type: 'range', min: 200, max: 500, step: 50 } }
	}
} satisfies Meta<HorizontalBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: [45, 38, 52, 41, 35],
		labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
		title: 'Browser Usage',
		xAxisLabel: 'Percentage (%)',
		showGrid: true
	}
};

export const LongLabels: Story = {
	args: {
		data: [120, 95, 110, 85, 100],
		labels: [
			'Product Development',
			'Marketing & Sales',
			'Customer Support',
			'Operations',
			'Administration'
		],
		title: 'Department Budget Allocation',
		xAxisLabel: 'Budget ($K)',
		showGrid: true,
		width: 600,
		height: 350
	}
};

export const CustomColors: Story = {
	args: {
		data: [30, 25, 20, 15, 10],
		labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
		colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
		title: 'Quarterly Performance',
		showGrid: true
	}
};

export const NoGrid: Story = {
	args: {
		data: [75, 60, 85, 70],
		labels: ['North', 'South', 'East', 'West'],
		title: 'Regional Sales',
		xAxisLabel: 'Sales ($K)',
		showGrid: false
	}
};
