import type { Meta, StoryObj } from '@storybook/svelte';
import StatsCard from '$lib/components/Metrics/StatsCard/StatsCard.svelte';

const meta = {
	title: 'Metrics/StatsCard',
	component: StatsCard,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: 'text' },
		icon: { control: 'text' },
		trend: { control: { type: 'radio', options: ['up', 'down', undefined] } },
		trendValue: { control: 'text' },
		color: {
			control: {
				type: 'radio',
				options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
			}
		}
	}
} satisfies Meta<StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Total Revenue',
		value: '$12,345',
		color: 'primary',
		icon: 'chart'
	}
};

export const WithTrendUp: Story = {
	args: {
		label: 'Total Users',
		value: '2,543',
		trend: 'up',
		trendValue: '12.5%',
		color: 'success',
		icon: 'users'
	}
};

export const WithTrendDown: Story = {
	args: {
		label: 'Bounce Rate',
		value: '32.5%',
		trend: 'down',
		trendValue: '5.2%',
		color: 'danger'
	}
};

export const Secondary: Story = {
	args: {
		label: 'Conversion Rate',
		value: '4.8%',
		trend: 'up',
		trendValue: '2.1%',
		color: 'secondary',
		icon: 'trending'
	}
};

export const Warning: Story = {
	args: {
		label: 'Pending Orders',
		value: '18',
		color: 'warning'
	}
};

export const Info: Story = {
	args: {
		label: 'Active Sessions',
		value: '542',
		color: 'info'
	}
};
