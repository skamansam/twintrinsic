<!--
@component
Card is a legacy alias for the Panel component.
Redirect users to the Panel documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"

onMount(() => {
  goto("/docs/components/Panel/Panel", { replaceState: true })
})
</script>

<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("Card")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />

  <h1>{m.card_heading()}</h1>

</div>
<p>{m.card_lede_1()}<a href="/docs/components/Panel/Panel">{m.card_link()}</a>{m.card_lede_2()}</p>
