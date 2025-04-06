<!--
@component
Components overview page
-->
<script>
  import Container from '$lib/components/Container/Container.svelte';
  import Separator from '$lib/components/Separator/Separator.svelte';
  import Panel from '$lib/components/Panel/Panel.svelte';

  const components = [
    {
      name: 'Layout',
      items: [
        {
          name: 'AppHeader',
          description: 'Application header with navigation, search, and user menu',
          href: '/docs/components/appheader'
        },
        {
          name: 'Sidebar',
          description: 'Collapsible side panel with customizable content',
          href: '/docs/components/sidebar'
        },
        {
          name: 'BottomBar',
          description: 'Collapsible bottom panel with customizable content',
          href: '/docs/components/bottombar'
        },
        {
          name: 'Container',
          description: 'Responsive container with consistent padding',
          href: '/docs/components/container'
        }
      ]
    },
    {
      name: 'Navigation',
      items: [
        {
          name: 'ButtonDropdown',
          description: 'Accessible dropdown menu with customizable items',
          href: '/docs/components/buttondropdown'
        },
        {
          name: 'ViewerHeader',
          description: 'Document viewer header with navigation controls',
          href: '/docs/components/viewerheader'
        }
      ]
    },
    {
      name: 'UI Elements',
      items: [
        {
          name: 'Panel',
          description: 'Collapsible content panel with header and footer slots',
          href: '/docs/components/panel'
        },
        {
          name: 'Separator',
          description: 'Visual divider with optional content',
          href: '/docs/components/separator'
        }
      ]
    }
  ];
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Components</h1>
  
  <p>
    Twintrinsic provides a set of accessible, customizable components built with
    Svelte 5 and Tailwind CSS. Each component is designed to be responsive and
    follows best practices for accessibility.
  </p>

  <div class="space-y-8 not-prose">
    {#each components as category}
      <section>
        <Separator>{category.name}</Separator>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {#each category.items as component}
            <a
              href={component.href}
              class="block group"
            >
              <Panel>
                <svelte:fragment slot="header">
                  <h3 class="text-lg font-medium group-hover:text-primary-500">
                    {component.name}
                  </h3>
                </svelte:fragment>
                <p class="text-muted text-sm">
                  {component.description}
                </p>
              </Panel>
            </a>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</Container>
