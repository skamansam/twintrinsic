<!--
@component
SelectGroup is a thin wrapper around native `<optgroup>`.
Redirect users to the Select component documentation.
-->
<script lang="ts">
import { onMount } from "svelte"
import { goto } from "$app/navigation"

onMount(() => {
  goto("/docs/components/Form/Select", { replaceState: true })
})
</script>

<h1>SelectGroup</h1>
<p>SelectGroup is a thin wrapper around native <code>&lt;optgroup&gt;</code>. See the <a href="/docs/components/Form/Select">Select component</a> for documentation. Redirecting…</p>
