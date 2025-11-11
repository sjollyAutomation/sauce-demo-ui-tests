import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";

test("inventory details", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  // Verify inventory container is visible after successful login
  await expect(inventory.inventoryContainer).toBeVisible();

  // Get the element text values of first item
  const firstName = await inventory.firstInventoryItemName.textContent();
  const firstDescription =
    await inventory.firstInventoryItemDescription.textContent();
  const firstPrice = await inventory.firstInventoryItemPrice.textContent();

  // Verify first item has all the expected elements
  await expect(inventory.firstInventoryItemImage).toBeVisible();
  await expect(inventory.firstInventoryItemName).toBeVisible();
  await expect(inventory.firstInventoryItemDescription).toBeVisible();
  await expect(inventory.firstInventoryItemPrice).toBeVisible();
  await expect(
    await inventory.firstInventoryItemAddToCartButton()
  ).toBeVisible();

  // Click on the name link
  await inventory.firstInventoryItemName.click();

  // Verify the page shows the expected elements with correct values
  await expect(inventory.inventoryItem).toBeVisible();
  await expect(inventory.itemImage).toBeVisible();
  expect(await inventory.itemName.textContent()).toEqual(firstName);
  expect(await inventory.itemDescription.textContent()).toEqual(
    firstDescription
  );
  expect(await inventory.itemPrice.textContent()).toEqual(firstPrice);
  await expect(inventory.itemAddToCartButton).toBeVisible();

  // Click on back to products link
  await inventory.backToProductsLink.click();

  // Verify inventory container is visible after going back to products list
  await expect(inventory.inventoryContainer).toBeVisible();
});
