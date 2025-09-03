import { test, expect } from '@playwright/test';

test('navigation bar is visible and contains brand logo', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('header.nav');
  await expect(nav).toBeVisible();
  await expect(nav.locator('.brand__logo')).toBeVisible();
});

test.use({ colorScheme: 'light' });
test('theme toggle switches theme', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const toggle = page.locator('button[aria-label*="theme"]');
  await expect(toggle).toBeVisible();
  // Get initial theme class
  const initialClass = await html.getAttribute('class');
  await toggle.click();
  // Wait for class to change
  await expect(html).not.toHaveClass(initialClass || '');
  // Check for theme-dark or theme-light
  const newClass = await html.getAttribute('class');
  expect(newClass).toMatch(/theme-dark/);
});

test('footer is visible and contains copyright', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer.footer');
  await expect(footer).toBeVisible();
  await expect(footer.locator('.copy')).toContainText('PolyShape LTD. All rights reserved');
});
