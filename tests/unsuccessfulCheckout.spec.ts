import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { ViewCartPage } from "../pages/viewCart";
import { CheckoutPage } from "../pages/checkout";
import testErrorData from "../test-data/errorMessages.json";

const firstNameError = testErrorData.firstNameError;
const lastNameError = testErrorData.lastNameError;
const postalCodeError = testErrorData.postalCodeError;

test("clicking continue button without filling up the first name shows proper error message", async ({
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

  await checkout.continueCheckoutWithoutFirstName();

  await expect(
    checkout.errorBlock,
    "error block should be visible"
  ).toBeVisible();
  await expect(
    checkout.errorBlock,
    "correct error message is displayed"
  ).toHaveText(firstNameError);
});

test("clicking continue button without filling up the last name shows proper error message", async ({
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

  await checkout.continueCheckoutWithoutLastName();

  await expect(
    checkout.errorBlock,
    "error block should be visible"
  ).toBeVisible();
  await expect(
    checkout.errorBlock,
    "correct error message is displayed"
  ).toHaveText(lastNameError);
});

test("clicking continue button without filling up the postal code shows proper error message", async ({
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

  await checkout.continueCheckoutWithoutPostalCode();

  await expect(
    checkout.errorBlock,
    "error block should be visible"
  ).toBeVisible();
  await expect(
    checkout.errorBlock,
    "correct error message is displayed"
  ).toHaveText(postalCodeError);
});
