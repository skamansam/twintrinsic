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

import { iconConfig } from '$lib/stores/iconManager'

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

// Resolve the iconset: use provided override or fall back to default
let resolvedIconset = $derived(iconset || $iconConfig.defaultIconset)

// Build the full icon name with iconset prefix
let fullIconName = $derived(`${resolvedIconset}:${name}`)
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
  class={className}
  {onLoad}
/>
