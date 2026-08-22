<!--
@component
TabPanel documentation page — standardized structure
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

<h1>TabPanel</h1>

<p>
  <strong>TabPanel</strong> is a sub-component of Tabs that contains the content
  for a single tab. Renders with <code>role="tabpanel"</code> and is shown/hidden
  based on the active Tab.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A content panel associated with a Tab. Only one TabPanel is visible at a time.
  Uses <code>role="tabpanel"</code> and <code>aria-labelledby</code> to link
  back to its Tab.
</p>

<h3>When should I use it?</h3>
<p>
  Always inside <code>&lt;Tabs&gt;</code>, after the TabList. Each TabPanel
  corresponds to one Tab in order.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Semantics</strong> — <code>role="tabpanel"</code> communicates content role to screen readers.</li>
  <li><strong>Visibility</strong> — hidden when inactive (<code>aria-hidden</code>), visible when active.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Tabs>
  <TabList>
    <Tab>First</Tab>
    <Tab>Second</Tab>
  </TabList>
  <TabPanel>Content for the first tab.</TabPanel>
  <TabPanel>Content for the second tab.</TabPanel>
</Tabs>`}>
  <div class="p-4 bg-surface rounded-md">
    <Tabs><TabList><Tab>First</Tab><Tab>Second</Tab></TabList><TabPanel>Content for the first tab.</TabPanel><TabPanel>Content for the second tab.</TabPanel></Tabs>
  </div>
</ExampleTabs>

<h2>Accessibility</h2>
<ul>
  <li><code>role="tabpanel"</code> on each panel.</li>
  <li><code>aria-labelledby</code> points to the associated Tab.</li>
  <li>Hidden panels use <code>aria-hidden</code> or <code>hidden</code> attribute.</li>
  <li>Focusable elements inside the panel are in the tab sequence when the panel is active.</li>
</ul>
