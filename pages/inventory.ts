import { Page, Locator } from "@playwright/test";

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
  }

  getConvertedText(itemText: string) {
    return itemText.trim().toLocaleLowerCase().replace(/ /g, "-");
  }

  async firstInventoryItemAddToCartButton() {
    const itemText = await this.firstInventoryItemName.textContent();

    if (!itemText) {
      throw new Error("First inventory item name is empty");
    }

    const locatorValue = `[data-test="add-to-cart-${this.getConvertedText(
      itemText
    )}"]`;

    return this.page.locator(locatorValue);
  }

  async firstInventoryItemRemoveButton() {
    const itemText = await this.firstInventoryItemName.textContent();

    if (!itemText) {
      throw new Error("First inventory item name is empty");
    }

    const locatorValue = `[data-test="remove-${this.getConvertedText(
      itemText
    )}"]`;

    return this.page.locator(locatorValue);
  }
}
