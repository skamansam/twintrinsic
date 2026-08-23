<!--
@component
StepperStep documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Stepper from "$lib/components/Stepper/Stepper.svelte"
import StepperStep from "$lib/components/Stepper/StepperStep.svelte"
import * as StepperStepModule from "$lib/components/Stepper/StepperStep.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>StepperStep</h1>

  <p>
    <strong>StepperStep</strong> is an individual step within a <code>&lt;Stepper&gt;</code>.
    It renders a numbered (or icon) marker, a title, an optional subtitle, and — for vertical
    steppers — the step's content when active or expanded. Steps derive their
    completed/active/pending state from the parent <code>&lt;Stepper&gt;</code>'s
    <code>activeStep</code>, or from their own explicit props.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A single step within a <code>&lt;Stepper&gt;</code> container. It manages its own visual
    state (completed, active, pending, error, optional, disabled) and renders the step
    marker (number or custom icon), label, optional subtitle, and content area.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Always use <code>&lt;StepperStep&gt;</code> inside a <code>&lt;Stepper&gt;</code>.
    Each logical step in your process gets its own <code>&lt;StepperStep&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Self-contained state</strong> — manages completed/active/pending/error per step.</li>
    <li><strong>Context-driven</strong> — inherits state from the parent Stepper when not explicitly set.</li>
    <li><strong>Rich content</strong> — supports custom icons, subtitles, and inline content.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/components/steppers/overview">Material Design 3 — Steppers</a></li>
    <li><a href="https://ant.design/components/steps">Ant Design — Steps</a></li>
    <li><a href="https://primer.style/components/stepper">Primer — Stepper</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/">WAI-ARIA APG — Tabs</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current">MDN — aria-current</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>In horizontal mode, steps compress and labels may wrap on narrow screens.</li>
    <li>In vertical mode, content is full-width and naturally responsive.</li>
    <li>Alternative labels stack below icons on small viewports.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>title</code> and <code>subtitle</code> for step text.</li>
    <li><code>icon</code> prop accepts HTML/SVG for custom markers.</li>
    <li><code>optional</code>, <code>disabled</code>, <code>completed</code>, <code>active</code>, <code>error</code> states.</li>
    <li>Clickable steps via <code>onClick</code> handler.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Steps</h3>
  <ExampleTabs code={`<Stepper>
  <StepperStep title="Account">Account details</StepperStep>
  <StepperStep title="Profile">Profile information</StepperStep>
  <StepperStep title="Review">Review and submit</StepperStep>
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-step-basic">
      <Stepper>
        <StepperStep title="Account">Account details</StepperStep>
        <StepperStep title="Profile">Profile information</StepperStep>
        <StepperStep title="Review">Review and submit</StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h3>Subtitles and Icons</h3>
  <ExampleTabs code={`<Stepper>
  <StepperStep title="Contact" subtitle="Your email address" icon="<svg ...>">
    Contact details
  </StepperStep>
  <StepperStep title="Billing" subtitle="Payment method" icon="<svg ...>">
    Billing details
  </StepperStep>
  <StepperStep title="Done">All set!</StepperStep>
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-step-subtitles">
      <Stepper>
        <StepperStep title="Contact" subtitle="Your email address">
          Contact details
        </StepperStep>
        <StepperStep title="Billing" subtitle="Payment method">
          Billing details
        </StepperStep>
        <StepperStep title="Done">All set!</StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h3>Explicit States</h3>
  <ExampleTabs code={`<Stepper>
  <StepperStep title="Completed" completed>Done</StepperStep>
  <StepperStep title="Active" active>In progress</StepperStep>
  <StepperStep title="Error" error>Something went wrong</StepperStep>
  <StepperStep title="Optional" optional>Optional step</StepperStep>
  <StepperStep title="Disabled" disabled>Unavailable</StepperStep>
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-step-states">
      <Stepper>
        <StepperStep title="Completed" completed>Done</StepperStep>
        <StepperStep title="Active" active>In progress</StepperStep>
        <StepperStep title="Error" error>Something went wrong</StepperStep>
        <StepperStep title="Optional" optional>Optional step</StepperStep>
        <StepperStep title="Disabled" disabled>Unavailable</StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h3>Vertical Steps with Content</h3>
  <ExampleTabs code={`<Stepper orientation="vertical">
  <StepperStep title="Personal Information">
    <p class="mt-2 text-sm">Enter your personal details.</p>
  </StepperStep>
  <StepperStep title="Address">
    <p class="mt-2 text-sm">Enter your address details.</p>
  </StepperStep>
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-step-vertical">
      <Stepper orientation="vertical">
        <StepperStep title="Personal Information">
          <p class="mt-2 text-sm">Enter your personal details.</p>
        </StepperStep>
        <StepperStep title="Address">
          <p class="mt-2 text-sm">Enter your address details.</p>
        </StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={StepperStepModule} />

  <h2>Events</h2>
  <EventsTable component={StepperStepModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Each step renders <code>role="listitem"</code> with <code>aria-current="step"</code> on the active step.</li>
    <li>Completed steps swap their marker for a check icon; error steps show an error icon.</li>
    <li>Steps with an <code>onClick</code> handler render as a real button (Enter/Space activates).</li>
    <li>Disabled steps expose <code>aria-disabled</code> and are skipped by interaction.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus between steps</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate the focused step (if clickable)</td></tr>
    </tbody>
  </table>
</Container>
