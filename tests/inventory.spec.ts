import { HeaderContainerWrapper } from "../pages/header";
import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import testUrlsData from "../test-data/urls.json";
import testTextsData from "../test-data/texts.json";
import { expectHeaderVisibleWithText } from "./assertions/header";
import { InventoryPage } from "../pages/inventory";

const inventoryUrl = testUrlsData.inventoryUrl;

test("User should be taken to inventory page after successful login", async ({
  login,
  page,
}) => {
  expect(
    login.loginButton,
    "login button should be hidden after successful login"
  ).not.toBeVisible();

  expect(page.url(), "user should be taken to inventory page").toContain(
    inventoryUrl
  );
});

test("Header elements are displayed properly", async ({ page, login }) => {
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  await expectHeaderVisibleWithText(headerContainerWrapper);

  expect(
    headerContainerWrapper.headerTitle,
    "header title should be correct"
  ).toHaveText(testTextsData.inventoryHeader);
});

test("Inventory container elements are displayed properly", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

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
});
