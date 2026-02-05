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
		size: { control: { type: 'range', min: 150, max: 300, step: 50 } },
		arcStart: { control: { type: 'range', min: 0, max: 360, step: 15 } },
		arcEnd: { control: { type: 'range', min: 0, max: 360, step: 15 } }
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
		size: 200,
		arcStart: 0,
		arcEnd: 180
	}
};

export const WithTics: Story = {
	args: {
		value: 71,
		min: 0,
		max: 100,
		label: 'Customer Satisfaction',
		unit: '%',
		color: 'primary',
		size: 280,
		arcStart: 0,
		arcEnd: 180,
		tics: {
			show: true,
			step: 25,
			showLabels: true
		}
	}
};

export const WithColorZones: Story = {
	args: {
		value: 71,
		min: 0,
		max: 100,
		label: "Walmart's Customer Satisfaction Score",
		unit: '%',
		color: 'primary',
		size: 300,
		arcStart: 0,
		arcEnd: 180,
		tics: {
			show: true,
			step: 25,
			showLabels: true
		},
		zones: [
			{ start: 0, end: 25, color: '#ef4444', label: 'Poor' },
			{ start: 25, end: 50, color: '#f97316', label: 'Fair' },
			{ start: 50, end: 75, color: '#eab308', label: 'Good' },
			{ start: 75, end: 100, color: '#10b981', label: 'Excellent' }
		]
	}
};

export const CustomTicValues: Story = {
	args: {
		value: 65,
		min: 0,
		max: 100,
		label: 'Performance Score',
		unit: '%',
		color: 'warning',
		size: 280,
		arcStart: 0,
		arcEnd: 180,
		tics: {
			show: true,
			values: [0, 25, 50, 75, 100],
			showLabels: true,
			format: (v: number) => `${v}%`
		}
	}
};

export const FullCircle: Story = {
	args: {
		value: 65,
		min: 0,
		max: 100,
		label: 'System Health',
		unit: '%',
		color: 'success',
		size: 280,
		arcStart: 0,
		arcEnd: 360,
		tics: {
			show: true,
			step: 20,
			showLabels: true
		}
	}
};

export const HighValue: Story = {
	args: {
		value: 92,
		min: 0,
		max: 100,
		label: 'Success Rate',
		unit: '%',
		color: 'success',
		arcStart: 0,
		arcEnd: 180
	}
};

export const LowValue: Story = {
	args: {
		value: 25,
		min: 0,
		max: 100,
		label: 'Error Rate',
		unit: '%',
		color: 'danger',
		arcStart: 0,
		arcEnd: 180
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
		size: 250,
		arcStart: 0,
		arcEnd: 180
	}
};

export const FullValue: Story = {
	args: {
		value: 100,
		min: 0,
		max: 100,
		label: 'Completion',
		unit: '%',
		color: 'success',
		arcStart: 0,
		arcEnd: 180
	}
};
