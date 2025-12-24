<!--
@component
Form documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Form from "$lib/components/Form/Form.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Button from "$lib/components/Button/Button.svelte"
import Input from "$lib/components/Form/Input.svelte"
import Checkbox from "$lib/components/Form/Checkbox.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Form</h1>
  
  <p>
    The Form component provides a comprehensive solution for creating accessible, styled forms with validation support.
    It handles form submission, validation, and provides context for form controls, making it easy to build complex forms
    with consistent behavior and styling.
  </p>

  <h2>Usage</h2>

  <h3>Basic Form</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
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

  <pre class="language-svelte"><code>{`<Form onsubmit={handleSubmit}>
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
</Form>`}</code></pre>

  <h3>Horizontal Layout</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
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

  <pre class="language-svelte"><code>{`<Form layout="horizontal">
  <FormField label="First Name" name="firstName">
    <Input placeholder="Enter first name" />
  </FormField>
  
  <FormField label="Last Name" name="lastName">
    <Input placeholder="Enter last name" />
  </FormField>
  
  <div class="col-span-12 col-start-4">
    <Button variant="primary" type="submit">Submit</Button>
  </div>
</Form>`}</code></pre>

  <h3>Form with Validation</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Form validate>
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
    </Form>
  </div>

  <pre class="language-svelte"><code>{`<Form validate oninvalid={handleInvalid} onsubmit={handleSubmit}>
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
</Form>`}</code></pre>

  <h3>Form States</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
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

  <pre class="language-svelte"><code>{`<!-- Disabled Form -->
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
</Form>`}</code></pre>

  <h2>Form Props</h2>
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
        <td><code>method</code></td>
        <td><code>string</code></td>
        <td><code>"post"</code></td>
        <td>Form method (get or post)</td>
      </tr>
      <tr>
        <td><code>action</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Form action URL</td>
      </tr>
      <tr>
        <td><code>validate</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to validate the form on submission</td>
      </tr>
      <tr>
        <td><code>useNativeValidation</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to use the browser's built-in validation UI</td>
      </tr>
      <tr>
        <td><code>layout</code></td>
        <td><code>"vertical" | "horizontal"</code></td>
        <td><code>"vertical"</code></td>
        <td>Layout direction</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to disable all form controls</td>
      </tr>
      <tr>
        <td><code>loading</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the form is in a loading state</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td><code>crypto.randomUUID()</code></td>
        <td>HTML id for accessibility</td>
      </tr>
    </tbody>
  </table>

  <h2>FormField Props</h2>
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
        <td><code>name</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Field name (used for form data)</td>
      </tr>
      <tr>
        <td><code>label</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Field label</td>
      </tr>
      <tr>
        <td><code>helpText</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Help text displayed below the field</td>
      </tr>
      <tr>
        <td><code>error</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Error message to display</td>
      </tr>
      <tr>
        <td><code>required</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the field is required</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the field is disabled</td>
      </tr>
      <tr>
        <td><code>hideLabel</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to hide the label visually (still accessible to screen readers)</td>
      </tr>
      <tr>
        <td><code>layout</code></td>
        <td><code>"vertical" | "horizontal"</code></td>
        <td><code>undefined</code></td>
        <td>Layout direction (overrides form layout)</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td><code>crypto.randomUUID()</code></td>
        <td>HTML id for accessibility</td>
      </tr>
    </tbody>
  </table>

  <h2>Form Events</h2>
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
        <td><code>submit</code></td>
        <td><code>{ data, formData, form }</code></td>
        <td>Fired when the form is submitted and validation passes</td>
      </tr>
      <tr>
        <td><code>invalid</code></td>
        <td><code>{ errors }</code></td>
        <td>Fired when the form is submitted but validation fails</td>
      </tr>
      <tr>
        <td><code>ready</code></td>
        <td><code>{ form }</code></td>
        <td>Fired when the form is initialized with the form API</td>
      </tr>
    </tbody>
  </table>

  <h2>Form API</h2>
  <p>
    The Form component exposes an API through the <code>ready</code> event that allows you to programmatically
    interact with the form:
  </p>

  <pre class="language-svelte"><code>{`<script>
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
</script>

<Form onready={handleFormReady}>
  <!-- Form fields -->
</Form>`}</code></pre>

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
