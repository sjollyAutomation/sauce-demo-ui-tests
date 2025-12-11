import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import testSortingOptionsData from "../test-data/sortingOptions.json";
import { HeaderContainerWrapper } from "../pages/header";

test("Product sort menu is displayed properly along with default sort option", async ({
  page,
  login,
}) => {
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  expect(
    headerContainerWrapper.activeSortOption,
    "default sort option should be active"
  ).toHaveText(testSortingOptionsData.ascName);

  const inventory = new InventoryPage(page);

  expect(await inventory.isAscendingSortingName()).toBe(true);
});

test(`Chaning product sort menu to ${testSortingOptionsData.dscName} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(testSortingOptionsData.dscName);

  expect(await inventory.isDecendingSortingName()).toBe(true);
});

test(`Chaning product sort menu to ${testSortingOptionsData.ascPrice} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(testSortingOptionsData.ascPrice);

  expect(await inventory.isAscendingSortingPrice()).toBe(true);
});

test(`Chaning product sort menu to ${testSortingOptionsData.dscPrice} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(testSortingOptionsData.dscPrice);

  expect(await inventory.isDecendingSortingPrice()).toBe(true);
});
