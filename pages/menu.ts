import { Page, Locator } from "@playwright/test";

export class MenuElements {
  readonly page: Page;

  readonly openMenuLink: Locator;
  readonly expandedMenu: Locator;
  readonly closeButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenuLink = page.getByRole("button", { name: "Open Menu" });
    this.expandedMenu = page.locator(".bm-menu-wrap");
    this.closeButton = page.getByRole("button", { name: "Close Menu" });
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
  }

  async expandMenu(): Promise<void> {
    await this.openMenuLink.click();
  }

  async clickCloseMenuButton(): Promise<void> {
    await this.openMenuLink.click();
    await this.closeButton.click();

    await this.closeButton.waitFor({ state: "hidden" });
  }

  async clickAllItemsLink(): Promise<void> {
    await this.openMenuLink.click();
    await this.allItemsLink.click();

    const menuStatus = await this.expandedMenu.getAttribute("aria-hidden");
    if (menuStatus == "false") {
      await this.closeButton.click();
    }
  }

  async clickResetAppStateLink(): Promise<void> {
    await this.openMenuLink.click();
    await this.resetAppStateLink.click();
    await this.closeButton.click();
  }

  async clickLogoutLink(): Promise<void> {
    await this.openMenuLink.click();
    await this.logoutLink.click();
  }
}
