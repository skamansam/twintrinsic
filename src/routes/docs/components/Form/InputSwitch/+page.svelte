<!--
@component
InputSwitch is a backward-compatibility alias for Switch.
Redirect users to the Switch documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"

onMount(() => {
  goto("/docs/components/Form/Switch", { replaceState: true })
})
</script>

<h1>InputSwitch</h1>
<p>InputSwitch is an alias for <a href="/docs/components/Form/Switch">Switch</a>. Redirecting…</p>
