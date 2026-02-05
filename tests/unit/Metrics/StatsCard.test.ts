import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import StatsCard from '$lib/components/Metrics/StatsCard/StatsCard.svelte';

describe('StatsCard', () => {
	it('should render with required props', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Total Revenue',
				value: '$12,345'
			}
		});

		expect(container).toBeTruthy();
		expect(container.textContent).toContain('Total Revenue');
		expect(container.textContent).toContain('$12,345');
	});

	it('should render with trend indicator up', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Total Users',
				value: '2,543',
				trend: 'up',
				trendValue: '12.5%'
			}
		});

		expect(container.textContent).toContain('12.5%');
	});

	it('should render with trend indicator down', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Bounce Rate',
				value: '32.5%',
				trend: 'down',
				trendValue: '5.2%'
			}
		});

		expect(container.textContent).toContain('5.2%');
	});

	it('should render with primary color', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Total Revenue',
				value: '$12,345',
				color: 'primary'
			}
		});

		const card = container.querySelector('.rounded-lg');
		expect(card).toBeTruthy();
	});

	it('should render with success color', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Total Users',
				value: '2,543',
				color: 'success'
			}
		});

		const card = container.querySelector('.rounded-lg');
		expect(card).toBeTruthy();
	});

	it('should render with warning color', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Pending Orders',
				value: '18',
				color: 'warning'
			}
		});

		const card = container.querySelector('.rounded-lg');
		expect(card).toBeTruthy();
	});

	it('should render with danger color', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Errors',
				value: '5',
				color: 'danger'
			}
		});

		const card = container.querySelector('.rounded-lg');
		expect(card).toBeTruthy();
	});

	it('should render without trend when not provided', () => {
		const { container } = render(StatsCard, {
			props: {
				label: 'Active Sessions',
				value: '542'
			}
		});

		expect(container.textContent).toContain('Active Sessions');
		expect(container.textContent).toContain('542');
	});
});
