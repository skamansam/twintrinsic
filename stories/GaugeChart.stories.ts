import type { Meta, StoryObj } from '@storybook/svelte';
import GaugeChart from '$lib/components/Metrics/GaugeChart/GaugeChart.svelte';

const meta = {
	title: 'Metrics/GaugeChart',
	component: GaugeChart,
	tags: ['autodocs'],
	argTypes: {
		value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
		min: { control: 'number' },
		max: { control: 'number' },
		label: { control: 'text' },
		unit: { control: 'text' },
		color: {
			control: {
				type: 'radio',
				options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
			}
		},
		size: { control: { type: 'range', min: 150, max: 300, step: 50 } }
	}
} satisfies Meta<GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 65,
		min: 0,
		max: 100,
		label: 'Performance Score',
		unit: '%',
		color: 'primary',
		size: 200
	}
};

export const HighValue: Story = {
	args: {
		value: 92,
		min: 0,
		max: 100,
		label: 'Success Rate',
		unit: '%',
		color: 'success'
	}
};

export const LowValue: Story = {
	args: {
		value: 25,
		min: 0,
		max: 100,
		label: 'Error Rate',
		unit: '%',
		color: 'danger'
	}
};

export const CustomRange: Story = {
	args: {
		value: 65,
		min: 0,
		max: 200,
		label: 'Temperature',
		unit: '°C',
		color: 'warning',
		size: 250
	}
};

export const FullValue: Story = {
	args: {
		value: 100,
		min: 0,
		max: 100,
		label: 'Completion',
		unit: '%',
		color: 'success'
	}
};
