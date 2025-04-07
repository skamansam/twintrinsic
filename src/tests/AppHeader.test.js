import { test, expect } from '@playwright/test';

test.describe('AppHeader Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-appheader--default');
  });

  test('renders with default props', async ({ page }) => {
    const header = page.locator('.app-header');
    await expect(header).toBeVisible();
    
    // Check brand
    const brand = header.locator('.app-header-brand-name');
    await expect(brand).toBeVisible();
    
    // Navigation should be hidden on mobile
    const nav = header.locator('.app-header-nav');
    await expect(nav).toHaveClass(/hidden/);
  });

  test('toggles mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const header = page.locator('.app-header');
    const menuButton = header.locator('.app-header-mobile-menu');
    const nav = header.locator('.app-header-nav');
    
    // Initial state
    await expect(nav).not.toHaveClass(/app-header-nav-open/);
    
    // Open menu
    await menuButton.click();
    await expect(nav).toHaveClass(/app-header-nav-open/);
    
    // Close menu
    await menuButton.click();
    await expect(nav).not.toHaveClass(/app-header-nav-open/);
    
    // Close with Escape key
    await menuButton.click();
    await expect(nav).toHaveClass(/app-header-nav-open/);
    await page.keyboard.press('Escape');
    await expect(nav).not.toHaveClass(/app-header-nav-open/);
  });

  test('handles search functionality', async ({ page }) => {
    // Navigate to search variant
    await page.goto('http://localhost:6006/?path=/story/components-appheader--with-search');
    
    const header = page.locator('.app-header');
    const searchInput = header.locator('.app-header-search-input');
    
    await expect(searchInput).toBeVisible();
    
    // Type search query
    await searchInput.type('test query');
    await expect(searchInput).toHaveValue('test query');
  });

  test('handles notifications', async ({ page }) => {
    // Navigate to notifications variant
    await page.goto('http://localhost:6006/?path=/story/components-appheader--with-notifications');
    
    const header = page.locator('.app-header');
    const notificationsButton = header.locator('.app-header-notifications-button');
    
    await expect(notificationsButton).toBeVisible();
    
    // Open notifications
    await notificationsButton.click();
    const panel = header.locator('.app-header-notifications-panel');
    await expect(panel).toBeVisible();
    
    // Close with Escape key
    await page.keyboard.press('Escape');
    await expect(panel).not.toBeVisible();
  });

  test('handles user menu', async ({ page }) => {
    // Navigate to user variant
    await page.goto('http://localhost:6006/?path=/story/components-appheader--with-user');
    
    const header = page.locator('.app-header');
    const userButton = header.locator('.app-header-user-button');
    
    await expect(userButton).toBeVisible();
    
    // Open user menu
    await userButton.click();
    const menu = header.locator('.app-header-user-menu');
    await expect(menu).toBeVisible();
    
    // Check menu items
    const menuItems = menu.locator('.app-header-user-menu-item');
    await expect(menuItems).toHaveCount(3); // Profile, Settings, Sign out
    
    // Close with Escape key
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
  });

  test('handles navigation items', async ({ page }) => {
    // Navigate to nav variant
    await page.goto('http://localhost:6006/?path=/story/components-appheader--with-navigation');
    
    const header = page.locator('.app-header');
    const navLinks = header.locator('.app-header-nav-link');
    
    // Check nav items
    await expect(navLinks).toHaveCount(3); // Home, About, Contact
    
    // Check current page indicator
    const currentLink = navLinks.first();
    await expect(currentLink).toHaveAttribute('aria-current', 'page');
  });

  test('handles brand logo', async ({ page }) => {
    // Navigate to logo variant
    await page.goto('http://localhost:6006/?path=/story/components-appheader--with-logo');
    
    const header = page.locator('.app-header');
    const logo = header.locator('.app-header-logo');
    const brandName = header.locator('.app-header-brand-name');
    
    await expect(logo).toBeVisible();
    await expect(brandName).toBeVisible();
    
    // Check logo attributes
    await expect(logo).toHaveAttribute('width', '32');
    await expect(logo).toHaveAttribute('height', '32');
  });

  test('handles theme toggle', async ({ page }) => {
    const header = page.locator('.app-header');
    const themeToggle = header.locator('button[aria-label="Toggle theme"]');
    
    await expect(themeToggle).toBeVisible();
    
    // Click theme toggle
    await themeToggle.click();
    // Theme change is handled by ThemeToggle component, which has its own tests
  });
});
