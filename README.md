# 🎭 Sauce Demo Playwright Test Automation

This project contains end-to-end UI tests for the [Sauce Demo](https://www.saucedemo.com/) website using **Microsoft Playwright**.

---

## 📂 Directory Structure

```text
SAUCE-DEMO-UI-TESTS/
├── package.json            # Project dependencies
├── package-lock.json       # Locked dependencies
├── playwright.config.ts    # Playwright configuration file
├── README.md               # This README file
├── helpers/                # Helper method files
├── pages/                  # Page Object files
├── test-data/              # Test data files
├── tests/                  # Test scripts
```

## ✅ Coverage

```bash
- E2E UI flows
- Cross-browser testing
- Component-like UI validation
- Accessibility checks
```
## 🧠 Testing Approach & Scope

This project focuses on **high-value end-to-end user flows** rather than exhaustive UI coverage.

Included:
```bash
- Core login and post-login workflows
- Page-level accessibility checks using Axe
- Cross-browser and mobile emulation coverage
- Maintainable Page Object Model design
```

Intentionally excluded:
```bash
- Visual regression testing (UI is not stable enough for reliable baselines)
- Performance testing (better suited for API or dedicated performance tools)
- Negative-path overload (Sauce Demo is a demo app with limited error handling)
```

The goal is to demonstrate **real-world Playwright usage and QA decision-making**, not maximum test count.
---

## 📦 Requirements

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

---

## 🚀 Setup Instructions

**Install Dependencies**

```bash
npm install
```

This will install Playwright and all required packages.

**Install Playwright Browsers**

```bash
npx playwright install
```

This ensures all required browsers are available for testing.

## 🧪 Running Tests

**Run All Tests**

```bash
npx playwright test
```

**Run Specific Test File**

```bash
npx playwright test tests/login.spec.ts
```

**Run Tests in a Specific Browser or Mobile Emulators**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=iPhone14
npx playwright test --project=iPhone16
npx playwright test --project=Pixel7
```

**Run a Specific Test Case by Name**

```bash
npx playwright test -g "should display error message on invalid login"
```

**Debug Mode**

```bash
npx playwright test --debug
```

**Generate Test Code (Codegen)**

```bash
npx playwright codegen https://www.saucedemo.com
```

Record steps for a test and generate a script automatically.

Options:

--viewport-size=800,600 → set screen resolution

--device="iPhone 11" → emulate device

--color-scheme=dark → emulate dark mode

**View Trace Report**

```bash
npx playwright show-trace trace.zip
```

📚 Documentation
Official Playwright Docs: https://playwright.dev

CLI Reference: npx playwright -h

⚡ Notes
Tests are designed for Sauce Demo public website; any changes in the site UI may require test updates.

All tests are located under tests/.
