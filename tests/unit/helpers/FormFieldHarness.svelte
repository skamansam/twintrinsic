<!--
Test helper: renders a FormField with a dynamic field component.
Svelte 5 children are snippets, so tests cannot write
`<FormField><Child/></FormField>` markup directly — this wrapper
renders the given `field` inside the field's control slot.
-->
<script lang="ts">
	import FormField from "$lib/components/Form/FormField.svelte"
	import type { Component } from "svelte"

	let {
		field: Field,
		fieldProps = {},
		fieldFormProps = {},
	}: {
		// biome-ignore lint/suspicious/noExplicitAny: test harness accepts any field component
		field: Component<any>
		fieldProps?: Record<string, unknown>
		fieldFormProps?: Record<string, unknown>
	} = $props()
</script>

<FormField {...fieldFormProps}>
	<Field {...fieldProps} />
</FormField>
