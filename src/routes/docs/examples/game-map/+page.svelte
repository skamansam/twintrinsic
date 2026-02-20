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
					attribution='Map image from <a href="https://www.nexusmods.com/fallout4/mods/92456" target="_blank">Nexus Mods</a>'
					onmarkerclick={handleMarkerClick}
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
							on:click={() => handleMarkerClick(new CustomEvent('markerclick', { detail: marker }))}
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

	<!-- Edit Form -->
	{#if showForm}
		<div class="not-prose fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div class="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-900">
				<h2 class="mb-4 text-xl font-semibold">
					{formMode === 'create' ? 'Create New Marker' : 'Edit Marker'}
				</h2>

				<div class="space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium mb-1">Name</label>
						<input
							id="name"
							type="text"
							bind:value={editingMarker.name}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
							placeholder="Marker name"
						/>
					</div>

					<div>
						<label for="description" class="block text-sm font-medium mb-1">Description</label>
						<textarea
							id="description"
							bind:value={editingMarker.description}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
							placeholder="Marker description"
							rows="3"
						/>
					</div>

					<div>
						<label for="type" class="block text-sm font-medium mb-1">Type</label>
						<select
							id="type"
							bind:value={editingMarker.type}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
						>
							{#each markerTypes as type}
								<option value={type.value}>{type.label}</option>
							{/each}
						</select>
					</div>

					{#if formMode === 'create'}
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label for="lat" class="block text-sm font-medium mb-1">Latitude</label>
								<input
									id="lat"
									type="number"
									bind:value={newMarkerLat}
									class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
									placeholder="Latitude"
								/>
							</div>
							<div>
								<label for="lng" class="block text-sm font-medium mb-1">Longitude</label>
								<input
									id="lng"
									type="number"
									bind:value={newMarkerLng}
									class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
									placeholder="Longitude"
								/>
							</div>
						</div>
					{/if}

					<div class="flex gap-2 pt-4">
						<button
							on:click={saveMarker}
							class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
						>
							{formMode === 'create' ? 'Create' : 'Save'}
						</button>
						{#if formMode === 'edit'}
							<button
								on:click={deleteMarker}
								class="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 transition-colors"
							>
								Delete
							</button>
						{/if}
						<button
							on:click={closeForm}
							class="rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</Container>
