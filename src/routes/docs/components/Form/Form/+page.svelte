<!--
@component
Form documentation page
-->

<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
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
    The Form component provides a comprehensive solution for creating accessible, styled forms with validation support.
    It handles form submission, validation, and provides context for form controls, making it easy to build complex forms
    with consistent behavior and styling.
  </p>

  <h2>Usage</h2>

  <h3>Basic Form</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="form-basic">
    <Form>
      <FormField label="Username" name="username" required>
        <Input placeholder="Enter username" />
      </FormField>
      
      <FormField label="Email" name="email" required helpText="We'll never share your email">
        <Input type="email" placeholder="Enter email" />
      </FormField>
      
      <FormField>
        <Checkbox label="Remember me" name="remember" />
      </FormField>
      
      <div class="mt-4">
        <Button variant="primary" type="submit">Submit</Button>
      </div>
    </Form>
  </div>

  <CodeBlock language="svelte">{`<Form onsubmit={handleSubmit}>
  <FormField label="Username" name="username" required>
    <Input placeholder="Enter username" />
  </FormField>
  
  <FormField label="Email" name="email" required helpText="We'll never share your email">
    <Input type="email" placeholder="Enter email" />
  </FormField>
  
  <FormField>
    <Checkbox label="Remember me" name="remember" />
  </FormField>
  
  <div class="mt-4">
    <Button variant="primary" type="submit">Submit</Button>
  </div>
</Form>`}</CodeBlock>

  <h3>Horizontal Layout</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="form-horizontal">
    <Form layout="horizontal">
      <FormField label="First Name" name="firstName">
        <Input placeholder="Enter first name" />
      </FormField>
      
      <FormField label="Last Name" name="lastName">
        <Input placeholder="Enter last name" />
      </FormField>
      
      <div class="col-span-12 col-start-4">
        <Button variant="primary" type="submit">Submit</Button>
      </div>
    </Form>
  </div>

  <CodeBlock language="svelte">{`<Form layout="horizontal">
  <FormField label="First Name" name="firstName">
    <Input placeholder="Enter first name" />
  </FormField>
  
  <FormField label="Last Name" name="lastName">
    <Input placeholder="Enter last name" />
  </FormField>
  
  <div class="col-span-12 col-start-4">
    <Button variant="primary" type="submit">Submit</Button>
  </div>
</Form>`}</CodeBlock>

  <h3>Form with Validation</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="form-validation">
    <Form validate>
      <FormField label="Username" name="username" required helpText="Username must be at least 3 characters">
        <Input placeholder="Enter username" minlength={3} />
      </FormField>
      
      <FormField label="Email" name="email" required>
        <Input type="email" placeholder="Enter email" />
      </FormField>
      
      <FormField label="Password" name="password" required helpText="Password must be at least 8 characters">
        <Input type="password" placeholder="Enter password" minlength={8} />
      </FormField>
      
      <div class="mt-4">
        <Button variant="primary" type="submit">Register</Button>
      </div>
    </Form>
  </div>

  <CodeBlock language="svelte">{`<Form validate oninvalid={handleInvalid} onsubmit={handleSubmit}>
  <FormField label="Username" name="username" required helpText="Username must be at least 3 characters">
    <Input placeholder="Enter username" minlength="3" />
  </FormField>
  
  <FormField label="Email" name="email" required>
    <Input type="email" placeholder="Enter email" />
  </FormField>
  
  <FormField label="Password" name="password" required helpText="Password must be at least 8 characters">
    <Input type="password" placeholder="Enter password" minlength="8" />
  </FormField>
  
  <div class="mt-4">
    <Button variant="primary" type="submit">Register</Button>
  </div>
</Form>`}</CodeBlock>

  <h3>Form States</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="form-states">
    <Form disabled>
      <FormField label="Username" name="username">
        <Input placeholder="Enter username" />
      </FormField>
      
      <FormField label="Email" name="email">
        <Input type="email" placeholder="Enter email" />
      </FormField>
      
      <div class="mt-4">
        <Button variant="primary" type="submit">Submit</Button>
      </div>
    </Form>
    
    <div class="mt-6">
      <Form loading>
        <FormField label="Username" name="username">
          <Input placeholder="Enter username" />
        </FormField>
        
        <FormField label="Email" name="email">
          <Input type="email" placeholder="Enter email" />
        </FormField>
        
        <div class="mt-4">
          <Button variant="primary" type="submit" loading>Submit</Button>
        </div>
      </Form>
    </div>
  </div>

  <CodeBlock language="svelte">{`<!-- Disabled Form -->
<Form disabled>
  <FormField label="Username" name="username">
    <Input placeholder="Enter username" />
  </FormField>
  
  <FormField label="Email" name="email">
    <Input type="email" placeholder="Enter email" />
  </FormField>
  
  <div class="mt-4">
    <Button variant="primary" type="submit">Submit</Button>
  </div>
</Form>

<!-- Loading Form -->
<Form loading>
  <FormField label="Username" name="username">
    <Input placeholder="Enter username" />
  </FormField>
  
  <FormField label="Email" name="email">
    <Input type="email" placeholder="Enter email" />
  </FormField>
  
  <div class="mt-4">
    <Button variant="primary" type="submit" loading>Submit</Button>
  </div>
</Form>`}</CodeBlock>

  <h2>Form Props</h2>
  <PropsTable component={FormModule} />

  <h2>FormField Props</h2>
  <PropsTable component={FormFieldModule} />

  <h2>Form Events</h2>
  <EventsTable component={FormModule} />

  <h2>Form API</h2>
  <p>
    The Form component exposes an API through the <code>ready</code> event that allows you to programmatically
    interact with the form:
  </p>

  <CodeBlock language="svelte">{`\u003Cscript>
  let formApi;

  function handleFormReady(event) {
    formApi = event.detail.form;
  }

  function resetForm() {
    formApi.reset();
  }

  function validateForm() {
    const isValid = formApi.validate();
    console.log('Form is valid:', isValid);
  }

  function setFormValues() {
    formApi.setValues({
      username: 'johndoe',
      email: 'john@example.com'
    });
  }

  function getFormValues() {
    const values = formApi.getValues();
    console.log('Form values:', values);
  }

  function setFormErrors() {
    formApi.setErrors({
      username: 'Username already taken'
    });
  }

  function clearFormErrors() {
    formApi.clearErrors();
  }
\u003C/script>

<Form onready={handleFormReady}>
  <!-- Form fields -->
</Form>`}</CodeBlock>

  <h2>Accessibility</h2>
  <p>
    The Form and FormField components follow accessibility best practices:
  </p>
  <ul>
    <li>Form fields are properly associated with their labels using <code>for</code> and <code>id</code> attributes</li>
    <li>Required fields are marked with both visual indicators and <code>aria-required</code> attributes</li>
    <li>Error messages are announced to screen readers using <code>role="alert"</code></li>
    <li>Help text and error messages are associated with their fields using <code>aria-describedby</code></li>
    <li>Disabled state is properly communicated with <code>aria-disabled</code> attributes</li>
    <li>Labels can be visually hidden while remaining accessible to screen readers</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Always provide clear, descriptive labels for form fields</li>
    <li>Use help text to provide additional context or requirements</li>
    <li>Group related form fields together logically</li>
    <li>Provide clear error messages that explain how to fix the issue</li>
    <li>Use the appropriate input types for different kinds of data</li>
    <li>Consider using the horizontal layout for forms with shorter fields and clear labels</li>
    <li>Always provide visual feedback when a form is submitting or loading</li>
  </ul>
</Container>
