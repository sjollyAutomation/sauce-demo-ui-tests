import { Page, Locator } from "@playwright/test";
import { getTextContent } from "../helpers/stringhelper";

export class CartPage {
  readonly page: Page;

  readonly title: Locator;
  readonly cartList: Locator;
  readonly cartQuantityLabel: Locator;
  readonly cartDescriptionLabel: Locator;
  readonly inventoryItem: Locator;
  readonly itemQuantity: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly viewCartUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("[data-test='title']");
    this.cartList = page.locator("[data-test='cart-list']");
    this.cartQuantityLabel = page.locator("[data-test='cart-quantity-label']");
    this.cartDescriptionLabel = page.locator("[data-test='cart-desc-label']");
    this.inventoryItem = page.locator("[data-test='inventory-item']");
    this.itemQuantity = page.locator("[data-test='item-quantity']");
    this.itemName = page.locator("[data-test='inventory-item-name']");
    this.itemDescription = page.locator("[data-test='inventory-item-desc']");
    this.itemPrice = page.locator("[data-test='inventory-item-price']");
    this.continueShoppingButton = page.locator(
      "[data-test='continue-shopping']"
    );
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.viewCartUrl = "/cart.html";
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
