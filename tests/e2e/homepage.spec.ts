import { test, expect } from '@playwright/test';

// Basic e2e test for homepage

test('homepage loads and displays title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/polyshape/i);
});
