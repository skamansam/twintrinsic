<script lang="ts">
import "../app.css"
import "../lib/twintrinsic.css"
import { loadPlatformPolyfills } from "../lib/polyfills.js"
import { preloadIcons } from "../lib/stores/iconPreload.js"
// Storybook-only demo themes (Brand, High Contrast, CVD + dark variants).
// Not shipped with the library — imported here so the docs site's Theme
// Preview page and theming docs can render the custom themes.
import "../../.storybook/themes.css"

const { children } = $props()

// Signal client-side hydration to e2e tests. `$effect` runs only in the
// browser and, because it lives in the root layout, only after the whole
// route tree (including child routes) has mounted. This gives Playwright
// a deterministic "the page is interactive" marker to wait on, avoiding
// the race where a first interaction fires before event handlers exist.
$effect(() => {
  document.documentElement.dataset.sveltekitHydrated = "true"
})

// Load the popover + anchor-positioning polyfills when the engine lacks
// native support (feature-detected, no-op in modern Chrome). Must run
// before components that use `popover` mount, so it's kicked off from the
// root layout as early as possible.
loadPlatformPolyfills()

// Kick off Iconify data fetches for the icons Twintrinsic's own components
// render, so `Icon` can draw from cache instead of a fresh network request
// the first time each icon appears (see the Icon docs' "Preloading Icons"
// section for how consumer apps should do the same with their own icons).
preloadIcons()
</script>

<div class="min-h-screen bg-background text-text">
  {@render children()}
</div>
