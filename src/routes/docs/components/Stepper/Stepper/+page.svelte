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
import * as StepperModule from "$lib/components/Stepper/Stepper.svelte"
import * as StepperStepModule from "$lib/components/Stepper/StepperStep.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Stepper</h1>

  <p>
    <strong>Stepper</strong> displays progress through a sequence of logical and numbered steps.
    It is commonly used for multi-step forms, wizards, or any process that requires users to
    complete steps in a specific order.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A sequential navigation component that shows the user's current position in a multi-step
    process. Each step can be completed, active, pending, or in error. Supports horizontal
    and vertical orientations with optional step content display.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Stepper&gt;</code> for workflows with 3+ sequential steps: checkout flows,
    registration wizards, onboarding sequences, or configuration steps. For tabbed content
    that can be accessed in any order, use <code>&lt;Tabs&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Progress visibility</strong> — users always know where they are in the process.</li>
    <li><strong>Linear and non-linear modes</strong> — enforce sequential steps or allow free navigation.</li>
    <li><strong>Vertical and horizontal orientations</strong> — adapts to different layout contexts.</li>
    <li><strong>Error state</strong> — clearly marks failed steps for user attention.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/components/steppers/overview">Material Design 3 — Steppers</a></li>
    <li><a href="https://ant.design/components/steps">Ant Design — Steps</a></li>
    <li><a href="https://primer.style/components/stepper">Primer — Stepper</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role">MDN — ARIA tab roles</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/">WAI-ARIA APG — Tabs</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>`&lt;ol&gt;` for semantic ordering of steps</li>
    <li>`aria-current=&quot;step&quot;` on the active step</li>
    <li>Step states: completed (checkmark), current (active), upcoming (muted)</li>
    <li>`&lt;nav&gt;` wrapping for landmark semantics</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;ul&gt;` — steps have inherent order, so `&lt;ol&gt;` is correct</li>
    <li>Don't forget `aria-current=&quot;step&quot;` on the active step</li>
</ul>

<h2>Related Components</h2>
<p>Timeline, Breadcrumb, Accordion</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Horizontal stepper compresses on narrow screens; use <code>orientation="vertical"</code> for mobile.</li>
    <li>Alternative labels stack below icons on smaller viewports.</li>
    <li>Vertical stepper content is full-width and scrollable.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Orientations: <code>horizontal</code>, <code>vertical</code>.</li>
    <li>Variants: <code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>.</li>
    <li><code>alternativeLabels</code> — labels below step icons instead of beside them.</li>
    <li><code>linear={false}</code> — non-linear mode for free step navigation.</li>
    <li>Custom icons via the <code>icon</code> prop on <code>&lt;StepperStep&gt;</code>.</li>
    <li>Optional, disabled, and error states per step.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Stepper</h3>
  <ExampleTabs code={`<Stepper>
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
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-basic">
      <Stepper>
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
    </div>
  </ExampleTabs>

  <h3>Vertical Stepper</h3>
  <ExampleTabs code={`<Stepper orientation="vertical">
  <StepperStep label="Personal Information">
    <div class="p-4 mt-2 bg-surface rounded-lg">
      <h3 class="text-lg font-medium">Personal Information</h3>
      <p class="mt-2">Enter your personal details.</p>
    </div>
  </StepperStep>
  <StepperStep label="Address">
    <div class="p-4 mt-2 bg-surface rounded-lg">
      <h3 class="text-lg font-medium">Address</h3>
      <p class="mt-2">Enter your address details.</p>
    </div>
  </StepperStep>
</Stepper>`}>
    <div class="max-w-3xl" data-testid="stepper-vertical">
      <Stepper orientation="vertical">
        <StepperStep label="Personal Information">
          <div class="p-4 mt-2 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Personal Information</h3>
            <p class="mt-2">Enter your personal details.</p>
          </div>
        </StepperStep>
        <StepperStep label="Address">
          <div class="p-4 mt-2 bg-surface rounded-lg">
            <h3 class="text-lg font-medium">Address</h3>
            <p class="mt-2">Enter your address details.</p>
          </div>
        </StepperStep>
      </Stepper>
    </div>
  </ExampleTabs>

  <h3>Non-Linear Stepper</h3>
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

  <h3>Alternative Labels</h3>
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

  <h3>Custom Icons</h3>
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

  <h2>Stepper Props</h2>
  <PropsTable component={StepperModule} />

  <h2>StepperStep Props</h2>
  <PropsTable component={StepperStepModule} />

  <h2>Stepper Events</h2>
  <EventsTable component={StepperModule} />

  <h2>StepperStep Events</h2>
  <EventsTable component={StepperStepModule} />

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>icon</code></td><td>Custom icon content for the step marker</td></tr>
      <tr><td><code>label</code></td><td>Custom label content for the step</td></tr>
      <tr><td><code>default</code></td><td>Step content (shown when active in vertical mode)</td></tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="tablist"</code> for the stepper container.</li>
    <li>Uses <code>role="tab"</code> for step headers.</li>
    <li>Uses <code>role="tabpanel"</code> for step content.</li>
    <li>Proper <code>aria-selected</code>, <code>aria-controls</code>, and <code>aria-labelledby</code> attributes.</li>
    <li>Active step marked with <code>aria-current="step"</code>.</li>
    <li>Completed steps show check icon; error steps show error icon.</li>
    <li>Disabled steps expose <code>aria-disabled</code> and are skipped by interaction.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Moves focus to the stepper</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activates the focused step</td></tr>
      <tr><td><kbd>Left Arrow</kbd> / <kbd>Up Arrow</kbd></td><td>Moves focus to the previous step</td></tr>
      <tr><td><kbd>Right Arrow</kbd> / <kbd>Down Arrow</kbd></td><td>Moves focus to the next step</td></tr>
      <tr><td><kbd>Home</kbd></td><td>Moves focus to the first step</td></tr>
      <tr><td><kbd>End</kbd></td><td>Moves focus to the last step</td></tr>
    </tbody>
  </table>
</Container>
