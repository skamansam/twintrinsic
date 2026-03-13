<script lang="ts">
import "../app.css"
import "../lib/twintrinsic.css"

const { children } = $props()
</script>

<div class="min-h-screen bg-background text-text">
  {@render children()}
</div>
