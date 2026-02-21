<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	interface Marker {
		id?: string | number;
		lat: number;
		lng: number;
		tooltip?: string;
		/** Custom icon - can be a string (HTML) or HTMLElement to render as marker icon */
		icon?: string | HTMLElement;
		/** Iconify icon identifier (e.g., "mdi:map-marker", "fluent-emoji-flat:pin") to fetch from Iconify API */
		iconName?: string;
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
		/** Function to render marker popup content - receives marker data and isEditing flag, returns HTML string */
		popupContent?: (marker: Marker, isEditing: boolean) => string;
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
		popupContent,
		onclick,
		onzoomchange,
		onmove,
		onmarkerclick,
	}: Props = $props();

	let mapContainer: HTMLDivElement;
	// biome-ignore lint/suspicious/noExplicitAny: Leaflet types not fully available in alpha
	let map: any;
	let editingMarkerId: string | number | null = null;
	const iconCache = new Map<string, string>();

	/**
	 * Fetches an icon SVG from Iconify API and creates a Leaflet icon
	 * @param iconId - Icon identifier in format "prefix:name" (e.g., "mdi:map-marker")
	 * @param size - Icon size in pixels (default: 32)
	 * @param leafletModule - Leaflet module reference
	 * @returns Promise resolving to a Leaflet Icon object or null if failed
	 */
	async function createIconifyIcon(iconId: string, size: number, leafletModule: any) {
		// Check cache first
		if (iconCache.has(iconId)) {
			const svgUrl = iconCache.get(iconId)!;
			return new leafletModule.Icon({
				iconUrl: svgUrl,
				iconSize: [size, size],
				iconAnchor: [size / 2, size],
				popupAnchor: [0, -size],
			});
		}

		try {
			const svgUrl = `https://api.iconify.design/${iconId.replace(":","/")}.svg?height=${size}`;
			// Verify the icon exists by fetching it
			const response = await fetch(svgUrl);
			if (!response.ok) {
				console.warn(`Failed to fetch icon: ${iconId}`);
				return null;
			}

			// Cache the URL
			iconCache.set(iconId, svgUrl);

			return new leafletModule.Icon({
				iconUrl: svgUrl,
				iconSize: [size, size],
				iconAnchor: [size / 2, size],
				popupAnchor: [0, -size],
			});
		} catch (error) {
			console.error(`Error creating icon for ${iconId}:`, error);
			return null;
		}
	}

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
			await Promise.all(
				markers.map(async (markerData: Marker) => {
					// Create marker with custom icon if specified
					const markerOptions: any = {};

					// Handle iconName (Iconify icon)
					if (markerData.iconName) {
						const customIcon = await createIconifyIcon(markerData.iconName, 32, leaflet);
						if (customIcon) {
							markerOptions.icon = customIcon;
						}
					}
					// Handle icon (custom HTML string or HTMLElement)
					else if (markerData.icon) {
						const iconHtml = typeof markerData.icon === 'string' 
							? markerData.icon 
							: markerData.icon.outerHTML;
						markerOptions.icon = new leaflet.DivIcon({
							html: iconHtml,
							iconSize: [32, 32],
							iconAnchor: [16, 32],
							popupAnchor: [0, -32],
							className: 'custom-marker-icon'
						});
					}

					// Create marker
					const marker = new (leaflet as any).Marker([markerData.lat, markerData.lng], markerOptions);
					marker.addTo(map);

					// Add tooltip from marker data if provided
					const tooltipText = markerData.tooltip || markerData.description;
					if (tooltipText) {
						marker.bindTooltip(tooltipText, { permanent: false });
					}

					// Define popup listener function
					function attachPopupListeners(popupElement: HTMLElement) {
						const editButton = popupElement.querySelector('[data-action="edit"]');
						const saveButton = popupElement.querySelector('[data-action="save"]');
						const deleteButton = popupElement.querySelector('[data-action="delete"]');

						if (editButton) {
							editButton.addEventListener('click', () => {
								editingMarkerId = markerData.id || null;
								if (popupContent) {
									const updatedContent = popupContent(markerData, true);
									marker.setPopupContent(updatedContent);
									setTimeout(() => {
										const newPopupElement = marker.getPopup().getElement();
										attachPopupListeners(newPopupElement);
									}, 0);
								}
							});
						}

						if (saveButton) {
							saveButton.addEventListener('click', () => {
								const formData: Record<string, any> = { id: markerData.id };
								const inputs = popupElement.querySelectorAll('input, textarea, select');
								inputs.forEach((input: any) => {
									if (input.name || input.id) {
										const key = input.name || input.id;
										formData[key] = input.value;
									}
								});

								onmarkerclick?.(
									new CustomEvent('markersave', {
										detail: formData,
									}) as any
								);

								let markerToUpdateIndex = markers.findIndex((m) => m.id === markerData.id);
								markers[markerToUpdateIndex] = {...markers[markerToUpdateIndex], ...formData};
								const newMarkerData = markers[markerToUpdateIndex];

								editingMarkerId = null;
								if (popupContent) {
									const updatedContent = popupContent(newMarkerData, false);
									marker.setPopupContent(updatedContent);
									setTimeout(() => {
										const newPopupElement = marker.getPopup().getElement();
										attachPopupListeners(newPopupElement);
									}, 0);
								}
							});
						}

						if (deleteButton) {
							deleteButton.addEventListener('click', () => {
								editingMarkerId = null;
								markers = markers.filter((m) => m.id !== markerData.id);
								marker.remove();
								onmarkerclick?.(
									new CustomEvent('markerdelete', {
										detail: markerData,
									})
								);
							});
						}
					}

					// Add popup if popupContent function is provided
					if (popupContent) {
						const isEditing = editingMarkerId === markerData.id;
						const htmlContent = popupContent(markerData, isEditing);
						if (htmlContent) {
							marker.bindPopup(htmlContent);
							marker.on('popupopen', () => {
								const popupElement = marker.getPopup().getElement();
								if (popupElement) {
									attachPopupListeners(popupElement);
								}
							});
						}
					}

					// Add click event to marker
					marker.on('click', () => {
						onmarkerclick?.(
							new CustomEvent('markerclick', {
								detail: markerData,
							})
						);
					});
				})
			).catch((error) => {
				console.error('Error loading markers:', error);
			});
		}

		// Attach event listeners to map
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
