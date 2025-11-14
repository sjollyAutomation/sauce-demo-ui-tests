import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import testData from "../../test-data/data.json";

type LoginFixtures = {
  login: LoginPage;
};

export const test = base.extend<LoginFixtures>({
  login: async ({ page }, use) => {
    const login = new LoginPage(page);

    // Go to Login page
    await login.goto();

    // Login with valid credentials
    await login.login(testData.users.standardUser, testData.password);

    // Provide the login instance to the test
    await use(login);

    // Logout after the test
    await login.logout();
  },
});
