import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { CartPage } from "../pages/cart";

test("view cart details page shows the elements properly", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  const shoppingCartLink = inventory.shoppingCartLink;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();
  const removeButton = await inventory.firstInventoryItemRemoveButton();
  const firstName = await inventory.getFirstItemNameText();
  const firstDescription = await inventory.getFirstItemDescriptionText();
  const firstPrice = await inventory.getFirstItemPriceText();

  // Click add to cart of the first item on the list
  await addToCartButton.click();

  // Click shopping cart link to view the details
  await shoppingCartLink.click();

  const cart = new CartPage(page);

  expect(
    page.url(),
    "user should be taken to correct view cart page"
  ).toContain(cart.viewCartUrl);

  // Verify cart is displayed with correct attributes
  await expect(cart.title, "cart title should be displayed").toBeVisible();
  await expect(cart.title, "correct title should be visible").toHaveText(
    "Your Cart"
  );
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
  await expect(removeButton, "remove button should be available").toBeVisible();

  // Verify navigation buttons are displayed correctly
  await expect(
    cart.continueShoppingButton,
    "continue shopping button should be visible"
  ).toBeVisible();
  await expect(
    cart.checkoutButton,
    "checkout button should be displayed"
  ).toBeVisible();
});

test("clicking continue shopping button takes user to inventory page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const cart = new CartPage(page);

  // Click continue shopping button
  await cart.continueShoppingButton.click();

  expect(page.url(), "user should be taken to inventory page").toContain(
    inventory.inventoryUrl
  );
});

test("clicking checkout button takes user to checkout page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to view cart page while item is added to the cart
  await inventory.navigateToViewCartPage();

  const cart = new CartPage(page);

  // Click checkout button
  await cart.checkoutButton.click();

  expect(page.url(), "user should be taken to checkout page").toContain(
    inventory.checkoutUrl
  );
});
