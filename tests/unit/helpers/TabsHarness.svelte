<!--
Test helper: composes Tabs/TabList/Tab/TabPanel for sub-component unit
tests. Svelte 5 children are snippets, so tests cannot write the tabs
markup directly — this wrapper renders three tabs and three panels with
identifiable content (the third tab is disabled).
-->
<script lang="ts">
	import Tabs from "$lib/components/Tabs/Tabs.svelte"
	import TabList from "$lib/components/Tabs/TabList.svelte"
	import Tab from "$lib/components/Tabs/Tab.svelte"
	import TabPanel from "$lib/components/Tabs/TabPanel.svelte"

	let {
		onchange,
		defaultIndex = 0,
		disabled = false,
		lazyPanels = false,
	}: {
		onchange?: (event: CustomEvent) => void
		defaultIndex?: number
		disabled?: boolean
		lazyPanels?: boolean
	} = $props()
</script>

<Tabs {onchange} {defaultIndex} {disabled}>
	{#snippet children()}
		<TabList>
			<Tab>First</Tab>
			<Tab>Second</Tab>
			<Tab disabled>Disabled</Tab>
		</TabList>
		<TabPanel lazy={lazyPanels}>First panel content</TabPanel>
		<TabPanel lazy={lazyPanels}>Second panel content</TabPanel>
		<TabPanel lazy={lazyPanels}>Third panel content</TabPanel>
	{/snippet}
</Tabs>
