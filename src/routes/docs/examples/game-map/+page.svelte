<!--
@component
Game Map Example - Interactive map with markers, popups, and editing
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { CodeEditor, Container, Map as MapComponent } from '$lib';
	import fallout4Locations from './fallout4-locations.json';

	interface GameMarker {
		id: string;
		lat: number;
		lng: number;
		name: string;
		description: string;
		type: 'treasure' | 'enemy' | 'npc' | 'location';
		icon?: string | HTMLElement;
		iconName?: string;
		color?: string;
		markerShape?: boolean;
	}

	const IMAGE_URL = 'https://staticdelivery.nexusmods.com/mods/1151/images/92456/92456-1742822281-187495018.png';
	const IMAGE_WIDTH = 1031;
	const IMAGE_HEIGHT = 1031;

	let markers: GameMarker[] = [];
	let jsonContent = '';
	let editingMarker: GameMarker | null = null;
	let showForm = false;
	let showPopupForm = false;
	let formMode: 'create' | 'edit' = 'create';
	let newMarkerLat = 500;
	let newMarkerLng = 500;
	let jsonError = '';

	const markerTypes = [
		{ value: 'treasure', label: '💎 Treasure', icon: '💎' },
		{ value: 'enemy', label: '⚔️ Enemy', icon: '⚔️' },
		{ value: 'npc', label: '🧑 NPC', icon: '🧑' },
		{ value: 'location', label: '📍 Location', icon: '📍' },
	];

	function updateMarkersFromJson(json: string) {
		try {
			const parsed = JSON.parse(json);
			if (Array.isArray(parsed)) {
				markers = parsed.map((location: any) => ({
					id: location.id,
					lat: location.lat,
					lng: location.lng,
					name: location.name,
					description: location.description || location.type.replace(/_/g, ' ').charAt(0).toUpperCase() + location.type.replace(/_/g, ' ').slice(1),
					type: location.type || 'location',
					iconName: location.iconName,
					color: location.color,
					markerShape: location.markerShape,
					icon: location.icon,
				}));
				jsonError = '';
			}
		} catch (error) {
			jsonError = `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`;
		}
	}

	function updateJsonFromMarkers() {
		jsonContent = JSON.stringify(markers, null, 2);
	}

	onMount(() => {
		// Load Fallout 4 locations from JSON and convert to GameMarker format
		const falloutMarkers: GameMarker[] = fallout4Locations.map((location: any) => ({
			id: location.id,
			lat: location.lat,
			lng: location.lng,
			name: location.name,
			description: location.type.replace(/_/g, ' ').charAt(0).toUpperCase() + location.type.replace(/_/g, ' ').slice(1),
			type: 'location',
			iconName: location.iconName,
			color: location.color,
			markerShape: location.markerShape,
		}));
		markers = falloutMarkers;
		updateJsonFromMarkers();
	});

	function handleMarkerClick(event: CustomEvent<GameMarker>) {
		const marker = event.detail;
		editingMarker = marker;
		formMode = 'edit';
		showForm = true;
	}

	function handleMarkerSave(formData: Record<string, any>) {
		const markerId = formData.id;
		const index = markers.findIndex((m) => m.id === markerId);
		if (index !== -1) {
			markers[index] = {
				...markers[index],
				name: formData.name,
				description: formData.description,
				type: formData.type,
			};
			markers = markers; // Trigger reactivity
		}
	}

	function handleMarkerDelete(marker: GameMarker) {
		markers = markers.filter((m) => m.id !== marker.id);
	}

	function handleMapClick(event: CustomEvent<{ lat: number; lng: number }>) {
		newMarkerLat = event.detail.lat;
		newMarkerLng = event.detail.lng;
		editingMarker = null;
		formMode = 'create';
		showForm = true;
	}

	function saveMarker() {
		if (formMode === 'create') {
			const newMarker: GameMarker = {
				id: Date.now().toString(),
				lat: newMarkerLat,
				lng: newMarkerLng,
				name: editingMarker?.name || 'New Location',
				description: editingMarker?.description || '',
				type: editingMarker?.type || 'location',
				icon: editingMarker?.icon || '📍',
			};
			markers = [...markers, newMarker];
		} else if (editingMarker) {
			markers = markers.map((m) => (m.id === editingMarker?.id ? editingMarker : m));
		}
		closeForm();
	}

	function deleteMarker() {
		if (editingMarker) {
			markers = markers.filter((m) => m.id !== editingMarker?.id);
			closeForm();
		}
	}

	function closeForm() {
		showForm = false;
		editingMarker = null;
	}

	function getMarkerIcon(type: string): string {
		const typeObj = markerTypes.find((t) => t.value === type);
		return typeObj?.icon || '📍';
	}

	function popupContent(marker: GameMarker, isEditing: boolean): string {
		if (isEditing) {
			return `
				<div class="p-3 min-w-56">
					<h3 class="font-bold text-lg mb-3">Edit Marker</h3>
					<form class="space-y-3" onsubmit="return false;">
						<div>
							<label class="block text-xs font-medium mb-1">Name</label>
							<input type="text" name="name" value="${marker.name}" class="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Marker name" />
						</div>
						<div>
							<label class="block text-xs font-medium mb-1">Description</label>
							<textarea name="description" class="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Description" rows="2">${marker.description}</textarea>
						</div>
						<div>
							<label class="block text-xs font-medium mb-1">Type</label>
							<select name="type" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
								<option value="treasure" ${marker.type === 'treasure' ? 'selected' : ''}>💎 Treasure</option>
								<option value="enemy" ${marker.type === 'enemy' ? 'selected' : ''}>⚔️ Enemy</option>
								<option value="npc" ${marker.type === 'npc' ? 'selected' : ''}>🧑 NPC</option>
								<option value="location" ${marker.type === 'location' ? 'selected' : ''}>📍 Location</option>
							</select>
						</div>
						<div class="flex gap-2 pt-2">
							<button type="button" data-action="save" class="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Save</button>
							<button type="button" data-action="delete" class="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
						</div>
					</form>
				</div>
			`;
		}
		
		return `
			<div class="p-3 min-w-56">
				<h3 class="font-bold text-lg mb-2">${marker.name}</h3>
				<p class="text-sm text-gray-600 mb-3">${marker.description}</p>
				<div class="flex items-center gap-2 mb-4">
					<span class="text-2xl">${getMarkerIcon(marker.type)}</span>
					<span class="text-sm font-medium capitalize">${marker.type}</span>
				</div>
				<button type="button" data-action="edit" class="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">Edit</button>
			</div>
		`;
	}
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>Game Map Example</h1>

	<p>
		An interactive game map with markers, popups, and editing capabilities. Click on the map to create
		new markers, click on existing markers to edit them.
	</p>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
		<!-- Map -->
		<div class="lg:col-span-2">
			<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200 overflow-hidden">
				<MapComponent
					customImage={IMAGE_URL}
					imageWidth={IMAGE_WIDTH}
					imageHeight={IMAGE_HEIGHT}
					center={[515, 515]}
					zoom={5}
					{markers}
					{popupContent}
					attribution='Map image from <a href="https://www.nexusmods.com/fallout4/mods/92456" target="_blank">Nexus Mods</a>'
					onmarkerclick={(e: any) => {
						if (e.type === 'markersave') {
							handleMarkerSave(e.detail);
							updateJsonFromMarkers();
						} else if (e.type === 'markerdelete') {
							handleMarkerDelete(e.detail);
							updateJsonFromMarkers();
						} else {
							handleMarkerClick(e);
						}
					}}
					onclick={handleMapClick}
				/>
			</div>
		</div>

		<!-- JSON Editor -->
		<div class="lg:col-span-2">
			<div class="not-prose rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 h-96 flex flex-col">
				<h3 class="mb-3 text-lg font-semibold">Markers JSON</h3>
				{#if jsonError}
					<div class="mb-2 rounded bg-red-100 p-2 text-sm text-red-700 dark:bg-red-900 dark:text-red-200">
						{jsonError}
					</div>
				{/if}
				<div class="flex-1 overflow-hidden rounded border border-gray-300 dark:border-gray-600">
					<CodeEditor
						value={jsonContent}
						language="json"
						onchange={(value) => {
							jsonContent = value;
							updateMarkersFromJson(value);
						}}
						height="100%"
					/>
				</div>
				<p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
					Edit the JSON to update markers in real-time. Changes are reflected on the map immediately.
				</p>
			</div>
		</div>
	</div>
</Container>
