import type { Meta, StoryObj } from '@storybook/svelte';
import MetricTrend from '$lib/components/Metrics/MetricTrend/MetricTrend.svelte';

const meta = {
	title: 'Metrics/MetricTrend',
	component: MetricTrend,
	tags: ['autodocs'],
	argTypes: {
		data: { control: 'object' },
		label: { control: 'text' },
		color: { control: 'text' },
		height: { control: { type: 'range', min: 30, max: 80, step: 10 } }
	}
} satisfies Meta<MetricTrend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UpwardTrend: Story = {
	args: {
		label: 'Sales Trend',
		data: [10, 12, 15, 14, 18, 20, 22, 25, 28, 30],
		color: '#10b981',
		height: 40
	}
};

export const DownwardTrend: Story = {
	args: {
		label: 'Error Rate',
		data: [25, 23, 20, 22, 18, 15, 12, 10, 8, 5],
		color: '#ef4444',
		height: 40
	}
};

export const VolatileTrend: Story = {
	args: {
		label: 'Stock Price',
		data: [100, 105, 98, 110, 102, 115, 108, 120, 112, 125],
		color: '#3b82f6',
		height: 50
	}
};

export const StableTrend: Story = {
	args: {
		label: 'Temperature',
		data: [20, 20.5, 20.2, 20.8, 20.3, 20.6, 20.4, 20.7, 20.5, 20.6],
		color: '#f59e0b',
		height: 40
	}
};

export const LongTerm: Story = {
	args: {
		label: 'Monthly Revenue',
		data: [45, 52, 48, 61, 55, 67, 72, 68, 75, 80, 78, 85],
		color: '#8b5cf6',
		height: 60
	}
};
