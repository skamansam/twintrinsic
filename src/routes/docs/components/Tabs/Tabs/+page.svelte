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

  <h3>Account Tabs</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="tabs-basic">
    <Tabs>
      <TabList>
        <Tab>Billing</Tab>
        <Tab>Team</Tab>
        <Tab>Usage</Tab>
      </TabList>
      <TabPanel>Manage your payment method, invoices, and billing cycle.</TabPanel>
      <TabPanel>Invite teammates and manage their roles and permissions.</TabPanel>
      <TabPanel>Track API calls, storage, and seat usage for your workspace.</TabPanel>
    </Tabs>
  </div>

  <CodeBlock language="svelte">{`<Tabs>
  <TabList>
    <Tab>Billing</Tab>
    <Tab>Team</Tab>
    <Tab>Usage</Tab>
  </TabList>
  <TabPanel>Manage your payment method, invoices, and billing cycle.</TabPanel>
  <TabPanel>Invite teammates and manage their roles and permissions.</TabPanel>
  <TabPanel>Track API calls, storage, and seat usage for your workspace.</TabPanel>
</Tabs>`}</CodeBlock>

  <h3>Tab Variants</h3>
  <div class="space-y-6 p-4 bg-surface rounded-md mb-4" data-testid="tabs-variants">
    <div>
      <p class="text-sm text-muted mb-3">Default</p>
      <Tabs variant="default">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Analytics</Tab>
        </TabList>
        <TabPanel>Key metrics and recent activity across your account.</TabPanel>
        <TabPanel>Charts and trends for traffic and engagement.</TabPanel>
      </Tabs>
    </div>
    <div>
      <p class="text-sm text-muted mb-3">Underline</p>
      <Tabs variant="underline">
        <TabList>
          <Tab>Documentation</Tab>
          <Tab>Examples</Tab>
        </TabList>
        <TabPanel>Guides and API reference for the component library.</TabPanel>
        <TabPanel>Working examples you can copy into your own project.</TabPanel>
      </Tabs>
    </div>
    <div>
      <p class="text-sm text-muted mb-3">Pills</p>
      <Tabs variant="pills">
        <TabList>
          <Tab>Monthly</Tab>
          <Tab>Yearly</Tab>
        </TabList>
        <TabPanel>Billed monthly — cancel anytime.</TabPanel>
        <TabPanel>Billed annually — save up to 20%.</TabPanel>
      </Tabs>
    </div>
    <div>
      <p class="text-sm text-muted mb-3">Enclosed</p>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Basic</Tab>
          <Tab>Advanced</Tab>
        </TabList>
        <TabPanel>Settings for the default experience.</TabPanel>
        <TabPanel>Advanced options for power users.</TabPanel>
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
