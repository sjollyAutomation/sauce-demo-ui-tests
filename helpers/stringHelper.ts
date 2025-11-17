export function getConvertedText(itemText: string): string {
  return itemText.trim().toLocaleLowerCase().replace(/ /g, "-");
}
