import { Page, Locator } from "@playwright/test";
import { CheckoutPage } from "./checkout";

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

  async navigateToCheckoutPage(): Promise<CheckoutPage> {
    await this.checkoutButton.click();
    return new CheckoutPage(this.page);
  }

  async clickContinueShoppingButton(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
