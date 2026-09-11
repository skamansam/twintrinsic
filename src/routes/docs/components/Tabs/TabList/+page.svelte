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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>TabList</strong>{m.tablist_note_1()}
      <a href="/docs/components/Tabs/Tabs" class="underline font-medium">Tabs</a>{m.tablist_note_2()}
    </p>
  </div>

<h1>{m.tablist_heading()}</h1>

<p>
  <strong>{m.tablist_heading()}</strong>{m.tablist_intro_1()}<code>role="tablist"</code>{m.tablist_intro_2()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.tablist_what_1()}<code>role="tablist"</code>{m.tablist_what_2()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.tablist_when_1()}<code>&lt;Tabs&gt;</code>{m.tablist_when_2()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.tablist_why_semantics()}</strong>{m.tablist_why_semantics_desc_1()}<code>role="tablist"</code>{m.tablist_why_semantics_desc_2()}</li>
  <li><strong>{m.tablist_why_keyboard()}</strong>{m.tablist_why_keyboard_desc()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.tablist_ex_basic()}</h3>
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

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li><code>role="tablist"</code>{m.tablist_a11y_1_1()}</li>
  <li>{m.tablist_a11y_2()}</li>
  <li><code>aria-label</code>{m.tablist_a11y_3_1()}<code>aria-labelledby</code>{m.tablist_a11y_3_2()}</li>
</ul>
</Container>
