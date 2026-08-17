<!--
@component
Tabs documentation page
-->

<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Tab from "$lib/components/Tabs/Tab.svelte"
import TabList from "$lib/components/Tabs/TabList.svelte"
import TabPanel from "$lib/components/Tabs/TabPanel.svelte"
import Tabs from "$lib/components/Tabs/Tabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TabsModule from "$lib/components/Tabs/Tabs.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Tabs</h1>
  
  <p>
    The Tabs component organizes content into tabbed sections with keyboard navigation support and various styling options.
    It provides accessible tab navigation following WAI-ARIA patterns.
  </p>

  <h2>Usage</h2>

  <h3>Basic Tabs</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="tabs-basic">
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Content for tab 1</TabPanel>
      <TabPanel>Content for tab 2</TabPanel>
      <TabPanel>Content for tab 3</TabPanel>
    </Tabs>
  </div>

  <CodeBlock language="svelte">{`<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanel>Content for tab 1</TabPanel>
  <TabPanel>Content for tab 2</TabPanel>
  <TabPanel>Content for tab 3</TabPanel>
</Tabs>`}</CodeBlock>

  <h3>Tab Variants</h3>
  <div class="space-y-6 p-4 bg-surface rounded-md mb-4" data-testid="tabs-variants">
    <div>
      <p class="text-sm text-muted mb-3">Default</p>
      <Tabs variant="default">
        <TabList>
          <Tab>Default 1</Tab>
          <Tab>Default 2</Tab>
        </TabList>
        <TabPanel>Default content 1</TabPanel>
        <TabPanel>Default content 2</TabPanel>
      </Tabs>
    </div>
    <div>
      <p class="text-sm text-muted mb-3">Underline</p>
      <Tabs variant="underline">
        <TabList>
          <Tab>Underline 1</Tab>
          <Tab>Underline 2</Tab>
        </TabList>
        <TabPanel>Underline content 1</TabPanel>
        <TabPanel>Underline content 2</TabPanel>
      </Tabs>
    </div>
    <div>
      <p class="text-sm text-muted mb-3">Pills</p>
      <Tabs variant="pills">
        <TabList>
          <Tab>Pills 1</Tab>
          <Tab>Pills 2</Tab>
        </TabList>
        <TabPanel>Pills content 1</TabPanel>
        <TabPanel>Pills content 2</TabPanel>
      </Tabs>
    </div>
    <div>
      <p class="text-sm text-muted mb-3">Enclosed</p>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Enclosed 1</Tab>
          <Tab>Enclosed 2</Tab>
        </TabList>
        <TabPanel>Enclosed content 1</TabPanel>
        <TabPanel>Enclosed content 2</TabPanel>
      </Tabs>
    </div>
  </div>

  <h2>Props</h2>
<PropsTable component={TabsModule} />

  <h2>Keyboard Navigation</h2>
  <ul>
    <li><strong>Arrow Left/Right:</strong> Navigate between tabs</li>
    <li><strong>Home:</strong> Select first tab</li>
    <li><strong>End:</strong> Select last tab</li>
  </ul>

  <h2>Accessibility</h2>
  <p>
    The Tabs component follows WAI-ARIA patterns:
  </p>
  <ul>
    <li>Uses <code>role="tablist"</code> for the tab list</li>
    <li>Uses <code>role="tab"</code> for individual tabs</li>
    <li>Uses <code>role="tabpanel"</code> for content panels</li>
    <li>Supports full keyboard navigation</li>
    <li>Proper ARIA labels and attributes</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use descriptive tab labels</li>
    <li>Keep tab content organized and related</li>
    <li>Use variant that matches your design system</li>
    <li>Avoid too many tabs (5-7 is ideal)</li>
  </ul>
</Container>
