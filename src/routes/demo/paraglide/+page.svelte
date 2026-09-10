<script lang="ts">
  import { m } from "$lib/paraglide/messages.js"
  import { getTextDirection } from "$lib/paraglide/runtime.js"
  import DemoBadge from "../DemoBadge.svelte"
  import LocaleSwitcher from "../LocaleSwitcher.svelte"

  /** Count used by the pluralization demo */
  let count = $state(1)

  // Flip the document direction to match the active locale (RTL for Persian)
  $effect(() => {
    document.documentElement.dir = getTextDirection()
  })
</script>

<svelte:head>
  <title>{m.pg_heading()}</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-16" data-testid="demo-paraglide">
  <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
    <h1 class="text-3xl font-semibold text-text">{m.pg_heading()}</h1>
    <LocaleSwitcher data-testid="pg-switcher" />
  </div>

  <p class="mb-10 text-muted">{m.pg_intro({ framework: "Paraglide-JS" })}</p>

  <!-- Pluralization -->
  <h2 class="mb-2 text-xl font-medium text-text">Pluralization</h2>
  <p class="mb-3 text-muted" data-testid="pg-plural">{m.pg_selected({ count })}</p>
  <div class="flex items-center gap-3">
    <button
      type="button"
      aria-label="Decrease"
      data-testid="pg-decrease"
      onclick={() => {
        count = Math.max(0, count - 1)
      }}
      class="h-9 w-9 rounded-md border border-border bg-surface text-lg text-text transition-colors hover:bg-hover"
    >
      −
    </button>
    <span class="min-w-8 text-center text-lg font-semibold tabular-nums text-text" data-testid="pg-count">{count}</span>
    <button
      type="button"
      aria-label="Increase"
      data-testid="pg-increase"
      onclick={() => {
        count = count + 1
      }}
      class="h-9 w-9 rounded-md border border-border bg-surface text-lg text-text transition-colors hover:bg-hover"
    >
      +
    </button>
  </div>

  <!-- Messages inside components -->
  <h2 class="mb-2 mt-12 text-xl font-medium text-text">Messages in components</h2>
  <p class="mb-3 text-muted">{m.pg_component_note()}</p>
  <DemoBadge data-testid="pg-badge" color="success" />
</div>