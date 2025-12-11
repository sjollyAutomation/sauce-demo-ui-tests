import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { HeaderContainerWrapper } from "../../pages/header";
import testCredentialsData from "../../test-data/credentials.json";

type LoginFixtures = {
  login: LoginPage;
};

export const test = base.extend<LoginFixtures>({
  login: async ({ page }, use) => {
    const login = new LoginPage(page);

    // Go to Login page
    await login.goto();

    // Login with valid credentials
    await login.login(
      testCredentialsData.users.standardUser,
      testCredentialsData.password
    );

    // Provide the login instance to the test
    await use(login);

    // Logout after the test
    const headerContainer = new HeaderContainerWrapper(page);
    await headerContainer.logout();
  },
});
