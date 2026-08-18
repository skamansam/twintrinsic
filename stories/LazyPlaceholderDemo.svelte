<script lang="ts">
  import Lazy from "$lib/components/Lazy/Lazy.svelte"
</script>

<Lazy>
  {#snippet placeholder()}
    <div class="p-4 text-muted">Loading chart…</div>
  {/snippet}
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Live analytics widget</h3>
    <p class="mt-1 text-sm text-muted">Deferred until visible to keep the page fast.</p>
  </div>
</Lazy>
