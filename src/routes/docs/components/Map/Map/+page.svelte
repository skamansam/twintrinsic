<!--
@component
Map documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import MapComponent from "$lib/components/Map/Map.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MapComponentModule from "$lib/components/Map/Map.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Map</h1>

  <p>
    <strong>Map</strong> is an interactive map component built on
    <a href="https://leafletjs.com/" target="_blank">Leaflet</a>, a lightweight JavaScript
    library for mobile-friendly interactive maps.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A Leaflet-powered interactive map with tile-based rendering, zoom/pan controls, custom
    markers, and event handling. Supports both geographic (lat/lng) and pixel-based
    (Simple CRS) coordinate systems for custom image maps.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Map&gt;</code> when you need to display geographic locations, store
    finders, delivery tracking, or custom image overlays (game maps, floor plans).
    For simple data visualization, consider chart components.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Leaflet integration</strong> — battle-tested, lightweight mapping library.</li>
    <li><strong>Custom CRS</strong> — pixel-based coordinates for custom image maps.</li>
    <li><strong>Event system</strong> — click, zoom, and move handlers for interactivity.</li>
    <li><strong>Tile providers</strong> — OpenStreetMap, CartoDB, and more.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://leafletjs.com/">Leaflet</a></li>
    <li><a href="https://leafletjs.com/reference-2.0.0.html">Leaflet API Reference</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API">MDN — Geolocation API</a></li>
    <li><a href="https://www.openstreetmap.org/">OpenStreetMap</a></li>
    <li><a href="https://carto.com/">CartoDB</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills container width and height; set via parent CSS.</li>
    <li>Touch gestures for pan and zoom on mobile.</li>
    <li>Responsive tile loading.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>center</code> — initial map center [lat, lng].</li>
    <li><code>zoom</code> — initial zoom level.</li>
    <li><code>tileUrl</code> — custom tile provider URL.</li>
    <li><code>attribution</code> — custom attribution text.</li>
    <li><code>zoomControl</code> / <code>attributionControl</code> — show/hide controls.</li>
    <li><code>useSimpleCRS</code> — pixel-based coordinates for custom images.</li>
    <li><code>customImage</code> / <code>imageWidth</code> / <code>imageHeight</code> — custom image map.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Map</h3>
  <ExampleTabs code={`<Map center={[-25.2637, -57.5759]} zoom={13} />`}>
    <div class="h-96 w-full rounded-lg border border-border" data-testid="map-basic">
      <MapComponent center={[-25.2637, -57.5759]} zoom={13} />
    </div>
  </ExampleTabs>

  <h3>Custom Tile Layer</h3>
  <ExampleTabs code={`<Map
  center={[-25.2637, -57.5759]}
  zoom={13}
  tileUrl="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
  attribution="© OpenStreetMap contributors © CARTO"
/>`}>
    <div class="h-96 w-full rounded-lg border border-border" data-testid="map-tile-layer">
      <MapComponent
        center={[-25.2637, -57.5759]}
        zoom={13}
        tileUrl={'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'}
        attribution="© OpenStreetMap contributors © CARTO"
      />
    </div>
  </ExampleTabs>

  <h3>Without Controls</h3>
  <ExampleTabs code={`<Map
  center={[-25.2637, -57.5759]}
  zoom={13}
  zoomControl={false}
  attributionControl={false}
/>`}>
    <div class="h-96 w-full rounded-lg border border-border" data-testid="map-no-controls">
      <MapComponent center={[-25.2637, -57.5759]} zoom={13} zoomControl={false} attributionControl={false} />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={MapComponentModule} />

  <h2>Events</h2>
  <EventsTable component={MapComponentModule} />

  <h2>Tile Layer Providers</h2>
  <ul>
    <li><strong>OpenStreetMap</strong>: <code>https://&#123;s&#125;.tile.openstreetmap.org/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code></li>
    <li><strong>CartoDB Light</strong>: <code>https://cartodb-basemaps-&#123;s&#125;.global.ssl.fastly.net/light_all/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code></li>
    <li><strong>CartoDB Dark</strong>: <code>https://cartodb-basemaps-&#123;s&#125;.global.ssl.fastly.net/dark_all/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code></li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Arrow keys to pan the map.</li>
    <li><kbd>+</kbd> / <kbd>-</kbd> to zoom in and out.</li>
    <li>Click on the map to interact with markers and popups.</li>
    <li>Leaflet provides built-in keyboard navigation and screen reader support.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow keys</kbd></td><td>Pan the map</td></tr>
      <tr><td><kbd>+</kbd> / <kbd>-</kbd></td><td>Zoom in / out</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to controls and markers</td></tr>
    </tbody>
  </table>
</Container>
