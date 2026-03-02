<!--
@component
Icon - A wrapper around @iconify/svelte that uses the global iconset configuration.

This component allows you to use Iconify icons with a globally configured default iconset.
Users can set the default iconset once and all Icon components will use it.

Usage:
```svelte
<script>
  import { setIconset } from 'twintrinsic'
  setIconset('mdi-light')
</script>

<!-- Uses default iconset (mdi-light) --\>
<Icon name="home" />

<!-- Override for specific icon --\>
<Icon name="star" iconset="fa" />

<!-- With custom styling --\>
<Icon name="settings" color="red" width="24px" />
```
-->
<script lang="ts">
import IconifyIcon from '@iconify/svelte'

import { iconConfig } from '../../stores/iconManager.js'

interface Props {
  /** Icon name without iconset prefix (e.g., "home", "star") */
  name: string
  /** Override the default iconset for this icon */
  iconset?: string
  /** Icon color (CSS color value) */
  color?: string
  /** Icon width */
  width?: string | number
  /** Icon height */
  height?: string | number
  /** Horizontal flip */
  hFlip?: boolean
  /** Vertical flip */
  vFlip?: boolean
  /** Rotation (0, 1, 2, 3 for 0°, 90°, 180°, 270°) */
  rotate?: number | string
  /** Additional CSS classes */
  class?: string
  /** Inline display mode */
  inline?: boolean
  /** Callback when icon is loaded */
  onLoad?: () => void
}

let {
  name,
  iconset,
  color,
  width,
  height,
  hFlip,
  vFlip,
  rotate,
  class: className = '',
  inline,
  onLoad,
}: Props = $props()

// Subscribe to the global iconset configuration
let currentConfig = $state(iconConfig)
$effect(() => {
  const unsubscribe = iconConfig.subscribe(config => {
    currentConfig = config
  })
  return unsubscribe
})

// Parse icon name to extract iconset if provided (e.g., "tabler:star-filled" -> iconset="tabler", name="star-filled")
let parsedName = $derived.by(() => {
  const parts = name.split(':')
  if (parts.length > 1) {
    return { iconset: parts[0], name: parts[1] }
  }
  return { iconset: null, name }
})

// Resolve the iconset: use parsed iconset, provided override, or fall back to default
let resolvedIconset = $derived(parsedName.iconset || iconset || currentConfig.defaultIconset)

// Build the full icon name with iconset prefix
let fullIconName = $derived(`${resolvedIconset}:${parsedName.name}`)
</script>

<IconifyIcon
  icon={fullIconName}
  {color}
  {width}
  {height}
  {hFlip}
  {vFlip}
  {rotate}
  {inline}
  class="_icon-{parsedName.name} _iconset-{resolvedIconset} {className}"
  {onLoad}
/>
