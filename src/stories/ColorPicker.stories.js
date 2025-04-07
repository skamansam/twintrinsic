import ColorPicker from '../lib/components/Form/ColorPicker.svelte';

export default {
  title: 'Components/Form/ColorPicker',
  component: ColorPicker,
  argTypes: {
    value: { control: 'text' },
    format: {
      control: 'select',
      options: ['hex', 'rgb', 'rgba', 'hsl', 'hsla']
    },
    showAlpha: { control: 'boolean' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' }
  }
};

export const Default = {
  args: {
    label: 'Color'
  }
};

export const WithValue = {
  args: {
    label: 'Color',
    value: '#FF0000'
  }
};

export const RgbFormat = {
  args: {
    label: 'Color',
    format: 'rgb',
    value: 'rgb(255, 0, 0)'
  }
};

export const RgbaFormat = {
  args: {
    label: 'Color',
    format: 'rgba',
    showAlpha: true,
    value: 'rgba(255, 0, 0, 0.5)'
  }
};

export const HslFormat = {
  args: {
    label: 'Color',
    format: 'hsl',
    value: 'hsl(0, 100%, 50%)'
  }
};

export const HslaFormat = {
  args: {
    label: 'Color',
    format: 'hsla',
    showAlpha: true,
    value: 'hsla(0, 100%, 50%, 0.5)'
  }
};

export const WithError = {
  args: {
    label: 'Color',
    error: 'Please select a valid color'
  }
};

export const Disabled = {
  args: {
    label: 'Color',
    value: '#FF0000',
    disabled: true
  }
};

export const CustomLabel = {
  args: {
    label: 'Brand Color',
    value: '#6366F1'
  }
};

export const ThemeColors = {
  render: () => ({
    Component: ThemeColors_,
    props: {}
  })
};

const ThemeColors_ = {
  render: () => `
    <div class="flex flex-col gap-4">
      <ColorPicker
        label="Primary Color"
        value="rgb(var(--color-primary-500))"
        format="rgb"
      />
      <ColorPicker
        label="Secondary Color"
        value="rgb(var(--color-secondary-500))"
        format="rgb"
      />
      <ColorPicker
        label="Accent Color"
        value="rgb(var(--color-accent-500))"
        format="rgb"
      />
    </div>
  `
};
