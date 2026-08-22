<!--
@component
Tab documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Tab from "$lib/components/Tabs/Tab.svelte"
import TabList from "$lib/components/Tabs/TabList.svelte"
import TabPanel from "$lib/components/Tabs/TabPanel.svelte"
import Tabs from "$lib/components/Tabs/Tabs.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<h1>Tab</h1>

<p>
  <strong>Tab</strong> is a sub-component of Tabs — a clickable label that
  activates its associated TabPanel. Always used inside a TabList.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A single tab label inside a TabList. Renders with <code>role="tab"</code>,
  <code>aria-selected</code>, and <code>aria-controls</code> linking it to
  its corresponding TabPanel.
</p>

<h3>When should I use it?</h3>
<p>
  Always inside <code>&lt;TabList&gt;</code> within a <code>&lt;Tabs&gt;</code>
  component. Do not use standalone.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Semantics</strong> — <code>role="tab"</code> communicates purpose to screen readers.</li>
  <li><strong>Consistency</strong> — shared focus styling and keyboard behavior across all tabs.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Content: text, icons, or any Svelte content.</li>
  <li>Disabled via <code>disabled</code> prop.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Tabs>
  <TabList>
    <Tab>Overview</Tab>
    <Tab>Analytics</Tab>
    <Tab>Settings</Tab>
  </TabList>
  <TabPanel>Overview content</TabPanel>
  <TabPanel>Analytics content</TabPanel>
  <TabPanel>Settings content</TabPanel>
</Tabs>`}>
  <div class="p-4 bg-surface rounded-md">
    <Tabs><TabList><Tab>Overview</Tab><Tab>Analytics</Tab><Tab>Settings</Tab></TabList><TabPanel>Overview content</TabPanel><TabPanel>Analytics content</TabPanel><TabPanel>Settings content</TabPanel></Tabs>
  </div>
</ExampleTabs>

<h2>Accessibility</h2>
<ul>
  <li><code>role="tab"</code> with <code>aria-selected</code>.</li>
  <li><code>aria-controls</code> points to the associated TabPanel.</li>
  <li>Arrow keys navigate between tabs in the TabList.</li>
  <li>Disabled tabs are focusable but not activatable.</li>
</ul>
