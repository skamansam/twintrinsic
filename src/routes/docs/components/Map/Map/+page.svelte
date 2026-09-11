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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.map_heading()}</h1>

  <p>
    <strong>{m.map_heading()}</strong>{m.map_intro_1()}<a href="https://leafletjs.com/" target="_blank">Leaflet</a>{m.map_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.map_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.map_when_1()}<code>&lt;Map&gt;</code>{m.map_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.map_why_leaflet()}</strong>{m.map_why_leaflet_desc()}</li>
    <li><strong>{m.map_why_crs()}</strong>{m.map_why_crs_desc()}</li>
    <li><strong>{m.map_why_events()}</strong>{m.map_why_events_desc()}</li>
    <li><strong>{m.map_why_tiles()}</strong>{m.map_why_tiles_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://leafletjs.com/">Leaflet</a></li>
    <li><a href="https://leafletjs.com/reference-2.0.0.html">Leaflet API Reference</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API">MDN — Geolocation API</a></li>
    <li><a href="https://www.openstreetmap.org/">OpenStreetMap</a></li>
    <li><a href="https://carto.com/">CartoDB</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.map_impl_1()}</li>
  <li>{m.map_impl_2()}</li>
  <li>{m.map_impl_3()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.map_mistake_1_0()}<code>&lt;map&gt;</code>{m.map_mistake_1_1()}<code>&lt;area&gt;</code>{m.map_mistake_1_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.map_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.map_responsive_1()}</li>
    <li>{m.map_responsive_2()}</li>
    <li>{m.map_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>center</code>{m.map_custom_1_1()}</li>
    <li><code>zoom</code>{m.map_custom_2_1()}</li>
    <li><code>tileUrl</code>{m.map_custom_3_1()}</li>
    <li><code>attribution</code>{m.map_custom_4_1()}</li>
    <li><code>zoomControl</code>{m.map_custom_5_1()}<code>attributionControl</code>{m.map_custom_5_2()}</li>
    <li><code>useSimpleCRS</code>{m.map_custom_6_1()}</li>
    <li><code>customImage</code>{m.map_custom_7_1()}<code>imageWidth</code>{m.map_custom_7_2()}<code>imageHeight</code>{m.map_custom_7_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.map_ex_basic()}</h3>
  <ExampleTabs code={`<Map center={[-25.2637, -57.5759]} zoom={13} />`}>
    <div class="h-96 w-full rounded-lg border border-border" data-testid="map-basic">
      <MapComponent center={[-25.2637, -57.5759]} zoom={13} />
    </div>
  </ExampleTabs>

  <h3>{m.map_ex_tiles()}</h3>
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

  <h3>{m.map_ex_nocontrols()}</h3>
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

  <h3>{m.map_ex_markers()}</h3>
  <p>{m.map_markers_note_1()}<code>markers</code>{m.map_markers_note_2()}</p>
  <ExampleTabs code={`<Map
  center={[51.505, -0.09]}
  zoom={12}
  markers={[
    { id: 1, lat: 51.505, lng: -0.09, tooltip: 'London Eye', iconName: 'mdi ferris-wheel', color: '#3b82f6' },
    { id: 2, lat: 51.51, lng: -0.127, tooltip: 'Buckingham Palace', iconName: 'mdi castle', color: '#ef4444' },
  ]}
/>`}>
    <div class="h-96 w-full rounded-lg border border-border" data-testid="map-markers">
      <MapComponent
        center={[51.505, -0.09]}
        zoom={12}
        markers={[
          { id: 1, lat: 51.505, lng: -0.09, tooltip: 'London Eye', iconName: 'mdi:ferris-wheel', color: '#3b82f6' },
          { id: 2, lat: 51.51, lng: -0.127, tooltip: 'Buckingham Palace', iconName: 'mdi:castle', color: '#ef4444' },
          { id: 3, lat: 51.5074, lng: -0.1278, tooltip: 'Tower Bridge', iconName: 'mdi:bridge', color: '#10b981' },
        ]}
      />
    </div>
  </ExampleTabs>

  <h3>{m.map_ex_popups()}</h3>
  <p>{m.map_popups_note_1()}<code>popupContent</code>{m.map_popups_note_2()}</p>
  <ExampleTabs code={`<Map
  center={[51.505, -0.09]}
  zoom={13}
  markers={[
    { id: 1, lat: 51.505, lng: -0.09, tooltip: 'London Eye' },
  ]}
  popupContent={(marker) => '<b>' + marker.tooltip + '</b>'}
/>`}>
    <div class="h-96 w-full rounded-lg border border-border" data-testid="map-popups">
      <MapComponent
        center={[51.505, -0.09]}
        zoom={13}
        markers={[
          { id: 1, lat: 51.505, lng: -0.09, tooltip: 'London Eye' },
        ]}
        popupContent={(marker) => `<div class="p-2"><b>${marker.tooltip}</b><br/><span class="text-sm text-muted">Click to interact</span></div>`}
      />
    </div>
  </ExampleTabs>

  <h3>{m.map_ex_image()}</h3>
  <p>{m.map_image_note_1()}<code>customImage</code>{m.map_image_note_2()}<code>useSimpleCRS</code>{m.map_image_note_3()}</p>
  <ExampleTabs code={`<Map
  customImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Sample_Of_Map.jpg/800px-Sample_Of_Map.jpg"
  imageWidth={800}
  imageHeight={560}
  center={[280, 400]}
  zoom={0}
  maxZoom={4}
  markers={[
    { id: 1, lat: 200, lng: 300, tooltip: 'Point of Interest' },
  ]}
/>`}>
    <div class="h-96 w-full rounded-lg border border-border" data-testid="map-image">
      <MapComponent
        customImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Sample_Of_Map.jpg/800px-Sample_Of_Map.jpg"
        imageWidth={800}
        imageHeight={560}
        center={[280, 400]}
        zoom={0}
        maxZoom={4}
        markers={[
          { id: 1, lat: 200, lng: 300, tooltip: 'Point of Interest' },
          { id: 2, lat: 400, lng: 500, tooltip: 'Another Location' },
        ]}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={MapComponentModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={MapComponentModule} />

  <h2>{m.map_tiles_heading()}</h2>
  <ul>
    <li><strong>OpenStreetMap</strong>: <code>https://&#123;s&#125;.tile.openstreetmap.org/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code></li>
    <li><strong>CartoDB Light</strong>: <code>https://cartodb-basemaps-&#123;s&#125;.global.ssl.fastly.net/light_all/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code></li>
    <li><strong>CartoDB Dark</strong>: <code>https://cartodb-basemaps-&#123;s&#125;.global.ssl.fastly.net/dark_all/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code></li>
  </ul>

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.map_a11y_1()}</li>
    <li><kbd>+</kbd>{m.map_a11y_2_1()}<kbd>-</kbd>{m.map_a11y_2_2()}</li>
    <li>{m.map_a11y_3()}</li>
    <li>{m.map_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow keys</kbd></td><td>{m.map_kb_1()}</td></tr>
      <tr><td><kbd>+</kbd> / <kbd>-</kbd></td><td>{m.map_kb_2()}</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>{m.map_kb_3()}</td></tr>
    </tbody>
  </table>
</Container>
