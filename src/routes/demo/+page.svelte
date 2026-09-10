<script lang="ts">
  import LocaleSwitcher from "$lib/components/LocaleSwitcher/LocaleSwitcher.svelte"
  import { m } from "$lib/paraglide/messages.js"
  import { getTextDirection } from "$lib/paraglide/runtime.js"

  // Flip the document direction to match the active locale (RTL for Persian)
  $effect(() => {
    document.documentElement.dir = getTextDirection()
  })
</script>

<svelte:head>
  <title>{m.demo_title()}</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-16" data-testid="demo-home">
  <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
    <h1 class="text-3xl font-semibold text-text">{m.demo_heading()}</h1>
    <LocaleSwitcher data-testid="demo-home-switcher" />
  </div>

  <p class="mb-8 text-muted">{m.demo_tagline()}</p>

  <ul class="space-y-2">
    <li>
      <a
        href="/demo/paraglide"
        class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
      >
        {m.demo_paraglide_link()}
      </a>
    </li>
  </ul>
</div>