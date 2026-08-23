<!--
@component
TabList documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Tab from "$lib/components/Tabs/Tab.svelte"
import TabList from "$lib/components/Tabs/TabList.svelte"
import TabPanel from "$lib/components/Tabs/TabPanel.svelte"
import Tabs from "$lib/components/Tabs/Tabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>TabList</h1>

<p>
  <strong>TabList</strong> is a sub-component of Tabs that contains Tab elements.
  Renders with <code>role="tablist"</code> and handles keyboard navigation
  between its child Tabs.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A container for Tab elements that provides the <code>role="tablist"</code>
  landmark. Arrow keys navigate between Tabs within the TabList.
</p>

<h3>When should I use it?</h3>
<p>
  Always inside <code>&lt;Tabs&gt;</code>, wrapping the Tab elements. Do not
  use standalone.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Semantics</strong> — <code>role="tablist"</code> groups tabs for screen readers.</li>
  <li><strong>Keyboard</strong> — arrow key navigation is handled at the TabList level.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanel>Panel 1</TabPanel>
  <TabPanel>Panel 2</TabPanel>
  <TabPanel>Panel 3</TabPanel>
</Tabs>`}>
  <div class="p-4 bg-surface rounded-md">
    <Tabs><TabList><Tab>Tab 1</Tab><Tab>Tab 2</Tab><Tab>Tab 3</Tab></TabList><TabPanel>Panel 1</TabPanel><TabPanel>Panel 2</TabPanel><TabPanel>Panel 3</TabPanel></Tabs>
  </div>
</ExampleTabs>

<h2>Accessibility</h2>
<ul>
  <li><code>role="tablist"</code> groups the tabs semantically.</li>
  <li>Arrow keys navigate between tabs.</li>
  <li><code>aria-label</code> or <code>aria-labelledby</code> for the tab list.</li>
</ul>
</Container>
