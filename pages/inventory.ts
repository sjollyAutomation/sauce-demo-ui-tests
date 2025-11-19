import { Page, Locator } from "@playwright/test";
import { LoginPage } from "./login";
import { getConvertedText } from "../helpers/stringhelper";
import { sortArray, isArraySorted } from "../helpers/sortHelper";

export class InventoryPage {
  readonly page: Page;

  readonly inventoryContainer: Locator;
  readonly firstInventoryItem: Locator;
  readonly firstInventoryItemImage: Locator;
  readonly firstInventoryItemName: Locator;
  readonly firstInventoryItemDescription: Locator;
  readonly firstInventoryItemPrice: Locator;
  readonly inventoryItem: Locator;
  readonly itemImage: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly itemAddToCartButton: Locator;
  readonly itemRemoveButton: Locator;
  readonly backToProductsLink: Locator;
  readonly shoppingCartLink: Locator;
  readonly activeSortOption: Locator;
  readonly inventoryUrl: string;
  readonly checkoutUrl: string;

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
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.itemImage = page.locator('[data-test="item-sauce-labs-backpack-img"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.itemAddToCartButton = page.locator('[data-test="add-to-cart"]');
    this.itemRemoveButton = page.locator('[data-test="remove"]');
    this.backToProductsLink = page.locator('[data-test="back-to-products"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.activeSortOption = page.locator('[data-test="active-option"]');
    this.inventoryUrl = "/inventory.html";
    this.checkoutUrl = "/checkout-step-one.html";
  }

  async getTextContent(itemNameLocator: Locator): Promise<string | null> {
    return await itemNameLocator.textContent();
  }

  async getFirstItemNameText(): Promise<string | null> {
    return this.getTextContent(this.firstInventoryItemName);
  }

  async getItemNameText(): Promise<string | null> {
    return this.getTextContent(this.itemName);
  }

  async getFirstItemDescriptionText(): Promise<string | null> {
    return this.getTextContent(this.firstInventoryItemDescription);
  }

  async getItemDescriptionText(): Promise<string | null> {
    return this.getTextContent(this.itemDescription);
  }

  async getFirstItemPriceText(): Promise<string | null> {
    return this.getTextContent(this.firstInventoryItemPrice);
  }

  async getItemPriceText(): Promise<string | null> {
    return this.getTextContent(this.itemPrice);
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
    const loginPage = new LoginPage(this.page);

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
    const addToCartButton = await this.firstInventoryItemAddToCartButton();
    await addToCartButton.click();
    await this.shoppingCartLink.click();
  }
}
