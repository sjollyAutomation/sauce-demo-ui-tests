import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { CartPage } from "../pages/cart";
import testData from "../test-data/data.json";
import { HeaderContainerWrapper } from "../pages/header";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { ViewCartPage } from "../pages/viewCart";

const checkoutUrl = testData.urls.checkoutUrl;
const inventoryUrl = testData.urls.inventoryUrl;
const viewCartUrl = testData.urls.viewCartUrl;

test("Header elements are displayed properly in view cart page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  // Verify header elements are displayed properly
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);
  expect(
    headerContainerWrapper.headerTitle,
    "header title should be correct"
  ).toHaveText("Your Cart");
});

test("View cart details page shows the added item information properly", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  const firstName = await inventory.getFirstItemNameText();
  const firstDescription = await inventory.getFirstItemDescriptionText();
  const firstPrice = await inventory.getFirstItemPriceText();

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const cart = new CartPage(page);

  expect(
    page.url(),
    "user should be taken to correct view cart page"
  ).toContain(viewCartUrl);

  // Verify cart is displayed with correct attributes
  await expect(
    cart.cartQuantityLabel,
    "cart quantity label should be visible"
  ).toBeVisible();
  await expect(
    cart.cartDescriptionLabel,
    "cart description label should be displayed"
  ).toBeVisible();

  // Verify cart list is displayed correctly
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

test("Buttons are displayed properly in view cart page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const cart = new CartPage(page);
  const viewCart = new ViewCartPage(page);

  // Verify associated buttons are displayed correctly
  await expect(
    await cart.getRemoveButton(),
    "remove button should be visible"
  ).toBeVisible();
  await expect(
    viewCart.continueShoppingButton,
    "continue shopping button should be visible"
  ).toBeVisible();
  await expect(
    viewCart.checkoutButton,
    "checkout button should be displayed"
  ).toBeVisible();
});

test("Clicking continue shopping button takes user to inventory page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click continue shopping button
  await viewCart.continueShoppingButton.click();

  expect(page.url(), "user should be taken to inventory page").toContain(
    inventoryUrl
  );
});

test("Clicking checkout button takes user to checkout page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const viewCart = new ViewCartPage(page);

  // Click checkout button
  await viewCart.checkoutButton.click();

  expect(page.url(), "user should be taken to checkout page").toContain(
    checkoutUrl
  );
});
