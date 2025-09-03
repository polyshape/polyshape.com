import { test, expect } from '@playwright/test';

// Test: Navigate to Contact page
test('navigate to Contact page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /contact/i }).click();
  await expect(page).toHaveURL(/.*contact/i);
  await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible();
});

// Test: Submit message with invalid email format
test('show error for invalid email format on Contact form', async ({ page }) => {
  await page.goto('/contact');
  // Fill out the form with an invalid email
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('invalid-email');
  await page.getByLabel('Message').fill('This is a test message.');
  await page.getByRole('button', { name: /send/i }).click();
  // Check for error message
  await expect(page.getByText(/Please enter a valid email./i)).toBeVisible();
});
