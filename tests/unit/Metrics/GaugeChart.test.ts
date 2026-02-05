import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import GaugeChart from '$lib/components/Metrics/GaugeChart/GaugeChart.svelte';

describe('GaugeChart', () => {
	it('should render with default props', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 65,
				min: 0,
				max: 100
			}
		});

		expect(container).toBeTruthy();
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with label', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 65,
				min: 0,
				max: 100,
				label: 'Performance Score'
			}
		});

		const title = container.querySelector('h3');
		expect(title?.textContent).toBe('Performance Score');
	});

	it('should render with unit', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 65,
				min: 0,
				max: 100,
				unit: '%'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render high value with success color', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 92,
				min: 0,
				max: 100,
				color: 'success'
			}
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render low value with danger color', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 25,
				min: 0,
				max: 100,
				color: 'danger'
			}
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with custom range', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 65,
				min: 0,
				max: 200,
				label: 'Temperature',
				unit: '°C'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render full value', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 100,
				min: 0,
				max: 100,
				color: 'success'
			}
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});

	it('should render with custom size', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 75,
				min: 0,
				max: 100,
				size: 250
			}
		});

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('250');
	});

	it('should render with primary color', () => {
		const { container } = render(GaugeChart, {
			props: {
				value: 65,
				min: 0,
				max: 100,
				color: 'primary'
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});
});
