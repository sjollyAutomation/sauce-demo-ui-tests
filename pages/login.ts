import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://www.saucedemo.com/";

  readonly title: Locator;
  readonly usernameTextField: Locator;
  readonly passwordTextField: Locator;
  readonly loginButton: Locator;
  readonly errorContainer: Locator;
  readonly errorCloseButton: Locator;
  readonly loginCredentialsContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".login_logo");
    this.usernameTextField = page.locator('[data-test="username"]');
    this.passwordTextField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorContainer = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"] svg');
    this.loginCredentialsContainer = page.locator(
      '[data-test="login-credentials"]'
    );
  }
  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.loginCredentialsContainer.waitFor({ state: "visible" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameTextField.fill(username);
    await this.passwordTextField.fill(password);
    await this.loginButton.click();
  }

  async clickErrorCloseButton(): Promise<void> {
    await this.errorCloseButton.click();
  }
}
