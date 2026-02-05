import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BarChart from '$lib/components/Metrics/BarChart/BarChart.svelte';

describe('BarChart', () => {
	const singleSeries = [
		{
			label: 'Revenue',
			data: [45, 52, 48, 61, 55, 67],
			color: '#3b82f6'
		}
	];

	const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

	it('should render with single series', () => {
		const { container } = render(BarChart, {
			props: {
				series: singleSeries,
				labels
			}
		});

		expect(container).toBeTruthy();
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with title', () => {
		const { container } = render(BarChart, {
			props: {
				series: singleSeries,
				labels,
				title: 'Monthly Revenue'
			}
		});

		const title = container.querySelector('h3');
		expect(title?.textContent).toBe('Monthly Revenue');
	});

	it('should render with multiple series', () => {
		const multipleSeries = [
			{
				label: 'Q1',
				data: [30, 40, 35, 50],
				color: '#3b82f6'
			},
			{
				label: 'Q2',
				data: [35, 45, 40, 55],
				color: '#ef4444'
			}
		];

		const { container } = render(BarChart, {
			props: {
				series: multipleSeries,
				labels: ['Product A', 'Product B', 'Product C', 'Product D']
			}
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render grid lines when showGrid is true', () => {
		const { container } = render(BarChart, {
			props: {
				series: singleSeries,
				labels,
				showGrid: true
			}
		});

		const lines = container.querySelectorAll('line');
		expect(lines.length).toBeGreaterThan(0);
	});

	it('should render legend when showLegend is true', () => {
		const { container } = render(BarChart, {
			props: {
				series: singleSeries,
				labels,
				showLegend: true
			}
		});

		const legend = container.querySelector('.flex.flex-wrap');
		expect(legend).toBeTruthy();
	});

	it('should render with custom dimensions', () => {
		const { container } = render(BarChart, {
			props: {
				series: singleSeries,
				labels,
				width: 700,
				height: 350
			}
		});

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('700');
	});

	it('should render with y-axis label', () => {
		const { container } = render(BarChart, {
			props: {
				series: singleSeries,
				labels,
				yAxisLabel: 'Revenue ($K)'
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});
});
