import { Locator } from "@playwright/test";

export function getConvertedText(itemText: string): string {
  return itemText.trim().toLocaleLowerCase().replace(/ /g, "-");
}

export function getRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export async function getTextContent(elementLocator: Locator): Promise<string> {
  if ((await elementLocator.count()) === 0) {
    return "";
  }

  const textContent = await elementLocator.textContent();
  return textContent?.trim() ?? "";
}
