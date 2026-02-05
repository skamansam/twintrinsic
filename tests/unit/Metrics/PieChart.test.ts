import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import PieChart from '$lib/components/Metrics/PieChart/PieChart.svelte';

describe('PieChart', () => {
	it('should render with default props', () => {
		const { container } = render(PieChart, {
			props: {
				data: [35, 25, 20, 20],
				labels: ['Chrome', 'Firefox', 'Safari', 'Edge']
			}
		});

		expect(container).toBeTruthy();
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with title', () => {
		const { container } = render(PieChart, {
			props: {
				data: [35, 25, 20, 20],
				labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
				title: 'Browser Market Share'
			}
		});

		const title = container.querySelector('h3');
		expect(title?.textContent).toBe('Browser Market Share');
	});

	it('should render legend', () => {
		const { container } = render(PieChart, {
			props: {
				data: [35, 25, 20, 20],
				labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
				showLegend: true
			}
		});

		const legend = container.querySelector('.flex.flex-wrap');
		expect(legend).toBeTruthy();
	});

	it('should handle multiple slices', () => {
		const { container } = render(PieChart, {
			props: {
				data: [15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 2, 2, 2],
				labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
			}
		});

		const paths = container.querySelectorAll('path');
		expect(paths.length).toBeGreaterThan(0);
	});

	it('should render with custom colors', () => {
		const { container } = render(PieChart, {
			props: {
				data: [60, 40],
				labels: ['Success', 'Failed'],
				colors: ['#10b981', '#ef4444']
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('should render with custom size', () => {
		const { container } = render(PieChart, {
			props: {
				data: [35, 25, 20, 20],
				labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
				size: 350
			}
		});

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('350');
	});
});
