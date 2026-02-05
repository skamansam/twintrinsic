import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import HorizontalBarChart from '$lib/components/Metrics/HorizontalBarChart/HorizontalBarChart.svelte';

describe('HorizontalBarChart', () => {
	const data = [45, 38, 52, 41, 35];
	const labels = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'];

	it('should render with default props', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data,
				labels
			}
		});

		expect(container).toBeTruthy();
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with title', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data,
				labels,
				title: 'Browser Usage'
			}
		});

		const title = container.querySelector('h3');
		expect(title?.textContent).toBe('Browser Usage');
	});

	it('should render with x-axis label', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data,
				labels,
				xAxisLabel: 'Percentage (%)'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render grid lines when showGrid is true', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data,
				labels,
				showGrid: true
			}
		});

		const lines = container.querySelectorAll('line');
		expect(lines.length).toBeGreaterThan(0);
	});

	it('should render with custom colors', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data: [30, 25, 20, 15, 10],
				labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
				colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('should render with long labels', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data: [120, 95, 110, 85, 100],
				labels: [
					'Product Development',
					'Marketing & Sales',
					'Customer Support',
					'Operations',
					'Administration'
				],
				title: 'Department Budget',
				width: 600,
				height: 350
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render without grid', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data: [75, 60, 85, 70],
				labels: ['North', 'South', 'East', 'West'],
				showGrid: false
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('should render with custom dimensions', () => {
		const { container } = render(HorizontalBarChart, {
			props: {
				data,
				labels,
				width: 600,
				height: 350
			}
		});

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('600');
	});
});
