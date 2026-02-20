<!--
@component
Map documentation page
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { CodeBlock, Container, Table } from '$lib';
	import MapComponent from '$lib/components/Map/Map.svelte';
	import CustomMapImage from "./fallout4-pipboy-highres.webp";

	let customMapImageRef: any;
	let customMarkersRef: any;
	let customImageURL = 'https://staticdelivery.nexusmods.com/mods/1151/images/92456/92456-1742822281-187495018.png';

</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>Map</h1>

	<p>
		An interactive map component built on <a href="https://leafletjs.com/" target="_blank"
			>Leaflet</a
		>, a lightweight JavaScript library for mobile-friendly interactive maps.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Interactive tile-based maps with zoom and pan controls</li>
		<li>Customizable tile layers (OpenStreetMap, CartoDB, etc.)</li>
		<li>Configurable zoom levels and bounds</li>
		<li>Optional zoom and attribution controls</li>
		<li>Click, zoom, and move event handlers</li>
		<li>Lightweight and performant</li>
	</ul>

	<h2>Basic Usage</h2>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent center={[-25.2637, -57.5759]} zoom={13} />
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';
</script>

<Map center={[-25.2637, -57.5759]} zoom={13} />`}</CodeBlock>

	<h2>Custom Center and Zoom</h2>
	<p>Set a custom center location and initial zoom level:</p>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent center={[-25.2637, -57.5759]} zoom={12} />
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';
</script>

<Map center={[-25.2637, -57.5759]} zoom={12} />`}</CodeBlock>

	<h2>Different Tile Layers</h2>
	<p>Use different tile layer providers:</p>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent
			center={[-25.2637, -57.5759]}
			zoom={13}
			tileUrl={'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'}
			attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
		/>
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';
</script>

<Map 
  center={[-25.2637, -57.5759]} 
  zoom={13}
  tileUrl="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
/>`}</CodeBlock>

	<h2>Without Controls</h2>
	<p>Disable zoom or attribution controls:</p>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent center={[-25.2637, -57.5759]} zoom={13} zoomControl={false} attributionControl={false} />
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';
</script>

<Map 
  center={[-25.2637, -57.5759]} 
  zoom={13}
  zoomControl={false}
  attributionControl={false}
/>`}</CodeBlock>

	<h2>Custom Map Image</h2>
	<p>Use a custom static image as a map with pixel-based coordinates:</p>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent
			useSimpleCRS={true}
			customImage={customImageURL}
			imageWidth={1031}
			imageHeight={1031}
			center={[384, 512]}
			zoom={5}
		/>
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';
</script>

<Map 
  useSimpleCRS={true}
  imageWidth={1024}
  imageHeight={768}
  center={[384, 512]}
  zoom={1}
