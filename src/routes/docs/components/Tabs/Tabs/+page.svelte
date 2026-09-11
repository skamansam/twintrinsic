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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.tabs_heading()}</h1>

  <p>
    <strong>{m.tabs_heading()}</strong>{m.tabs_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.tabs_what_1()}<code>role="tablist"</code>{m.tabs_what_2()}<code>role="tab"</code>{m.tabs_what_3()}<code>role="tabpanel"</code>{m.tabs_what_4()}<code>aria-selected</code>{m.tabs_what_5()}<code>aria-controls</code>{m.tabs_what_6()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.tabs_when_1()}<code>&lt;Tabs&gt;</code>{m.tabs_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.tabs_why_scroll()}</strong>{m.tabs_why_scroll_desc()}</li>
    <li><strong>{m.tabs_why_mental()}</strong>{m.tabs_why_mental_desc()}</li>
    <li><strong>{m.tabs_why_a11y()}</strong>{m.tabs_why_a11y_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/">WAI-ARIA APG — Tabs</a></li>
    <li><a href="https://primer.style/product/components/UnderlineNav">Primer — UnderlineNav</a></li>
    <li><a href="https://m3.material.io/components/tabs/overview">Material Design 3 — Tabs</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.tabs_impl_1()}<code>role="tablist"</code>{m.tabs_what_2()}<code>role="tab"</code>{m.tabs_what_3()}<code>role="tabpanel"</code>{m.tabs_impl_2()}</li>
    <li>{m.tabs_impl_3()}</li>
    <li><code>aria-selected</code>{m.tabs_impl_4()}<code>aria-controls</code>{m.tabs_impl_5()}</li>
    <li>{m.tabs_impl_6()}</li>
    <li>{m.tabs_impl_7()}<code>aria-labelledby</code>{m.tabs_impl_8()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.tabs_mistake_1_1()}<code>aria-selected</code>{m.tabs_mistake_1_2()}</li>
    <li>{m.tabs_mistake_2_1()}<code>tabindex="0"</code>{m.tabs_mistake_2_2()}<code>tabindex="-1"</code>{m.tabs_mistake_2_3()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>Accordion, Menu, Breadcrumb</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.tabs_responsive_1()}</li>
    <li>{m.tabs_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.tabs_custom_1_1()}<code>default</code>{m.tabs_custom_1_2()}<code>underline</code>{m.tabs_custom_1_3()}<code>pills</code>{m.tabs_custom_1_4()}<code>enclosed</code>{m.tabs_custom_1_5()}</li>
    <li>{m.tabs_custom_2_1()}<code>sm</code>{m.tabs_custom_2_2()}<code>md</code>{m.tabs_custom_2_3()}<code>lg</code>{m.tabs_custom_2_4()}</li>
    <li>{m.tabs_custom_3_1()}<code>fullWidth</code>{m.tabs_custom_3_2()}</li>
    <li>{m.tabs_custom_4_1()}<code>centered</code>{m.tabs_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.tabs_ex_datadriven()}</h3>
  <p>
    {m.tabs_ex_datadriven_desc_1()}<code>&lt;Tab&gt;</code>{m.tabs_ex_datadriven_desc_2()}<code>&lt;TabPanel&gt;</code>{m.tabs_ex_datadriven_desc_3()}
  </p>
  <ExampleTabs code={`<Tabs tabs={[\n  { label: 'Profile', content: '<p>Manage your profile information.</p>' },\n  { label: 'Security', content: '<p>Change your password and enable 2FA.</p>' },\n  { label: 'Notifications', content: '<p>Configure email and push notifications.</p>' }\n]} />`}>
    <div class="p-4 bg-surface rounded-md" data-testid="tabs-data-driven">
      <Tabs tabs={[{ label: 'Profile', content: '<p>Manage your profile information.</p>' }, { label: 'Security', content: '<p>Change your password and enable 2FA.</p>' }, { label: 'Notifications', content: '<p>Configure email and push notifications.</p>' }]} />
    </div>
  </ExampleTabs>

  <h3>{m.tabs_ex_icons()}</h3>
  <ExampleTabs code={`<Tabs variant="pills" tabs={[\n  { label: 'Overview', icon: 'tabler:layout-dashboard', content: '<p>Dashboard overview.</p>' },\n  { label: 'Analytics', icon: 'tabler:chart-bar', content: '<p>View detailed analytics.</p>' },\n  { label: 'Reports', icon: 'tabler:file-text', content: '<p>Generate reports.</p>' }\n]} />`}>
    <div class="p-4 bg-surface rounded-md" data-testid="tabs-data-driven-icons">
      <Tabs variant="pills" tabs={[{ label: 'Overview', icon: 'tabler:layout-dashboard', content: '<p>Dashboard overview.</p>' }, { label: 'Analytics', icon: 'tabler:chart-bar', content: '<p>View detailed analytics.</p>' }, { label: 'Reports', icon: 'tabler:file-text', content: '<p>Generate reports.</p>' }]} />
    </div>
  </ExampleTabs>

  <h3>{m.tabs_ex_account()}</h3>
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

  <h3>{m.tabs_ex_variants()}</h3>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TabsModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li><code>role="tablist"</code>, <code>role="tab"</code>, <code>role="tabpanel"</code>.</li>
    <li><code>aria-selected</code>{m.tabs_a11y_2_1()}</li>
    <li><code>aria-controls</code>{m.tabs_a11y_3_1()}</li>
    <li>{m.tabs_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd></td><td>{m.tabs_kb_1()}</td></tr>
      <tr><td><kbd>Home</kbd></td><td>{m.tabs_kb_2()}</td></tr>
      <tr><td><kbd>End</kbd></td><td>{m.tabs_kb_3()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.tabs_kb_4()}</td></tr>
    </tbody>
  </table>
</Container>
