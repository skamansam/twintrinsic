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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>{m.step_heading()}</strong>{m.step_redirect_1()}
      <a href="/docs/components/Stepper/Stepper" class="underline font-medium">Stepper</a>{m.step_redirect_2()}
    </p>
  </div>

  <h1>{m.step_heading()}</h1>

  <p>
    <strong>{m.step_heading()}</strong>{m.step_lede_1()}<code>&lt;Stepper&gt;</code>{m.step_lede_2()}<code>&lt;Stepper&gt;</code>{m.step_lede_3()}<code>activeStep</code>{m.step_lede_4()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.step_what_1()}<code>&lt;Stepper&gt;</code>{m.step_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.step_when_1()}<code>&lt;StepperStep&gt;</code>{m.step_when_2()}<code>&lt;Stepper&gt;</code>{m.step_when_3()}<code>&lt;StepperStep&gt;</code>{m.step_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.step_why_state()}</strong>{m.step_why_state_1()}</li>
    <li><strong>{m.step_why_context()}</strong>{m.step_why_context_1()}</li>
    <li><strong>{m.step_why_rich()}</strong>{m.step_why_rich_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://m3.material.io/components/steppers/overview">Material Design 3 — Steppers</a></li>
    <li><a href="https://ant.design/components/steps">Ant Design — Steps</a></li>
    <li><a href="https://primer.style/components/stepper">Primer — Stepper</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/">WAI-ARIA APG — Tabs</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current">MDN — aria-current</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.step_responsive_1()}</li>
    <li>{m.step_responsive_2()}</li>
    <li>{m.step_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>title</code>{m.step_custom_1_2()}<code>subtitle</code>{m.step_custom_1_3()}</li>
    <li><code>icon</code>{m.step_custom_2_2()}</li>
    <li><code>optional</code>, <code>disabled</code>, <code>completed</code>, <code>active</code>, <code>error</code>{m.step_custom_3_6()}</li>
    <li>{m.step_custom_4_1()}<code>onClick</code>{m.step_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.step_ex_basic()}</h3>
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

  <h3>{m.step_ex_subtitles()}</h3>
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

  <h3>{m.step_ex_states()}</h3>
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

  <h3>{m.step_ex_vertical()}</h3>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={StepperStepModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={StepperStepModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.step_a11y_1_1()}<code>role="listitem"</code>{m.step_a11y_1_2()}<code>aria-current="step"</code>{m.step_a11y_1_3()}</li>
    <li>{m.step_a11y_2()}</li>
    <li>{m.step_a11y_3_1()}<code>onClick</code>{m.step_a11y_3_2()}</li>
    <li>{m.step_a11y_4_1()}<code>aria-disabled</code>{m.step_a11y_4_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.step_kb_tab()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.step_kb_enter()}</td></tr>
    </tbody>
  </table>
</Container>
