import { Page, Locator } from "@playwright/test";
import { getRandomString } from "../helpers/stringhelper";
import { ConfirmationPage } from "./confirmation";

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly postalCodeInputField: Locator;
  readonly errorBlock: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInputField = page.locator("[data-test='firstName']");
    this.lastNameInputField = page.locator("[data-test='lastName']");
    this.postalCodeInputField = page.locator("[data-test='postalCode']");
    this.errorBlock = page.locator('[data-test="error"]');
    this.cancelButton = page.locator("[data-test='cancel']");
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async navigateToConfirmationPage(): Promise<ConfirmationPage> {
    const randonString = getRandomString(10);
    await this.firstNameInputField.fill(randonString);
    await this.lastNameInputField.fill(randonString);
    await this.postalCodeInputField.fill(randonString);
    await this.continueButton.click();
    return new ConfirmationPage(this.page);
  }

  async continueCheckoutWithoutFirstName(): Promise<void> {
    await this.continueButton.click();
  }

  async continueCheckoutWithoutLastName(): Promise<void> {
    const randonString = getRandomString(10);
    await this.firstNameInputField.fill(randonString);
    await this.continueButton.click();
  }

  async continueCheckoutWithoutPostalCode(): Promise<void> {
    const randonString = getRandomString(10);
    await this.firstNameInputField.fill(randonString);
    await this.lastNameInputField.fill(randonString);
    await this.continueButton.click();
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click();
  }
}
