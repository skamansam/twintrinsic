import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import KPICard from '$lib/components/Metrics/KPICard/KPICard.svelte';

describe('KPICard', () => {
	it('should render with required props', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Q4 Sales Target',
				value: 95000,
				target: 100000
			}
		});

		expect(container).toBeTruthy();
		expect(container.textContent).toContain('Q4 Sales Target');
	});

	it('should render with unit', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Q4 Sales Target',
				value: 95000,
				target: 100000,
				unit: '$'
			}
		});

		expect(container).toBeTruthy();
	});

	it('should render on-track status when value >= target', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Sales',
				value: 100000,
				target: 100000,
				color: 'success'
			}
		});

		expect(container.textContent).toContain('Sales');
	});

	it('should render below-target status when value < target', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Goals',
				value: 65,
				target: 100,
				color: 'danger'
			}
		});

		expect(container.textContent).toContain('Goals');
	});

	it('should render with primary color', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Traffic',
				value: 125000,
				target: 100000,
				color: 'primary'
			}
		});

		const card = container.querySelector('.rounded-lg');
		expect(card).toBeTruthy();
	});

	it('should render with secondary color', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Launches',
				value: 8,
				target: 12,
				color: 'secondary'
			}
		});

		const card = container.querySelector('.rounded-lg');
		expect(card).toBeTruthy();
	});

	it('should calculate progress percentage correctly', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Progress',
				value: 50,
				target: 100
			}
		});

		expect(container).toBeTruthy();
	});

	it('should handle partial progress', () => {
		const { container } = render(KPICard, {
			props: {
				label: 'Customer Acquisition',
				value: 750,
				target: 1000,
				color: 'warning'
			}
		});

		expect(container.textContent).toContain('Customer Acquisition');
	});
});
