<!--
@component
Alert documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Alert from "$lib/components/Alert/Alert.svelte"
import Button from "$lib/components/Button/Button.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import * as AlertModule from "$lib/components/Alert/Alert.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.alert_heading()}</h1>

  <p>
    <strong>{m.alert_heading()}</strong>{m.alert_lede_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.alert_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.alert_when_1()}<code>&lt;Alert&gt;</code>{m.alert_when_2()}<code>&lt;Modal&gt;</code>{m.alert_when_3()}<code>&lt;Toast&gt;</code>{m.alert_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.alert_why_emphasis()}</strong>{m.alert_why_emphasis_1()}</li>
    <li><strong>{m.alert_why_nonblocking()}</strong>{m.alert_why_nonblocking_1()}</li>
    <li><strong>{m.alert_why_accessible()}</strong>{m.alert_why_accessible_1()}<code>role="alert"</code>{m.alert_why_accessible_2()}</li>
    <li><strong>{m.alert_why_flexible()}</strong>{m.alert_why_flexible_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/alert/">WAI-ARIA APG — Alert</a></li>
    <li><a href="https://m3.material.io/components/banners/overview">Material Design 3 — Banners</a></li>
    <li><a href="https://primer.style/components/flash">Primer — Flash</a></li>
    <li><a href="https://ant.design/components/alert">Ant Design — Alert</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role">MDN — alert role</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.alert_responsive_1_1()}<code>max-w-*</code>{m.alert_responsive_1_2()}</li>
    <li>{m.alert_responsive_2()}</li>
    <li>{m.alert_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.alert_custom_1_1()}<code>info</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>default</code>{m.alert_custom_1_2()}</li>
    <li>{m.alert_custom_2_1()}<code>left</code>, <code>right</code>, <code>top</code>, <code>bottom</code>{m.alert_custom_2_2()}</li>
    <li>{m.alert_custom_3_1()}<code>title</code>{m.alert_custom_3_2()}</li>
    <li>{m.alert_custom_4_1()}<code>icon</code>{m.alert_custom_4_2()}</li>
    <li>{m.alert_custom_5_1()}<code>dismissible</code>{m.alert_custom_5_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.alert_ex_variants()}</h3>
  <ExampleTabs code={`<Alert variant="info">A new version of the app is available for download.</Alert>
<Alert variant="success">Profile saved successfully.</Alert>
<Alert variant="warning">Storage is 95% full. Upgrade your plan.</Alert>
<Alert variant="error">Unable to connect to the server.</Alert>`}>
    <div class="space-y-3" data-testid="alert-variants">
      <Alert variant="info">A new version of the app is available for download.</Alert>
      <Alert variant="success">Profile saved successfully.</Alert>
      <Alert variant="warning">Storage is 95% full. Upgrade your plan.</Alert>
      <Alert variant="error">Unable to connect to the server.</Alert>
    </div>
  </ExampleTabs>

  <h3>{m.alert_ex_title()}</h3>
  <ExampleTabs code={`<Alert variant="warning" title="Storage almost full">
  Your account has used 95% of its storage quota.
  Delete unused files or upgrade your plan to continue.
</Alert>`}>
    <div data-testid="alert-title">
      <Alert variant="warning" title="Storage almost full">
        Your account has used 95% of its storage quota.
        Delete unused files or upgrade your plan to continue.
      </Alert>
    </div>
  </ExampleTabs>

  <h3>{m.alert_ex_dismissible()}</h3>
  <ExampleTabs code={`<Alert variant="info" dismissible>You have 3 new messages.</Alert>`}>
    <div data-testid="alert-dismissible">
      <Alert variant="info" dismissible>You have 3 new messages.</Alert>
    </div>
  </ExampleTabs>

  <h3>{m.alert_ex_borders()}</h3>
  <ExampleTabs code={`<Alert variant="info" border="left">Left border (default)</Alert>
<Alert variant="success" border="top">Top border</Alert>
<Alert variant="warning" border="right">Right border</Alert>
<Alert variant="error" border="bottom">Bottom border</Alert>`}>
    <div class="space-y-3" data-testid="alert-borders">
      <Alert variant="info" border="left">Left border (default)</Alert>
      <Alert variant="success" border="top">Top border</Alert>
      <Alert variant="warning" border="right">Right border</Alert>
      <Alert variant="error" border="bottom">Bottom border</Alert>
    </div>
  </ExampleTabs>

  <h3>{m.alert_ex_best()}</h3>
  <ExampleTabs code={`<Alert variant="info" title="Best Practice">
  Use <code>role="alert"</code> for important messages that need immediate
  screen reader attention. For less urgent updates, use <code>role="status"</code>.
</Alert>`}>
    <div data-testid="alert-best-practice">
      <Alert variant="info" title="Best Practice">
        Use <code>role="alert"</code> for important messages that need immediate
        screen reader attention. For less urgent updates, use <code>role="status"</code>.
      </Alert>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={AlertModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={AlertModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.alert_a11y_1()}<code>role="alert"</code>{m.alert_a11y_2()}</li>
    <li>{m.alert_a11y_3()}<code>aria-label="Dismiss alert"</code>{m.alert_a11y_4()}</li>
    <li>{m.alert_a11y_5()}</li>
    <li>{m.alert_a11y_6()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.alert_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.alert_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>
