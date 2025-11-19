import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";

test("inventory details are displayed properly", async ({ page, login }) => {
  await expect(
    login.sortingContainer,
    "product sort container should be visible"
  ).toBeVisible();

  const inventory = new InventoryPage(page);

  await expect(
    inventory.inventoryContainer,
    "inventory container should be displayed after successful login"
  ).toBeVisible();

  // Get the element text values of first item
  const firstName = await inventory.getFirstItemNameText();
  const firstDescription = await inventory.getFirstItemDescriptionText();
  const firstPrice = await inventory.getFirstItemPriceText();

  // First item on the list is displayed properly along with all the attributes
  await expect(
    inventory.firstInventoryItemImage,
    "image is available for the item"
  ).toBeVisible();
  await expect(
    inventory.firstInventoryItemName,
    "name is displayed for the item"
  ).toBeVisible();
  await expect(
    inventory.firstInventoryItemDescription,
    "description is visible for the item"
  ).toBeVisible();
  await expect(
    inventory.firstInventoryItemPrice,
    "price is shown for the item"
  ).toBeVisible();
  await expect(
    await inventory.firstInventoryItemAddToCartButton(),
    "add to cart button is displayed for the item"
  ).toBeVisible();

  // Click on the name link
  await inventory.firstInventoryItemName.click();

  // Verify item details page shows the expected elements with correct values
  await expect(
    inventory.inventoryItem,
    "item is displayed properly"
  ).toBeVisible();
  await expect(inventory.itemImage, "image is visible properly").toBeVisible();
  expect(
    await inventory.getItemNameText(),
    "name is displayed correctly"
  ).toEqual(firstName);
  expect(
    await inventory.getItemDescriptionText(),
    "description is shown properly"
  ).toEqual(firstDescription);
  expect(
    await inventory.getItemPriceText(),
    "correct price is displayed"
  ).toEqual(firstPrice);
  await expect(
    inventory.itemAddToCartButton,
    "add to cart button is displayed properly"
  ).toBeVisible();

  // Click on back to products link
  await inventory.backToProductsLink.click();

  await expect(
    inventory.backToProductsLink,
    "back to products link is hidden on the item list page"
  ).not.toBeVisible();
});
