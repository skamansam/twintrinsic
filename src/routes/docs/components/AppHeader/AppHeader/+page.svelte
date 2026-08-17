<script lang="ts">
import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AppHeaderModule from "$lib/components/AppHeader/AppHeader.svelte"
</script>
<!--
@component
AppHeader documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AppHeader</h1>
  
  <p>
    The AppHeader component is a responsive application header that includes
    branding, navigation, search, notifications, and user profile features. It's
    designed to be the main navigation component for your application.
  </p>

  <h2>Examples</h2>

  <h3>Basic Header</h3>
  <div class="not-prose mb-8 -mx-4 sm:-mx-6" data-testid="app-header-basic">
    <AppHeader
      brand="My App"
      navItems={[
        { label: 'Home', href: '#', current: true },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' }
      ]}
    />
  </div>

  <CodeBlock language="svelte">{`<AppHeader
  brand="My App"
  navItems={[
    { label: 'Home', href: '#', current: true },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ]}
/>`}</CodeBlock>

  <h3>With Logo</h3>
  <div class="not-prose mb-8 -mx-4 sm:-mx-6" data-testid="app-header-with-logo">
    <AppHeader
      brand={{
        name: 'My App',
        logo: 'https://via.placeholder.com/32',
        href: '#'
      }}
      navItems={[
        { label: 'Home', href: '#', current: true },
        { label: 'About', href: '#' }
      ]}
    />
  </div>

  <CodeBlock language="svelte">{`<AppHeader
  brand={{
    name: 'My App',
    logo: '/path/to/logo.svg',
    href: '/'
  }}
  navItems={[
    { label: 'Home', href: '/', current: true },
    { label: 'About', href: '/about' }
  ]}
/>`}</CodeBlock>

  <h3>Full Featured</h3>
  <div class="not-prose mb-8 -mx-4 sm:-mx-6" data-testid="app-header-full-featured">
    <AppHeader
      brand={{
        name: 'My App',
        logo: 'https://via.placeholder.com/32',
        href: '#'
      }}
      user={{
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/32'
      }}
      showSearch={true}
      showNotifications={true}
      navItems={[
        { label: 'Home', href: '#', current: true },
        { label: 'Dashboard', href: '#' },
        { label: 'Projects', href: '#' }
      ]}
    />
  </div>

  <h2>Props</h2>
<PropsTable component={AppHeaderModule} />

  <h3>Type Definitions</h3>
  <CodeBlock language="typescript">{`interface BrandInfo {
  name: string;
  logo?: string;
  href?: string;
}

interface UserInfo {
  name: string;
  avatar?: string;
  href?: string;
}

interface NavItem {
  label: string;
  href?: string;
  current?: boolean;
}`}</CodeBlock>

  <h2>Events</h2>
<EventsTable component={AppHeaderModule} />

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>notifications</code></td>
        <td>Custom content for notifications panel</td>
      </tr>
      <tr>
        <td><code>user-menu</code></td>
        <td>Custom content for user menu</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The AppHeader component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses semantic HTML with proper landmark roles</li>
    <li>Proper ARIA labels for interactive elements</li>
    <li>Keyboard navigation support</li>
    <li>Mobile menu toggle with proper ARIA attributes</li>
    <li>Focus management for dropdowns and mobile menu</li>
  </ul>

  <h2>Mobile Support</h2>
  <p>
    The header is fully responsive with the following features:
  </p>
  <ul>
    <li>Collapsible navigation menu on mobile</li>
    <li>Hamburger menu button with animation</li>
    <li>Search input collapses to icon on mobile</li>
    <li>Proper spacing and touch targets for mobile</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus through interactive elements</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>Activates buttons, toggles dropdowns</td>
      </tr>
      <tr>
        <td><kbd>Escape</kbd></td>
        <td>Closes mobile menu, notifications, and user menu</td>
      </tr>
      <tr>
        <td><kbd>Arrow Keys</kbd></td>
        <td>Navigates through menu items when focused</td>
      </tr>
    </tbody>
  </table>

  <h2>Customization</h2>
  <p>
    The AppHeader uses Tailwind CSS classes and can be customized through:
  </p>
  <ul>
    <li>Theme colors (background, text, borders)</li>
    <li>Spacing and sizing utilities</li>
    <li>Additional classes via the <code>class</code> prop</li>
    <li>Custom content via slots</li>
  </ul>
</Container>
