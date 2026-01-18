<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import Tag from "$lib/components/Tag/Tag.svelte"
import TagGroup from "$lib/components/Tag/TagGroup.svelte"

const { Story } = defineMeta({
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "error", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    dismissible: { control: "boolean" },
    outline: { control: "boolean" },
    pill: { control: "boolean" },
    clickable: { control: "boolean" },
    href: { control: "text" },
    target: {
      control: { type: "select" },
      options: ["_blank", "_self", "_parent", "_top"],
    },
    icon: { control: "text" },
    dismissAriaLabel: { control: "text" },
  },
  args: {
    variant: "default",
    size: "md",
    dismissible: false,
    outline: false,
    pill: false,
    clickable: false,
    href: "",
    target: "_blank",
    icon: "",
    dismissAriaLabel: "Dismiss",
  },
})

// Sample icons
const checkIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
const alertIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'
const infoIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
const codeIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>'
</script>

<Story name="Basic">
  <div class="flex flex-wrap gap-2">
    <Tag>Default</Tag>
    <Tag variant="primary">Primary</Tag>
    <Tag variant="secondary">Secondary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="error">Error</Tag>
    <Tag variant="info">Info</Tag>
  </div>
</Story>

<Story name="Sizes">
  <div class="flex flex-wrap items-center gap-2">
    <Tag size="sm">Small</Tag>
    <Tag size="md">Medium</Tag>
    <Tag size="lg">Large</Tag>
  </div>
</Story>

<Story name="Outline">
  <div class="flex flex-wrap gap-2">
    <Tag outline>Default</Tag>
    <Tag variant="primary" outline>Primary</Tag>
    <Tag variant="secondary" outline>Secondary</Tag>
    <Tag variant="success" outline>Success</Tag>
    <Tag variant="warning" outline>Warning</Tag>
    <Tag variant="error" outline>Error</Tag>
    <Tag variant="info" outline>Info</Tag>
  </div>
</Story>

<Story name="Pill">
  <div class="flex flex-wrap gap-2">
    <Tag pill>Default</Tag>
    <Tag variant="primary" pill>Primary</Tag>
    <Tag variant="secondary" pill>Secondary</Tag>
    <Tag variant="success" pill>Success</Tag>
    <Tag variant="warning" pill>Warning</Tag>
    <Tag variant="error" pill>Error</Tag>
    <Tag variant="info" pill>Info</Tag>
  </div>
</Story>

<Story name="With Icons">
  <div class="flex flex-wrap gap-2">
    <Tag variant="success" icon={checkIcon}>Completed</Tag>
    <Tag variant="warning" icon={alertIcon}>Warning</Tag>
    <Tag variant="info" icon={infoIcon}>Information</Tag>
    <Tag variant="primary" icon={codeIcon}>Code</Tag>
  </div>
</Story>

<Story name="Dismissible">
  <div class="flex flex-wrap gap-2">
    <Tag dismissible>Dismissible</Tag>
    <Tag variant="primary" dismissible>Primary</Tag>
    <Tag variant="success" dismissible icon={checkIcon}>Success</Tag>
    <Tag variant="warning" dismissible pill>Warning</Tag>
  </div>
</Story>

<Story name="Clickable">
  <div class="flex flex-wrap gap-2">
    <Tag clickable>Clickable</Tag>
    <Tag variant="primary" clickable>Primary</Tag>
    <Tag variant="secondary" clickable pill>Secondary</Tag>
  </div>
</Story>

<Story name="Links">
  <div class="flex flex-wrap gap-2">
    <Tag href="https://example.com" target="_blank">Link</Tag>
    <Tag variant="primary" href="https://example.com" target="_blank">Primary Link</Tag>
    <Tag variant="info" href="https://example.com" target="_blank" pill icon={infoIcon}>Info Link</Tag>
  </div>
</Story>

<Story name="Tag Group">
  <div class="space-y-4">
    <TagGroup>
      <Tag>JavaScript</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Svelte</Tag>
      <Tag>React</Tag>
      <Tag>Vue</Tag>
    </TagGroup>
    
    <TagGroup variant="primary">
      <Tag>Primary 1</Tag>
      <Tag>Primary 2</Tag>
      <Tag>Primary 3</Tag>
    </TagGroup>
    
    <TagGroup variant="success" pill>
      <Tag>Success 1</Tag>
      <Tag>Success 2</Tag>
      <Tag>Success 3</Tag>
    </TagGroup>
    
    <TagGroup variant="info" outline>
      <Tag>Info 1</Tag>
      <Tag>Info 2</Tag>
      <Tag>Info 3</Tag>
    </TagGroup>
    
    <TagGroup direction="vertical">
      <Tag variant="primary">Vertical 1</Tag>
      <Tag variant="secondary">Vertical 2</Tag>
      <Tag variant="success">Vertical 3</Tag>
    </TagGroup>
  </div>
</Story>

<Story name="Dynamic Tags">
  <div>
    <TagGroup 
      items={['JavaScript', 'TypeScript', 'Svelte', 'React', 'Vue']} 
      variant="primary"
      dismissible
      let:item
    >
      <Tag>{item}</Tag>
    </TagGroup>
  </div>
</Story>
