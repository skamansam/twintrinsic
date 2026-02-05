import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MetricGrid from '$lib/components/Metrics/MetricGrid/MetricGrid.svelte';

describe('MetricGrid', () => {
	const items = [
		{
			label: 'Total Revenue',
			value: '$45,231.89',
			color: 'primary'
		},
		{
			label: 'Total Users',
			value: '2,543',
			color: 'success'
		},
		{
			label: 'Conversion Rate',
			value: '4.8%',
			color: 'warning'
		},
		{
			label: 'Active Sessions',
			value: '542',
			color: 'info'
		}
	];

	it('should render with default props', () => {
		const { container } = render(MetricGrid, {
			props: {
				items
			}
		});

		expect(container).toBeTruthy();
		expect(container.textContent).toContain('Total Revenue');
		expect(container.textContent).toContain('Total Users');
	});

	it('should render with 4 columns', () => {
		const { container } = render(MetricGrid, {
			props: {
				items,
				columns: 4
			}
		});

		const grid = container.querySelector('.grid');
		expect(grid).toBeTruthy();
	});

	it('should render with 2 columns', () => {
		const { container } = render(MetricGrid, {
			props: {
				items,
				columns: 2
			}
		});

		const grid = container.querySelector('.grid');
		expect(grid).toBeTruthy();
	});

	it('should render with 1 column', () => {
		const { container } = render(MetricGrid, {
			props: {
				items,
				columns: 1
			}
		});

		const grid = container.querySelector('.grid');
		expect(grid).toBeTruthy();
	});

	it('should render with small gap', () => {
		const { container } = render(MetricGrid, {
			props: {
				items,
				gap: 'sm'
			}
		});

		const grid = container.querySelector('.grid');
		expect(grid).toBeTruthy();
	});

	it('should render with medium gap', () => {
		const { container } = render(MetricGrid, {
			props: {
				items,
				gap: 'md'
			}
		});

		const grid = container.querySelector('.grid');
		expect(grid).toBeTruthy();
	});

	it('should render with large gap', () => {
		const { container } = render(MetricGrid, {
			props: {
				items,
				gap: 'lg'
			}
		});

		const grid = container.querySelector('.grid');
		expect(grid).toBeTruthy();
	});

	it('should render all items', () => {
		const { container } = render(MetricGrid, {
			props: {
				items
			}
		});

		items.forEach((item) => {
			expect(container.textContent).toContain(item.label);
			expect(container.textContent).toContain(item.value);
		});
	});
});
