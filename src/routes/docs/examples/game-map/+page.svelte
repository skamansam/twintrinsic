<!--
@component
Game Map Example - Interactive map with markers, popups, and editing
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Map as MapComponent } from '$lib';

	interface GameMarker {
		id: string;
		lat: number;
		lng: number;
		name: string;
		description: string;
		type: 'treasure' | 'enemy' | 'npc' | 'location';
		icon?: string;
	}

	const IMAGE_URL = 'https://staticdelivery.nexusmods.com/mods/1151/images/92456/92456-1742822281-187495018.png';
	const IMAGE_WIDTH = 1031;
	const IMAGE_HEIGHT = 1031;

	let markers: GameMarker[] = [];
	let editingMarker: GameMarker | null = null;
	let showForm = false;
	let showPopupForm = false;
	let formMode: 'create' | 'edit' = 'create';
	let newMarkerLat = 500;
	let newMarkerLng = 500;

	const markerTypes = [
		{ value: 'treasure', label: '💎 Treasure', icon: '💎' },
		{ value: 'enemy', label: '⚔️ Enemy', icon: '⚔️' },
		{ value: 'npc', label: '🧑 NPC', icon: '🧑' },
		{ value: 'location', label: '📍 Location', icon: '📍' },
	];

	onMount(() => {
		// Initialize with random markers
		const randomMarkers: GameMarker[] = [
			{
				id: '1',
				lat: 200,
				lng: 300,
				name: 'Ancient Ruins',
				description: 'Mysterious ruins with valuable artifacts',
				type: 'location',
				icon: '📍',
			},
			{
				id: '2',
				lat: 400,
				lng: 600,
				name: 'Dragon Hoard',
				description: 'Legendary treasure guarded by a dragon',
				type: 'treasure',
				icon: '💎',
			},
			{
				id: '3',
				lat: 700,
				lng: 200,
				name: 'Bandit Camp',
				description: 'Dangerous bandits roam this area',
				type: 'enemy',
				icon: '⚔️',
			},
			{
				id: '4',
				lat: 600,
				lng: 800,
				name: 'Village Elder',
				description: 'Wise elder with knowledge of the land',
				type: 'npc',
				icon: '🧑',
			},
			{
				id: '5',
				lat: 300,
				lng: 700,
				name: 'Hidden Chest',
				description: 'Small treasure chest hidden in the forest',
				type: 'treasure',
				icon: '💎',
			},
		];
		markers = randomMarkers;
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

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
						} else if (e.type === 'markerdelete') {
							handleMarkerDelete(e.detail);
						} else {
							handleMarkerClick(e);
						}
					}}
					onclick={handleMapClick}
				/>
			</div>
		</div>

		<!-- Sidebar -->
		<div class="not-prose">
			<div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
				<h3 class="mb-4 text-lg font-semibold">Markers ({markers.length})</h3>

				<div class="space-y-2 max-h-96 overflow-y-auto">
					{#each markers as marker (marker.id)}
					<button
						onclick={() => handleMarkerClick(new CustomEvent('markerclick', { detail: marker }))}
						class="w-full text-left rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
					>
							<div class="flex items-center gap-2">
								<span class="text-xl">{getMarkerIcon(marker.type)}</span>
								<div class="flex-1 min-w-0">
									<div class="font-medium truncate">{marker.name}</div>
									<div class="text-xs text-gray-500 dark:text-gray-400 truncate">{marker.description}</div>
								</div>
							</div>
						</button>
					{/each}
				</div>

				{#if markers.length === 0}
					<p class="text-sm text-gray-500 dark:text-gray-400">No markers yet. Click on the map to create one.</p>
				{/if}
			</div>
		</div>
	</div>
</Container>
