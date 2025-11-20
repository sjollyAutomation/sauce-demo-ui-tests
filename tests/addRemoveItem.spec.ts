import { test } from "./fixtures/login";
import { expect, Locator } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";

test("add and remove item on product list page", async ({ page, login }) => {
  await expect(
    login.sortingContainer,
    "product sort container should be visible"
  ).toBeVisible();

  const inventory = new InventoryPage(page);
  const shoppingCartBadge = inventory.shoppingCartBadge;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();
  const removeButton = await inventory.firstInventoryItemRemoveButton();

  // Verify adding item to the cart on product list page works properly
  await verifyAddItem(shoppingCartBadge, addToCartButton, removeButton);

  // Verify removing item from the cart on product list page works properly
  await verifyRemoveItem(shoppingCartBadge, addToCartButton, removeButton);
});

test("add and remove item on product details page", async ({ page, login }) => {
  await expect(
    login.sortingContainer,
    "product sort container should be visible"
  ).toBeVisible();

  const inventory = new InventoryPage(page);

  // Go to first item details page
  await inventory.firstInventoryItemName.click();

  const shoppingCartBadge = inventory.shoppingCartBadge;
  const addToCartButton = inventory.itemAddToCartButton;
  const removeButton = inventory.itemRemoveButton;

  // Verify adding item to the cart on product details page works properly
  await verifyAddItem(shoppingCartBadge, addToCartButton, removeButton);

  // Verify removing item from the cart on product details page works properly
  await verifyRemoveItem(shoppingCartBadge, addToCartButton, removeButton);
});

async function verifyAddItem(
  shoppingCartBadge: Locator,
  addItemButton: Locator,
  removeItemButton: Locator
) {
  // Verify the default status of the elements is correct
  expect(
    shoppingCartBadge,
    "shopping cart badge is hidden when the cart is empty"
  ).toBeHidden();

  await expect(
    addItemButton,
    "add to cart button should be visible"
  ).toBeVisible();

  await expect(removeItemButton, "remove button should be hidden").toBeHidden();

  // Click add to cart button
  await addItemButton.click();

  // Verify elements are updated properly after adding an item to cart
  expect(
    shoppingCartBadge,
    "shopping cart badge is displayed when the cart is not empty"
  ).toBeVisible();
  expect(
    shoppingCartBadge,
    "shopping cart badge should have one item added"
  ).toHaveText("1");

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
  shoppingCartBadge: Locator,
  addItemButton: Locator,
  removeItemButton: Locator
) {
  // Verify the elements are displayed properly when items are added to the cart
  expect(
    shoppingCartBadge,
    "shopping cart badge is displayed when the cart is not empty"
  ).toBeVisible();
  expect(
    shoppingCartBadge,
    "shopping cart badge should have one item added"
  ).toHaveText("1");

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
    shoppingCartBadge,
    "shopping cart badge should be hidden when cart is empty"
  ).toBeHidden();

  await expect(
    addItemButton,
    "add to cart button should be available when shopping cart is empty"
  ).toBeVisible();

  await expect(
    removeItemButton,
    "remove button should be hidden when the shopping cart is empty"
  ).toBeHidden();
}
