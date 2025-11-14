import { test } from "./fixtures/login";
import { expect, Locator } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";

test("add and remove item on product list page", async ({ page, login }) => {
  await expect(
    login.sortingContainer,
    "product sort container should be visible"
  ).toBeVisible();

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
  await expect(
    login.sortingContainer,
    "product sort container should be visible"
  ).toBeVisible();

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
  addItemButton: Locator,
  removeItemButton: Locator
) {
  // Verify the default status of the elements is correct
  expect(
    await shoppingCartLink.textContent(),
    "shopping cart should be empty by default"
  ).toEqual("");

  await expect(
    addItemButton,
    "add to cart button should be visible"
  ).toBeVisible();

  await expect(removeItemButton, "remove button should be hidden").toBeHidden();

  // Click add to cart button
  await addItemButton.click();

  // Verify elements are updated properly after adding an item to cart
  expect(
    await shoppingCartLink.textContent(),
    "shopping cart should have one item added"
  ).toEqual("1");

  await expect(
    addItemButton,
    "add to cart button is hidden for the added item"
  ).toBeHidden();

  await expect(
    removeItemButton,
    "remove button is displayed for the added item"
  ).toBeVisible();
}

async function verifyRemoveItem(
  shoppingCartLink: Locator,
  addItemButton: Locator,
  removeItemButton: Locator
) {
  // Verify the elements are displayed properly when items are added to the cart
  expect(
    await shoppingCartLink.textContent(),
    "shopping cart shouldn't be empty after adding items"
  ).toEqual("1");

  await expect(
    removeItemButton,
    "remove button should be available for the added items"
  ).toBeVisible();

  await expect(
    addItemButton,
    "add to cart button should be hidden for the added item"
  ).toBeHidden();

  // Click remove button
  await removeItemButton.click();

  // Verify elements are updated properly after removing items from the cart
  expect(
    await shoppingCartLink.textContent(),
    "shopping cart should be empty after removing added items"
  ).toEqual("");

  await expect(
    addItemButton,
    "add to cart button should be available when shopping cart is empty"
  ).toBeVisible();

  await expect(
    removeItemButton,
    "remove button should be hidden when the shopping cart is empty"
  ).toBeHidden();
}
