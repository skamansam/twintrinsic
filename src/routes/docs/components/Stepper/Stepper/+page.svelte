<!--
@component
Stepper documentation page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Stepper from "$lib/components/Stepper/Stepper.svelte"
import StepperStep from "$lib/components/Stepper/StepperStep.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Stepper</h1>
  
  <p>
    The Stepper component displays progress through a sequence of logical and numbered steps.
    It's commonly used for multi-step forms, wizards, or any process that requires users to
    complete steps in a specific order.
  </p>

  <h2>Examples</h2>

  <h3>Basic Stepper</h3>
  <div class="not-prose mb-8 max-w-3xl">
    <Stepper>
      <StepperStep label="Step 1">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Step 1 Content</h3>
          <p class="mt-2">This is the content for step 1. You can put any content here.</p>
        </div>
      </StepperStep>
      <StepperStep label="Step 2">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Step 2 Content</h3>
          <p class="mt-2">This is the content for step 2. You can put any content here.</p>
        </div>
      </StepperStep>
      <StepperStep label="Step 3">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Step 3 Content</h3>
          <p class="mt-2">This is the content for step 3. You can put any content here.</p>
        </div>
      </StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper>
  <StepperStep label="Step 1">
    <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
      <h3 class="text-lg font-medium">Step 1 Content</h3>
      <p class="mt-2">This is the content for step 1. You can put any content here.</p>
    </div>
  </StepperStep>
  <StepperStep label="Step 2">
    <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
      <h3 class="text-lg font-medium">Step 2 Content</h3>
      <p class="mt-2">This is the content for step 2. You can put any content here.</p>
    </div>
  </StepperStep>
  <StepperStep label="Step 3">
    <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
      <h3 class="text-lg font-medium">Step 3 Content</h3>
      <p class="mt-2">This is the content for step 3. You can put any content here.</p>
    </div>
  </StepperStep>
</Stepper>`}</CodeBlock>

  <h3>Vertical Stepper</h3>
  <div class="not-prose mb-8 max-w-3xl">
    <Stepper orientation="vertical">
      <StepperStep label="Personal Information">
        <div class="p-4 mt-2 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Personal Information</h3>
          <p class="mt-2">Enter your personal details.</p>
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium">Full Name</label>
              <input type="text" class="mt-1 block w-full rounded-md border-border bg-background p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium">Email</label>
              <input type="email" class="mt-1 block w-full rounded-md border-border bg-background p-2" />
            </div>
          </div>
        </div>
      </StepperStep>
      <StepperStep label="Address">
        <div class="p-4 mt-2 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Address</h3>
          <p class="mt-2">Enter your address details.</p>
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium">Street Address</label>
              <input type="text" class="mt-1 block w-full rounded-md border-border bg-background p-2" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium">City</label>
                <input type="text" class="mt-1 block w-full rounded-md border-border bg-background p-2" />
              </div>
              <div>
                <label class="block text-sm font-medium">Postal Code</label>
                <input type="text" class="mt-1 block w-full rounded-md border-border bg-background p-2" />
              </div>
            </div>
          </div>
        </div>
      </StepperStep>
      <StepperStep label="Review">
        <div class="p-4 mt-2 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Review</h3>
          <p class="mt-2">Review your information before submitting.</p>
          <div class="mt-4 space-y-4">
            <div class="p-3 bg-background dark:bg-background rounded-md">
              <h4 class="font-medium">Personal Information</h4>
              <p class="text-sm text-muted dark:text-muted mt-1">John Doe</p>
              <p class="text-sm text-muted dark:text-muted">john.doe@example.com</p>
            </div>
            <div class="p-3 bg-background dark:bg-background rounded-md">
              <h4 class="font-medium">Address</h4>
              <p class="text-sm text-muted dark:text-muted mt-1">123 Main St</p>
              <p class="text-sm text-muted dark:text-muted">New York, 10001</p>
            </div>
          </div>
        </div>
      </StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper orientation="vertical">
  <StepperStep label="Personal Information">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Address">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Review">
    <!-- Step content -->
  </StepperStep>
</Stepper>`}</CodeBlock>

  <h3>Non-Linear Stepper</h3>
  <div class="not-prose mb-8 max-w-3xl">
    <Stepper linear={false}>
      <StepperStep label="Account" optional="Optional">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Account Setup</h3>
          <p class="mt-2">Create your account or sign in.</p>
        </div>
      </StepperStep>
      <StepperStep label="Profile" optional="Optional">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Profile Information</h3>
          <p class="mt-2">Tell us about yourself.</p>
        </div>
      </StepperStep>
      <StepperStep label="Preferences">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Preferences</h3>
          <p class="mt-2">Set your preferences.</p>
        </div>
      </StepperStep>
      <StepperStep label="Complete">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Complete</h3>
          <p class="mt-2">Your setup is complete!</p>
        </div>
      </StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper linear={false}>
  <StepperStep label="Account" optional="Optional">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Profile" optional="Optional">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Preferences">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Complete">
    <!-- Step content -->
  </StepperStep>
