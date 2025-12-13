import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import { HeaderContainerWrapper } from "../pages/header";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { DetailsPage } from "../pages/details";
import { MenuElements } from "../pages/menu";

test("Product details are displayed properly", async ({ page, login }) => {
  const inventory = new InventoryPage(page);

  // Get the element text values of first item
  const firstName = await inventory.getFirstItemNameText();
  const firstDescription = await inventory.getFirstItemDescriptionText();
  const firstPrice = await inventory.getFirstItemPriceText();

  // Click on the name link
  await inventory.firstInventoryItemName.click();

  const inventoryDetails = new DetailsPage(page);

  // Verify header elements are displayed properly
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);

  // Verify item details page shows the expected elements with correct values
  await expect(
    inventoryDetails.inventoryItem,
    "item is displayed properly"
  ).toBeVisible();
  await expect(
    inventoryDetails.itemImage,
    "image is visible properly"
  ).toBeVisible();
  expect(
    await inventoryDetails.getItemNameText(),
    "name is displayed correctly"
  ).toEqual(firstName);
  expect(
    await inventoryDetails.getItemDescriptionText(),
    "description is shown properly"
  ).toEqual(firstDescription);
  expect(
    await inventoryDetails.getItemPriceText(),
    "correct price is displayed"
  ).toEqual(firstPrice);
  await expect(
    inventoryDetails.itemAddToCartButton,
    "add to cart button is displayed properly"
  ).toBeVisible();

  // Click on back to products link
  await inventoryDetails.backToProductsLink.click();

  await expect(
    inventoryDetails.backToProductsLink,
    "back to products link is hidden on the item list page"
  ).not.toBeVisible();
});

test("Menu is displayed properly in product details page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Click on the name link
  await inventory.firstInventoryItemName.click();

  // Verify menu is displayed properly
  const menuElements = new MenuElements(page);

  expect(
    menuElements.openMenuLink,
    "open menu link should be visible"
  ).toBeVisible();
});
