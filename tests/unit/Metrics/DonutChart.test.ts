import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import DonutChart from '$lib/components/Metrics/DonutChart/DonutChart.svelte';

describe('DonutChart', () => {
	it('should render with default props', () => {
		const { container } = render(DonutChart, {
			props: {
				data: [30, 25, 20, 15, 10],
				labels: ['A', 'B', 'C', 'D', 'E']
			}
		});

		expect(container).toBeTruthy();
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with title', () => {
		const { container } = render(DonutChart, {
			props: {
				data: [30, 25, 20, 15, 10],
				labels: ['A', 'B', 'C', 'D', 'E'],
				title: 'Test Chart'
			}
		});

		const title = container.querySelector('h3');
		expect(title?.textContent).toBe('Test Chart');
	});

	it('should render legend when showLegend is true', () => {
		const { container } = render(DonutChart, {
			props: {
				data: [30, 25, 20, 15, 10],
				labels: ['A', 'B', 'C', 'D', 'E'],
				showLegend: true
			}
		});

		const legend = container.querySelector('.flex.flex-wrap');
		expect(legend).toBeTruthy();
	});

	it('should not render legend when showLegend is false', () => {
		const { container } = render(DonutChart, {
			props: {
				data: [30, 25, 20, 15, 10],
				labels: ['A', 'B', 'C', 'D', 'E'],
				showLegend: false
			}
		});

		const legend = container.querySelector('.flex.flex-wrap');
		expect(legend).toBeFalsy();
	});

	it('should use custom colors when provided', () => {
		const { container } = render(DonutChart, {
			props: {
				data: [50, 50],
				labels: ['A', 'B'],
				colors: ['#ff0000', '#00ff00']
			}
		});

		const paths = container.querySelectorAll('path');
		expect(paths.length).toBeGreaterThan(0);
	});

	it('should render with custom size', () => {
		const { container } = render(DonutChart, {
			props: {
				data: [30, 25, 20, 15, 10],
				labels: ['A', 'B', 'C', 'D', 'E'],
				size: 400
			}
		});

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('400');
		expect(svg?.getAttribute('height')).toBe('400');
	});

	it('should render with custom innerRadius', () => {
		const { container } = render(DonutChart, {
			props: {
				data: [30, 25, 20, 15, 10],
				labels: ['A', 'B', 'C', 'D', 'E'],
				innerRadius: 0.5
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});
});
