import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import testCredentialsData from "../test-data/credentials.json";
import testErrorData from "../test-data/errorMessages.json";

const standardUserName = testCredentialsData.users.standardUser;
const lockedOutUserName = testCredentialsData.users.lockedOutUser;
const invalidUserName = testCredentialsData.users.invalidUser;
const password = testCredentialsData.password;
const lockedOutErrorMessage = testErrorData.lockedOutError;
const invalidUserErrorMessage = testErrorData.invalidUserError;
const emptyUsernameErrorMessage = testErrorData.emptyUsernameError;
const emptyPasswordErrorMessage = testErrorData.emptyPasswordError;

const cases = [
  {
    user: "",
    pass: "",
    test: "Empty username",
    message: emptyUsernameErrorMessage,
  },
  {
    user: standardUserName,
    pass: "",
    test: "Empty password",
    message: emptyPasswordErrorMessage,
  },
  {
    user: lockedOutUserName,
    pass: password,
    test: "Locked out user",
    message: lockedOutErrorMessage,
  },
  {
    user: invalidUserName,
    pass: password,
    test: "Invalid user",
    message: invalidUserErrorMessage,
  },
];

test.describe("Unsuccessful login verification", () => {
  for (const c of cases) {
    test(c.test, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(c.user, c.pass);
      await testErrorMessage(login, c.message);
    });
  }

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
    await login.clickErrorCloseButton();

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
