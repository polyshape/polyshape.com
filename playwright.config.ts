import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:7777',
    headless: process.env.HEADLESS === 'true',
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
  reporter: [['html', { open: 'never' }]],
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:7777',
    timeout: 120 * 1000, // 2 minutes
    reuseExistingServer: false,
  },
});
