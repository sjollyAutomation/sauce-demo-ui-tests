import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://www.saucedemo.com/";

  readonly usernameTextField: Locator;
  readonly passwordTextField: Locator;
  readonly loginButton: Locator;
  readonly errorContainer: Locator;
  readonly errorCloseButton: Locator;
  readonly openMenuLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextField = page.locator('[data-test="username"]');
    this.passwordTextField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorContainer = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"] svg');
    this.openMenuLink = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }
  async goto() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.usernameTextField.fill(username);
    await this.passwordTextField.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.openMenuLink.click();
    await this.logoutLink.click();
  }
}
