import { expect } from "@playwright/test";
import { HeaderContainerWrapper } from "../../pages/header";
import testTextsData from "../../test-data/texts.json";

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
    headerContainerWrapper.headerLabel,
    "header label should be correct"
  ).toHaveText(testTextsData.header);
  expect(
    headerContainerWrapper.shoppingCartLink,
    "shopping cart link should be displayed"
  ).toBeVisible();

  expect(
    headerContainerWrapper.secondaryHeader,
    "secondary header should be visible"
  ).toBeVisible();
}
