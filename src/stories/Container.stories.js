import Container from '$lib/components/Container/Container.svelte';

export default {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    fluid: {
      control: 'boolean',
      description: 'Makes the container full-width',
      defaultValue: false
    },
    as: {
      control: 'select',
      options: ['div', 'main', 'section', 'article'],
      description: 'HTML element to render',
      defaultValue: 'div'
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    role: {
      control: 'text',
      description: 'ARIA role'
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label'
    }
  }
};

// Default container
export const Default = {
  args: {
    fluid: false,
    class: 'bg-surface p-4'
  },
  render: (args) => ({
    Component: Container,
    props: args,
    template: `
      <Container {...args}>
        <div class="p-4 bg-primary-100 dark:bg-primary-800 rounded">
          <h2 class="text-lg font-semibold text-text dark:text-text-muted">Container Content</h2>
          <p class="mt-2 text-text-muted">This is a basic container example with some content.</p>
        </div>
      </Container>
    `
  })
};

// Fluid container
export const Fluid = {
  args: {
    fluid: true,
    class: 'bg-surface p-4'
  }
};

// As main element
export const AsMain = {
  args: {
    as: 'main',
    role: 'main',
    ariaLabel: 'Main content',
    class: 'bg-surface p-4'
  }
};
