<!--
Test helper: renders a CodeBlock whose content comes from a snippet —
the way real pages use it. CodeBlock reads its code from the rendered
DOM (the `code` passed as a prop to render() is NOT a component prop;
it just spreads onto the root element), so highlighting can only be
exercised when actual children are provided.
-->
<script lang="ts">
	import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";

	let { code, language, ...rest }: { code: string; language?: string; [key: string]: unknown } = $props();
</script>

<CodeBlock {language} {...rest}>{code}</CodeBlock>
