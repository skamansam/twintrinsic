import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MetricTrend from '$lib/components/Metrics/MetricTrend/MetricTrend.svelte';

describe('MetricTrend', () => {
	it('should render with upward trend', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Sales Trend',
				data: [10, 12, 15, 14, 18, 20, 22, 25, 28, 30],
				color: '#10b981'
			}
		});

		expect(container).toBeTruthy();
		expect(container.textContent).toContain('Sales Trend');
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with downward trend', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Error Rate',
				data: [25, 23, 20, 22, 18, 15, 12, 10, 8, 5],
				color: '#ef4444'
			}
		});

		expect(container.textContent).toContain('Error Rate');
	});

	it('should render with volatile trend', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Stock Price',
				data: [100, 105, 98, 110, 102, 115, 108, 120, 112, 125],
				color: '#3b82f6'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render with stable trend', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Temperature',
				data: [20, 20.5, 20.2, 20.8, 20.3, 20.6, 20.4, 20.7, 20.5, 20.6],
				color: '#f59e0b'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render with custom height', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Trend',
				data: [10, 15, 12, 18, 22, 20, 25],
				height: 60
			}
		});

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('height')).toBe('60');
	});

	it('should render with long-term data', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Monthly Revenue',
				data: [45, 52, 48, 61, 55, 67, 72, 68, 75, 80, 78, 85],
				color: '#8b5cf6'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render with small dataset', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Quick Metric',
				data: [10, 20, 15],
				color: '#3b82f6'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render with custom color', () => {
		const { container } = render(MetricTrend, {
			props: {
				label: 'Trend',
				data: [10, 15, 12, 18, 22],
				color: '#ff00ff'
			}
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});
});
