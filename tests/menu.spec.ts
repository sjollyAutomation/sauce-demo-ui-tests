import { test } from "./fixtures/login";
import { expect } from "@playwright/test";
import { MenuElements } from "../pages/menu";
import { InventoryPage } from "../pages/inventory";
import testUrlsData from "../test-data/urls.json";
import testTextsData from "../test-data/texts.json";
import { DetailsPage } from "../pages/details";
import { HeaderContainerWrapper } from "../pages/header";

const aboutMenuItemUrl = testUrlsData.aboutMenuItemUrl;
const inventoryUrl = testUrlsData.inventoryUrl;
const closeMenuText = testTextsData.closeMenu;
const allItemsMenuItem = testTextsData.allItemsMenuItem;
const aboutMenuItem = testTextsData.aboutMenuItem;
const resetAppStateMenuItem = testTextsData.resetAppStateMenuItem;
const logoutMenuItem = testTextsData.logoutMenuItem;

test("Menu elements are displayed properly", async ({ page, login }) => {
  const menuElements = new MenuElements(page);

  expect(
    menuElements.openMenuLink,
    "open menu link should be visible"
  ).toBeVisible();

  expect(
    menuElements.expandedMenu,
    "menu should be collapased"
  ).toHaveAttribute("aria-hidden", "true");

  // Expand menu
  await menuElements.expandMenu();

  expect(menuElements.expandedMenu, "menu should be expanded").toHaveAttribute(
    "aria-hidden",
    "false"
  );

  expect(
    menuElements.closeButton,
    "close button should be visible"
  ).toBeVisible();
  expect(
    menuElements.closeButton,
    "close button should have the correct text"
  ).toHaveText(closeMenuText);

  expect(
    menuElements.allItemsLink,
    "all items link should be visible"
  ).toBeVisible();
  expect(
    menuElements.allItemsLink,
    "all items link should have the correct text"
  ).toHaveText(allItemsMenuItem);

  expect(menuElements.aboutLink, "about link should be visible").toBeVisible();
  expect(
    menuElements.aboutLink,
    "about link should have the correct text"
  ).toHaveText(aboutMenuItem);
  expect(
    menuElements.aboutLink,
    "about link should have the correct href"
  ).toHaveAttribute("href", aboutMenuItemUrl);

  expect(
    menuElements.logoutLink,
    "logout link should be visible"
  ).toBeVisible();
  expect(
    menuElements.logoutLink,
    "logout link should have the correct text"
  ).toHaveText(logoutMenuItem);

  expect(
    menuElements.resetAppStateLink,
    "reset app state link should be visible"
  ).toBeVisible();
  expect(
    menuElements.resetAppStateLink,
    "reset app state link should have the correct text"
  ).toHaveText(resetAppStateMenuItem);
});

test("Click close menu button collapses the expanded menu properly", async ({
  page,
  login,
}) => {
  const menuElements = new MenuElements(page);

  // Click close button link
  await menuElements.clickCloseMenuButton();

  expect(
    menuElements.expandedMenu,
    "clcking close button should collapase the menu"
  ).toHaveAttribute("aria-hidden", "true");
});

test("Clicking all items menu item takes the user to inventory page", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);

  // Navigate to product details page
  await inventory.navigateToProductDetailsPage();

  const menuElements = new MenuElements(page);

  // Click all items link
  await menuElements.clickAllItemsLink();

  expect(page.url(), "user should be taken to inventory page").toContain(
    inventoryUrl
  );
});

test("Clicking reset app state menu item resets the cart to the default", async ({
  page,
  login,
}) => {
  const inventory = new InventoryPage(page);
  const headerContainerWrapper = new HeaderContainerWrapper(page);

  // Navigate to product details page
  await inventory.navigateToProductDetailsPage();

  const inventoryDetails = new DetailsPage(page);

  // Add item to the cart
  await inventoryDetails.addItemToCart();

  const menuElements = new MenuElements(page);

  expect(
    headerContainerWrapper.shoppingCartBadge,
    "shopping cart badge should show the correct quantity"
  ).toHaveText("1");

  await menuElements.clickResetAppStateLink();

  expect(
    headerContainerWrapper.shoppingCartBadge,
    "clicking reset app state should hide the shopping cart badge"
  ).toBeHidden();
});

test("Clicking logout menu item takes the user to login page", async ({
  page,
  login,
}) => {
  const menuElements = new MenuElements(page);

  // Click logout link
  await menuElements.clickLogoutLink();

  expect(page.url(), "user should be taken to login page").toBe(login.url);
});
