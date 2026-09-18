<!--
@component
TimelineItem is documented as part of the Timeline component.
Redirect users to the parent Timeline documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"

onMount(() => {
  goto("/docs/components/Timeline/Timeline", { replaceState: true })
})
</script>

<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("TimelineItem")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />

  <h1>{m.timelineitem_heading()}</h1>

</div>

<p>{m.timelineitem_note_1()}<a href="/docs/components/Timeline/Timeline">Timeline component</a>{m.timelineitem_note_2()}</p>
