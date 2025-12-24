<!--
@component
AppHeader documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AppHeader</h1>
  
  <p>
    The AppHeader component is a responsive application header that includes
    branding, navigation, search, notifications, and user profile features. It's
    designed to be the main navigation component for your application.
  </p>

  <h2>Examples</h2>

  <h3>Basic Header</h3>
  <div class="not-prose mb-8 -mx-4 sm:-mx-6">
    <AppHeader
      brand="My App"
      navItems={[
        { label: 'Home', href: '#', current: true },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' }
      ]}
    />
  </div>

  <pre class="language-svelte"><code>{`<AppHeader
  brand="My App"
  navItems={[
    { label: 'Home', href: '#', current: true },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ]}
/>`}</code></pre>

  <h3>With Logo</h3>
  <div class="not-prose mb-8 -mx-4 sm:-mx-6">
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

  <pre class="language-svelte"><code>{`<AppHeader
  brand={{
    name: 'My App',
    logo: '/path/to/logo.svg',
    href: '/'
  }}
  navItems={[
    { label: 'Home', href: '/', current: true },
    { label: 'About', href: '/about' }
  ]}
/>`}</code></pre>

  <h3>Full Featured</h3>
  <div class="not-prose mb-8 -mx-4 sm:-mx-6">
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
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>brand</code></td>
        <td><code>string | BrandInfo</code></td>
        <td>Required</td>
        <td>Brand information as string or object with name, logo, and href</td>
      </tr>
      <tr>
        <td><code>user</code></td>
        <td><code>UserInfo | null</code></td>
        <td><code>null</code></td>
        <td>User information with name, avatar, and href</td>
      </tr>
      <tr>
        <td><code>showSearch</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show the search input</td>
      </tr>
      <tr>
        <td><code>showNotifications</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show notifications</td>
      </tr>
      <tr>
        <td><code>navItems</code></td>
        <td><code>NavItem[]</code></td>
        <td><code>[]</code></td>
        <td>Navigation items array</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h3>Type Definitions</h3>
  <pre class="language-typescript"><code>{`interface BrandInfo {
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
}`}</code></pre>

  <h2>Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>search</code></td>
        <td><code>{`{ query: string }`}</code></td>
        <td>Fired when search input changes</td>
      </tr>
      <tr>
        <td><code>signout</code></td>
        <td><code>void</code></td>
        <td>Fired when sign out is clicked in user menu</td>
      </tr>
    </tbody>
  </table>

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
