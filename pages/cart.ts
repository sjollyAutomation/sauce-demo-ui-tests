import { Page, Locator } from "@playwright/test";
import { getConvertedText, getTextContent } from "../helpers/stringhelper";

export class CartPage {
  readonly page: Page;

  readonly cartList: Locator;
  readonly cartQuantityLabel: Locator;
  readonly cartDescriptionLabel: Locator;
  readonly inventoryItem: Locator;
  readonly itemQuantity: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator("[data-test='cart-list']");
    this.cartQuantityLabel = page.locator("[data-test='cart-quantity-label']");
    this.cartDescriptionLabel = page.locator("[data-test='cart-desc-label']");
    this.inventoryItem = page.locator("[data-test='inventory-item']");
    this.itemQuantity = page.locator("[data-test='item-quantity']");
    this.itemName = page.locator("[data-test='inventory-item-name']");
    this.itemDescription = page.locator("[data-test='inventory-item-desc']");
    this.itemPrice = page.locator("[data-test='inventory-item-price']");
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

  async getRemoveButton(): Promise<Locator> {
    const itemText = await this.getItemNameText();

    if (!itemText) {
      throw new Error("item name is empty");
    }

    const locatorValue = `[data-test="remove-${getConvertedText(itemText)}"]`;

    return this.page.locator(locatorValue);
  }
}
