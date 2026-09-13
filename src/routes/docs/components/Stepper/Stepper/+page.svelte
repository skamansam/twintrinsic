<!--
@component
Stepper documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Stepper from "$lib/components/Stepper/Stepper.svelte"
import StepperStep from "$lib/components/Stepper/StepperStep.svelte"
import Button from "$lib/components/Button/Button.svelte"
import * as StepperModule from "$lib/components/Stepper/Stepper.svelte"
import * as StepperStepModule from "$lib/components/Stepper/StepperStep.svelte"
import { m } from "$lib/paraglide/messages.js"

let basicStep = $state(0)
let verticalStep = $state(0)
let verticalSteps = [
  { label: "Personal Information", content: "Enter your name, email, and phone number." },
  { label: "Address", content: "Enter your shipping and billing address." },
  { label: "Payment", content: "Select your payment method and enter details." },
  { label: "Review", content: "Review your order before placing it." },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.stepper_heading()}</h1>

  <p>
    <strong>{m.stepper_heading()}</strong>{m.stepper_lede_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.stepper_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.stepper_when_1()}<code>&lt;Stepper&gt;</code>{m.stepper_when_2()}<code>&lt;Tabs&gt;</code>{m.stepper_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.stepper_why_progress()}</strong>{m.stepper_why_progress_1()}</li>
    <li><strong>{m.stepper_why_modes()}</strong>{m.stepper_why_modes_1()}</li>
    <li><strong>{m.stepper_why_orientations()}</strong>{m.stepper_why_orientations_1()}</li>
    <li><strong>{m.stepper_why_error()}</strong>{m.stepper_why_error_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://m3.material.io/components/steppers/overview">Material Design 3 — Steppers</a></li>
    <li><a href="https://ant.design/components/steps">Ant Design — Steps</a></li>
    <li><a href="https://primer.style/components/stepper">Primer — Stepper</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role">MDN — ARIA tab roles</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/">WAI-ARIA APG — Tabs</a></li>
  </ul>

  
<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.stepper_impl_1()}</li>
    <li>{m.stepper_impl_2()}</li>
    <li>{m.stepper_impl_3()}</li>
    <li>{m.stepper_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.stepper_mistake_1()}</li>
    <li>{m.stepper_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.stepper_related_1()}</p>  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.stepper_responsive_1_1()}<code>orientation="vertical"</code>{m.stepper_responsive_1_2()}</li>
    <li>{m.stepper_responsive_2()}</li>
    <li>{m.stepper_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.stepper_custom_1_1()}<code>horizontal</code>, <code>vertical</code>{m.stepper_custom_1_2()}</li>
    <li>{m.stepper_custom_2_1()}<code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>{m.stepper_custom_2_2()}</li>
    <li><code>alternativeLabels</code>{m.stepper_custom_3_2()}</li>
    <li><code>linear={false}</code>{m.stepper_custom_4_2()}</li>
    <li>{m.stepper_custom_5_1()}<code>icon</code>{m.stepper_custom_5_2()}<code>&lt;StepperStep&gt;</code>{m.stepper_custom_5_3()}</li>
    <li>{m.stepper_custom_6()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.stepper_ex_basic()}</h3>
  <ExampleTabs code={`<script>
  let step = $state(0)
<\/script>

<Stepper activeStep={step}>
  <StepperStep label="Shipping">Step 1 content</StepperStep>
  <StepperStep label="Payment">Step 2 content</StepperStep>
  <StepperStep label="Review">Step 3 content</StepperStep>
</Stepper>
<Button onclick={() => step = Math.max(0, step - 1)}>Previous</Button>
<Button onclick={() => step = Math.min(2, step + 1)}>Next</Button>`}>
    <div class="max-w-3xl space-y-4" data-testid="stepper-basic">
      <Stepper activeStep={basicStep}>
        <StepperStep label="Shipping">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Shipping Address</h3>
            <p class="mt-2">We'll send your order to the address you provide here.</p>
          </div>
        </StepperStep>
        <StepperStep label="Payment">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Payment Method</h3>
            <p class="mt-2">Your card details are encrypted and never stored on our servers.</p>
          </div>
        </StepperStep>
        <StepperStep label="Review">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Review Your Order</h3>
            <p class="mt-2">Double-check your items and shipping details before placing the order.</p>
          </div>
        </StepperStep>
      </Stepper>
      <div class="flex gap-2">
        <Button variant="outline" onclick={() => basicStep = Math.max(0, basicStep - 1)}>Previous</Button>
        <Button onclick={() => basicStep = Math.min(2, basicStep + 1)}>Next</Button>
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.stepper_ex_vertical()}</h3>
  <ExampleTabs code={`<script>
  let step = $state(0)
  const steps = ["Personal Information", "Address", "Payment", "Review"]
<\/script>

<Stepper orientation="vertical" activeStep={step}>
  {#each steps as label, i}
    <StepperStep {label}>Step {i + 1} content here.</StepperStep>
  {/each}
</Stepper>`}>
    <div class="max-w-3xl space-y-4" data-testid="stepper-vertical">
      <Stepper orientation="vertical" activeStep={verticalStep}>
        {#each verticalSteps as step, i}
          <StepperStep label={step.label}>
            <div class="p-4 mt-2 bg-surface rounded-lg">
              <h3 class="text-lg font-medium">{step.label}</h3>
              <p class="mt-2">{step.content}</p>
            </div>
          </StepperStep>
        {/each}
      </Stepper>
      <div class="flex gap-2">
        <Button variant="outline" onclick={() => verticalStep = Math.max(0, verticalStep - 1)}>Previous</Button>
        <Button onclick={() => verticalStep = Math.min(verticalSteps.length - 1, verticalStep + 1)}>Next</Button>
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.stepper_ex_nonlinear()}</h3>
  <ExampleTabs code={`<Stepper linear={false}>
  <StepperStep label="Account" optional>Account Setup</StepperStep>
  <StepperStep label="Profile" optional>Profile Information</StepperStep>
  <StepperStep label="Preferences">Preferences</StepperStep>
  <StepperStep label="Complete">All set!</StepperStep>
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-nonlinear">
      <Stepper linear={false}>
        <StepperStep label="Account" optional>
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Account Setup</h3>
            <p class="mt-2">Create your account or sign in.</p>
          </div>
        </StepperStep>
        <StepperStep label="Profile" optional>
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Profile Information</h3>
            <p class="mt-2">Tell us about yourself.</p>
          </div>
        </StepperStep>
        <StepperStep label="Preferences">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Preferences</h3>
            <p class="mt-2">Set your preferences.</p>
          </div>
        </StepperStep>
        <StepperStep label="Complete">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Complete</h3>
            <p class="mt-2">Your setup is complete!</p>
          </div>
        </StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h3>{m.stepper_ex_alternative()}</h3>
  <ExampleTabs code={`<Stepper alternativeLabels>
  <StepperStep label="Cart">Shopping Cart</StepperStep>
  <StepperStep label="Shipping">Shipping Information</StepperStep>
  <StepperStep label="Payment">Payment Method</StepperStep>
  <StepperStep label="Confirm">Confirmation</StepperStep>
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-alternative">
      <Stepper alternativeLabels>
        <StepperStep label="Cart">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Shopping Cart</h3>
            <p class="mt-2">Review your items.</p>
          </div>
        </StepperStep>
        <StepperStep label="Shipping">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Shipping Information</h3>
            <p class="mt-2">Enter your shipping details.</p>
          </div>
        </StepperStep>
        <StepperStep label="Payment">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Payment Method</h3>
            <p class="mt-2">Select your payment method.</p>
          </div>
        </StepperStep>
        <StepperStep label="Confirm">
          <div class="p-4 mt-4 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Confirmation</h3>
            <p class="mt-2">Review and confirm your order.</p>
          </div>
        </StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h3>{m.stepper_ex_icons()}</h3>
  <ExampleTabs code={`<Stepper>
  <StepperStep title="Upload">Upload files here.</StepperStep>
  <StepperStep title="Process">Processing data.</StepperStep>
  <StepperStep title="Done">Complete!</StepperStep>
</Stepper>`}>
    <div data-testid="stepper-icons">
      <Stepper>
        <StepperStep title="Upload">Upload files here.</StepperStep>
        <StepperStep title="Process">Processing data.</StepperStep>
        <StepperStep title="Done">Complete!</StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h2>{m.stepper_props_stepper()}</h2>
  <PropsTable component={StepperModule} />

  <h2>{m.stepper_props_step()}</h2>
  <PropsTable component={StepperStepModule} />

  <h2>{m.stepper_events_stepper()}</h2>
  <EventsTable component={StepperModule} />

  <h2>{m.stepper_events_step()}</h2>
  <EventsTable component={StepperStepModule} />

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>icon</code></td><td>{m.stepper_slots_icon()}</td></tr>
      <tr><td><code>label</code></td><td>{m.stepper_slots_label()}</td></tr>
      <tr><td><code>default</code></td><td>{m.stepper_slots_default()}</td></tr>
    </tbody>
  </table>

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.stepper_a11y_1_1()}<code>role="tablist"</code>{m.stepper_a11y_1_2()}</li>
    <li>{m.stepper_a11y_2_1()}<code>role="tab"</code>{m.stepper_a11y_2_2()}</li>
    <li>{m.stepper_a11y_3_1()}<code>role="tabpanel"</code>{m.stepper_a11y_3_2()}</li>
    <li>{m.stepper_a11y_4_1()}<code>aria-selected</code>{m.stepper_a11y_4_2()}<code>aria-controls</code>{m.stepper_a11y_4_3()}<code>aria-labelledby</code>{m.stepper_a11y_4_4()}</li>
    <li>{m.stepper_a11y_5_1()}<code>aria-current="step"</code>{m.stepper_a11y_5_2()}</li>
    <li>{m.stepper_a11y_6()}</li>
    <li>{m.stepper_a11y_7_1()}<code>aria-disabled</code>{m.stepper_a11y_7_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.stepper_kb_tab()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.stepper_kb_enter()}</td></tr>
      <tr><td><kbd>Left Arrow</kbd> / <kbd>Up Arrow</kbd></td><td>{m.stepper_kb_prev()}</td></tr>
      <tr><td><kbd>Right Arrow</kbd> / <kbd>Down Arrow</kbd></td><td>{m.stepper_kb_next()}</td></tr>
      <tr><td><kbd>Home</kbd></td><td>{m.stepper_kb_home()}</td></tr>
      <tr><td><kbd>End</kbd></td><td>{m.stepper_kb_end()}</td></tr>
    </tbody>
  </table>
</Container>
