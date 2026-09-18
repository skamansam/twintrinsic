<!--
@component
LazyPanel is documented with the Lazy component family.
Redirect users to the LazyPanel documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"

onMount(() => {
  goto("/docs/components/Lazy/LazyPanel", { replaceState: true })
})
</script>

<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("LazyPanel")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />

  <h1>{m.panellazy_heading()}</h1>

</div>
<p>{m.panellazy_lede_1()}<a href="/docs/components/Lazy/LazyPanel">{m.panellazy_link()}</a>{m.panellazy_lede_2()}</p>
