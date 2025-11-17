import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory";
import testData from "../test-data/data.json";

const sortingOptions = testData.sortingOptions;

test("product sort menu is displayed properly along with default sort option", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  expect(
    inventory.activeSortOption,
    "default sort option should be active"
  ).toHaveText(sortingOptions.ascName);

  expect(await inventory.isAscendingSortingName()).toBe(true);
});

test(`chaning product sort menu to ${sortingOptions.dscName} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(sortingOptions.dscName);

  expect(await inventory.isDecendingSortingName()).toBe(true);
});

test(`chaning product sort menu to ${sortingOptions.ascPrice} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(sortingOptions.ascPrice);

  expect(await inventory.isAscendingSortingPrice()).toBe(true);
});

test(`chaning product sort menu to ${sortingOptions.dscPrice} updates the item list accordingly`, async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  await inventory.selectSortingOption(sortingOptions.dscPrice);

  expect(await inventory.isDecendingSortingPrice()).toBe(true);
});
