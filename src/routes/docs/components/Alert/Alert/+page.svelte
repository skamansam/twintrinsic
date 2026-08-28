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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Alert</h1>

  <p>
    <strong>Alert</strong> displays inline notifications, important information, or warnings.
    It features a colored background with a thick one-side border for visual emphasis,
    and can be dismissed by the user when appropriate.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    An inline notification component that renders important information with visual emphasis.
    It uses a colored background and a thick border on one side to draw attention. Alerts can
    include an icon, title, and dismissible close button.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Alert&gt;</code> for contextual information that doesn't block the user's
    workflow: "You have 3 new messages", "Your account is almost full", informational callouts
    in page sections, or best-practices guidance. For blocking notifications that require user
    action, use <code>&lt;Modal&gt;</code>. For transient feedback, use <code>&lt;Toast&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Visual emphasis</strong> — thick one-side border and colored background immediately draw attention.</li>
    <li><strong>Non-blocking</strong> — inline content that doesn't interrupt the user's flow.</li>
    <li><strong>Accessible</strong> — uses <code>role="alert"</code> for screen reader announcements.</li>
    <li><strong>Flexible</strong> — four severity levels, customizable border side, optional dismiss.</li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; use <code>max-w-*</code> classes to constrain.</li>
    <li>Text wraps naturally on narrow viewports.</li>
    <li>Close button meets 44×44 px touch target minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Variants: <code>info</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>default</code>.</li>
    <li>Border side: <code>left</code>, <code>right</code>, <code>top</code>, <code>bottom</code>.</li>
    <li>Optional <code>title</code> for bold heading text.</li>
    <li>Optional <code>icon</code> — auto-selected per variant, or custom Iconify name.</li>
    <li><code>dismissible</code> prop adds a close button.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Variants</h3>
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

  <h3>With Title</h3>
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

  <h3>Dismissible</h3>
  <ExampleTabs code={`<Alert variant="info" dismissible>You have 3 new messages.</Alert>`}>
    <div data-testid="alert-dismissible">
      <Alert variant="info" dismissible>You have 3 new messages.</Alert>
    </div>
  </ExampleTabs>

  <h3>Border Sides</h3>
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

  <h3>Best Practices Callout</h3>
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

  <h2>Props</h2>
  <PropsTable component={AlertModule} />

  <h2>Events</h2>
  <EventsTable component={AlertModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="alert"</code> for immediate screen reader announcement.</li>
    <li>Close button includes <code>aria-label="Dismiss alert"</code>.</li>
    <li>Color contrast meets WCAG AA requirements for all variants.</li>
    <li>Keyboard-accessible close button with visible focus ring.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the close button (when dismissible)</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Dismiss the alert</td></tr>
    </tbody>
  </table>
</Container>
