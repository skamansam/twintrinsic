<!--
@component
Game Map Example - Interactive map with markers, popups, and editing
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import CodeEditor from '$lib/components/CodeEditor/CodeEditor.svelte'
	import Container from '$lib/components/Container/Container.svelte'
	import MapComponent from '$lib/components/Map/Map.svelte'
	import fallout4Locations from './fallout4-locations.json';
	import { m } from '$lib/paraglide/messages.js'

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

	function popupContent(marker: Record<string, any>, isEditing: boolean): string {
		if (isEditing) {
			return `
				<div class="p-3 min-w-56">
					<h3 class="font-bold text-lg mb-3">Edit Marker</h3>
					<form class="space-y-3" onsubmit="return false;">
						<div>
							<label class="block text-xs font-medium mb-1">Name</label>
							<input type="text" name="name" value="${marker.name}" class="w-full px-2 py-1 border border-border rounded text-sm" placeholder="Marker name" />
						</div>
						<div>
							<label class="block text-xs font-medium mb-1">Description</label>
							<textarea name="description" class="w-full px-2 py-1 border border-border rounded text-sm" placeholder="Description" rows="2">${marker.description}</textarea>
						</div>
						<div>
							<label class="block text-xs font-medium mb-1">Type</label>
							<select name="type" class="w-full px-2 py-1 border border-border rounded text-sm">
								<option value="treasure" ${marker.type === 'treasure' ? 'selected' : ''}>💎 Treasure</option>
								<option value="enemy" ${marker.type === 'enemy' ? 'selected' : ''}>⚔️ Enemy</option>
								<option value="npc" ${marker.type === 'npc' ? 'selected' : ''}>🧑 NPC</option>
								<option value="location" ${marker.type === 'location' ? 'selected' : ''}>📍 Location</option>
							</select>
						</div>
						<div class="flex gap-2 pt-2">
							<button type="button" data-action="save" class="flex-1 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-hover">Save</button>
							<button type="button" data-action="delete" class="flex-1 bg-error text-white px-3 py-1 rounded text-sm hover:bg-error-hover">Delete</button>
						</div>
					</form>
				</div>
			`;
		}
		
		return `
			<div class="p-3 min-w-56">
				<h3 class="font-bold text-lg mb-2">${marker.name}</h3>
				<p class="text-sm text-muted mb-3">${marker.description}</p>
				<div class="flex items-center gap-2 mb-4">
					<span class="text-2xl">${getMarkerIcon(marker.type)}</span>
					<span class="text-sm font-medium capitalize">${marker.type}</span>
				</div>
				<button type="button" data-action="edit" class="w-full bg-primary text-white px-3 py-2 rounded text-sm hover:bg-primary-hover">Edit</button>
			</div>
		`;
	}
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>{m.exmap_h1()}</h1>

	<p>
		{m.exmap_lede()}
	</p>

	<h2>{m.exmap_how_h()}</h2>
	<p>{m.exmap_how_1()}<code>&lt;Map&gt;</code>{m.exmap_how_2()}<code>customImage</code>{m.exmap_how_3()}<code>imageWidth</code>{m.exmap_how_4()}<code>imageHeight</code>{m.exmap_how_5()}</p>

	<h3>{m.exmap_features_h()}</h3>
	<ul>
		<li><strong>{m.exmap_feat_img()}</strong>{m.exmap_feat_img_1()}<code>customImage</code>{m.exmap_feat_img_2()}</li>
		<li><strong>{m.exmap_feat_markers()}</strong>{m.exmap_feat_markers_p()}</li>
		<li><strong>{m.exmap_feat_popups()}</strong>{m.exmap_feat_popups_p()}</li>
		<li><strong>{m.exmap_feat_json()}</strong>{m.exmap_feat_json_p()}</li>
	</ul>

	<h3>{m.exmap_build_h()}</h3>
	<ol>
		<li>{m.exmap_build_1_1()}<code>&lt;Map&gt;</code>{m.exmap_build_1_2()}<code>customImage</code>{m.exmap_build_1_3()}</li>
		<li>{m.exmap_build_2_1()}<code>imageWidth</code>{m.exmap_build_2_2()}<code>imageHeight</code>{m.exmap_build_2_3()}</li>
		<li>{m.exmap_build_3_1()}<code>markers</code>{m.exmap_build_3_2()}</li>
		<li>{m.exmap_build_4_1()}<code>popupContent</code>{m.exmap_build_4_2()}</li>
		<li>{m.exmap_build_5_1()}<code>onclick</code>{m.exmap_build_5_2()}</li>
		<li>{m.exmap_build_6_1()}<code>onmarkerclick</code>{m.exmap_build_6_2()}</li>
	</ol>

	<h3>{m.exmap_types_h()}</h3>
	<table>
		<thead>
			<tr><th>{m.exmap_th_type()}</th><th>{m.exmap_th_icon()}</th><th>{m.exmap_th_use()}</th></tr>
		</thead>
		<tbody>
			<tr><td>{m.exmap_t_treasure()}</td><td>💎</td><td>{m.exmap_u_treasure()}</td></tr>
			<tr><td>{m.exmap_t_enemy()}</td><td>⚔️</td><td>{m.exmap_u_enemy()}</td></tr>
			<tr><td>{m.exmap_t_npc()}</td><td>🧑</td><td>{m.exmap_u_npc()}</td></tr>
			<tr><td>{m.exmap_t_location()}</td><td>📍</td><td>{m.exmap_u_location()}</td></tr>
		</tbody>
	</table>

	<h2>{m.exmap_demo_h()}</h2>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
		<!-- Map -->
		<div class="lg:col-span-2">
			<div class="not-prose mb-8 h-96 w-full rounded-lg border border-border overflow-hidden">
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
			<div class="not-prose rounded-lg border border-border bg-surface p-4 h-96 flex flex-col">
				<h3 class="mb-3 text-lg font-semibold">{m.exmap_json_h()}</h3>
				{#if jsonError}
					<div class="mb-2 rounded bg-error-bg text-error-text dark:bg-error-900 dark:text-error-200">
						{jsonError}
					</div>
				{/if}
				<div class="flex-1 overflow-hidden rounded border border-border dark:border-border">
					<CodeEditor
						code={jsonContent}
						language="json"
						onchange={(e) => {
							jsonContent = e.detail;
							updateMarkersFromJson(e.detail);
						}}
						height="100%"
					/>
				</div>
				<p class="mt-2 text-xs text-muted">
					{m.exmap_json_p()}
				</p>
			</div>
		</div>
	</div>
</Container>
