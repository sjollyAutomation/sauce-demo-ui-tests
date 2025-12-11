import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { ViewCartPage } from "../pages/viewCart";
import { CheckoutPage } from "../pages/checkout";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { HeaderContainerWrapper } from "../pages/header";
import testData from "../test-data/data.json";

const viewCartUrl = testData.urls.viewCartUrl;
const checkoutConfirmationUrl = testData.urls.checkoutConfirmationUrl;

test("Header elements are displayed properly in checkout page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  // Verify header elements are displayed properly
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);
  expect(
    headerContainerWrapper.headerTitle,
    "header title should be correct"
  ).toHaveText("Checkout: Your Information");
});

test("Checkout page shows the input fields correctly", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

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
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  // Verify checkout page is displayed with correct button attributes
  await expect(
    checkout.cancelButton,
    "cancel button should be displayed"
  ).toBeVisible();
  await expect(
    checkout.continueButton,
    "continue button should be displayed"
  ).toBeVisible();
});

test("Clicking cancel button takes the user back to view cart page", async ({
  login,
  page,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  await checkout.cancelButton.click();

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
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  await checkout.continueCheckout();

  expect(page.url(), "user should be taken to confirmation page").toContain(
    checkoutConfirmationUrl
  );
});
