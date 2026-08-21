<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Select from "$lib/components/Form/Select.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import Icon from "$lib/components/Icon/Icon.svelte"
import { iconConfig, setIconset } from "$lib/stores/iconManager.js"

setIconset('tabler')

const predefinedIconsets = [
  { value: 'ic', label: 'Google Material Icons (ic)' },
  { value: 'mdi', label: 'Material Design Icons (mdi)' },
  { value: 'carbon', label: 'Carbon' },
  { value: 'ion', label: 'Ion' },
  { value: 'ep', label: 'Element Plus (ep)' },
  { value: 'bi', label: 'Bootstrap (bi)' },
  { value: 'tabler', label: 'Tabler' },
  { value: 'solar', label: 'Solar' },
  { value: 'flowbite', label: 'Flowbite' },
  { value: 'meteor', label: 'Meteor' },
  { value: 'streamline', label: 'Streamline Color' },
  { value: 'streamline-cyber-color', label: 'Cyber Color (streamline-cyber-color)' },
]

let selectedIconset = $state('tabler')
let customIconset = $state('')
let currentIconset = $state('tabler')

$effect(() => {
  const unsubscribe = iconConfig.subscribe(config => {
    currentIconset = config.defaultIconset
  })
  return unsubscribe
})

function handleIconsetChange(e: CustomEvent<{ value: string | string[] | undefined }>) {
  selectedIconset = String(e.detail.value ?? '')
  customIconset = ''
  console.log('Setting iconset to:', selectedIconset)
  setIconset(selectedIconset)
}

function handleCustomIconset() {
  if (customIconset.trim()) {
    console.log('Setting custom iconset to:', customIconset.trim())
    setIconset(customIconset.trim())
  }
}

