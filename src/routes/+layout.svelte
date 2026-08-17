<script lang="ts">
import "../app.css"
import "../lib/twintrinsic.css"

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
