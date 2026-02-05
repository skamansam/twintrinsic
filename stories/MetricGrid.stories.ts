import type { Meta, StoryObj } from '@storybook/svelte';
import MetricGrid from '$lib/components/Metrics/MetricGrid/MetricGrid.svelte';

const meta = {
	title: 'Metrics/MetricGrid',
	component: MetricGrid,
	tags: ['autodocs'],
	argTypes: {
		items: { control: 'object' },
		columns: { control: { type: 'range', min: 1, max: 6, step: 1 } },
		gap: { control: { type: 'radio', options: ['sm', 'md', 'lg'] } }
	}
} satisfies Meta<MetricGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
	args: {
		columns: 4,
		gap: 'md',
		items: [
			{
				label: 'Total Revenue',
				value: '$45,231.89',
				trend: 'up',
				trendValue: '20.1%',
				color: 'primary',
				icon: 'chart'
			},
			{
				label: 'Total Users',
				value: '2,543',
				trend: 'up',
				trendValue: '12.5%',
				color: 'success',
				icon: 'users'
			},
			{
				label: 'Conversion Rate',
				value: '4.8%',
				trend: 'down',
				trendValue: '2.1%',
				color: 'warning'
			},
			{
				label: 'Active Sessions',
				value: '542',
				color: 'info'
			}
		]
	}
};

export const TwoColumns: Story = {
	args: {
		columns: 2,
		gap: 'md',
		items: [
			{
				label: 'Orders',
				value: '1,234',
				trend: 'up',
				trendValue: '8.2%',
				color: 'primary'
			},
			{
				label: 'Revenue',
				value: '$54,321',
				trend: 'up',
				trendValue: '15.3%',
				color: 'success'
			},
			{
				label: 'Customers',
				value: '892',
				trend: 'down',
				trendValue: '3.1%',
				color: 'danger'
			},
			{
				label: 'Satisfaction',
				value: '94%',
				color: 'info'
			}
		]
	}
};

export const SingleColumn: Story = {
	args: {
		columns: 1,
		gap: 'lg',
		items: [
			{
				label: 'Total Sales',
				value: '$123,456',
				trend: 'up',
				trendValue: '25%',
				color: 'primary'
			},
			{
				label: 'Pending Orders',
				value: '45',
				color: 'warning'
			},
			{
				label: 'Completed Orders',
				value: '1,234',
				trend: 'up',
				trendValue: '10%',
				color: 'success'
			}
		]
	}
};
