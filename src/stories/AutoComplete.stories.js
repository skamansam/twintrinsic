import AutoComplete from '../lib/components/Form/AutoComplete.svelte';

const countries = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Italy', value: 'IT' },
  { label: 'Spain', value: 'ES' },
  { label: 'Japan', value: 'JP' },
  { label: 'China', value: 'CN' }
];

const users = [
  { label: 'John Doe', value: '1', avatar: 'https://i.pravatar.cc/40?u=1' },
  { label: 'Jane Smith', value: '2', avatar: 'https://i.pravatar.cc/40?u=2' },
  { label: 'Bob Johnson', value: '3', avatar: 'https://i.pravatar.cc/40?u=3' },
  { label: 'Alice Brown', value: '4', avatar: 'https://i.pravatar.cc/40?u=4' },
  { label: 'Charlie Wilson', value: '5', avatar: 'https://i.pravatar.cc/40?u=5' }
];

const UserTemplate = {
  render: ({ item }) => `
    <div class="flex items-center gap-2">
      <img src="${item.avatar}" alt="" class="w-8 h-8 rounded-full" />
      <span>${item.label}</span>
    </div>
  `
};

export default {
  title: 'Components/Form/AutoComplete',
  component: AutoComplete,
  argTypes: {
    label: { control: 'text' },
    items: { control: 'array' },
    value: { control: 'text' },
    minLength: { control: 'number' },
    delay: { control: 'number' },
    multiple: { control: 'boolean' },
    highlight: { control: 'boolean' },
    forceSelection: { control: 'boolean' },
    maxItems: { control: 'number' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
};

export const Default = {
  args: {
    label: 'Country',
    items: countries,
    placeholder: 'Select a country'
  }
};

export const Multiple = {
  args: {
    label: 'Countries',
    items: countries,
    multiple: true,
    placeholder: 'Select countries'
  }
};

export const CustomTemplate = {
  args: {
    label: 'User',
    items: users,
    itemTemplate: UserTemplate,
    placeholder: 'Select a user'
  }
};

export const WithMinLength = {
  args: {
    label: 'Country',
    items: countries,
    minLength: 2,
    placeholder: 'Type min. 2 characters'
  }
};

export const WithDelay = {
  args: {
    label: 'Country',
    items: countries,
    delay: 500,
    placeholder: 'Type to search (500ms delay)'
  }
};

export const WithHighlight = {
  args: {
    label: 'Country',
    items: countries,
    highlight: true,
    placeholder: 'Type to highlight matches'
  }
};

export const ForceSelection = {
  args: {
    label: 'Country',
    items: countries,
    forceSelection: true,
    placeholder: 'Must select from list'
  }
};

export const Loading = {
  args: {
    label: 'Country',
    items: [],
    loading: true,
    placeholder: 'Loading...'
  }
};

export const Disabled = {
  args: {
    label: 'Country',
    items: countries,
    disabled: true,
    value: countries[0],
    placeholder: 'Disabled'
  }
};

export const CustomFilter = {
  args: {
    label: 'Country',
    items: countries,
    filter: (items, query) => items.filter(item => 
      item.label.toLowerCase().startsWith(query.toLowerCase())
    ),
    placeholder: 'Starts with filter'
  }
};
