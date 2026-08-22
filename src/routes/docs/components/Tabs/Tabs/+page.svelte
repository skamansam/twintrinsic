<!--
@component
Tabs documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
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
    <strong>Tabs</strong> organizes content into tabbed sections where only one
    panel is visible at a time. Supports 4 variants (default, underline, pills,
    enclosed) with full WAI-ARIA keyboard navigation.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A set of clickable tab labels that switch between content panels. Uses
    <code>role="tablist"</code> / <code>role="tab"</code> / <code>role="tabpanel"</code>
    with <code>aria-selected</code> and <code>aria-controls</code>.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Tabs&gt;</code> for 2–5 related content sections that occupy the
    same space: settings panels, content categories, view modes. Use for same-level
    content switching, not for navigation between pages.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Reduces scrolling</strong> — shows one section at a time.</li>
    <li><strong>Mental model</strong> — users expect tabs for settings/configuration (desktop app convention).</li>
    <li><strong>Accessible</strong> — WAI-ARIA tab pattern with arrow key navigation.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/">WAI-ARIA APG — Tabs</a></li>
    <li><a href="https://primer.style/product/components/UnderlineNav">Primer — UnderlineNav</a></li>
    <li><a href="https://m3.material.io/components/tabs/overview">Material Design 3 — Tabs</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Tabs scroll horizontally when they overflow on mobile.</li>
    <li>Touch targets meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Variants: <code>default</code>, <code>underline</code>, <code>pills</code>, <code>enclosed</code>.</li>
    <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
    <li>Full-width via <code>fullWidth</code>.</li>
    <li>Centered via <code>centered</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Account Tabs</h3>
  <ExampleTabs code={`<Tabs>
  <TabList>
    <Tab>Billing</Tab>
    <Tab>Team</Tab>
    <Tab>Usage</Tab>
  </TabList>
  <TabPanel>Manage your payment method, invoices, and billing cycle.</TabPanel>
  <TabPanel>Invite teammates and manage their roles and permissions.</TabPanel>
  <TabPanel>Track API calls, storage, and seat usage for your workspace.</TabPanel>
</Tabs>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="tabs-basic">
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
  </ExampleTabs>

  <h3>Variants</h3>
  <ExampleTabs code={`<Tabs variant="underline">
  <TabList><Tab>Docs</Tab><Tab>Examples</Tab></TabList>
  <TabPanel>Guides and API reference.</TabPanel>
  <TabPanel>Working examples you can copy.</TabPanel>
</Tabs>

<Tabs variant="pills">
  <TabList><Tab>Monthly</Tab><Tab>Yearly</Tab></TabList>
  <TabPanel>Billed monthly.</TabPanel>
  <TabPanel>Billed annually — save 20%.</TabPanel>
</Tabs>`}>
    <div class="space-y-6 p-4 bg-surface rounded-md" data-testid="tabs-variants">
      <Tabs variant="underline"><TabList><Tab>Docs</Tab><Tab>Examples</Tab></TabList><TabPanel>Guides and API reference.</TabPanel><TabPanel>Working examples.</TabPanel></Tabs>
      <Tabs variant="pills"><TabList><Tab>Monthly</Tab><Tab>Yearly</Tab></TabList><TabPanel>Billed monthly.</TabPanel><TabPanel>Billed annually — save 20%.</TabPanel></Tabs>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={TabsModule} />

  <h2>Accessibility</h2>
  <ul>
    <li><code>role="tablist"</code>, <code>role="tab"</code>, <code>role="tabpanel"</code>.</li>
    <li><code>aria-selected</code> on the active tab.</li>
    <li><code>aria-controls</code> links tab to its panel.</li>
    <li>Arrow keys navigate between tabs; Home/End jump to first/last.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd></td><td>Navigate between tabs</td></tr>
      <tr><td><kbd>Home</kbd></td><td>Select first tab</td></tr>
      <tr><td><kbd>End</kbd></td><td>Select last tab</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate focused tab</td></tr>
    </tbody>
  </table>
</Container>
