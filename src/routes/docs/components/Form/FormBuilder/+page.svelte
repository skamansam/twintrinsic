<!--
@component
FormBuilder documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormBuilder, * as FormBuilderModule from "$lib/components/Form/FormBuilder.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"

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
  <h1>FormBuilder</h1>

  <p>
    <strong>FormBuilder</strong> generates an accessible form from an
    <a href="https://spec.openapis.org/oas/v3.0.3#schema-object">OpenAPI 3.0 Schema Object</a>
    or an explicit field-descriptor array. It maps each schema property onto
    the matching Twintrinsic control, wires up labels, help text, and native
    validation, and renders everything inside a <code>&lt;Form&gt;</code> so
    submission "just works".
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A declarative form generator: give it a schema, get a complete,
    accessible form back. Every field gets a <code>FormField</code> wrapper
    (label, required indicator, help text, error styling), and the generated
    controls register with the <code>Form</code> context so native
    validation and the submit payload are handled for you.
  </p>

  <h3>When should I use it?</h3>
  <p>
    When your form's shape comes from data — an API contract, a config
    document, or a JSON schema your backend already publishes. For hand-crafted
    forms with bespoke layouts, compose <code>Form</code> +
    <code>FormField</code> + the individual controls directly instead.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Single source of truth</strong> — the schema drives the UI, so the form can never drift from the API contract.</li>
    <li><strong>Accessible by construction</strong> — labels, <code>aria-required</code>, and error wiring come from the field metadata automatically.</li>
    <li><strong>Composable</strong> — the generated controls are the same public components you'd write by hand.</li>
  </ul>

  <h2>Schema Mapping</h2>
  <p>The OpenAPI types map onto controls as follows:</p>
  <table>
    <thead><tr><th>Schema</th><th>Control</th></tr></thead>
    <tbody>
      <tr><td><code>string</code></td><td><code>TextInput</code> (<code>format: email</code> → email, <code>password</code> → password)</td></tr>
      <tr><td><code>string</code> + <code>enum</code></td><td><code>Select</code></td></tr>
      <tr><td><code>integer</code> / <code>number</code></td><td><code>NumberInput</code> (<code>minimum</code>/<code>maximum</code>/<code>multipleOf</code> → min/max/step)</td></tr>
      <tr><td><code>boolean</code></td><td><code>Switch</code></td></tr>
      <tr><td><code>array</code></td><td><code>ListInput</code> (or <code>Select multiple</code> when <code>items.enum</code> is present)</td></tr>
      <tr><td><code>object</code></td><td>Nested <code>&lt;fieldset&gt;</code> group</td></tr>
    </tbody>
  </table>
  <p>
    <code>title</code> → label (falling back to a humanized property name),
    <code>description</code> → help text, <code>default</code> → initial
    value, and the <code>required</code> list → required markers.
  </p>

  <h2>References &amp; Composition</h2>
  <p>
    Pass the OpenAPI document's <code>components.schemas</code> map via the
    <code>components</code> prop to resolve <code>$ref</code>s. The resolver
    also handles the composition keywords:
  </p>
  <ul>
    <li><code>$ref</code> — JSON-pointer references (<code>#/components/schemas/Pet</code>) are followed, including nested paths; unresolvable or circular references degrade to a plain text field instead of failing.</li>
    <li><code>allOf</code> — subschemas are merged into one field set (properties, required list, bounds, enum).</li>
    <li><code>oneOf</code> / <code>anyOf</code> — the first variant with a concrete type is rendered.</li>
  </ul>

  <h3>References &amp; allOf</h3>
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

  <h2>Examples</h2>

  <h3>From an OpenAPI Schema</h3>
  <ExampleTabs code={`<FormBuilder schema={petSchema} onsubmit={handleSubmit} />`}>
    <div data-testid="formbuilder-schema">
      <FormBuilder schema={petSchema} submitLabel="Create pet" />
    </div>
  </ExampleTabs>

  <h3>Field Descriptors</h3>
  <p>
    Prefer explicit control? Pass a <code>fields</code> array — it takes
    precedence over <code>schema</code>:
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

  <h3>Seeded Values</h3>
  <ExampleTabs code={`<FormBuilder schema={petSchema} values={{ name: "Luna", age: 4 }} />`}>
    <div data-testid="formbuilder-seeded">
      <FormBuilder schema={petSchema} values={{ name: "Luna", age: 4 }} />
    </div>
  </ExampleTabs>

  <h3>Without a Submit Button</h3>
  <ExampleTabs code={`<FormBuilder schema={petSchema} showSubmit={false} />`}>
    <div data-testid="formbuilder-no-submit">
      <FormBuilder schema={petSchema} showSubmit={false} />
    </div>
  </ExampleTabs>

  <h3>Submit Handler</h3>
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

  <h2>Props</h2>
  <PropsTable component={FormBuilderModule} />

  <h2>Events</h2>
  <EventsTable component={FormBuilderModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Every generated field is wrapped in a <code>FormField</code> with a real <code>&lt;label&gt;</code> targeting the control.</li>
    <li>Required fields get <code>aria-required</code> and a visible asterisk; error states apply <code>aria-invalid</code> + an <code>aria-live</code> message.</li>
    <li>Object groups render as semantic <code>&lt;fieldset&gt;</code>/<code>&lt;legend&gt;</code> so nested fields are announced as a group.</li>
    <li>Native validation means keyboard and screen-reader behavior matches the platform.</li>
  </ul>

  <h2>Limitations</h2>
  <ul>
    <li><code>oneOf</code>/<code>anyOf</code> render the first concrete variant rather than a discriminator-driven choice.</li>
    <li>Relative external <code>$ref</code>s (files/URLs) are not fetched — provide them via <code>components</code>.</li>
    <li>For deeply custom layouts, compose the controls directly instead.</li>
  </ul>
</Container>