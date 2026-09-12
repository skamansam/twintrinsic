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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.form_heading()}</h1>

  <p>
    <strong>{m.form_heading()}</strong>{m.form_lede_1()}<strong>{m.form_lede_2_component()}</strong>{m.form_lede_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    <code>&lt;Form&gt;</code>{m.form_what_1_2()}<code>&lt;FormField&gt;</code>{m.form_what_1_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.form_when_1()}<code>&lt;Form&gt;</code>{m.form_when_2()}<code>&lt;FormField&gt;</code>{m.form_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.form_why_consistency()}</strong>{m.form_why_consistency_1()}</li>
    <li><strong>{m.form_why_a11y()}</strong>{m.form_why_a11y_1_1()}<code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code>{m.form_why_a11y_2_1()}<code>aria-describedby</code>{m.form_why_a11y_2_2()}</li>
    <li><strong>{m.form_why_ergonomics()}</strong>{m.form_why_ergonomics_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form">MDN — form element</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid">MDN — :user-invalid</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.form_impl_1()}</li>
    <li>{m.form_impl_2()}</li>
    <li>{m.form_impl_3()}</li>
    <li>{m.form_impl_4()}</li>
    <li>{m.form_impl_5()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.form_mistake_1()}</li>
    <li>{m.form_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>{m.form_related_1()}</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.form_responsive_1()}</li>
    <li>{m.form_responsive_2_1()}<code>layout="horizontal"</code>{m.form_responsive_2_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.form_custom_1_1()}<code>vertical</code>{m.form_custom_1_2()}<code>horizontal</code>{m.form_custom_1_3()}</li>
    <li>{m.form_custom_2_1()}<code>disabled</code>{m.form_custom_2_2()}<code>loading</code>{m.form_custom_2_3()}<code>validate</code>{m.form_custom_2_4()}</li>
    <li>{m.form_custom_3_1()}<code>label</code>{m.form_custom_3_2()}<code>helpText</code>{m.form_custom_3_3()}<code>error</code>{m.form_custom_3_4()}<code>required</code>, <code>hideLabel</code>{m.form_custom_3_5()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.form_ex_basic()}</h3>
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

  <h3>{m.form_ex_horizontal()}</h3>
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

  <h3>{m.form_ex_states()}</h3>
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

  <h3>{m.form_ex_validation()}</h3>
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

  <h2>{m.form_props_form()}</h2>
  <PropsTable component={FormModule} />

  <h2>{m.form_props_formfield()}</h2>
  <PropsTable component={FormFieldModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={FormModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.form_a11y_1_1()}<code>for</code>/<code>id</code>{m.form_a11y_1_2()}</li>
    <li>{m.form_a11y_2_1()}<code>aria-required</code>{m.form_a11y_2_2()}</li>
    <li>{m.form_a11y_3_1()}<code>role="alert"</code>{m.form_a11y_3_2()}<code>aria-describedby</code>{m.form_a11y_3_3()}</li>
    <li>{m.form_a11y_4_1()}<code>aria-disabled</code>{m.form_a11y_4_2()}</li>
  </ul>
</Container>
