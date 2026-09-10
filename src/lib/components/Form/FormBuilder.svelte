<!--
@component
FormBuilder - Generates an accessible form from an OpenAPI 3.0 schema or an
explicit field-descriptor array.

Maps schema types onto Twintrinsic form controls: string -> TextInput
(email/password via `format`), enum -> Select, integer/number ->
NumberInput, boolean -> Switch, array -> ListInput (or a multi-select when
the items are enumerated), object -> a nested fieldset group. Required
fields, descriptions, defaults, and numeric bounds all flow through to the
generated controls, and the whole thing renders inside a `<Form>` so
native validation and the submit payload work out of the box.

Usage:
```svelte
<FormBuilder schema={petSchema} onsubmit={handleSubmit} />
```
-->
<script module lang="ts">
  export const propsMetadata = [
    { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
    { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
    { name: "schema", type: "OpenApiSchema", description: "OpenAPI 3.0 Schema Object (type/properties/required/enum/format)", optional: true },
    { name: "fields", type: "FormFieldDescriptor[]", description: "Explicit field descriptors (takes precedence over `schema`)", optional: true },
    { name: "values", type: "Record<string, unknown>", description: "Initial values used to seed the generated controls", default: "{}", optional: true },
    { name: "submitLabel", type: "string", description: "Text for the submit button", default: "\"Submit\"", optional: true },
    { name: "showSubmit", type: "boolean", description: "Whether to render the submit button", default: "true", optional: true },
    { name: "layout", type: "\"vertical\" | \"horizontal\"", description: "Layout direction passed to the Form", default: "\"vertical\"", optional: true },
    { name: "onsubmit", type: "(event: CustomEvent<{ data: Record<string, unknown>; formData: FormData; form: HTMLFormElement }>) => void", description: "Submit event with the collected form data", optional: true, eventDetail: "{ data: Record<string, unknown" },
    { name: "onchange", type: "(event: CustomEvent<{ name: string; value: unknown }>) => void", description: "Change event fired when a generated field updates", optional: true, eventDetail: "{ name: string; value: unknown }" },
  ];

  /** A single generated form field (can nest `children` for objects) */
  export interface FormFieldDescriptor {
    /** Field name (form key) */
    name: string;
    /** Human-readable label */
    label?: string;
    /** Which control to render */
    type: "text" | "email" | "password" | "number" | "boolean" | "select" | "array" | "object";
    /** Options for `select` (strings or { label, value } pairs) */
    options?: Array<string | { label: string; value: string }>;
    /** Placeholder text */
    placeholder?: string;
    /** Help text shown under the field */
    helpText?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Minimum value (number fields) */
    min?: number;
    /** Maximum value (number fields) */
    max?: number;
    /** Step increment (number fields) */
    step?: number;
    /** Default value */
    default?: unknown;
    /** Nested fields for `object` type */
    children?: FormFieldDescriptor[];
  }

  /** A pragmatic OpenAPI 3.0 Schema Object subset used for generation */
  export interface OpenApiSchema {
    /** The property type (string, integer, number, boolean, array, object) */
    type?: string;
    /** Display title used as the field label */
    title?: string;
    /** Description used as help text */
    description?: string;
    /** Default value */
    default?: unknown;
    /** Allowed values (drives a Select) */
    enum?: string[];
    /** String format hint (email, password, date-time, ...) */
    format?: string;
    /** Minimum value for numeric types */
    minimum?: number;
    /** Maximum value for numeric types */
    maximum?: number;
    /** Step for numeric types */
    multipleOf?: number;
    /** Property names that are required */
    required?: string[];
    /** Object properties */
    properties?: Record<string, OpenApiSchema>;
    /** Item schema for array types */
    items?: OpenApiSchema;
  }
</script>

<script lang="ts">
  import Button from "../Button/Button.svelte"
  import Form from "./Form.svelte"
  import FormField from "./FormField.svelte"
  import ListInput from "./ListInput.svelte"
  import NumberInput from "./NumberInput.svelte"
  import Select from "./Select.svelte"
  import Switch from "./Switch.svelte"
  import TextInput from "./TextInput.svelte"

  interface Props {
    /** Additional CSS classes */
    class?: string;
    /** HTML id for accessibility */
    id?: string;
    /** OpenAPI 3.0 Schema Object (type/properties/required/enum/format) */
    schema?: OpenApiSchema;
    /** Explicit field descriptors (takes precedence over `schema`) */
    fields?: FormFieldDescriptor[];
    /** Initial values used to seed the generated controls */
    values?: Record<string, unknown>;
    /** Text for the submit button */
    submitLabel?: string;
    /** Whether to render the submit button */
    showSubmit?: boolean;
    /** Layout direction passed to the Form */
    layout?: "vertical" | "horizontal";
    /** Submit event with the collected form data */
    onsubmit?: (event: CustomEvent<{ data: Record<string, unknown>; formData: FormData; form: HTMLFormElement }>) => void;
    /** Change event fired when a generated field updates */
    onchange?: (event: CustomEvent<{ name: string; value: unknown }>) => void;
    /** Additional props passed through to the root element */
    [key: `data-${string}`]: unknown;
    [key: `aria-${string}`]: string | undefined;
  }

  let {
    class: className = "",
    id = crypto.randomUUID(),
    schema = undefined,
    fields = undefined,
    values = {},
    submitLabel = "Submit",
    showSubmit = true,
    layout = "vertical",
    onsubmit = undefined,
    onchange = undefined,
    ...restProps
  }: Props = $props()

  /** Humanize a camelCase/snake_case property name into a label */
  function humanize(name: string): string {
    return name
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  /** Convert an OpenAPI Schema Object into field descriptors */
  function descriptorsFromSchema(schemaObject: OpenApiSchema): FormFieldDescriptor[] {
    const properties = schemaObject.properties ?? {}
    const requiredSet = new Set(schemaObject.required ?? [])
    return Object.entries(properties).map(([name, property]) => {
      const descriptor: FormFieldDescriptor = {
        name,
        label: property.title ?? humanize(name),
        helpText: property.description,
        required: requiredSet.has(name),
        default: property.default,
        type: "text",
      }

      if (property.enum) {
        descriptor.type = "select"
        descriptor.options = property.enum
      } else if (property.type === "string") {
        descriptor.type = property.format === "email" ? "email" : property.format === "password" ? "password" : "text"
        descriptor.placeholder = property.format === "date-time" ? "YYYY-MM-DDTHH:mm" : undefined
      } else if (property.type === "integer" || property.type === "number") {
        descriptor.type = "number"
        descriptor.min = property.minimum
        descriptor.max = property.maximum
        descriptor.step = property.multipleOf
      } else if (property.type === "boolean") {
        descriptor.type = "boolean"
      } else if (property.type === "array") {
        descriptor.type = "array"
        if (property.items?.enum) descriptor.options = property.items.enum
      } else if (property.type === "object") {
        descriptor.type = "object"
        descriptor.children = descriptorsFromSchema(property)
      }

      return descriptor
    })
  }

  /** The effective descriptors (explicit `fields` win over `schema`) */
  const descriptors = $derived(fields ?? (schema ? descriptorsFromSchema(schema) : []))

  /** Initial value for a field: seeded from `values`, else the default */
  function initialValue(descriptor: FormFieldDescriptor): unknown {
    if (descriptor.name in values) return values[descriptor.name]
    return descriptor.default
  }

  /** Normalize select options into { label, value } pairs */
  function normalizeOptions(options: Array<string | { label: string; value: string }>): Array<{ label: string; value: string }> {
    return options.map((option) =>
      typeof option === "string" ? { label: option, value: option } : option
    )
  }

  /** Report a field change up to the consumer */
  function handleFieldChange(name: string, value: unknown): void {
    onchange?.(new CustomEvent("change", { detail: { name, value } }))
  }
</script>

{#snippet renderField(descriptor: FormFieldDescriptor)}
  {#if descriptor.type === "object"}
    <fieldset class="form-builder-group">
      <legend class="form-builder-group-legend">{descriptor.label}</legend>
      {#if descriptor.helpText}
        <p class="form-builder-group-help">{descriptor.helpText}</p>
      {/if}
      {#each descriptor.children ?? [] as child}
        {@render renderField(child)}
      {/each}
    </fieldset>
  {:else if descriptor.type === "boolean"}
    <FormField
      name={descriptor.name}
      label={descriptor.label}
      required={descriptor.required}
      helpText={descriptor.helpText}
    >
      <Switch
        name={descriptor.name}
        checked={initialValue(descriptor) === true}
        onchange={(event) => handleFieldChange(descriptor.name, event.detail.checked)}
      />
    </FormField>
  {:else if descriptor.type === "number"}
    <FormField
      name={descriptor.name}
      label={descriptor.label}
      required={descriptor.required}
      helpText={descriptor.helpText}
    >
      <NumberInput
        name={descriptor.name}
        value={initialValue(descriptor) as number | undefined}
        min={descriptor.min}
        max={descriptor.max}
        step={descriptor.step}
        oninput={(event) => handleFieldChange(descriptor.name, event.detail.value)}
      />
    </FormField>
  {:else if descriptor.type === "select"}
    <FormField
      name={descriptor.name}
      label={descriptor.label}
      required={descriptor.required}
      helpText={descriptor.helpText}
    >
      <Select
        name={descriptor.name}
        options={descriptor.options ? normalizeOptions(descriptor.options) : []}
        value={initialValue(descriptor) as string | undefined}
        onchange={(event) => handleFieldChange(descriptor.name, event.detail.value)}
      />
    </FormField>
  {:else if descriptor.type === "array"}
    <FormField
      name={descriptor.name}
      label={descriptor.label}
      required={descriptor.required}
      helpText={descriptor.helpText}
    >
      {#if descriptor.options}
        <Select
          name={descriptor.name}
          multiple
          options={normalizeOptions(descriptor.options)}
          onchange={(event) => handleFieldChange(descriptor.name, event.detail.value)}
        />
      {:else}
        <ListInput
          name={descriptor.name}
          values={(initialValue(descriptor) as string[] | undefined) ?? []}
          onchange={(event: CustomEvent) => handleFieldChange(descriptor.name, (event.detail as { values: string[] }).values)}
        />
      {/if}
    </FormField>
  {:else}
    <FormField
      name={descriptor.name}
      label={descriptor.label}
      required={descriptor.required}
      helpText={descriptor.helpText}
    >
      <TextInput
        name={descriptor.name}
        type={descriptor.type}
        value={(initialValue(descriptor) as string | undefined) ?? ""}
        placeholder={descriptor.placeholder}
        oninput={(event) => handleFieldChange(descriptor.name, event.detail.value)}
      />
    </FormField>
  {/if}
{/snippet}

<Form
  {...restProps}
  {id}
  class="form-builder {className}"
  {layout}
  {onsubmit}
>
  {#each descriptors as descriptor}
    {@render renderField(descriptor)}
  {/each}

  {#if showSubmit}
    <Button type="submit">{submitLabel}</Button>
  {/if}
</Form>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .form-builder-group {
    @apply border border-border rounded-lg p-4 space-y-5 w-full;
  }

  .form-builder-group-legend {
    @apply text-sm font-semibold text-text px-1;
  }

  .form-builder-group-help {
    @apply text-xs text-muted mb-3;
  }
</style>