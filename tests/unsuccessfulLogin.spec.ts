import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import testData from "../test-data/data.json";

const standardUserName = testData.users.standardUser;
const lockedOutUserName = testData.users.lockedOutUser;
const invalidUserName = testData.users.invalidUser;
const password = testData.password;
const lockedOutErrorMessage = testData.errorMessage.lockedOutError;
const invalidUserErrorMessage = testData.errorMessage.invalidUserError;
const emptyUsernameErrorMessage = testData.errorMessage.emptyUsernameError;
const emptyPasswordErrorMessage = testData.errorMessage.emptyPasswordError;

test.describe("unsuccessful login verification", () => {
  test("Empty username", async ({ page }) => {
    const login = new LoginPage(page);

    // Go to home page
    await login.goto();

    // Click login button without filling up username and password fields
    await login.login("", "");

    // Verify error message is displayed for empty username
    await testErrorMessage(login, emptyUsernameErrorMessage);
  });

  test("Empty password", async ({ page }) => {
    const login = new LoginPage(page);

    // Go to home page
    await login.goto();

    // Fill up username field with standard username
    await login.login(standardUserName, "");

    // Verify error message is displayed for empty username
    await testErrorMessage(login, emptyPasswordErrorMessage);
  });

  test("locked out user login", async ({ page }) => {
    const login = new LoginPage(page);

    // Go to home page
    await login.goto();

    // Fill up username field with locked out username
    // Fill up password field
    await login.login(lockedOutUserName, password);

    // Verify error message is displayed for locked out user
    await testErrorMessage(login, lockedOutErrorMessage);
  });

  test("invalid user login", async ({ page }) => {
    const login = new LoginPage(page);

    // Go to home page
    await login.goto();

    // Fill up username field with invalid username
    // Fill up password field
    await login.login(invalidUserName, password);

    // Verify error message is displayed for invalid user
    await testErrorMessage(login, invalidUserErrorMessage);
  });

  async function testErrorMessage(login: LoginPage, errorMessage: string) {
    // Verify error container is displayed with correct error message and close button
    await expect(
      login.errorContainer,
      "error container should be visible after unsuccessful login"
    ).toBeVisible();

    await expect(
      login.errorContainer,
      "correct error message should be displayed"
    ).toHaveText(errorMessage);

    await expect(
      login.errorCloseButton,
      "close button should be available in the error container"
    ).toBeVisible();

    // Click the error close button
    await login.errorCloseButton.click();

    // Verify error container is hidden properly
    await expect(
      login.errorContainer,
      "error container is hidden after clicking close button"
    ).toBeHidden();
    await expect(
      login.errorCloseButton,
      "close button in the error container should be hidden"
    ).toBeHidden();
  }
});
