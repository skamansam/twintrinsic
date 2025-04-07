import Input from '../lib/components/Form/Input.svelte';

export default {
  title: 'Components/Form/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url']
    },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    floating: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    helpText: { control: 'text' },
    leftIcon: { control: 'text' },
    rightIcon: { control: 'text' },
    mask: { control: 'text' }
  }
};

export const Default = {
  args: {
    label: 'Username',
    placeholder: 'Enter username'
  }
};

export const WithIcons = {
  args: {
    label: 'Password',
    type: 'password',
    leftIcon: 'lock',
    rightIcon: 'eye',
    placeholder: 'Enter password'
  }
};

export const FloatingLabel = {
  args: {
    label: 'Email',
    type: 'email',
    floating: true,
    placeholder: 'Enter email'
  }
};

export const WithError = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
    required: true
  }
};

export const WithHelpText = {
  args: {
    label: 'Password',
    type: 'password',
    helpText: 'Password must be at least 8 characters long',
    leftIcon: 'lock'
  }
};

export const Disabled = {
  args: {
    label: 'Username',
    value: 'johndoe',
    disabled: true
  }
};

export const Readonly = {
  args: {
    label: 'API Key',
    value: 'sk_test_123456789',
    readonly: true,
    rightIcon: 'copy'
  }
};

export const WithMask = {
  args: {
    label: 'Phone',
    type: 'tel',
    mask: '(###) ###-####',
    placeholder: '(555) 555-5555'
  }
};

export const Required = {
  args: {
    label: 'Full Name',
    required: true,
    placeholder: 'Enter your full name'
  }
};

export const Compact = {
  args: {
    label: 'Search',
    leftIcon: 'search',
    placeholder: 'Search...',
    class: 'max-w-xs'
  }
};
