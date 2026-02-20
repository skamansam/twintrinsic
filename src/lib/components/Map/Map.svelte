<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	interface Marker {
		id?: string | number;
		lat: number;
		lng: number;
		tooltip?: string | HTMLElement | Function | leaflet.TooltipOptions;
		[key: string]: any;
	}

	interface Props {
		/** Center coordinates [latitude, longitude] */
		center?: [number, number];
		/** Initial zoom level */
		zoom?: number;
		/** Minimum zoom level */
		minZoom?: number;
		/** Maximum zoom level */
		maxZoom?: number;
		/** Tile layer URL template */
		tileUrl?: string;
		/** Tile layer attribution */
		attribution?: string;
		/** Enable zoom control */
		zoomControl?: boolean;
		/** Enable attribution control */
		attributionControl?: boolean;
		/** Use simple CRS for custom image maps (pixel coordinates) */
		useSimpleCRS?: boolean;
		/** Custom image URL (automatically enables simple CRS) */
		customImage?: string;
		/** Image width in pixels (required if useSimpleCRS or customImage is set) */
		imageWidth?: number;
		/** Image height in pixels (required if useSimpleCRS or customImage is set) */
		imageHeight?: number;
		/** Array of markers to display on the map */
		markers?: Marker[];
		/** Slot for custom marker popup content */
		markerPopup?: any;
		/** Slot for custom marker form for editing */
		markerForm?: any;
		/** Map click handler */
		onclick?: (event: CustomEvent<{ lat: number; lng: number }>) => void;
		/** Map zoom change handler */
		onzoomchange?: (event: CustomEvent<{ zoom: number }>) => void;
		/** Map move handler */
		onmove?: (event: CustomEvent<{ center: [number, number] }>) => void;
		/** Marker click handler */
		onmarkerclick?: (event: CustomEvent<Marker>) => void;
	}

	let {
		center = [51.505, -0.09],
		zoom = 13,
		minZoom = 0,
		maxZoom = 18,
		tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		zoomControl = true,
		attributionControl = true,
		useSimpleCRS = false,
		customImage,
		imageWidth,
		imageHeight,
		markers = [],
		markerPopup,
		markerForm,
		onclick,
		onzoomchange,
		onmove,
		onmarkerclick,
	}: Props = $props();

	let mapContainer: HTMLDivElement;
	// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
	let map: any;

	onMount(async () => {
		if (!mapContainer) return;

		// Dynamically import leaflet to avoid type issues
		const leafletModule = await import('leaflet');
		// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
		const leaflet = (leafletModule as any).default || leafletModule;

		// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
		const mapOptions: any = {
			zoom,
			minZoom,
			maxZoom,
			zoomControl,
			attributionControl,
		};

		// Use simple CRS for custom image maps if enabled or customImage is provided
		const isCustomImageMode = useSimpleCRS || !!customImage;
		if (isCustomImageMode) {
			// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
			mapOptions.crs = (leaflet as any).CRS.Simple;
			mapOptions.center = [center[0], center[1]];
		} else {
			mapOptions.center = [center[0], center[1]];
		}

		// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
		map = new (leaflet as any).Map(mapContainer, mapOptions);

		// Set max bounds if using simple CRS or custom image
		if (isCustomImageMode && imageHeight && imageWidth) {
			const bounds = [[0, 0], [imageHeight, imageWidth]];
			map.setMaxBounds(bounds);
			map.fitBounds(bounds);
		}

		// Use custom image layer
		if (customImage) {
			// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
			new (leaflet as any).ImageOverlay(customImage, [[0, 0], [imageHeight, imageWidth]], {
				opacity: 0.7,
			}).addTo(map);
		} else if (tileUrl) {
			new (leaflet as any).TileLayer(tileUrl, {
				attribution,
				maxZoom,
			}).addTo(map);
		}


		// Add markers to the map
		if (markers && markers.length > 0) {
			markers.forEach((markerData: Marker) => {
				// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
				const marker = new (leaflet as any).Marker([markerData.lat, markerData.lng]);
				marker.addTo(map);
				const tooltipText = markerData.tooltip || markerData.description;
				// Add tooltip from marker data if provided
				if (tooltipText) {
					marker.bindTooltip(tooltipText, { permanent: false});
				}

				// Add popup if markerPopup slot is provided
				if (markerPopup) {
					marker.bindPopup(markerPopup);
				}

				// Add click event to marker
				marker.on('click', () => {
					onmarkerclick?.(
						new CustomEvent('markerclick', {
							detail: markerData,
						})
					);
				});
			});
		}

		// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
		map.on('click', (event: any) => {
			onclick?.(
				new CustomEvent('click', {
					detail: { lat: event.latlng.lat, lng: event.latlng.lng },
				})
			);
		});

		map.on('zoomend', () => {
			onzoomchange?.(
				new CustomEvent('zoomchange', {
					detail: { zoom: map.getZoom() },
				})
			);
		});

		map.on('moveend', () => {
			const mapCenter = map.getCenter();
			onmove?.(
				new CustomEvent('move', {
					detail: { center: [mapCenter.lat, mapCenter.lng] },
				})
			);
		});

		return () => {
			if (map) {
				map.remove();
			}
		};
	});
</script>

<div bind:this={mapContainer} class="h-full w-full"></div>

<style lang="postcss">
	@reference "../../twintrinsic.css";
</style>
