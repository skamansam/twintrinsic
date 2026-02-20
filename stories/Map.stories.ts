import type { Meta, StoryObj } from '@storybook/svelte';
import MapComponent from '$lib/components/Map/Map.svelte';

const meta = {
	title: 'Components/Map',
	component: MapComponent,
	tags: ['autodocs'],
	argTypes: {
		center: {
			control: 'object',
			description: 'Center coordinates [latitude, longitude]',
		},
		zoom: {
			control: { type: 'number', min: 0, max: 18 },
			description: 'Initial zoom level',
		},
		minZoom: {
			control: { type: 'number', min: 0, max: 18 },
			description: 'Minimum zoom level',
		},
		maxZoom: {
			control: { type: 'number', min: 0, max: 18 },
			description: 'Maximum zoom level',
		},
		tileUrl: {
			control: 'text',
			description: 'Tile layer URL template',
		},
		attribution: {
			control: 'text',
			description: 'Tile layer attribution',
		},
		zoomControl: {
			control: 'boolean',
			description: 'Enable zoom control',
		},
		attributionControl: {
			control: 'boolean',
			description: 'Enable attribution control',
		},
	},
} satisfies Meta<Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		center: [51.505, -0.09],
		zoom: 13,
		minZoom: 0,
		maxZoom: 18,
		tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		zoomControl: true,
		attributionControl: true,
	},
};

export const CustomCenter: Story = {
	args: {
		center: [40.7128, -74.006],
		zoom: 12,
		minZoom: 0,
		maxZoom: 18,
		tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		zoomControl: true,
		attributionControl: true,
	},
};

export const CustomTileLayer: Story = {
	args: {
		center: [51.505, -0.09],
		zoom: 13,
		minZoom: 0,
		maxZoom: 18,
		tileUrl: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
		zoomControl: true,
		attributionControl: true,
	},
};

export const NoZoomControl: Story = {
	args: {
		center: [51.505, -0.09],
		zoom: 13,
		minZoom: 0,
		maxZoom: 18,
		tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		zoomControl: false,
		attributionControl: true,
	},
};

export const NoAttribution: Story = {
	args: {
		center: [51.505, -0.09],
		zoom: 13,
		minZoom: 0,
		maxZoom: 18,
		tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		zoomControl: true,
		attributionControl: false,
	},
};
