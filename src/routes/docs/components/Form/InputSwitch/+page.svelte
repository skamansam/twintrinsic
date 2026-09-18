<!--
@component
InputSwitch is a backward-compatibility alias for Switch.
Redirect users to the Switch documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"

onMount(() => {
  goto("/docs/components/Form/Switch", { replaceState: true })
})
</script>

<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("InputSwitch")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />

  <h1>{m.inputswitch_heading()}</h1>

</div>
<p>{m.inputswitch_lede_1()}<a href="/docs/components/Form/Switch">{m.inputswitch_link()}</a>{m.inputswitch_lede_2()}</p>
