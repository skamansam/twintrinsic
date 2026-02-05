import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ProgressMetric from '$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte';

describe('ProgressMetric', () => {
	it('should render with required props', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Project Progress',
				value: 65,
				max: 100
			}
		});

		expect(container).toBeTruthy();
		expect(container.textContent).toContain('Project Progress');
	});

	it('should render with percentage', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Upload Progress',
				value: 100,
				max: 100,
				showPercentage: true
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render in-progress state', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Download Progress',
				value: 45,
				max: 100,
				color: 'warning'
			}
		});

		expect(container.textContent).toContain('Download Progress');
	});

	it('should render with small height', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Disk Usage',
				value: 75,
				max: 100,
				height: 'sm'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render with medium height', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Memory Usage',
				value: 55,
				max: 100,
				height: 'md'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render with large height', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'CPU Usage',
				value: 65,
				max: 100,
				height: 'lg'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render with primary color', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Progress',
				value: 65,
				max: 100,
				color: 'primary'
			}
		});

		const bar = container.querySelector('.rounded-full');
		expect(bar).toBeTruthy();
	});

	it('should render with success color', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Tasks Completed',
				value: 7,
				max: 10,
				color: 'success'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render without percentage when showPercentage is false', () => {
		const { container } = render(ProgressMetric, {
			props: {
				label: 'Progress',
				value: 50,
				max: 100,
				showPercentage: false
			}
		});

		expect(container).toBeTruthy();
	});
});
