import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import testData from "../../test-data/data.json";
import { log } from "console";

type LoginFixtures = {
  login: LoginPage;
};

export const test = base.extend<LoginFixtures>({
  login: async ({ page }, use) => {
    const login = new LoginPage(page);

    // Go to home page
    await login.goto();

    expect(page, "correct title should be displayed").toHaveTitle("Swag Labs");

    expect(
      login.primaryHeader,
      "primary header shouldn't be visible in the login page"
    ).not.toBeVisible();

    expect(
      login.usernameTextField,
      "username field should be visible properly"
    ).toBeVisible();

    expect(
      login.passwordTextField,
      "password field should be visible properly"
    ).toBeVisible();

    expect(
      login.passwordTextField,
      "password field type should be password"
    ).toHaveAttribute("type", "password");

    expect(
      login.usernameTextField,
      "username field should have correct placeholder value"
    ).toHaveAttribute("placeholder", "Username");

    expect(
      login.passwordTextField,
      "password field should have correct placeholder value"
    ).toHaveAttribute("placeholder", "Password");

    expect(login.loginButton, "login button should be visible").toBeVisible();
    expect(login.loginButton, "login button should be enabled").toBeEnabled();

    expect(login.logoutLink, "logout link should be hidden").not.toBeVisible();

    expect(
      login.errorContainer,
      "no error container should be visible by default"
    ).toBeHidden();

    // Login with valid credentials
    await login.login(testData.users.standardUser, testData.password);

    // Provide the login instance to the test
    await use(login);

    expect(
      login.loginButton,
      "login button should be hidden after successful login"
    ).not.toBeVisible();

    expect(
      login.primaryHeader,
      "primary header should be visible"
    ).toBeVisible();

    expect(login.logoutLink, "logout link should be visible").toBeVisible();

    // Logout after the test
    await login.logout();
  },
});
