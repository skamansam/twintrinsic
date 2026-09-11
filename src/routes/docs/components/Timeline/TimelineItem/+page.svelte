<!--
@component
TimelineItem is documented as part of the Timeline component.
Redirect users to the parent Timeline documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"

onMount(() => {
  goto("/docs/components/Timeline/Timeline", { replaceState: true })
})
</script>

<h1>{m.timelineitem_heading()}</h1>

<p>{m.timelineitem_note_1()}<a href="/docs/components/Timeline/Timeline">Timeline component</a>{m.timelineitem_note_2()}</p>
