import { Page, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export async function assertAccessibilityScan(
  elementLocator: string,
  page: Page
) {
  const results = await new AxeBuilder({ page })
    .include(elementLocator)
    .analyze();

  expect(
    results.violations,
    `Accessibility violations found for ${elementLocator}`
  ).toEqual([]);
}
