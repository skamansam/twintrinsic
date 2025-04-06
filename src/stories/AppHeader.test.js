import { test, expect } from '@playwright/test';
import { visit } from '@storybook/test';

test.describe('AppHeader Component', () => {
  test('renders basic header correctly', async ({ page }) => {
    await visit(page, 'layout-app-header--default');
    
    const header = await page.getByRole('banner');
    const brand = await header.getByText('My App');
    const nav = await header.getByRole('navigation');
    
    await expect(header).toBeVisible();
    await expect(brand).toBeVisible();
    await expect(nav).toBeVisible();
  });

  test('renders logo when provided', async ({ page }) => {
    await visit(page, 'layout-app-header--with-logo');
    
    const logo = await page.getByRole('img', { name: 'My App' });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', 'https://via.placeholder.com/32');
  });

  test('shows and uses search functionality', async ({ page }) => {
    await visit(page, 'layout-app-header--with-search');
    
    const searchInput = await page.getByRole('searchbox');
    await expect(searchInput).toBeVisible();

    // Type in search
    await searchInput.type('test query');
    await expect(searchInput).toHaveValue('test query');
  });

  test('shows notifications panel', async ({ page }) => {
    await visit(page, 'layout-app-header--with-notifications');
    
    const notificationsButton = await page.getByRole('button', { name: 'View notifications' });
    await expect(notificationsButton).toBeVisible();

    // Open notifications
    await notificationsButton.click();
    const notificationsPanel = await page.getByRole('dialog', { name: 'Notifications' });
    await expect(notificationsPanel).toBeVisible();

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(notificationsPanel).not.toBeVisible();
  });

  test('shows and interacts with user menu', async ({ page }) => {
    await visit(page, 'layout-app-header--with-user');
    
    const userButton = await page.getByRole('button', { name: 'Open user menu' });
    await expect(userButton).toBeVisible();

    // Open user menu
    await userButton.click();
    const userMenu = await page.getByRole('dialog', { name: 'User menu' });
    await expect(userMenu).toBeVisible();
    await expect(userMenu.getByText('John Doe')).toBeVisible();

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(userMenu).not.toBeVisible();
  });

  test('handles mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await visit(page, 'layout-app-header--default');
    
    const menuButton = await page.getByRole('button', { name: 'Open main menu' });
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();
    const nav = await page.getByRole('navigation');
    await expect(nav).toHaveClass(/app-header-nav-open/);

    // Close mobile menu
    await menuButton.click();
    await expect(nav).not.toHaveClass(/app-header-nav-open/);
  });

  test('handles full featured header', async ({ page }) => {
    await visit(page, 'layout-app-header--full-featured');
    
    // Check all main elements are present
    await expect(page.getByRole('img', { name: 'My App' })).toBeVisible();
    await expect(page.getByRole('searchbox')).toBeVisible();
    await expect(page.getByRole('button', { name: 'View notifications' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open user menu' })).toBeVisible();

    // Check navigation items
    const nav = await page.getByRole('navigation');
    await expect(nav).toContainText('Home');
    await expect(nav).toContainText('Dashboard');
    await expect(nav).toContainText('Projects');
    await expect(nav).toContainText('Calendar');
    await expect(nav).toContainText('Reports');
  });
});