/>`}</CodeBlock>

	<h2>Custom Markers</h2>
	<p>Add custom markers to the map with a custom image background using pixel coordinates:</p>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent
			bind:this={customMarkersRef}
			useSimpleCRS={true}
			imageWidth={1024}
			imageHeight={768}
			center={[384, 512]}
			zoom={1}
		/>
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';

  let markers = [
    { id: 1, lat: 384, lng: 512, name: 'Center Marker' },
    { id: 2, lat: 300, lng: 400, name: 'Marker 2' }
  ];
</script>

<Map 
  useSimpleCRS={true}
  imageWidth={1024}
  imageHeight={768}
  center={[384, 512]}
  zoom={1}
  {markers}
/>`}</CodeBlock>

	<h2>Interactive Marker Creation</h2>
	<p>Click on the map to create new markers:</p>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent 
			center={[-25.2637, -57.5759]} 
			zoom={13}
			onclick={(event) => {
				console.log('Marker created at:', event.detail);
			}}
		/>
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';
  import { onMount } from 'svelte';

  let markers = [];
  let mapInstance;

  function handleMapClick(event) {
    const { lat, lng } = event.detail;
    markers = [...markers, { lat, lng }];
    
    // Add marker to map
    onMount(async () => {
      const L = await import('leaflet');
      const marker = new L.Marker([lat, lng]);
      marker.addTo(mapInstance);
      marker.bindPopup(\`Marker at \${lat.toFixed(4)}, \${lng.toFixed(4)}\`);
    });
  }
</script>

<Map 
  bind:this={mapInstance}
  center={[-25.2637, -57.5759]} 
  zoom={13}
  onclick={handleMapClick}
/>

<div class="mt-4">
  <h3>Markers Created: {markers.length}</h3>
  {#each markers as marker (marker)}
    <p>{marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}</p>
  {/each}
</div>`}</CodeBlock>

	<h2>Custom Image Map with Simple CRS</h2>
	<p>Use a custom image as a map with pixel-based coordinates and constrained bounds:</p>
	<div class="not-prose mb-8 h-96 w-full rounded-lg border border-gray-200">
		<MapComponent
			useSimpleCRS={true}
			imageWidth={1024}
			imageHeight={768}
			center={[384, 512]}
			zoom={1}
		/>
	</div>

	<CodeBlock language="svelte">{`<script>
  import { Map } from '$lib';
  import { onMount } from 'svelte';

  let mapInstance;

  onMount(async () => {
    const L = await import('leaflet');
    // Add custom image overlay with pixel coordinates
    const imageBounds = [[0, 0], [768, 1024]];
    const imageUrl = 'https://staticdelivery.nexusmods.com/mods/1151/images/92456/92456-1742822281-187495018.png';
    const imageOverlay = new L.ImageOverlay(imageUrl, imageBounds);
    imageOverlay.addTo(mapInstance);
  });
</script>

<Map 
  bind:this={mapInstance}
  useSimpleCRS={true}
  imageWidth={1024}
  imageHeight={768}
  center={[384, 512]}
  zoom={1}
/>`}</CodeBlock>

	<h2>Props</h2>
	<div class="not-prose mb-8 overflow-x-auto">
		<Table striped>
			<thead>
				<tr>
					<th>Prop</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>center</code></td>
					<td><code>[number, number]</code></td>
					<td><code>[51.505, -0.09]</code></td>
					<td>Center coordinates [latitude, longitude]</td>
				</tr>
				<tr>
					<td><code>zoom</code></td>
					<td><code>number</code></td>
					<td><code>13</code></td>
					<td>Initial zoom level</td>
				</tr>
				<tr>
					<td><code>minZoom</code></td>
					<td><code>number</code></td>
					<td><code>0</code></td>
					<td>Minimum zoom level</td>
				</tr>
				<tr>
					<td><code>maxZoom</code></td>
					<td><code>number</code></td>
					<td><code>18</code></td>
					<td>Maximum zoom level</td>
				</tr>
				<tr>
					<td><code>tileUrl</code></td>
					<td><code>string</code></td>
					<td>OpenStreetMap</td>
					<td>Tile layer URL template</td>
				</tr>
				<tr>
					<td><code>attribution</code></td>
					<td><code>string</code></td>
					<td>OpenStreetMap attribution</td>
					<td>Tile layer attribution text</td>
				</tr>
				<tr>
					<td><code>zoomControl</code></td>
					<td><code>boolean</code></td>
					<td><code>true</code></td>
					<td>Enable zoom control</td>
				</tr>
				<tr>
					<td><code>attributionControl</code></td>
					<td><code>boolean</code></td>
					<td><code>true</code></td>
					<td>Enable attribution control</td>
				</tr>
				<tr>
					<td><code>useSimpleCRS</code></td>
					<td><code>boolean</code></td>
					<td><code>false</code></td>
					<td>Use simple CRS for custom image maps with pixel coordinates</td>
				</tr>
				<tr>
					<td><code>imageWidth</code></td>
					<td><code>number</code></td>
					<td>-</td>
					<td>Image width in pixels (required if useSimpleCRS is true)</td>
				</tr>
				<tr>
					<td><code>imageHeight</code></td>
					<td><code>number</code></td>
					<td>-</td>
					<td>Image height in pixels (required if useSimpleCRS is true)</td>
				</tr>
			</tbody>
		</Table>
	</div>

	<h2>Events</h2>
	<div class="not-prose mb-8 overflow-x-auto">
		<Table striped>
			<thead>
				<tr>
					<th>Event</th>
					<th>Detail</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>onclick</code></td>
					<td><code>&#123; lat: number, lng: number &#125;</code></td>
					<td>Fired when the map is clicked</td>
				</tr>
				<tr>
					<td><code>onzoomchange</code></td>
					<td><code>&#123; zoom: number &#125;</code></td>
					<td>Fired when the zoom level changes</td>
				</tr>
				<tr>
					<td><code>onmove</code></td>
					<td><code>&#123; center: [number, number] &#125;</code></td>
					<td>Fired when the map is panned</td>
				</tr>
			</tbody>
		</Table>
	</div>

	<h2>Tile Layer Providers</h2>
	<p>Popular tile layer providers:</p>
	<ul>
		<li>
			<strong>OpenStreetMap</strong>:
			<code>https://&#123;s&#125;.tile.openstreetmap.org/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code>
		</li>
		<li>
			<strong>CartoDB Light</strong>:
			<code
				>https://cartodb-basemaps-&#123;s&#125;.global.ssl.fastly.net/light_all/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code
			>
		</li>
		<li>
			<strong>CartoDB Dark</strong>:
			<code
				>https://cartodb-basemaps-&#123;s&#125;.global.ssl.fastly.net/dark_all/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code
			>
		</li>
	</ul>

	<h2>Accessibility</h2>
	<p>
		The Map component is built on Leaflet, which provides keyboard navigation and screen reader
		support. Users can:
	</p>
	<ul>
		<li>Use arrow keys to pan the map</li>
		<li>Use <code>+</code> and <code>-</code> keys to zoom in and out</li>
		<li>Click on the map to interact with markers and popups</li>
	</ul>

	<h2>Resources</h2>
	<ul>
		<li>
			<a href="https://leafletjs.com/" target="_blank">Leaflet Documentation</a>
		</li>
		<li>
			<a href="https://leafletjs.com/reference-2.0.0.html" target="_blank">Leaflet API Reference</a>
		</li>
	</ul>
</Container>
