import Accordion from '../lib/components/Panel/Accordion.svelte';
import Panel from '../lib/components/Panel/Panel.svelte';

export default {
  title: 'Components/Panel/Accordion',
  component: Accordion,
  argTypes: {
    multiple: { control: 'boolean' },
    dividers: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
};

const Template = (args) => ({
  Component: Accordion,
  props: args
});

export const Default = Template.bind({});
Default.args = {
  children: () => `
    <Panel>
      <svelte:fragment slot="header">Section 1</svelte:fragment>
      <div class="p-4">
        <p>Content for section 1</p>
      </div>
    </Panel>
    <Panel>
      <svelte:fragment slot="header">Section 2</svelte:fragment>
      <div class="p-4">
        <p>Content for section 2</p>
      </div>
    </Panel>
    <Panel>
      <svelte:fragment slot="header">Section 3</svelte:fragment>
      <div class="p-4">
        <p>Content for section 3</p>
      </div>
    </Panel>
  `
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  children: () => `
    <Panel>
      <svelte:fragment slot="header">Multiple 1</svelte:fragment>
      <div class="p-4">
        <p>Multiple sections can be expanded at once</p>
      </div>
    </Panel>
    <Panel>
      <svelte:fragment slot="header">Multiple 2</svelte:fragment>
      <div class="p-4">
        <p>Try expanding this while the other is open</p>
      </div>
    </Panel>
  `
};

export const WithoutDividers = Template.bind({});
WithoutDividers.args = {
  dividers: false,
  children: () => `
    <Panel>
      <svelte:fragment slot="header">No Dividers 1</svelte:fragment>
      <div class="p-4">
        <p>This accordion has no dividers between panels</p>
      </div>
    </Panel>
    <Panel>
      <svelte:fragment slot="header">No Dividers 2</svelte:fragment>
      <div class="p-4">
        <p>Notice the clean look without separators</p>
      </div>
    </Panel>
  `
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: () => `
    <Panel>
      <svelte:fragment slot="header">Disabled 1</svelte:fragment>
      <div class="p-4">
        <p>This accordion is fully disabled</p>
      </div>
    </Panel>
    <Panel>
      <svelte:fragment slot="header">Disabled 2</svelte:fragment>
      <div class="p-4">
        <p>None of the panels can be interacted with</p>
      </div>
    </Panel>
  `
};
