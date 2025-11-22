import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import testData from "../test-data/data.json";
import { HeaderContainerWrapper } from "../pages/header";

const sortingOptions = testData.sortingOptions;

test("Product sort menu is displayed properly along with default sort option", async ({
  page,
  login,
}) => {
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  expect(
    headerContainerWrapper.activeSortOption,
    "default sort option should be active"
  ).toHaveText(sortingOptions.ascName);

  const inventory = new InventoryPage(page);

  expect(await inventory.isAscendingSortingName()).toBe(true);
});

test(`Chaning product sort menu to ${sortingOptions.dscName} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(sortingOptions.dscName);

  expect(await inventory.isDecendingSortingName()).toBe(true);
});

test(`Chaning product sort menu to ${sortingOptions.ascPrice} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(sortingOptions.ascPrice);

  expect(await inventory.isAscendingSortingPrice()).toBe(true);
});

test(`Chaning product sort menu to ${sortingOptions.dscPrice} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(sortingOptions.dscPrice);

  expect(await inventory.isDecendingSortingPrice()).toBe(true);
});
