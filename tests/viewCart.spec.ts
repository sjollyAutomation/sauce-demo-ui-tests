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

  // Verify correct url is displayed
  expect(page.url()).toContain(cart.viewCartUrl);

  // Verify title is displayed correctly
  await expect(cart.title).toBeVisible();
  await expect(cart.title).toHaveText("Your Cart");

  // Verify labels are displayed correctly
  await expect(cart.cartQuantityLabel).toBeVisible();
  await expect(cart.cartDescriptionLabel).toBeVisible();

  // Verify cart list is displayed correctly
  await expect(cart.cartList).toBeVisible();
  await expect(cart.itemQuantity).toHaveText("1");
  expect(await cart.itemName.textContent()).toEqual(firstName);
  expect(await cart.itemDescription.textContent()).toEqual(firstDescription);
  expect(await cart.itemPrice.textContent()).toEqual(firstPrice);
  await expect(removeButton).toBeVisible();

  // Verify navigation buttons are displayed correctly
  await expect(cart.continueShoppingButton).toBeVisible();
  await expect(cart.checkoutButton).toBeVisible();
});
