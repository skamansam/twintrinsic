<!--
@component
SelectGroup is a thin wrapper around native `<optgroup>`.
Redirect users to the Select component documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"

onMount(() => {
  goto("/docs/components/Form/Select", { replaceState: true })
})
</script>

<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("SelectGroup")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />

  <h1>{m.selectgroup_heading()}</h1>

</div>
<p>{m.selectgroup_lede_1()}<code>&lt;optgroup&gt;</code>{m.selectgroup_lede_2()}<a href="/docs/components/Form/Select">{m.selectgroup_link()}</a>{m.selectgroup_lede_3()}</p>
