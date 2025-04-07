import { test, expect } from '@playwright/test';

test.describe('Separator Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-separator--default');
  });

  test('renders horizontal separator by default', async ({ page }) => {
    const separator = page.locator('hr.separator');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveClass(/separator-horizontal/);
    await expect(separator).not.toHaveClass(/separator-with-content/);
  });

  test('renders vertical separator', async ({ page }) => {
    // Navigate to vertical variant
    await page.goto('http://localhost:6006/?path=/story/components-separator--vertical');
    
    const separator = page.locator('.separator');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveClass(/separator-vertical/);
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('renders with text content', async ({ page }) => {
    // Navigate to text content variant
    await page.goto('http://localhost:6006/?path=/story/components-separator--with-text');
    
    const separator = page.locator('.separator');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveClass(/separator-with-content/);
    
    const content = separator.locator('.separator-content');
    await expect(content).toBeVisible();
    await expect(content).toHaveText('or');
  });

  test('renders with icon content', async ({ page }) => {
    // Navigate to icon content variant
    await page.goto('http://localhost:6006/?path=/story/components-separator--with-icon');
    
    const separator = page.locator('.separator');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveClass(/separator-with-content/);
    
    const content = separator.locator('.separator-content');
    await expect(content).toBeVisible();
    
    // Check for icon presence (assuming it uses an SVG)
    const icon = content.locator('svg');
    await expect(icon).toBeVisible();
  });

  test('handles color variants', async ({ page }) => {
    // Test each color variant
    const colors = ['primary', 'success', 'warning', 'error'];
    
    for (const color of colors) {
      await page.goto(`http://localhost:6006/?path=/story/components-separator--${color}`);
      
      const separator = page.locator('.separator');
      await expect(separator).toBeVisible();
      
      // Check color-specific classes
      switch (color) {
        case 'primary':
          await expect(separator).toHaveClass(/border-primary-200/);
          break;
        case 'success':
          await expect(separator).toHaveClass(/border-success/);
          break;
        case 'warning':
          await expect(separator).toHaveClass(/border-warning/);
          break;
        case 'error':
          await expect(separator).toHaveClass(/border-error/);
          break;
      }
    }
  });

  test('renders as different HTML elements', async ({ page }) => {
    // Test hr element (default for no content)
    await page.goto('http://localhost:6006/?path=/story/components-separator--default');
    await expect(page.locator('hr.separator')).toBeVisible();
    
    // Test div element (default for content)
    await page.goto('http://localhost:6006/?path=/story/components-separator--with-text');
    const divSeparator = page.locator('div.separator');
    await expect(divSeparator).toBeVisible();
    await expect(divSeparator).toHaveAttribute('role', 'separator');
  });

  test('handles ARIA attributes', async ({ page }) => {
    // Navigate to labeled variant
    await page.goto('http://localhost:6006/?path=/story/components-separator--with-label');
    
    const separator = page.locator('.separator');
    await expect(separator).toHaveAttribute('aria-label', 'Section divider');
    await expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  test('renders with complex content', async ({ page }) => {
    // Navigate to complex content variant
    await page.goto('http://localhost:6006/?path=/story/components-separator--complex');
    
    const separator = page.locator('.separator');
    const content = separator.locator('.separator-content');
    
    await expect(separator).toHaveClass(/separator-with-content/);
    await expect(content).toBeVisible();
    
    // Check for multiple elements in content
    const contentItems = content.locator('*');
    const count = await contentItems.count();
    expect(count).toBeGreaterThan(1);
  });
});
