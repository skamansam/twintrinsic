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
		/** Color for the marker (CSS color value, e.g., "#ff0000", "red", "rgb(255,0,0)") */
		color?: string;
		/** Show marker as a standard map marker shape (teardrop) with icon inside */
		markerShape?: boolean;
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
	const ICON_CACHE_KEY = 'twintrinsic_map_icon_cache';

	/**
	 * Get icon URL from localStorage cache
	 */
	function getCachedIconUrl(cacheKey: string): string | null {
		if (typeof window === 'undefined') return null;
		try {
			const cache = JSON.parse(localStorage.getItem(ICON_CACHE_KEY) || '{}');
			return cache[cacheKey] || null;
		} catch {
			return null;
		}
	}

	/**
	 * Store icon URL in localStorage cache
	 */
	function setCachedIconUrl(cacheKey: string, url: string): void {
		if (typeof window === 'undefined') return;
		try {
			const cache = JSON.parse(localStorage.getItem(ICON_CACHE_KEY) || '{}');
			cache[cacheKey] = url;
			localStorage.setItem(ICON_CACHE_KEY, JSON.stringify(cache));
		} catch (error) {
			console.warn('Failed to cache icon in localStorage:', error);
		}
	}

	/**
	 * Creates an SVG marker shape (teardrop) with an icon inside
	 * @param iconUrl - URL of the icon to place inside the marker
	 * @param color - Color of the marker shape
	 * @param size - Size of the marker in pixels
	 * @returns Data URL of the SVG marker
	 */
	function createMarkerShapeSvg(iconUrl: string, color: string = '#ef4444', size: number = 40): string {
		const svg = `
			<svg width="${size}" height="${size * 1.3}" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
						<feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
					</filter>
				</defs>
				<!-- Marker shape (teardrop) -->
				<path d="M 20 0 C 8.95 0 0 8.95 0 20 C 0 35 20 52 20 52 C 20 52 40 35 40 20 C 40 8.95 31.05 0 20 0 Z" 
					fill="${color}" filter="url(#shadow)"/>
				<!-- Inner circle for icon 
				<circle cx="20" cy="18" r="12" fill="white"/>
				-->
				<!-- Icon image -->
				<image x="8" y="6" width="24" height="24" href="${iconUrl}" preserveAspectRatio="xMidYMid slice"/>
			</svg>
		`;
		return `data:image/svg+xml;base64,${btoa(svg)}`;
	}

	/**
	 * Fetches an icon SVG from Iconify API and creates a Leaflet icon
	 * @param iconId - Icon identifier in format "prefix:name" (e.g., "mdi:map-marker")
	 * @param size - Icon size in pixels (default: 32)
	 * @param leafletModule - Leaflet module reference
	 * @param color - Optional CSS color to tint the icon
	 * @returns Promise resolving to a Leaflet Icon object or null if failed
	 */
	async function createIconifyIcon(iconId: string, size: number, leafletModule: any, color?: string) {
		const cacheKey = color ? `${iconId}:${color}` : iconId;
		
		// Check localStorage cache first
		const cachedUrl = getCachedIconUrl(cacheKey);
		if (cachedUrl) {
			return new leafletModule.Icon({
				iconUrl: cachedUrl,
				iconSize: [size, size],
				iconAnchor: [size / 2, size],
				popupAnchor: [0, -size],
			});
		}

		try {
			const colorParam = color ? `&color=${encodeURIComponent(color)}` : '';
			const svgUrl = `https://api.iconify.design/${iconId.replace(":","/")}.svg?height=${size}${colorParam}`;
			// Verify the icon exists by fetching it
			const response = await fetch(svgUrl);
			if (!response.ok) {
				console.warn(`Failed to fetch icon: ${iconId}`);
				return null;
			}

			// Cache the URL in localStorage
			setCachedIconUrl(cacheKey, svgUrl);

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
						const customIcon = await createIconifyIcon(markerData.iconName, 32, leaflet, markerData.color);
						if (customIcon) {
							if (markerData.markerShape) {
								// Create marker shape with icon inside
								const markerColor = markerData.color || '#ef4444';
								const markerShapeUrl = createMarkerShapeSvg(customIcon.options.iconUrl, markerColor, 40);
								markerOptions.icon = new leaflet.Icon({
									iconUrl: markerShapeUrl,
									iconSize: [40, 52],
									iconAnchor: [20, 52],
									popupAnchor: [0, -52],
								});
							} else {
								markerOptions.icon = customIcon;
							}
						}
					}
					// Handle icon (custom HTML string or HTMLElement)
					else if (markerData.icon) {
						const iconHtml = typeof markerData.icon === 'string' 
							? markerData.icon 
							: markerData.icon.outerHTML;
						const colorFilter = markerData.color 
							? `filter: hue-rotate(${markerData.color === 'red' ? '0deg' : markerData.color === 'blue' ? '240deg' : markerData.color === 'green' ? '120deg' : '0deg'});`
							: '';
						markerOptions.icon = new leaflet.DivIcon({
							html: `<div style="${colorFilter}">${iconHtml}</div>`,
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