import * as IconModule from "$lib/components/Icon/Icon.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>
<!--
@component
Icon documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Icon</h1>
  
  <p>
    The Icon component is a wrapper around the Iconify SVG icon library that integrates with Twintrinsic's global icon management system. It allows you to use over 275,000 icons from 200+ icon sets with a single default iconset configuration.
  </p>

  <div class="border border-border rounded-md p-6 mb-6 bg-surface dark:bg-surface-dark" data-testid="icon-iconset-changer">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold">Change Global Iconset</h3>
      <div class="text-sm">
        <span class="text-muted">Current: </span>
        <span class="font-mono font-semibold text-primary-600 dark:text-primary-400">{currentIconset}</span>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div>
        <Select 
          label="Select Predefined Iconset"
          options={predefinedIconsets}
          onchange={handleIconsetChange}
          placeholder="Choose an iconset..."
        />
      </div>
      <div>
        <div class="text-sm font-medium mb-2">Or Enter Custom Iconset:</div>
        <div class="flex gap-2">
          <input 
            bind:value={customIconset}
            placeholder="e.g., fa, heroicons, mdi-light"
            class="flex-1 max-w-xs px-3 py-2 border border-border rounded"
          />
          <button 
            onclick={handleCustomIconset}
            class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-border">
        <div class="text-sm font-medium mb-3">Preview with current iconset: (not all iconsets have the same icon names)</div>
        <div class="flex gap-4 items-center flex-wrap text-3xl">
          <div class="flex flex-col items-center gap-2">
            <Icon name="home" />
            <span class="text-xs text-muted">home</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="star" />
            <span class="text-xs text-muted">star</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="heart" />
            <span class="text-xs text-muted">heart</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="settings" />
            <span class="text-xs text-muted">settings</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="search" />
            <span class="text-xs text-muted">search</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Setup</h2>
  <p>
    First, set the default iconset in your app root or layout:
  </p>

  <CodeBlock language="svelte">{`\u003Cscript>
  import { setIconset } from 'twintrinsic'
  
  // Set globally once - all Icon components will use this
  setIconset('mdi-light')
\u003C/script>`}</CodeBlock>

  <h2>Basic Usage</h2>
  <p>
    Once the default iconset is set, use Icon with just the icon name:
  </p>

  <CodeBlock language="svelte">{`\u003Cscript>
  import { Icon } from 'twintrinsic'
\u003C/script>

<!-- Uses default iconset (mdi-light) -->
<Icon name="home" />
<Icon name="settings" />
<Icon name="star" />`}</CodeBlock>

  <div class="border border-border rounded-md p-6 mb-6 bg-surface dark:bg-surface-dark" data-testid="icon-basic">
    <h3 class="text-sm font-semibold mb-4">Demo: Basic Icons</h3>
    <div class="flex gap-4 items-center text-2xl">
      <Icon name="home" />
      <Icon name="settings" />
      <Icon name="star" />
    </div>
  </div>

  <h2>Overriding the Iconset</h2>
  <p>
    Override the default iconset for specific icons:
  </p>

  <CodeBlock language="svelte">{`<!-- Uses default iconset -->
<Icon name="home" />

<!-- Override to use a different iconset -->
<Icon name="star" iconset="fa" />
<Icon name="heart" iconset="heroicons" />`}</CodeBlock>

  <div class="border border-border rounded-md p-6 mb-6 bg-surface dark:bg-surface-dark" data-testid="icon-different-iconsets">
    <h3 class="text-sm font-semibold mb-4">Demo: Different Iconsets</h3>
    <div class="flex gap-6 items-center flex-wrap text-2xl">
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
  </div>

  <h2>Styling Icons</h2>
  <p>
    Customize icon appearance with color, size, and CSS classes:
  </p>

  <CodeBlock language="svelte">{`<!-- With color -->
<Icon name="home" color="red" />

<!-- With size -->
<Icon name="settings" width="32px" height="32px" />

<!-- With CSS classes -->
<Icon name="star" class="text-yellow-500" />

<!-- Combined -->
<Icon 
  name="heart" 
  color="pink" 
  width="24px"
  class="hover:scale-110 transition-transform"
/>`}</CodeBlock>

  <div class="border border-border rounded-md p-6 mb-6 bg-surface dark:bg-surface-dark" data-testid="icon-styled">
    <h3 class="text-sm font-semibold mb-4">Demo: Styled Icons</h3>
    <div class="flex gap-6 items-center flex-wrap">
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
  </div>

  <h2>Icon Transformations</h2>
  <p>
    Apply transformations to icons:
  </p>

  <CodeBlock language="svelte">{`<!-- Rotate icon -->
<Icon name="arrow-right" rotate={1} />

<!-- Flip icon -->
<Icon name="arrow-left" hFlip={true} />
<Icon name="arrow-up" vFlip={true} />`}</CodeBlock>

  <div class="border border-border rounded-md p-6 mb-6 bg-surface dark:bg-surface-dark" data-testid="icon-transformations">
    <h3 class="text-sm font-semibold mb-4">Demo: Transformations</h3>
    <div class="flex gap-6 items-center flex-wrap text-2xl">
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
        <Icon name="arrow-right" rotate={3} width="32px" height="32px" />
        <span class="text-xs text-muted">Rotate 270°</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" hFlip={true} width="32px" height="32px" />
        <span class="text-xs text-muted">H-Flip</span>
      </div>
    </div>
  </div>

  <h2>Available Iconsets</h2>
  <p>
    Popular iconsets include:
  </p>
  <ul>
    <li><strong>mdi</strong> - Material Design Icons (4000+ icons)</li>
    <li><strong>mdi-light</strong> - Material Design Light Icons</li>
    <li><strong>fa</strong> - Font Awesome (1500+ icons)</li>
    <li><strong>heroicons</strong> - Heroicons (292 icons)</li>
    <li><strong>tabler</strong> - Tabler Icons (4000+ icons)</li>
    <li><strong>feather</strong> - Feather Icons (286 icons)</li>
    <li><strong>bi</strong> - Bootstrap Icons (2000+ icons)</li>
  </ul>
  <p>
    Browse all available iconsets at <a href="https://icon-sets.iconify.design/" target="_blank">icon-sets.iconify.design</a>
  </p>

  <h2>Props</h2>
