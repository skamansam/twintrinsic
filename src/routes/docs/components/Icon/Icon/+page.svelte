<!--
@component
Icon documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
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
  <h1>Icon</h1>

  <p>
    <strong>Icon</strong> is a wrapper around the Iconify SVG icon library that integrates
    with Twintrinsic's global icon management system. It provides access to over 275,000
    icons from 200+ icon sets with a single default iconset configuration.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    An SVG icon component powered by Iconify. Icons are loaded on-demand from the Iconify
    CDN and cached in the browser. The global <code>setIconset()</code> function sets the
    default icon set, and individual icons can override it.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Icon&gt;</code> whenever you need to display an icon in your UI:
    buttons, navigation, status indicators, or decorative elements. Use the Icon component
    instead of inline SVGs for consistency and lazy loading.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>275,000+ icons</strong> — access to every major icon set via Iconify.</li>
    <li><strong>On-demand loading</strong> — only fetches icons that are actually used.</li>
    <li><strong>Global config</strong> — set once, use everywhere.</li>
    <li><strong>Preloading</strong> — <code>preloadIcons()</code> for critical icons.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://iconify.design/">Iconify</a></li>
    <li><a href="https://icon-sets.iconify.design/">Icon Sets Browser</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
    <li><a href="https://primer.style/components/octicon">Primer — Octicon</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Icons scale via <code>width</code> and <code>height</code> props.</li>
    <li>Default size inherits from the font-size of the parent element.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>name</code> — icon name (with or without iconset prefix).</li>
    <li><code>iconset</code> — override the default iconset for specific icons.</li>
    <li><code>color</code> — set icon color.</li>
    <li><code>width</code> / <code>height</code> — control icon size.</li>
    <li><code>rotate</code> — rotate icon (0–3 for 0°–270°).</li>
    <li><code>hFlip</code> / <code>vFlip</code> — flip icon horizontally or vertically.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Icons</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="settings" />
<Icon name="star" />`}>
    <div class="flex gap-4 items-center text-2xl" data-testid="icon-basic">
      <Icon name="home" />
      <Icon name="settings" />
      <Icon name="star" />
    </div>
  </ExampleTabs>

  <h3>Different Iconsets</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="fa:home" />
<Icon name="heroicons:home" />
<Icon name="home" iconset="tabler" />`}>
    <div class="flex gap-6 items-center flex-wrap text-2xl" data-testid="icon-different-iconsets">
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" width="32px" height="32px" />
        <span class="text-xs text-muted">Default (tabler)</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="fa:home" width="32px" height="32px" />
        <span class="text-xs text-muted">Font Awesome</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="heroicons:home" width="32px" height="32px" />
        <span class="text-xs text-muted">Heroicons</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" iconset="tabler" width="32px" height="32px" />
        <span class="text-xs text-muted">Tabler</span>
      </div>
    </div>
  </ExampleTabs>

  <h3>Styled Icons</h3>
  <ExampleTabs code={`<Icon name="home" color="red" />
<Icon name="settings" color="blue" width="32px" height="32px" />
<Icon name="star" color="yellow-500" />
<Icon name="heart" color="pink" class="hover:scale-110 transition-transform" />`}>
    <div class="flex gap-6 items-center flex-wrap" data-testid="icon-styled">
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" color="red" width="32px" height="32px" />
        <span class="text-xs text-muted">Red</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="settings" color="blue" width="32px" height="32px" />
        <span class="text-xs text-muted">Blue</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="star" color="yellow-500" width="32px" height="32px" />
        <span class="text-xs text-muted">Yellow</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="heart" color="pink" width="32px" height="32px" />
        <span class="text-xs text-muted">Pink</span>
      </div>
    </div>
  </ExampleTabs>

  <h3>Transformations</h3>
  <ExampleTabs code={`<Icon name="arrow-right" />
<Icon name="arrow-right" rotate={1} />
<Icon name="arrow-right" rotate={2} />
<Icon name="arrow-right" hFlip={true} />`}>
    <div class="flex gap-6 items-center flex-wrap text-2xl" data-testid="icon-transformations">
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" width="32px" height="32px" />
        <span class="text-xs text-muted">Normal</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" rotate={1} width="32px" height="32px" />
        <span class="text-xs text-muted">Rotate 90°</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" rotate={2} width="32px" height="32px" />
        <span class="text-xs text-muted">Rotate 180°</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" hFlip={true} width="32px" height="32px" />
        <span class="text-xs text-muted">H-Flip</span>
      </div>
    </div>
  </ExampleTabs>

  <h2>Setup</h2>
  <p>Set the default iconset once in your app root or layout:</p>
  <CodeBlock language="svelte">{`\u003Cscript>
  import { setIconset } from 'twintrinsic'
  setIconset('mdi-light')
\u003C/script>`}</CodeBlock>

  <h2>Preloading Icons</h2>
  <p>
    Call <code>preloadIcons()</code> during app initialization to fetch icon data early
    so icons render from cache by the time they mount:
  </p>
  <CodeBlock language="svelte">{`\u003Cscript>
  import { preloadIcons, DEFAULT_PRELOAD_ICONS } from 'twintrinsic'
  preloadIcons()
  preloadIcons([...DEFAULT_PRELOAD_ICONS, 'shopping-cart', 'heart'])
\u003C/script>`}</CodeBlock>

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
    (buttons, links) maintain their native keyboard behavior.
  </p>
</Container>
