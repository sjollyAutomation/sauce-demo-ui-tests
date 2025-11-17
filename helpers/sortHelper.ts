export function sortArray<T extends string | number>(
  originalArray: T[],
  ascending: boolean = true
): T[] {
  // copy array to avoid mutating original
  const clonedArray = [...originalArray];

  // string sort
  if (typeof clonedArray[0] === "string") {
    return ascending
      ? [...originalArray].sort((a, b) =>
          (a as string).localeCompare(b as string)
        )
      : [...originalArray].sort((a, b) =>
          (b as string).localeCompare(a as string)
        );
  }

  // number sort
  return ascending
    ? [...originalArray].sort((a, b) => (a as number) - (b as number))
    : [...originalArray].sort((a, b) => (b as number) - (a as number));
}

export function isArraySorted<T extends string | number>(
  originalArray: T[],
  sortedArray: T[]
): boolean {
  return originalArray.every((value, index) => value === sortedArray[index]);
}
