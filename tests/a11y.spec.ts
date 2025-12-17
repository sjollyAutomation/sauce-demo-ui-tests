import { test } from "./fixtures/login";
import { LoginPage } from "../pages/login";
import { assertAccessibilityScan } from "./assertions/a11y";
import { InventoryPage } from "../pages/inventory";
import testLocators from "../test-data/locators.json";

test("Login page accessibility", async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();

  await assertAccessibilityScan(testLocators.login, page);
});

test("Accessibility in logged in pages", async ({ page, login }) => {
  await assertAccessibilityScan(testLocators.inventory, page);

  const inventory = new InventoryPage(page);

  // Navigate to product details page
  const details = await inventory.navigateToProductDetailsPage();

  await assertAccessibilityScan(testLocators.inventory, page);

  // Add item to the cart and navigate to view cart page
  const viewCart = await details.navigateToViewCartPage();

  await assertAccessibilityScan(testLocators.cart, page);

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  await assertAccessibilityScan(testLocators.checkout, page);

  // Fill up the required fields and navigate to checkout confirmation page
  const confirmation = await checkout.navigateToConfirmationPage();

  await assertAccessibilityScan(testLocators.confirmation, page);

  // Click the finish button
  await confirmation.clickFinishButton();

  await assertAccessibilityScan(testLocators.complete, page);
});
