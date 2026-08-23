<!--
@component
IconifyIcon documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Icon from "$lib/components/Icon/Icon.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as IconModule from "$lib/components/Icon/Icon.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>IconifyIcon</h1>

  <p>
    <strong>IconifyIcon</strong> is the Iconify-powered SVG icon component used internally
    by Twintrinsic's <code>&lt;Icon&gt;</code> component. It fetches icons on-demand from
    the Iconify CDN and supports 275,000+ icons from 200+ icon sets.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    The underlying Iconify integration that powers the <code>&lt;Icon&gt;</code> component.
    It handles CDN fetching, SVG rendering, caching, and global icon configuration. Most
    users should use <code>&lt;Icon&gt;</code> directly.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use the higher-level <code>&lt;Icon&gt;</code> component for most cases.
    <code>IconifyIcon</code> is exposed for advanced use cases where you need direct
    access to the Iconify integration layer.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Iconify CDN</strong> — on-demand loading from the Iconify API.</li>
    <li><strong>Browser caching</strong> — loaded icons are cached for subsequent renders.</li>
    <li><strong>Global config</strong> — shared iconset, color, and size settings.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://iconify.design/">Iconify</a></li>
    <li><a href="https://iconify.design/docs/api/">Iconify API</a></li>
    <li><a href="https://icon-sets.iconify.design/">Icon Sets Browser</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">MDN — SVG</a></li>
    <li><a href="https://primer.style/components/octicon">Primer — Octicon</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Icons scale via <code>width</code> and <code>height</code> props.</li>
    <li>Default size inherits from the parent's font-size.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>name</code> — icon name with optional iconset prefix.</li>
    <li><code>iconset</code> — override the default iconset.</li>
    <li><code>color</code> — set icon color.</li>
    <li><code>rotate</code> — rotate icon (0–3).</li>
    <li><code>hFlip</code> / <code>vFlip</code> — flip icon.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Icons</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="settings" />
<Icon name="star" />`}>
    <div class="flex gap-4 items-center text-2xl" data-testid="iconify-basic">
      <Icon name="home" />
      <Icon name="settings" />
      <Icon name="star" />
    </div>
  </ExampleTabs>

  <h3>Different Iconsets</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="star" iconset="fa" />
<Icon name="heart" iconset="heroicons" />
<Icon name="search" iconset="tabler" />`}>
    <div class="flex gap-6 items-center flex-wrap text-2xl" data-testid="iconify-iconsets">
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" width="32px" height="32px" />
        <span class="text-xs text-muted">Default (mdi)</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="star" iconset="fa" width="32px" height="32px" />
        <span class="text-xs text-muted">Font Awesome</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="heart" iconset="heroicons" width="32px" height="32px" />
        <span class="text-xs text-muted">Heroicons</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="search" iconset="tabler" width="32px" height="32px" />
        <span class="text-xs text-muted">Tabler</span>
      </div>
    </div>
  </ExampleTabs>

  <h2>Available Iconsets</h2>
  <ul>
    <li><strong>mdi</strong> — Material Design Icons (4000+ icons)</li>
    <li><strong>mdi-light</strong> — Material Design Light Icons</li>
    <li><strong>fa</strong> — Font Awesome (1500+ icons)</li>
    <li><strong>heroicons</strong> — Heroicons (292 icons)</li>
    <li><strong>tabler</strong> — Tabler Icons (4000+ icons)</li>
    <li><strong>feather</strong> — Feather Icons (286 icons)</li>
    <li><strong>bi</strong> — Bootstrap Icons (2000+ icons)</li>
  </ul>
  <p>
    Browse all iconsets at
    <a href="https://icon-sets.iconify.design/" target="_blank">icon-sets.iconify.design</a>.
  </p>

  <h2>Props</h2>
  <PropsTable component={IconModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Icons are rendered as SVG elements with proper semantic structure.</li>
    <li>Use descriptive icon names that indicate their purpose.</li>
    <li>Provide context through surrounding text or ARIA labels when icons are used alone.</li>
    <li>Ensure sufficient color contrast for icon visibility.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Icons are static display elements. Interactive elements containing icons
    maintain their native keyboard behavior.
  </p>
</Container>
