<!--
@component
Tab documentation page — redirects to parent Tabs component.
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Tab from "$lib/components/Tabs/Tab.svelte"
import TabList from "$lib/components/Tabs/TabList.svelte"
import TabPanel from "$lib/components/Tabs/TabPanel.svelte"
import Tabs from "$lib/components/Tabs/Tabs.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>Tab</strong> is a sub-component of
      <a href="/docs/components/Tabs/Tabs" class="underline font-medium">Tabs</a>.
      See the parent component docs for usage, examples, and full API reference.
    </p>
  </div>

  <h1>Tab</h1>

  <p>
    <strong>Tab</strong> represents a single tab within a Tabs component.
    It is used as a child of <code>&lt;Tabs&gt;</code> inside a <code>&lt;TabList&gt;</code>.
  </p>
</Container>
