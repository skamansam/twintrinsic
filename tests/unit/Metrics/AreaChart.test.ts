import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AreaChart from '$lib/components/Metrics/AreaChart/AreaChart.svelte';

describe('AreaChart', () => {
	const singleSeries = [
		{
			label: 'Website Traffic',
			data: [10, 15, 12, 18, 22, 20, 25],
			color: '#3b82f6'
		}
	];

	const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	it('should render with single series', () => {
		const { container } = render(AreaChart, {
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
		const { container } = render(AreaChart, {
			props: {
				series: singleSeries,
				labels,
				title: 'Weekly Traffic'
			}
		});

		const title = container.querySelector('h3');
		expect(title?.textContent).toBe('Weekly Traffic');
	});

	it('should render with multiple series', () => {
		const multipleSeries = [
			{
				label: 'Desktop',
				data: [10, 15, 12, 18, 22, 20, 25],
				color: '#3b82f6'
			},
			{
				label: 'Mobile',
				data: [8, 12, 14, 16, 18, 22, 20],
				color: '#ef4444'
			}
		];

		const { container } = render(AreaChart, {
			props: {
				series: multipleSeries,
				labels
			}
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render stacked areas', () => {
		const multipleSeries = [
			{
				label: 'Product A',
				data: [30, 35, 32, 38, 42, 40, 45],
				color: '#3b82f6'
			},
			{
				label: 'Product B',
				data: [20, 25, 28, 30, 32, 35, 38],
				color: '#ef4444'
			}
		];

		const { container } = render(AreaChart, {
			props: {
				series: multipleSeries,
				labels,
				stacked: true
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('should render non-stacked areas', () => {
		const multipleSeries = [
			{
				label: 'Desktop',
				data: [10, 15, 12, 18, 22, 20, 25],
				color: '#3b82f6'
			},
			{
				label: 'Mobile',
				data: [8, 12, 14, 16, 18, 22, 20],
				color: '#ef4444'
			}
		];

		const { container } = render(AreaChart, {
			props: {
				series: multipleSeries,
				labels,
				stacked: false
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('should render grid lines when showGrid is true', () => {
		const { container } = render(AreaChart, {
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
		const { container } = render(AreaChart, {
			props: {
				series: singleSeries,
				labels,
				showLegend: true
			}
		});

		const legend = container.querySelector('.flex.flex-wrap');
		expect(legend).toBeTruthy();
	});

	it('should render with y-axis label', () => {
		const { container } = render(AreaChart, {
			props: {
				series: singleSeries,
				labels,
				yAxisLabel: 'Visits'
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('should render with custom dimensions', () => {
		const { container } = render(AreaChart, {
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
});
