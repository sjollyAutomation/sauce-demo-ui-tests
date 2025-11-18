import { InventoryPage } from "../pages/inventory";
import { test } from "./fixtures/login";
import { expect } from "@playwright/test";

test("Elements are displayed properly after successful login", async ({
  login,
  page,
}) => {
  expect(
    login.loginButton,
    "login button should be hidden after successful login"
  ).not.toBeVisible();

  expect(login.primaryHeader, "primary header should be visible").toBeVisible();

  expect(
    login.secondaryHeader,
    "secondary header should be visible"
  ).toBeVisible();

  expect(
    login.sortingContainer,
    "product sort container should be visible"
  ).toBeVisible();

  expect(login.logoutLink, "logout link should be visible").toBeVisible();

  const inventory = new InventoryPage(page);

  expect(page.url(), "correct product list url should be in the bar").toContain(
    inventory.inventoryUrl
  );
});
