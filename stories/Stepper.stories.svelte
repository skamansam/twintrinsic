<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import Stepper from "$lib/components/Stepper/Stepper.svelte"
import StepperStep from "$lib/components/Stepper/StepperStep.svelte"

const { Story } = defineMeta({
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    activeStep: { control: "number" },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "error", "info"],
    },
    linear: { control: "boolean" },
    showLabels: { control: "boolean" },
    showConnectors: { control: "boolean" },
    alternativeLabels: { control: "boolean" },
  },
  args: {
    activeStep: 0,
    orientation: "horizontal",
    size: "md",
    variant: "primary",
    linear: true,
    showLabels: true,
    showConnectors: true,
    alternativeLabels: false,
  },
})
</script>

<Story name="Basic">
  <div class="w-full max-w-3xl mx-auto">
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
</Story>

<Story name="Vertical">
  <div class="w-full max-w-3xl mx-auto">
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
</Story>

<Story name="Non-Linear">
  <div class="w-full max-w-3xl mx-auto">
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
</Story>

<Story name="Alternative Labels">
  <div class="w-full max-w-3xl mx-auto">
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
</Story>

<Story name="With Icons">
  <div class="w-full max-w-3xl mx-auto">
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
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
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
</Story>
