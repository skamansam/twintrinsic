<script lang="ts">
import "../app.css"
import "../lib/twintrinsic.css"

const { children } = $props()
</script>

<!-- Skip to main content link for accessibility -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
>
  Skip to main content
</a>

<div class="min-h-screen bg-background text-text">
  {@render children()}
</div>