<PropsTable component={IconModule} />

  <h2>Global Icon Configuration</h2>
  <p>
    Manage the global icon configuration with these functions:
  </p>

  <CodeBlock language="typescript">{`import { 
  setIconset, 
  setIconColor, 
  setIconSize,
  updateIconConfig 
} from 'twintrinsic'

// Set default iconset
setIconset('mdi-light')

// Set default color for all icons
setIconColor('currentColor')

// Set default size for all icons
setIconSize('24px')

// Update multiple settings at once
updateIconConfig({
  defaultIconset: 'heroicons',
  color: 'blue',
  size: '20px'
})`}</CodeBlock>

  <h2>Best Practices</h2>
  <ul>
    <li>Set the default iconset once in your app root or layout</li>
    <li>Use icon names without the iconset prefix (e.g., "home" not "mdi-light:home")</li>
    <li>Use CSS classes for styling when possible (e.g., <code>class="text-red-500"</code>)</li>
    <li>Override iconset only when necessary for specific icons</li>
    <li>Use <code>width</code> and <code>height</code> to control icon size, or set font-size via CSS</li>
    <li>Provide meaningful icon names in your components for accessibility</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Icons are rendered as SVG elements with proper semantic structure</li>
    <li>Use descriptive icon names that indicate their purpose</li>
    <li>Provide context through surrounding text or ARIA labels when icons are used alone</li>
    <li>Ensure sufficient color contrast for icon visibility</li>
  </ul>

  <h2>Performance</h2>
  <ul>
    <li>Icons are loaded on-demand from the Iconify CDN</li>
    <li>Loaded icons are cached in the browser</li>
    <li>Use the <code>onLoad</code> callback to handle loading states if needed</li>
    <li>Consider using a limited set of iconsets to reduce network requests</li>
  </ul>

  <h2>Preloading Icons</h2>
  <p>
    Because icon data is fetched the first time a name is rendered, icons that appear
    later in the page (behind a menu, tab, or accordion) can briefly pop in once their
    data arrives. Call <code>preloadIcons()</code> once during app initialization —
    right next to <code>loadPlatformPolyfills()</code> in your root layout — to kick
    off those requests early so <code>Icon</code> can render from cache by the time
    each one mounts.
  </p>

  <CodeBlock language="svelte">{`\u003Cscript>
  import { preloadIcons, DEFAULT_PRELOAD_ICONS } from 'twintrinsic'

  // Preload the icons Twintrinsic's own components use internally...
  preloadIcons()

  // ...and/or your own app's icon names, in the same "iconset:name" or
  // bare-name form accepted by <Icon name="...">.
  preloadIcons([...DEFAULT_PRELOAD_ICONS, 'shopping-cart', 'heart', 'tabler:bell'])
\u003C/script>`}</CodeBlock>

  <p>
    <code>DEFAULT_PRELOAD_ICONS</code> is generated by scanning every Twintrinsic
    component for the icon names it renders itself — literal <code>&lt;Icon name="..."&gt;</code>
    usages and default values of icon-shaped props (e.g. <code>Rating</code>'s default
    star icons). It can't see icon names that only exist in your own data (e.g. a
    <code>menu</code>/<code>items</code> array you pass to <code>TreeMenu</code> or
    <code>Sidebar</code>), so list those explicitly:
  </p>

  <CodeBlock language="typescript">{`import { preloadIcons } from 'twintrinsic'

// Icons referenced by your own menu/nav data, not by Twintrinsic itself
preloadIcons(['dashboard', 'reports', 'billing', 'team'])`}</CodeBlock>

  <p>
    If you're maintaining a fork of Twintrinsic itself, regenerate
    <code>DEFAULT_PRELOAD_ICONS</code> after adding or changing an icon used inside
    <code>src/lib/components</code>:
  </p>

  <CodeBlock language="bash">{`pnpm run generate:icons`}</CodeBlock>
</Container>
