import type { Meta, StoryObj } from '@storybook/svelte';
import ProgressMetric from '$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte';

const meta = {
	title: 'Metrics/ProgressMetric',
	component: ProgressMetric,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
		max: { control: 'number' },
		color: {
			control: {
				type: 'radio',
				options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
			}
		},
		showPercentage: { control: 'boolean' },
		height: { control: { type: 'radio', options: ['sm', 'md', 'lg'] } }
	}
} satisfies Meta<ProgressMetric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Project Progress',
		value: 65,
		max: 100,
		color: 'primary',
		showPercentage: true,
		height: 'md'
	}
};

export const Complete: Story = {
	args: {
		label: 'Upload Progress',
		value: 100,
		max: 100,
		color: 'success',
		showPercentage: true
	}
};

export const InProgress: Story = {
	args: {
		label: 'Download Progress',
		value: 45,
		max: 100,
		color: 'warning',
		showPercentage: true
	}
};

export const SmallHeight: Story = {
	args: {
		label: 'Disk Usage',
		value: 75,
		max: 100,
		color: 'danger',
		showPercentage: true,
		height: 'sm'
	}
};

export const LargeHeight: Story = {
	args: {
		label: 'Memory Usage',
		value: 55,
		max: 100,
		color: 'info',
		showPercentage: true,
		height: 'lg'
	}
};

export const NoPercentage: Story = {
	args: {
		label: 'Tasks Completed',
		value: 7,
		max: 10,
		color: 'success',
		showPercentage: false
	}
};
