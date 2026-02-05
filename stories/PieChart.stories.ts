import type { Meta, StoryObj } from '@storybook/svelte';
import PieChart from '$lib/components/Metrics/PieChart/PieChart.svelte';

const meta = {
	title: 'Metrics/PieChart',
	component: PieChart,
	tags: ['autodocs'],
	argTypes: {
		data: { control: 'object' },
		labels: { control: 'object' },
		colors: { control: 'object' },
		title: { control: 'text' },
		showLegend: { control: 'boolean' },
		size: { control: { type: 'range', min: 200, max: 400, step: 50 } }
	}
} satisfies Meta<PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: [35, 25, 20, 20],
		labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
		title: 'Browser Market Share',
		showLegend: true,
		size: 300
	}
};

export const MultipleSlices: Story = {
	args: {
		data: [15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 2, 2, 2],
		labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
		title: 'Category Distribution',
		showLegend: true
	}
};

export const TwoSlices: Story = {
	args: {
		data: [60, 40],
		labels: ['Success', 'Failed'],
		colors: ['#10b981', '#ef4444'],
		title: 'Test Results',
		showLegend: true
	}
};
