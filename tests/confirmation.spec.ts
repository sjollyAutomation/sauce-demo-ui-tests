import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { CartPage } from "../pages/cart";
import { CheckoutPage } from "../pages/checkout";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { HeaderContainerWrapper } from "../pages/header";
import { ConfirmationPage } from "../pages/confirmation";
import { ViewCartPage } from "../pages/viewCart";
import testUrlsData from "../test-data/urls.json";
import testTextsData from "../test-data/texts.json";

const inventoryUrl = testUrlsData.inventoryUrl;
const checkoutCompleteUrl = testUrlsData.checkoutCompleteUrl;

test("Header elements are displayed properly in confirmation page", async ({
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

  await checkout.continueCheckout();

  // Verify header elements are displayed properly
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);
  expect(
    headerContainerWrapper.headerTitle,
    "header title should be correct"
  ).toHaveText(testTextsData.checkoutConfirmationHeader);
});

test("Confirmation page shows the added item information correctly", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  const firstName = await inventory.getFirstItemNameText();
  const firstDescription = await inventory.getFirstItemDescriptionText();
  const firstPrice = await inventory.getFirstItemPriceText();

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  await checkout.continueCheckout();

  const cart = new CartPage(page);

  // Verify added item is displayed with correct attributes
  await expect(
    cart.cartQuantityLabel,
    "cart quantity label should be visible"
  ).toBeVisible();
  await expect(
    cart.cartDescriptionLabel,
    "cart description label should be displayed"
  ).toBeVisible();

  // Verify added item is listed correctly
  await expect(cart.cartList, "cart list should be visible").toBeVisible();
  await expect(
    cart.itemQuantity,
    "correct item quantity is displayed"
  ).toHaveText("1");
  expect(await cart.getItemNameText(), "item name should be correct").toEqual(
    firstName
  );
  expect(
    await cart.getItemDescriptionText(),
    "item description should be correct"
  ).toEqual(firstDescription);
  expect(
    await cart.getItemPriceText(),
    "item price should have correct value"
  ).toEqual(firstPrice);
});

test("Confirmation page summary info correctly", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  const firstName = await inventory.getFirstItemNameText();
  const firstDescription = await inventory.getFirstItemDescriptionText();
  const firstPrice = await inventory.getFirstItemPriceText();

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  const checkout = new CheckoutPage(page);

  await checkout.continueCheckout();

  const confirmation = new ConfirmationPage(page);

  // Verify summary info is displayed correctly
  await expect(
    confirmation.paymentInfoLabel,
    "payment info label should be visible"
  ).toBeVisible();
  await expect(
    confirmation.paymentInfoLabel,
    "correct payment info label is displayed"
  ).toHaveText(testTextsData.paymentInfoLabel);
  await expect(
    confirmation.paymentInfoValue,
    "payment info value should be displayed"
  ).toBeVisible();
  await expect(
    confirmation.paymentInfoValue,
    "correct payment info value is displayed"
  ).toHaveText(testTextsData.paymentInfoValue);

  await expect(
    confirmation.shippingInfoLabel,
    "shipping info label should be visible"
  ).toBeVisible();
  await expect(
    confirmation.shippingInfoLabel,
    "correct shipping info label is displayed"
  ).toHaveText(testTextsData.shippingInfoLabel);
  await expect(
    confirmation.shippingInfoValue,
    "shipping info value should be displayed"
  ).toBeVisible();
  await expect(
    confirmation.shippingInfoValue,
    "correct shipping info value is displayed"
  ).toHaveText(testTextsData.shippingInfoValue);

  await expect(
    confirmation.totalInfoLabel,
    "total info label should be visible"
  ).toBeVisible();
  await expect(
    confirmation.totalInfoLabel,
    "correct total info label is displayed"
  ).toHaveText(testTextsData.priceTotalLabel);

  await expect(
    confirmation.subtotalLabel,
    "subtotal info label should be visible"
  ).toBeVisible();
  await expect(
    confirmation.subtotalLabel,
    "correct subtotal info label is displayed"
  ).toContainText(firstPrice);

  await expect(
    confirmation.taxLabel,
    "tax info label should be visible"
  ).toBeVisible();
  await expect(
    confirmation.taxLabel,
    "correct tax info label is displayed"
  ).toContainText((await confirmation.getTaxValue()).toString());

  await expect(
    confirmation.totalLabel,
    "total label should be visible"
  ).toBeVisible();
  await expect(
    confirmation.totalLabel,
    "correct total label is displayed"
  ).toContainText((await confirmation.getTotalValue()).toString());
});

test("Buttons are displayed correctly in confirmation page", async ({
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

  await checkout.continueCheckout();

  const confirmation = new ConfirmationPage(page);

  // Verify confirmation page is displayed with correct button attributes
  await expect(
    confirmation.cancelButton,
    "cancel button should be displayed"
  ).toBeVisible();
  await expect(
    confirmation.cancelButton,
    "cancel button should have correct label"
  ).toHaveText(testTextsData.cancelButton);
  await expect(
    confirmation.finishButton,
    "finish button should be displayed"
  ).toBeVisible();
  await expect(
    confirmation.finishButton,
    "finish button should have correct label"
  ).toHaveText(testTextsData.finishButton);
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

  await checkout.continueCheckout();

  const confirmation = new ConfirmationPage(page);

  await confirmation.cancelButton.click();

  expect(page.url(), "user should be taken back to inventory page").toContain(
    inventoryUrl
  );
});

test("Clicking finish button takes the user to complete page", async ({
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

  const confirmation = new ConfirmationPage(page);

  await confirmation.finishButton.click();

  expect(page.url(), "user should be taken to complete page").toContain(
    checkoutCompleteUrl
  );
});
