<script lang="ts">
import "../app.css"
import "../lib/twintrinsic.css"
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
</script>

<div class="min-h-screen bg-background text-text">
  {@render children()}
</div>
