<!--
@component
Tabs documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Tabs from "$lib/components/Tabs/Tabs.svelte"
import TabList from "$lib/components/Tabs/TabList.svelte"
import Tab from "$lib/components/Tabs/Tab.svelte"
import TabPanel from "$lib/components/Tabs/TabPanel.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Tabs</h1>
  
  <p>
    The Tabs component organizes content into tabbed sections with keyboard navigation support and various styling options.
    It provides accessible tab navigation following WAI-ARIA patterns.
  </p>

  <h2>Usage</h2>

  <h3>Basic Tabs</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
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

  <pre class="language-svelte"><code>{`<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanel>Content for tab 1</TabPanel>
  <TabPanel>Content for tab 2</TabPanel>
  <TabPanel>Content for tab 3</TabPanel>
</Tabs>`}</code></pre>

  <h3>Tab Variants</h3>
  <div class="space-y-6 p-4 bg-surface rounded-md mb-4">
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
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>variant</code></td>
        <td><code>"default" | "underline" | "pills" | "enclosed"</code></td>
        <td><code>"default"</code></td>
        <td>Visual style variant</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>"sm" | "md" | "lg"</code></td>
        <td><code>"md"</code></td>
        <td>Tab size</td>
      </tr>
      <tr>
        <td><code>fullWidth</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether tabs should take full width</td>
      </tr>
      <tr>
        <td><code>centered</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether tabs should be centered</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all tabs are disabled</td>
      </tr>
      <tr>
        <td><code>defaultIndex</code></td>
        <td><code>number</code></td>
        <td><code>0</code></td>
        <td>Index of initially selected tab</td>
      </tr>
    </tbody>
  </table>

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
