<!--
Test helper: hosts a Form with a dynamic field component. Svelte 5
children are snippets, so tests cannot write `<Form><Child/></Form>`
markup directly — this wrapper renders the given `field` component
inside the form (with `fieldProps`) plus a submit button, forwarding
the Form's submit/error callbacks.
-->
<script lang="ts">
	import Form from "$lib/components/Form/Form.svelte"
	import type { Component } from "svelte"

	let {
		field: Field,
		fieldProps = {},
		formProps = {},
		onsubmit,
		onerror,
	}: {
		// biome-ignore lint/suspicious/noExplicitAny: test harness accepts any field component
		field: Component<any>
		fieldProps?: Record<string, unknown>
		formProps?: Record<string, unknown>
		onsubmit?: (event: CustomEvent<{ data: Record<string, unknown> }>) => void
		onerror?: (event: CustomEvent<{ errors: Record<string, string> }>) => void
	} = $props()
</script>

<Form {...formProps} {onsubmit} {onerror}>
	{#snippet children()}
		<Field {...fieldProps} />
		<button type="submit">Submit</button>
	{/snippet}
</Form>
