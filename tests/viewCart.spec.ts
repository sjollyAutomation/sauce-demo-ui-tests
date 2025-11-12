import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { CartPage } from "../pages/cart";

test("view cart details page", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  const shoppingCartLink = inventory.shoppingCartLink;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();
  const removeButton = await inventory.firstInventoryItemRemoveButton();
  const firstName = await inventory.firstInventoryItemName.textContent();
  const firstDescription =
    await inventory.firstInventoryItemDescription.textContent();
  const firstPrice = await inventory.firstInventoryItemPrice.textContent();

  // Click add to cart of the first item on the list
  await addToCartButton.click();

  // Click shopping cart link to view the details
  await shoppingCartLink.click();

  const cart = new CartPage(page);

  expect(page.url(), "correct view cart url should be in the bar").toContain(
    cart.viewCartUrl
  );

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
  expect(
    await cart.itemName.textContent(),
    "item name should be correct"
  ).toEqual(firstName);
  expect(
    await cart.itemDescription.textContent(),
    "item description should be correct"
  ).toEqual(firstDescription);
  expect(
    await cart.itemPrice.textContent(),
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
