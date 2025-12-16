import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { HeaderContainerWrapper } from "../pages/header";
import testUrlsData from "../test-data/urls.json";
import testTextsData from "../test-data/texts.json";
import { CompletePage } from "../pages/complete";
import { MenuElements } from "../pages/menu";

const inventoryUrl = testUrlsData.inventoryUrl;

test("Header elements are displayed properly in complete page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Navigate to confirmation page
  const confirmation = await checkout.navigateToConfirmationPage();

  await confirmation.clickFinishButton();

  // Verify header elements are displayed properly
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);
  expect(
    headerContainerWrapper.headerTitle,
    "header title should be correct"
  ).toHaveText(testTextsData.checkoutCompleteHeader);
});

test("Menu is displayed properly in complete page", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Navigate to confirmation page
  const confirmation = await checkout.navigateToConfirmationPage();

  await confirmation.clickFinishButton();

  // Verify menu is displayed properly
  const menuElements = new MenuElements(page);

  expect(
    menuElements.openMenuLink,
    "open menu link should be visible"
  ).toBeVisible();
});

test("Complete page shows all the success info properly", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Navigate to confirmation page
  const confirmation = await checkout.navigateToConfirmationPage();

  await confirmation.clickFinishButton();

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
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Navigate to confirmation page
  const confirmation = await checkout.navigateToConfirmationPage();

  await confirmation.clickFinishButton();

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
  const viewCart = await inventory.navigateToViewCartPage();

  // Navigate to checkout page
  const checkout = await viewCart.navigateToCheckoutPage();

  // Navigate to confirmation page
  const confirmation = await checkout.navigateToConfirmationPage();

  await confirmation.clickFinishButton();

  const complete = new CompletePage(page);

  // Navigate back to home page
  await complete.navigateBackToHomePage();

  expect(page.url(), "user should be taken to inventory page").toContain(
    inventoryUrl
  );
});