</Stepper>`}</CodeBlock>

  <h3>Alternative Labels</h3>
  <div class="not-prose mb-8 max-w-3xl">
    <Stepper alternativeLabels>
      <StepperStep label="Cart">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Shopping Cart</h3>
          <p class="mt-2">Review your items.</p>
        </div>
      </StepperStep>
      <StepperStep label="Shipping">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Shipping Information</h3>
          <p class="mt-2">Enter your shipping details.</p>
        </div>
      </StepperStep>
      <StepperStep label="Payment">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Payment Method</h3>
          <p class="mt-2">Select your payment method.</p>
        </div>
      </StepperStep>
      <StepperStep label="Confirm">
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Confirmation</h3>
          <p class="mt-2">Review and confirm your order.</p>
        </div>
      </StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper alternativeLabels>
  <StepperStep label="Cart">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Shipping">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Payment">
    <!-- Step content -->
  </StepperStep>
  <StepperStep label="Confirm">
    <!-- Step content -->
  </StepperStep>
</Stepper>`}</CodeBlock>

  <h3>With Icons</h3>
  <div class="not-prose mb-8 max-w-3xl">
    <Stepper>
      <StepperStep 
        label="Account" 
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'
      >
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Account Setup</h3>
          <p class="mt-2">Create your account.</p>
        </div>
      </StepperStep>
      <StepperStep 
        label="Preferences" 
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 01-2.573 1.066c-1.543-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"></path></svg>'
      >
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Preferences</h3>
          <p class="mt-2">Set your preferences.</p>
        </div>
      </StepperStep>
      <StepperStep 
        label="Confirmation" 
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
      >
        <div class="p-4 mt-4 bg-surface dark:bg-surface rounded-lg">
          <h3 class="text-lg font-medium">Confirmation</h3>
          <p class="mt-2">Confirm your settings.</p>
        </div>
      </StepperStep>
    </Stepper>
  </div>

  <CodeBlock language="svelte">{`<Stepper>
  <StepperStep 
    label="Account" 
    icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'
  >
    <!-- Step content -->
  </StepperStep>
  <!-- Other steps -->
</Stepper>`}</CodeBlock>

  <h2>Stepper Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>activeStep</code></td>
        <td><code>number</code></td>
        <td><code>0</code></td>
        <td>Index of the active step</td>
      </tr>
      <tr>
        <td><code>orientation</code></td>
        <td><code>string</code></td>
        <td><code>"horizontal"</code></td>
        <td>Orientation of the stepper (horizontal, vertical)</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>string</code></td>
        <td><code>"md"</code></td>
        <td>Size of the stepper (sm, md, lg)</td>
      </tr>
      <tr>
        <td><code>variant</code></td>
        <td><code>string</code></td>
        <td><code>"primary"</code></td>
        <td>Visual style variant (default, primary, secondary, success, warning, error, info)</td>
      </tr>
      <tr>
        <td><code>linear</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether steps must be completed in sequence</td>
      </tr>
      <tr>
        <td><code>showLabels</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show step labels</td>
      </tr>
      <tr>
        <td><code>showConnectors</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show connectors between steps</td>
      </tr>
      <tr>
        <td><code>alternativeLabels</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to place labels below icons</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>StepperStep Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>label</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Text label for the step</td>
      </tr>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Custom icon (HTML or SVG string)</td>
      </tr>
      <tr>
        <td><code>optional</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Optional text to display below the label</td>
      </tr>
      <tr>
        <td><code>completed</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the step is completed</td>
      </tr>
      <tr>
        <td><code>active</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the step is active</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the step is disabled</td>
      </tr>
      <tr>
        <td><code>error</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the step has an error</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Stepper Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>change</code></td>
        <td><code>{`{ index: number }`}</code></td>
        <td>Fired when the active step changes</td>
      </tr>
    </tbody>
  </table>

  <h2>StepperStep Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>click</code></td>
        <td><code>{`{ index: number }`}</code></td>
        <td>Fired when a step is clicked</td>
      </tr>
    </tbody>
  </table>

  <h2>StepperStep Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>icon</code></td>
        <td>Custom icon content</td>
      </tr>
      <tr>
        <td><code>label</code></td>
        <td>Custom label content</td>
      </tr>
      <tr>
        <td>default</td>
        <td>Step content</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Stepper component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="tablist"</code> for the stepper container</li>
    <li>Uses <code>role="tab"</code> for step headers</li>
    <li>Uses <code>role="tabpanel"</code> for step content</li>
    <li>Proper <code>aria-selected</code>, <code>aria-controls</code>, and <code>aria-labelledby</code> attributes</li>
    <li>Supports keyboard navigation</li>
    <li>Provides visual indicators for active, completed, and error states</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus to the stepper</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on a step header, activates that step</td>
      </tr>
      <tr>
        <td><kbd>Left Arrow</kbd> or <kbd>Up Arrow</kbd></td>
        <td>Moves focus to the previous step</td>
      </tr>
      <tr>
        <td><kbd>Right Arrow</kbd> or <kbd>Down Arrow</kbd></td>
        <td>Moves focus to the next step</td>
      </tr>
      <tr>
        <td><kbd>Home</kbd></td>
        <td>Moves focus to the first step</td>
      </tr>
      <tr>
        <td><kbd>End</kbd></td>
        <td>Moves focus to the last step</td>
      </tr>
    </tbody>
  </table>
</Container>
