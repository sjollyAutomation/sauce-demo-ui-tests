import { Page, Locator } from "@playwright/test";

export class ViewCartPage {
  readonly page: Page;

  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.locator(
      "[data-test='continue-shopping']"
    );
    this.checkoutButton = page.locator("[data-test='checkout']");
  }
}
