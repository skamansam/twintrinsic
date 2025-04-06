<!--
@component
AppHeader - A responsive application header with navigation, actions, and branding.
Supports mobile menu, search, notifications, and user profile.

Usage:
```svelte
<AppHeader
  brand="My App"
  user={{ name: 'John Doe', avatar: '/avatar.jpg' }}
/>

<AppHeader
  brand={{
    logo: '/logo.svg',
    name: 'My App',
    href: '/'
  }}
  showSearch={true}
/>
```
-->
<script>
  import { slide } from 'svelte/transition';

  /** @type {string | { name: string, logo?: string, href?: string }} - Brand information */
  /** @type {{ name: string, avatar?: string, href?: string } | null} - User information */
  /** @type {boolean} - Whether to show the search input */
  /** @type {boolean} - Whether to show notifications */
  /** @type {string[]} - Navigation items */
  /** @type {string} - Additional CSS classes */
  /** @type {string} - HTML id for accessibility */
  const {
    brand,
    user = null,
    showSearch = false,
    showNotifications = false,
    navItems = [],
    class: className = '',
    id = crypto.randomUUID()
  } = $props();

  let mobileMenuOpen = $state(false);
  let searchQuery = $state('');
  let notificationsOpen = $state(false);
  let userMenuOpen = $state(false);

  // Handle search input
  function handleSearch(e) {
    searchQuery = e.target.value;
    dispatch('search', { query: searchQuery });
  }

  // Handle mobile menu toggle
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Handle notifications toggle
  function toggleNotifications() {
    notificationsOpen = !notificationsOpen;
    if (notificationsOpen) userMenuOpen = false;
  }

  // Handle user menu toggle
  function toggleUserMenu() {
    userMenuOpen = !userMenuOpen;
    if (userMenuOpen) notificationsOpen = false;
  }

  // Handle escape key
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      mobileMenuOpen = false;
      notificationsOpen = false;
      userMenuOpen = false;
    }
  }

  // Emit events directly
  function dispatch(event, detail) {
    const customEvent = new CustomEvent(event, { detail });
    this?.dispatchEvent(customEvent);
  }

  const brandName = $derived(typeof brand === 'string' ? brand : brand.name);
  const brandLogo = $derived(typeof brand === 'string' ? null : brand.logo);
  const brandHref = $derived(typeof brand === 'string' ? '/' : (brand.href || '/'));
</script>

<svelte:window onkeydown={handleKeydown} />

<header
  class="app-header {className}"
  {id}
