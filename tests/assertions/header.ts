import { expect } from "@playwright/test";
import { HeaderContainerWrapper } from "../../pages/header";

export async function expectHeaderVisibleWithText(
  headerContainerWrapper: HeaderContainerWrapper
) {
  expect(
    headerContainerWrapper.headerContainer,
    "header container should be visible"
  ).toBeVisible();

  expect(
    headerContainerWrapper.primaryHeader,
    "primary header should be visible"
  ).toBeVisible();
  expect(
    headerContainerWrapper.openMenuLink,
    "open menu link should be visible"
  ).toBeVisible();
  expect(
    headerContainerWrapper.logoutLink,
    "logout link should be visible"
  ).toBeVisible();
  expect(
    headerContainerWrapper.headerLabel,
    "header label should be correct"
  ).toHaveText("Swag Labs");
  expect(
    headerContainerWrapper.shoppingCartLink,
    "shopping cart link should be displayed"
  ).toBeVisible();

  expect(
    headerContainerWrapper.secondaryHeader,
    "secondary header should be visible"
  ).toBeVisible();
}
