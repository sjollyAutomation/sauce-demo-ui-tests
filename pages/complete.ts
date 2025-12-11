import { Page, Locator } from "@playwright/test";

export class CompletePage {
  readonly page: Page;

  readonly checkoutCompleteContainer: Locator;
  readonly successImage: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutCompleteContainer = page.locator(
      '[data-test="checkout-complete-container"]'
    );
    this.successImage = page.locator('[data-test="pony-express"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
}
