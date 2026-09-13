<!--
@component
LazyPanel is documented with the Lazy component family.
Redirect users to the LazyPanel documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"

onMount(() => {
  goto("/docs/components/Lazy/LazyPanel", { replaceState: true })
})
</script>

<h1>{m.panellazy_heading()}</h1>
<p>{m.panellazy_lede_1()}<a href="/docs/components/Lazy/LazyPanel">{m.panellazy_link()}</a>{m.panellazy_lede_2()}</p>
