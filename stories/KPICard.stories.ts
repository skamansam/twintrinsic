import type { Meta, StoryObj } from '@storybook/svelte';
import KPICard from '$lib/components/Metrics/KPICard/KPICard.svelte';

const meta = {
	title: 'Metrics/KPICard',
	component: KPICard,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: 'number' },
		target: { control: 'number' },
		unit: { control: 'text' },
		icon: { control: 'text' },
		color: {
			control: {
				type: 'radio',
				options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
			}
		}
	}
} satisfies Meta<KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnTrack: Story = {
	args: {
		label: 'Q4 Sales Target',
		value: 95000,
		target: 100000,
		unit: '$',
		color: 'success',
		icon: 'target'
	}
};

export const BelowTarget: Story = {
	args: {
		label: 'Monthly Goals',
		value: 65,
		target: 100,
		unit: 'units',
		color: 'danger',
		icon: 'flag'
	}
};

export const PartialProgress: Story = {
	args: {
		label: 'Customer Acquisition',
		value: 750,
		target: 1000,
		color: 'warning'
	}
};

export const ExceededTarget: Story = {
	args: {
		label: 'Website Traffic',
		value: 125000,
		target: 100000,
		unit: 'visits',
		color: 'primary'
	}
};

export const Secondary: Story = {
	args: {
		label: 'Product Launches',
		value: 8,
		target: 12,
		color: 'secondary'
	}
};
