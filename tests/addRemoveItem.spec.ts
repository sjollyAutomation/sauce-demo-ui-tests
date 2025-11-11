import { test } from "./fixtures/login";
import { expect, Locator } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";

test("add and remove item on product list page", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  const shoppingCartLink = inventory.shoppingCartLink;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();
  const removeButton = await inventory.firstInventoryItemRemoveButton();

  // Verify adding item to the cart on product list page works properly
  await verifyAddItem(shoppingCartLink, addToCartButton, removeButton);

  // Verify removing item from the cart on product list page works properly
  await verifyRemoveItem(shoppingCartLink, addToCartButton, removeButton);
});

test("add and remove item on product details page", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  // Go to first item details page
  await inventory.firstInventoryItemName.click();

  const shoppingCartLink = inventory.shoppingCartLink;
  const addToCartButton = inventory.itemAddToCartButton;
  const removeButton = inventory.itemRemoveButton;

  // Verify adding item to the cart on product details page works properly
  await verifyAddItem(shoppingCartLink, addToCartButton, removeButton);

  // Verify removing item from the cart on product details page works properly
  await verifyRemoveItem(shoppingCartLink, addToCartButton, removeButton);
});

async function verifyAddItem(
  shoppingCartLink: Locator,
  addItemLocator: Locator,
  removeItemLocator: Locator
) {
  // Verify shopping cart is empty
  expect(await shoppingCartLink.textContent()).toEqual("");

  // Verify add to cart button exists
  await expect(addItemLocator).toBeVisible();

  // Verify remove button is not visible
  await expect(removeItemLocator).toBeHidden();

  // Click add to cart button
  await addItemLocator.click();

  // Verify shopping cart is not empty
  expect(await shoppingCartLink.textContent()).toEqual("1");

  // Verify add to cart button disappears
  await expect(addItemLocator).toBeHidden();

  // Verify remove button is visible
  await expect(removeItemLocator).toBeVisible();
}

async function verifyRemoveItem(
  shoppingCartLink: Locator,
  addItemLocator: Locator,
  removeItemLocator: Locator
) {
  // Verify shopping cart is not empty
  expect(await shoppingCartLink.textContent()).toEqual("1");

  // Verify remove button is visible
  await expect(removeItemLocator).toBeVisible();

  // Verify add to cart button is not visible
  await expect(addItemLocator).toBeHidden();

  // Click remove button
  await removeItemLocator.click();

  // Verify shopping cart is empty
  expect(await shoppingCartLink.textContent()).toEqual("");

  // Verify add to cart button exists
  await expect(addItemLocator).toBeVisible();

  // Verify remove button is not visible
  await expect(removeItemLocator).toBeHidden();
}
