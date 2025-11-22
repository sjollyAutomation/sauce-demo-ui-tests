import { Page, Locator } from "@playwright/test";
import { HeaderContainerWrapper } from "./header";
import { getConvertedText, getTextContent } from "../helpers/stringhelper";
import { sortArray, isArraySorted } from "../helpers/sortHelper";

export class InventoryPage {
  readonly page: Page;

  readonly inventoryContainer: Locator;
  readonly firstInventoryItem: Locator;
  readonly firstInventoryItemImage: Locator;
  readonly firstInventoryItemName: Locator;
  readonly firstInventoryItemDescription: Locator;
  readonly firstInventoryItemPrice: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.firstInventoryItem = page
      .locator('[data-test="inventory-item"]')
      .first();
    this.firstInventoryItemImage = this.firstInventoryItem.locator("img");
    this.firstInventoryItemName = this.firstInventoryItem.locator(
      '[data-test="inventory-item-name"]'
    );
    this.firstInventoryItemDescription = this.firstInventoryItem.locator(
      '[data-test="inventory-item-desc"]'
    );
    this.firstInventoryItemPrice = this.firstInventoryItem.locator(
      '[data-test="inventory-item-price"]'
    );
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
  }

  async getFirstItemNameText(): Promise<string> {
    return await getTextContent(this.firstInventoryItemName);
  }

  async getFirstItemDescriptionText(): Promise<string> {
    return await getTextContent(this.firstInventoryItemDescription);
  }

  async getFirstItemPriceText(): Promise<string> {
    return await getTextContent(this.firstInventoryItemPrice);
  }

  async firstInventoryItemAddToCartButton(): Promise<Locator> {
    const itemText = await this.getFirstItemNameText();

    if (!itemText) {
      throw new Error("First inventory item name is empty");
    }

    const locatorValue = `[data-test="add-to-cart-${getConvertedText(
      itemText
    )}"]`;

    return this.page.locator(locatorValue);
  }

  async firstInventoryItemRemoveButton(): Promise<Locator> {
    const itemText = await this.getFirstItemNameText();

    if (!itemText) {
      throw new Error("First inventory item name is empty");
    }

    const locatorValue = `[data-test="remove-${getConvertedText(itemText)}"]`;

    return this.page.locator(locatorValue);
  }

  async selectSortingOption(optionLabel: string): Promise<void> {
    const loginPage = new HeaderContainerWrapper(this.page);

    await loginPage.sortingContainer.selectOption({ label: optionLabel });
  }

  async getItemNameList(): Promise<string[]> {
    const itemNames = await this.itemName.allTextContents();

    return itemNames;
  }

  async getItemPriceList(): Promise<number[]> {
    const priceStrings = await this.itemPrice.allTextContents(); // e.g. "$19.99"
    return priceStrings.map((p) => parseFloat(p.replace("$", "")));
  }

  async isAscendingSortingName(): Promise<boolean> {
    const originalItemNameList = await this.getItemNameList();

    const sortedItemNameList = sortArray(originalItemNameList);

    return isArraySorted(originalItemNameList, sortedItemNameList);
  }

  async isAscendingSortingPrice(): Promise<boolean> {
    const originalItemPriceList = await this.getItemPriceList();

    const sortedItemPriceList = sortArray(originalItemPriceList);

    return isArraySorted(originalItemPriceList, sortedItemPriceList);
  }

  async isDecendingSortingName(): Promise<boolean> {
    const originalItemNameList = await this.getItemNameList();

    const sortedItemNameList = sortArray(originalItemNameList, false);

    return isArraySorted(originalItemNameList, sortedItemNameList);
  }

  async isDecendingSortingPrice(): Promise<boolean> {
    const originalItemPriceList = await this.getItemPriceList();

    const sortedItemPriceList = sortArray(originalItemPriceList, false);

    return isArraySorted(originalItemPriceList, sortedItemPriceList);
  }

  async navigateToViewCartPage(): Promise<void> {
    const headerContainerWrapper = new HeaderContainerWrapper(this.page);

    const addToCartButton = await this.firstInventoryItemAddToCartButton();
    await addToCartButton.click();
    await headerContainerWrapper.shoppingCartLink.click();
  }
}
