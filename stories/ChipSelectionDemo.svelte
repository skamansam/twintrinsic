<script lang="ts">
  // Interactive wrapper for the Snippet Selection story. Holds the controlled
  // `selected` prop in real component state and exposes a button that swaps
  // it, so the story's play function can verify the `itemTemplate` third arg
  // updates reactively when the prop changes (a real browser environment —
  // jsdom + @testing-library cannot re-trigger `$effect`s via rerender/$set).
  import Chip from "$lib/components/Chip/Chip.svelte"
  import ChipGroup from "$lib/components/Chip/ChipGroup.svelte"

  let selected: string[] = $state(["React", "Vue"])
</script>

<div class="flex flex-col gap-4">
  <button
    type="button"
    class="rounded border border-muted px-3 py-1 text-sm"
    data-testid="toggle-selection"
    onclick={() => (selected = ["Svelte"])}
  >
    Toggle selection to Svelte
  </button>

  <ChipGroup items={["React", "Svelte", "Vue"]} selected={selected}>
    {#snippet itemTemplate(item, index, selected)}
      <Chip clickable selected={selected}>{item}</Chip>
    {/snippet}
  </ChipGroup>
</div>
