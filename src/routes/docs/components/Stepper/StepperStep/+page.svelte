<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Stepper from "$lib/components/Stepper/Stepper.svelte"
import StepperStep from "$lib/components/Stepper/StepperStep.svelte"
import * as StepperStepModule from "$lib/components/Stepper/StepperStep.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>StepperStep</h1>

  <p>
    The StepperStep component is an individual step within a
    <code>Stepper</code>. It renders a numbered (or icon) marker, a title, an
    optional subtitle, and — for vertical steppers — the step's content when
    active or expanded. Steps derive their completed/active/pending state from
    the parent <code>Stepper</code>'s <code>activeStep</code>, or from their
    own explicit props.
  </p>

  <h2>Examples</h2>

  <h3>Basic Steps</h3>
  <div class="not-prose mb-8 max-w-3xl" data-testid="stepper-step-basic">
    <Stepper>
      <StepperStep title="Account">Account details</StepperStep>
      <StepperStep title="Profile">Profile information</StepperStep>
      <StepperStep title="Review">Review and submit</StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper>
  <StepperStep title="Account">Account details</StepperStep>
  <StepperStep title="Profile">Profile information</StepperStep>
  <StepperStep title="Review">Review and submit</StepperStep>
</Stepper>`}</CodeBlock>

  <h3>Subtitles and Icons</h3>
  <div class="not-prose mb-8 max-w-3xl" data-testid="stepper-step-subtitles">
    <Stepper>
      <StepperStep
        title="Contact"
        subtitle="Your email address"
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
      >
        Contact details
      </StepperStep>
      <StepperStep
        title="Billing"
        subtitle="Payment method"
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h2m4 0h2m-9 4h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
      >
        Billing details
      </StepperStep>
      <StepperStep title="Done">All set!</StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper>
  <StepperStep
    title="Contact"
    subtitle="Your email address"
    icon="<svg ...>"
  >
    Contact details
  </StepperStep>
  <StepperStep title="Billing" subtitle="Payment method" icon="<svg ...>">
    Billing details
  </StepperStep>
  <StepperStep title="Done">All set!</StepperStep>
</Stepper>`}</CodeBlock>

  <h3>Explicit States</h3>
  <div class="not-prose mb-8 max-w-3xl" data-testid="stepper-step-states">
    <Stepper>
      <StepperStep title="Completed" completed>Done</StepperStep>
      <StepperStep title="Active" active>In progress</StepperStep>
      <StepperStep title="Error" error>Something went wrong</StepperStep>
      <StepperStep title="Optional" optional>Optional step</StepperStep>
      <StepperStep title="Disabled" disabled>Unavailable</StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper>
  <StepperStep title="Completed" completed>Done</StepperStep>
  <StepperStep title="Active" active>In progress</StepperStep>
  <StepperStep title="Error" error>Something went wrong</StepperStep>
  <StepperStep title="Optional" optional>Optional step</StepperStep>
  <StepperStep title="Disabled" disabled>Unavailable</StepperStep>
</Stepper>`}</CodeBlock>

  <h3>Vertical Steps with Content</h3>
  <div class="not-prose mb-8 max-w-3xl" data-testid="stepper-step-vertical">
    <Stepper orientation="vertical">
      <StepperStep title="Personal Information">
        <p class="mt-2 text-sm">Enter your personal details.</p>
      </StepperStep>
      <StepperStep title="Address">
        <p class="mt-2 text-sm">Enter your address details.</p>
      </StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper orientation="vertical">
  <StepperStep title="Personal Information">
    <p>Enter your personal details.</p>
  </StepperStep>
  <StepperStep title="Address">
    <p>Enter your address details.</p>
  </StepperStep>
</Stepper>`}</CodeBlock>

  <h2>StepperStep Props</h2>
  <PropsTable component={StepperStepModule} />

  <h2>StepperStep Events</h2>
  <EventsTable component={StepperStepModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Each step renders <code>role="listitem"</code> with <code>aria-current="step"</code> on the active step</li>
    <li>Completed steps swap their marker for a check icon; error steps show an error icon</li>
    <li>Steps with an <code>onClick</code> handler render as a real button (Enter/Space activates)</li>
    <li>Disabled steps expose <code>aria-disabled</code> and are skipped by interaction</li>
  </ul>
</Container>