>
  <div class="app-header-container">
    <!-- Brand -->
    <div class="app-header-brand">
      <a {brandHref} class="app-header-brand-link" aria-label={brandName}>
        <slot name="logo">
          {#if brandLogo}
            <img
              src={brandLogo}
              alt={brandName}
              class="app-header-logo"
              width="32"
              height="32"
            />
          {/if}
          <span class="app-header-brand-name">{brandName}</span>
        </slot>
      </a>
    </div>

    <!-- Mobile Menu Button -->
    <button
      type="button"
      class="app-header-mobile-menu"
      aria-expanded={mobileMenuOpen}
      aria-controls="{id}-nav"
      click={toggleMobileMenu}
    >
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {#if mobileMenuOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>

    <!-- Navigation -->
    <nav
      id="{id}-nav"
      class="app-header-nav"
      class:app-header-nav-open={mobileMenuOpen}
    >
      <ul class="app-header-nav-list">
        {#each navItems as item}
          <li>
            <a
              href={item.href || '#'}
              class="app-header-nav-link"
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Actions -->
    <div class="app-header-actions">
      {#if showSearch}
        <div class="app-header-search">
          <label for="{id}-search" class="sr-only">Search</label>
          <div class="app-header-search-input-wrapper">
            <input
              type="search"
              id="{id}-search"
              class="app-header-search-input"
              placeholder="Search..."
              bind:value={searchQuery}
              input={handleSearch}
            />
            <svg class="w-5 h-5 app-header-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      {/if}

      {#if showNotifications}
        <div class="app-header-notifications">
          <button
            type="button"
            class="app-header-notifications-button"
            aria-expanded={notificationsOpen}
            click={toggleNotifications}
          >
            <span class="sr-only">View notifications</span>
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {#if notificationsOpen}
            <div
              class="app-header-notifications-panel"
              role="dialog"
              aria-label="Notifications"
              transition:slide={{ duration: 200 }}
            >
              <slot name="notifications">
                <div class="p-4 text-center text-text-muted">
                  No new notifications
                </div>
              </slot>
            </div>
          {/if}
        </div>
      {/if}

      {#if user}
        <div class="app-header-user">
          <button
            type="button"
            class="app-header-user-button"
            aria-expanded={userMenuOpen}
            click={toggleUserMenu}
          >
            <span class="sr-only">Open user menu</span>
            {#if user.avatar}
              <img
                src={user.avatar}
                alt=""
                class="app-header-user-avatar"
                width="32"
                height="32"
              />
            {:else}
              <div class="app-header-user-avatar-placeholder">
                {user.name[0]}
              </div>
            {/if}
          </button>

          {#if userMenuOpen}
            <div
              class="app-header-user-menu"
              role="dialog"
              aria-label="User menu"
              transition:slide={{ duration: 200 }}
            >
              <slot name="user-menu">
                <div class="app-header-user-menu-header">
                  <p class="app-header-user-name">{user.name}</p>
                </div>
                <div class="app-header-user-menu-items">
                  <a href="/profile" class="app-header-user-menu-item">Profile</a>
                  <a href="/settings" class="app-header-user-menu-item">Settings</a>
                  <hr class="app-header-user-menu-separator" />
                  <button
                    type="button"
                    class="app-header-user-menu-item text-error-500"
                    click={() => dispatch('signout')}
                  >
                    Sign out
                  </button>
                </div>
              </slot>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  @reference "../../twintrinsic.css";
  /* Base header styles */
  .app-header {
    @apply bg-background border-b border-border sticky top-0 z-50;
  }

  .app-header-container {
    @apply max-w-7xl mx-auto px-4 px-6 lg:px-8;
    @apply flex items-center justify-between h-16;
  }

  /* Brand styles */
  .app-header-brand {
    @apply flex-shrink-0;
  }

  .app-header-brand-link {
    @apply flex items-center gap-2;
  }

  .app-header-logo {
    @apply h-8 w-auto;
  }

  .app-header-brand-name {
    @apply text-lg font-semibold;
  }

  /* Mobile menu button */
  .app-header-mobile-menu {
    @apply sm:hidden inline-flex items-center justify-center p-2 rounded-md;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500;
  }

  /* Navigation styles */
  .app-header-nav {
    @apply hidden sm:block;
  }

  .app-header-nav-list {
    @apply flex space-x-4;
  }

  .app-header-nav-link {
    @apply px-3 py-2 rounded-md text-sm font-medium;
    @apply hover:bg-hover focus:outline-none focus:bg-hover;
  }

  .app-header-nav-link[aria-current="page"] {
    @apply bg-primary-500 text-white;
  }

  /* Mobile navigation */
  @media (max-width: 640px) {
    .app-header-nav {
      @apply fixed inset-0 bg-background/95 backdrop-blur-sm;
      @apply transform -translate-x-full transition-transform;
      @apply pt-16 px-4;
    }

    .app-header-nav-open {
      @apply translate-x-0;
    }

    .app-header-nav-list {
      @apply flex-col space-x-0 space-y-2;
    }

    .app-header-nav-link {
      @apply block w-full;
    }
  }

  /* Actions styles */
  .app-header-actions {
    @apply flex items-center gap-4;
  }

  /* Search styles */
  .app-header-search {
    @apply hidden md:block;
  }

  .app-header-search-input-wrapper {
    @apply relative;
  }

  .app-header-search-input {
    @apply w-full sm:w-64 pl-10 pr-4 py-2 rounded-md;
    @apply bg-surface border border-border;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .app-header-search-icon {
    @apply absolute left-3 top-1/2 -translate-y-1/2 text-text-muted;
  }

  /* Notifications styles */
  .app-header-notifications-button {
    @apply p-2 rounded-md;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .app-header-notifications-panel {
    @apply absolute right-0 mt-2 w-80;
    @apply bg-background border border-border rounded-md shadow-lg;
    @apply origin-top-right;
  }

  /* User menu styles */
  .app-header-user-button {
    @apply flex rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .app-header-user-avatar {
    @apply h-8 w-8 rounded-full object-cover;
  }

  .app-header-user-avatar-placeholder {
    @apply h-8 w-8 rounded-full bg-primary-500 text-white;
    @apply flex items-center justify-center text-sm font-medium;
  }

  .app-header-user-menu {
    @apply absolute right-0 mt-2 w-48;
    @apply bg-background border border-border rounded-md shadow-lg;
    @apply origin-top-right;
  }

  .app-header-user-menu-header {
    @apply px-4 py-3 border-b border-border;
  }

  .app-header-user-name {
    @apply text-sm font-medium;
  }

  .app-header-user-menu-items {
    @apply py-1;
  }

  .app-header-user-menu-item {
    @apply block px-4 py-2 text-sm w-full text-left;
    @apply hover:bg-hover focus:outline-none focus:bg-hover;
  }

  .app-header-user-menu-separator {
    @apply my-1 border-border;
  }
</style>
