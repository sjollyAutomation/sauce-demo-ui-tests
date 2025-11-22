import { Page, Locator } from "@playwright/test";
import { getRandomString } from "../helpers/stringhelper";

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly postalCodeInputField: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInputField = page.locator("[data-test='firstName']");
    this.lastNameInputField = page.locator("[data-test='lastName']");
    this.postalCodeInputField = page.locator("[data-test='postalCode']");
    this.cancelButton = page.locator("[data-test='cancel']");
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async continueCheckout(): Promise<void> {
    const randonString = getRandomString(10);
    await this.firstNameInputField.fill(randonString);
    await this.lastNameInputField.fill(randonString);
    await this.postalCodeInputField.fill(randonString);
    await this.continueButton.click();
  }
}
