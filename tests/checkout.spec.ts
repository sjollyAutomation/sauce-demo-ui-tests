import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { MenuElements } from "../pages/menu";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { HeaderContainerWrapper } from "../pages/header";
import testUrlsData from "../test-data/urls.json";
import testTextsData from "../test-data/texts.json";

const viewCartUrl = testUrlsData.viewCartUrl;
const checkoutConfirmationUrl = testUrlsData.checkoutConfirmationUrl;

test("Header elements are displayed properly in checkout page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  await viewCart.navigateToCheckoutPage();

  // Verify header elements are displayed properly
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);
  expect(
    headerContainerWrapper.headerTitle,
    "header title should be correct"
  ).toHaveText(testTextsData.checkoutHeader);
});

test("Menu is displayed properly in checkout page", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  await viewCart.navigateToCheckoutPage();

  // Verify menu is displayed properly
  const menuElements = new MenuElements(page);

  expect(
    menuElements.openMenuLink,
    "open menu link should be visible"
  ).toBeVisible();
});

test("Checkout page shows the input fields correctly", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Verify checkout page is displayed with input fields
  await expect(
    checkout.firstNameInputField,
    "first name input field should be displayed"
  ).toBeVisible();
  await expect(
    checkout.lastNameInputField,
    "last name input field should be displayed"
  ).toBeVisible();
  await expect(
    checkout.postalCodeInputField,
    "zip/postal code input field should be displayed"
  ).toBeVisible();
});

test("Buttons are displayed correctly in checkout page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  /// Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Verify checkout page is displayed with correct button attributes
  await expect(
    checkout.cancelButton,
    "cancel button should be displayed"
  ).toBeVisible();
  await expect(
    checkout.cancelButton,
    "cancel button should have correct label"
  ).toHaveText(testTextsData.cancelButton);
  await expect(
    checkout.continueButton,
    "continue button should be displayed"
  ).toBeVisible();
  await expect(
    checkout.continueButton,
    "continue button should have correct label"
  ).toHaveText(testTextsData.continueButton);
});

test("Clicking cancel button takes the user back to view cart page", async ({
  login,
  page,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  await checkout.clickCancelButton();

  expect(page.url(), "user should be taken back to view cart page").toContain(
    viewCartUrl
  );
});

test("Filling up the required field and clicking continue button takes the user to checkout confirmation page", async ({
  login,
  page,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Navigate to confirmation page
  await checkout.navigateToConfirmationPage();

  expect(page.url(), "user should be taken to confirmation page").toContain(
    checkoutConfirmationUrl
  );
});
