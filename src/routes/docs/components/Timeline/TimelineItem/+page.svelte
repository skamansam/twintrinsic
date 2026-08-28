<!--
@component
TimelineItem is documented as part of the Timeline component.
Redirect users to the parent Timeline documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"

onMount(() => {
  goto("/docs/components/Timeline/Timeline", { replaceState: true })
})
</script>

<h1>TimelineItem</h1>

<p>TimelineItem is documented within the <a href="/docs/components/Timeline/Timeline">Timeline component</a>. Redirecting…</p>
