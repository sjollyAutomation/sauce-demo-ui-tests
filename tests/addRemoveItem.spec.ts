import { test } from "./fixtures/login";
import { expect, Locator } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { HeaderContainerWrapper } from "../pages/header";
import { DetailsPage } from "../pages/details";
import testTextsData from "../test-data/texts.json";

test("Adding and removing item on product list page should work correctly", async ({
  page,
  login,
}) => {
  const headerContainerWrapper = new HeaderContainerWrapper(page);
  const inventory = new InventoryPage(page);
  const shoppingCartBadge = headerContainerWrapper.shoppingCartBadge;
  const addToCartButton = await inventory.firstInventoryItemAddToCartButton();
  const removeButton = await inventory.firstInventoryItemRemoveButton();

  // Verify the elements are displayed properly in inventory page when no item is added
  await verifyEmptyShoppingCart(
    shoppingCartBadge,
    addToCartButton,
    removeButton
  );

  // Add item to the shopping cart
  await inventory.addItemToCart();

  // Verify the elements are updated properly in inventory page after item is added
  await verifyAddedShoppingCart(
    shoppingCartBadge,
    addToCartButton,
    removeButton
  );

  // Remove item from the cart
  await inventory.removeItemFromCart();

  // Verify the elements are updated properly in inventory page after item is removed
  await verifyEmptyShoppingCart(
    shoppingCartBadge,
    addToCartButton,
    removeButton
  );
});

test("Adding and removing item on product details page should work properly", async ({
  page,
  login,
}) => {
  const headerContainerWrapper = new HeaderContainerWrapper(page);
  const inventory = new InventoryPage(page);

  // Navigate to product details page
  await inventory.navigateToProductDetailsPage();

  const shoppingCartBadge = headerContainerWrapper.shoppingCartBadge;

  const inventoryDetails = new DetailsPage(page);
  const addToCartButton = inventoryDetails.itemAddToCartButton;
  const removeButton = inventoryDetails.itemRemoveButton;

  // Verify the elements are displayed properly in product details page when no item is added
  await verifyEmptyShoppingCart(
    shoppingCartBadge,
    addToCartButton,
    removeButton
  );

  // Add item to the shopping cart
  await inventoryDetails.addItemToCart();

  // Verify the elements are updated properly in product details page after item is added
  await verifyAddedShoppingCart(
    shoppingCartBadge,
    addToCartButton,
    removeButton
  );

  // Remove item from the cart
  await inventoryDetails.removeItemFromCart();

  // Verify the elements are updated properly in product details page after item is removed
  await verifyEmptyShoppingCart(
    shoppingCartBadge,
    addToCartButton,
    removeButton
  );
});

async function verifyAddedShoppingCart(
  shoppingCartBadge: Locator,
  addToCartButton: Locator,
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
    removeItemButton,
    "remove button should have the correct label"
  ).toHaveText(testTextsData.removeButton);

  await expect(
    addToCartButton,
    "add to cart button should be hidden"
  ).toBeHidden();
}

async function verifyEmptyShoppingCart(
  shoppingCartBadge: Locator,
  addItemButton: Locator,
  removeItemButton: Locator
) {
  // Verify the empty status of the elements is correct
  expect(
    shoppingCartBadge,
    "shopping cart badge is hidden when the cart is empty"
  ).toBeHidden();

  await expect(
    addItemButton,
    "add to cart button should be visible"
  ).toBeVisible();

  await expect(removeItemButton, "remove button should be hidden").toBeHidden();
}
