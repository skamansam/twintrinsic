import { expect } from '@storybook/test';
import Separator from '$lib/components/Separator/Separator.svelte';

export default {
  title: 'Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Whether the separator should be vertical',
      defaultValue: false
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: 'Color variant of the separator',
      defaultValue: 'default'
    },
    as: {
      control: 'select',
      options: ['div', 'hr'],
      description: 'HTML element to render',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label'
    }
  }
};

// Basic horizontal separator
export const Default = {
  args: {},
  render: (args) => ({
    Component: Separator,
    props: args
  }),
  play: async ({ canvasElement }) => {
    const separator = canvasElement.querySelector('hr');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  }
};

// Separator with text
export const WithText = {
  args: {
    class: 'max-w-sm'
  },
  render: (args) => ({
    Component: Separator,
    props: args,
    template: `
      <div class="space-y-4">
        <Separator {...args}>or</Separator>
        <Separator {...args}>
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Featured
        </Separator>
      </div>
    `
  })
};

// Vertical separator
export const Vertical = {
  args: {
    vertical: true
  },
  render: (args) => ({
    Component: Separator,
    props: args,
    template: `
      <div class="h-32 flex items-center">
        <span>Left</span>
        <Separator {...args} />
        <span>Right</span>
      </div>
    `
  })
};

// Vertical with content
export const VerticalWithContent = {
  args: {
    vertical: true
  },
  render: (args) => ({
    Component: Separator,
    props: args,
    template: `
      <div class="h-32 flex items-center">
        <span>Section 1</span>
        <Separator {...args}>
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </Separator>
        <span>Section 2</span>
      </div>
    `
  })
};

// Color variants
export const Colors = {
  render: (args) => ({
    Component: Separator,
    props: args,
    template: `
      <div class="space-y-4">
        <Separator color="default">Default</Separator>
        <Separator color="primary">Primary</Separator>
        <Separator color="success">Success</Separator>
        <Separator color="warning">Warning</Separator>
        <Separator color="error">Error</Separator>
      </div>
    `
  })
};
