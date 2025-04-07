import { test, expect } from '@playwright/test';

test.describe('Container Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Container story in Storybook
    await page.goto('http://localhost:6006/?path=/story/components-container--default');
  });

  test('renders with default props', async ({ page }) => {
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/container mx-auto px-4/);
  });

  test('renders as fluid container', async ({ page }) => {
    // Navigate to the fluid story variant
    await page.goto('http://localhost:6006/?path=/story/components-container--fluid');
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/w-full/);
  });

  test('renders with custom element type', async ({ page }) => {
    // Navigate to the custom element story variant
    await page.goto('http://localhost:6006/?path=/story/components-container--as-main');
    const container = page.locator('main.container');
    await expect(container).toBeVisible();
  });

  test('applies ARIA attributes correctly', async ({ page }) => {
    // Navigate to the ARIA story variant
    await page.goto('http://localhost:6006/?path=/story/components-container--with-aria');
    const container = page.locator('.container');
    await expect(container).toHaveAttribute('role', 'main');
    await expect(container).toHaveAttribute('aria-label', 'Main content');
  });
});
