<!--
@component
SelectGroup is a thin wrapper around native `<optgroup>`.
Redirect users to the Select component documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { m } from "$lib/paraglide/messages.js"

onMount(() => {
  goto("/docs/components/Form/Select", { replaceState: true })
})
</script>

<h1>{m.selectgroup_heading()}</h1>
<p>{m.selectgroup_lede_1()}<code>&lt;optgroup&gt;</code>{m.selectgroup_lede_2()}<a href="/docs/components/Form/Select">{m.selectgroup_link()}</a>{m.selectgroup_lede_3()}</p>
