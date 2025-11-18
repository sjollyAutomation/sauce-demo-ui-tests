import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { CartPage } from "../pages/cart";
import { CheckoutPage } from "../pages/checkout";

test("checkout page shows the elements correctly", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  const shoppingCartLink = inventory.shoppingCartLink;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();

  // Click add to cart of the first item on the list
  await addToCartButton.click();

  // Click shopping cart link to view the details
  await shoppingCartLink.click();

  const cart = new CartPage(page);

  // Click checkout button
  await cart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  // Verify checkout page is displayed with correct attributes
  await expect(
    checkout.title,
    "checkout title should be displayed"
  ).toBeVisible();
  await expect(checkout.title, "checkout title should be visible").toHaveText(
    "Checkout: Your Information"
  );
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
  await expect(
    checkout.cancelButton,
    "cancel button should be displayed"
  ).toBeVisible();
  await expect(
    checkout.continueButton,
    "continue button should be displayed"
  ).toBeVisible();
});

test("clicking cancel button takes the user back to view cart page", async ({
  login,
  page,
}) => {
  const inventory = new InventoryPage(page);

  const shoppingCartLink = inventory.shoppingCartLink;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();

  // Click add to cart of the first item on the list
  await addToCartButton.click();

  // Click shopping cart link to view the details
  await shoppingCartLink.click();

  const cart = new CartPage(page);

  // Click checkout button
  await cart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  await checkout.cancelButton.click();

  expect(page.url(), "user should be taken back to view cart page").toContain(
    cart.viewCartUrl
  );
});

test("filling up the required field and clicking continue button takes the user to checkout confirmation page", async ({
  login,
  page,
}) => {
  const inventory = new InventoryPage(page);

  const shoppingCartLink = inventory.shoppingCartLink;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();

  // Click add to cart of the first item on the list
  await addToCartButton.click();

  // Click shopping cart link to view the details
  await shoppingCartLink.click();

  const cart = new CartPage(page);

  // Click checkout button
  await cart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  await checkout.continueCheckout();

  expect(page.url(), "user should be taken to confirmation page").toContain(
    checkout.checkoutConfirmationUrl
  );
});
