import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Root directory where tests are located
  testDir: "./", // update if your test files are in root, or keep './' if tests are directly in repo root
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  expect: {
    timeout: 3000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "retain-on-failure",
    headless: false,
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testMatch: /.*\.spec\.ts/,
    },
  ],
});
