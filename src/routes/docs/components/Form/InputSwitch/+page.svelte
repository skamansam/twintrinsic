<!--
@component
InputSwitch is a backward-compatibility alias for Switch.
Redirect users to the Switch documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"

onMount(() => {
  goto("/docs/components/Form/Switch", { replaceState: true })
})
</script>

<h1>{m.inputswitch_heading()}</h1>
<p>{m.inputswitch_lede_1()}<a href="/docs/components/Form/Switch">{m.inputswitch_link()}</a>{m.inputswitch_lede_2()}</p>
