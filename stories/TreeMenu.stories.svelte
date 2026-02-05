<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import TreeMenu from '$lib/components/TreeMenu/TreeMenu.svelte';

  const meta = {
    title: 'Components/TreeMenu',
    component: TreeMenu,
    tags: ['autodocs'],
    argTypes: {
      items: {
        description: 'Array of menu items with optional children, icons, links, and actions',
        control: { type: 'object' },
      },
      class: {
        description: 'Additional CSS classes',
        control: { type: 'text' },
      },
    },
  };
</script>

<Meta {meta} />

<Template let:args>
  <TreeMenu {...args} />
</Template>

<Story
  name="Default"
  args={{
    items: [
      {
        title: 'Home',
        icon: 'home',
        link: '/',
      },
      {
        title: 'About',
        icon: 'info',
        link: '/about',
      },
      {
        title: 'Settings',
        icon: 'settings',
        separator: true,
      },
    ],
  }}
/>

<Story
  name="With Nested Items"
  args={{
    items: [
      {
        title: 'Dashboard',
        icon: 'home',
        link: '/',
      },
      {
        title: 'Projects',
        icon: 'folder',
        separator: true,
        children: [
          {
            label: 'Active Projects',
            link: '/projects/active',
          },
          {
            label: 'Archived Projects',
            link: '/projects/archived',
          },
        ],
      },
      {
        title: 'Settings',
        icon: 'settings',
        children: [
          {
            label: 'Profile',
            link: '/settings/profile',
          },
          {
            label: 'Preferences',
            link: '/settings/preferences',
          },
          {
            label: 'Security',
            link: '/settings/security',
          },
        ],
      },
    ],
  }}
/>

<Story
  name="With Actions"
  args={{
    items: [
      {
        title: 'File',
        icon: 'folder',
        children: [
          {
            label: 'New',
            onClick: () => alert('New file'),
          },
          {
            label: 'Open',
            onClick: () => alert('Open file'),
          },
          {
            label: 'Save',
            onClick: () => alert('Save file'),
          },
        ],
      },
      {
        title: 'Edit',
        icon: 'edit',
        children: [
          {
            label: 'Undo',
            onClick: () => alert('Undo'),
          },
          {
            label: 'Redo',
            onClick: () => alert('Redo'),
          },
        ],
      },
      {
        title: 'Help',
        icon: 'info',
        action: () => alert('Help clicked'),
        separator: true,
      },
    ],
  }}
/>

<Story
  name="Complex Hierarchy"
  args={{
    items: [
      {
        title: 'QuestLists',
        icon: 'questlists',
        iconClass: 'font-questlists text-2xl',
        link: '/',
      },
      {
        title: 'New Quest',
        icon: 'home',
        link: '/new',
      },
      {
        title: 'Recent Quests',
        separator: true,
      },
      {
        title: 'No Recent Quests',
      },
      {
        title: 'About QuestLists',
        icon: 'info',
        link: '/about',
        separator: true,
      },
    ],
  }}
/>

<Story
  name="Text Only"
  args={{
    items: [
      {
        title: 'Section 1',
      },
      {
        title: 'Item 1',
        link: '#item-1',
      },
      {
        title: 'Item 2',
        link: '#item-2',
      },
      {
        title: 'Section 2',
        separator: true,
      },
      {
        title: 'Item 3',
        link: '#item-3',
      },
    ],
  }}
/>
