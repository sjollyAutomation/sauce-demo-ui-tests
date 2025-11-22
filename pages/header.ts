import { Page, Locator } from "@playwright/test";

export class HeaderContainerWrapper {
  readonly page: Page;

  readonly headerContainer: Locator;
  readonly primaryHeader: Locator;
  readonly headerLabel: Locator;
  readonly activeSortOption: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly secondaryHeader: Locator;
  readonly headerTitle: Locator;
  readonly openMenuLink: Locator;
  readonly sortingContainer: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerContainer = page.locator('[data-test="header-container"]');
    this.primaryHeader = page.locator('[data-test="primary-header"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.activeSortOption = page.locator('[data-test="active-option"]');
    this.secondaryHeader = page.locator('[data-test="secondary-header"]');
    this.headerTitle = page.locator('[data-test="title"]');
    this.sortingContainer = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.openMenuLink = page.getByRole("button", { name: "Open Menu" });
    this.headerLabel = page.locator(".header_label");
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async logout(): Promise<void> {
    await this.openMenuLink.click();
    await this.logoutLink.click();
  }
}
