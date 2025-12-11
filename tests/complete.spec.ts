import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { CheckoutPage } from "../pages/checkout";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { HeaderContainerWrapper } from "../pages/header";
import { ConfirmationPage } from "../pages/confirmation";
import { ViewCartPage } from "../pages/viewCart";
import testUrlsData from "../test-data/urls.json";
import testTextsData from "../test-data/texts.json";
import { CompletePage } from "../pages/complete";

const inventoryUrl = testUrlsData.inventoryUrl;

test("Header elements are displayed properly in complete page", async ({
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

  await confirmation.finishButton.click();

  // Verify header elements are displayed properly
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);
  expect(
    headerContainerWrapper.headerTitle,
    "header title should be correct"
  ).toHaveText(testTextsData.checkoutCompleteHeader);
});

test("Complete page shows all the success info properly", async ({
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

  await confirmation.finishButton.click();

  const complete = new CompletePage(page);

  expect(
    complete.checkoutCompleteContainer,
    "checkout complete container is visible"
  ).toBeVisible();

  expect(complete.successImage, "success image is visible").toBeVisible();

  expect(complete.completeHeader, "complete header is visible").toBeVisible();
  expect(
    complete.completeHeader,
    "correct complete header is displayed"
  ).toHaveText(testTextsData.completeHeader);

  expect(complete.completeText, "complete text is visible").toBeVisible();
  expect(
    complete.completeText,
    "correct complete text is displayed"
  ).toHaveText(testTextsData.completeText);
});

test("Complete page shows the buttons properly", async ({ page, login }) => {
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

  const complete = new CompletePage(page);

  expect(complete.backHomeButton, "back home button is visible").toBeVisible();
  expect(
    complete.backHomeButton,
    "back home button should have the correct label"
  ).toHaveText(testTextsData.backHomeButton);
});

test("Clicking back home button takes the user to inventory page", async ({
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

  await confirmation.finishButton.click();

  const complete = new CompletePage(page);

  await complete.backHomeButton.click();

  expect(page.url(), "user should be taken to inventory page").toContain(
    inventoryUrl
  );
});
