import { Page, Locator } from "@playwright/test";
import { getTextContent, getAmountFromString } from "../helpers/stringhelper";

export class ConfirmationPage {
  readonly page: Page;

  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly totalInfoLabel: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.totalInfoLabel = page.locator('[data-test="total-info-label"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async getTaxValue(): Promise<number> {
    const price = await getTextContent(this.subtotalLabel);
    const tax = getAmountFromString(price) * 0.08;
    return parseFloat(tax.toFixed(2));
  }

  async getTotalValue(): Promise<number> {
    const price = await getAmountFromString(
      await getTextContent(this.subtotalLabel)
    );
    const tax = await this.getTaxValue();
    return price + tax;
  }
}
