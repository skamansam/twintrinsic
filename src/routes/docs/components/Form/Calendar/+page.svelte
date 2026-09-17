<!--
@component
Redirect stub — Calendar has been renamed to CalendarInput (plan item 11.1).
This page follows the 1.8 convention: renamed/sub-component pages redirect
to their canonical location.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"

onMount(() => {
  goto("/docs/components/Form/CalendarInput", { replaceState: true })
})
</script>

<h1>{m.calendar_heading()}</h1>
<p>{m.calendar_redirect_1()}<code>CalendarInput</code>{m.calendar_redirect_2()}<a href="/docs/components/Form/CalendarInput"><code>CalendarInput</code></a>{m.calendar_redirect_3()}</p>
