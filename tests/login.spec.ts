import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login";

test("Login page loads correctly", async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();

  // Verify the login page shows only the expected elements
  await expect(login.title, "correct title should be displayed").toHaveText(
    "Swag Labs"
  );

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

  expect(
    login.errorContainer,
    "no error container should be visible by default"
  ).toBeHidden();
});
