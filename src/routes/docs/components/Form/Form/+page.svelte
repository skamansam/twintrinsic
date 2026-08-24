<!--
@component
Form documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Checkbox from "$lib/components/Form/Checkbox.svelte"
import Form from "$lib/components/Form/Form.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Input from "$lib/components/Form/Input.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FormModule from "$lib/components/Form/Form.svelte"
import * as FormFieldModule from "$lib/components/Form/FormField.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Form</h1>

  <p>
    <strong>Form</strong> is a container component that provides form submission,
    validation, layout, and state management. <strong>FormField</strong> wraps
    individual inputs with labels, help text, and error messages.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    <code>&lt;Form&gt;</code> handles submission, validation, disabled/loading states,
    and layout (vertical or horizontal). <code>&lt;FormField&gt;</code> wraps each
    input with a label, help text, error message, and required indicator.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Wrap every form in <code>&lt;Form&gt;</code>. Wrap every input in
    <code>&lt;FormField&gt;</code> — even simple fields benefit from consistent
    label positioning and error display.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Consistency</strong> — all forms share the same validation, error display, and layout.</li>
    <li><strong>Accessibility</strong> — <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code>
      for groups, <code>aria-describedby</code> for error messages.</li>
    <li><strong>Developer ergonomics</strong> — programmatic API for reset, validate, setValues, setErrors.</li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Vertical layout (default) stacks fields vertically.</li>
    <li>Horizontal layout (<code>layout="horizontal"</code>) places labels beside inputs on desktop, stacks on mobile.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Layout: <code>vertical</code> (default) or <code>horizontal</code>.</li>
    <li>States: <code>disabled</code>, <code>loading</code>, <code>validate</code>.</li>
    <li>FormField: <code>label</code>, <code>helpText</code>, <code>error</code>, <code>required</code>, <code>hideLabel</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Form</h3>
  <ExampleTabs code={`<Form>
  <FormField label="Username" name="username" required>
    <Input placeholder="Enter username" />
  </FormField>
  <FormField label="Email" name="email" required helpText="We'll never share your email">
    <Input type="email" placeholder="Enter email" />
  </FormField>
  <FormField>
    <Checkbox label="Remember me" name="remember" />
  </FormField>
  <Button variant="primary" type="submit">Submit</Button>
</Form>`}>
    <div class="max-w-md p-4 bg-surface rounded-md" data-testid="form-basic">
      <Form>
        <FormField label="Username" name="username" required><Input placeholder="Enter username" /></FormField>
        <FormField label="Email" name="email" required helpText="We'll never share your email"><Input type="email" placeholder="Enter email" /></FormField>
        <FormField><Checkbox label="Remember me" name="remember" /></FormField>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  </ExampleTabs>

  <h3>Horizontal Layout</h3>
  <ExampleTabs code={`<Form layout="horizontal">
  <FormField label="First Name" name="firstName">
    <Input placeholder="Enter first name" />
  </FormField>
  <FormField label="Last Name" name="lastName">
    <Input placeholder="Enter last name" />
  </FormField>
  <Button variant="primary" type="submit">Submit</Button>
</Form>`}>
    <div class="max-w-md p-4 bg-surface rounded-md" data-testid="form-horizontal">
      <Form layout="horizontal">
        <FormField label="First Name" name="firstName"><Input placeholder="Enter first name" /></FormField>
        <FormField label="Last Name" name="lastName"><Input placeholder="Enter last name" /></FormField>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  </ExampleTabs>

  <h3>Form States</h3>
  <ExampleTabs code={`<Form >
  <FormField label="Username"><Input name="username" /></FormField>
  <Button type="submit">Submit</Button>
</Form>`}>
    <div class="max-w-md" data-testid="form-states">
      <Form >
        <FormField label="Username"><Input name="username" /></FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  </ExampleTabs>

  <h3>Validation</h3>
  <ExampleTabs code={`<Form >
  <FormField label="Username" required><Input name="username" required /></FormField>
  <Button type="submit">Submit</Button>
</Form>`}>
    <div class="max-w-md" data-testid="form-validation">
      <Form >
        <FormField label="Username" required><Input name="username" required /></FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  </ExampleTabs>

  <h2>Form Props</h2>
  <PropsTable component={FormModule} />

  <h2>FormField Props</h2>
  <PropsTable component={FormFieldModule} />

  <h2>Events</h2>
  <EventsTable component={FormModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Labels associated via <code>for</code>/<code>id</code>.</li>
    <li>Required fields use <code>aria-required</code>.</li>
    <li>Error messages use <code>role="alert"</code> and <code>aria-describedby</code>.</li>
    <li>Disabled state communicated via <code>aria-disabled</code>.</li>
  </ul>
</Container>
