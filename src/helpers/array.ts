export function newArray<T>(
  length: number,
  mapFn: (element: never, index: any) => T = (_, i) => i
): T[] {
  return Array.from({ length }, mapFn);
}
