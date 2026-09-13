<!--
@component
Card is a legacy alias for the Panel component.
Redirect users to the Panel documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"

onMount(() => {
  goto("/docs/components/Panel/Panel", { replaceState: true })
})
</script>

<h1>{m.card_heading()}</h1>
<p>{m.card_lede_1()}<a href="/docs/components/Panel/Panel">{m.card_link()}</a>{m.card_lede_2()}</p>
