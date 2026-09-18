<!--
@component
FormBuilder documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormBuilder, * as FormBuilderModule from "$lib/components/Form/FormBuilder.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import { m } from "$lib/paraglide/messages.js"

/** Example OpenAPI schema covering every generated control type */
const petSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", title: "Pet name", description: "The pet's name" },
    email: { type: "string", format: "email", title: "Email" },
    kind: { type: "string", enum: ["dog", "cat", "bird"], title: "Kind of pet" },
    age: { type: "integer", minimum: 0, maximum: 30, title: "Age" },
    adopted: { type: "boolean", title: "Already adopted" },
    tags: { type: "array", items: { type: "string" }, title: "Tags" },
    address: {
      type: "object",
      title: "Address",
      properties: {
        street: { type: "string", title: "Street" },
        zip: { type: "string", title: "ZIP" },
      },
    },
  },
}

const json = (value: unknown): string => JSON.stringify(value, null, 2)
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("FormBuilder")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
    <h1>{m.fb_heading()}</h1>
  </div>

  <p>
    <strong>{m.fb_heading()}</strong>{m.fb_intro_1()}<a href="https://spec.openapis.org/oas/v3.0.3#schema-object">OpenAPI 3.0 Schema Object</a>{m.fb_intro_2()}<code>&lt;Form&gt;</code>{m.fb_intro_3()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.fb_what_1()}<code>FormField</code>{m.fb_what_2()}<code>Form</code>{m.fb_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.fb_when_1()}<code>Form</code>{m.fb_when_2()}<code>FormField</code>{m.fb_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.fb_why_singlesource()}</strong>{m.fb_why_singlesource_desc()}</li>
    <li><strong>{m.fb_why_construct()}</strong>{m.fb_why_construct_1()}<code>aria-required</code>{m.fb_why_construct_2()}</li>
    <li><strong>{m.fb_why_composable()}</strong>{m.fb_why_composable_desc()}</li>
  </ul>

  <h2>{m.fb_schema_mapping()}</h2>
  <p>{m.fb_schema_intro()}</p>
  <table>
    <thead><tr><th>{m.fb_th_schema()}</th><th>{m.fb_th_control()}</th></tr></thead>
    <tbody>
      <tr>
        <td><code>string</code></td>
        <td><code>TextInput</code>{m.fb_schema_string_1()}<code>format: email</code>{m.fb_schema_string_2()}<code>password</code>{m.fb_schema_string_3()}</td>
      </tr>
      <tr>
        <td><code>string</code>{m.fb_schema_stringenum_1()}<code>enum</code></td>
        <td><code>Select</code></td>
      </tr>
      <tr>
        <td><code>integer</code>{m.fb_schema_int_1()}<code>number</code></td>
        <td><code>NumberInput</code>{m.fb_schema_int_2()}<code>minimum</code>{m.fb_schema_int_3()}<code>maximum</code>{m.fb_schema_int_4()}<code>multipleOf</code>{m.fb_schema_int_5()}</td>
      </tr>
      <tr>
        <td><code>boolean</code></td>
        <td><code>Switch</code></td>
      </tr>
      <tr>
        <td><code>array</code></td>
        <td><code>ListInput</code>{m.fb_schema_array_1()}<code>Select multiple</code>{m.fb_schema_array_2()}<code>items.enum</code>{m.fb_schema_array_3()}</td>
      </tr>
      <tr>
        <td><code>object</code></td>
        <td>{m.fb_schema_object_1()}<code>&lt;fieldset&gt;</code>{m.fb_schema_object_2()}</td>
      </tr>
    </tbody>
  </table>
  <p>
    {m.fb_schema_meta_1()}<code>title</code>{m.fb_schema_meta_2()}<code>description</code>{m.fb_schema_meta_3()}<code>default</code>{m.fb_schema_meta_4()}<code>required</code>{m.fb_schema_meta_5()}
  </p>

  <h2>{m.fb_refs()}</h2>
  <p>
    {m.fb_refs_intro_1()}<code>components.schemas</code>{m.fb_refs_intro_2()}<code>components</code>{m.fb_refs_intro_3()}<code>$ref</code>{m.fb_refs_intro_4()}
  </p>
  <ul>
    <li><code>$ref</code>{m.fb_refs_list_ref_1()}<code>#/components/schemas/Pet</code>{m.fb_refs_list_ref_2()}</li>
    <li><code>allOf</code>{m.fb_refs_list_allof()}</li>
    <li><code>oneOf</code>{m.fb_refs_oneof_1()}<code>anyOf</code>{m.fb_refs_oneof_2()}</li>
  </ul>

  <h3>{m.fb_refs_allof_h()}</h3>
  <ExampleTabs
    code={`const components = {
  BasePet: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string", title: "Pet name" },
    },
  },
  Owner: {
    type: "object",
    properties: {
      fullName: { type: "string", title: "Owner name" },
    },
  },
}

<FormBuilder
  schema={{
    allOf: [
      { $ref: "#/components/schemas/BasePet" },
      {
        type: "object",
        required: ["kind"],
        properties: {
          kind: { type: "string", enum: ["dog", "cat"], title: "Kind of pet" },
          owner: { $ref: "#/components/schemas/Owner" },
        },
      },
    ],
  }}
  components={components}
/>`}
  >
    <div data-testid="formbuilder-refs">
      <FormBuilder
        schema={{
          allOf: [
            { $ref: "#/components/schemas/BasePet" },
            {
              type: "object",
              required: ["kind"],
              properties: {
                kind: { type: "string", enum: ["dog", "cat", "bird"], title: "Kind of pet" },
                owner: { $ref: "#/components/schemas/Owner" },
              },
            },
          ],
        }}
        components={{
          BasePet: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string", title: "Pet name" },
            },
          },
          Owner: {
            type: "object",
            properties: {
              fullName: { type: "string", title: "Owner name" },
            },
          },
        }}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.fb_ex_schema()}</h3>
  <ExampleTabs code={`<FormBuilder schema={petSchema} onsubmit={handleSubmit} />`}>
    <div data-testid="formbuilder-schema">
      <FormBuilder schema={petSchema} submitLabel="Create pet" />
    </div>
  </ExampleTabs>

  <h3>{m.fb_ex_fields()}</h3>
  <p>
    {m.fb_fields_1()}<code>fields</code>{m.fb_fields_2()}<code>schema</code>{m.fb_fields_3()}
  </p>
  <ExampleTabs code={`<FormBuilder\n  fields={[\n    { name: "username", label: "Username", type: "text", required: true },\n    { name: "role", label: "Role", type: "select", options: ["admin", "user"] },\n  ]}\n/>`}>
    <div data-testid="formbuilder-fields">
      <FormBuilder
        fields={[
          { name: "username", label: "Username", type: "text", required: true },
          { name: "role", label: "Role", type: "select", options: ["admin", "user", "viewer"] },
        ]}
      />
    </div>
  </ExampleTabs>

  <h3>{m.fb_ex_seeded()}</h3>
  <ExampleTabs code={`<FormBuilder schema={petSchema} values={{ name: "Luna", age: 4 }} />`}>
    <div data-testid="formbuilder-seeded">
      <FormBuilder schema={petSchema} values={{ name: "Luna", age: 4 }} />
    </div>
  </ExampleTabs>

  <h3>{m.fb_ex_nosubmit()}</h3>
  <ExampleTabs code={`<FormBuilder schema={petSchema} showSubmit={false} />`}>
    <div data-testid="formbuilder-no-submit">
      <FormBuilder schema={petSchema} showSubmit={false} />
    </div>
  </ExampleTabs>

  <h3>{m.fb_ex_submit()}</h3>
  <ExampleTabs
    code={`<FormBuilder\n  schema={petSchema}\n  onsubmit={(event) => {\n    console.log(event.detail.data)\n  }}\n/>`}
  >
    <div data-testid="formbuilder-submit">
      <FormBuilder
        schema={petSchema}
        values={{ name: "Rex", age: 3, kind: "dog", adopted: true }}
        onsubmit={(event) => {
          console.log("submitted:", json(event.detail.data))
        }}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={FormBuilderModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={FormBuilderModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.fb_a11y_1_1()}<code>FormField</code>{m.fb_a11y_1_2()}<code>&lt;label&gt;</code>{m.fb_a11y_1_3()}</li>
    <li>{m.fb_a11y_2_1()}<code>aria-required</code>{m.fb_a11y_2_2()}<code>aria-invalid</code>{m.fb_a11y_2_3()}<code>aria-live</code>{m.fb_a11y_2_4()}</li>
    <li>{m.fb_a11y_3_1()}<code>&lt;fieldset&gt;</code>{m.fb_a11y_3_2()}<code>&lt;legend&gt;</code>{m.fb_a11y_3_3()}</li>
    <li>{m.fb_a11y_4()}</li>
  </ul>

  <h2>{m.fb_limitations()}</h2>
  <ul>
    <li><code>oneOf</code>{m.fb_lim_1_1()}<code>anyOf</code>{m.fb_lim_1_2()}</li>
    <li>{m.fb_lim_2_1()}<code>$ref</code>{m.fb_lim_2_2()}<code>components</code>{m.fb_lim_2_3()}</li>
    <li>{m.fb_lim_3()}</li>
  </ul>
</Container>
