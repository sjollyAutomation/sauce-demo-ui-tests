import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  readonly title: Locator;
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly postalCodeInputField: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("[data-test='title']");
    this.firstNameInputField = page.locator("[data-test='firstName']");
    this.lastNameInputField = page.locator("[data-test='lastName']");
    this.postalCodeInputField = page.locator("[data-test='postalCode']");
    this.cancelButton = page.locator("[data-test='cancel']");
    this.continueButton = page.locator('[data-test="continue"]');
  }
}
