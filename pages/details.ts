import { Page, Locator } from "@playwright/test";
import { getTextContent } from "../helpers/stringhelper";

export class DetailsPage {
  readonly page: Page;

  readonly inventoryContainer: Locator;
  readonly inventoryItem: Locator;
  readonly itemImage: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly itemAddToCartButton: Locator;
  readonly itemRemoveButton: Locator;
  readonly backToProductsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.itemImage = page.locator('[data-test="item-sauce-labs-backpack-img"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.itemAddToCartButton = page.locator('[data-test="add-to-cart"]');
    this.itemRemoveButton = page.locator('[data-test="remove"]');
    this.backToProductsLink = page.locator('[data-test="back-to-products"]');
  }

  async getItemNameText(): Promise<string> {
    return await getTextContent(this.itemName);
  }

  async getItemDescriptionText(): Promise<string> {
    return await getTextContent(this.itemDescription);
  }

  async getItemPriceText(): Promise<string> {
    return await getTextContent(this.itemPrice);
  }
}
